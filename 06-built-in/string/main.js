import { getConsole, Colors } from '../../lib/console/console.js'
import Test from '../../lib/test/test.js'
import StringTasks from './string-tasks.js'

let _console = null
const tasks = new StringTasks()

class StringTests extends Test {
	// //#region isNullOrEmpty
	// async testIsNullOrEmpty1() {
	// 	this.cons.writeln('IsNullOrEmpty', Colors.LightCyan)
	// 	this.isTrue("isNullOrEmpty('')", tasks.isNullOrEmpty(''))
	// }
	// async testIsNullOrEmpty2() {
	// 	this.isTrue("isNullOrEmpty(null)", tasks.isNullOrEmpty(null))
	// }
	// async testIsNullOrEmpty3() {
	// 	this.isFalse("isNullOrEmpty('Hello')", tasks.isNullOrEmpty('Hello'))
	// }
	// //#endregion

	// //#region toCapitalInitial
	// async testToCapitalInitial1() {
	// 	this.cons.writeln('ToCapitalInitial', Colors.LightCyan)
	// 	this.isEqual("toCapitalInitial('')", tasks.toCapitalInitial(''), '')
	// }
	// async testToCapitalInitial2() {
	// 	this.isEqual("toCapitalInitial(null)", tasks.toCapitalInitial(null), null)
	// }
	// async testToCapitalInitial3() {
	// 	this.isEqual("toCapitalInitial('hello')", tasks.toCapitalInitial('hello'), 'Hello')
	// }
	// //#endregion

	// //#region containsChar
	// async testContainsChar1() {
	// 	this.cons.writeln('ContainsChar', Colors.LightCyan)
	// 	this.isTrue("containsChar('Hello World!', 'H')", tasks.containsChar('Hello World!', 'H'))
	// }
	// async testContainsChar2() {
	// 	this.isFalse("containsChar('Hello World!', 'a')", tasks.containsChar('Hello World!', 'a'))
	// }
	// async testContainsChar3() {
	// 	this.isTrue("containsChar('Hello World!', '')", tasks.containsChar('Hello World!', ''))
	// }
	// async testContainsChar4() {
	// 	this.isFalse("containsChar('Hello World!', null)", tasks.containsChar('Hello World!', null))
	// }
	// async testContainsChar5() {
	// 	this.isFalse("containsChar('', 'a')", tasks.containsChar('', 'a'))
	// }
	// async testContainsChar6() {
	// 	this.isFalse("containsChar('', null)", tasks.containsChar('', null))
	// }
	// async testContainsChar7() {
	// 	this.isFalse("containsChar(null, 'a)", tasks.containsChar(null, 'a'))
	// }
	// //#endregion

	// //#region getExtension
	// async testGetExtension1() {
	// 	this.cons.writeln('GetExtension', Colors.LightCyan)
	// 	this.isEqual("getExtension('index.html')", tasks.getExtension('index.html'), 'html')
	// }
	// async testGetExtension2() {
	// 	this.isEqual("getExtension('readme')", tasks.getExtension('readme'), '')
	// }
	// async testGetExtension3() {
	// 	this.isEqual("getExtension('index.')", tasks.getExtension('index.'), '')
	// }
	// //#endregion

	// //#region IsPalindrom
	// async testIsPalindrom1() {
	// 	this.cons.writeln('IsPalindrom', Colors.LightCyan)
	// 	this.isTrue("isPalindrom('racecar')", tasks.isPalindrom('racecar'))
	// }
	// async testIsPalindrom2() {
	// 	this.isFalse("isPalindrom('baka')", tasks.isPalindrom('baka'))
	// }
	// async testIsPalindrom3() {
	// 	this.isFalse("isPalindrom('')", tasks.isPalindrom(''))
	// }
	// //#endregion

	// //#region tokenize
	// async testTokenize1() {
	// 	this.cons.writeln('Tokenize', Colors.LightCyan)
	// 	this.isEqual("tokenize('This\tis a\ttest!', ' \\t\\n')", tasks.tokenize('This\tis a\ttest!', ' \t\n'), ['This', 'is', 'a', 'test!'])
	// }
	// async testTokenize2() {
	// 	this.isEqual("tokenize('This is a test!', '\\t\\n')", tasks.tokenize('This is a test!', '\t\n'), ['This is a test!'])
	// }
	// async testTokenize3() {
	// 	this.isEqual("tokenize('This\tis a\ttest!', '')", tasks.tokenize('This\tis a\ttest!', ''), ['This\tis a\ttest!'])
	// }
	// async testTokenize4() {
	// 	this.isEqual("tokenize('This\tis a\ttest!', null)", tasks.tokenize('This\tis a\ttest!', null), ['This\tis a\ttest!'])
	// }
	// async testTokenize5() {
	// 	this.isEqual("tokenize(null, null)", tasks.tokenize(null, null), [])
	// }
	// //#endregion

	//#region replaceFirstWord
	async testReplaceFirstWord1() {
		this.cons.writeln('ReplaceFirstWord', Colors.LightCyan)
		this.isEqual("replaceFirstWord('This\tis a\ttest!', 'That')", tasks.replaceFirstWord('This\tis a\ttest!', 'That'), 'That\tis a\ttest!')
	}
	async testReplaceFirstWord2() {
		this.cons.writeln('ReplaceFirstWord', Colors.LightCyan)
		this.isEqual("replaceFirstWord('This\tis a\ttest!', '')", tasks.replaceFirstWord('This\tis a\ttest!', ''), '\tis a\ttest!')
	}
	async testReplaceFirstWord3() {
		this.cons.writeln('ReplaceFirstWord', Colors.LightCyan)
		this.isEqual("replaceFirstWord('This\tis a\ttest!', null)", tasks.replaceFirstWord('This\tis a\ttest!', null), '\tis a\ttest!')
	}
	async testReplaceFirstWord4() {
		this.cons.writeln('ReplaceFirstWord', Colors.LightCyan)
		this.isEqual("replaceFirstWord('', 'That')", tasks.replaceFirstWord('', 'That'), '')
	}
	async testReplaceFirstWord5() {
		this.cons.writeln('ReplaceFirstWord', Colors.LightCyan)
		this.isEqual("replaceFirstWord(null, 'That')", tasks.replaceFirstWord(null, 'That'), null)
	}
	//#endregion
}

async function main() {
	_console = await getConsole()
	_console.setConsoleTop(0.3 * document.body.clientHeight)

	new StringTests().runAll()	
}

main();
