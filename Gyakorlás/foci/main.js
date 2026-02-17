function createCard(player, tmpl) {
	// 1. Hozz létre egy DIV elemet a card változóba, aminek a CSS osztálya 'card' legyen!
	let card = null

	// 2. A div elem HTML tartalma legyen a tmpl sablon, melyben a
	// helyettesítőket {{nev}}, {{kep}}, stb. a player objektum megfelelő
	// mezőire cseréled.

	// 3. A függvény visszatérési értéke legyen a létrehozott div elem!
}

async function main() {
	// sablon betöltése
	let tmpl = await fetch('player.tmpl').then(resp => resp.text())
	// játékosok listájának betöltése
	let players = await fetch('players.json').then(resp => resp.json())

	// 4. A players lista minden eleméhez hozz létre egy kártyát, és
	// add a main elem gyermekeihez!

	// 5. Az oldalon található két gombhoz rendeld hozzá a findByName
	// illetve a resetSearch függvényeket!
}

function findByName(event) {
	// Olvasd ki a kereső doboz értékét a value változóba!
	let value = null

	// Keresd ki a kártyák közül a matchingCards listába azokat,
	// amelyeknél a játékos neve illeszkedik a kereső dobozban megadott
	// reguláris kifejezésre!
	let matchingCards = []
	
	// A megtalált kártyák CSS osztályaihoz add hozzá a 'highlight' osztályt!
}

function resetSearch() {
	// Töröld a kereső szövegdobozt!
	// Minden kártya CSS osztályai közül töröld a 'highlight' osztályt!
}

main()