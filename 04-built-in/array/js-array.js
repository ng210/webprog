export default class ArrayTasks {
    // 1. doublePositiveNumbers
    // Leírás: A pozitív számokat megduplázza, a többieket eldobja.
    // Bemenet: number[] | null
    // Kimenet: number[]
    doublePositiveNumbers(arr) {
        if (!arr) return []
        return arr
                .filter(n => n > 0)
                .map(n => 2*n)
    }

    // 2. getSortedUniqueValues
    // Leírás: Eltávolítja a duplikátumokat és növekvő sorrendbe rendezi az elemeket.
    // Bemenet: number[] | null
    // Kimenet: number[]
    getSortedUniqueValues(arr) {
        if (!arr) return []
        // let uniques = []
        // for (let item of arr) {
        //     if (!uniques.includes(item)) {
        //         uniques.push(item)
        //     }
        // }
        // return uniques

        return arr.reduce(
            (uniques, item) => {
                if (!uniques.includes(item) && typeof(item) === 'number' && !isNaN(item)) {
                    uniques.push(item)
                }
                return uniques
            }, []).sort((a,b) => a - b)

        // sum függvény a reduce segítségével
        // arr.reduce(
        //     (szumma, item) => {
        //         return szumma + item
        //     }, 0)
    }

    // 3. hasShortWord
    // Leírás: Eldönti, van-e a tömbben adott hosszúságnál rövidebb szó.
    // Bemenet: string[] | null, number | null
    // Kimenet: boolean
    hasShortWord(arr, length = 3) {
        if (!arr || !length) return false
        return arr.some(
            item => item?.length < length
        )
    }

    // 4. sumNumbersInMatrix
    // Leírás: Egy mátrixot (két dimenziós tömbböt) egy dimenzióssá alakít úgy,
    // hogy a mátrix minden sorában összegzi a számokat, a nem számokat ignorálja.
    // Bemenet: number[][] | null
    // Kimenet: number[]
    sumNumbersInMatrix(arr) {
        if (!arr) return []
        return arr.map(
            row => row ? row
            .reduce((szumma, item) => !isNaN(item) ? szumma + item : NaN, 0)
            : NaN
        )
    }



    // 1. allNumbersPositive
    // Leírás: Ellenőrzi, hogy minden szám pozitív-e.
    // Bemenet: number[] | null
    // Kimenet: boolean
    fn = function(n) {
        return n > 0
    } 
    allNumbersPositive(arr) {
        if (!arr) return false
        return arr.every(n => n > 0)
    }

    // 2. removeFirstAndLast
    // Leírás: Eltávolítja az első és utolsó elemet.
    // Bemenet: any[] | null
    // Kimenet: any[]
    removeFirstAndLast(arr) {
        if (!arr) return null
        return arr.slice(1, -1)
    }

    // 3. addHeaderAndFooter
    // Leírás: Beszúr egy elemet az elejére és a végére.
    // Bemenet: string[] | null, string, string
    // Kimenet: string[]
    addHeaderAndFooter(arr, header, footer) {
        if (!arr) return null
        if (header != null)
            arr.unshift(header)
        if (footer != null)
            arr.push(footer)
        return arr
        //return [header, ...arr, footer]
    }

    // 4. getLongestWords
    // Leírás: Két dimenziós string tömbből egy dimenziós tömböt készít úgy,
    // hogy a két dimenziós tömb minden sorából a leghosszabb szót teszi az új tömbe.
    // Bemenet: string[][] | null
    // Kimenet: string[] | null
    getAllLongWords(arr) {
        if (!arr) return null
        return arr.map(
            row => row != null ?
                    row.reduce(
                        (leghosszabb, item) => item.length > leghosszabb.length ? item : leghosszabb,
                        '')
                    : null
        )
    }



    // 1. getMiddleElements
    // Leírás: Visszaadja a tömb középső elemeit.
    // Bemenet: any[] | null
    // Kimenet: any[]
    getMiddleElements(arr) {
        
    }

    // 2. replaceAtIndex
    // Leírás: Egy adott indexen lecserél egy elemet.
    // Bemenet: any[] | null, any, any
    // Kimenet: any[]
    replaceAtIndex(arr, index, newValue) {
        
    }

    // 3. sumEvenNumbers
    // Leírás: Páros számok összegét számolja ki.
    // Bemenet: number[] | null
    // Kimenet: number
    sumEvenNumbers(arr) {
        
    }

    // 4. hasNegativeInAnyRow
    // Leírás: Ellenőrzi, hogy bármelyik belső tömb tartalmaz-e negatív számot.
    // Bemenet: number[][] | null
    // Kimenet: boolean
    hasNegativeInAnyRow(arr) {
        
    }


    // 1. removeAndSort
    // Leírás: Töröl egy elemet, majd rendez.
    // Bemenet: string[] | null, string
    // Kimenet: string[]
    removeAndSort(arr, element) {
        
    }

    // 2. removeDuplicates
    // Leírás: Duplikátumok eltávolítása az első előfordulás megtartásával.
    // Bemenet: any[] | null
    // Kimenet: any[]
    removeDuplicates(arr) {
        
    }

    // 3. sortAndTakeFirstThree
    // Leírás: Növekvő sorrendbe rendez és az első három elemet adja vissza.
    // Bemenet: number[] | null
    // Kimenet: number[]
    sortAndTakeFirstThree(arr) {
        
    }

    // 4. sortRowsBySum
    // Leírás: A belső tömböket az elemeik összege alapján rendezi növekvően.
    // Bemenet: number[][] | null
    // Kimenet: number[][]
    sortRowsBySum(arr) {
        
    }
}