// TypeScript 7 is installed in hello/, pinned to one exact version.
//
// Contract: hello/package.json lists typescript 7.0.2 as a dev dependency
// with no ^ or ~, package-lock.json resolved 7.0.2, and the compiler is in
// hello/node_modules.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { hello } from "./tools.ts";

const pkg = JSON.parse(readFileSync(`${hello}/package.json`, "utf8"));
const lock = JSON.parse(readFileSync(`${hello}/package-lock.json`, "utf8"));
const pinned = pkg.devDependencies?.typescript;
const locked = lock.packages["node_modules/typescript"]?.version;
console.log(`devDependencies: typescript ${pinned}`);
console.log(`lock file:       typescript ${locked}`);

assert.equal(pinned, "7.0.2", "typescript must be pinned to exactly 7.0.2");
assert.equal(locked, "7.0.2");
assert.ok(existsSync(`${hello}/node_modules/.bin/tsc`), "no tsc in hello/node_modules/.bin");
console.log("compiler:        hello/node_modules/.bin/tsc");

console.log("contract: typescript installed (hello pins exactly 7.0.2) OK");
