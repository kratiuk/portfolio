import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const excludeDirs = [".husky", "public", "src/assets"];
const excludeFiles = ["LICENSE", "pnpm-lock.yaml"];

const tmpDir = mkdtempSync(path.join(tmpdir(), "cloc-"));
const excludePath = path.join(tmpDir, "exclude.txt");

try {
  const git = spawnSync("git", ["ls-files", "-z"], { encoding: "buffer" });
  if (git.status !== 0) {
    throw new Error("git ls-files failed");
  }

  const files = git.stdout
    .toString("utf8")
    .split("\0")
    .filter(Boolean);

  const isExcluded = (file) =>
    excludeFiles.includes(file) ||
    excludeDirs.some((dir) => file === dir || file.startsWith(`${dir}/`));

  const included = files.filter((file) => !isExcluded(file));
  writeFileSync(excludePath, `${included.join("\n")}\n`);

  const args = [
    ".",
    `--list-file=${excludePath}`,
  ];

  const child = spawn("cloc", args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", (code) => {
    rmSync(tmpDir, { recursive: true, force: true });
    process.exit(code ?? 1);
  });
} catch (err) {
  rmSync(tmpDir, { recursive: true, force: true });
  throw err;
}
