import Test from '../../lib/test/test.js'
import CarTasks from "./car-tasks.js";

const tasks = new CarTasks()

const testCars = [
    {
        'brand':'Tesla',
        'model':'Model S',
        'type':'Sedan',
        'price':79999,
        'engine':'Electric',
        'power':670,
        'topSpeed':250,
        'img':'https://evadatbazis.hu/wp-content/uploads/2024/04/Tesla_Model_S_2016-01@2x.jpg'
    },
    {
        'brand':'Mercedes-Benz',
        'model':'E-Class',
        'type':'Sedan',
        'price':54900,
        'engine':'Hybrid',
        'power':292,
        'topSpeed':250,
        'img':'https://images.pexels.com/photos/17233277/pexels-photo-17233277.jpeg'
    },
    {
        'brand':'Porsche',
        'model':'911',
        'type':'Coupe',
        'price':99900,
        'engine':'Petrol',
        'power':450,
        'topSpeed':300,
        'img':'https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/1062514-13.jpg'
    }
]


const testRow = 'Tesla;Model S;Sedan;79999; Electric;670;250;https://evadatbazis.hu/wp-content/uploads/2024/04/Tesla_Model_S_2016-01@2x.jpg'
const testText =
`Tesla;Model S;Sedan;79999; Electric;670;250;https://evadatbazis.hu/wp-content/uploads/2024/04/Tesla_Model_S_2016-01@2x.jpg
Mercedes-Benz;E-Class;Sedan;54900;Hybrid;292;250;https://images.pexels.com/photos/17233277/pexels-photo-17233277.jpeg
Porsche;911;Coupe;99900;Petrol;450;300;https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/1062514-13.jpg`


export default class CarTests extends Test {
    //#region createCar(row)
    testCreateCar1() {
        this.isEqual('createCar(null)', tasks.createCar(null), null)
    }

    testCreateCar2() {
        this.isEqual('createCar(\'\')', tasks.createCar(''), null)
    }

    testCreateCar3() {
        this.isEqual(`createCar('${testRow}')`, tasks.createCar(testRow), testCars[0])
    }
    //#endregion

    //#region readCars(text)
    testReadCars1() {
        this.isEqual('readCars(null)', tasks.readCars(null), null)
    }

    testReadCars2() {
        this.isEqual('readCars(\'\')', tasks.readCars([]), [])
    }

    testReadCars3() {
        this.isEqual(`readCars('...')`, tasks.readCars(testText), testCars)
    }
    //#endregion

    //#region fastestCar(carList)
    testFastestCar1() {
        this.isEqual('fastestCar(null)', tasks.fastestCar(null), null)
    }
    testFastestCar2() {
        this.isEqual('fastestCar([...])', tasks.fastestCar(testCars), testCars[2])
    }
    //#endregion

    //#region filterByBrand(carList, brand)
    testFilterByBrand1() {
        this.isEqual('filterByBrand(null)', tasks.filterByBrand(null, null), null)
    }
    testFilterByBrand2() {
        this.isEqual('filterByBrand([...], null)', tasks.filterByBrand(testCars), testCars)
    }
    testFilterByBrand3() {
        this.isEqual('filterByBrand([...], \'Tesla\')', tasks.filterByBrand(testCars, 'Tesla'), [testCars[0]])
    }

    //#endregion

    //#region createTitleList(carList)
    testCreateTitleList1() {
        this.isEqual('createTitleList(null)', tasks.createTitleList(null), null)
    }
    testCreateTitleList2() {
        this.isEqual('createTitleList(car)', tasks.createTitleList(testCars[0]), 'Tesla - Model S')
    }
    //#endregion
}


