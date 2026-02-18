import Test from '../../lib/test/test.js'
import RegexTasks from './regex-tasks.js'

export default class RegexTests extends Test {

    tasks = new RegexTasks()
    source = ''

    async loadResource(url) {
        return await fetch(url).then(resp => resp.text())
    }

    //#region isInt
    test_IsInt1() {
        this.isFalse('isInt(null)', this.tasks.isInt(null))
    }
    test_IsInt2() {
        this.isFalse('isInt(\'\')', this.tasks.isInt(''))
    }
    test_IsInt3() {
        this.isTrue('isInt(\'10\')', this.tasks.isInt('10'))
    }
    test_IsInt4() {
        this.isTrue('isInt(\'-10\')', this.tasks.isInt('-10'))
    }
    test_IsInt5() {
        this.isFalse('isInt(\'1a\')', this.tasks.isInt('1a'))
    }
    //#endregion

    //#region isFloat
    test_isFloat1() {
        this.isTrue('isFloat(\'10.\')', this.tasks.isFloat('10.'))
    }
    test_isFloat2() {
        this.isTrue('isFloat(\'.01\')', this.tasks.isFloat('.01'))
    }
    test_isFloat3() {
        this.isTrue('isFloat(\'-10.01\')', this.tasks.isFloat('-10.01'))
    }
    test_isFloat4() {
        this.isFalse('isFloat(\'.\')', this.tasks.isFloat('.'))
    }
    //#endregion

    //#region isScientific

    test_isScientific1() {
        this.isTrue('isScientific(\'1.001e+5\')', this.tasks.isScientific('1.001e+5'))
    }
    test_isScientific2() {
        this.isTrue('isScientific(\'1.001e-5\')', this.tasks.isScientific('1.001e-5'))
    }
    test_isScientific3() {
        this.isFalse('isScientific(\'1.001-5\')', this.tasks.isScientific('1.001-5'))
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

    //#region findTestsExec
    test_findTestsExec1() {
        this.isEqual('findTestsExec(null)', this.tasks.findTestsExec(null), null)
    }
    test_findTestsExec2() {
        this.isEqual('findTestsExec(\'\')', this.tasks.findTestsExec('')?.length, 0)
    }
    async test_findTestsExec3() {
        const src = await this.loadResource('regex-tests.js')
        this.isEqual('findTestsExec(src)', this.tasks.findTestsExec(src)?.length, 30)
    }
    //#endregion

    //#region findTestsMatch
    test_findTestsMatch1() {
        this.isEqual('findTestsMatch(null)', this.tasks.findTestsMatch(null), null)
    }
    test_findTestsMatch2() {
        this.isEqual('findTestsMatch(\'\')', this.tasks.findTestsMatch('')?.length, 0)
    }
    async test_findTestsMatch3() {
        const src = await this.loadResource('regex-tests.js')
        this.isEqual('findTestsMatch(src)', this.tasks.findTestsMatch(src)?.length, 30)
    }
    //#endregion

    //#region applyTemplate
    test_applyTemplate1() {
        this.isEqual('applyTemplate(null)', this.tasks.applyTemplate(null), null)
    }
    test_applyTemplate2() {
        this.isEqual('applyTemplate(\'\')', this.tasks.applyTemplate(''), '')
    }
    async test_applyTemplate3() {
        const template = await this.loadResource('./zelda.tmpl')
        this.isEqual('applyTemplate(template, null)', this.tasks.applyTemplate(template, null), template)
    }
    async test_applyTemplate4() {
        const template = await this.loadResource('./zelda.tmpl')
        const replaced = await this.loadResource('./zelda.html')
        const link = JSON.parse(await this.loadResource('./link.json'))
        this.isEqual('applyTemplate(template, link)', this.tasks.applyTemplate(template, link), replaced)
    }
    //#endregion
    
}