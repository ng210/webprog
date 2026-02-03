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
		//console.log(`protocol=[${protocol}], server=[${server}], port=[${port}], path=[${path}], fragment=[${fragment}], query=[${query}]`)
		if (!server) return false
		if (protocol != 'http' && protocol != 'https' && protocol != 'ftp') return false
		return true
	}

	sanitize(text) {
		// Bemenet: string | null
		// Kimenet: string | null, levágja a text elején és végén a white-space karaktereket,
		// 			és a HTML speciális karaktereit átalakítva visszaadja:
		// 			<  -> &lt;
		// 			>  -> &gt;
		// 			&  -> &amp;
		// 			"  -> &quot;
		// 			'  -> &#39;
		if (!text) return text
		text = text.trim()
		let result = ''
		for (let i=0; i<text.length; i++) {
			let ch = text.charAt(i)
			switch (ch) {
				case `<`: ch = '&lt;'; break;
				case `>`: ch = '&gt;'; break;
				case `&`: ch = '&amp;'; break;
				case `"`: ch = '&quot;'; break;
				case `'`: ch = '&#39;'; break;
			}
			result += ch
		}

		return result
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
		// HasWord - szó keresése
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha a word sztring szerepel a text sztringben
		return text.split(' ').includes(word)
	}

	firstChar(text) {
		// FirstChar - első karakter lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, az első karakter vagy üres sztring vagy null
		if (!text) return text
		return text.charAt(0)
	}

	lastChar(text) {
		// LastChar - utolsó karakter lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, az utolsó karakter vagy üres sztring vagy null
		if (!text) return text
		return text.charAt(text.length-1)
	}

	startsWithIgnoreCase(text, prefix) {
		// StartsWithIgnoreCase - startsWith kis- és nagybetű megkülönböztetés nélkül
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha text a prefix szöveggel kezdődik, kis- és nagybetű megkülönböztetés nélkül.
		if (text == null || prefix == null) return false
		return text.toLowerCase().startsWith(prefix.toLowerCase())
	}

	endsWithIgnoreCase(text, suffix) {
		// EndsWithIgnoreCase - endsWith kis- és nagybetű megkülönböztetés nélkül
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha text a suffix szöveggel végződik, kis- és nagybetű megkülönböztetés nélkül
		if (text == null || suffix == null) return false
		return text.toLowerCase().endsWith(suffix.toLowerCase())
	}

	getFirstWord(text) {
		// GetFirstWord - első szó lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a text szöveg az elejétől az első szóközig tartó része
		if (!text) return text
		text = text.trim()
		let ix = text.indexOf(' ')
		if (ix == -1) ix = text.length
		return text.slice(0, ix)
	}

	getLastWord(text) {
		// GetLastWord - utolsó szó lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a text szöveg az utolsó szóköztől a végéig tartó része
		if (!text) return text
		text = text.trim()
		let ix = text.lastIndexOf(' ')
		return text.slice(ix+1)
	}

	skipChars(text, chars) {
		// SkipChars - karakterek átugrása
		// Bemenet: string | null, string | null
		// Kimenet: number, text első olyan karakterének indexe, amely nincsen benne a chars szövegben
		if (text == null || chars == null) return -1
		if (chars == '') return 0
		let ix = 0
		for (;ix < text.length; ix++) {
			if (!chars.includes(text.charAt(ix))) break
		}
		return ix
	}

	seekChars(text, chars) {
		// SeekChars - karakterek keresése
		// Bemenet: string | null, string | null
		// Kimenet: number,	a text első olyan karakterének indexe, amely benne van a chars szövegben
		if (text == null || chars == null) return -1
		if (chars == '') return 0
		let ix = 0
		for (;ix < text.length; ix++) {
			if (chars.includes(text.charAt(ix))) break
		}
		return ix
	}

	toKeyValuePairs(text) {
		// ToKeyValuePairs - kulcs-érték párok szövegből
		// Bemenet: string | null, kulcs érték párok szövegként: kulcs1=érték1;kulcs2=érték2.
		// Kimenet: object, a text szövegben található kulcs érték párokból
		if (text == null) return null
		let keyValues = {}
		if (!text) return keyValues
		let tokens = text.split(';')
		for (let token of tokens) {
			let ix = token.indexOf('=')
			let key = '', value = null
			if (ix != -1) {
				key = token.slice(0, ix).trim()
				value = token.slice(ix+1)
				if (value == '') value = null
			} else {
				key = token
			}
			keyValues[key] = value
		}
		return keyValues
	}

	fromKeyValuePairs(obj) {
		// FromKeyValuePairs - objektum mint kulcs-érték párok szöveggé
		// Bemenet: object
		// Kimenet: string, obj kulcs-érték párjai szövegként, a párok között pontosvessző, a kulcs és érték között egyenlőségjel
		let text = ''
		for (let key in obj) {
			text += key + '='
			if (obj[key] != null) text += obj[key]
			text += ';'
		}
		return text.slice(0, -1)
	}

	toCamelCase(text) {
		// ToCamelCase - camelCase formátum
		// Bemenet: string | null
		// Kimenet: string | null, text szöveg szavait nagy kezdőbetűvel összefűzi, a többi betű kicsi, az első szó kezdőbetűje kisbetű
		if (!text) return text
		let arr = text.trim().split(' ')
		let isFirst = true
		for (let i=0; i<arr.length; i++) {
			let word = arr[i].toLowerCase()
			if (word != '') {
				if (!isFirst) {
					word = word.charAt(0).toUpperCase() + word.slice(1)
				}
				isFirst = false
			}
			arr[i] = word
		}
		return arr.join('')
	}

	toUpper(text, chars) {
		// ToUpper - karakterek nagybetűssé tétele
		// Bemenet: string | null, string | null
		// Kimenet: string | null, textből új szöveg, a chars szövegben is megtalálható karaktereket nagybetűssé alakítja
		if (!text || !chars) return text
		let result = ''
		for (let ch of text) {
			if (chars.includes(ch)) ch = ch.toUpperCase()
			result += ch
		}
		return result
	}

	toLower(text, chars) {
		// ToLower - karakterek kisbetűssé tétele
		// Bemenet: string | null, string | null
		// Kimenet: string | null, textből új szöveg, a chars szövegben is megtalálható karaktereket kisbetűssé alakítja
		if (!text || !chars) return text
		chars = chars.toUpperCase()
		let result = ''
		for (let ch of text) {
			if (chars.includes(ch.toUpperCase())) ch = ch.toLowerCase()
			result += ch
		}
		return result
	}

	getCommand(text) {
		// GetCommand - parancs kiolvasása
		// Bemenet: string | null, formátum: parancs(paraméter1, paraméter2, …)
		// Kimenet: array | null, a tömb elemei: parancs, paraméter1, paraméter2, … felesleges szóközök nélkül
		if (!text) return null
		let start = 0
		let end = text.indexOf('(')
		let result = [text.slice(start, end).trim()]
		if (end != -1) {
			let start = end + 1
			end = text.indexOf(')')
			let arr = text.slice(start, end).split(',')
			for (let i=0; i<arr.length; i++) {
				result.push(arr[i].trim())
			}
		}
		return result
	}

	normalizeSpaces(text) {
		// NormalizeSpaces - szóközök normalizálása
		// Bemenet: string | null
		// Kimenet: string | null, a többszörös szóköz karaktereket helyett csak egyetlen szóköz
		if (!text) return text
		let result = ''
		let hasSpace = false
		for (let ch of text) {
			if (ch != ' ') {
				if (hasSpace) {
					result += ' '
				}
				result += ch
				hasSpace = false
			} else {
				if (!hasSpace) {
					hasSpace = true
				}
			}
		}
		if (hasSpace) result += ' '
		return result
	}

	formatNumber(n, decimals) {
		// FormatNumber - szám formázása
		// Bemenet: number, number
		// Kimenet: string, n szám stringként, decimals darab tizedesjeggyel, a nem ábrázolható tizedesjegyeket levágja
		if (isNaN(n) || n == null) return null
		let text = n + '';
		let arr = (text).split('.')
		if (arr.length == 1) {
			arr.push(0)
		}
		let result = arr[0]
		if (decimals > 0) {
			result += '.' + (arr[1] + '0000000000').slice(0, decimals)
		}
		return result
	}

	formatDate(y, m, d) {
		// FormatDate - dátum formázása
		// Bemenet: number, number, number
		// Kimenet: string | null, az év, hó és nap számokból a következő formátumú szöveg: éééé-hh-nn
		if (!y || !m || !d) return null
		const validDays = [31,28,31,30,31,30,31,31,30,31,30,31]
		if (y < 1) return null
		if (m < 1 || m > 12) return null
		if (d < 1 || d > validDays[m-1]) return null

		y = ('000'+y).slice(-4)
		m = ('0'+m).slice(-2)
		d = ('0'+d).slice(-2)
		return `${y}-${m}-${d}`
	}
}