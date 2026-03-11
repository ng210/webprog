import { getConsole, Colors, readFromCsv } from './lib.js'
import City from './city.js'

let cities = null
let cons = await getConsole()
cities = await readFromCsv('./cities.csv', City)


// Top3 népesség
cons.writeln('\n1. Határozd meg és írd ki az 3 legnépesebb város nevét és népességét!', Colors.LightGreen)

// Eurózóna nyelvei
cons.writeln('\n2. Gyűjtsd ki és írd ki, hogy milyen nyelveken beszélnek az Eurót használó országokban!', Colors.LightGreen)
cons.writeln('   Ügyelj arra, hogy ne legyenek ismétlődések!', Colors.LightGreen)

// Erős, de "lassú"
cons.writeln('\n3. Keresd meg és írd ki a lengyel nyelvű város nevezetességét!', Colors.LightGreen)

// Teljesítmény-sebesség arány
cons.writeln('\n4. Készíts egy új listát a cities listából, melynek elemei az ország és a város nevéből álló szöveg !', Colors.LightGreen)
cons.writeln('   Írd ki az új lista elemeit ábécé sorrendben!', Colors.LightGreen)

// 1 millió lakos
cons.writeln('\n5. Vizsgáld meg és írd ki, hogy mindegyik város népessége nagyobb-e mint 1 millió!', Colors.LightGreen)

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