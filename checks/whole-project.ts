// tsc -p compiles the whole project with its tsconfig.json.
//
// Contract: tsc -p project exits 0, writes greeting.js and main.js into
// project/dist/, and node project/dist/main.js greets both names.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { run, tsc } from "./tools.ts";

const built = tsc(["-p", "project"]);
assert.equal(built.status, 0, built.output);
assert.deepEqual(readdirSync("project/dist").sort(), ["greeting.js", "main.js"]);
console.log("tsc -p project:         0 errors, dist/greeting.js and dist/main.js");
const ran = run("node", ["project/dist/main.js"]);
assert.equal(ran.output, "Hello, Ada!\nHello, Linus!\n");
console.log("node project/dist/main.js: Hello, Ada! Hello, Linus!");

console.log("contract: whole project (tsc -p builds src/ into dist/) OK");
