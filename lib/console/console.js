import { Colors } from './console-base.js'

var _console = null;
async function getConsole(args) {
    if (_console == null) {
        if (typeof window !== 'undefined') {
            var mod = await import('./browser-console.js');
            _console = mod.BrowserConsole.instance;
            if (args) {
                _console.append(args);
            }
        } else if (typeof self !== 'undefined') {
            mod = await import('./worker-console.js');
            _console = mod.WorkerConsole.instance;
        } else {
            mod = await import('./cli-console.js');
            _console = mod.CliConsole.instance;
        }
    }
    return _console;
}

export { getConsole, Colors };