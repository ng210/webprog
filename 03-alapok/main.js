import { createConsole, writeConsole, getConsole } from "../01-konzol/console.js";

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
    let name = 'Kiss Pista';
    let age = 32;
    let weight = 80.5;
    let isActive = true;
    let nickname = null;
    let rank;
    writeConsole(`${name} ${typeof name}`);
    writeConsole(`${age} ${typeof age}`);
    writeConsole(`${weight} ${typeof weight}`);
    writeConsole(`${isActive} ${typeof isActive}`);
    writeConsole(`${nickname} ${typeof nickname}`);
    writeConsole(`${rank} ${typeof rank}`);

    writeConsole('\nÖsszetett típus');
    let fighter = {
        'id': 'pityu',
        'name': 'Kiss Pista',
        'nick name': 'Pityu',
        'gender': 'male',
        'age': 32,
        'wins': 2,
        'losses': 1,
        'draws': 1,

        toString: function() {
            return `${this.name}(${this.id}) - ${this.wins}/${this.losses}/${this.draws}`;
        }
    };
    writeConsole(fighter);


    writeConsole('\nObjektumok tömbje');
}

function task2() {
    writeConsole('\n4. feladat: Értékek, kifejezések');
    writeConsole('Változók, konstansok');


    writeConsole('\nÖsszehasonlítás');

    
    writeConsole('\nKulcsszavak');
}

function task3() {
    writeConsole('\n3. feladat: Konverzió');
    writeConsole('\nImplicit konverzió');


    writeConsole('\nExplicit konverzió');


    writeConsole('\nTípusellenőrzés');
}

function task4() {
    writeConsole('\n4. feladat: Operátorok');
    writeConsole('\nAritmetikai és értékadás');


    writeConsole('\nLogikai és összehasonlító');


    writeConsole('\nTernary (?)');
}

function task5() {
    writeConsole('\n5. feladat: Vezérlési szerkezetek');
    writeConsole('\nif...else');


    writeConsole('\nswitch');

}

function task6() {
    writeConsole('\n6. feladat: Ciklusok');
    writeConsole('\nfor/for in/for of');


    writeConsole('\nwhile');


    writeConsole('\nExtra: Iterátor osztály');
}

function task7() {
    writeConsole('\n7. feladat: Függvények, metódusok');
    writeConsole('\nParaméter, alapérték');


    writeConsole('\nNévtelen és nyílfüggvény');

}

function task8() {
    writeConsole('\n8. extra feladat: Összetett feladat');
}