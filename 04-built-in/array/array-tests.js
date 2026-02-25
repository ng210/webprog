import Test from '../../lib/test/test.js'
import ArrayTasks from './js-array.js'

const tasks = new ArrayTasks()

export default class ArrayTests extends Test {

    test_doublePositiveNumbers1() {
        this.isEqual('doublePositiveNumbers(null)', tasks.doublePositiveNumbers(null), [])
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
        this.isEqual('getSortedUniqueValues(null)', tasks.getSortedUniqueValues(null), [])
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
        this.isEqual('sumNumbersInMatrix(null)', tasks.sumNumbersInMatrix(null), [])
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


    test_getMiddleElements1() {
        this.isEqual('getMiddleElements(null)', tasks.getMiddleElements(null), null)
    }
    
    test_getMiddleElements2() {
        const arr = [1, 2, 3, 4, 5]
        this.isEqual(`getMiddleElements(${JSON.stringify(arr)})`, tasks.getMiddleElements(arr), [3])
    }

    test_getMiddleElements3() {
        const arr = [1, 2, 3, 4]
        this.isEqual(`getMiddleElements(${JSON.stringify(arr)})`, tasks.getMiddleElements(arr), [2, 3])
    }



    test_replaceAtIndex1() {
        this.isEqual('replaceAtIndex(null)', tasks.replaceAtIndex(null), null)
    }

    test_replaceAtIndex2() {
        const arr = [1, 2, 3]
        this.isEqual(`replaceAtIndex(${JSON.stringify(arr)}, 1, 'A')`, tasks.replaceAtIndex(arr, 1, 'A'), [1, 'A', 3])
    }

    test_replaceAtIndex3() {
        const arr = [1, 2, 3]
        this.isEqual(`replaceAtIndex(${JSON.stringify(arr)}, 0, null)`, tasks.replaceAtIndex(arr, 0, null), [null, 2, 3])
    }


    test_sumEvenNumbers1() {
        this.isEqual('sumEvenNumbers(null)', tasks.sumEvenNumbers(null), 0)
    }

    test_sumEvenNumbers2() {
        const arr = [1, 2, 3, 4, 5, 6]
        this.isEqual(`sumEvenNumbers(${JSON.stringify(arr)})`, tasks.sumEvenNumbers(arr), 12)
    }



    test_hasNegativeInAnyRow1() {
        this.isFalse('hasNegativeInAnyRow(null)', tasks.hasNegativeInAnyRow(null))
    }

    test_hasNegativeInAnyRow2() {
        const arr = [[1, 2, 3], [4, 5, 6]]
        this.isFalse(`hasNegativeInAnyRow(${JSON.stringify(arr)})`, tasks.hasNegativeInAnyRow(arr))
    }

    test_hasNegativeInAnyRow3() {
        const arr = [[1, 2, 3], [4, -5, 6]]
        this.isTrue(`hasNegativeInAnyRow(${JSON.stringify(arr)})`, tasks.hasNegativeInAnyRow(arr))
    }



    test_removeAndSort1() {
        this.isEqual('removeAndSort(null)', tasks.removeAndSort(null), [])
    }

    test_removeAndSort2() {
        const arr = ['banana', 'apple', 'cherry']
        this.isEqual(`removeAndSort(${JSON.stringify(arr)}, 'apple')`, tasks.removeAndSort(arr, 'apple'), ['banana', 'cherry'])
    }

    test_removeAndSort3() {
        const arr = ['banana', 'apple', 'cherry']
        this.isEqual(`removeAndSort(${JSON.stringify(arr)}, 'grape')`, tasks.removeAndSort(arr, 'grape'), ['apple', 'banana', 'cherry'])
    }

    test_removeAndSort4() {
        const arr = []
        this.isEqual(`removeAndSort(${JSON.stringify(arr)}, 'banana')`, tasks.removeAndSort(arr, 'banana'), [])
    }

    test_removeAndSort5() {
        const arr = ['banana', 'apple', 'cherry']
        this.isEqual(`removeAndSort(${JSON.stringify(arr)}, '')`, tasks.removeAndSort(arr, ''), ['apple', 'banana', 'cherry'])
    }



    test_removeDuplicates1() {
        this.isEqual('removeDuplicates(null)', tasks.removeDuplicates(null), [])
    }

    test_removeDuplicates2() {
        const arr = ['apple', 'banana', 'apple', 'cherry', 'banana']
        this.isEqual(`removeDuplicates(${JSON.stringify(arr)})`, tasks.removeDuplicates(arr), ['apple', 'banana', 'cherry'])
    }

    test_removeDuplicates3() {
        const arr = ['banana', 'cherry', 'apple']
        this.isEqual(`removeDuplicates(${JSON.stringify(arr)})`, tasks.removeDuplicates(arr), ['banana', 'cherry', 'apple'])
    }

    test_removeDuplicates4() {
        const arr = []
        this.isEqual(`removeDuplicates(${JSON.stringify(arr)})`, tasks.removeDuplicates(arr), [])
    }



    test_sortAndTakeFirstThree1() {
        this.isEqual('sortAndTakeFirstThree(null)', tasks.sortAndTakeFirstThree(null), [])
    }
    
    test_sortAndTakeFirstThree2() {
        const arr = [3, 1, 5, 4, 2]
        this.isEqual(`sortAndTakeFirstThree(${JSON.stringify(arr)})`, tasks.sortAndTakeFirstThree(arr), [1, 2, 3])
    }

    test_sortAndTakeFirstThree3() {
        const arr = [3, 1]
        this.isEqual(`sortAndTakeFirstThree(${JSON.stringify(arr)})`, tasks.sortAndTakeFirstThree(arr), [1, 3])
    }

    test_sortAndTakeFirstThree4() {
        const arr = []
        this.isEqual(`sortAndTakeFirstThree(${JSON.stringify(arr)})`, tasks.sortAndTakeFirstThree(arr), [])
    }
    


    test_sortRowsBySum1() {
        this.isEqual('sortRowsBySum(null)', tasks.sortRowsBySum(null), [])
    }

    test_sortRowsBySum2() {
        const arr = [[3, 1], [5, 4, 2], [7]]
        this.isEqual(`sortRowsBySum(${JSON.stringify(arr)})`, tasks.sortRowsBySum(arr), [[3, 1], [7], [5, 4, 2]])
    }

    test_sortRowsBySum3() {
        const arr = [[3, 1]]
        this.isEqual(`sortRowsBySum(${JSON.stringify(arr)})`, tasks.sortRowsBySum(arr), [[3, 1]])
    }

    test_sortRowsBySum4() {
        const arr = [[3, 1], [2, 4, 5], [6, 0], [7, -2, -1]]
        this.isEqual(`sortRowsBySum(${JSON.stringify(arr)})`, tasks.sortRowsBySum(arr), [[3, 1], [7, -2, -1], [6, 0], [2, 4, 5]])
    }

    test_sortRowsBySum5() {
        const arr = []
        this.isEqual(`sortRowsBySum(${JSON.stringify(arr)})`, tasks.sortRowsBySum(arr), [])
    }
}