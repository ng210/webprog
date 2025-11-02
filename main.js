import { loadIntoShadow } from './load-html.js';
// import { getConsole } from "./lib/console/console.js";

var _console = {
    writeln: function writeln(text) {
        console.log(text);
    }
};

window.addEventListener('load', async () => {
    // _console = await getConsole();
    // _console.resize(200);

    fetch('index.json').then(async resp => {
        if (!resp.ok) throw new Error('Failed to fetch index.json: ' + resp.statusText);
        let index = await resp.json();
        for (let item of index) {
            // create nav entry
            let li = document.createElement('div');
            li.className = 'navitem';
            li.textContent = item.name;
            _console.writeln('Nav item: ' + item.name)
            li.addEventListener('click',
                e => loadIntoShadow(item.url, '#content')
                .catch(err => {
                    console.error(err);
                    _console.writeln('*** Load error: ' + err.message)
                }));
            document.querySelector('nav').appendChild(li);
        }
    }).catch(err => {
        console.error(err);
        _console.writeln('*** Index load error: ' + err.message)
    });
});
