// Inside a folder with a tsconfig.json, tsc refuses to compile just one file.
//
// Contract: in project/, tsc src/main.ts fails with TS5112, which names
// --ignoreConfig, and writes no files.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { tsc } from "./tools.ts";

const before = readdirSync("project/src").sort();
const one = tsc(["src/main.ts"], "project");
assert.equal(one.status, 1);
assert.match(one.output, /error TS5112: tsconfig\.json is present but will not be loaded if files are specified on commandline\. Use '--ignoreConfig' to skip this error\./);
console.log("tsc src/main.ts: TS5112, tsconfig.json is present");
assert.deepEqual(readdirSync("project/src").sort(), before);
console.log("files written:   none");

console.log("contract: one file (TS5112 beside a tsconfig.json) OK");
