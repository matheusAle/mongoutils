import { executeCommand } from './ExecuteCommand'

describe('ExecuteCommand', () => {

    it('pwd', async (cb) => {
        const stdout = await executeCommand('pwd', (out) => {
            expect(__dirname).toContain(out.trim());
            cb();
        }, (e) => cb(e));

        expect(stdout).toBe(0);
    });
});
