// Each error names its file, line, column and code, and the line it names is
// the line with the mistake.
//
// Contract: errors/order.ts gets two TS2322 errors, at line 3 column 7 and
// line 4 column 7, and those lines are the price and the label.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { tsc } from "./tools.ts";

const checked = tsc(["--noEmit", "errors/order.ts"]);
const errors = [...checked.output.matchAll(/^(\S+)\((\d+),(\d+)\): error (TS\d+): (.*)$/gm)];
assert.equal(errors.length, 2, checked.output);
const lines = readFileSync("errors/order.ts", "utf8").split("\n");

const expected = [
  ["3", "7", "price", "Type 'string' is not assignable to type 'number'."],
  ["4", "7", "label", "Type 'number' is not assignable to type 'string'."],
];
for (const [i, [line, column, name, message]] of expected.entries()) {
  const [, file, l, c, code, text] = errors[i]!;
  assert.deepEqual([file, l, c, code, text], ["errors/order.ts", line, column, "TS2322", message]);
  assert.match(lines[Number(line) - 1]!, new RegExp(`const ${name}`));
  console.log(`errors/order.ts line ${line}, column ${column}: ${code} on ${name}`);
}

console.log("contract: reading errors (TS2322 on lines 3 and 4 of order.ts) OK");
