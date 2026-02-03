import Test from '../../lib/test/test.js'
import Tasks from './tasks.js'
// import Tasks from './diakok/Fazekas_Bertalan_tasks.js'
// import Tasks from './diakok/Horvath_Gabor_tasks.js'
// import Tasks from './diakok/szakaly_balint_tasks.js'
// import Tasks from './diakok/tasks-antalarmin.js'
// import Tasks from './diakok/tasks-Kevin.js'
// import Tasks from './diakok/tasks-Kövi-Richárd.js'
// import Tasks from './diakok/tasks-ktm.js'
// import Tasks from './diakok/tasks-na.js'
// import Tasks from './diakok/tasks-patrik.js'
// import Tasks from './diakok/tasks-szabi.js'
// import Tasks from './diakok/marczali-dominik-tasks.js'
// import Tasks from './diakok/molnar-alex-tasks.js'
// import Tasks from './diakok/nemeth-miklos-tasks.js'
// import Tasks from './diakok/varga-adam-tasks.js'
// import Tasks from './diakok/zugonics-matyi-tasks.js'


const tasks = new Tasks()

export default class ArrayTests extends Test {
    // #region 1.generateTable(user)
    testGenerateTable1() {
        const users = [
            { id: 1, name: 'Anna', email: 'anna@test.com' },
            { id: 2, name: 'Béla', email: 'bela@test.com' }
        ]
        const table = '<tr><td>1</td><td>Anna</td><td>anna@test.com</td></tr>' +
                    '<tr><td>2</td><td>Béla</td><td>bela@test.com</td></tr>'
        this.isEqual('generateTable1',  tasks.generateTable(users), table)
    }

    testGenerateTable2() {
        const users = [
            { id: 1, name: 'Anna', email: 'anna@test.com' },
            { id: null, name: null, email: null }
        ]
        const table = '<tr><td>1</td><td>Anna</td><td>anna@test.com</td></tr>' +
                    '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
        this.isEqual('generateTable2',  tasks.generateTable(users), table)
    }

    testGenerateTable3() {
        const users = []
        const table = ''
        this.isEqual('generateTable3',  tasks.generateTable(users), table)
    }

    testGenerateTable4() {
        const users = null
        const table = ''
        this.isEqual('generateTable4',  tasks.generateTable(users), table)
    }
    // #endregion

    // #region 2.getActiveUsers(users)
    testGetActiveUsers1() {
        const users = [
            { name: 'Anna', isActive: true },
            { name: 'Béla', isActive: false }
        ]
        this.isEqual('getActiveUsers1',  tasks.getActiveUsers(users).length, 1)
    }

    testGetActiveUsers2() {
        const users = [
            { name: 'Anna', isActive: false },
            { name: 'Béla', isActive: false }
        ]
        this.isEqual('getActiveUsers2',  tasks.getActiveUsers(users).length, 0)
    }

    testGetActiveUsers3() {
        const users = []
        this.isEqual('getActiveUsers3',  tasks.getActiveUsers(users).length, 0)
    }

    testGetActiveUsers4() {
        const users = null
        this.isEqual('getActiveUsers4',  tasks.getActiveUsers(users).length, 0)
    }
    // #endregion

    // #region 3.generateMenu(items)
    testGenerateMenu1() {
        const items = [
            { title: 'Home', url: '/' },
            { title: 'About', url: '/about' },
            { title: 'Contact', url: '/contact' }
        ]
        const html = '<li><a href="/">Home</a></li>' +
                     '<li><a href="/about">About</a></li>' +
                     '<li><a href="/contact">Contact</a></li>'
        this.isEqual('generateMenu1',  tasks.generateMenu(items), html)
    }

    testGenerateMenu2() {
        const items = [
            { title: 'Home', url: '/' },
            null,
            { title: '', url: '/contact' },
            { title: 'About', url: '' }
        ]
        const html = '<li><a href="/">Home</a></li>'
        this.isEqual('generateMenu2',  tasks.generateMenu(items), html)
    }

    testGenerateMenu3() {
        const items = []
        this.isEqual('generateMenu2',  tasks.generateMenu(items), '')
    }

    testGenerateMenu4() {
        const items = null
        this.isEqual('generateMenu3', tasks.generateMenu(items), '')
    }
    // #endregion

    // #region 4.hasInvalidField(fields)
    testHasInvalidField1() {
        const fields = [
            { name:'id', value: 1, isValid: true },
            { name:'name', value: 'Anna', isValid: true },
            { name:'email', value: 'anna@test.com', isValid: true }
        ]
        this.isEqual('hasInvalidField1',  tasks.hasInvalidField(fields), false)
    }

    testHasInvalidField2() {
        const fields = [
            { name:'id', value: 1, isValid: true },
            { name:'name', value: 'Anna', isValid: false },
            { name:'email', value: 'anna@test.com', isValid: true }
        ]
        this.isEqual('hasInvalidField2',  tasks.hasInvalidField(fields), true)
    }

    testHasInvalidField3() {
        const fields = [
            { name:'id', value: 1, isValid: true },
            null,
            { name:'email', value: 'anna@test.com', isValid: true }
        ]
        this.isEqual('hasInvalidField3',  tasks.hasInvalidField(fields), false)
    }

    testHasInvalidField4() {
        const fields = []
        this.isEqual('hasInvalidField4',  tasks.hasInvalidField(fields), false)
    }

    testHasInvalidField5() {
        const fields = null
        this.isEqual('hasInvalidField5',  tasks.hasInvalidField(fields), false)
    }
    // #endregion

    // #region 5.getErrorMessages(fields)
    testGetErrorMessages1() {
        const messages = [
            'Id in use',
            'Invalid name',
            'Invalid email'
        ]
        const fields = [
            { name:'id', value: 1, isValid: true , message: messages[0]},
            { name:'name', value: 'Anna', isValid: true , message: messages[1]},
            { name:'email', value: 'anna@test.com', isValid: true, message: messages[2] }
        ]

        this.isEqual('getErrorMessages1',  tasks.getErrorMessages(fields), [])
    }

    testGetErrorMessages2() {
        const messages = [
            'Id in use',
            'Invalid name',
            'Invalid email'
        ]
        const fields = [
            { name:'id', value: 1, isValid: false , message: messages[0]},
            { name:'name', value: 'Anna', isValid: false , message: messages[1]},
            { name:'email', value: 'anna@test.com', isValid: false, message: messages[2] }
        ]
        this.isEqual('getErrorMessages2',  tasks.getErrorMessages(fields), messages)
    }

    testGetErrorMessages3() {
        const messages = [
            'Id in use',
            'Invalid name',
            'Invalid email'
        ]
        const fields = [
            { name:'id', value: 1, isValid: false , message: messages[0]},
            null,
            { name:'email', value: 'anna@test.com', isValid: false, message: messages[2] }
        ]
        this.isEqual('getErrorMessages3',  tasks.getErrorMessages(fields).length, 2)
    }

    testGetErrorMessages4() {
        const fields = []
        this.isEqual('getErrorMessages4',  tasks.getErrorMessages(fields), [])
    }
    // #endregion


    //#region Egyéb feladatok
    // #region calculateCartTotal(cart)
    _testCalculateCartTotal1() {
        const cart = [{ price: 100, quantity: 2 }]
        this.isEqual('calculateCartTotal1',  tasks.calculateCartTotal(cart), 200)
    }

    _testCalculateCartTotal2() {
        const cart = []
        this.isEqual('calculateCartTotal2',  tasks.calculateCartTotal(cart), 0)
    }

    _testCalculateCartTotal3() {
        const cart = [{ price: 50, quantity: 0 }]
        this.isEqual('calculateCartTotal3',  tasks.calculateCartTotal(cart), 0)
    }

    _testCalculateCartTotal4() {
        const cart = [
            { price: 100, quantity: 1 },
            { price: 200, quantity: 2 }
        ]
        this.isEqual('calculateCartTotal4',  tasks.calculateCartTotal(cart), 500)
    }
    // #endregion

    // #region sortProductsByPrice(products)
    _testSortProductsByPrice1() {
        const products = [{ price: 20 }, { price: 10 }]
        sortProductsByPrice(products)
        this.isEqual('sortProductsByPrice1',  tasks.products[0].price, 10)
    }

    _testSortProductsByPrice2() {
        const products = []
        sortProductsByPrice(products)
        this.isEqual('sortProductsByPrice2',  tasks.products.length, 0)
    }

    _testSortProductsByPrice3() {
        const products = [{ price: 5 }]
        sortProductsByPrice(products)
        this.isEqual('sortProductsByPrice3',  tasks.products[0].price, 5)
    }

    _testSortProductsByPrice4() {
        const products = [{ price: 3 }, { price: 3 }]
        sortProductsByPrice(products)
        this.isEqual('sortProductsByPrice4',  tasks.products.length, 2)
    }
    // #endregion

    // #region getPage(items, page, pageSize)
    _testGetPage1() {
        const items = [1, 2, 3, 4, 5]
        this.isEqual('getPage1',  tasks.getPage(items, 1, 2).length, 2)
    }

    _testGetPage2() {
        const items = [1, 2, 3]
        this.isEqual('getPage2',  tasks.getPage(items, 2, 2).length, 1)
    }

    _testGetPage3() {
        const items = []
        this.isEqual('getPage3',  tasks.getPage(items, 1, 3).length, 0)
    }

    _testGetPage4() {
        const items = [1, 2]
        this.isEqual('getPage4',  tasks.getPage(items, 3, 2).length, 0)
    }
    // #endregion

    // #region getDailyTotals(stats) - 2D
    _testGetDailyTotals1() {
        const stats = [[1, 2, 3]]
        this.isEqual('getDailyTotals1',  tasks.getDailyTotals(stats)[0], 6)
    }

    _testGetDailyTotals2() {
        const stats = []
        this.isEqual('getDailyTotals2',  tasks.getDailyTotals(stats).length, 0)
    }

    _testGetDailyTotals3() {
        const stats = [
            [5],
            [10]
        ]
        this.isEqual('getDailyTotals3',  tasks.getDailyTotals(stats)[1], 10)
    }

    _testGetDailyTotals4() {
        const stats = [[]]
        this.isEqual('getDailyTotals4',  tasks.getDailyTotals(stats)[0], 0)
    }
    // #endregion
    //#endregion
}