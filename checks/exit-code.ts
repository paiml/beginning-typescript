// tsc's exit code says whether the code checked clean.
//
// Contract: tsc exits with 1 on errors/total.ts, which has a type error,
// and with 0 on errors/total-fixed.ts, which has none.
import assert from "node:assert/strict";
import { tsc } from "./tools.ts";

const wrong = tsc(["--noEmit", "errors/total.ts"]);
const fixed = tsc(["--noEmit", "errors/total-fixed.ts"]);
console.log(`errors/total.ts:       exit code ${wrong.status}`);
console.log(`errors/total-fixed.ts: exit code ${fixed.status}`);

assert.equal(wrong.status, 1, "a type error must fail the command");
assert.equal(fixed.status, 0, "clean code must pass");

console.log("contract: exit code (1 with an error, 0 without) OK");
