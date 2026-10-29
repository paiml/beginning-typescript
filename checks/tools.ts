// Small helpers the check programs share: run a program and keep what it printed.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!existsSync("checks/tools.ts")) {
  throw new Error("run the checks from the root of the examples repository");
}

export type Result = { status: number | null; output: string };

// Runs a program in a folder and returns its exit code and everything it printed.
export function run(program: string, args: string[], cwd = "."): Result {
  const done = spawnSync(program, args, { cwd, encoding: "utf8", timeout: 120000 });
  return { status: done.status, output: `${done.stdout ?? ""}${done.stderr ?? ""}` };
}

// The repository's own TypeScript compiler, with one error per line.
export function tsc(args: string[], cwd = "."): Result {
  return run(`${process.cwd()}/node_modules/.bin/tsc`, ["--pretty", "false", ...args], cwd);
}

// The error codes in tsc's output, in order, like "TS2322".
export function errorCodes(output: string): string[] {
  return output.match(/error TS\d+/g)?.map((e) => e.slice(6)) ?? [];
}

// The project created in hello/ (HELLO_DIR points the checks at another copy).
export const hello = process.env.HELLO_DIR ?? "hello";
