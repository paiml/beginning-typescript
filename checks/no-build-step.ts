// node runs hello.ts itself: no compile step, and no .js file written.
//
// Contract: node hello.ts prints the message from hello.ts, and the files in
// hello/ are the same before and after it runs.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { run, hello } from "./tools.ts";

const before = readdirSync(hello).sort();
const ran = run("node", ["hello.ts"], hello);
const after = readdirSync(hello).sort();
const message = readFileSync(`${hello}/hello.ts`, "utf8").match(/"([^"]+)"/)?.[1];

assert.equal(ran.status, 0, ran.output);
assert.equal(ran.output.trim(), message);
console.log(`node hello.ts: ${ran.output.trim()}`);
assert.deepEqual(after, before, "running hello.ts should write no files");
console.log("files written: none");

console.log("contract: no build step (node ran hello.ts, wrote nothing) OK");
