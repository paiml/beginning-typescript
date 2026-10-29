// The unit converter in converter/ does what converter/BRIEF.md asks.
//
// Contract: converter/tsconfig.json has strict and noUncheckedIndexedAccess
// on; tsc builds it with no errors; dist/main.js prints the three
// conversions; a unit that doesn't exist is a compile error (TS2345); a pair
// with no rule throws when it runs; and without its undefined check,
// convert.ts would not compile (TS2722).
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { errorCodes, run, tsc } from "./tools.ts";
import { convert } from "../converter/src/convert.ts";

// Step 1: strict settings are on.
const options = JSON.parse(tsc(["--showConfig", "-p", "converter"]).output).compilerOptions;
assert.equal(options.strict, true);
assert.equal(options.noUncheckedIndexedAccess, true);
console.log("Step 1  strict and noUncheckedIndexedAccess are on");

// Step 2: it builds with no errors.
const built = tsc(["-p", "converter"]);
assert.equal(built.status, 0, built.output);
console.log("Step 2  tsc -p converter: no errors");

// Step 3: it prints the three conversions.
const printed = run("node", ["converter/dist/main.js"]).output;
assert.equal(printed, "10 km = 6.21 mi\n100 C = 212 F\n5 kg = 11.02 lb\n");
assert.equal(convert(6.21, "mi", "km"), 9.99);
assert.equal(convert(212, "F", "C"), 100);
console.log("Step 3  10 km = 6.21 mi, 100 C = 212 F, 5 kg = 11.02 lb");

// Step 4: a unit that doesn't exist doesn't compile; a pair with no rule throws.
const copy = mkdtempSync("converter/.check-");
try {
  cpSync("converter/tsconfig.json", `${copy}/tsconfig.json`);
  cpSync("converter/src", `${copy}/src`, { recursive: true });
  writeFileSync(`${copy}/src/typo.ts`, 'import { convert } from "./convert.js";\nconvert(5, "km", "miles");\n');
  const typo = tsc(["--noEmit", "-p", copy]);
  assert.deepEqual(errorCodes(typo.output), ["TS2345"]);
  assert.match(typo.output, /Argument of type '"miles"' is not assignable to parameter of type 'Unit'\./);
  assert.throws(() => convert(5, "km", "kg"), /no rule to convert km to kg/);
  console.log('Step 4  "miles" is TS2345; km to kg throws: no rule to convert');

  // Step 5: strict needs the undefined check: without it, convert.ts fails.
  rmSync(`${copy}/src/typo.ts`);
  const source = readFileSync(`${copy}/src/convert.ts`, "utf8");
  const unchecked = source.replace(/  if \(rule === undefined\) \{\n.*\n  \}\n/, "");
  assert.notEqual(unchecked, source);
  writeFileSync(`${copy}/src/convert.ts`, unchecked);
  const missing = tsc(["--noEmit", "-p", copy]);
  assert.deepEqual(errorCodes(missing.output), ["TS2722"]);
  console.log("Step 5  without the undefined check: TS2722");
} finally {
  rmSync(copy, { recursive: true, force: true });
}

console.log("contract: converter (strict build, right answers, mistakes caught) OK");
