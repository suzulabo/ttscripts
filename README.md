# ttscripts

ttscripts is a simple task runner that can be written in TypeScript or JavaScript.

## Install

```
npm i -D @suzulabo/ttscripts
```

## Usage

Writing the task content.

Example) scripts/index.ts

```typescript
import { Cmd, main, RunP, RunS, ScriptEntries } from '@suzulabo/ttscripts';

const functionTask = () => {
  console.log('done.');
};

const entries: ScriptEntries = [
  ['hello', Cmd('echo hello')],
  ['function', functionTask],
  [
    'sequential',
    RunS([Cmd('sleep 1 && echo 1'), Cmd('sleep 1 && echo 2'), Cmd('sleep 1 && echo 3')]),
  ],
  [
    'parallel',
    RunP([Cmd('sleep 1 && echo 1'), Cmd('sleep 1 && echo 2'), Cmd('sleep 1 && echo 3')]),
  ],
];

const name = process.argv[2];
const args = process.argv.slice(3);

main(entries, name, args).catch(err => {
  console.error(err);
  process.exit(1);
});
```

You can run it any way, but for example using scripts of package.json

```json
  "scripts": {
    "-": "node -r esbuild-register scripts/index.ts"
  },
```

then you can run it like this.

```
npm run - hello
```

### JavaScript example

Example) scripts/index.js

```javascript
const { Cmd, main, RunS, RunP } = require('@suzulabo/ttscripts');

// @ts-check

const functionTask = () => {
  console.log('done.');
};

/** @type {import("@suzulabo/ttscripts").ScriptEntries} */
const entries = [
  ['hello', Cmd('echo hello')],
  ['function', functionTask],
  [
    'sequential',
    RunS([Cmd('sleep 1 && echo 1'), Cmd('sleep 1 && echo 2'), Cmd('sleep 1 && echo 3')]),
  ],
  [
    'parallel',
    RunP([Cmd('sleep 1 && echo 1'), Cmd('sleep 1 && echo 2'), Cmd('sleep 1 && echo 3')]),
  ],
];

const name = process.argv[2];
const args = process.argv.slice(3);

main(entries, name, args).catch(err => {
  console.error(err);
  process.exit(1);
});
```

```json
  "scripts": {
    "-": "node scripts/index.js"
  },
```

### Reference (project actually used)

> [@suzulabo/troom](https://github.com/suzulabo/troom)
