// Node and npm are installed, and this Node is new enough to run .ts files.
//
// Contract: node reports a version of 22.18 or later (the first to run
// TypeScript files with no flag), it can strip types, and npm runs.
import assert from "node:assert/strict";
import { run } from "./tools.ts";

const node = run("node", ["--version"]).output.trim();
const npm = run("npm", ["--version"]);
console.log(`node --version: ${node}`);
console.log(`npm --version:  ${npm.output.trim()}`);

const [major = 0, minor = 0] = node.slice(1).split(".").map(Number);
assert.ok(major > 22 || (major === 22 && minor >= 18), `Node ${node} is older than 22.18`);
assert.equal(process.features.typescript, "strip", "this Node can't run .ts files");
assert.equal(npm.status, 0, "npm did not run");
console.log("runs .ts files: yes");

console.log(`contract: node and npm (node ${node}, npm ${npm.output.trim()}) OK`);
