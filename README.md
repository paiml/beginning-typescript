# Your First TypeScript Programs

Go from an empty folder to a working, strictly typed TypeScript project, and learn
to read what the compiler tells you along the way.

This repository holds every example from the **Your First TypeScript 7 Programs**
video lessons. You start by creating a project of your own, then use the examples
here to see what the compiler checks, how a `tsconfig.json` shapes a project, and how
editors, watch mode and source maps fit into your day. You finish by building a
small typed unit converter.

<details>
  <summary><b>Table of Contents</b></summary>
  <br>

* [What you will learn](#what-you-will-learn)
* [Who this is for](#who-this-is-for)
* [Get set up](#get-set-up)
* [How each lesson works](#how-each-lesson-works)
* [Learning path](#learning-path)
  * [1. Your first TypeScript program](#1-your-first-typescript-program)
  * [2. What the compiler checks](#2-what-the-compiler-checks)
  * [3. Configuring a project](#3-configuring-a-project)
  * [4. Your everyday workflow](#4-your-everyday-workflow)
  * [5. Project: a typed unit converter](#5-project-a-typed-unit-converter)
* [Check your progress](#check-your-progress)
* [Troubleshooting](#troubleshooting)
* [Where to go next](#where-to-go-next)

</details>

## What you will learn

By the end of these lessons you will be able to:

* Create an npm project and install a pinned version of the TypeScript 7 compiler
* Write a TypeScript file, compile it to JavaScript, and run it, with or without a
  build step
* Read a compiler error: the file, the line, the error code and the message
* Explain what strict mode catches, such as a parameter with no type or a value that
  might be `null`
* Explain what happens to your types when TypeScript becomes JavaScript
* Generate and use a `tsconfig.json`, and know when the compiler reads it and when it
  doesn't
* Recognize the old settings TypeScript 7 removed, and what to use instead
* Work the way you will every day: an editor with the TypeScript language server,
  watch mode, and source maps that point errors at your TypeScript
* Build a small multi-file project with strict checks on, from a brief

> [!NOTE]
> **Diversity Statement:** We share a commitment to diversity and equity, removing
> barriers to learning so that everyone can participate fully. These lessons are meant
> to be useful to people with a wide range of backgrounds, identities, and learning
> styles, whether you found them through a course or on your own on GitHub.

## Who this is for

You know some JavaScript (variables, functions, arrays and objects) and have never
set up a TypeScript project. No prior TypeScript experience is needed.

You will also need to be comfortable running commands in a terminal: moving between
folders with `cd`, listing files with `ls`, and reading them with `cat`.

## Get set up

You need:

* **Node.js 22.18 or later**, which can run `.ts` files directly. The lessons were
  recorded with Node.js 25.1.0.
* **npm**, which comes with Node.js. The lessons use npm 11.6.2.
* **Neovim 0.11 or later**, only for the editor lesson. The lesson uses Neovim 0.12.6.

To install Node.js, follow npm's guide,
[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
It recommends a Node version manager (nvm on macOS and Linux, nvm-windows on Windows),
or you can use the LTS installer from the [Node.js download page](https://nodejs.org/en/download).
Afterwards, `node -v` and `npm -v` should each print a version.

Clone the repository and install the pinned packages:

```bash
git clone https://github.com/paiml/beginning-typescript.git
cd beginning-typescript
npm ci        # installs TypeScript 7.0.2, exactly as pinned in package-lock.json
npm test      # runs every check program; all of them should pass
```

TypeScript is pinned to **7.0.2**, so the errors and messages you see match the ones
in the videos. The first `npm test` needs network access: it builds its own copy of the
`hello` project, which runs `npm install`.

## How each lesson works

Every lesson ends the same way: with a check program in [`checks/`](checks) that
confirms what you just saw.

```bash
cat errors/total.ts                    # 1. Read the example
npx tsc --noEmit errors/total.ts       # 2. Type-check it (--noEmit: no .js files are written)
node checks/string-to-number.ts        # 3. Confirm the lesson's contract
```

A few conventions help you find your way:

* **Run everything from the root of this repository.** Some lessons `cd` into a folder
  first; they always `cd ..` back before running the check.
* **Some files are wrong on purpose.** They contain the mistakes the compiler is meant
  to catch. Look for the fixed version next to them: a file ending in `-fixed`,
  `-typed` or `-checked`.
* **Every check program** runs the compiler and Node.js for you, asserts what should
  happen (which file passes, which error code a broken file produces, what gets
  printed) and ends with a `contract: … OK` line. If anything is different, it stops
  with an error that tells you what changed.
* **[LESSONS.md](LESSONS.md)** lists every command typed in every video, in order.
  Use it to follow along, or to replay a lesson without the video.

## Learning path

Work through the sections in order: each one builds on the one before it. For every
lesson, the table lists where the lesson works and the check program that confirms
what you learned.

### 1. Your first TypeScript program

Start from nothing: check your tools, create a project, install TypeScript, and run
your first file.

**You will be able to:** create an npm project, install an exact version of
TypeScript, compile a `.ts` file to JavaScript, and run TypeScript directly with
Node.js.

> [!IMPORTANT]
> These lessons build a project of your own in `hello/`, which is **not** part of this
> repository: you create it by following along. Do them in order, because each one
> starts where the one before it stopped. The commands are in [LESSONS.md](LESSONS.md).

| Lesson | Where | Check |
|---|---|---|
| Checking your Node and npm versions | your machine | [`versions.ts`](checks/versions.ts) |
| Creating a project with npm | `hello/` | [`new-project.ts`](checks/new-project.ts) |
| What TypeScript adds to JavaScript | [`basics/greet.ts`](basics/greet.ts) | [`types-added.ts`](checks/types-added.ts) |
| Installing TypeScript 7 with npm | `hello/` | [`install.ts`](checks/install.ts) |
| Checking the TypeScript compiler version | `hello/` | [`compiler-version.ts`](checks/compiler-version.ts) |
| Writing your first TypeScript file | `hello/` | [`first-file.ts`](checks/first-file.ts) |
| Compiling TypeScript and running the JavaScript output | `hello/` | [`compile-and-run.ts`](checks/compile-and-run.ts) |
| Running TypeScript in Node with no build step | `hello/` | [`no-build-step.ts`](checks/no-build-step.ts) |

**Try it yourself:** in `hello/hello.ts`, give `message` the value `42` instead of
a string and run `npx tsc hello.ts` from inside `hello/`. Read the error, then put the
string back.

**Read more:** [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
in the TypeScript Handbook.

### 2. What the compiler checks

Learn to read the compiler's errors, see what strict mode adds, and find out what is
left of your types once TypeScript becomes JavaScript.

**You will be able to:** read an error's file, line, code and message, use the
compiler's exit code, fix implicit `any` and possibly-`null` errors, and explain type
erasure.

| Lesson | Study | Check |
|---|---|---|
| Assigning a string to a number | [`total.ts`](errors/total.ts) → [`total-fixed.ts`](errors/total-fixed.ts) | [`string-to-number.ts`](checks/string-to-number.ts) |
| Reading the file, line and error code | [`order.ts`](errors/order.ts) | [`reading-errors.ts`](checks/reading-errors.ts) |
| The compiler fails when something is wrong | [`total.ts`](errors/total.ts), [`total-fixed.ts`](errors/total-fixed.ts) | [`exit-code.ts`](checks/exit-code.ts) |
| A parameter with no type | [`greet.ts`](strict/greet.ts) → [`greet-typed.ts`](strict/greet-typed.ts) | [`implicit-any.ts`](checks/implicit-any.ts) |
| A value that might be null | [`find.ts`](strict/find.ts) → [`find-checked.ts`](strict/find-checked.ts) | [`possibly-null.ts`](checks/possibly-null.ts) |
| Comparing TypeScript to JavaScript basics | [`price.ts`](erasure/price.ts) | [`type-erasure.ts`](checks/type-erasure.ts) |
| Modern syntax stays modern in the output | [`modern.ts`](erasure/modern.ts) | [`modern-output.ts`](checks/modern-output.ts) |

**Try it yourself:** [`errors/order.ts`](errors/order.ts) has two errors. Fix both
until `npx tsc --noEmit errors/order.ts` reports nothing, then check the exit code
with `echo $?`.

**Read more:** [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
in the TypeScript Handbook.

### 3. Configuring a project

A real project has a `tsconfig.json`. Generate one, see the strict settings it turns
on, and learn how it changes what `tsc` does.

**You will be able to:** generate a `tsconfig.json` with `tsc --init`, compile a whole
project with `-p`, explain why naming a single file behaves differently inside a
configured project, and replace settings TypeScript 7 no longer supports.

| Lesson | Study | Check |
|---|---|---|
| Generating a project configuration file | [`new-config/`](new-config) | [`new-config.ts`](checks/new-config.ts) |
| The strict settings it turns on | [`scores.ts`](new-config/scores.ts) | [`strict-settings.ts`](checks/strict-settings.ts) |
| Compiling one file inside a configured project | [`project/`](project) | [`one-file.ts`](checks/one-file.ts) |
| Ignoring the project configuration | [`project/src/`](project/src) | [`ignore-config.ts`](checks/ignore-config.ts) |
| Compiling the whole project | [`project/tsconfig.json`](project/tsconfig.json) | [`whole-project.ts`](checks/whole-project.ts) |
| The ES5 target is removed | [`tsconfig.es5.json`](old-guides/tsconfig.es5.json) → [`tsconfig.json`](old-guides/tsconfig.json) | [`es5-removed.ts`](checks/es5-removed.ts) |
| Classic module resolution is removed | [`tsconfig.classic.json`](old-guides/tsconfig.classic.json) → [`tsconfig.node.json`](old-guides/tsconfig.node.json) | [`classic-removed.ts`](checks/classic-removed.ts) |

**Try it yourself:** in [`project/src/main.ts`](project/src/main.ts), add the line
`console.log(greeting(42));` and build with `npx tsc -p project`. The error points at
`main.ts`, where the mistake is, even though `greeting` is declared in another file.
Remove the line when you're done.

**Read more:** [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
in the TypeScript Handbook, and the [TSConfig reference](https://www.typescriptlang.org/tsconfig/).

### 4. Your everyday workflow

Set up the tools you'll use every time you write TypeScript: an editor that shows
errors as you type, a compiler that rechecks on every save, and source maps.

**You will be able to:** connect an editor to TypeScript 7's language server, keep
`tsc --watch` running while you edit, and turn on source maps so runtime errors point
at your TypeScript instead of the generated JavaScript.

| Lesson | Study | Check |
|---|---|---|
| Neovim with the TypeScript language server | [`init.lua`](editor/init.lua), [`app.ts`](editor/app.ts) | [`neovim.ts`](checks/neovim.ts) |
| Watch mode while you edit | [`watch/`](watch) | [`watch.ts`](checks/watch.ts) |
| Turning on source maps | [`maps/tsconfig.json`](maps/tsconfig.json) | [`source-maps.ts`](checks/source-maps.ts) |
| Errors that point at the TypeScript source line | [`app.ts`](maps/src/app.ts) | [`source-lines.ts`](checks/source-lines.ts) |

Not a Neovim user? The idea is the same in any editor: it starts the project's own
`tsc` as a language server. VS Code and most other editors support TypeScript out of
the box.

**Try it yourself:** in the video, a script plays the part of your editor. Do it for
real instead: run `npx tsc --watch` inside `watch/`, open
[`watch/src/greet.ts`](watch/src/greet.ts) in your editor, and save a type error.
Watch the compiler report it, then fix it and watch the error go away. Afterwards,
`git checkout -- watch/src/greet.ts` puts the file back.

**Read more:** [`sourceMap`](https://www.typescriptlang.org/tsconfig/#sourceMap) in the
TSConfig reference.

### 5. Project: a typed unit converter

Bring everything together by building a small converter with strict checks on. Start
with the brief in [`converter/BRIEF.md`](converter/BRIEF.md).

**You will be able to:** describe a fixed set of values with a type, split a program
across files, build it with a strict `tsconfig.json`, and tell apart the mistakes the
compiler catches from the ones only running the code can find.

| Lesson | Study | Check |
|---|---|---|
| Project brief | [`BRIEF.md`](converter/BRIEF.md), [`units.ts`](converter/src/units.ts) | [`brief.ts`](checks/brief.ts) |
| Building it with strict on | [`tsconfig.json`](converter/tsconfig.json), [`convert.ts`](converter/src/convert.ts) | [`strict-build.ts`](checks/strict-build.ts) |
| The contract line | [`main.ts`](converter/src/main.ts) | [`converter.ts`](checks/converter.ts) |

```bash
npx tsc -p converter            # builds into converter/dist, no errors
node converter/dist/main.js     # prints three conversions
```

**Try it yourself:** teach the converter meters and feet. Add `"m"` and `"ft"` to
`Unit` in [`units.ts`](converter/src/units.ts), add a rule for each direction in
[`convert.ts`](converter/src/convert.ts), and print a fourth conversion from
[`main.ts`](converter/src/main.ts). Along the way, try converting to a unit that
doesn't exist, and then a pair with no rule (such as `"km"` to `"kg"`): one fails when
you compile, the other only when you run.

## Check your progress

Run every check program at once:

```bash
npm test
```

Each check program must print its `contract: … OK` line for the test to pass. If you
have been experimenting with the examples, a failing check tells you exactly which
lesson no longer behaves the way it describes. Use `git diff` to see what you changed
and `git checkout -- <file>` to put a file back.

The helpers the check programs share live in [`checks/tools.ts`](checks/tools.ts).

## Troubleshooting

* **`node` refuses to run a `.ts` file:** your Node.js is older than 22.18. Check with
  `node --version` and upgrade.
* **`checks/neovim.ts` fails:** Neovim 0.11 or later isn't installed. It's only needed
  for the editor lesson; every other check passes without it.
* **The first `npm test` fails while installing:** it needs network access to build
  its copy of the `hello` project.
* **`tsc file.ts` stops with TS5112:** there's a `tsconfig.json` at the root of the
  repository. There isn't one on purpose, because several lessons compile single files
  from here; remove it.
* **`.js` files and `dist/` folders appeared:** some lessons compile on purpose. They
  are ignored by git and safe to delete.
* **Your error messages look different from the videos:** run `npm ci` so you have
  TypeScript 7.0.2 from `package-lock.json`, and call it through `npx tsc` rather than
  a globally installed `tsc`.

## Where to go next

Keep learning with more courses from Pragmatic AI Labs, on whichever platform you
prefer:

* [**Pragmatic AI Labs platform**](https://ds500.paiml.com): the full catalog of
  courses and hands-on programs
* [**Pragmatic AI Labs on Coursera**](https://www.coursera.org/partners/pragmatic-ai-labs)
* [**Pragmatic AI Labs on edX**](https://www.edx.org/school/ai)

Then put what you learned here into practice:

* Start a new project from scratch the way you did with `hello/`, and turn on
  [`strict`](https://www.typescriptlang.org/tsconfig/#strict) from the first commit.
* Rename a JavaScript file you've already written to `.ts` and fix what the compiler
  finds.
* Keep reading the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html):
  everyday types, narrowing and object types build directly on what you learned here.
