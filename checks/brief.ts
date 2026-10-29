// converter/BRIEF.md describes the unit converter, and converter/src matches it.
//
// Contract: the brief's "Done when" list has four items; converter/src holds
// exactly the three files the brief lists; and the Unit type in units.ts
// allows exactly the six units the brief names: km, mi, C, F, kg and lb.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const brief = readFileSync("converter/BRIEF.md", "utf8");
const done = brief.split("Done when:")[1] ?? "";
const goals = done.match(/^\d+\. /gm) ?? [];
assert.equal(goals.length, 4, "Done when: should list four things");
console.log("BRIEF.md   Done when: 4 things");

const listed = [...brief.matchAll(/^- src\/(\S+)/gm)].map((m) => m[1]).sort();
assert.deepEqual(listed, ["convert.ts", "main.ts", "units.ts"]);
assert.deepEqual(readdirSync("converter/src").sort(), listed);
console.log(`src/       ${listed.join(", ")}, as the brief lists`);

const units = readFileSync("converter/src/units.ts", "utf8").match(/type Unit = (.*);/)?.[1] ?? "";
const allowed = [...units.matchAll(/"(\w+)"/g)].map((m) => m[1]);
assert.deepEqual(allowed, ["km", "mi", "C", "F", "kg", "lb"]);
console.log(`Unit       ${allowed.join(" ")}`);

console.log("contract: brief (four goals, three files, six units) OK");
