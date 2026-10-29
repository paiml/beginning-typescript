// Strict mode is on with no setup: a parameter with no type is an error.
//
// Contract: strict/greet.ts gets TS7006 on its name parameter by default,
// no error with --strict false, and strict/greet-typed.ts, whose parameter is
// a string, gets none.
import assert from "node:assert/strict";
import { errorCodes, tsc } from "./tools.ts";

const strict = tsc(["--noEmit", "strict/greet.ts"]);
assert.deepEqual(errorCodes(strict.output), ["TS7006"]);
assert.match(strict.output, /Parameter 'name' implicitly has an 'any' type\./);
console.log("strict/greet.ts:                TS7006, name implicitly has an any type");

const loose = tsc(["--noEmit", "--strict", "false", "strict/greet.ts"]);
assert.equal(loose.status, 0, loose.output);
console.log("strict/greet.ts, strict false:  no errors");

const typed = tsc(["--noEmit", "strict/greet-typed.ts"]);
assert.equal(typed.status, 0, typed.output);
console.log("strict/greet-typed.ts:          no errors");

console.log("contract: implicit any (TS7006 by default, clean once typed) OK");
