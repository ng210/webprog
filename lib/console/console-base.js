class ConsoleBase {
    #color = DefaultColor;
    get color() {
        return this.#color;
    }
    set color(col) {
        this.#color = Object.values(Colors).indexOf(col) != -1 ? col : DefaultColor;
    }

    #lines = [];

    lines(ix = -1) {
        if (ix < 0) ix += this.#lines.length;
        return this.#lines[ix];
    }


    _write(txt) {
        throw new Error('Not Implemented!');
    }

    write(txt, ink) {
        this.#lines.push(...txt.split('\n'));
        if (ink != undefined) {
            var color = this.#color;
            this.#color = ink;
            this._write(txt);
            this.#color = color;
        } else {
            this._write(txt);
        }
    }

    writeln(txt, ink) {
        this.write(txt + '\n', ink);
    }

    log(txt) {
        this.writeln(txt);
    }

    debug(txt) {
        this.writeln(txt);
    }

    error(err) {
        var txt = err.toString();
        this.writeln(txt, Colors.LightRed); }

    async prompt(question) {
        throw new Error('Not Implemented!');
    }

    async choice(question, options) {
        throw new Error('Not Implemented!');
    }
}

const Colors = {
    'Black':        '#000000',
    'Red':          '#800000',
    'Green':        '#008000',
    'Yellow':       '#808000',
    'Blue':         '#000080',
    'Magenta':      '#800080',
    'Cyan':         '#008080',
    'LightGray':    '#c0c0c0',

    'Gray':         '#808080',
    'LightRed':     '#e04040',
    'LightGreen':   '#40e040',
    'LightYellow':  '#e0e040',
    'LightBlue':    '#4040e0',
    'LightMagenta': '#8400e0',
    'LightCyan':    '#40e0e0',
    'White':        '#ffffff'
};

const DefaultColor = Colors.LightGreen;

export { ConsoleBase, Colors, DefaultColor };