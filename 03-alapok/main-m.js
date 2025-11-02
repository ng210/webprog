import { createConsole, writeConsole, getConsole } from "../01-konzol/console.js";

const fighters = [
  {"id":"cameron-olson","name":"Cameron Olson","nickname":"Cap'n Crunch","gender":"male","age":33,"wins":8,"losses":3,"draws":0},
  {"id":"nate-diaz","name":"Nate Diaz","nickname":"","gender":"male","age":38,"wins":22,"losses":13,"draws":0},
  {"id":"brodie-farber","name":"Brodie Farber","nickname":"","gender":"male","age":42,"wins":13,"losses":5,"draws":0},
  {"id":"chris-gutierrez","name":"Chris Gutierrez","nickname":"El Guapo","gender":"male","age":33,"wins":21,"losses":5,"draws":2},
  {"id":"curtis-blaydes","name":"Curtis Blaydes","nickname":"Razor","gender":"male","age":34,"wins":18,"losses":5,"draws":0},
  {"id":"masutatsu-yano","name":"Masutatsu Yano","nickname":"","gender":"male","age":47,"wins":0,"losses":0,"draws":0},
  {"id":"ricky-calatayud","name":"Ricky Calatayud","nickname":"","gender":"male","age":40,"wins":0,"losses":0,"draws":0},
  {"id":"volkan-oezdemir","name":"Volkan Oezdemir","nickname":"No Time","gender":"male","age":35,"wins":20,"losses":8,"draws":0},
  {"id":"alan-omer","name":"Alan Omer","nickname":"","gender":"male","age":34,"wins":18,"losses":5,"draws":0},
  {"id":"jake-hadley","name":"Jake Hadley","nickname":"White Kong","gender":"male","age":28,"wins":11,"losses":4,"draws":0},
  {"id":"mark-khominik-2","name":"Moti Horenstein","nickname":"","gender":"male","age":60,"wins":0,"losses":0,"draws":0},
  {"id":"dave-strasser","name":"Dave Strasser","nickname":"","gender":"male","age":53,"wins":22,"losses":4,"draws":4},
  {"id":"justin-tafa","name":"Justin Tafa","nickname":"Bad Man","gender":"male","age":31,"wins":7,"losses":5,"draws":0},
  {"id":"hyunsung-park","name":"HyunSung Park","nickname":"Peace of Mind","gender":"male","age":29,"wins":9,"losses":0,"draws":0},
  {"id":"chase-gibson","name":"Chase Gibson","nickname":"","gender":"male","age":33,"wins":0,"losses":1,"draws":0},
  {"id":"rodrigo-damm","name":"Rodrigo Damm","nickname":"","gender":"male","age":43,"wins":12,"losses":9,"draws":0},
  {"id":"rheza-arianto","name":"Rheza Arianto","nickname":"","gender":"male","age":22,"wins":0,"losses":0,"draws":0},
  {"id":"cal-worsham","name":"Cal Worsham","nickname":"","gender":"male","age":17,"wins":0,"losses":0,"draws":0},
  {"id":"sammy-morgan","name":"Sammy Morgan","nickname":"The Squeeze","gender":"male","age":41,"wins":18,"losses":7,"draws":0},
  {"id":"pingyuan-liu","name":"Pingyuan Liu","nickname":"","gender":"male","age":30,"wins":13,"losses":7,"draws":0},
  {"id":"ketlen-vieira","name":"Ketlen Vieira","nickname":"Fenomeno","gender":"female","age":33,"wins":14,"losses":4,"draws":0},
  {"id":"jinh-yu-frey","name":"Jinh Yu Frey","nickname":"","gender":"female","age":38,"wins":11,"losses":10,"draws":0},
  {"id":"lauren-murphy","name":"Lauren Murphy","nickname":"Lucky","gender":"female","age":39,"wins":16,"losses":6,"draws":0},
  {"id":"jodie-esquibel","name":"Jodie Esquibel","nickname":"","gender":"female","age":37,"wins":6,"losses":6,"draws":0},
  {"id":"jamey-lyn-horth","name":"Jamey-Lyn Horth","nickname":"","gender":"female","age":34,"wins":7,"losses":2,"draws":0},
  {"id":"amanda-ribas","name":"Amanda Ribas","nickname":"","gender":"female","age":31,"wins":12,"losses":6,"draws":0},
  {"id":"kelly-faszholz","name":"Kelly Faszholz","nickname":"","gender":"female","age":39,"wins":3,"losses":2,"draws":0},
  {"id":"ji-yeon-kim","name":"Ji Yeon Kim","nickname":"Firefist","gender":"female","age":33,"wins":9,"losses":7,"draws":2},
  {"id":"priscila-cachoeira","name":"Priscila Cachoeira","nickname":"Zombie Girl","gender":"female","age":36,"wins":12,"losses":6,"draws":0},
  {"id":"jasmine-jasudavicius","name":"Jasmine Jasudavicius","nickname":"","gender":"female","age":36,"wins":13,"losses":3,"draws":0},
  {"id":"sheila-gaff","name":"Sheila Gaff","nickname":"The German Tank","gender":"female","age":33,"wins":10,"losses":6,"draws":1},
  {"id":"emily-whitmire","name":"Emily Whitmire","nickname":"Spitfire","gender":"female","age":33,"wins":4,"losses":5,"draws":0},
  {"id":"shayna-baszler","name":"Shayna Baszler","nickname":"The Queen of Spades","gender":"female","age":42,"wins":15,"losses":10,"draws":0},
  {"id":"cheyanne-vlismas","name":"Cheyanne Vlismas","nickname":"The Warrior Princess","gender":"female","age":27,"wins":7,"losses":3,"draws":0},
  {"id":"joanna-jedrzejczyk","name":"Joanna Jędrzejczyk","nickname":"","gender":"female","age":36,"wins":16,"losses":5,"draws":0},
  {"id":"alexis-dufresne","name":"Alexis Dufresne","nickname":"Sneaky Zebra","gender":"female","age":35,"wins":5,"losses":2,"draws":0},
  {"id":"luana-pinheiro","name":"Luana Pinheiro","nickname":"","gender":"female","age":32,"wins":11,"losses":4,"draws":0},
  {"id":"norma-dumont","name":"Norma Dumont","nickname":"The Immortal","gender":"female","age":34,"wins":12,"losses":2,"draws":0},
  {"id":"marion-reneau","name":"Marion Reneau","nickname":"The Belizean Bruiser","gender":"female","age":46,"wins":9,"losses":8,"draws":1},
  {"id":"shauna-bannon","name":"Shauna Bannon","nickname":"Mama B","gender":"female","age":31,"wins":6,"losses":1,"draws":0}
];

var _console = null;

window.addEventListener('load', () => {
    _console = createConsole();
    document.body.appendChild(_console);
    writeConsole("MMA harcosok");

    task1();
    task2();
    task3();
    task4();
    task5();
    task6();
    task7();
    task8();
});

function task1() {
    writeConsole('\n1. feladat');
    writeConsole('Primitívek');
    let name = 'John Doe';
    let age = 33;
    let weigth = 80.5;
    let isActive = true;
    let nickName = null;
    let rank = undefined;

    writeConsole(`name: ${name}, type: ${typeof(name)}`);
    writeConsole(`age: ${age}, type: ${typeof(age)}`);
    writeConsole(`weigth: ${weigth}, type: ${typeof(weigth)}`);
    writeConsole(`isActive: ${isActive}, type: ${typeof(isActive)}`);
    writeConsole(`nickName: ${nickName} type: ${typeof(nickName)}`);
    writeConsole(`rank: ${rank} type: ${typeof(rank)}`);

    writeConsole('\nÖsszetett típus');
    window.fighter = {
        id: 'cameron-olson',
        name: 'Cameron Olson',
        nickname: 'Cap\'n Crunch',
        gender: 'male',
        age: 33,
        wins: 8,
        losses: 3,
        draws: 0,

        toString() {
            return `${this.name} (${this.nickname})\n${this.age} years old ${this.gender}, record: ${this.wins}-${this.losses}-${this.draws}`;
        }
    };
    writeConsole(fighter);

    writeConsole('\nObjektumok tömbje');
    window.Match = function Match(date, result) {
        this.date = date;
        this.result = result;
        this.toString = function() {
            return `${this.date.toLocaleDateString()}: ${this.result}`;
        }
    }

    fighter.matches = [
        new Match(new Date(2022, 5, 12), 'win'),
        new Match(new Date(2021, 11, 5), 'loss'),
        new Match(new Date(2021, 6, 20), 'win')
    ];

    fighter.toString = function toString() {
        return `${this.name} (${this.nickname})\n${this.age} years old ${this.gender}, record: ${this.wins}-${this.losses}-${this.draws}` +
            `\nmatches\n${this.matches.join('\n')}`;
    };

    writeConsole(fighter)
}

function task2() {
    writeConsole('\n4. feladat: Értékek, kifejezések');
    writeConsole('Változók, konstansok');
    try {
        writeConsole(`v: ${v}`);
        writeConsole(`pi: ${pi}`);
        writeConsole(`l: ${l}`);
    } catch (e) {
        writeConsole(`Error: ${e.message}`);
    }
    var v = 'hello';
    let l = 10;
    const pi = 3.14159;

    writeConsole(`v: ${v}`);
    writeConsole(`l: ${l}`);
    writeConsole(`pi: ${pi}`);

    try {
        v = 'hello';
        l = 10;
        pi = 3.14159;
    } catch (e) {
        writeConsole(`Error: ${e.message}`);
    }

    writeConsole('\nÖsszehasonlítás');
    writeConsole(`==: ${fighter.age == '33'}`);
    writeConsole(`===: ${fighter.age === '33'}`);

    writeConsole('\nKulcsszavak');
    // let class = 'A';
}

function task3() {
    writeConsole('\n3. feladat: Konverzió');
    writeConsole('\nImplicit konverzió');

    let r1 = 10 + '5';
    let r2 = 10 - '5';
    let r3 = 10 * true;
    let r4 = !!0;

    writeConsole(`${r1}, type: ${typeof(r1)}`);
    writeConsole(`${r2}, type: ${typeof(r2)}`);
    writeConsole(`${r3}, type: ${typeof(r3)}`);
    writeConsole(`${r4}, type: ${typeof(r4)}`);

    writeConsole('\nExplicit konverzió');
    let age = String(fighter.age);
    writeConsole(`${age}, type: ${typeof(age)}`);
    let n1 = Number('200');
    writeConsole(`${n1}, type: ${typeof(n1)}`);
    let n2 = parseInt('200');
    writeConsole(`${n2}, type: ${typeof(n2)}`);

    writeConsole('\nTípusellenőrzés');
    writeConsole('fighter.matches egy tömb:' + Array.isArray(fighter.matches));
    writeConsole('fighter egy objektum:' + (typeof(fighter) === 'object'));
    writeConsole('fighter egy objektum:' + (fighter instanceof Object));
    writeConsole('fighter egy objektum:' + (fighter.constructor === Object));

    let m = fighter.matches[0];
    writeConsole('fighter egy objektum:' + (typeof(m) === 'object'));
    writeConsole('fighter egy objektum:' + (m instanceof Object));
    writeConsole('match egy objektum:' + (m.constructor === Object));
    writeConsole('match egy objektum:' + (m.constructor === Match));
}

function task4() {
    writeConsole('\n4. feladat: Operátorok');
    writeConsole('\nAritmetikai és értékadás');
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < fighter.matches.length; i++) {
        if (fighter.matches[i].result === 'win') {
            wins++;
        }
        else if (fighter.matches[i].result === 'loss') {
            losses++;
        }
    }
    writeConsole(`több győzelem: ${wins > losses}`);
    
    writeConsole('\nLogikai és összehasonlító');
    let isGoodFighter = wins > losses;
    writeConsole(`isGoodFighter: ${isGoodFighter}`);

    writeConsole('\nTernary (?)');
    for (let i = 0; i < 10; i++) {
        fighter.matches.push(
            new Match(
                new Date(2025, 8, Math.ceil(Math.random()*30)),
                (['loss', 'draw', 'win'][Math.floor(Math.random()*3)])));
    }
    writeConsole(fighter);

    wins = 0;
    for (let i = 0; i < fighter.matches.length; i++) {
        if (fighter.matches[i].result === 'win') {
            wins++;
        }
    }
    writeConsole(`wins: ${wins}`);
    writeConsole(wins > 10 ? 'Bajnok esélyes' : wins >= 5 ? 'Erős harcos' : 'Edzeni kell még');
}

function task5() {
    writeConsole('\n5. feladat: Vezérlési szerkezetek');
    writeConsole('\nif...else');
    let ageGroup = '';
    if (fighter.age < 20) { ageGroup = 'junior'; }
    else if (fighter.age < 30) { ageGroup = 'prime'; }
    else { ageGroup = 'veteran'; }
    writeConsole(`ageGroup: ${ageGroup}`);

    writeConsole('\nswitch');
    let ag = Math.floor(fighter.age/10);
    switch (ag) {
        case 0:
            writeConsole('junior');
            break;
        case 1:
            writeConsole('junior');
            break;
        case 2:
            writeConsole('prime');
            break;
        default:
            writeConsole('veteran');
    }   
}

function task6() {
    writeConsole('\n6. feladat: Ciklusok');
    writeConsole('\nfor/for in/for of');
    for (let i = 0; i < fighter.matches.length; i++) {
        writeConsole(fighter.matches[i]);
    }
    for (let i in fighter.matches) {
        writeConsole(fighter.matches[i]);
    }
    for (let match of fighter.matches) {
        writeConsole(match);
    }
    writeConsole('\nwhile');
    let i = 0;
    while (i < fighter.matches.length) {
        writeConsole(fighter.matches[i]);
        i++;
    }

    writeConsole('\nExtra: Iterátor osztály');
    const iterator = fighter.matches[Symbol.iterator]();
    let result = iterator.next();
    while (!result.done) {
        writeConsole(result.value);
        result = iterator.next();
    }
}

function task7() {
    writeConsole('\n7. feladat: Függvények, metódusok');
    writeConsole('\nParaméter, alapérték');
    window.addMatch = function addMatch(fighter, date, result = 'win') {
        fighter.matches.push(new Match(date, result));
    };

    addMatch(fighter, new Date(2025, 10, 6), 'loss');
    addMatch(fighter, new Date(2025, 10, 6), 'draw');
    writeConsole(fighter);

    writeConsole('\nNévtelen és nyílfüggvény');

    const countWins = function(matches) {
        let wins = 0;
        for (let match of matches) {
            if (match.result === 'win') {
                wins++;
            }
        }
        return wins;
    };
    writeConsole(`Győzelmek száma (countWins): ${countWins(fighter.matches)}`);

    writeConsole(`Győzelmek száma (countWins):${(function(matches) {
        let wins = 0;
        for (let match of matches) {
            if (match.result === 'win') {
                wins++;
            }
        }
        return wins;
    })(fighter.matches)}`);

    const countWins2 = (matches) => {
        let wins = 0;
        for (let match of matches) {
            if (match.result === 'win') {
                wins++;
            }
        }
        return wins;
    };

    writeConsole(`Győzelmek száma (countWins2):${countWins2(fighter.matches)}`);
    writeConsole(`Győzelmek száma (Array.reduce):${fighter.matches.reduce((acc, match) => acc + (match.result === 'win' ? 1 : 0), 0)}`);
    writeConsole(fighter.matches);
    writeConsole(`Győzelmek számként (Array.map):${fighter.matches.map(match => match.result === 'win' ? 2 : match.result === 'loss' ? 0 : 1)}`);
}

function task8() {
    writeConsole('\n8. extra feladat: Összetett feladat');
    function firstByName(name) {
        for (let f of fighters) {
            if (f.name === name) {
                return f;
            }
        }
        return null;
    }

    function firstByAgeGroup(ageGroup) {
        for (let f of fighters) {
            let ag = f.age < 20 ? 'junior' : f.age < 30 ? 'prime' : 'veteran';
            if (ag === ageGroup) {
                return f;
            }
        }
        return null;
    }

    function getAgeGroups() {
        const groups = {};
        for (let f of fighters) {
            let ag = f.age < 20 ? 'junior' : f.age < 30 ? 'prime' : 'veteran';
            if (!groups[ag]) {
                groups[ag] = [];
            }
            groups[ag].push(f);
        }
        return groups;
    }

    let f1 = firstByName('Nate Diaz');
    writeConsole(f1 ? f1.name : 'Nincs ilyen nevű harcos');
    let f2 = firstByAgeGroup('prime');
    writeConsole(f2 ? f2.name : 'Nincs ilyen korú harcos');
    let ageGroups = getAgeGroups();
    for (let ag in ageGroups) {
        writeConsole(`ageGroup: ${ag}`);
        for (let f of ageGroups[ag]) {
            writeConsole(` - ${f.name} (${f.age} év)`);
        }
    }

    function first(list, predicate) {
        for (let item of list) {
            if (predicate(item)) {
                return item;
            }
        }
        return null;
    }

    f1 = first(fighters, f => f.name === 'Nate Diaz');
    writeConsole(f1 ? f1.name : 'Nincs ilyen nevű harcos');
}