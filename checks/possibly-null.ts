// Strict mode catches a value that might be null before the program crashes.
//
// Contract: strict/find.ts gets TS18047 ("'found' is possibly 'null'"),
// node crashes on it with a TypeError, and strict/find-checked.ts, which
// checks for null first, gets no errors and runs.
import assert from "node:assert/strict";
import { errorCodes, run, tsc } from "./tools.ts";

const unchecked = tsc(["--noEmit", "strict/find.ts"]);
assert.deepEqual(errorCodes(unchecked.output), ["TS18047"]);
assert.match(unchecked.output, /'found' is possibly 'null'\./);
console.log("strict/find.ts:         TS18047, found is possibly null");

const crash = run("node", ["strict/find.ts"]);
assert.notEqual(crash.status, 0);
assert.match(crash.output, /TypeError: Cannot read properties of null \(reading 'toUpperCase'\)/);
console.log("node strict/find.ts:    TypeError, reading toUpperCase of null");

const checked = tsc(["--noEmit", "strict/find-checked.ts"]);
assert.equal(checked.status, 0, checked.output);
const ran = run("node", ["strict/find-checked.ts"]);
assert.equal(ran.output.trim(), "no name found");
console.log("strict/find-checked.ts: no errors, prints: no name found");

console.log("contract: possibly null (TS18047 where node crashes) OK");
