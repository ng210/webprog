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

moveBox1()
moveBox2()