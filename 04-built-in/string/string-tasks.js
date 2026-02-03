export default class StringTasks {
	// Az alábbi feladatok megoldásához a következő metódusokra lesz szükség:
	//   replace, replaceAll, toLowerCase, toUpperCase, startsWith, endsWith,
	//	 indexOf, lastIndexOf, includes, substring, search
	//   split, slice, trim, trimStart, trimEnd

	isNullOrEmpty(text) {
		// IsNullOrEmpty - null vagy üres string ellenőrzés
		// Bemenet: string | null
		// Kimenet: true ha text üres string vagy null (undefined),
		//			false ha text nem üres string
	}

	useTemplate(template, context) {
		// UseTemplate - sablon kitöltése
		// Bemenet: string | null, objektum
		// Kimenet: string | null, a template szöveg a context objektum
		//			tulajdonságaival kitöltve
	}

	toCapitalInitial(word) {
		// Capital initial - nagy kezdőbetű
		// Bemenet: string | null
		// Kimenet: string | null, a bemeneti szó nagy kezdőbetűvel
	}

	containsChar(text, char) {
		// Contains - tartalmazza a karaktert
		// Bemenet: string | null, string | null
		// Kimenet: true ha char része a text stringnek, false egyébként
	}

	getExtension(path) {
		// GetExtension - kiterjesztés lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a kiterjesztés a pont nélkül vagy üres string
	}

	isPalindrom(text) {
		// IsPalindrom - palindrom ellenőrzés
		// Bemenet: string | null
		// Kimenet: true ha text palindrom, false egyébként
	}

	tokenize(text, separators) {
		// Tokenize - szöveg feldarabolása
		// Bemenet: string | null, string | null
		// Kimenet: string | null, a text darabjait tartalmazó tömb
	}

	replaceFirstWord(text, newWord) {
		//ReplaceFirstWord - első szó lecserélése
		// Bemenet: string | null, string | null
		// Kimenet: string (első szó lecserélve newWord-re)
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
	}

	sanitize(text) {
		// Bemenet: string | null
		// Kimenet: string, levágja a text elején és végén a white-space karaktereket,
		// 			és a HTML speciális karaktereit átalakítva visszaadja:
		// 			<  -> &lt;
		// 			>  -> &gt;
		// 			&  -> &amp;
		// 			"  -> &quot;
		// 			'  -> &#39;
	}

	removeChars(text, chars) {
		// RemoveChars - karakterek eltávolítása
		// Bemenet: string | null, string | null
		// Kimenet: string | null, a text szöveg a chars sztringben szereplő karakterek nélkül
	}

	hasWord(text, word) {
		// HasWord - szó keresése
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha a word sztring szerepel a text sztringben
	}

	firstChar(text) {
		// FirstChar - első karakter lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, az első karakter vagy üres sztring vagy null
	}

	lastChar(text) {
		// LastChar - utolsó karakter lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, az utolsó karakter vagy üres sztring vagy null
	}

	startsWithIgnoreCase(text, prefix) {
		// StartsWithIgnoreCase - startsWith kis- és nagybetű megkülönböztetés nélkül
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha text a prefix szöveggel kezdődik, kis- és nagybetű megkülönböztetés nélkül.
	}

	endsWithIgnoreCase(text, suffix) {
		// EndsWithIgnoreCase - endsWith kis- és nagybetű megkülönböztetés nélkül
		// Bemenet: string | null, string | null
		// Kimenet: boolean, igaz, ha text a suffix szöveggel végződik, kis- és nagybetű megkülönböztetés nélkül
	}

	getFirstWord(text) {
		// GetFirstWord - első szó lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a text szöveg az elejétől az első szóközig tartó része
	}

	getLastWord(text) {
		// GetLastWord - utolsó szó lekérdezése
		// Bemenet: string | null
		// Kimenet: string | null, a text szöveg az utolsó szóköztől a végéig tartó része
	}

	skipChars(text, chars) {
		// SkipChars - karakterek átugrása
		// Bemenet: string | null, string | null
		// Kimenet: number, text első olyan karakterének indexe, amely nincsen benne a chars szövegben
	}

	seekChars(text, chars) {
		// SeekChars - karakterek keresése
		// Bemenet: string | null, string | null
		// Kimenet: number,	a text első olyan karakterének indexe, amely benne van a chars szövegben
	}

	toKeyValuePairs(text) {
		// ToKeyValuePairs - kulcs-érték párok szövegből
		// Bemenet: string | null, kulcs érték párok szövegként: kulcs1=érték1;kulcs2=érték2.
		// Kimenet: object, a text szövegben található kulcs érték párokból
	}

	fromKeyValuePairs(obj) {
		// FromKeyValuePairs - objektum mint kulcs-érték párok szöveggé
		// Bemenet: object
		// Kimenet: string, obj kulcs-érték párjai szövegként, a párok között pontosvessző, a kulcs és érték között egyenlőségjel
	}

	toCamelCase(text) {
		// ToCamelCase - camelCase formátum
		// Bemenet: string | null
		// Kimenet: string | null, text szöveg szavait nagy kezdőbetűvel összefűzi, az első szó kezdőbetűje kisbetű
	}

	joinWithChar(text, char) {
		// JoinWithChar - karakterrel összefűzés
		// Bemenet: string | null, string | null
		// Kimenet: string | null, text szavait char beszúrásával összefűzi
	}

	toUpper(text, chars) {
		// ToUpper - karakterek nagybetűssé tétele
		// Bemenet: string | null, string | null
		// Kimenet: string | null, textből új szöveg, a chars szövegben megtalálható karakterek nagybetűssé alakítja
	}

	toLower(text, chars) {
		// ToLower - karakterek kisbetűssé tétele
		// Bemenet: string | null, string | null
		// Kimenet: string | null, textből új szöveg, a chars szövegben megtalálható karakterek kisbetűssé alakítja
	}

	getCommand(text) {
		// GetCommand - parancs kiolvasása
		// Bemenet: string | null, formátum: parancs(paraméter1, paraméter2, …)
		// Kimenet: array | null, a tömb elemei: parancs, paraméter1, paraméter2, … felesleges szóközök nélkül
	}

	normalizeSpaces(text) {
		// NormalizeSpaces - szóközök normalizálása
		// Bemenet: string | null
		// Kimenet: string | null, a többszörös szóköz karaktereket helyett csak egyetlen szóköz
	}

	formatNumber(n, decimals) {
		// FormatNumber - szám formázása
		// Bemenet: number, number
		// Kimenet: string, n szám stringként, decimals darab tizedesjeggyel, a nem ábrázolható tizedesjegyeket levágja
	}

	formatDate(y, m, d) {
		// FormatDate - dátum formázása
		// Bemenet: number, number, number
		// Kimenet: string | null, az év, hó és nap számokból a következő formátumú szöveg: éééé-hh-nn
	}
}