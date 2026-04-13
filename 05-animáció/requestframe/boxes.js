import { Colors, getConsole } from '../../lib/console/console.js'
import { poll } from '../../lib/util.js'

const _cons = await getConsole()
_cons.color = 'LightCyan'
_cons.setConsoleTop(document.body.clientHeight*0.8)

_cons.writeln('RequestAnimationFrame demo')
const _nextButton = document.getElementById('next')
_nextButton.addEventListener('click', e => _nextButton.clicked = true)

const _box1 = document.getElementById('box1')
const _box2 = document.getElementById('box2')

function lerp(a, b, t) {
    return a * (1 - t) + b * t
}

async function checkTimings() {
    let time = 0
    let lastTime = 0
    let counter = 0
    let frame = 0
    let timer = 0
    let handler = 0

    function mainTimeout(dt) {
        clearTimeout(timer)
        _box1.innerHTML = `Frame: ${frame} (${time.toFixed(2)} ms)`
        frame++
        timer = setTimeout(mainTimeout, 1000)
        time += 1000
    }

    function mainRequestAF(time) {
        const dt = time - lastTime
        lastTime = time
        counter += dt
        if (counter >= 1000) {
            _box2.innerHTML = `Frame: ${frame} (${counter.toFixed(2)} ms)`
            counter -= 1000
        }
        handler = requestAnimationFrame(mainRequestAF)    
    }

    _cons.writeln('--- Timing Check start ---', 'Yellow')
    _nextButton.clicked = false
    mainTimeout()
    mainRequestAF(0)

    await poll(() => _nextButton.clicked, 400)
    clearTimeout(timer)
    cancelAnimationFrame(handler)
    _cons.writeln('--- Timing Check end ---', 'Yellow')
    document.querySelector('.timingBox').remove()
}

async function movingBoxes() {
    let lastTime = 0
    let handler = 0
    let allGone = false
    const rnd = 0.9
    let boxes = []

    function box_create() {
        const box = document.createElement('div')
        box.className = 'sprite'
        let color = (8+7*Math.random()|0).toString(16) +
                    (8+7*Math.random()|0).toString(16) +
                    (8+7*Math.random()|0).toString(16)
        box.style.backgroundColor = '#' + color + '4'
        box.style.left = Math.random() * (window.innerWidth - 50) + 'px'
        box.style.top = Math.random() * (window.innerHeight - 50) + 'px'
        box.x = 50 + Math.random() * window.innerWidth - 100
        box.y = 50 + Math.random() * window.innerHeight - 100
        box.width = 8, box.height = 12
        box.style.width = box.width + 'px'
        box.style.height = box.height + 'px'
        box.v1x = 0, box.v1y = 0
        box.v2x = 0, box.v2y = 0
        box.duration = 0
        box.delta = 0
        box_changeDirection(box)
        document.body.appendChild(box)
        return box
    }

    function box_changeDirection(box) {
        box.v1x = box.v2x
        box.v1y = box.v2y
        const alpha = rnd * Math.random() * 2 * Math.PI
        const speed = 50 + 50 * lerp(1, Math.random(), rnd)
        box.v2x = Math.cos(alpha) * speed
        box.v2y = Math.sin(alpha) * speed
        box.duration = 2 + 2 * lerp(1, Math.random(), rnd)
        box.delta = 0
    }

    function box_move(box, dt) {
        box.delta += dt
        if (box.delta >= box.duration) {
            box_changeDirection(box)
        }
        const t = box.delta / box.duration
        const vx = lerp(box.v1x, box.v2x, t)
        const vy = lerp(box.v1y, box.v2y, t)
        box.x += vx * dt
        if (box.x < 0) {
            box.v1x *= -1
            box.v2x *= -1
            box.x = -box.x
        } else if (box.x > window.innerWidth - box.width) {
            box.v1x *= -1
            box.v2x *= -1
            box.x = 2*(window.innerWidth - box.width) - box.x
        }
        box.style.left = box.x + 'px'

        box.y += vy * dt
        if (box.y < 0) {
            box.v1y *= -1
            box.v2y *= -1
            box.y = -box.y
        } else if (box.y > window.innerHeight - box.height) {
            box.v1y *= -1
            box.v2y *= -1
            box.y = 2*(window.innerHeight - box.height) - box.y
        }        
        box.style.top = box.y + 'px'
    }

    function moveBoxes(time) {
        const dt = (time - lastTime) / 1000
        lastTime = time

        for (let box of boxes) {
            box_move(box, dt)
        }

        handler = requestAnimationFrame(moveBoxes)
    }

    function explodeBoxes(time) {
        const dt = (time - lastTime) / 1000
        lastTime = time
        for (let box of boxes) {
            box.delta += dt
            let f = 1 + 2 * box.delta / box.duration
            box.style.transform = `scale(${f}, ${f})`
            box.style.width = box.width + 'px'
            box.style.height = box.height + 'px'
            box.style.opacity = 1 - box.delta / box.duration
        }
        boxes = boxes.filter(box => box.delta < box.duration)
        if (boxes.length == 0) {
            allGone = true
        }
        else {
            handler = requestAnimationFrame(explodeBoxes)
        }
    }

    _cons.writeln('--- Move boxes start ---', 'Green')
    _nextButton.clicked = false

    for (let i = 0; i < 400; i++) {
        boxes.push(box_create())
    }

    handler = requestAnimationFrame(moveBoxes)

    await poll(() => _nextButton.clicked, 400)
    cancelAnimationFrame(handler)
    for (let box of boxes) {
        box.duration = 1 + 2*lerp(1, Math.random(), rnd)
    }
    handler = requestAnimationFrame(explodeBoxes)
    await poll(() => allGone, 400)

    _cons.writeln('--- Move boxes end ---', 'Green')
    cancelAnimationFrame(handler)
}

// await checkTimings()

await movingBoxes()
