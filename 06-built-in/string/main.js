import { getConsole } from '../../lib/console/console.js'

let _console = null;

// Az alábbi feladatok megoldásához a következő metódusokra lesz szükség:
//   replace, toUpperCase, startsWith, lastIndexOf, substring, matchAll, replaceAll, toLowerCase,
//   split, includes, endsWith, indexOf, localeCompare, slice, trim, trimStart, trimEnd, match, search

function task1(word) {
    // Készíts függvényt, amely eldönti egy szóról, hogy van-e benne kétjegyű betű (cs, dz, ny, ...)!
    return false;
}

function task2(phoneNumber) {
    // Írj függvényt, amely ellenőrzi, hogy egy telefonszám +36-tal kezdődik-e!
    return false;
}

function task3(name) {
    // Írj függvényt, amely ellenőrzi, hogy egy fájlnév kiterjesztése képre utal-e (.jpg, .png, .bmp, .gif).
    return false;
}

function task4(email) {
    // Vizsgáld meg, hogy az e-mail cím érvényes-e, azaz tartalmaz-e @ karaktert!
    return false;
}

function task5(path) {
    // Egy útvonalból (path) add vissza a fájlnevet!
    return '?';
}

function task6(password) {
    // Ellenőrizd, hogy a jelszó megfelelő-e:
    // - van benne kisbetű
    // - van benne nagybetű
    // - van benne számjegy
    return false;
}

function task7(source) {
    // Számold össze, hogy a forrásban mennyi függvény szerepel (function <name>...)!
    return 0;
}

function task8(source) {
    // Gyűjts ki és ábécé szerint rendezd  a forrásban szereplő összes változót (let <name> vagy const <name>)!
    return [];
}

function task9(sentence) {
    // A mondat minden szava kezdődjön nagybetűvel, de minden más betű legyen kicsi!
    return sentence;
}

function task10(sentence) {
    // A mondatban cserélj
    // - minden magánhangzót nagybetűsre,
    // - minden mássalhangzót kisbetűsre,
    // - minden szóközt a _ karakterre!
    return sentence;
}

function task11(settings) {
    // Keresd meg és vágd ki a position attribútum értékét!
}

function task12(date) {
    // Ellenőrizd, hogy a date string helyes formátumú-e?
    // Ha a nem helyes, a függvény adjon vissza null értéket.
    // Ha helyes, akkor adja vissza objektumként { year, month, day }!
}

async function main() {
    _console = await getConsole();
   _console.setConsoleTop(0.3 * document.body.clientHeight);

    let word = await _console.prompt('1. Kérek egy szót: ');
    _console.writeln('A szóban ' + (task1(word) ? 'van' : 'nincsen') + ' kétjegyű betű.');

    let phonNumber = await _console.prompt('2. Kérek egy telefonszámot: ');
    _console.writeln('A telefonszám ' + (task2(phonNumber) ? 'magyar' : 'nem magyar'));

    let fileName = await _console.prompt('3. Kérek egy fájlnevet: ');
    _console.writeln('A fájl ' + (task3(fileName) ? 'egy' : 'nem') + ' kép.');

    let email = await _console.prompt('4. Kérek egy email címet: ');
    _console.writeln('Az email cím ' + (task4(email) ? 'érvényes' : 'érvénytelen'));

    _console.writeln('5. Szkriptek');
    for (let script of document.scripts) {
        if (script.src == '') continue;
        _console.writeln(' - ' + script.src + ' -> ' + task5(script.src));
    }

    let password = await _console.prompt('6. Kérem a jelszót: ');
    _console.writeln('A jelszó ' + (task6(password) ? 'megfelelő' : 'nem felel meg'));

    const currentModule = await fetch(import.meta.url).then(resp => resp.text());
    _console.writeln('7. A szkriptben ' + task7(currentModule) + 'függvény található.');

    _console.writeln('8. A szkriptben a következő változók találhatók:');
    for (let variable of task8(currentModule)) {
        _console.writeln(' - ' + variable);
    }

    let sentence1 = await _console.prompt('9. Kérek egy mondatot: ');
    _console.writeln(task9(sentence1));

    let sentence2 = await _console.prompt('10. Kérek egy mondatot: ');
    _console.writeln(task10(sentence2));

    let css = document.body.computedStyleMap();
    let cssText = [...css]
        .filter(v => v[1][0] instanceof CSSKeywordValue && !(['none', 'auto'].includes(v[1][0].value)))
        .map(v => v[0] + ': ' + v[1][0].value)
        .join('\n');
    _console.writeln(`11. A position attribútum értéke: '${task11(cssText)}'`);

    let date = await _console.prompt('12. Kérek egy dátumot (yyyy-MM-dd): ');
    let dateObj = task12(date);
    if (dateObj == null) {
        _console.writeln('A dátum formátuma nem helyes!');
    } else {
        _console.writeln(`év: ${dateObj.year}, hónap: ${dateObj.month}, nap: ${dateObj.day}`);
    }
    
}

main();
