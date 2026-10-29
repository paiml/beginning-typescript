// Every check program must exit 0 and print its `contract: … OK` line.
// A demo is only recorded when its contract holds, so this is the same gate,
// run for all of them at once with `npm test`.
//
// The checks for the hello project look at hello/, which you create yourself
// by following along. Here they run against a fresh copy made the same way
// (npm init, npm install, hello.ts), so they pass in a fresh clone too.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { after, before, test } from "node:test";

let hello = "";
const tmp = mkdtempSync(".check-hello-");

before(() => {
  hello = `${tmp}/hello`;
  mkdirSync(hello);
  const npm = (args: string[]) => execFileSync("npm", args, { cwd: hello, stdio: "pipe" });
  npm(["init", "-y"]);
  npm(["install", "--save-dev", "--save-exact", "typescript@7.0.2", "--no-audit", "--no-fund"]);
  writeFileSync(`${hello}/hello.ts`, 'const message: string = "Hello, TypeScript 7";\nconsole.log(message);\n');
  // The generated config the new-config checks read, as `npx tsc --init` writes it.
  if (!existsSync("new-config/tsconfig.json")) {
    execFileSync("npx", ["tsc", "--init"], { cwd: "new-config", stdio: "pipe" });
  }
});

after(() => rmSync(tmp, { recursive: true, force: true }));

// [check program, start of its contract line, runs against the hello copy]
const checks: [string, string, boolean][] = [
  ["checks/versions.ts", "contract: node and npm", false],
  ["checks/new-project.ts", "contract: new project", true],
  ["checks/types-added.ts", "contract: types added", false],
  ["checks/install.ts", "contract: typescript installed", true],
  ["checks/compiler-version.ts", "contract: compiler version", true],
  ["checks/first-file.ts", "contract: first file", true],
  ["checks/compile-and-run.ts", "contract: compile and run", true],
  ["checks/no-build-step.ts", "contract: no build step", true],
  ["checks/string-to-number.ts", "contract: string to number", false],
  ["checks/reading-errors.ts", "contract: reading errors", false],
  ["checks/exit-code.ts", "contract: exit code", false],
  ["checks/implicit-any.ts", "contract: implicit any", false],
  ["checks/possibly-null.ts", "contract: possibly null", false],
  ["checks/type-erasure.ts", "contract: type erasure", false],
  ["checks/modern-output.ts", "contract: modern output", false],
  ["checks/new-config.ts", "contract: new config", false],
  ["checks/strict-settings.ts", "contract: strict settings", false],
  ["checks/one-file.ts", "contract: one file", false],
  ["checks/ignore-config.ts", "contract: ignore config", false],
  ["checks/whole-project.ts", "contract: whole project", false],
  ["checks/es5-removed.ts", "contract: es5 removed", false],
  ["checks/classic-removed.ts", "contract: classic removed", false],
  ["checks/neovim.ts", "contract: neovim", false],
  ["checks/watch.ts", "contract: watch mode", false],
  ["checks/source-maps.ts", "contract: source maps", false],
  ["checks/source-lines.ts", "contract: source lines", false],
  ["checks/brief.ts", "contract: brief", false],
  ["checks/strict-build.ts", "contract: strict build", false],
  ["checks/converter.ts", "contract: converter", false],
];

for (const [program, contract, usesHello] of checks) {
  test(program, () => {
    const env = usesHello ? { ...process.env, HELLO_DIR: hello } : process.env;
    const out = execFileSync("node", [program], { encoding: "utf8", env });
    assert.match(out, new RegExp(`^${contract}.* OK$`, "m"));
  });
}
