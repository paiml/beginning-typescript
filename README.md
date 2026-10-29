# Your First TypeScript 7 Programs: examples

The code and commands from the terminal demos. Everything you see run in a video runs
here, from the root of this repository, unless the commands `cd` into a folder first.

Every version is pinned: **typescript 7.0.2**, at the exact version in `package.json`,
with `package-lock.json` committed, so you install what the videos show. Each demo ends
with a small check program in `checks/` that proves a **contract**: a statement about
what the demo showed, checked with assertions before it prints `contract: … OK`. If the
contract does not hold, the program stops with an error.

## Requirements

- Node.js 22.18 or later (the videos use 25.1.0), which runs `.ts` files directly
- npm (comes with Node.js; the videos use 11.6.2)
- For the Neovim demo: Neovim 0.11 or later (the video uses 0.12.6)

To install Node.js, follow npm's guide,
[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
it recommends a Node version manager (nvm on macOS and Linux, nvm-windows on Windows), or
the LTS installer from the [Node.js download page](https://nodejs.org/en/download). Then
`node -v` and `npm -v` should each print a version.

## Setup

```bash
npm ci        # the pinned packages, from package-lock.json
npm test      # every check program, and its contract
```

`npm test` builds its own copy of the `hello` project (it runs `npm init` and
`npm install` there), so it needs network access the first time.

## Order

The first videos build a project of their own in `hello/`, which you create by following
along (it is not part of this repository). Run them in order: each one starts where the
one before it stopped. Every command each video types is in [LESSONS.md](LESSONS.md).

| Video | Where | Check program |
|---|---|---|
| 1.1.2 Checking your Node and npm versions | (this machine) | `checks/versions.ts` |
| 1.1.3 Creating a project with npm | `hello/` | `checks/new-project.ts` |
| 1.1.4 What TypeScript adds to JavaScript | `basics/` | `checks/types-added.ts` |
| 1.2.1 Installing TypeScript 7 with npm | `hello/` | `checks/install.ts` |
| 1.2.2 Checking the TypeScript compiler version | `hello/` | `checks/compiler-version.ts` |
| 1.3.1 Writing your first TypeScript file | `hello/` | `checks/first-file.ts` |
| 1.3.2 Compiling TypeScript and running the JavaScript output | `hello/` | `checks/compile-and-run.ts` |
| 1.3.3 Running TypeScript in Node with no build step | `hello/` | `checks/no-build-step.ts` |
| 2.1.1 Assigning a string to a number | `errors/` | `checks/string-to-number.ts` |
| 2.1.2 Reading the file, line and error code | `errors/` | `checks/reading-errors.ts` |
| 2.1.3 The compiler fails when something is wrong | `errors/` | `checks/exit-code.ts` |
| 2.2.2 A parameter with no type | `strict/` | `checks/implicit-any.ts` |
| 2.2.3 A value that might be null | `strict/` | `checks/possibly-null.ts` |
| 2.3.2 Comparing TypeScript to JavaScript basics | `erasure/` | `checks/type-erasure.ts` |
| 2.3.3 Modern syntax stays modern in the output | `erasure/` | `checks/modern-output.ts` |
| 3.1.1 Generating a project configuration file | `new-config/` | `checks/new-config.ts` |
| 3.1.2 The strict settings it turns on | `new-config/` | `checks/strict-settings.ts` |
| 3.2.1 Compiling one file inside a configured project | `project/` | `checks/one-file.ts` |
| 3.2.2 Ignoring the project configuration | `project/` | `checks/ignore-config.ts` |
| 3.2.3 Compiling the whole project | `project/` | `checks/whole-project.ts` |
| 3.3.2 The ES5 target is removed | `old-guides/` | `checks/es5-removed.ts` |
| 3.3.3 Classic module resolution is removed | `old-guides/` | `checks/classic-removed.ts` |
| 4.1.3 Neovim with the TypeScript language server | `editor/` | `checks/neovim.ts` |
| 4.2.1 Watch mode while you edit | `watch/` | `checks/watch.ts` |
| 4.2.2 Turning on source maps | `maps/` | `checks/source-maps.ts` |
| 4.2.3 Errors that point at the TypeScript source line | `maps/` | `checks/source-lines.ts` |
| 4.3.1 Project brief | `converter/` (start with `BRIEF.md`) | `checks/brief.ts` |
| 4.3.2 Building it with strict on | `converter/` | `checks/strict-build.ts` |
| 4.3.3 The contract line | `converter/` | `checks/converter.ts` |

There is no `tsconfig.json` at the root on purpose: several videos compile single files
from here, and a root config would make `tsc file.ts` stop with TS5112.
