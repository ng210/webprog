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
		let result = template
		for (const key in context) {
			template = template.replaceAll(kex, context[key])
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
		// Kimenet: string
	}

	sanitize(text) {
		// Bemenet: string | null
		// Kimenet: string
	}
}