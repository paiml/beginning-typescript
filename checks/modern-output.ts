// By default tsc keeps modern syntax as it is; only an older target rewrites it.
//
// Contract: the default output of erasure/modern.ts still uses ?. and ??,
// the es2015 output replaces both, and both print the same name.
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { run, tsc } from "./tools.ts";

const out = mkdtempSync("erasure/.check-");
try {
  assert.equal(tsc(["--outDir", `${out}/default`, "erasure/modern.ts"]).status, 0);
  assert.equal(tsc(["--target", "es2015", "--outDir", `${out}/es2015`, "erasure/modern.ts"]).status, 0);
  const modern = readFileSync(`${out}/default/modern.js`, "utf8");
  const older = readFileSync(`${out}/es2015/modern.js`, "utf8");

  assert.ok(modern.includes("ada.nickname?.trim() ?? ada.name"), modern);
  console.log("default: const shown = ada.nickname?.trim() ?? ada.name;");
  assert.ok(!older.includes("?.") && !older.includes("??"), older);
  assert.match(older, /void 0/);
  console.log("es2015:  ?. and ?? rewritten with === null and void 0");

  for (const dir of ["default", "es2015"]) {
    assert.equal(run("node", [`${out}/${dir}/modern.js`]).output.trim(), "Ada");
  }
  console.log("both print: Ada");
} finally {
  rmSync(out, { recursive: true, force: true });
}

console.log("contract: modern output (?. and ?? kept by default) OK");
