import Maze from './maze.js'

const _maze = new Maze(20, 10)
_maze.generate(0.9, 0.6)
_maze.renderAsHtml(document.getElementById('maze'))

let _last = 0

function main(ts) {
    if (_last == 0) _last = ts
    const dt = ts - _last
    _last = ts
    _maze.animate(dt)
    requestAnimationFrame(main)
}

requestAnimationFrame(main)