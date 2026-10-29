// With --enable-source-maps, an error's stack names the TypeScript line.
//
// Contract: maps/dist/app.js throws; without source maps its stack points at
// dist/app.js line 4, and with --enable-source-maps at src/app.ts line 6, the
// line of src/app.ts that throws.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, tsc } from "./tools.ts";

assert.equal(tsc(["-p", "maps"]).status, 0);
const source = readFileSync("maps/src/app.ts", "utf8").split("\n");
assert.match(source[5] ?? "", /throw new Error/, "line 6 of src/app.ts throws");

const plain = run("node", ["maps/dist/app.js"]);
assert.match(plain.output, /at check \(.*maps\/dist\/app\.js:4:15\)/);
console.log("node maps/dist/app.js:          at check (dist/app.js:4:15)");

const mapped = run("node", ["--enable-source-maps", "maps/dist/app.js"]);
assert.match(mapped.output, /at check \(.*maps\/src\/app\.ts:6:11\)/);
console.log("with --enable-source-maps:      at check (src/app.ts:6:11)");

console.log("contract: source lines (the stack points at src/app.ts line 6) OK");
