import { resolve } from 'path';

export async function runCommandLine(args: string[]): Promise<void> {
    setTimeout(async () => {
        const runner = await import(resolve('dist', args[0]));
        runner.run.apply(runner, args.slice(1));
    }, 1);
};

runCommandLine(process.argv.slice(2));
