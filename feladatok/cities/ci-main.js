import { getConsole, Colors, readFromCsv } from './lib.js'
import City from './city.js'

let cities = null
let cons = await getConsole()
//cons.setConsoleTop(300)
cities = await readFromCsv('./cities.csv', City)


// Top3 népesség
cons.writeln('\n1. Határozd meg és írd ki az 3 legnépesebb város nevét és népességét!', Colors.LightGreen)
cities
    .sort((a,b) => b.nepesseg - a.nepesseg)
    .slice(0, 3)
    .forEach(c => cons.writeln(`${c.nev}: ${c.nepesseg}`))

// Eurózóna nyelvei
cons.writeln('\n2. Gyűjtsd ki és írd ki, hogy milyen nyelveken beszélnek az Eurót használó országokban!', Colors.LightGreen)
cons.writeln('   Ügyelj arra, hogy ne legyenek ismétlődések!', Colors.LightGreen)
cities
    .filter(c => c.penznem == 'euró')
    .reduce((lang, c) => {
        if (!lang.includes(c.nyelv))
            lang.push(c.nyelv)
        return lang
    }, [])
    .forEach(l => cons.writeln(l + ' euró'))

// Erős, de "lassú"
cons.writeln('\n3. Keresd meg és írd ki a lengyel nyelvű város nevezetességét!', Colors.LightGreen)
cons.writeln(cities.find(c => c.nyelv == 'lengyel').nevezetesseg)

// Teljesítmény-sebesség arány
cons.writeln('\n4. Készíts egy új listát a cities listából, melynek elemei az ország és a város nevéből álló szöveg !', Colors.LightGreen)
cons.writeln('   Írd ki az új lista elemeit ábécé sorrendben!', Colors.LightGreen)
cities
    .map(c => `${c.orszag}, ${c.nev}`)
    .sort()
    .forEach(str => cons.writeln(str))

// 1 millió lakos
cons.writeln('\n5. Vizsgáld meg és írd ki, hogy mindegyik város népessége nagyobb-e mint 1 millió!', Colors.LightGreen)
let b = cities.every(c => c.nepessege > 1000000)
cons.writeln(`Minden város népessége${b ? '' : ' nem'} több mint 1 millió`)
cons.writeln(`Minden város népessége${cities.filter(c => c.nepessege > 1000000).length == cities.length ? '' : ' nem'} több mint 1 millió`)
cons.writeln(`Minden város népessége${cities.filter(c => c.nepessege <= 1000000).length > 0 ? '' : ' nem'} több mint 1 millió`)
cons.writeln(`Minden város népessége${cities.some(c => c.nepessege <= 1000000) ? ' nem' : ''} több mint 1 millió`)

// Elvárt kimenet
// 1. Határozd meg és írd ki az 3 legnépesebb város nevét és népességét!
// Berlin: 3769000
// Madrid: 3223000
// Róma: 2873000

// 2. Gyűjtsd ki és írd ki, hogy milyen nyelveken beszélnek az Eurót használó országokban!
//    Ügyelj arra, hogy ne legyenek ismétlődések!
// német euró
// spanyol euró
// olasz euró
// francia euró
// portugál euró

// 3. Keresd meg és írd ki a lengyel nyelvű város nevezetességét!
// Királyi vár

// 4. Készíts egy új listát a cities listából, melynek elemei az ország és a város nevéből álló szöveg !
//    Írd ki az új lista elemeit ábécé sorrendben!
// Ausztria, Bécs
// Csehország, Prága
// Franciaország, Párizs
// Lengyelország, Varsó
// Magyarország, Budapest
// Németország, Berlin
// Olaszország, Róma
// Portugália, Lisszabon
// Spanyolország, Madrid
// Svédország, Stockholm

// 5. Vizsgáld meg és írd ki, hogy mindegyik város népessége nagyobb-e mint 1 millió!
// Minden város népessége nem több mint 1 millió