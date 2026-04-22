import Unit from './classes/unit.js'

const _url = 'https://ng210.github.io/static-api/scifi_db/units.json'
let _unitList = null

async function loadUnitList(url) {
    return await fetch(url)
            .then(resp => resp.json())
            .then(list => list.map(obj => new Unit(obj)))
            .catch(err => alert(err))
}

_unitList = await loadUnitList(_url)