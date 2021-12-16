export class Printer {
  printUsage(tasks: string[]) {
    tasks.sort();
    console.info(`\n${tasks.join('\n')}\n`);
  }

  taskNotFound(task: string) {
    console.warn(`invalid task: ${task}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(_name?: string, _args?: string[]) {
    console.info(`## ${new Date().toLocaleTimeString(undefined, { hour12: false })} ##\n`);
  }

  runCommand(cmd: string, args?: string[]) {
    console.info(`> ${cmd} ${args?.join(' ')}\n`);
  }
  runFunction(name: string) {
    console.info(`> ${name}\n`);
  }

  runScript(name: string) {
    console.info(`> ${name}\n`);
  }
}

let _printer = new Printer();

export const setPrinter = (p: Printer) => {
  _printer = p;
};

export const printer = () => {
  return _printer;
};
