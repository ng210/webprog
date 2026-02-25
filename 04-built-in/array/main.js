import ArrayTests from './array-tests.js'
//import ListTests from './list-tests.js'

async function main() {
	new ArrayTests().runAll()
	//new ListTests().runAll()
}


// map, filter, reduce
const nevek = ['Anna', 0, 'Béla', 'Cecil', 'Dénes']
let result = []
for (let nev of nevek) {
	if (typeof nev === 'string') {
		let value = nev.length
		result.push(value)
	}
}
console.log(result)

result = nevek
		.filter(n => typeof n === 'string')
		.map(nev => nev.length)
console.log(result)

result = nevek.reduce(
	(arr, n) => {
		if (typeof n === 'string') {
			let value = n.length
			arr.push(value)
		}
		return arr
	},
	[])
console.log(result)

main();
