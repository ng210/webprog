import { Graph } from "../../lib/graph.js"
import Player from "./player.js"
import Enemy from "./enemy.js"

const DURATION = 300
const ENEMY_COUNT = 4

export default class Maze extends Graph {
    width
    height
    #view
    #graph
    #map = []

    #route = []
    #selectPhase = 0
    #startCell
    #endCell

    #player = null
    #food = []
    #enemies = []

    constructor(width, height) {
        super()
        this.width = width
        this.height = height
    }

    generate(rand = 0.0, density = 0.0) {
        this.#graph = new Graph()
        for (let j = 0; j < this.height; j++) {
            this.#map.push([])
            for (let i = 0; i < this.width; i++) {
                let current = this.#graph.addVertex({ x: i, y: j })
                this.#map[j].push(current)
                if (i > 0) {
                    const edge = this.#graph.addEdge(current, this.#map[j][i-1], { direction: 0, weight: 1})
                    edge.reverse = this.#graph.addEdge(this.#map[j][i-1], current, { direction: 2, weight: 1})
                    edge.reverse.reverse = edge
                }
                if (j > 0) {
                    const edge = this.#graph.addEdge(current, this.#map[j-1][i], { direction: 1, weight: 1})
                    edge.reverse = this.#graph.addEdge(this.#map[j-1][i], current, { direction: 3, weight: 1})
                    edge.reverse.reverse = edge
                }
            }
        }

        const vertices = [...this.#graph.vertices]
        const max = vertices.length * density
        for (let di=0; di<max; di++) {
            //while (vertices.length > 0) {
                const vi = Math.trunc(vertices.length * Math.random())
                const vertex = vertices[vi]
                if (vertex.degreeOut > 2) {
                    const eix = vertex.edgesOut.map((e, ix) => ix)
                    while (eix.length > 0) {
                        const ei = Math.trunc(eix.length * Math.random())
                        const edge1 = vertex.edgesOut[eix[ei]]
                        const wi1 = edge1.data.weight
                        const wi2 = edge1.reverse.data.weight
                        edge1.data.weight = Infinity
                        edge1.reverse.data.weight = Infinity
                        eix.splice(ei, 1)
                        if (edge1.vertexEnd.degreeIn > 2/* && this.findAPath(edge1.vertexStart, edge1.vertexEnd)*/) {
                            this.#graph.removeEdge(edge1)
                            this.#graph.removeEdge(edge1.reverse)
                            break
                        }
                        edge1.data.weight = wi1
                        edge1.reverse.data.weight = wi2
                    }
                }
                vertices.splice(vi, 1)

                // const edge2 = edge1.reverse
                // const wi1 = edge1.data.weight
                // const wi2 = edge2.data.weight
                // edge1.data.weight = Infinity
                // edge2.data.weight = Infinity
                // if (this.findAPath(edge1.vertexStart, edge1.vertexEnd)) {
                //     this.#graph.removeEdge(edge1)
                //     this.#graph.removeEdge(edge2)
                // } else {
                //     edge1.data.weight = wi1
                //     edge2.data.weight = wi2
                // }
            //}
        }

        this.#player = new Player(
                0, 0,
                this.#map[0][0],
                DURATION
        )

        for (let ei=0; ei<ENEMY_COUNT; ei++) {
            const x = Math.trunc(this.width * Math.random())
            const y = Math.trunc(this.height * Math.random())
            this.#enemies.push(
                new Enemy(
                    x, y,
                    this.#map[y][x],
                    2*DURATION/(0.5 + 0.5*Math.random())
                ))
        }
    }

    findAPath(startVertex, endVertex) {
        function heuristic(a, b) {
            return Math.abs(a.data.x - b.data.x) + Math.abs(a.data.y - b.data.y);
        }

        function reconstructPath(cameFrom, current) {
            const path = [current];
            while (cameFrom.has(current)) {
                current = cameFrom.get(current);
                path.push(current);
            }
            return path //.reverse();
        }

        const openSet = new Set([startVertex]);
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        gScore.set(startVertex, 0);
        fScore.set(startVertex, heuristic(startVertex, endVertex));

        while (openSet.size > 0) {
            // find node with lowest fScore
            let current = null;
            let lowestF = Infinity;

            for (const cell of openSet) {
                const f = fScore.get(cell) ?? Infinity;
                if (f < lowestF) {
                    lowestF = f;
                    current = cell;
                }
            }

            if (current === endVertex) {
                return reconstructPath(cameFrom, current);
            }

            openSet.delete(current);

            for (const edge of current.edgesOut) {
                const neighbor = edge.vertexEnd;

                // uniform cost = 1
                const tentativeG = (gScore.get(current) ?? Infinity) + edge.data.weight;

                if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeG);

                    const f = tentativeG + heuristic(neighbor, endVertex);
                    fScore.set(neighbor, f);

                    openSet.add(neighbor);
                }
            }
        }

        return null; // no path found
    }

    moveItemIntoHtmlCell(item, cell) {
        const wi = cell.offsetWidth/2
        const he = cell.offsetHeight/2
        const x = cell.offsetLeft - this.#view.offsetLeft
        const y = cell.offsetTop - this.#view.offsetTop
        item.style.transform = `translate(${x + wi/2}px, ${y + he/2}px)`
    }

    renderAsHtml(container) {
        this.#view = document.createElement('maze')
        this.#view.style.display = 'grid'
        this.#view.style.gridTemplate = `repeat(${this.height}, 1fr)/repeat(${this.width}, 1fr)`
        this.#view.addEventListener('click', e => this.htmlOnclick(e.target, e))

        container.appendChild(this.#view)

        let directions = ['Left', 'Top', 'Right', 'Bottom']
        for (let v of this.#graph) {
            let cell = document.createElement('cell')
            cell.id = v.id
            // cell.innerText = v.edgesIn.length
            cell.vertex = v
            for (let d of directions) {
                cell.style[`border${d}Style`] = 'solid'
                cell.style[`border${d}Width`] = '4px'
                cell.style[`padding${d}`] = '4px'
            }
            v.view = cell
            this.#view.appendChild(cell)
        }

        const cell = this.#view.firstChild
        this.#startCell = cell
        this.#player.view = document.createElement('div')
        this.#player.view.className = 'moving player'
        this.#player.view.style.transition = `transform ${0.0009*DURATION}s linear`

        const wi = cell.offsetWidth/2
        const he = cell.offsetHeight/2
        this.#player.view.style.width = wi+'px'
        this.#player.view.style.height = he+'px'
        this.moveItemIntoHtmlCell(this.#player.view, cell)
        this.#view.appendChild(this.#player.view)

        for (let ii=0; ii<ENEMY_COUNT; ii++) {
            const enemy = this.#enemies[ii]
            const view = document.createElement('div')
            enemy.view = view
            view.className = 'moving enemy'
            view.style.transition = `transform ${0.0009*enemy.duration}s linear`
            view.style.width = wi+'px'
            view.style.height = he+'px'
            this.#view.appendChild(view)
            this.moveItemIntoHtmlCell(view, enemy.vertex.view)
        }

        for (let e of this.#graph.edges) {
            const d = directions[e.data.direction]
            e.vertexStart.view.style[`border${d}Width`] = '0px'
            e.vertexStart.view.style[`padding${d}`] = '8px'
        }
        container.appendChild(this.#view)
    }

    animate(dt) {
        //cancelAnimationFrame(this.#rafId)
        if (this.#route.length > 0) {
            // if (!this.#lastTs) {
            //     this.#lastTs = ts
            // }
            this.#player.elapsed += dt //ts - this.#lastTs
            if (this.#player.elapsed >= this.#player.duration) {
                this.#player.elapsed -= this.#player.duration
                //this.#lastTs = ts
                this.#startCell = this.#route.pop().view
                const next = this.#startCell
                this.moveItemIntoHtmlCell(this.#player.view, next)
            }
            //this.#rafId = requestAnimationFrame(t => this.animate(t))
        // } else {
        //     this.#startCell = this.#endCell
        }
        for (let enemy of this.#enemies) {
            enemy.elapsed += dt
            if (enemy.elapsed >= enemy.duration) {
                enemy.elapsed -= enemy.duration

                const route = this.findAPath(enemy.vertex, this.#startCell.vertex)
                if (route) {
                    route.pop()
                    const next = route.pop()
                    if (next) {
                        enemy.vertex = next
                        this.moveItemIntoHtmlCell(enemy.view, next.view)
                    }
                }

            }
        }
    }

    htmlOnclick(cell, e) {
        if (cell.tagName.toLowerCase() == 'cell') {
            this.#endCell = cell
            //cancelAnimationFrame(this.#rafId)
            this.#route = this.findAPath(this.#startCell.vertex, this.#endCell.vertex)
        }
    }
}