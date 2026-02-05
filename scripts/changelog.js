import { error,log } from "node:console";
import { randomUUID } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const ROOT = resolve(__dirname, "..");

// Reads CHANGELOG.md from the project root
function readChangelog() {
  return readFileSync(resolve(ROOT, "CHANGELOG.md"), "utf-8");
}

// Reads the first "## " block from CHANGELOG.md, returns { version, body }
function readFirstBlock() {
  const changelog = readChangelog();
  const lines = changelog.split("\n");

  let header = null;
  let capturing = false;
  const block = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (!header) {
        header = line;
        capturing = true;
        continue;
      }
      break;
    }
    if (capturing) {
      block.push(line);
    }
  }

  if (!header) {
    error("No blocks found in CHANGELOG.md");
    process.exit(1);
  }

  // Extracts version from header like "## v0.0.23 (2026-01-23)" or "## 0.0.23"
  const match = header.match(/(?:v)?(\d+\.\d+\.\d+)/);
  const version = match ? match[1] : null;

  return { header, version, body: block.join("\n").trim() };
}

// Validates that the tag matches the first block version in CHANGELOG.md
function validate(tagVersion) {
  const tag = tagVersion.replace(/^v/, "");
  const { version, header } = readFirstBlock();

  if (!version) {
    error(`First block in CHANGELOG.md has no version: "${header}"`);
    error(`Rename it to "## ${tag} (YYYY-MM-DD)" before tagging`);
    process.exit(1);
  }

  if (tag !== version) {
    error(`Tag "${tag}" does not match CHANGELOG version "${version}"`);
    process.exit(1);
  }

  log(`Version validated: ${tag}`);
}

// --- CLI entry point ---
const [, , command, ...args] = process.argv;

switch (command) {
  case "validate":
    validate(args[0]);
    break;

  case "extract": {
    const { body } = readFirstBlock();
    const delimiter = `ghadelimiter_${randomUUID()}`;
    const githubOutput = process.env.GITHUB_OUTPUT;

    if (githubOutput) {
      appendFileSync(githubOutput, `changelog<<${delimiter}\n${body}\n${delimiter}\n`);
    }

    log(body);
    break;
  }

  default:
    error(`Unknown command: "${command}". Available: validate, extract`);
    process.exit(1);
}
