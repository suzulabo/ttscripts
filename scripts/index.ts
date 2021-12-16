import { Cmd, main, ScriptEntries } from '../src';

const entries: ScriptEntries = [
  // hello
  ['hello', Cmd('echo hello')],
];

const name = process.argv[2];
const args = process.argv.slice(3);

main(entries, name, args).catch(err => {
  console.error(err);
  process.exit(1);
});
