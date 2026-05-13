const apiUrl = 'http://10.1.11.111:7222/animedb/api/'

let _animeList = null

async function readAnimeList() {
    const resp = await fetch(apiUrl + 'anime')
    if (resp.ok) {
        _animeList = await resp.json()
    } else {
        alert('Hiba')
    }
}

async function readAnimeById(id) {
    let anime = null
    const resp = await fetch(apiUrl + 'anime/' + id)
    if (resp.ok) {
        anime = await resp.json()
    } else {
        alert('Hiba')
    }
    return anime
}

function createStudio() {

}

function createAnime() {

}

function updateAnime(id, data) {
    
}

function deleteAnime(id) {
    
}

async function main() {
    await readAnimeList()
    let f1 = document.getElementById('f1')
    for (let anime of _animeList) {
        f1.innerHTML += anime.title + '<br/>'
    }
    // Mivel az innerHTML módosítása mindig a DOM átalakítását okozza,
    // sokkal hatékonyabb megoldás előbb a teljes tartalmat generálni,
    // és csak a legvégén egyszer értékül adni az innerHTML attribútumnak.
    let titleList = _animeList.map(a => a.title)
    f1.innerHTML = titleList.join('\n')


    const anime = await readAnimeById(_animeList[0].id)
    let f2 = document.getElementById('f2')
    Object.entries(anime).map(({key, value}) => `${key}:\t${value}`)
    console.log(Object.entries(anime))
    f2.innerHTML = Object.entries(anime).map(([key, value]) => `<i>${key}</i>: ${value}`).join('\n')
}

main()