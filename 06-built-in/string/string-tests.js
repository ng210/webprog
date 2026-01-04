import Test from '../../lib/test/test.js'
import StringTasks from './string-tasks.js'

const tasks = new StringTasks()

export default class StringTests extends Test {
    async testIsNullOrEmpty1() { this.isTrue("isNullOrEmpty('')", tasks.isNullOrEmpty('')) }
	async testIsNullOrEmpty2() { this.isTrue("isNullOrEmpty(null)", tasks.isNullOrEmpty(null)) }
	async testIsNullOrEmpty3() { this.isFalse("isNullOrEmpty('Hello')", tasks.isNullOrEmpty('Hello')) }

	async testToCapitalInitial1() { this.isEqual("toCapitalInitial('')", tasks.toCapitalInitial(''), '') }
	async testToCapitalInitial2() { this.isEqual("toCapitalInitial(null)", tasks.toCapitalInitial(null), null) }
	async testToCapitalInitial3() { this.isEqual("toCapitalInitial('hello')", tasks.toCapitalInitial('hello'), 'Hello') }

	async testContainsChar1() { this.isTrue("containsChar('Hello World!', 'H')", tasks.containsChar('Hello World!', 'H')) }
	async testContainsChar2() { this.isFalse("containsChar('Hello World!', 'a')", tasks.containsChar('Hello World!', 'a')) }
	async testContainsChar3() { this.isTrue("containsChar('Hello World!', '')", tasks.containsChar('Hello World!', '')) }
	async testContainsChar4() { this.isFalse("containsChar('Hello World!', null)", tasks.containsChar('Hello World!', null)) }
	async testContainsChar5() { this.isFalse("containsChar('', 'a')", tasks.containsChar('', 'a')) }
	async testContainsChar6() { this.isFalse("containsChar('', null)", tasks.containsChar('', null)) }
	async testContainsChar7() { this.isFalse("containsChar(null, 'a)", tasks.containsChar(null, 'a')) }

	async testGetExtension1() { this.isEqual("getExtension('index.html')", tasks.getExtension('index.html'), 'html') }
	async testGetExtension2() { this.isEqual("getExtension('readme')", tasks.getExtension('readme'), '') }
	async testGetExtension3() { this.isEqual("getExtension('index.')", tasks.getExtension('index.'), '') }

	async testIsPalindrom1() { this.isTrue("isPalindrom('racecar')", tasks.isPalindrom('racecar')) }
	async testIsPalindrom2() { this.isFalse("isPalindrom('baka')", tasks.isPalindrom('baka')) }
	async testIsPalindrom3() { this.isFalse("isPalindrom('')", tasks.isPalindrom('')) }

	async testTokenize1() { this.isEqual("tokenize('This\tis a\ttest!', ' \\t\\n')", tasks.tokenize('This\tis a\ttest!', ' \t\n'), ['This', 'is', 'a', 'test!']) }
	async testTokenize2() { this.isEqual("tokenize('This is a test!', '\\t\\n')", tasks.tokenize('This is a test!', '\t\n'), ['This is a test!']) }
	async testTokenize3() { this.isEqual("tokenize('This\tis a\ttest!', '')", tasks.tokenize('This\tis a\ttest!', ''), ['This\tis a\ttest!']) }
	async testTokenize4() { this.isEqual("tokenize('This\tis a\ttest!', null)", tasks.tokenize('This\tis a\ttest!', null), ['This\tis a\ttest!']) }
	async testTokenize5() { this.isEqual("tokenize(null, null)", tasks.tokenize(null, null), []) }

	async testReplaceFirstWord1() { this.isEqual("replaceFirstWord('This\tis a\ttest!', 'That')", tasks.replaceFirstWord('This\tis a\ttest!', 'That'), 'That\tis a\ttest!') }
	async testReplaceFirstWord2() { this.isEqual("replaceFirstWord('This\tis a\ttest!', '')", tasks.replaceFirstWord('This\tis a\ttest!', ''), '\tis a\ttest!') }
	async testReplaceFirstWord3() { this.isEqual("replaceFirstWord('This\tis a\ttest!', null)", tasks.replaceFirstWord('This\tis a\ttest!', null), '\tis a\ttest!') }
	async testReplaceFirstWord4() { this.isEqual("replaceFirstWord('', 'That')", tasks.replaceFirstWord('', 'That'), '') }
	async testReplaceFirstWord5() { this.isEqual("replaceFirstWord(null, 'That')", tasks.replaceFirstWord(null, 'That'), null) }


    async test_removeChars1() { this.isEqual("removeChars('Hello', 'hl')", tasks.removeChars('Hello', 'hl'), 'Heo') }
    async test_removeChars2() { this.isEqual("removeChars('JavaScript', 'a')", tasks.removeChars('JavaScript', 'a'), 'JvScript') }
    async test_removeChars3() { this.isEqual("removeChars('', 'abc')", tasks.removeChars('', 'abc'), '') }
    async test_removeChars4() { this.isEqual("removeChars('Test', '')", tasks.removeChars('Test', ''), 'Test') }

    async test_hasWord1() { this.isTrue("hasWord('Hello world', 'world')", tasks.hasWord('Hello world', 'world')) }
    async test_hasWord2() { this.isFalse("hasWord('Hello world', 'World')", tasks.hasWord('Hello world', 'World')) }
    async test_hasWord3() { this.isFalse("hasWord('', 'a')", tasks.hasWord('', 'a')) }
    async test_hasWord4() { this.isTrue("hasWord('abc', '')", tasks.hasWord('abc', '')) }

    async test_firstChar1() { this.isEqual("firstChar('Hello')", tasks.firstChar('Hello'), 'H') }
    async test_firstChar2() { this.isEqual("firstChar('A')", tasks.firstChar('A'), 'A') }
    async test_firstChar3() { this.isEqual("firstChar('')", tasks.firstChar(''), '') }
    async test_firstChar4() { this.isEqual("firstChar('  ')", tasks.firstChar('  '), ' ') }

    async test_lastChar1() { this.isEqual("lastChar('Hello')", tasks.lastChar('Hello'), 'o') }
    async test_lastChar2() { this.isEqual("lastChar('A')", tasks.lastChar('A'), 'A') }
    async test_lastChar3() { this.isEqual("lastChar('')", tasks.lastChar(''), '') }
    async test_lastChar4() { this.isEqual("lastChar('Hi ')", tasks.lastChar('Hi '), ' ') }

    async test_startsWithIgnoreCase1() { this.isTrue("startsWithIgnoreCase('Hello', 'he')", tasks.startsWithIgnoreCase('Hello', 'he')) }
    async test_startsWithIgnoreCase2() { this.isFalse("startsWithIgnoreCase('Hello', 'Hi')", tasks.startsWithIgnoreCase('Hello', 'Hi')) }
    async test_startsWithIgnoreCase3() { this.isFalse("startsWithIgnoreCase('', 'a')", tasks.startsWithIgnoreCase('', 'a')) }
    async test_startsWithIgnoreCase4() { this.isTrue("startsWithIgnoreCase('Test', '')", tasks.startsWithIgnoreCase('Test', '')) }

    async test_endsWithIgnoreCase1() { this.isTrue("endsWithIgnoreCase('Hello', 'LO')", tasks.endsWithIgnoreCase('Hello', 'LO')) }
    async test_endsWithIgnoreCase2() { this.isFalse("endsWithIgnoreCase('Hello', 'Hi')", tasks.endsWithIgnoreCase('Hello', 'Hi')) }
    async test_endsWithIgnoreCase3() { this.isFalse("endsWithIgnoreCase('', 'a')", tasks.endsWithIgnoreCase('', 'a')) }
    async test_endsWithIgnoreCase4() { this.isTrue("endsWithIgnoreCase('Test', '')", tasks.endsWithIgnoreCase('Test', '')) }

    async test_getFirstWord1() { this.isEqual("getFirstWord('Hello world')", tasks.getFirstWord('Hello world'), 'Hello') }
    async test_getFirstWord2() { this.isEqual("getFirstWord('One')", tasks.getFirstWord('One'), 'One') }
    async test_getFirstWord3() { this.isEqual("getFirstWord('')", tasks.getFirstWord(''), '') }
    async test_getFirstWord4() { this.isEqual("getFirstWord('   Test')", tasks.getFirstWord('   Test'), '') }

    async test_getLastWord1() { this.isEqual("getLastWord('Hello world')", tasks.getLastWord('Hello world'), 'world') }
    async test_getLastWord2() { this.isEqual("getLastWord('One')", tasks.getLastWord('One'), 'One') }
    async test_getLastWord3() { this.isEqual("getLastWord('')", tasks.getLastWord(''), '') }
    async test_getLastWord4() { this.isEqual("getLastWord('Test   ')", tasks.getLastWord('Test   '), '') }

    async test_skipChars1() { this.isEqual("skipChars('  Hello', ' \t\n\r')", tasks.skipChars('  Hello', ' \t\n\r'), 2) }
    async test_skipChars2() { this.isEqual("skipChars('  Hello', ' Hell')", tasks.skipChars('  Hello', ' Hell'), 6) }
    async test_skipChars3() { this.isEqual("skipChars('  Hello', '')", tasks.skipChars('  Hello', ''), 0) }
    async test_skipChars4() { this.isEqual("skipChars('  Hello', ' Hello')", tasks.skipChars('  Hello', ' Hello'), 7) }

    async test_searchChars1() { this.isEqual("searchChars('  Hello', ' \t\n\r')", tasks.searchChars('  Hello', ' \t\n\r'), 0) }
    async test_searchChars2() { this.isEqual("searchChars('  Hello', 'Hell')", tasks.searchChars('  Hello', 'Hell'), 2) }
    async test_searchChars3() { this.isEqual("searchChars('  Hello', '')", tasks.searchChars('  Hello', ''), 0) }
    async test_searchChars4() { this.isEqual("searchChars('  Hello', 'Oo')", tasks.searchChars('  Hello', 'Oo'), 6) }

    async test_toKeyValuePairs1() { this.isEqual("toKeyValuePairs('kulcs1=érték1;kulcs2=érték2')", tasks.toKeyValuePairs('kulcs1=érték1;kulcs2=érték2'), { "kulcs1": "érték1", "kulcs2": "érték2" }) }
    async test_toKeyValuePairs2() { this.isEqual("toKeyValuePairs('kulcs1=érték1;kulcs2=')", tasks.toKeyValuePairs('kulcs1=érték1;kulcs2='), { "kulcs1": "érték1", "kulcs2": null }) }
    async test_toKeyValuePairs3() { this.isEqual("toKeyValuePairs('')", tasks.toKeyValuePairs(''), {}) }
    async test_toKeyValuePairs4() { this.isEqual("toKeyValuePairs('kulcs1=érték1,kulcs2=érték2')", tasks.toKeyValuePairs('kulcs1=érték1,kulcs2=érték2'), { "kulcs1": "érték1,kulcs2=érték2" }) }

    async test_fromKeyValuePairs1() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1', 'kulcs2': 'érték2' })", tasks.fromKeyValuePairs({ "kulcs1": "érték1", "kulcs2": "érték2" }), 'kulcs1=érték1;kulcs2=érték2') }
    async test_fromKeyValuePairs2() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1', 'kulcs2': null })", tasks.fromKeyValuePairs({ "kulcs1 ": "érték1", "kulcs2 ": null }), 'kulcs1=érték1;kulcs2=') }
    async test_fromKeyValuePairs3() { this.isEqual("fromKeyValuePairs({})", tasks.fromKeyValuePairs({}), '') }
    async test_fromKeyValuePairs4() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1,kulcs2=érték2' })", tasks.fromKeyValuePairs({ "kulcs1": "érték1,kulcs2=érték2" }), 'kulcs1=érték1,kulcs2=érték2') }

    async test_toCamelCase1() { this.isEqual("toCamelCase('to CAMEL case')", tasks.toCamelCase('to CAMEL case'), 'toCamelCase') }
    async test_toCamelCase2() { this.isEqual("toCamelCase('to')", tasks.toCamelCase('to'), 'to') }
    async test_toCamelCase3() { this.isEqual("toCamelCase('  ')", tasks.toCamelCase('  '), '') }
    async test_toCamelCase4() { this.isEqual("toCamelCase('')", tasks.toCamelCase(''), '') }

    async test_joinWithChar1() { this.isEqual("joinWithChar('join with char')", tasks.joinWithChar('join with char'), 'join_with_char') }
    async test_joinWithChar2() { this.isEqual("joinWithChar('join')", tasks.joinWithChar('join'), 'join') }
    async test_joinWithChar3() { this.isEqual("joinWithChar('  ')", tasks.joinWithChar('  '), '') }
    async test_joinWithChar4() { this.isEqual("joinWithChar('')", tasks.joinWithChar(''), '') }

    async test_toUpper1() { this.isEqual("toUpper('toUpper', 'aeiou')", tasks.toUpper('toUpper', 'aeiou'), 'tOUppEr') }
    async test_toUpper2() { this.isEqual("toUpper('toUpper', 'bcd')", tasks.toUpper('toUpper', 'bcd'), 'toUpper') }
    async test_toUpper3() { this.isEqual("toUpper('toUpper', '')", tasks.toUpper('toUpper', ''), 'toUpper') }
    async test_toUpper4() { this.isEqual("toUpper('', 'aeiou')", tasks.toUpper('', 'aeiou'), '') }

    async test_toLower1() { this.isEqual("toLower('ToLower', 'lmno')", tasks.toLower('ToLower', 'lmno'), 'Tolower') }
    async test_toLower2() { this.isEqual("toLower('ToLower', 'bcd')", tasks.toLower('ToLower', 'bcd'), 'ToLower') }
    async test_toLower3() { this.isEqual("toLower('ToLower', '')", tasks.toLower('ToLower', ''), 'ToLower') }
    async test_toLower4() { this.isEqual("toLower('', 'aeiou')", tasks.toLower('', 'aeiou'), '') }

    async test_getCommand1() { this.isEqual("getCommand('open(test,r)", tasks.getCommand('open(test,r)'), ['open', 'test', 'r']) }
    async test_getCommand2() { this.isEqual("getCommand(' open (test , r)", tasks.getCommand(' open (test , r)'), ['open', 'test', 'r']) }
    async test_getCommand3() { this.isEqual("getCommand(' close ')", tasks.getCommand(' close '), ['close']) }
    async test_getCommand4() { this.isEqual("getCommand('')", tasks.getCommand(''), null) }

    async test_normalizeSpaces1() { this.isEqual("normalizeSpaces('a   b')", tasks.normalizeSpaces('a   b'), 'a b') }
    async test_normalizeSpaces2() { this.isEqual("normalizeSpaces('hello')", tasks.normalizeSpaces('hello'), 'hello') }
    async test_normalizeSpaces3() { this.isEqual("normalizeSpaces('')", tasks.normalizeSpaces(''), '') }
    async test_normalizeSpaces4() { this.isEqual("normalizeSpaces('   a')", tasks.normalizeSpaces('   a'), ' a') }

    async test_formatNumber1() { this.isEqual("formatNumber(12.23, 4)", tasks.formatNumber(12.23, 4), '12.2300') }
    async test_formatNumber2() { this.isEqual("formatNumber(0.23, 1)", tasks.formatNumber(0.23, 1), '0.2') }
    async test_formatNumber3() { this.isEqual("formatNumber(12, 2)", tasks.formatNumber(12, 2), '12.00') }
    async test_formatNumber4() { this.isEqual("formatNumber(12.23, 0)", tasks.formatNumber(12.23, 0), '12') }

    async test_formatDate1() { this.isEqual("formatDate(2025, 12, 15)", tasks.formatDate(2025, 12, 15), '2025-12-15') }
    async test_formatDate2() { this.isEqual("formatDate(null, 12, 15)", tasks.formatDate(null, 12, 15), null) }
    async test_formatDate3() { this.isEqual("formatDate(2025, 13, 15)", tasks.formatDate(2025, 13, 15), null) }
    async test_formatDate4() { this.isEqual("formatDate(0, 12, 15)", tasks.formatDate(0, 12, 15), null) }
}