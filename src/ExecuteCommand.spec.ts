import { exec } from 'child_process';

export function executeCommand(command: string, out?: (...args: any[]) => void, err?: (...args: any[]) => void) {
    return new Promise((resolve: (...args: any[]) => void, reject: (...args: any[]) => void) => {
        let spawn = exec(command);
        if (spawn && spawn.stdout && out) spawn.stdout.on('data', out || resolve);
        if (spawn && spawn.stderr && err) spawn.stderr.on('data', err || reject);

        spawn.on('close', resolve);
    });
}
