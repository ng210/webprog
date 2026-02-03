export default class Tasks {
    // 1. HTML táblázat generálása
    // Felhasználókat leíró objektum (id, name, email) tömbből hozz létre HTML <tr> sorokat három <td> cellával.
    // Bemenet: user objektum [{ id: number, name: string, email: string }, ...]
    // Kimenet: HTML string '<tr><td>...</td><td>...</td><td>...</td></tr><tr>...'
    generateTable(users) {
        return users.map(
            user => `<tr><td>${user.Id}</td><td>${user.Name}</td><td><td>${user.Email}</td>`
        )
    }

    // 2. Aktív felhasználók szűrése
    // Felhasználók listájából add vissza csak azokat, akik aktívak (isActive === true).
    // Bemenet: users lista [{ isActive: boolean, ... }, ...]
    // Kimenet: aktív felhasználók listája
    getActiveUsers(users) {

    }

    // 3. Navigációs menüpontok generálása
    // Menüpont objektumokból (title, url) hozz létre <li><a></a></li> HTML elemeket.
    // Bemenet: items lista [{ title: string, url: string }, ...]
    // Kimenet: HTML string '<li><a href="...">...</a></li>...'
    generateMenu(items) {
        return '';
    }

    // 4. Hibás űrlapmező ellenőrzése
    // Űrlapmezők listájáról döntsd el, van-e köztük érvénytelen (isValid === false).
    // Bemenet: fields lista [{ isValid: boolean, ... }, ...]
    // Kimenet: boolean
    hasInvalidField(fields) {
    }

    // 5. Hibaüzenetek kigyűjtése
    // Űrlapmezőkből gyűjtsd ki a hibás mezők message mezőit.
    getErrorMessages(fields) {
        return [];
    }


    //#region Egyéb feladatok (nem kötelező)
    // 6. Webshop kosár végösszeg számítása
    // Kosártételekből (price, quantity) számítsd ki a teljes összeget.
    calculateCartTotal(cart) {
    }

    // 7. Termékek rendezése ár szerint
    // Termékek listáját rendezd növekvő ár szerint.
    sortProductsByPrice(products) {
    }

    // 8. Lapozás (pagination)
    // Egy lista elemeiből add vissza az adott oldalhoz tartozó elemeket.
    getPage(items, page, pageSize) {
    }

    // 10. 2D lista napi összesítése
    // Egy kétdimenziós számlistában minden belső lista egy nap adatait tartalmazza - számíts napi összeseket.
    getDailyTotals(stats) {
    }
    // #endregion
}