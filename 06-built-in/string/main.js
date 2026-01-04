import StringTests from './string-tests.js'

async function main() {
	// _console = await getConsole()
	// _console.setConsoleTop(0.3 * document.body.clientHeight)

	new StringTests().runAll()
}

main();
