// TypeScript 7 has removed the ES5 target that older guides use.
//
// Contract: old-guides/tsconfig.es5.json fails with TS5108 ("Option
// 'target=ES5' has been removed"), and old-guides/tsconfig.json, which sets
// no target, checks the same code with no errors.
import assert from "node:assert/strict";
import { tsc } from "./tools.ts";

const es5 = tsc(["-p", "old-guides/tsconfig.es5.json"]);
assert.equal(es5.status, 1);
assert.match(es5.output, /error TS5108: Option 'target=ES5' has been removed\. Please remove it from your configuration\./);
console.log("tsconfig.es5.json: TS5108, target=ES5 has been removed");

const current = tsc(["-p", "old-guides"]);
assert.equal(current.status, 0, current.output);
console.log("tsconfig.json:     no errors");

console.log("contract: es5 removed (TS5108 for target es5) OK");
