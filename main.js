import { createIndex } from './load-html.js';
// import { getConsole } from "./lib/console/console.js";

const template = '<li class="navitem" title="{{url}}">{{name}}</li>';

// var _console = {
//     writeln: function writeln(text) {
//         console.log(text);
//     }
// };

createIndex('index.json', document.querySelector('#content'), document.querySelector('nav'), template);
