// `npm init -y` made hello/ a project: it has a package.json npm can read.
//
// Contract: hello/package.json exists, is valid JSON, and names the project
// after its folder, at version 1.0.0.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { hello } from "./tools.ts";

const file = `${hello}/package.json`;
assert.ok(existsSync(file), `${file} does not exist: run npm init -y in it`);
const pkg = JSON.parse(readFileSync(file, "utf8"));
console.log(`hello/package.json name:    ${pkg.name}`);
console.log(`hello/package.json version: ${pkg.version}`);

assert.equal(pkg.name, hello.split("/").at(-1), "the name comes from the folder");
assert.equal(pkg.version, "1.0.0");

console.log("contract: new project (hello/package.json is valid, version 1.0.0) OK");
