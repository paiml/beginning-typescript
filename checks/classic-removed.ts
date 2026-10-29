// TypeScript 7 has removed the Classic and node module resolution that older
// guides set.
//
// Contract: old-guides/tsconfig.classic.json fails with TS5108 for Classic,
// old-guides/tsconfig.node.json fails with TS5108 for node10, and
// old-guides/tsconfig.json (module nodenext) checks clean.
import assert from "node:assert/strict";
import { tsc } from "./tools.ts";

const removed: [string, string][] = [
  ["classic", "Classic"],
  ["node", "node10"],
];
for (const [file, shown] of removed) {
  const old = tsc(["-p", `old-guides/tsconfig.${file}.json`]);
  assert.equal(old.status, 1);
  assert.match(old.output, new RegExp(`error TS5108: Option 'moduleResolution=${shown}' has been removed\\.`));
  console.log(`tsconfig.${file}.json: TS5108, moduleResolution=${shown} has been removed`);
}

const current = tsc(["-p", "old-guides"]);
assert.equal(current.status, 0, current.output);
console.log("tsconfig.json:      no errors");

console.log("contract: classic removed (TS5108 for classic and node) OK");
