// The types in basics/greet.ts change nothing node runs, and tsc checks every call against them.
//
// Contract: node runs basics/greet.ts and prints "Hello, undefined!" and
// "Hello, Ada,Linus!" (both calls are wrong, and nothing stops them); tsc
// reports exactly two errors: TS2554 on line 7 (no argument) and TS2345 on
// line 8 (a list where a string belongs).
import assert from "node:assert/strict";
import { errorCodes, run, tsc } from "./tools.ts";

const ran = run("node", ["basics/greet.ts"]);
assert.equal(ran.status, 0, ran.output);
assert.equal(ran.output, "Hello, undefined!\nHello, Ada,Linus!\n");
console.log("node basics/greet.ts: Hello, undefined! Hello, Ada,Linus!");

const checked = tsc(["--noEmit", "basics/greet.ts"]);
assert.deepEqual(errorCodes(checked.output), ["TS2554", "TS2345"]);
assert.match(checked.output, /basics\/greet\.ts\(7,13\): error TS2554: Expected 1 arguments, but got 0\./);
assert.match(checked.output, /basics\/greet\.ts\(8,22\): error TS2345: Argument of type 'string\[\]' is not assignable to parameter of type 'string'\./);
console.log("tsc basics/greet.ts:  TS2554 on line 7, TS2345 on line 8");

console.log("contract: types added (node runs both calls, tsc catches both) OK");
