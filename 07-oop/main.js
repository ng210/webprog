import Unit from './classes/unit.js'

let _unitList = null

// Implementáld az alábbi metódust, amely a megadott url-ről
// letöltött adatokból egy Unit példányokból álló listát állít elő.
async function loadUnitList(url) {
    return await fetch(url)
    .then(resp => resp.text())
    .then(content => {
        return content.split('\n')
        .slice(1)
        .map(line => new Unit(line.trim()))
    })
}

const _url = 'http://127.0.0.1:5500/07-oop/units.csv'
_unitList = await loadUnitList(_url)

console.log(_unitList.join('\n'))