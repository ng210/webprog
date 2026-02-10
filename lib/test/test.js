import { getConsole, Colors } from '../console/console.js'

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

export default class Test {
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

    static isUserDefined(obj, prop) {
        if (obj == null) return false
        let proto = Object.getPrototypeOf(obj)
        while (proto) {
            if (Object.prototype.hasOwnProperty.call(proto, prop)) {
                const ctor = proto.constructor
                if (typeof ctor !== "function") return false
                const re = /\{\s*\[native code\]\s*\}/
                return !re.test(Function.prototype.toString.call(ctor))
            }
            proto = Object.getPrototypeOf(proto);
        }
        return false;
    }

    static stringify(data) {
        var txt = '';
        if (typeof data === 'string' || data === null || data === undefined) txt = '' + data;
        else if (typeof data.toString === 'function' && Test.isUserDefined(data, 'toString')) txt = data.toString();
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
            //let hasErrors = predicate == Test.#_operators['='] ? expected.length != received.length : false;

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

            // for (var ri=0; ri<received.length; ri++) {
            //     this.currentResult = predicate(received[ri], expected[ri]);
            //     if (!this.currentResult) {
            //         hasErrors = true;
            //         break;
            //     }
            // }
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
    
    // async measure(lbl, action, runs) {
    
    // };
    
    // async setupAll() {
        
    // }

    // async tearDownAll() {

    // }

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