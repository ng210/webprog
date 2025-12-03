import { poll } from '../util.js'
import { HTML } from '../html.js';
import { ConsoleBase, Colors } from './console-base.js'

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
        let style = document.createElement('style');
        style.innerHTML = `@import '${import.meta.url.substring(0, import.meta.url.lastIndexOf('/'))+'/console.css'}'`;
        this.#console.appendChild(style);
        this.#border.className = 'border';
        this.#border.addEventListener('pointerdown', e => this.#onPointerDown(e));
        this.#border.addEventListener('pointerup', e => this.#onPointerUp(e));
        this.#border.addEventListener('pointermove', e => this.#onPointerMove(e));

        this.#console.appendChild(this.#border);
        this.#content = document.createElement('div');
        this.#content.className = 'content';
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

export { BrowserConsole, Colors };