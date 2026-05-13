const apiUrl = 'http://10.1.11.111:7222/animedb/api/'

let _animeList = null

async function readAnimeList() {
    const resp = await fetch(apiUrl + 'anime')
    if (resp.ok) {
        _animeList = resp.json()
    } else {
        alert('Hiba')
    }
}

async function readAnimeById() {
    const id = 1
}

function createStudio() {

}

function createAnime() {

}

function updateAnime(id, data) {
    
}

function deleteAnime(id) {
    
}

