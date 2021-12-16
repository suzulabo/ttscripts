import { spawn } from 'child_process';

export const sh = (command: string, args?: string[], options?: { cwd?: string }) => {
  return new Promise<void>((resolve, reject) => {
    const p = spawn(command, args || [], { shell: true, stdio: 'inherit', cwd: options?.cwd });

    p.on('exit', code => {
      if (code == 0) {
        resolve();
      } else {
        reject(new Error(`Error: ${code}`));
      }
    });
  });
};
