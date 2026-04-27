import Maze from './maze.js'

const _maze = new Maze(8, 6)
_maze.generate(0.9)
_maze.renderAsHtml(document.getElementById('maze'))