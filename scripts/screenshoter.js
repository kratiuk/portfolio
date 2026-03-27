import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const URL = 'http://127.0.0.1:4173';
const OUTPUT_PATH = 'public/screenshots/screenshot.png';
const VIEWPORT = { width: 1920, height: 1080 };

// Main loop: start the local site, wait until it is ready, capture the page, then clean up
let server;

try {
  server = startServer();
  await waitForServer(URL);

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: VIEWPORT,
    });

    await page.goto(URL, { waitUntil: 'networkidle' });
    await delay(1500);
    await page.screenshot({
      path: OUTPUT_PATH,
    });

    console.log(`Screenshot saved to ${OUTPUT_PATH}`);
  } finally {
    await browser.close();
  }
} finally {
  if (server) {
    await stopServer(server);
  }
}

// Helper functions

/**
 * Starts the local server that will run our site
 * so we can open it in the browser and capture a screenshot
 */
function startServer() {
  return spawn('pnpm', ['exec', 'vite', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
    stdio: 'inherit',
  });
}

/**
 * Polls the local server until it starts responding,
 * so the screenshot flow opens the site only after it is ready
 */
async function waitForServer(url) {
  for (let i = 0; i < 60; i += 1) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Vite is still starting.
    }

    await delay(500);
  }

  throw new Error(`Could not start local Vite server on ${url}`);
}

/**
 * Stops the local server after the screenshot is done
 */
async function stopServer(serverProcess) {
  serverProcess.kill('SIGTERM');
  await delay(500);

  if (!serverProcess.killed) {
    serverProcess.kill('SIGKILL');
  }
}
