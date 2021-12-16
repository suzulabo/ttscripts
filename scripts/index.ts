import { Cmd, main, ScriptEntries } from '../src';

const entries: ScriptEntries = [
  // hello
  ['hello', Cmd('echo hello')],

  // build
  ['build', Cmd('tsc -p tsconfig.build.json')],
  ['lint', Cmd('eslint src')],
];

const name = process.argv[2];
const args = process.argv.slice(3);

main(entries, name, args).catch(err => {
  console.error(err);
  process.exit(1);
});
