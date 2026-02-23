class ArrayTasks {
    // 1. doublePositiveNumbers
    // Leírás: A pozitív számokat megduplázza, a többieket eldobja.
    // Bemenet: number[] | null
    // Kimenet: number[]
    doublePositiveNumbers(arr) {
        if (!arr) return []
        return arr.filter(n => n > 0).map(n => 2*n)
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
                if (!uniques.includes(item)) {
                    uniques.push(item)
                }
                return uniques
            }, []).sort(/* (a,b) => a - b*/)

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
            row => row
            .filter(n => typeof n === 'number')
            .reduce((szumma, item) => szumma + item, 0)
        )
    }



    // 1. allNumbersPositive
    // Leírás: Ellenőrzi, hogy minden szám pozitív-e.
    // Bemenet: number[] | null
    // Kimenet: boolean
    allNumbersPositive(arr) {
        
    }

    // 2. removeFirstAndLast
    // Leírás: Eltávolítja az első és utolsó elemet.
    // Bemenet: any[] | null
    // Kimenet: any[]
    removeFirstAndLast(arr) {
        
    }

    // 3. addHeaderAndFooter
    // Leírás: Beszúr egy elemet az elejére és a végére.
    // Bemenet: string[] | null, string, string
    // Kimenet: string[]
    addHeaderAndFooter(arr) {
        
    }

    // 4. getLongestWords
    // Leírás: Két dimenziós string tömbből egy dimenziós tömböt készít úgy,
    // hogy a két dimenziós tömb minden sorából a leghosszabb szót teszi az új tömbe.
    // Bemenet: string[][] | null
    // Kimenet: string[] | null
    getAllLongWords(arr) {
        
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
    replaceAtIndex(arr) {
        
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


    // 1. containsAndSort
    // Leírás: Ellenőrzi egy elem meglétét, majd rendez.
    // Bemenet: string[] | null, string
    // Kimenet: string[]
    containsAndSort(arr) {
        
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

const tasks = new ArrayTasks()

class ArrayTests extends Test {

    test_doublePositiveNumbers1() {
        this.isEqual('doublePositiveNumbers(null)', tasks.doublePositiveNumbers(null), null)
    }

    test_doublePositiveNumbers2() {
        const arr = [1, -2, 3, -5, 0, 7]
        this.isEqual(`doublePositiveNumbers(${JSON.stringify(arr)})`, tasks.doublePositiveNumbers(arr), [2, 6, 14])
    }

    test_doublePositiveNumbers3() {
        const arr = [1, -2, 'A', 3, -5, 0, NaN, 7]
        this.isEqual(`doublePositiveNumbers(${JSON.stringify(arr)})`, tasks.doublePositiveNumbers(arr), [2, 6, 14])
    }



    test_getSortedUniqueValues1() {
        this.isEqual('getSortedUniqueValues(null)', tasks.getSortedUniqueValues(null), null)
    }

    test_getSortedUniqueValues2() {
        const arr = [4, 8, 12, 6, 8, 12]
        this.isEqual(`getSortedUniqueValues(${JSON.stringify(arr)})`, tasks.getSortedUniqueValues(arr), [4, 6, 8, 12])
    }

    test_getSortedUniqueValues3() {
        const arr = [4, 'A', 8, 12, 6, true, 8, 12, NaN]
        this.isEqual(`getSortedUniqueValues(${JSON.stringify(arr)})`, tasks.getSortedUniqueValues(arr), [4, 6, 8, 12])
    }



    test_hasShortWord1() {
        this.isFalse(`hasShortWord(null)`, tasks.hasShortWord(null))
    }
    
    test_hasShortWord2() {
        const arr = ['white', 'black', 'blue', 'green', 'pink', 'red', 'gray']
        this.isFalse(`hasShortWord(${JSON.stringify(arr)})`, tasks.hasShortWord(arr))
    }

    test_hasShortWord3() {
        const arr = ['white', 'black', 'blue', 'green', 'pink', 'red', 'gray']
        this.isTrue(`hasShortWord(${JSON.stringify(arr)}, 5)`, tasks.hasShortWord(arr, 4))    // red, blue, pink, gray
    }

    test_hasShortWord4() {
        const arr = [1, 2, 3, 4]
        this.isFalse(`hasShortWord(${JSON.stringify(arr)})`, tasks.hasShortWord(arr))
    }



    test_sumNumbersInMatrix1() {
        this.isEqual('sumNumbersInMatrix(null)', tasks.sumNumbersInMatrix(null), null)
    }

    test_sumNumbersInMatrix2() {
        const mat = [[1,2,3],null,[7,8]]
        this.isEqual(`sumNumbersInMatrix(${JSON.stringify(mat)})`, tasks.sumNumbersInMatrix(mat), [6, NaN, 15])
    }

    test_sumNumbersInMatrix3() {
        const mat = [[1,2,3],[4,'A',6],[7,8]]
        this.isEqual(`sumNumbersInMatrix(${JSON.stringify(mat)})`, tasks.sumNumbersInMatrix(mat), [6, NaN, 15])
    }

    test_sumNumbersInMatrix4() {
        const mat = [[1,2,3],[4,5,6],[7,8]]
        this.isEqual(`sumNumbersInMatrix(${JSON.stringify(mat)})`, tasks.sumNumbersInMatrix(mat), [6, 15, 15])
    }



    test_allNumbersPositive1() {
        this.isFalse('allNumbersPositive(null)', tasks.allNumbersPositive(null))
    }

    test_allNumbersPositive2() {
        const arr = [-1, 0, 2, 3]
        this.isFalse(`allNumbersPositive(${JSON.stringify(arr)})`, tasks.allNumbersPositive(arr))
    }

    test_allNumbersPositive3() {
        const arr = [1, 2, 3]
        this.isTrue(`allNumbersPositive(${JSON.stringify(arr)})`, tasks.allNumbersPositive(arr))
    }



    test_removeFirstAndLast1() {
        this.isEqual('removeFirstAndLast(null)', tasks.removeFirstAndLast(null), null)
    }

    test_removeFirstAndLast2() {
        const arr = ['white', 1]
        this.isEqual(`removeFirstAndLast(${JSON.stringify(arr)})`, tasks.removeFirstAndLast(arr), [])
    }

    test_removeFirstAndLast3() {
        const arr = ['white', 1, true, 'red', NaN, {}]
        this.isEqual(`removeFirstAndLast(${JSON.stringify(arr)})`, tasks.removeFirstAndLast(arr), [1, true, 'red', NaN])
    }


    test_addHeaderAndFooter1() {
        this.isEqual('addHeaderAndFooter(null)', tasks.addHeaderAndFooter(null), null)
    }

    test_addHeaderAndFooter2() {
        this.isEqual('addHeaderAndFooter([])', tasks.addHeaderAndFooter([]), [])
    }

    test_addHeaderAndFooter3() {
        this.isEqual('addHeaderAndFooter([], \'head\', \'foot\')', tasks.addHeaderAndFooter([], 'head', 'foot'), ['head', 'foot'])
    }

    test_addHeaderAndFooter4() {
        const arr = ['1st', '2nd']
        this.isEqual(
            `addHeaderAndFooter(${JSON.stringify(arr)}, \'head\', \'foot\')`,
            tasks.addHeaderAndFooter(arr, 'head', 'foot'),
            ['head', '1st', '2nd', 'foot'])
    }


    test_getAllLongWords1() {
        this.isEqual('getAllLongWords(null)', tasks.getAllLongWords(null), null)
    }

    test_getAllLongWords2() {
        const arr = [['white', 'magenta'], ['blue', 'pink'], ['green', 'red', 'yellow']]
        this.isEqual(`getAllLongWords(${JSON.stringify(arr)})`, tasks.getAllLongWords(arr), ['magenta', 'blue', 'yellow'])
    }

    test_getAllLongWords3() {
        const arr = [['white', 'magenta'], null, ['green', 'red', 'yellow']]
        this.isEqual(`getAllLongWords(${JSON.stringify(arr)})`, tasks.getAllLongWords(arr), ['magenta', null, 'yellow'])
    }

    test_getAllLongWords4() {
        const arr = [['white', 'magenta'], ['blue', 'pink'], ['green', 'red', 'yellow']]
        this.isEqual(`getAllLongWords(${JSON.stringify(arr)})`, tasks.getAllLongWords(arr), ['magenta', 'blue', 'yellow'])
    }
}

new ArrayTests().runAll()