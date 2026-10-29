// --ignoreConfig compiles the files you name and skips the project's settings.
//
// Contract: on a copy of project/, tsc --ignoreConfig src/main.ts exits 0,
// writes main.js and greeting.js next to the sources instead of in dist/,
// and node runs main.js.
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { run, tsc } from "./tools.ts";

const copy = mkdtempSync("project/.check-");
try {
  cpSync("project/tsconfig.json", `${copy}/tsconfig.json`);
  cpSync("project/src", `${copy}/src`, { recursive: true, filter: (f) => !f.endsWith(".js") });
  const built = tsc(["--ignoreConfig", "src/main.ts"], copy);
  assert.equal(built.status, 0, built.output);
  assert.deepEqual(readdirSync(`${copy}/src`).sort(), ["greeting.js", "greeting.ts", "main.js", "main.ts"]);
  assert.ok(!existsSync(`${copy}/dist`), "outDir from tsconfig.json should be ignored");
  console.log("tsc --ignoreConfig src/main.ts: main.js and greeting.js in src/, no dist/");
  const ran = run("node", [`${copy}/src/main.js`]);
  assert.equal(ran.output, "Hello, Ada!\nHello, Linus!\n");
  console.log("node src/main.js:               Hello, Ada! Hello, Linus!");
} finally {
  rmSync(copy, { recursive: true, force: true });
}

console.log("contract: ignore config (compiled next to the source, no dist) OK");
