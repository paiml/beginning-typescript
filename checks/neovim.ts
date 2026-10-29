// Neovim's built-in language client talks to TypeScript 7's language server.
//
// Contract: headless Neovim, started with editor/init.lua, attaches a client
// named tsc running node_modules/.bin/tsc --lsp --stdio to editor/app.ts; its
// hover on message answers "const message: string", and it reports the
// TS2322 error on line 3.
import assert from "node:assert/strict";
import { run } from "./tools.ts";

const version = run("nvim", ["--version"]).output.split("\n")[0] ?? "";
assert.match(version, /^NVIM v0\.(1[1-9]|[2-9]\d)/, "vim.lsp.config needs Neovim 0.11 or later");
console.log(`neovim:   ${version}`);

const nvim = run("nvim", ["--headless", "-u", "editor/init.lua", "-l", "editor/ask.lua"]);
assert.equal(nvim.status, 0, nvim.output);
assert.match(nvim.output, /attached: tsc \(node_modules\/\.bin\/tsc --lsp --stdio\)/);
console.log("attached: tsc (node_modules/.bin/tsc --lsp --stdio)");
assert.match(nvim.output, /hover: const message: string/);
console.log("hover:    const message: string");
assert.match(nvim.output, /error: line 3: TS2322 Type 'string' is not assignable to type 'number'\./);
console.log("error:    line 3, TS2322");

console.log("contract: neovim (tsc attached, hover and error answered) OK");
