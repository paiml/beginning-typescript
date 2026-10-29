// hello/hello.ts is a TypeScript file: it has a type, and the compiler accepts it.
//
// Contract: hello/hello.ts exists, gives a variable the type string, and
// tsc checks it with no errors.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, hello } from "./tools.ts";

const source = readFileSync(`${hello}/hello.ts`, "utf8");
assert.match(source, /const \w+: string = /, "hello.ts should give a variable the type string");
console.log(`hello.ts: ${source.trim().split("\n").length} lines, with a string type`);

const checked = run(`${process.cwd()}/${hello}/node_modules/.bin/tsc`, ["--noEmit", "hello.ts"], hello);
assert.equal(checked.status, 0, checked.output);
console.log("tsc --noEmit hello.ts: no errors");

console.log("contract: first file (hello.ts has a type and checks clean) OK");
