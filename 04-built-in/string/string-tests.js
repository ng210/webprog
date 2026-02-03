import Test from '../../lib/test/test.js'
import StringTasks from './string-tasks-resolved.js'

const tasks = new StringTasks()

export default class StringTests extends Test {

    //#region IsNullOrEmpty
    async testIsNullOrEmpty1() { this.isTrue("isNullOrEmpty('')", tasks.isNullOrEmpty('')) }
	async testIsNullOrEmpty2() { this.isTrue("isNullOrEmpty(null)", tasks.isNullOrEmpty(null)) }
	async testIsNullOrEmpty3() { this.isFalse("isNullOrEmpty('Hello')", tasks.isNullOrEmpty('Hello')) }
    //#endregion
    //#region useTemplate
	async testUseTemplate1() {
        this.isEqual(`useTemplate('<{tag} id="{id}" title="{hint}"/>', {"id":"btnOk", "tag":"button", "hint":"Click Ok"})`,
            tasks.useTemplate('<{tag} id="{id}" title="{hint}"/>', {"id":"btnOk", "tag":"button", "hint":"Click Ok"}),
            '<button id="btnOk" title="Click Ok"/>') }
	async testUseTemplate2() {
        this.isEqual(`useTemplate('<{tag} id="{id}" title="{hint}"/>', {})`,
            tasks.useTemplate('<{tag} id="{id}" title="{hint}"/>', {}),
            '<{tag} id="{id}" title="{hint}"/>') }
	async testUseTemplate3() {
        this.isEqual(`useTemplate('', {})`,
            tasks.useTemplate('', {}),
            '') }
	async testUseTemplate4() {
        this.isEqual(`useTemplate(null, {})`,
            tasks.useTemplate(null, {}),
            null) }
	async testUseTemplate5() {
        this.isEqual(`useTemplate('<{tag]/>', null)`,
            tasks.useTemplate('<{tag]/>', null),
            '<{tag]/>') }
    //#endregion
    //#region CapitalInitial
	async testToCapitalInitial1() { this.isEqual("toCapitalInitial('')", tasks.toCapitalInitial(''), '') }
	async testToCapitalInitial2() { this.isEqual("toCapitalInitial(null)", tasks.toCapitalInitial(null), null) }
	async testToCapitalInitial3() { this.isEqual("toCapitalInitial('hello')", tasks.toCapitalInitial('hello'), 'Hello') }
    async testToCapitalInitial4() { this.isEqual("toCapitalInitial('Hello')", tasks.toCapitalInitial('Hello'), 'Hello') }
    //#endregion
    //#region ContainsChar
	async testContainsChar1() { this.isTrue("containsChar('Hello World!', 'H')", tasks.containsChar('Hello World!', 'H')) }
	async testContainsChar2() { this.isFalse("containsChar('Hello World!', 'a')", tasks.containsChar('Hello World!', 'a')) }
	async testContainsChar3() { this.isTrue("containsChar('Hello World!', '')", tasks.containsChar('Hello World!', '')) }
	async testContainsChar4() { this.isFalse("containsChar('Hello World!', null)", tasks.containsChar('Hello World!', null)) }
	async testContainsChar5() { this.isFalse("containsChar('', 'a')", tasks.containsChar('', 'a')) }
	async testContainsChar6() { this.isFalse("containsChar('', null)", tasks.containsChar('', null)) }
	async testContainsChar7() { this.isFalse("containsChar(null, 'a)", tasks.containsChar(null, 'a')) }
    //#endregion
    //#region GetExtension
	async testGetExtension1() { this.isEqual("getExtension('index.html')", tasks.getExtension('index.html'), 'html') }
    async testGetExtension2() { this.isEqual("getExtension('main.index.html')", tasks.getExtension('main.index.html'), 'html') }
	async testGetExtension3() { this.isEqual("getExtension('readme')", tasks.getExtension('readme'), '') }
	async testGetExtension4() { this.isEqual("getExtension('index.')", tasks.getExtension('index.'), '') }
	async testGetExtension5() { this.isEqual("getExtension(null)", tasks.getExtension(null), null) }
    async testGetExtension6() { this.isEqual("getExtension('')", tasks.getExtension(''), null) }
    //#endregion
    //#region IsPalindrom
	async testIsPalindrom1() { this.isTrue("isPalindrom('racecar')", tasks.isPalindrom('racecar')) }
	async testIsPalindrom2() { this.isFalse("isPalindrom('baka')", tasks.isPalindrom('baka')) }
	async testIsPalindrom3() { this.isFalse("isPalindrom('')", tasks.isPalindrom('')) }
    //#endregion
    //#region Tokenize
	async testTokenize1() { this.isEqual("tokenize('This\tis a\ttest!', ' \\t\\n')", tasks.tokenize('This\tis a\ttest!', ' \t\n'), ['This', 'is', 'a', 'test!']) }
    async testTokenize2() { this.isEqual("tokenize('This\tis\n', '\\t\\n')", tasks.tokenize('This\tis\n', '\t\n'), ['This', 'is']) }
	async testTokenize3() { this.isEqual("tokenize('This is a test!', '\\t\\n')", tasks.tokenize('This is a test!', '\t\n'), ['This is a test!']) }
	async testTokenize4() { this.isEqual("tokenize('This\tis a\ttest!', '')", tasks.tokenize('This\tis a\ttest!', ''), ['This\tis a\ttest!']) }
	async testTokenize5() { this.isEqual("tokenize('This\tis a\ttest!', null)", tasks.tokenize('This\tis a\ttest!', null), ['This\tis a\ttest!']) }
	async testTokenize6() { this.isEqual("tokenize(null, null)", tasks.tokenize(null, null), []) }
	async testTokenize7() { this.isEqual("tokenize('', ' \\t\\n')", tasks.tokenize('', ' \\t\\n'), []) }
    //#endregion
    //#region ReplaceFirstWord
	async testReplaceFirstWord1() { this.isEqual("replaceFirstWord('This\tis a\ttest!', 'That')", tasks.replaceFirstWord('This\tis a\ttest!', 'That'), 'That\tis a\ttest!') }
	async testReplaceFirstWord2() { this.isEqual("replaceFirstWord('This\tis a\ttest!', '')", tasks.replaceFirstWord('This\tis a\ttest!', ''), '\tis a\ttest!') }
	async testReplaceFirstWord3() { this.isEqual("replaceFirstWord('This\tis a\ttest!', null)", tasks.replaceFirstWord('This\tis a\ttest!', null), '\tis a\ttest!') }
	async testReplaceFirstWord4() { this.isEqual("replaceFirstWord('', 'That')", tasks.replaceFirstWord('', 'That'), '') }
	async testReplaceFirstWord5() { this.isEqual("replaceFirstWord(null, 'That')", tasks.replaceFirstWord(null, 'That'), null) }
    //#endregion
    //#region IsUrl
    async testIsUrl1() { this.isTrue("isUrl('https://localhost:5505/api/index.html#top?uid=root')", tasks.isUrl('https://localhost:5505/api/index.html#top?uid=root')) }
    async testIsUrl2() { this.isTrue("isUrl('http://localhost/api/index?uid=root')", tasks.isUrl('http://localhost/api/index?uid=root')) }
    async testIsUrl3() { this.isTrue("isUrl('http://localhost/index?uid=root')", tasks.isUrl('http://localhost/index?uid=root')) }
    async testIsUrl4() { this.isTrue("isUrl('https://localhost:5505/api/index.html')", tasks.isUrl('https://localhost:5505/api/index.html')) }
    async testIsUrl5() { this.isTrue("isUrl('https://localhost:5505/api')", tasks.isUrl('https://localhost:5505/api')) }
    async testIsUrl6() { this.isTrue("isUrl('https://localhost:5505')", tasks.isUrl('https://localhost:5505')) }
    async testIsUrl7() { this.isTrue("isUrl('https://localhost')", tasks.isUrl('https://localhost')) }
    async testIsUrl7() { this.isFalse("isUrl('https:///api')", tasks.isUrl('https://localhost')) }
    async testIsUrl7() { this.isFalse("isUrl('localhost:5505/api/index.html#top?uid=root')", tasks.isUrl('localhost:5505/api/index.html#top?uid=root')) }
    async testIsUrl8() { this.isFalse("isUrl('')", tasks.isUrl('')) }
    async testIsUrl9() { this.isFalse("isUrl('https:///api/index?uid=root')", tasks.isUrl('https:///api/index?uid=root')) }
    //#endregion
    //#region Sanitize
    async test_sanitize1() { this.isEqual("tasks.sanitize(null)", tasks.sanitize(null), null)}
    async test_sanitize2() { this.isEqual("tasks.sanitize('')", tasks.sanitize(''), '')}
    async test_sanitize3() { this.isEqual(`tasks.sanitize('  <div id="main" onclick="alert(\'ba&ka\')"/>  `, tasks.sanitize('  <div id="main" onclick="alert(\'ba&ka\')"/>  '), '&lt;div id=&quot;main&quot; onclick=&quot;alert(&#39;ba&amp;ka&#39;)&quot;/&gt;')}
    //#endregion
    //#region removeChars
    async test_removeChars1() { this.isEqual("removeChars('Hello', 'hl')", tasks.removeChars('Hello', 'hl'), 'Heo') }
    async test_removeChars2() { this.isEqual("removeChars('JavaScript', 'a')", tasks.removeChars('JavaScript', 'a'), 'JvScript') }
    async test_removeChars3() { this.isEqual("removeChars('', 'abc')", tasks.removeChars('', 'abc'), '') }
    async test_removeChars4() { this.isEqual("removeChars('Test', '')", tasks.removeChars('Test', ''), 'Test') }
    //#endregion
    //#region HasWord
    async test_hasWord1() { this.isTrue("hasWord('Hello world', 'world')", tasks.hasWord('Hello world', 'world')) }
    async test_hasWord2() { this.isFalse("hasWord('Hello world', 'World')", tasks.hasWord('Hello world', 'World')) }
    async test_hasWord2() { this.isFalse("hasWord('Helloworld', 'world')", tasks.hasWord('Helloworld', 'world')) }
    async test_hasWord3() { this.isFalse("hasWord('', 'a')", tasks.hasWord('', 'a')) }
    async test_hasWord4() { this.isFalse("hasWord('abc', '')", tasks.hasWord('abc', '')) }
    //#endregion
    //#region FirstChar
    async test_firstChar1() { this.isEqual("firstChar('Hello')", tasks.firstChar('Hello'), 'H') }
    async test_firstChar2() { this.isEqual("firstChar('A')", tasks.firstChar('A'), 'A') }
    async test_firstChar3() { this.isEqual("firstChar(null)", tasks.firstChar(null), null) }
    async test_firstChar4() { this.isEqual("firstChar('')", tasks.firstChar(''), '') }
    async test_firstChar5() { this.isEqual("firstChar('  ')", tasks.firstChar('  '), ' ') }
    //#endregion
    //#region LastChar
    async test_lastChar1() { this.isEqual("lastChar('Hello')", tasks.lastChar('Hello'), 'o') }
    async test_lastChar2() { this.isEqual("lastChar('A')", tasks.lastChar('A'), 'A') }
    async test_lastChar3() { this.isEqual("lastChar(null)", tasks.lastChar(null), null) }
    async test_lastChar4() { this.isEqual("lastChar('')", tasks.lastChar(''), '') }
    async test_lastChar5() { this.isEqual("lastChar('Hi ')", tasks.lastChar('Hi '), ' ') }
    //#endregion
    //#region StartsWithIgnoreCase
    async test_startsWithIgnoreCase1() { this.isTrue("startsWithIgnoreCase('Hello', 'he')", tasks.startsWithIgnoreCase('Hello', 'he')) }
    async test_startsWithIgnoreCase2() { this.isFalse("startsWithIgnoreCase('Hello', 'Hi')", tasks.startsWithIgnoreCase('Hello', 'Hi')) }
    async test_startsWithIgnoreCase3() { this.isFalse("startsWithIgnoreCase(null, 'a')", tasks.startsWithIgnoreCase(null, 'a')) }
    async test_startsWithIgnoreCase4() { this.isTrue("startsWithIgnoreCase('', '')", tasks.startsWithIgnoreCase('', '')) }
    async test_startsWithIgnoreCase5() { this.isFalse("startsWithIgnoreCase('', 'a')", tasks.startsWithIgnoreCase('', 'a')) }
    async test_startsWithIgnoreCase6() { this.isTrue("startsWithIgnoreCase('Test', '')", tasks.startsWithIgnoreCase('Test', '')) }
    //#endregion
    //#region EndsWithIgnoreCase
    async test_endsWithIgnoreCase1() { this.isTrue("endsWithIgnoreCase('Hello', 'LO')", tasks.endsWithIgnoreCase('Hello', 'LO')) }
    async test_endsWithIgnoreCase2() { this.isFalse("endsWithIgnoreCase('Hello', 'Hi')", tasks.endsWithIgnoreCase('Hello', 'Hi')) }
    async test_endsWithIgnoreCase3() { this.isFalse("endsWithIgnoreCase(null, 'a')", tasks.endsWithIgnoreCase(null, 'a')) }
    async test_endsWithIgnoreCase4() { this.isTrue("endsWithIgnoreCase('', '')", tasks.endsWithIgnoreCase('', '')) }
    async test_endsWithIgnoreCase5() { this.isFalse("endsWithIgnoreCase('', 'a')", tasks.endsWithIgnoreCase('', 'a')) }
    async test_endsWithIgnoreCase6() { this.isTrue("endsWithIgnoreCase('Test', '')", tasks.endsWithIgnoreCase('Test', '')) }
    //#endregion
    //#region GetFirstWord
    async test_getFirstWord1() { this.isEqual("getFirstWord('Hello  world')", tasks.getFirstWord('Hello  world'), 'Hello') }
    async test_getFirstWord2() { this.isEqual("getFirstWord('  Hello world')", tasks.getFirstWord('  Hello world'), 'Hello') }
    async test_getFirstWord3() { this.isEqual("getFirstWord('One')", tasks.getFirstWord('One'), 'One') }
    async test_getFirstWord4() { this.isEqual("getFirstWord('')", tasks.getFirstWord(''), '') }
    async test_getFirstWord5() { this.isEqual("getFirstWord(null)", tasks.getFirstWord(null), null) }
    //#endregion
    //#region GetLastWord
    async test_getLastWord1() { this.isEqual("getLastWord('Hello  world')", tasks.getLastWord('Hello  world'), 'world') }
    async test_getLastWord2() { this.isEqual("getLastWord('Hello world  ')", tasks.getLastWord('Hello world  '), 'world') }
    async test_getLastWord3() { this.isEqual("getLastWord('One')", tasks.getLastWord('One'), 'One') }
    async test_getLastWord4() { this.isEqual("getLastWord('')", tasks.getLastWord(''), '') }
    async test_getLastWord5() { this.isEqual("getLastWord(null)", tasks.getLastWord(null), null) }
    //#endregion
    //#region SkipChars
    async test_skipChars1() { this.isEqual("skipChars('  Hello', ' \t\n\r')", tasks.skipChars('  Hello', ' \t\n\r'), 2) }
    async test_skipChars2() { this.isEqual("skipChars('  Hello', ' Hell')", tasks.skipChars('  Hello', ' Hell'), 6) }
    async test_skipChars3() { this.isEqual("skipChars('  Hello', null)", tasks.skipChars('  Hello', null), -1) }
    async test_skipChars4() { this.isEqual("skipChars(null, '')", tasks.skipChars(null, ''), -1) }
    async test_skipChars5() { this.isEqual("skipChars('  Hello', '')", tasks.skipChars('  Hello', ''), 0) }
    async test_skipChars6() { this.isEqual("skipChars('  Hello', ' Hello')", tasks.skipChars('  Hello', ' Hello'), 7) }
    //#endregion
    //#region SeekChars
    async test_seekChars1() { this.isEqual("seekChars('  Hello', ' \\t\\n\\r')", tasks.seekChars('  Hello', ' \t\n\r'), 0) }
    async test_seekChars2() { this.isEqual("seekChars('  Hello', 'Hell')", tasks.seekChars('  Hello', 'Hell'), 2) }
    async test_seekChars3() { this.isEqual("seekChars('Hello ', ' \\t\\n')", tasks.seekChars('Hello ', ' \t\n'), 5) }
    async test_seekChars4() { this.isEqual("seekChars('Hello', 'O')", tasks.seekChars('Hello', 'O'), 5) }
    async test_seekChars5() { this.isEqual("seekChars('  Hello', null)", tasks.seekChars('  Hello', null), -1) }
    async test_seekChars6() { this.isEqual("seekChars(null, '')", tasks.seekChars(null, ''), -1) }
    //#endregion
    //#region ToKeyValuePairs
    async test_toKeyValuePairs1() { this.isEqual("toKeyValuePairs('kulcs1=érték1;kulcs2=érték2')", tasks.toKeyValuePairs('kulcs1=érték1;kulcs2=érték2'), { "kulcs1": "érték1", "kulcs2": "érték2" }) }
    async test_toKeyValuePairs2() { this.isEqual("toKeyValuePairs('kulcs1=érték1;kulcs2=')", tasks.toKeyValuePairs('kulcs1=érték1;kulcs2='), { "kulcs1": "érték1", "kulcs2": null }) }
    async test_toKeyValuePairs3() { this.isEqual("toKeyValuePairs('')", tasks.toKeyValuePairs(''), {}) }
    async test_toKeyValuePairs4() { this.isEqual("toKeyValuePairs('kulcs1=érték1,kulcs2=érték2')", tasks.toKeyValuePairs('kulcs1=érték1,kulcs2=érték2'), { "kulcs1": "érték1,kulcs2=érték2" }) }
    async test_toKeyValuePairs5() { this.isEqual("toKeyValuePairs(null)", tasks.toKeyValuePairs(null), null) }
    //#endregion
    //#region FromKeyValuePairs
    async test_fromKeyValuePairs1() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1', 'kulcs2': 'érték2' })", tasks.fromKeyValuePairs({ "kulcs1": "érték1", "kulcs2": "érték2" }), 'kulcs1=érték1;kulcs2=érték2') }
    async test_fromKeyValuePairs2() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1', 'kulcs2': null })", tasks.fromKeyValuePairs({ "kulcs1": "érték1", "kulcs2": null }), 'kulcs1=érték1;kulcs2=') }
    async test_fromKeyValuePairs3() { this.isEqual("fromKeyValuePairs({})", tasks.fromKeyValuePairs({}), '') }
    async test_fromKeyValuePairs4() { this.isEqual("fromKeyValuePairs({ 'kulcs1': 'érték1,kulcs2=érték2' })", tasks.fromKeyValuePairs({ "kulcs1": "érték1,kulcs2=érték2" }), 'kulcs1=érték1,kulcs2=érték2') }
    //#endregion
    //#region ToCamelCase
    async test_toCamelCase1() { this.isEqual("toCamelCase('to CaMEL case')", tasks.toCamelCase('to CaMEL case'), 'toCamelCase') }
    async test_toCamelCase2() { this.isEqual("toCamelCase('  to CAMEL  case  ')", tasks.toCamelCase('to CAMEL  case'), 'toCamelCase') }
    async test_toCamelCase3() { this.isEqual("toCamelCase('to')", tasks.toCamelCase('to'), 'to') }
    async test_toCamelCase4() { this.isEqual("toCamelCase('  ')", tasks.toCamelCase('  '), '') }
    async test_toCamelCase5() { this.isEqual("toCamelCase('')", tasks.toCamelCase(''), '') }
    async test_toCamelCase6() { this.isEqual("toCamelCase(null)", tasks.toCamelCase(null), null) }
    //#endregion
    //#region ToUpper
    async test_toUpper1() { this.isEqual("toUpper('toUpper', 'aeiou')", tasks.toUpper('toUpper', 'aeiou'), 'tOUppEr') }
    async test_toUpper2() { this.isEqual("toUpper('toUpper', 'bcd')", tasks.toUpper('toUpper', 'bcd'), 'toUpper') }
    async test_toUpper3() { this.isEqual("toUpper('toUpper', '')", tasks.toUpper('toUpper', ''), 'toUpper') }
    async test_toUpper4() { this.isEqual("toUpper('', 'aeiou')", tasks.toUpper('', 'aeiou'), '') }
    async test_toUpper5() { this.isEqual("toUpper(null, 'aeiou')", tasks.toUpper(null, 'aeiou'), null) }
    async test_toUpper6() { this.isEqual("toUpper('', null)", tasks.toUpper('', null), '') }
    //#endregion
    //#region ToLower
    async test_toLower1() { this.isEqual("toLower('ToLower', 'lmno')", tasks.toLower('ToLower', 'lmno'), 'Tolower') }
    async test_toLower2() { this.isEqual("toLower('ToLower', 'bcd')", tasks.toLower('ToLower', 'bcd'), 'ToLower') }
    async test_toLower3() { this.isEqual("toLower('ToLower', '')", tasks.toLower('ToLower', ''), 'ToLower') }
    async test_toLower4() { this.isEqual("toLower('', 'aeiou')", tasks.toLower('', 'aeiou'), '') }
    async test_toLower5() { this.isEqual("toLower(null, 'aeiou')", tasks.toLower(null, 'aeiou'), null) }
    async test_toLower6() { this.isEqual("toLower('', null)", tasks.toLower('', null), '') }
    //#endregion
    //#region GetCommand
    async test_getCommand1() { this.isEqual("getCommand('open(test,r)", tasks.getCommand('open(test,r)'), ['open', 'test', 'r']) }
    async test_getCommand2() { this.isEqual("getCommand(' open (test , r)", tasks.getCommand(' open (test , r)'), ['open', 'test', 'r']) }
    async test_getCommand3() { this.isEqual("getCommand(' close ')", tasks.getCommand(' close '), ['close']) }
    async test_getCommand4() { this.isEqual("getCommand('')", tasks.getCommand(''), null) }
    async test_getCommand4() { this.isEqual("getCommand(null)", tasks.getCommand(null), null) }
    //#endregion
    //#region NormalizeSpaces
    async test_normalizeSpaces1() { this.isEqual("normalizeSpaces('a   b')", tasks.normalizeSpaces('a   b'), 'a b') }
    async test_normalizeSpaces2() { this.isEqual("normalizeSpaces('hello')", tasks.normalizeSpaces('hello'), 'hello') }
    async test_normalizeSpaces3() { this.isEqual("normalizeSpaces('')", tasks.normalizeSpaces(''), '') }
    async test_normalizeSpaces4() { this.isEqual("normalizeSpaces('   a  ')", tasks.normalizeSpaces('   a  '), ' a ') }
    async test_normalizeSpaces5() { this.isEqual("normalizeSpaces(null)", tasks.normalizeSpaces(null), null) }
    //#endregion
    //#region FormatNumber
    async test_formatNumber1() { this.isEqual("formatNumber(12.23, 4)", tasks.formatNumber(12.23, 4), '12.2300') }
    async test_formatNumber2() { this.isEqual("formatNumber(12., 2)", tasks.formatNumber(12., 2), '12.00') }
    async test_formatNumber3() { this.isEqual("formatNumber(0.23, 1)", tasks.formatNumber(0.23, 1), '0.2') }
    async test_formatNumber4() { this.isEqual("formatNumber(12, 2)", tasks.formatNumber(12, 2), '12.00') }
    async test_formatNumber5() { this.isEqual("formatNumber(12.23, 0)", tasks.formatNumber(12.23, 0), '12') }
    async test_formatNumber6() { this.isEqual("formatNumber(null, 0)", tasks.formatNumber(null, 0), null) }
    async test_formatNumber7() { this.isEqual("formatNumber(NaN, 0)", tasks.formatNumber(NaN, 0), null) }
    //#endregion
    //#region FormatDate
    async test_formatDate1() { this.isEqual("formatDate(2025, 12, 15)", tasks.formatDate(2025, 12, 15), '2025-12-15') }
    async test_formatDate2() { this.isEqual("formatDate(5, 1, 1)", tasks.formatDate(5, 1, 1), '0005-01-01') }
    async test_formatDate3() { this.isEqual("formatDate(25, 1, 31)", tasks.formatDate(25, 1, 31), '0025-01-31') }
    async test_formatDate4() { this.isEqual("formatDate(2025, 12, 15)", tasks.formatDate(2025, 12, 15), '2025-12-15') }
    async test_formatDate5() { this.isEqual("formatDate(null, 12, 15)", tasks.formatDate(null, 12, 15), null) }
    async test_formatDate6() { this.isEqual("formatDate(2025, 13, 15)", tasks.formatDate(2025, 13, 15), null) }
    async test_formatDate7() { this.isEqual("formatDate(2025, 12, 32)", tasks.formatDate(2025, 12, 32), null) }
    async test_formatDate8() { this.isEqual("formatDate(2025, 2, 29)", tasks.formatDate(2025, 2, 29), null) }
    async test_formatDate9() { this.isEqual("formatDate(0, 12, 15)", tasks.formatDate(0, 12, 15), null) }
    async test_formatDate10() { this.isEqual("formatDate(2025, null, 15)", tasks.formatDate(2025, null, 15), null) }
    async test_formatDate11() { this.isEqual("formatDate(2025, 12, null)", tasks.formatDate(2025, 12, null), null) }
    //#endregion
}