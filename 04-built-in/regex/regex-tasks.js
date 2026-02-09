export default class RegexTasks {

    //#region Test
    // Leírás: megvizsgálja, hogy az átadott szöveg decimális valós számot tartalmaz-e
    // Bemenet: string | null
    // Kimenet: bool
    isNumber(text) {
        // 10 - kvantorok: ? +, osztályok: \d, egyéb: ^ $
        const re1 = /^-?\d+$/
        // 10. - . escape segítségével \.
        const re2 = /^-?\d+\.$/
        // .10
        const re3 = /^-?\.\d+$/
        // 10.10
        const re4 = /^-?\d+\.\d+$/
        // 1.01e+2 - felsorolás [-+]
        const re5 = /^-?\d\.\d+e[-+]\d+$/
        return re1.test(text) || re2.test(text) || re3.test(text) || re4.test(text) || re5.test(text)
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
    findTests(text) {
        const re = /(test_\w+)\s*\((\w+,)*\w*\)/g
        let results = []
        let match
        while ((match = re.exec(text)) !== null) {
            results.push(match[1])
        }
        return results
    }
    //#endregion

    //#region string.match

    //#endregion

    //#region string.replace

    //#endregion
}