import { sh } from './sh';

type ScriptFunction = (args?: string[]) => Promise<unknown> | void;

class Command {
  constructor(public readonly cmd: string, public readonly cwd?: string) {}
  exec(args?: string[]) {
    return sh(this.cmd, args, { cwd: this.cwd });
  }
}

export const Cmd = (cmd: string, cwd?: string) => {
  return new Command(cmd, cwd);
};

type Script = ScriptFunction | Command;

class ParallelRun {
  constructor(public readonly scripts: (string | Script)[]) {}
}
class SequentialRun {
  constructor(public readonly scripts: (string | Script)[]) {}
}

export const RunP = (scripts: (string | Script)[]) => {
  return new ParallelRun(scripts);
};
export const RunS = (scripts: (string | Script)[]) => {
  return new SequentialRun(scripts);
};

export type ScriptEntries = [string, Script | ParallelRun | SequentialRun][];

const execScript = async (script: Script, args?: string[]) => {
  if (script instanceof Command) {
    console.info(`> ${script.cmd} ${args?.join(' ')}`);
    console.info();
    await script.exec(args);
    return;
  }

  if (typeof script == 'function') {
    console.info(`> ${script.name}`);
    console.info();
    await script(args);
    return;
  }

  throw 'never';
};

export const runScript = async (entries: ScriptEntries, name: string, args: string[]) => {
  const scriptMap = new Map(entries);

  const run = async (k: string | Script) => {
    if (typeof k != 'string') {
      await execScript(k, args);
    } else {
      const s = scriptMap.get(k);
      if (!s) {
        throw `invalid name: ${k}`;
      }

      console.info(`> ${k}`);

      if (s instanceof ParallelRun) {
        console.info();

        await Promise.all(
          s.scripts.map(v => {
            return run(v);
          }),
        );
        return;
      }
      if (s instanceof SequentialRun) {
        console.info();

        for (const v of s.scripts) {
          await run(v);
        }
        return;
      }

      await execScript(s, args);
    }
  };

  await run(name);
};
