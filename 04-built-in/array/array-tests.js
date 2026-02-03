import Test from '../../lib/test/test.js'
import List from './list.js'

export default class ListTests extends Test {

    //#region constructor
    testConstructor1() {
        const list = new List()
        this.isEqual('new List()', list.length, 0)
    }
	testConstructor2() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        this.isEqual(`new List([${arr}])`, list, arr)
    }
	testConstructor3() {
        const set = new Set([1,2,3,4])
        const list = new List(set)
        this.isEqual(`new List(${set})`, list, set)
    }
	testConstructor4() {
        const str = 'Hello'
        const list = new List(str)
        this.isEqual(`new List(${str})`, list, [...str])
    }
	testConstructor5() {
        const list = new List(3)
        this.isEqual('new List(3)', list, [undefined, undefined, undefined])
    }
    //#endregion

    //#region add
    testAdd1() {
        const list = new List()
        const item = 1
        list.add(item)
        this.isEqual(`new List().add(${item})`, list, [item])
    }
    testAdd2() {
        const arr = [1,2,3, 4]
        const list = new List()
        for (let item of arr) {
            list.add(item)
        }
        this.isEqual(`new List().add(1)...`, list, arr)
    }
    testAdd3() {
        const list = new List()
        this.isEqual('new List().add(null)', list.length, 0)
    }
    //#endregion

    //#region add
    testAddRange1() {
        const arr = [1,2,3,4]
        const list = new List()
        list.addRange(arr)
        this.isEqual(`new List().addRange([${arr}])`, list, arr)
    }
    testAddRange2() {
        const set = new Set([1,2,3,4])
        const list = new List()
        list.addRange(set)
        this.isEqual(`new List().addRange(${set})`, list, set)
    }
    testAddRange3() {
        const str = 'Hello'
        const list = new List()
        list.addRange(str)
        this.isEqual(`new List().addRange('${str}')`, list, [...str])
    }
    testAddRange3() {
        const arr1 = [1,2,3,4]
        const list = new List(arr1)
        const arr2 = [5,6,7,8]
        list.addRange(arr2)
        this.isEqual(`new List(${arr1}).addRange([${arr2}])`, list, arr1.concat(arr2))
    }
    //#endregion

    //#region insert
    testInsert1() {
        const list = new List()
        const item = 1
        list.insert(0, item)
        this.isEqual(`new List().insert(0, ${item})`, list, [item])
    }
    testInsert2() {
        const list = new List()
        const item = 1
        list.insert(1, item)
        this.isEqual(`new List().insert(1, ${item})`, list, [item])
    }
    testInsert3() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        const item = 5
        list.insert(1, item)
        const expected = new Array(...arr)
        expected.splice(1, 0, item)
        this.isEqual(`new List([${arr}]).insert(1, ${item})`, list, expected)
    }
    testInsert4() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        const item = 5
        list.insert(5, item)
        const expected = new Array(...arr)
        expected.splice(5, 0, item)
        this.isEqual(`new List([${arr}]).insert(5, ${item})`, list, expected)
    }
    testInsert5() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        list.insert(5)
        this.isEqual(`new List([${arr}]).insert(5)`, list, arr)
    }
    //#endregion

    //#region insertRange
    testinsertRange1() {
        const arr = [1,2,3,4]
        const list = new List()
        list.insertRange(0, arr)
        this.isEqual(`new List().insertRange(0, [${arr}])`, list, arr)
    }
    testinsertRange2() {
        const arr1 = [1,2,3,4]
        const arr2 = [5,6,7,8]
        const list = new List(arr1)
        list.insertRange(2, arr2)
        const expected = new Array(...arr1)
        expected.splice(2, 0, ...arr2)
        this.isEqual(`new List([${arr1}]).insertRange(2, [${arr2}])`, list, expected)
    }
    testinsertRange3() {
        const item = 1
        const list = new List()
        list.insertRange(1, item)
        this.isEqual(`new List().insertRange(1, ${item})`, list, [])
    }
    testinsertRange4() {
        const list = new List()
        list.insertRange(1)
        this.isEqual(`new List().insertRange(1)`, list, [])
    }
    //#endregion

    //#region remove
    testRemove1() {
        const list = new List()
        const item = 1
        const res = list.remove(0, item)
        this.isEqual(`new List().remove(0, ${item})`, list, [])
        this.isFalse('remove returned', res)
    }
    testRemove2() {
        const item = 1
        const list = new List([item])
        const res = list.remove(item)
        this.isEqual(`new List([${item}]).remove(${item})`, list, [])
        this.isTrue('remove returned', res)
    }
    testRemove3() {
        const arr = [1,2,1,3,4]
        const item = 1
        const list = new List(arr)
        const res = list.remove(item)
        const expected = new Array(...arr)
        expected.splice(0, 1)
        this.isEqual(`new List([${arr}]).remove(${item})`, list, expected)
        this.isTrue('remove returned', res)
    }
    testRemove4() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        const item = 5
        const res = list.remove(item)
        this.isEqual(`new List([${arr}]).remove(${item})`, list, arr)
        this.isFalse('remove returned', res)
    }
    testRemove5() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        const res = list.remove(null)
        this.isEqual(`new List([${arr}]).remove(null)`, list, arr)
        this.isFalse('remove returned', res)
    }
    //#endregion

    //#region removeAt
    testRemoveAt1() {
        const list = new List()
        list.removeAt(0)
        this.isEqual(`new List().removeAt(0)`, list, [])
    }
    testRemoveAt2() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        list.removeAt(2)
        const expected = new Array(...arr)
        expected.splice(2, 1)
        this.isEqual(`new List([${arr}]).removeAt(2)`, list, expected)
    }
    testRemoveAt3() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        list.removeAt(5)
        this.isEqual(`new List([${arr}]).removeAt(5)`, list, arr)
    }
    testRemoveAt4() {
        const list = new List()
        list.removeAt(1)
        this.isEqual(`new List().removeAt(1)`, list, [])
    }
    //#endregion

    //#region removeAll
    testRemoveAll1() {
        const list = new List()
        list.removeAll(x => false)
        this.isEqual(`new List().removeAll(x => false)`, list, [])
    }
    testRemoveAll2() {
        const list = new List()
        list.removeAll(x => true)
        this.isEqual(`new List().removeAll(x => true)`, list, [])
    }
    testRemoveAll3() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        list.removeAll(1)
        this.isEqual(`new List([${arr}]).removeAll(1)`, list, arr)
    }
    testRemoveAll4() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        list.removeAll(x => x < 3)
        const expected = arr.filter(x => !(x < 3))
        this.isEqual(`new List([${arr}]).removeAll(x => x < 3)`, list, expected)
    }
    //#endregion

    //#region clear
    testClear1() {
        const list = new List()
        list.clear()
        this.isEqual(`new List().clear()`, list, [])
    }
    testClear2() {
        const arr = [1,2,3]
        const list = new List(arr)
        list.clear()
        this.isEqual(`new List([${arr}]).clear()`, list, [])
    }
    //#endregion

    //#region count
    testCount1() {
        const list = new List()
        this.isEqual(`new List().count(x => x < 3)`, list.count(x => x < 3), 0)
    }
    testCount2() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        this.isEqual(`new List([${arr}]).count(x => x < 3)`, list.count(x => x < 3), 2)
    }
    testCount3() {
        const arr = [1,2,3,4]
        const list = new List(arr)
        this.isEqual(`new List().count()`, list.count(), 4)
    }
    //#endregion
}