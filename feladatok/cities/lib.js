function poll(action, timeout) {
    async function poll_(action, timeout, resolve, args) {
        clearTimeout(action.timer);
        var result = await action(...args);
        if (result) resolve(result);
        else action.timer = setTimeout(poll_, timeout, action, timeout, resolve, args);
    }

    var args_ = [];
    for (var i=2; i<arguments.length; i++) {
        args_.push(arguments [i]);
    }
    return new Promise(resolve => {
        poll_(action, timeout || 100, resolve, args_);
    });
}

function sleep(milliseconds) {
    var isFirst = true;
    return poll( () => {
        //var p = isFirst;
        isFirst = !isFirst;
        return isFirst;
    }, milliseconds);
}

class HTML {
    static Entities = {
        'nbsp':  { 'char': ' ',  'name': 'nbsp',  'code':160 },
        'nbsp':  { 'char': '\t', 'name': 'nbsp',  'code':160 },
        'lt':    { 'char': '<',  'name': 'lt',    'code':60 },
        'gt':    { 'char': '>',  'name': 'gt',    'code':62 },
        'amp':   { 'char': '&',  'name': 'amp',   'code':38 },
        'quot':  { 'char': '"',  'name': 'quot',  'code':34 },
        'apos':  { 'char': "'",  'name': 'apos',  'code':39 },
        'cent':  { 'char': '¢',  'name': 'cent',  'code':162 },
        'pound': { 'char': '£',  'name': 'pound', 'code':163 },
        'yen':   { 'char': '¥',  'name': 'yen',   'code':165 },
        'euro':  { 'char': '€',  'name': 'euro',  'code':8364 },
        'copy':  { 'char': '©',  'name': 'copy',  'code':169 },
        'reg':   { 'char': '®',  'name': 'reg',   'code':174 }
    };

    static encode(txt) {
        var chunks = [];
        var isSep = true;
        if (typeof txt === 'string') {
            var start = 0;
            for (var ci=0; ci<txt.length; ci++) {
                var ch = txt.charAt(ci);
                var swapToken = '';
                if (ch == '\n') {
                    swapToken = '<br/>';
                    isSep = true;
                } else if (ch == ' ') {
                    if (isSep) {
                        swapToken = '&nbsp;';
                    }
                } else {
                    for (var key in HTML.Entities) {
                        if (HTML.Entities[key].char == ch) {
                            swapToken = `&${key};`;
                            break;
                        }
                    }
                    isSep = false;
                }
                if (swapToken) {
                    if (ci > start) {
                        chunks.push(txt.substring(start, ci));
                    }
                    chunks.push(swapToken);
                    start = ci + 1;
                }
            }
            if (ci > start) {
                chunks.push(txt.substring(start, ci));
            }
        } else {
            chunks.push(txt);
        }

        return chunks.join('');
    }
}

class ConsoleBase {
    #color = DefaultColor;
    get color() {
        return this.#color;
    }
    set color(col) {
        if (Colors[col]) this.#color = Colors[col];
        else if (Object.values(Colors).includes(col)) this.#color = col;
        else this.#color = DefaultColor;
    }

    #lines = [];

    lines(ix = -1) {
        if (ix < 0) ix += this.#lines.length;
        return this.#lines[ix];
    }


    _write(txt) {
        throw new Error('Not Implemented!');
    }

    clear() {
        throw new Error('Not Implemented!');
    }

    write(txt, ink) {
        if (txt == undefined) txt = '';
        else txt += ''
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
        if (txt == undefined) txt = '';
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
}

const DefaultColor = Colors.Green;

class BrowserConsole extends ConsoleBase {
    static #singleton = null;
    #console = null;
    #border = null;
    #content = null;
    #parent = null;
    options = {
        'showCaller': false
    };
    #isDragging = false;
    enable = true;
    #top = 100;

    static get instance() {
        if (BrowserConsole.#singleton == null) {
            BrowserConsole.#singleton = new BrowserConsole();
        }
        return BrowserConsole.#singleton;
    }

    constructor(parentId, options) {
        super();
        this.#console = document.createElement('console');
        this.#border = document.createElement('div');
        this.#border.className = 'console-border';
        this.#border.addEventListener('pointerdown', e => this.#onPointerDown(e));
        this.#border.addEventListener('pointerup', e => this.#onPointerUp(e));
        this.#border.addEventListener('pointermove', e => this.#onPointerMove(e));

        this.#console.appendChild(this.#border);
        this.#content = document.createElement('div');
        this.#content.className = 'console-content';
        this.#console.appendChild(this.#content);

        if (typeof parentId === 'string') {
            this.#parent = document.getElementById(parentId);
        } else {
            this.#parent = document.body;
        }

        for (let key in options) {
            if (this.options[key] !== undefined) {
                this.options[key] = options[key];
            }
        }

        //this.#top = 0.75*document.body.clientHeight;
    }

    #onPointerDown(e) {
        this.#isDragging = true;
        this.#border.setPointerCapture(e.pointerId);
    }

    #onPointerUp(e) {
        this.#isDragging = false;
        this.#border.releasePointerCapture(e.pointerId);
    }

    #onPointerMove(e) {
        if (this.#isDragging) {
            this.setConsoleTop(e.clientY);
            this.render();
        }
    }

    render() {
        if (!this.#parent.contains(this.#console)) {
            this.#parent.appendChild(this.#console);
            window.addEventListener('resize', event => this.render());
        }
        // this.#console.style.top = `${this.#top}px`;
        // this.#console.style.height = (this.#console.parentNode.clientHeight - this.#top) + 'px';
    }


    append(parentId) {
        var parent = document.getElementById(parentId) || document.body;
        parent.appendChild(this.#console);
    }

    _write(txt) {
        this.render();
        let span = document.createElement('span');
        span.style.color = this.color;
        span.innerHTML = HTML.encode(txt);
        this.#content.appendChild(span);
    }

    clear() {
        this.#content.innerHTML = '';
    }

    setConsoleTop(y) {
        this.#top = y;
    }

    static #initColors() {
        Colors.Black =        'black',
        Colors.Red =          'maroon',
        Colors.Green =        'green',
        Colors.Yellow =       'olive',
        Colors.Blue =         'navy',
        Colors.Magenta =      'purple',
        Colors.Cyan =         'teal',
        Colors.LightGray =    'silver',

        Colors.Gray =         'gray',
        Colors.LightRed =     'red',
        Colors.LightGreen =   'lime',
        Colors.LightYellow =  'yellow',
        Colors.LightBlue =    'blue',
        Colors.LightMagenta = 'fushsia',
        Colors.LightCyan =    'cyan',
        Colors.White =        'white'
    }
}

var _console = null;
async function getConsole(args) {
    if (_console == null) {
        _console = BrowserConsole.instance;
        if (args) {
            _console.append(args);
        }
    }
    return _console;
}

async function readFromCsv(csv, ctor) {
    let list = []
    let lines = await fetch(csv)
                    .then(resp => resp.text())
                    .then(content => content.split('\n'))
    lines.shift()
    for (let line of lines) {
        list.push(Reflect.construct(ctor, [line]))
    }
    return list
}

export {
    poll, sleep,
    HTML,
    Colors, DefaultColor,
    BrowserConsole, getConsole,
    readFromCsv }