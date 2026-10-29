// Compiling removes the types and keeps the code: the JavaScript does the
// same thing as the TypeScript.
//
// Contract: tsc turns erasure/price.ts into JavaScript with no type alias and
// no annotations, and node prints the same line from price.ts and price.js.
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { run, tsc } from "./tools.ts";

const out = mkdtempSync("erasure/.check-");
try {
  const built = tsc(["--outDir", out, "erasure/price.ts"]);
  assert.equal(built.status, 0, built.output);
  const js = readFileSync(`${out}/price.js`, "utf8");
  for (const typed of ["type Price", ": Price", ": number"]) {
    assert.ok(!js.includes(typed), `price.js still has ${typed}`);
  }
  assert.match(js, /function withTax\(price, rate\) \{/);
  console.log("price.js: function withTax(price, rate), no types");

  const fromTs = run("node", ["erasure/price.ts"]).output.trim();
  const fromJs = run("node", [`${out}/price.js`]).output.trim();
  assert.equal(fromTs, "coffee 5");
  assert.equal(fromJs, fromTs);
  console.log(`node price.ts and node price.js: ${fromJs}`);
} finally {
  rmSync(out, { recursive: true, force: true });
}

console.log("contract: type erasure (types gone, same output) OK");
