# The commands from each lesson

Every command typed in the lesson videos, in order. Run them from the root of
this repository, after the setup in README.md.

## 1.1.2 Checking your Node and npm versions

```bash
node --version
npm --version
npx --version
node checks/versions.ts
```

## 1.1.3 Creating a project with npm

```bash
mkdir hello
cd hello
npm init -y
ls
cd ..
node checks/new-project.ts
```

## 1.1.4 What TypeScript adds to JavaScript

```bash
cat basics/greet.ts
node basics/greet.ts
npx tsc --noEmit basics/greet.ts
node checks/types-added.ts
```

## 1.2.1 Installing TypeScript 7 with npm

```bash
cd hello
npm install --save-dev --save-exact typescript@7.0.2
cat package.json
ls node_modules
cd ..
node checks/install.ts
```

## 1.2.2 Checking the TypeScript compiler version

```bash
cd hello
tsc --version
npx tsc --version
ls node_modules/.bin
cd ..
node checks/compiler-version.ts
```

## 1.3.1 Writing your first TypeScript file

```bash
cd hello
echo 'const message: string = "Hello, TypeScript 7";' > hello.ts
echo 'console.log(message);' >> hello.ts
cat hello.ts
cd ..
node checks/first-file.ts
```

## 1.3.2 Compiling TypeScript and running the JavaScript output

```bash
cd hello
npx tsc hello.ts
ls
cat hello.js
node hello.js
cd ..
node checks/compile-and-run.ts
```

## 1.3.3 Running TypeScript in Node with no build step

```bash
cd hello
ls
rm hello.js
node hello.ts
ls
cd ..
node checks/no-build-step.ts
```

## 2.1.1 Assigning a string to a number

```bash
cat errors/total.ts
npx tsc --noEmit errors/total.ts
cat errors/total-fixed.ts
npx tsc --noEmit errors/total-fixed.ts
node checks/string-to-number.ts
```

## 2.1.2 Reading the file, line and error code

```bash
npx tsc --noEmit errors/order.ts
cat -n errors/order.ts
npx tsc --noEmit --pretty false errors/order.ts
node checks/reading-errors.ts
```

## 2.1.3 The compiler fails when something is wrong

```bash
npx tsc --noEmit errors/total.ts
echo $?
npx tsc --noEmit errors/total-fixed.ts
echo $?
node checks/exit-code.ts
```

## 2.2.2 A parameter with no type

```bash
cat strict/greet.ts
npx tsc --noEmit strict/greet.ts
npx tsc --noEmit --strict false strict/greet.ts
cat strict/greet-typed.ts
npx tsc --noEmit strict/greet-typed.ts
node checks/implicit-any.ts
```

## 2.2.3 A value that might be null

```bash
cat strict/find.ts
npx tsc --noEmit strict/find.ts
node strict/find.ts
cat strict/find-checked.ts
npx tsc --noEmit strict/find-checked.ts
node strict/find-checked.ts
node checks/possibly-null.ts
```

## 2.3.2 Comparing TypeScript to JavaScript basics

```bash
cat erasure/price.ts
npx tsc erasure/price.ts
cat erasure/price.js
node erasure/price.ts
node erasure/price.js
node checks/type-erasure.ts
```

## 2.3.3 Modern syntax stays modern in the output

```bash
cat erasure/modern.ts
npx tsc erasure/modern.ts
cat erasure/modern.js
npx tsc --target es2015 --outDir erasure/es2015 erasure/modern.ts
cat erasure/es2015/modern.js
node checks/modern-output.ts
```

## 3.1.1 Generating a project configuration file

```bash
cd new-config
ls
npx tsc --init
head -n 12 tsconfig.json
cd ..
node checks/new-config.ts
```

## 3.1.2 The strict settings it turns on

```bash
grep -n strict new-config/tsconfig.json
grep -n -A 2 Stricter new-config/tsconfig.json
cat new-config/scores.ts
npx tsc --noEmit -p new-config
npx tsc --noEmit new-config/scores.ts
node checks/strict-settings.ts
```

## 3.2.1 Compiling one file inside a configured project

```bash
cd project
ls
cat tsconfig.json
npx tsc src/main.ts
cd ..
node checks/one-file.ts
```

## 3.2.2 Ignoring the project configuration

```bash
cd project
npx tsc src/main.ts
npx tsc --ignoreConfig src/main.ts
ls src
node src/main.js
cd ..
node checks/ignore-config.ts
```

## 3.2.3 Compiling the whole project

```bash
cd project
cat tsconfig.json
npx tsc -p .
ls dist
node dist/main.js
cd ..
node checks/whole-project.ts
```

## 3.3.2 The ES5 target is removed

```bash
cat old-guides/tsconfig.es5.json
npx tsc -p old-guides/tsconfig.es5.json
cat old-guides/tsconfig.json
npx tsc -p old-guides
node checks/es5-removed.ts
```

## 3.3.3 Classic module resolution is removed

```bash
cat old-guides/tsconfig.classic.json
npx tsc -p old-guides/tsconfig.classic.json
npx tsc -p old-guides/tsconfig.node.json
cat old-guides/tsconfig.json
npx tsc -p old-guides
node checks/classic-removed.ts
```

## 4.1.3 Neovim with the TypeScript language server

```bash
cat editor/init.lua
cat editor/app.ts
nvim --headless -u editor/init.lua -l editor/ask.lua
node checks/neovim.ts
```

## 4.2.1 Watch mode while you edit

```bash
cd watch
cat src/greet.ts
node edits/editor.ts &
npx tsc --watch --preserveWatchOutput
cd ..
node checks/watch.ts
```

## 4.2.2 Turning on source maps

```bash
cat maps/tsconfig.json
npx tsc -p maps
ls maps/dist
tail -n 2 maps/dist/app.js
node checks/source-maps.ts
```

## 4.2.3 Errors that point at the TypeScript source line

```bash
cat -n maps/src/app.ts
npx tsc -p maps
node maps/dist/app.js
node --enable-source-maps maps/dist/app.js
node checks/source-lines.ts
```

## 4.3.1 Project brief

```bash
cat converter/BRIEF.md
ls converter/src
cat converter/src/units.ts
node checks/brief.ts
```

## 4.3.2 Building it with strict on

```bash
cat converter/tsconfig.json
cat converter/src/convert.ts
npx tsc -p converter
ls converter/dist
node converter/dist/main.js
node checks/strict-build.ts
```

## 4.3.3 The contract line

```bash
grep -n -A 5 Done converter/BRIEF.md
grep -n Step checks/converter.ts
node checks/converter.ts
```
