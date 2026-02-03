import { getConsole } from '../../lib/console/console.js'

let _console = await getConsole()
_console.clear()
_console.writeln('Vegyes feladatok')

// oszthatóság
// 1. Kérj be egy számot és írd ki, hogy prímszám-e!")
let a1 = await _console.prompt('Kérek egy számot')
let isPrime = true
for (let i=2; i<=Math.sqrt(a1); i++) {
    if (a1 % i == 0) {
        isPrime = false
        break
    }
}
_console.writeln()
if (isPrime) _console.writeln(`${a1} prímszám`)

// 2. Kérj be két számot és írd ki, hogy relatív prímek-e (van-e közös valódi osztójuk)!")
let b1 = await _console.prompt('Kérek egy számot')
_console.writeln()
let b2 = await _console.prompt('Kérek egy másik számot')
let areRelative = true
for (let i=2; i<=Math.min(b1, b2); i++) {
    if (b1 % i == 0 && b2 % i == 0) {
        areRelative = false
        break
    }
}
_console.writeln()
if (areRelative) _console.writeln(`${b1} és ${b2} relative prímek`)

// számsorozat generálása
// 3. Írd ki a sorozatot a 3.-tól a 13. eleméig! S(0) = 128, S(1) = 64 és S(i) = (S(i-2) + S(i-1))/2")
let s0 = 128, s1 = 64
for (let i=0; i<9; i++) {
    let s2 = (s0 + s1) / 2
    s0 = s1
    s1 = s2
    _console.writeln(s2)
}
_console.writeln()

// min/max/sum/avg
// 4. Készíts egy listát 20 darab 50-nél kisebb, véletlen, egész számból!")
// 4.a Írd ki a lista összegét!")
// 4.b Írd ki, hogy hány elem kisebb mint a maximum 20%-a!")
// 4.c Számítsd ki a lista átlagát! \
//     Írd ki minden elem szórását, azaz az átlagtól való eltérésének a négyzetét!\
//     Példa: átlag=23.567, ekkor a 17 szórása (17 - 23.567)^2 = 43,125489")
const list = []
let sum = 0
for (let i=0; i<20; i++) {
    let n = Math.trunc(50*Math.random())
    list.push(n)
    sum += n
}
_console.writeln(`Összeg: ${list.reduce((acc, n) => acc+n, 0)}`)
_console.writeln(`Összeg: ${sum}`)

let mx = list[0]
for (let n of list) {
    if (n > mx) mx = n
}

let count = 0
for (let n of list) {
    if (n < 0.2 * mx) {
        count++
    }
}
_console.writeln(`${count} szám kisebb`)

let avg = sum / list.length
for (let n of list) {
    _console.writeln(((avg - n)**2).toFixed(2))
}

// szám átváltás
// 5. Kérj be két számot, a második legyen 1-nél nagyobb és 11-nél kisebb! \
//     Írd ki az első számot olyan számrendszerben, aminek az alapja a második szám! \
//     Példa: első szám: 234, második szám: 7, kimenet: a 234 7-es számrendszerben = 453 (4*49 + 5*7 + 3)")
let c1 = Number(await _console.prompt('Kérek egy számot'))
_console.writeln()
let c2 = 1
while (c2 < 2 || c2 > 10) {
    c2 = Number(await _console.prompt('Kérek egy másik számot'))
    _console.writeln()
}
_console.writeln(`\n:${c1.toString(c2)}`)

let result = ''
while (c1 != 0) {
    let d = c1 % c2
    result = d + result
    c1 = Math.trunc(c1 / c2)
}
_console.write(result)
_console.write()