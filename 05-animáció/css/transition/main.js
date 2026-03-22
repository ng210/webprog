let token = document.querySelector('#token')
let _dx = 0, _dy = 0
const _delta = 50

function positionToken() {
    token.style.left = ((token.parentElement.clientWidth - token.clientWidth) >> 1) + 'px'
    token.style.top = ((token.parentElement.clientHeight - token.clientHeight) >> 1) + 'px'
}

function openMenu(span) {
    span.parentElement.querySelector('ul').classList.toggle('closed')
}

function move(e) {
    switch (e.target.id) {
        case 'left': _dx -= _delta; break
        case 'right': _dx += _delta; break
        case 'up': _dy -= _delta; break
        case 'down': _dy += _delta; break
    }

    token.style.transform = `translate(${_dx}px, ${_dy}px)`
}

positionToken()

window.onresize = positionToken
document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', move))
const colors = ['red', 'green', 'blue']
document.querySelectorAll('ball')
    .forEach((b, ix) => {
        b.style.left = (80 + 120*ix) + 'px';
        b.style.backgroundColor = colors[ix];
        b.addEventListener(
            'click',
            e => {
                e.target.classList.add('bounce')
                setTimeout(() => e.target.classList.remove('bounce'), 600)
            })
    })
