export default class RegexTasks {

    //#region Test
    // Leírás: megvizsgálja, hogy az átadott szöveg decimális egész számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isInt(text) {
    }

    // Leírás: megvizsgálja, hogy az átadott szöveg decimális valós számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isFloat(text) {
    }
    
    // Leírás: megvizsgálja, hogy az átadott szöveg tudományos formátumú számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isScientific(text) {
    }

    // Leírás: megvizsgálja, hogy az átadott szöveg fix formátumú dátumot tartalmaz-e
    // Formátum: éééé-hh-nn
    // Bemenet: string | null
    // Kimenet: bool
    isDate(text) {
    }
    //#endregion

    //#region Exec
    // Leírás: megkeresi az átadott forráskódban a teszt metódusokat.
    // A tesztmetódusok neve
    // - "test_" szöveggel kezdődik,
    // - a név után zárójelben a paraméterlista található
    // Bemenet: string | null
    // Kimenet: string[]
    findTestsExec(text) {
    }
    //#endregion

    //#region string.match
    // Leírás: megkeresi az átadott forráskódban a teszt metódusokat.
    // A tesztmetódusok neve "test_" szöveggel kezdődik és a név után
    // a paraméterek listája áll zárójelben. A megtalált metódusok
    // nevét adja vissza.
    // Bemenet: string | null
    // Kimenet: string[]
    findTestsMatch(text) {

    }

    //#endregion

    //#region string.replace
    // Leírás: a template szövegben a {} jelben írt helyettesítőket
    // lecseréli az obj megfelelő attribútumára.
    // Pl. A {id} helyére beírja az obj.id értékét.
    // Az így kapott szöveget adja vissza.
    // Bemenet: string | null, object | null
    // Kimenet: string
    applyTemplate(template, obj) {

    }

    //#endregion
}