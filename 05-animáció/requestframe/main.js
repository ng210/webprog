function moveBox1() {
    const box = document.querySelector('#box1')

    const duration = 2000   // időtartam 2 sec
    const startX = -100     // kezdő pozíció
    const endX = 100        // vég pozíció

    let startTime = -1
    
    function animate(timestamp) {
        // ha az animáció először fut le,
        // startTime legyen a timestamp értéke

        // az eltelt idő = timestamp és startTime különbsége
        let elapsed
        // az animáció előrehaladása = eltelt idő és az időtartam hányadosa
        let progress

        // ha az előrehaladás nagyobb mint 1,
        // azaz az animáció véget ért
        if (progress >= 1) {
            // kezdődjön újra
        } else {
            // különben az aktuális x koordináta legyen
            // kezdeti pozíció + elmozdulás * előrehaladás
            let currentX = startX
            // a transform segítségével mozgassuk a dobozt az x tengelyen
            box.style.transform = ''
        }
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

function moveBox2() {
    const box = document.querySelector('#box2')

    function animate(timestamp) {

        
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

moveBox1()
moveBox2()