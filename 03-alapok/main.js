import { createConsole, writeConsole, getConsole } from "../01-konzol/console.js";

var _console = null;

window.addEventListener('load', () => {
    _console = createConsole();
    document.body.appendChild(_console);
    writeConsole("MMA harcosok");

    task1();
    task2();
    task3();
});

function task1() {
    writeConsole('\n1. feladat');
    writeConsole('Primitívek');


    writeConsole('\nÖsszetett típus');


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