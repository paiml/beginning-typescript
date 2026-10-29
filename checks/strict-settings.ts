// The generated config turns on strict checks, and they change what passes.
//
// Contract: new-config/tsconfig.json turns on strict,
// noUncheckedIndexedAccess and exactOptionalPropertyTypes; with it,
// new-config/scores.ts gets TS2322 (number | undefined is not a number), and
// without it the same file gets no errors.
import assert from "node:assert/strict";
import { errorCodes, tsc } from "./tools.ts";

const options = JSON.parse(tsc(["--showConfig", "-p", "new-config"]).output).compilerOptions;
for (const name of ["strict", "noUncheckedIndexedAccess", "exactOptionalPropertyTypes"]) {
  assert.equal(options[name], true, `${name} should be on`);
  console.log(`${name}: true`);
}

const withConfig = tsc(["--noEmit", "-p", "new-config"]);
assert.deepEqual(errorCodes(withConfig.output), ["TS2322"]);
assert.match(withConfig.output, /Type 'number \| undefined' is not assignable to type 'number'\./);
console.log("with the config:    TS2322, number | undefined");

const without = tsc(["--noEmit", "new-config/scores.ts"]);
assert.equal(without.status, 0, without.output);
console.log("without the config: no errors");

console.log("contract: strict settings (scores[0] is caught with the config) OK");
