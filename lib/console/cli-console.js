import { ConsoleBase, Colors } from './console-base.js'
import { poll } from '../util.js'
import readline from 'node:readline';

class CliConsole extends ConsoleBase {
    static cons = null;

    constructor() {
        CliConsole.initColors();
        super();
    }

    wr(txt) {
        process.stdout.write(this.color + txt);
    }

    async prompt(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          var answer = null;
          rl.question(this.color + question + ': ', a => {
            answer = a;
            rl.close();
          });
          
          await poll( () => answer != null);
          console.log(answer);
          return answer;
    }

    async choice(question, options) {
        var answer = null;
        if (process.stdin.isTTY) {
            for (var oi in options) {
                this.write(`${oi}-${options[oi]} `);
            }

            var listener = function(_, data) {
                var name = data.name;
                var ctrl = data.ctrl;
                var isEscaping = true;
                for (var si=0; si<data.sequence.length; si++) {
                    if (data.sequence[si] != "\x1b") {
                        isEscaping = false;
                        break;
                    }
                }

                var isExiting = false;
                if (isEscaping) answer = '\x1b';
                else if (!data.meta && name) {
                    var key = name.toUpperCase();
                    if (!ctrl) {
                        for (var oi in options) {
                            if (oi.toUpperCase() == key) {
                                answer = options[oi];
                                break;
                            }
                        }
                    } else {
                        if (name == 'c') {
                            answer = '';
                            isExiting = true;
                        }
                    }
                }

                if (answer != null) {
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                }

                if (isExiting) {
                    process.exit(0);
                }
            };
            readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('keypress', listener);
            await poll( () => answer != null);
            process.stdin.off('keypress', listener);

            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            this.writeln(answer);
        }
        return answer;
    }

    static initColors() {
        Colors.Black =        '\x1b[30m';
        Colors.Red =          '\x1b[31m';
        Colors.Green =        '\x1b[32m';
        Colors.Yellow =       '\x1b[33m';
        Colors.Blue =         '\x1b[34m';
        Colors.Magenta =      '\x1b[35m';
        Colors.Cyan =         '\x1b[36m';
        Colors.LightGray =    '\x1b[37m';
        Colors.Gray =         '\x1b[90m';
        Colors.LightRed =     '\x1b[91m';
        Colors.LightGreen =   '\x1b[92m';
        Colors.LightYellow =  '\x1b[93m';
        Colors.LightBlue =    '\x1b[94m';
        Colors.LightMagenta = '\x1b[95m';
        Colors.LightCyan =    '\x1b[96m';
        Colors.White =        '\x1b[97m';
    }
};

export { CliConsole, Colors };