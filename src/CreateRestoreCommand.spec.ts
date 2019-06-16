
import { Credentials } from './Credentials.interface';
import { createDumpCommand } from './CreateDumpCommand'

describe('CreateDumpCommand', () => {

    let auth: Credentials;

    beforeEach(() => {
        auth = { database: 'test', host: 'mongodb://localhost:27017', dist: './temp' }
    });

    it('Dump all db collections', () => {
        const [command] = createDumpCommand(auth);

        expect(command).toContain('--db test');
        expect(command).toContain('--out ./temp');
        expect(command).toContain('--host mongodb://localhost:27017');
    });

    it('Generate commands to collections', () => {

        const collections: Array<{ name: string, query?: string }>= [
            { name: 'c-1' },
            { name: 'c-2', query: '{foo: \'bar\'}' }
        ];

        const [c1, c2] = createDumpCommand({ ...auth, collections });

        expect(c1).toContain(`--collection ${collections[0].name}`);
        expect(c2).toContain(`--collection ${collections[1].name} -q '${collections[1].query}'`);
    })

});
