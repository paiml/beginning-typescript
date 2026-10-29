// tsc turns hello.ts into hello.js, plain JavaScript that node runs.
//
// Contract: tsc writes hello.js with the type annotation removed, and
// node hello.js prints the message from hello.ts.
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { run, hello } from "./tools.ts";

const out = mkdtempSync(`${hello}/.check-`);
try {
  const built = run(`${process.cwd()}/${hello}/node_modules/.bin/tsc`, ["--outDir", out.slice(hello.length + 1), "hello.ts"], hello);
  assert.equal(built.status, 0, built.output);
  const js = readFileSync(`${out}/hello.js`, "utf8");
  assert.doesNotMatch(js, /: string/, "the type annotation should be gone");
  console.log("tsc hello.ts:  wrote hello.js, with no types in it");

  const message = readFileSync(`${hello}/hello.ts`, "utf8").match(/"([^"]+)"/)?.[1];
  const ran = run("node", [`${out}/hello.js`]);
  assert.equal(ran.output.trim(), message);
  console.log(`node hello.js: ${ran.output.trim()}`);
} finally {
  rmSync(out, { recursive: true, force: true });
}

console.log("contract: compile and run (tsc wrote hello.js, node printed it) OK");
