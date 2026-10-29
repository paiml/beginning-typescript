// With sourceMap on, tsc writes a map next to each .js file and links the two.
//
// Contract: tsc -p maps writes dist/app.js and dist/app.js.map; app.js ends
// with a sourceMappingURL comment naming app.js.map, and the map's source is
// src/app.ts.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { tsc } from "./tools.ts";

const built = tsc(["-p", "maps"]);
assert.equal(built.status, 0, built.output);
assert.deepEqual(readdirSync("maps/dist").sort(), ["app.js", "app.js.map"]);
console.log("maps/dist:  app.js  app.js.map");

const js = readFileSync("maps/dist/app.js", "utf8");
assert.match(js, /\/\/# sourceMappingURL=app\.js\.map$/);
console.log("app.js:     //# sourceMappingURL=app.js.map");
const map = JSON.parse(readFileSync("maps/dist/app.js.map", "utf8"));
assert.deepEqual(map.sources, ["../src/app.ts"]);
console.log("app.js.map: sources ../src/app.ts");

console.log("contract: source maps (app.js points to its map and source) OK");
