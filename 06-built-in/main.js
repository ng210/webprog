// JSON fájl betöltése
async function loadData() {
    let resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to fetch '${url}': ${resp.statusText}`);
    let index = await resp.json();
}

function buildNavigation(data) {

}

function buildSections(data) {

}

function buildPage(data) {
    buildNavigation(data)
    buildSections(data)
}

async function main() {
    try {
        const data = await loadData("js-built-in.json");
        buildPage(data)
    } catch (err) {
        alert(err)
    }
}