// `npx tsc` in hello/ runs the compiler installed there.
//
// Contract: hello/node_modules/.bin/tsc reports Version 7.0.2, and npx tsc,
// run in hello/, reports the same version.
import assert from "node:assert/strict";
import { run, hello } from "./tools.ts";

const installed = run(`${process.cwd()}/${hello}/node_modules/.bin/tsc`, ["--version"]).output.trim();
const npx = run("npx", ["tsc", "--version"], hello).output.trim();
console.log(`hello/node_modules/.bin/tsc: ${installed}`);
console.log(`npx tsc in hello:            ${npx}`);

assert.equal(installed, "Version 7.0.2");
assert.equal(npx, installed, "npx ran a different tsc");

console.log("contract: compiler version (npx tsc reports Version 7.0.2) OK");
