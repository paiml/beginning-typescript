// tsc --watch checks again on every save, without being restarted.
//
// Contract: on a copy of watch/, tsc --watch reports 0 errors, then the
// TS2345 error within seconds of a bad edit being saved, then 0 errors again
// once the fix is saved.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { copyFileSync, cpSync, mkdtempSync, rmSync } from "node:fs";
import path from "node:path";
import "./tools.ts";

const tsc = path.resolve("node_modules/.bin/tsc");
// The copy stays on the same disk as node_modules: tsc's file watcher (fanotify on
// Linux) cannot watch across devices, so a copy in a tmpfs /tmp is never re-checked.
const copy = path.resolve(mkdtempSync("watch/.check-"));
for (const part of ["tsconfig.json", "src", "edits"]) cpSync(path.join("watch", part), path.join(copy, part), { recursive: true });
copyFileSync(path.join(copy, "edits", "fixed.ts"), path.join(copy, "src", "greet.ts"));

const watcher = spawn(tsc, ["--watch", "--preserveWatchOutput"], { cwd: copy });
let output = "";
watcher.stdout.on("data", (chunk: Buffer) => (output += chunk));

// The "Found … Watching" summaries printed so far. A save can be seen as more
// than one change, so the same summary may repeat.
const summaries = () => (output.match(/Found \d+ errors?\. Watching for file changes\./g) ?? []).map((f) => f.split(".")[0]);

// Resolves once the latest summary is `wanted`, after at least `after` summaries.
function until(wanted: string, after: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const poll = setInterval(() => {
      const found = summaries();
      if (found.length > after && found.at(-1) === wanted) {
        clearInterval(poll);
        resolve(found.length);
      } else if (Date.now() - started > 20000) {
        clearInterval(poll);
        reject(new Error(`watch never reported "${wanted}":\n${output}`));
      }
    }, 100);
  });
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 1500));

try {
  const first = await until("Found 0 errors", 0);
  await settle();
  copyFileSync(path.join(copy, "edits", "broken.ts"), path.join(copy, "src", "greet.ts"));
  const broken = await until("Found 1 error", first);
  await settle();
  copyFileSync(path.join(copy, "edits", "fixed.ts"), path.join(copy, "src", "greet.ts"));
  await until("Found 0 errors", broken);
  assert.match(output, /error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'/);
  console.log("start:     Found 0 errors");
  console.log("bad edit:  Found 1 error (TS2345)");
  console.log("fix saved: Found 0 errors");
} finally {
  watcher.kill();
  rmSync(copy, { recursive: true, force: true });
}

console.log("contract: watch mode (0 errors, 1 after a bad edit, 0 after the fix) OK");
