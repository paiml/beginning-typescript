// The unit converter builds with strict on, and strict is why convert.ts
// checks for undefined.
//
// Contract: converter/tsconfig.json has strict and noUncheckedIndexedAccess
// on; tsc -p converter exits 0 and writes convert.js, main.js and units.js;
// main.js prints the three conversions; and without its undefined check,
// convert.ts fails with TS2722, but compiles once noUncheckedIndexedAccess
// is off.
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { errorCodes, run, tsc } from "./tools.ts";

const options = JSON.parse(tsc(["--showConfig", "-p", "converter"]).output).compilerOptions;
assert.equal(options.strict, true);
assert.equal(options.noUncheckedIndexedAccess, true);
console.log("tsconfig.json: strict and noUncheckedIndexedAccess are true");

const built = tsc(["-p", "converter"]);
assert.equal(built.status, 0, built.output);
assert.deepEqual(readdirSync("converter/dist").sort(), ["convert.js", "main.js", "units.js"]);
console.log("tsc -p converter: 0 errors (convert.js, main.js, units.js)");

const printed = run("node", ["converter/dist/main.js"]).output;
assert.equal(printed, "10 km = 6.21 mi\n100 C = 212 F\n5 kg = 11.02 lb\n");
console.log("main.js: 10 km = 6.21 mi, 100 C = 212 F, 5 kg = 11.02 lb");

const copy = mkdtempSync("converter/.check-");
try {
  cpSync("converter/tsconfig.json", `${copy}/tsconfig.json`);
  cpSync("converter/src", `${copy}/src`, { recursive: true });
  const source = readFileSync(`${copy}/src/convert.ts`, "utf8");
  const unchecked = source.replace(/  if \(rule === undefined\) \{\n.*\n  \}\n/, "");
  assert.notEqual(unchecked, source);
  writeFileSync(`${copy}/src/convert.ts`, unchecked);

  const missing = tsc(["--noEmit", "-p", copy]);
  assert.deepEqual(errorCodes(missing.output), ["TS2722"]);
  console.log("without the undefined check: TS2722");
  const loose = tsc(["--noEmit", "-p", copy, "--noUncheckedIndexedAccess", "false"]);
  assert.equal(loose.status, 0, loose.output);
  console.log("and with noUncheckedIndexedAccess false: 0 errors");
} finally {
  rmSync(copy, { recursive: true, force: true });
}

console.log("contract: strict build (no errors, and it needs its undefined check) OK");
