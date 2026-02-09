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
};

function sleep(milliseconds) {
    var isFirst = true;
    return poll( () => {
        //var p = isFirst;
        isFirst = !isFirst;
        return isFirst;
    }, milliseconds);
}

var locks__ = {};
function lock(token, action) {
    if (locks__[token] == undefined) {
        locks__[token] = [0, 0];
    }
    return new Promise( resolve => {
        poll( function() {
            var request = locks__[token][0];
            if (request == locks__[token][1]) {
                locks__[token][0]++;
                if (locks__[token][0] == request + 1) {
                    debug_('locked: ' + locks__[token], 4);
                    return true;
                }
            }
            return false;
        }).then(async function() {
            await action();
            locks__[token][1] = locks__[token][0];
            resolve();
            debug_('unlocked: ' + locks__[token], 4);
        });
    });
};

function clone(obj) {
    var c = obj;
    if (obj != null && typeof obj === 'object') {
        if (typeof obj.constructor.clone === 'function') {
            c = obj.constructor.clone(obj);
        } else {
            switch (obj.constructor) {
                case Boolean: c = new Boolean(obj); break;
                case Number: c = new Number(obj); break;
                case String:c = new String(obj); break;
                case Array: c = Array.from(obj); break;
                case Date: c = new Date(obj); break;
                default:
                    c = Reflect.construct(obj.constructor, []);
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i) && typeof i !== 'function') {
                            c[i] = clone(obj[i]);
                        }
                    }
                    break;
            }
        }
    }
    return c;
};

function implement(cls, iface) {
    let descriptors = Object.getOwnPropertyDescriptors(iface.prototype);
    for (let k in descriptors) {
        let desc = descriptors[k];
        if (typeof desc.value === 'function') {
            if (desc.value != iface) {
                Object.defineProperty(cls, k, desc);
            }
        }
        if (desc.get != undefined) {
            Object.defineProperty(cls, k, desc);
        }
        if (desc.set != undefined) {
            Object.defineProperty(cls, k, desc);
        }
    }
};

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

    static decode(html) {
        return html.replace(
            /&(.+);||(<\s*br\s*\/?>)/g,
            (m, p1, p2) => {
                var res = '';
                if (p1) {
                    var code = parseInt(p1);
                    var entity = isNaN(code) ?
                        HTML.Entities.find(e => e.code == code) :
                        HTML.Entities.find(e => e.name == p1);
                    res = entity || p1;
                } else if (p2) {
                    res = '<br/>'
                }
                return res;
            }
        );
    }

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

class BrowserConsole extends ConsoleBase {
    //static #cons = null;
    //#container = null;
    //#hasInput = false;
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
        return BrowserConsole.get();
        // if (BrowserConsole.#singleton == null) {
        //     BrowserConsole.#initColors();
        //     var cons = new BrowserConsole();
        //     // cons.#container = document.createElement('console');
        //     // cons.#container.console = this;
        //     // BrowserConsole.#cons = cons;
        // }

        // return BrowserConsole.#singleton;
    }

    constructor(parentId, options) {
        super();
        this.#console = document.createElement('console');
        this.#border = document.createElement('div');
        // let style = document.createElement('style');
        // style.innerHTML = `@import './console.css'`;
        // this.#console.appendChild(style);
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

        this.#top = 0.75*document.body.clientHeight;
    }

    static get() {
        if (BrowserConsole.#singleton == null) {
            BrowserConsole.#singleton = new BrowserConsole();
        }
        return BrowserConsole.#singleton;
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
        this.#console.style.top = `${this.#top}px`;
        this.#console.style.height = (this.#console.parentNode.clientHeight - this.#top) + 'px';
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
        //this.#content.innerHTML += `<span style="color:${this.color}">${HTML.encode(txt)}</span>`;
    }

    clear() {
        this.#content.innerHTML = '';
    }

    setConsoleTop(y) {
        this.#top = y;
    }

    async prompt(question) {
        this.write(question + ': ');
        var input = document.createElement('INPUT');
        input.console = this;
        input.addEventListener('change', e => e.target.console.hasInput = true);
        this.#content.appendChild(input);
        await poll(cn => cn.hasInput, 100, this);
        this.hasInput = false;
        var answer = input.value;
        this.#content.removeChild(input);
        this.write(answer);

        return answer;
    }

    async choice(question, options) {
        this.writeln(question);
        var answer = null;
        var optElems = [];
        for (var oi in options) {
            var el = document.createElement('BUTTON');
            optElems.push(el);
            el.innerHTML = options[oi];
            el.addEventListener('click',
                function(e) {
                    answer = this.innerHTML;
                }
            );
            el.style.border = 'solid 1px gray';
            el.style.cursor = 'pointer';
            this.#content.appendChild(el);
        }
        await poll(() => answer != null);
        for (var oi=0; oi<optElems.length; oi++) {
            this.#content.removeChild(optElems[oi]);
        }
        return answer;
    }

    insertElement(htmlElement) {
        this.render();
        if (this.enable) {
            this.#content.appendChild(htmlElement);
        }
    }

    static #handleButtonClick(e) {
        var button = e.target;
        if (typeof button._onClick === 'function') button._onClick(button, e);
        button.removeEventListener('click', BrowserConsole.#handleButtonClick);
    }

    button(text, onClick) {
        let button = document.createElement('button');
        this.insertElement(button);
        this.writeln('');
        //let button = this.#content.children[this.#content.children.length-1];
        button.innerHTML = text;
        button._onClick = onClick;
        button.addEventListener('click', BrowserConsole.#handleButtonClick);
        return button;
    }

    async waitButton(text) {
        let button = this.button(text, btn => btn._isClicked = true);
        button._isClicked = false;
        await poll(() => button._isClicked, 100);
    }

//     static onMouseEvent(e) {
//         var node = this;
//         while (node) {
//             if (node.console instanceof BrowserConsole) {
//                 switch (e.type) {
//                     case 'mouseover':
//                         if (!node.isClicked) node.style.opacity = 0.5; break;
//                     case 'mouseout':
//                         if (!node.isClicked) node.style.opacity = 0.2; break;
//                     case 'click':
//                         node.style.opacity = 0.75; cons.isClicked = true; break;
//                 }
//                 break;
//             }
//             node = node.parentNode;
//         }
//         if (!node && e.type == 'click') {
//             BrowserConsole.cons.isClicked = false;
//             BrowserConsole.cons.style.opacity = 0.2;
//         }
//     }

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
};

var _console = null;
async function getConsole(args) {
    if (_console == null) {
        if (typeof window !== 'undefined') {
            _console = BrowserConsole.instance;
            if (args) {
                _console.append(args);
            }
        }
    }
    return _console;
}


const defaultTestConfig_ = {
    // indentText: '        ',
    // bulletinSymbols: ['', '►', '▪', '∙'],
    // pending: 0,
    // indent: 0,
    // indentColor: [240,224,192],
    // defaultColor: [192, 240, 208],
    // buttonCount: 0,

    // isNonInteractive: false,
    // isSilent: false,

    // assertion_operators: {
    //         '=': { 'term': 'equal', 'action': (a, b) => equals(a,b) },
    //         '~': { 'term': 'match', 'action': (a, b) => approx(a, b) },
    //         '!=': { 'term': 'not be', 'action': (a, b) => a != b },
    //         '<': { 'term': 'be less', 'action': (a, b) => a < b },
    //         '>': { 'term': 'be greater', 'action': (a, b) => a > b },
    //         '<=': { 'term': 'be less or equal', 'action': (a, b) => a <= b },
    //         '>=': { 'term': 'be greater or equal', 'action': (a, b) => a >= b },
    //         ':=': { 'term': 'match', 'action': (a, b) => deepCompare(a, b, false) },
    //     'empty': { 'term': 'be empty', 'action': a => isEmpty(a) },
    //     '!empty': { 'term': 'have an element', 'action': a => !isEmpty(a) },
    //     'true':   { 'term': 'be true', 'action': a => a == true },
    //     'false':  { 'term': 'be false', 'action': a => a == false },
    //     'null':   { 'term': 'be null', 'action': a => a == null },
    //     '!null':  { 'term': 'be not null', 'action': a => a != null }
    // }
};

class Test {
    static #_operators = {
        '=': (a,b) => Test.compare(a, b) == 0,
        '!=': (a,b) => Test.compare(a, b) != 0,
        'true': a => a == true,
        'false': a => a == false,
    };

    cons = null;
    config = {};
    errors = 0;
    failed = 0;
    passed = 0;
    total = 0;
    currentResult = null;
    hasError = false;

    constructor(config) {
        this.config = config || {};
        for (var ci in defaultTestConfig_) {
            this.config[ci] = config[ci] != undefined ? config[ci] : defaultTestConfig_[ci];
        }
    }

    async setup() {}
    async teardown() {}
    async setupAll() {}
    async teardownAll() {}

    static stringify(data) {
        var txt = '';
        if (typeof data === 'string' || data == null || data == undefined) txt = '' + data;
        else if (typeof data === 'object' && typeof data.toString === 'function') txt = data.toString();
        else txt = JSON.stringify(data);
        return txt;
    }

    static compare(expected, received) {
        var res = 0;
        if (expected === undefined && received === undefined) return res;
        if (expected === null && received === null) return res;
        switch (typeof expected) {
            case 'string':
                res = expected.localeCompare(received); break;
            case 'bool':
                res = (expected ? 1 : 0) - (received ? 1 : 0);
                break;
            case 'number':
                res = Number.isNaN(expected) && Number.isNaN(received) ? 0 : expected - received;
                break;
            case 'object':
                if (expected != null) {
                    if (typeof expected.compare === 'function') {
                        res = expected.compare(received);
                    } else {
                        for (var key in expected) {
                            var subRes = Test.compare(expected[key], received[key]) != 0
                            if (subRes != 0) {
                                res = subRes;
                                break;
                            }
                        }
                    }
                } else {
                    return -1;
                }
                break;
            case 'undefined':
                if (typeof received !== 'undefined') res = -1;
                break;
        }
        
        return res;
    }

    #checkError() {
        if (this.hasError && this.currentResult instanceof Error) {
            throw this.currentResult;
        }
    }

    #check(lbl, received, expected, predicate) {
        this.#checkError();
        this.cons.write(lbl, Colors.LightGray);

        try {
            if (predicate == undefined) {
                predicate = expected || Test.#_operators['='];
                expected = undefined;
            }

            if (received == null || received == undefined ||
                typeof received === 'string' ||
                typeof received[Symbol.iterator] !== 'function') received = [received];
            if (expected !== undefined) {
                if (expected == null || expected == undefined ||
                    typeof expected === 'string' ||
                    typeof expected[Symbol.iterator] !== 'function') expected = [expected];
            } else {
                expected = [];
            }

            const itA = received[Symbol.iterator]();
            const itB = expected[Symbol.iterator]();
            let hasErrors = false
            while (true) {
                const stepA = itA.next();
                const stepB = itB.next();
                if (predicate == Test.#_operators['='] &&
                    stepA.done !== stepB.done) {
                    hasErrors = true;
                    break;
                }
                if (stepA.done) {
                    break;
                }
                this.currentResult = predicate(stepA.value, stepB.value);
                if (!this.currentResult) {
                    hasErrors = true;
                    break;
                }
            }

            if (!hasErrors) {
                this.cons.writeln('···Passed', Colors.LightGreen);
            } else {
                this.failed++;
                this.cons.writeln('···Failed', Colors.LightRed);
                this.cons.write(' - expected: ');
                this.cons.writeln(Test.stringify(expected), Colors.LightGray);
                this.cons.write(' - received: ');
                this.cons.writeln(Test.stringify(received, Colors.LightYellow));
            }
        } catch (err) {
            this.hasError = true;
            this.currentResult = err;
        }
    }

    isEqual(lbl, received, expected) {
        this.currentResult = this.#check(lbl, received, expected, Test.#_operators['=']);
        return this;
    }

    notEqual(lbl, received, expected) {
        this.currentResult = this.#check(lbl, received, expected, Test.#_operators['!=']);
        return this;
    }

    isTrue(lbl, received) {
        this.currentResult = this.#check(lbl, received, Test.#_operators['true']);
        return this;
    }

    isFalse(lbl, received) {
        this.currentResult = this.#check(lbl, received, Test.#_operators['false']);
        return this;
    }


    throws(lbl, error, call) {
        let received = null;
        try {
            call();
        } catch (err) {
            received = err;
        }
        this.currentResult = this.#check(lbl, received.message, error, Test.#_operators['=']);
        return this;
    }

    startTimer() {
        return new Date().getTime();
    }

    stopTimer(lbl, timer) {
        let delta = new Date().getTime() - timer;
        this.cons.writeln(`${lbl} - ${delta} ms`);
    }

    async assertMultiple(data, expected, predicate) {
        var hasError = false;
        for (var di=0; di<data.length; di++) {
            var d = data[di];
            var e = expected[di];
            var r = await action.apply(null, Array.isArray(d) ? d : [d]);
            var td = Test.stringify(d);
            this.cons.write(`#${di+1}. input:`);
            this.cons.writeln(`${td}`, Colors.LightGray);
            var res = await this.assert('', r, e);
            if (!res) {
                hasError = true;
            }
        }
        return hasError;
    }

    async runAll() {
        if (!this.cons) {
            this.cons = await getConsole();
            this.cons.clear()
            this.cons.setConsoleTop(0.6 * document.body.clientHeight);
        }
        //var color = this.cons.color;
        //this.cons.color = Colors.White;
        this.cons.writeln(`\n*** Running ${this.constructor.name} tests ********`, Colors.White);
        await this.setupAll();
        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (name.startsWith('test')) {
                //this.cons.write('\n*** Test found: ');
                this.total++;
                //this.cons.writeln(name, Colors.LightCyan);
                await this.setup();
                try {
                    await this[name].call(this);
                    this.#checkError();
                } catch (err) {
                    this.errors++;
                    this.cons.writeln(`*** Error in ${name}: ${err.message}`, Colors.LightRed);
                }
                await this.teardown();
                //this.cons.writeln('');
            }
        }
        await this.teardownAll();
        this.cons.write(`*** ${this.constructor.name}: `);
        this.report();  //this.failed, this.total, this.cons);
    }

    report() {
        var success = this.total - this.failed;
        var rate = 100*success/this.total; 
        //var color = cons.color;
        var colors = [Colors.LightGreen, Colors.LightCyan, Colors.LightYellow, Colors.LightRed];
        var ci = 0;
        if (rate > 90) ci = 0;
        else if (rate > 80) ci = 1;
        else if (rate > 40) ci = 2;
        else ci = 3;

        this.cons.writeln(`${success} of ${this.total} tests passed (${rate.toFixed(2)}%)`, colors[ci]);
        this.cons.writeln(`With ${this.errors} errors\n`, Colors.LightRed);
        //cons.color = color;
    }
}