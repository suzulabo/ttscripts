# ttscripts

ttscripts は TypeScript、JavaScript で書けるシンプルなタスクランナーです。

## インストール

```
npm i -D @suzulabo/ttscripts
```

## 使い方

タスク内容をコーディングします。

（例）scripts/index.ts

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

実行方法は任意ですが、例えば package.json の scripts に以下のように記載します。

```json
  "scripts": {
    "-": "node -r esbuild-register scripts/index.ts"
  },
```

以下のように実行できます。

```
npm run - hello
```

### JavaScript での例

（例）scripts/index.js

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

### 参考(実際に利用しているプロジェクト)

> [@suzulabo/troom](https://github.com/suzulabo/troom)
