import { createConsole, writeConsole, getConsole } from "./console.js";

var _console = null;

// function onLoad() {
//     _console = createConsole();
//     document.body.appendChild(_console);
//     writeConsole("Hello World!");
// }

function onButtonClick() {
    writeConsole("A gombot megnyomták!");
}

window.onButtonClick = onButtonClick;
window.addEventListener('load', event => {
    _console = createConsole();
    document.body.appendChild(_console);
    writeConsole("Hello World!");
});

