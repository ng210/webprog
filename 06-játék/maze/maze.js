import { GrpEdge, GrpVertex, Graph } from "../../lib/graph.js"

export default class Maze extends Graph {
    width
    height
    #view
    #graph

    #route = []
    #selectPhase = 0
    #startCell
    #endCell

    #player = null

    static get observedAttributes() {
        return ['x', 'y', 'data'];
    }

    constructor(width, height) {
        super()
        this.width = width
        this.height = height
        this.generate()
    }

    generate(rand = 0.0) {
        this.#graph = new Graph()
        let current, left, topRow = new Array(this.width)
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                current = this.#graph.addVertex({ x: i, y: j })
                if (i > 0) {
                    const edge = this.#graph.addEdge(current, left, { direction: 0, weight: 1})
                    edge.reverse = this.#graph.addEdge(left, current, { direction: 2, weight: 1})
                    edge.reverse.reverse = edge
                }
                if (j > 0) {
                    const edge = this.#graph.addEdge(current, topRow[i], { direction: 1, weight: 1})
                    edge.reverse = this.#graph.addEdge(topRow[i], current, { direction: 3, weight: 1})
                    edge.reverse.reverse = edge
                }
                left = current
                topRow[i] = current
            }
        }

        for (const vi of this.#graph.vertices) {
            const ei = Math.trunc(vi.edgesOut.length * Math.random())
            const edge1 = vi.edgesOut[ei]
            const edge2 = edge1.reverse
            const wi = edge1.data.weight
            edge1.data.weight = Infinity
            edge2.data.weight = Infinity
            if (this.findAPath(edge1.vertexStart, edge1.vertexEnd)) {
                this.#graph.removeEdge(edge1)
                this.#graph.removeEdge(edge2)
            } else {
                edge1.data.weight = wi
                edge2.data.weight = wi
            }
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
        this.#player = document.createElement('div')
        this.#player.className = 'player'
        this.#player.style.position = 'absolute'
        this.#player.style.backgroundColor = 'red'

        const size = cell.clientWidth
        this.#player.style.width = (size>>1)+'px'
        this.#player.style.height = (size>>1)+'px'
        this.#player.style.transform = `translate(${size>>2}px, ${size>>2}px)`
        this.#view.appendChild(this.#player)

        for (let e of this.#graph.edges) {
            const d = directions[e.data.direction]
            e.vertexStart.view.style[`border${d}Width`] = '0px'
            e.vertexStart.view.style[`padding${d}`] = '8px'
        }
        container.appendChild(this.#view)
    }

    #lastTs
    #rafId
    animate(ts) {
        cancelAnimationFrame(this.#rafId)
        if (this.#route.length > 0) {
            if (!this.#lastTs) {
                this.#lastTs = ts
            }
            let elapsed = ts - this.#lastTs
            if (elapsed > 320) {
                elapsed -= 320
                this.#lastTs = ts
                this.#startCell = this.#route.pop()
                const next = this.#startCell.view
                const size = next.clientWidth
                const x = next.offsetLeft - this.#view.offsetLeft
                const y = next.offsetTop - this.#view.offsetTop
                this.#player.style.transform = `translate(${x + (size>>2)}px, ${y + (size>>2)}px)`
            }
            requestAnimationFrame(t => this.animate(t))
        } else {
            this.#startCell = this.#endCell
        }
    }

    htmlOnclick(cell, e) {
        if (cell.tagName.toLowerCase() == 'cell') {
            this.#endCell = cell
            this.#route = this.findAPath(this.#startCell.vertex, this.#endCell.vertex)
            if (this.#route) {
                this.#rafId = requestAnimationFrame(ts => this.animate(ts))
            }
        }
    }
}