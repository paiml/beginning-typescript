// `tsc --init` wrote new-config/tsconfig.json, and tsc reads it as a project.
//
// Contract: new-config/tsconfig.json exists, and the settings tsc reads from
// it (tsc --showConfig) are strict, module nodenext, target esnext and
// types [].
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { tsc } from "./tools.ts";

assert.ok(existsSync("new-config/tsconfig.json"), "no new-config/tsconfig.json: run npx tsc --init in new-config");
const shown = tsc(["--showConfig", "-p", "new-config"]);
assert.equal(shown.status, 0, shown.output);
const options = JSON.parse(shown.output).compilerOptions;

for (const [name, value] of Object.entries({ strict: true, module: "nodenext", target: "esnext" })) {
  assert.equal(options[name], value, name);
  console.log(`${name}: ${value}`);
}
assert.deepEqual(options.types, []);
console.log("types: []");

console.log("contract: new config (strict, nodenext, esnext, types []) OK");
