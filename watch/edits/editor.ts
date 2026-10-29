// Plays the part of you saving files in an editor while `tsc --watch` runs:
//
//   node edits/editor.ts &
//   npx tsc --watch --preserveWatchOutput
//
// It waits for the watcher to start, saves a bad edit to src/greet.ts, then the
// fix, then stops the watcher the way Ctrl-C would.
import { execFileSync } from "node:child_process";
import { copyFileSync } from "node:fs";
import path from "node:path";

const dir = path.join(import.meta.dirname, "..");
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// The process ids of every running `tsc --watch`: npx (a node process) and the
// compiler it starts. Shells whose command line merely mentions it are skipped.
function watchers(): number[] {
  const ps = execFileSync("ps", ["-A", "-o", "pid=,command="], { encoding: "utf8" });
  return ps
    .split("\n")
    .map((line) => line.trim().split(/\s+/))
    .filter(([, program, ...args]) => {
      const name = path.basename(program ?? "");
      return ["node", "npm", "npx", "tsc"].includes(name) && args.join(" ").includes("tsc --watch");
    })
    .map(([pid]) => Number(pid));
}

while (watchers().length === 0) await pause(200);
await pause(3000);
console.log("editor: saving a bad edit to src/greet.ts");
await pause(500);
copyFileSync(path.join(dir, "edits", "broken.ts"), path.join(dir, "src", "greet.ts"));
await pause(4000);
console.log("editor: saving the fix");
await pause(500);
copyFileSync(path.join(dir, "edits", "fixed.ts"), path.join(dir, "src", "greet.ts"));
await pause(4000);
console.log("editor: stopping the watcher");
for (const pid of watchers()) process.kill(pid, "SIGINT");
