// JSON fájl betöltése
async function loadData(url) {
    let resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to fetch '${url}': ${resp.statusText}`);
    return await resp.json();
}

function buildNavigation(data) {

}

function buildSections(data) {
    let sections = Object.keys(data).map(
        key => {
            let s = document.createElement('section')
            s.id = key
            return s
        }
    );
    const main = document.querySelector('#content')
    for (let s of sections) {
        main.appendChild(s)
    }
}

function buildPage(data) {
    buildNavigation(data)
    buildSections(data)
}

async function main() {
    try {
        const data = await loadData("js-built-in.json");
        buildPage(data)
        console.log(data)
    } catch (err) {
        alert(err)
    }
}

main()
// window.addEventListener('load', main)