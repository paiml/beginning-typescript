// tsc refuses a string where a number was declared.
//
// Contract: errors/total.ts gets exactly one error, TS2322 on line 3
// ("Type 'string' is not assignable to type 'number'"), and
// errors/total-fixed.ts, which assigns a number, gets none.
import assert from "node:assert/strict";
import { errorCodes, tsc } from "./tools.ts";

const wrong = tsc(["--noEmit", "errors/total.ts"]);
assert.deepEqual(errorCodes(wrong.output), ["TS2322"]);
assert.match(wrong.output, /errors\/total\.ts\(3,1\): error TS2322: Type 'string' is not assignable to type 'number'\./);
console.log("errors/total.ts:       TS2322 on line 3, string is not a number");

const fixed = tsc(["--noEmit", "errors/total-fixed.ts"]);
assert.equal(fixed.status, 0, fixed.output);
console.log("errors/total-fixed.ts: no errors");

console.log("contract: string to number (TS2322 on line 3, the fix is clean) OK");
