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

    // időtartam 2 sec
    const duration = 2000
    // 3 frame
    const frames = [[-100,0],[0,50],[100,0]]
    // egy frame ideje = időtartam / frame-ek száma
    const frameTime = Math.trunc(duration / (frames.length - 1))
    let frameId = 0
    let elapsed = 0
    let lasttime = -1
    // a doboz aktuális pozíciója (x,y)
    let pos = [0, 0]
    
    function animate(timestamp) {
        if (lasttime == -1) {
            lasttime = timestamp
        }

        // az utolsó animálás óta eltelt idő
        const dt = timestamp - lasttime
        // gyűjtjük az eltelt időt
        elapsed += dt
        // ha a frame idejét eléri, jöhet a következő frame
        if (elapsed >= frameTime) {
            elapsed = 0
            pos[0] = frames[frameId][0]
            pos[1] = frames[frameId][1]
            frameId = (frameId + 1) % frames.length
        }

        // az animáció előrehaladása = eltelt idő / frame időtartam
        let progress = elapsed / frameTime

        // A mozgatást ezúttal ne a transform-translate végezze el,
        // hanem közvetlenül a left és top attribútumok módosításával.
        const frame1 = frames[frameId]
        pos[0] = frame1[0]
        pos[1] = frame1[1]
        box.style.left = (box.parentNode.clientWidth / 2 + pos[0]) + 'px'
        box.style.top = (box.parentNode.clientHeight / 2 + pos[1]) + 'px'
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

// moveBox1()
// moveBox2()
multiBox()
bouncingBalls()