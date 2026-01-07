export default class StringTasks {
	// Az alábbi feladatok megoldásához a következő metódusokra lesz szükség:
	//   replace, replaceAll, toLowerCase, toUpperCase, startsWith, endsWith,
	//	 indexOf, lastIndexOf, includes, substring, localeCompare, search
	//   split, slice, trim, trimStart, trimEnd

	isNullOrEmpty(text) {
		// IsNullOrEmpty - null vagy üres string
		// Bemenet: string | null
		// Kimenet: true ha text üres string vagy null (undefined),
		//			false ha text nem üres string
		return !text
	}

	useTemplate(template, context) {
		// UseTemplate - sablon kitöltése
		// Bemenet: string | null, objektum
		// Kimenet: string | null, a template szöveg a context objektum
		//			tulajdonságaival kitöltve
		let result = template
		for (const key in context) {
			result = result.replaceAll(`{${key}}`, context[key])
		}
		return result
	}

	toCapitalInitial(word) {
		// Capital initial - nagy kezdőbetű
		// Bemenet: string | null
		// Kimenet: string | null, a bemeneti szó nagy kezdőbetűvel
		if (!word) return word
		else return word.charAt(0).toUpperCase() + word.slice(1)
	}

	containsChar(text, char) {
		// Contains - tartalmazza a karaktert
		// Bemenet: string | null, string | null
		// Kimenet: true ha char része a text stringnek, false egyébként
		if (text == null || char == null) return false
		return text.includes(char)
	}

	getExtension(path) {
		// GetExtension - kiterjesztés lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a kiterjesztés a pont nélkül vagy üres string
		if (!path) return null
		let ix = path.lastIndexOf('.')
		if (ix == -1) ix = path.length
		return path.slice(ix + 1)
	}

	isPalindrom(text) {
		// IsPalindrom - palindrom ellenőrzés
		// Bemenet: string | null
		// Kimenet: true ha text palindrom, false egyébként
		if (!text) return false
		let j = text.length - 1
		for (let i = 0; i < Math.floor(text.length / 2); i++, j--) {
			if (text.charAt(i) != text.charAt(j)) return false
		}
		return true
	}

	tokenize(text, separators) {
		// Tokenize - szöveg feldarabolása
		// Bemenet: string | null, string | null
		// Kimenet: string | null, a text darabjait tartalmazó tömb
		separators = separators ?? ''
		text = text ?? ''
		const arr = []
		let i = 0, start = 0
		while (i < text.length) {
			if (separators.includes(text.charAt(i))) {
				arr.push(text.slice(start, i))
				start = i + 1
			}
			i++
		}
		if (start < text.length) {
			arr.push(text.slice(start, i))
		}
		return arr
	}

	replaceFirstWord(text, newWord) {
		//ReplaceFirstWord - első szó lecserélése
		// Bemenet: string | null, string | null
		// Kimenet: string (első szó lecserélve newWord-re)
		const separators = ' \t\n'
		if (!text) return text
		for (let i=0; i<text.length; i++) {
			if (separators.includes(text.charAt(i))) {
				return (newWord ?? '') + text.slice(i)
			}
		}
		return text
	}

	isUrl(url) {
		// Bemenet: string | null
		// Kimenet: boolean, igaz, ha url érvényes webcím, azaz az alábbi mintát követi:
		// 	[protokoll]://[server]:[port]/[útvonal]#[fregmens]?[query]
		// 	- protokoll: http, https vagy ftp
		// 	- server: név.domain pl. google.com, freemail.hu
		// 	- port: szám, pl. 80, 443
		// 	- útvonal: könyvtár nevek perjelekkel elválasztva,
		// 			fájlnév kiterjesztéssel, pl. mail/index.html, images/pic01.jpg
		// 	- fregmens: oldal egy részére mutató hivatkozás, pl. section1, part2
		// 	- query: kulcs=érték párok, & jellel elválasztva, pl. id=123&lang=hu
		if (!url) return false
		let ix = url.indexOf('://')
		if (ix == -1) return false
		const protocol = url.slice(0, ix).toLowerCase()
		let rest = url.slice(ix + 3)
		ix = rest.indexOf('/')
		const [server, port] = (ix == -1 ? rest : rest.slice(0, ix)).split(':')
		rest = rest.slice(ix + 1)
		ix = rest.indexOf('#')
		const path = (ix == -1 ? rest : rest.slice(0, ix))
		rest = rest.slice(ix + 1)
		ix = rest.indexOf('?')
		const fragment = (ix == -1 ? rest : rest.slice(0, ix))
		const query = (ix == -1 ? '' : rest.slice(ix + 1))

		console.log(`protocol=[${protocol}], server=[${server}], port=[${port}], path=[${path}], fragment=[${fragment}], query=[${query}]`)

		if (!server) return false
		if (protocol != 'http' && protocol != 'https' && protocol != 'ftp') return false

		return true
	}

	removeChars(text, chars) {
		// RemoveChars - karakterek eltávolítása
		// Bemenet: string | null, string | null
		// Kimenet: string | null, text szöveg másolata a chars karakterei nélkül
		if (!text || !chars) return text;
		let result = ''
		for (let ch of text) {
			if (!chars.includes(ch)) {
				result += ch
			}
		}
		return result
	}

	hasWord(text, word) {
		// hasWord(text, word)
		// Igazat ad vissza, ha a word sztring szerepel a text sztringben.
		return text.includes(word)
		return text.split(' ').includes(word)
	}

	firstChar(text) {
		// firstChar(text)
		// Visszaadja az első karaktert vagy üres sztringet.
	}

	lastChar(text) {
		// lastChar(text)
		// Visszaadja az utolsó karaktert vagy üres sztringet.
	}

	startsWithIgnoreCase(text, prefix) {
		// startsWithIgnoreCase(text, prefix)
		// Igazat ad vissza, ha text a prefix szöveggel kezdődik, kis- és nagybetű megkülönböztetés nélkül.
	}

	endsWithIgnoreCase(text, suffix) {
		// endsWithIgnoreCase(text, suffix)
		// Igazat ad vissza, ha text a suffix szöveggel végződik, kis- és nagybetű megkülönböztetés nélkül.
	}

	getFirstWord(text) {
		// getFirstWord(text)
		// Visszaadja a text szövegből az elejétől az első szóközig tartó részét.
	}

	getLastWord(text) {
		// getLastWord(text)
		// Visszaadja a text szövegből az utolsó szóköztől a végéig tartó részét.
	}

	skipChars(text, chars) {
		// skipChars(text, chars)
		// Visszaadja az első karakter indexét a text szövegben, amely nincsen benne a chars szövegben.
	}

	searchChars(text, chars) {
		// searchChars(text, chars)
		// Visszaadja az első karakter indexét a text szövegben, amely már benne van a chars szövegben.
	}

	toKeyValuePairs(text) {
		// toKeyValuePairs(text)
		// A text szövegben található kulcs érték párokat adja vissza egy objektumban. A kulcs és értékek között egyenlőségjel, a párok között pontosvessző található: kulcs1=érték1;kulcs2=érték2.
	}

	fromKeyValuePairs(obj) {
		// fromKeyValuePairs(obj)
		// Az obj objektum kulcs-érték párjait szövegként adja vissza. A párok közé pontosvesszőt, a kulcs és érték közé egyenlőség jelet szúr be.
	}

	toCamelCase(text) {
		// toCamelCase(text)
		// A text szöveget szóközök mentén szétvágja. Az így kapott szavakat, az első szó kivételével, nagy kezdőbetűvel összefűzi egy új sztringbe. A szavak többi betűje mindig kicsi.
	}

	joinWithChar(text, char) {
		// joinWithChar(text, char)
		// A text szöveget szóközök mentén szétvágja, majd a char karakter beszúrásával összefűzi.
	}

	toUpper(text, char) {
		// toUpper(text, char)
		// Egy új sztringet hoz létre a text szövegből úgy, hogy azokat a karaktereket, amelyek a char szövegben szerepelnek, nagybetűsen szúrja be, azokat, amelyek nem szerepelnek, változatlanul másolja át.
	}

	toLower(text, char) {
		// toLower(text, char)
		// Egy új sztringet hoz létre a text szövegből úgy, hogy azokat a karaktereket, amelyek a char szövegben szerepelnek, kisbetűsen szúrja be, azokat, amelyek nem szerepelnek, változatlanul másolja át.
	}

	getCommand(text) {
		// getCommand(text)
		// Kiolvas egy parancsot a text szövegből. A parancs formátuma a következő:
		// parancs(paraméter1, paraméter2, …) 
		// A függvény visszatérési értéke egy tömb, amelynek első eleme a parancs, a további elemei pedig a parancs paraméterei. A felesleges szóközöket törli.
	}

	normalizeSpaces(text) {
		// normalizeSpaces(text)
		// A többszörös szóköz karaktereket egyetlen szóközre cseréli.
	}

	formatNumber(n, decimals) {
		// formatNumber(n, decimals)
		// Az n számot decimals darab tizedesjeggyel ábrázolva sztringként adja vissza. Az értéket nem kerekíti, hanem a felesleges tizedesjegyeket levágja.
	}

	formatDate(y, m, d) {
		// formatDate(y, m, d)
		// A paraméterként kapott év, hó és nap értékekből egy dátum sztringet állít elő, a következő formátumban: yyyy-mm-dd. Tehát az évet négy, a hónapot és a napot két számjeggyel jeleníti meg. Érvénytelen paraméterekre null értéket ad vissza.
	}
}