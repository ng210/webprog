function moveBox1() {
    const box = document.querySelector('#box1')

    const duration = 2000   // időtartam 2 sec
    const startX = -100     // kezdő pozíció
    const endX = 100        // vég pozíció

    let startTime = -1
    
    function animate(timestamp) {
        // ha az animáció először fut le,
        // startTime legyen a timestamp értéke
        if (startTime == -1) {
            startTime = timestamp
        }

        // az eltelt idő = timestamp és startTime különbsége
        let elapsed = timestamp - startTime
        // az animáció előrehaladása = eltelt idő és az időtartam hányadosa
        let progress = elapsed / duration

        // ha az előrehaladás nagyobb mint 1,
        // azaz az animáció véget ért
        if (progress >= 1) {
            // kezdődjön újra
            startTime = -1
        } else {
            // különben az aktuális x koordináta legyen
            // kezdeti pozíció + elmozdulás * előrehaladás
            let currentX = startX + (endX - startX) * progress
            // a transform segítségével mozgassuk a dobozt az x tengelyen
            box.style.transform = `translateX(${currentX}px)`
        }
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function moveBox2() {
    const box = document.querySelector('#box2')

    const duration = 2000   // időtartam 2 sec
    let startX = -100     // kezdő pozíció
    let endX = 100        // vég pozíció

    let startTime = -1
    
    function animate(timestamp) {
        // ha az animáció először fut le,
        // startTime legyen a timestamp értéke
        if (startTime == -1) {
            startTime = timestamp
        }

        // az eltelt idő = timestamp és startTime különbsége
        let elapsed = timestamp - startTime
        // az animáció előrehaladása = eltelt idő és az időtartam hányadosa
        let progress = elapsed / duration

        // ha az előrehaladás nagyobb mint 1,
        // azaz az animáció véget ért
        if (progress >= 1) {
            // kezdődjön újra
            startTime = -1
            tmp = startX
            startX = endX
            endX = tmp
        } else {
            // különben az aktuális x koordináta legyen
            // kezdeti pozíció + elmozdulás * előrehaladás
            let currentX = startX + (endX - startX) * progress
            // a transform segítségével mozgassuk a dobozt az x tengelyen
            box.style.transform = `translateX(${currentX}px)`
        }
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function multiBox() {
    const box = document.querySelector('#box3')

    const duration = 3000                       // időtartam 3 sec
    const frames = [[-100,0],[0,50],[100,0]]    // koordináták 3 frame-ben
    let elapsed = 0
    let lasttime = -1
    
    function animate(timestamp) {
        if (lasttime == -1) {
            lasttime = timestamp
        }

        // az utolsó animálás óta eltelt idő
        const dt = lasttime - timestamp
        // gyűjtjük az eltelt időt
        elapsed += dt
        // az animáció előrehaladása = eltelt idő és az időtartam hányadosa
        let progress = elapsed / duration

        // a progress alapján olvassuk ki a megfelelő frame adatait,
        // és számítsuk ki az aktuális koordinátákat.
        // A mozgatást ezúttal ne a transform-translate végezze el,
        // hanem közvetlenül a left és top attribútumok módosításával.
        // Az animáció oda-vissza fusson!

        lasttime = timestamp
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function bouncingBalls() {
    // Hozz létre 10 darab DIV elemet "ball" CSS osztállyal.
    // Legyen véletlenszerű
    //  - a kezdőpozíciójuk  a szülő section elemen belül,
    //  - a háttérszínűk,
    //  - a sebességvektoruk.

    let lasttime = -1
    
    function animate(timestamp) {
        if (lasttime == -1) {
            lasttime = timestamp
        }

        // az utolsó animálás óta eltelt idő
        const dt = lasttime - timestamp
        // mozgass minden labdát a sebességvektora szerint,
        // ha a labda a section területének szélére ér, pattanjon vissza
        // extra: kezeld a labdák ütközését

        lasttime = timestamp
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

moveBox1()
moveBox2()
multiBox()
bouncingBalls()