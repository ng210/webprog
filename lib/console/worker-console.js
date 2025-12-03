import { ConsoleBase, Colors } from './console-base.js'
import { html } from '../html.js';

class WorkerConsole extends ConsoleBase {
    constructor(lbl) {
        super();
    }

    write(txt) {
        throw new Error('Not implemented!');
    }
};

export { WorkerConsole };