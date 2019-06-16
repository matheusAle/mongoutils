import {Credentials} from './Credentials.interface';

export function createDumpCommand(options: Credentials): string {
    let command = `mongodump --db ${options.database} --host ${options.host} --out ${options.dist}`;
    if (options.username)
        command += ` --username ${options.username}`;

    if (options.password)
        command += ` --password ${options.password}`;

    if (options.authenticationDatabase)
        command += ` --authenticationDatabase ${options.authenticationDatabase}`;



    return command;
}
