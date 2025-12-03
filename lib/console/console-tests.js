import { getConsole, Colors } from './console.js'
import Test from '../test/test.js'

class ConsoleTests extends Test {
    #cons = null;

    async setupAll() {
        this.#cons = await getConsole();
    }

    async testWriteln() {
        let line = 'This is a single line.';
        this.#cons.writeln(line);
        this.isTrue('Wrote a line', this.#cons.lines(-1) == line);
    }

    async testColors() {
        this.cons.writeln('');
        var color = this.#cons.color;
        for (var ci in Colors) {
            this.#cons.color = Colors[ci];
            this.#cons.write('██');
        }
        this.#cons.color = color;
        this.#cons.writeln('');

        this.isEqual('Write colors', this.#cons.lines(-1), '████████████████');
    }

    async testPrompt() {
        var answer = await this.cons.prompt('Type "hi"');
        this.#cons.writeln('');
        this.isEqual('Prompt for \'hi\'', answer, 'hi');
    }

    async testChoice() {
        var answer = await this.cons.choice('Select', { 'O': 'Ok', 'C': 'Cancel'});
        this.#cons.writeln(`Selected '${answer}'`);
        this.isTrue('Choose \'ok\' or \'cancel\'', answer == 'Ok' || answer == 'Cancel');
    }
}

export { ConsoleTests }