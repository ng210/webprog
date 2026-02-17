export default class RegexTasks {

    //#region Test
    // Leírás: megvizsgálja, hogy az átadott szöveg decimális egész számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isInt(text) {
        const re = /^[+-]?\d+$/
        return re.test(text)
    }

    // Leírás: megvizsgálja, hogy az átadott szöveg decimális valós számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isFloat(text) {
        // 10.
        const re1 = /^[+-]?\d+\.$/
        // .10
        const re2 = /^[+-]?\.\d+$/
        // 10.10
        const re3 = /^[+-]?\d+\.\d+$/
        const re = new RegExp(`${re1.source}|${re2.source}|${re3.source}`)
        return re.test(text)
    }
    
    // Leírás: megvizsgálja, hogy az átadott szöveg tudományos formátumú számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    // 1.001e+5
    isScientific(text) {
        const re = /^[+-]?\d\.\d+e[+-]\d+$/
        return re.test(text)
    }

    // Leírás: megvizsgálja, hogy az átadott szöveg fix formátumú dátumot tartalmaz-e
    // Formátum: éééé-hh-nn
    // Bemenet: string | null
    // Kimenet: bool
    isDate(text) {
        //const re = /\d\d\d\d\-\d\d\-\d\d/
        const re = /^\d{4}\-\d{2}\-\d\d$/
        return re.test(text)
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
        if (text == null) return null
        //const re = new RegExp('test_\\w+\\(', 'i')
        const re = /test_\w+\(/ig
        let results = []
        let arr
        while ((arr = re.exec(text)) != null) {
            results.push(arr[0].slice(0, -1))
        }
        return results
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
        if (text == null) return null
        const re = /test_\w+\(/ig
        let m = text.match(re)
        return m?.map(m => m.slice(0, -1))
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