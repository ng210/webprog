import Test from '../../lib/test/test.js'
import RegexTasks from './regex-tasks.js'

export default class RegexTests extends Test {

    tasks = new RegexTasks()
    source = ''

    async loadSource(url) {
        return await fetch(url).then(resp => resp.text())
    }

    //#region isNumber
    test_IsNumber1() {
        this.isFalse('isNumber(null)', this.tasks.isNumber(null))
    }
    test_IsNumber2() {
        this.isFalse('isNumber(\'\')', this.tasks.isNumber(''))
    }
    test_IsNumber3() {
        this.isTrue('isNumber(\'10\')', this.tasks.isNumber('10'))
    }
    test_IsNumber4() {
        this.isTrue('isNumber(\'10.\')', this.tasks.isNumber('10.'))
    }
    test_IsNumber5() {
        this.isTrue('isNumber(\'-10.01\')', this.tasks.isNumber('-10.01'))
    }
    test_IsNumber6() {
        this.isTrue('isNumber(\'.1\')', this.tasks.isNumber('.1'))
    }
    test_IsNumber7() {
        this.isTrue('isNumber(\'1A\')', this.tasks.isNumber('1A'))
    }
    test_IsNumber8() {
        this.isTrue('isNumber(\'1.001e+5\')', this.tasks.isNumber('1.001e+5'))
    }
    //#endregion

    //#region isDate
    test_IsDate1() {
        this.isFalse('isDate(null)', this.tasks.isDate(null))
    }
    test_IsDate2() {
        this.isFalse('isDate(\'\')', this.tasks.isDate(''))
    }
    test_IsDate3() {
        this.isFalse('isDate(\'2026\')', this.tasks.isDate('2026'))
    }
    test_IsDate4() {
        this.isFalse('isDate(\'2026-02\')', this.tasks.isDate('2026-02'))
    }
    test_IsDate5() {
        this.isFalse('isDate(\'2026.02.09\')', this.tasks.isDate('2026.02.09'))
    }
    test_IsDate6() {
        this.isFalse('isDate(\'2026-2-9\')', this.tasks.isDate('2026-2-9'))
    }
    test_IsDate7() {
        this.isTrue('isDate(\'2026-02-09\')', this.tasks.isDate('2026-02-09'))
    }
    test_IsDate8() {
        this.isTrue('isDate(\'0001-01-01\')', this.tasks.isDate('0001-01-01'))
    }
    //#endregion


}