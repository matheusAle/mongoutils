import {createRestoreCommand} from './CreateRestoreCommand';
import {Restore} from './Restore.interface';

describe('CreateRestoreCommand', () => {

    let auth: Restore;

    beforeEach(() => {
        auth = { database: 'test', host: 'mongodb://localhost:27017', from: './temp' }
    });

    it('Dump all db collections', () => {
        const [command] = createRestoreCommand(auth);

        expect(command).toContain('--db test');
        expect(command).toContain('--dir ./temp');
        expect(command).toContain('--host mongodb://localhost:27017');
    });

    it('Generate commands to collections', () => {

        const collections: Array<{ name: string }>= [
            { name: 'c-1' },
            { name: 'c-2', }
        ];

        const [c1, c2] = createRestoreCommand({ ...auth, collections });

        expect(c1).toContain(`--collection ${collections[0].name}`);
        expect(c2).toContain(`--collection ${collections[1].name}`);
    })
});
