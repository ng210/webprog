import { GrpEdge, GrpVertex, Graph } from "./graph.js"

export default class Maze extends Graph {
    width
    height
    #graph

    constructor(width, height) {
        this.width = width
        this.height = height
        this.generate()
    }

    generate() {
        this.#graph = new Graph()
        for (let j=0; j<this.height; j++) {
            for (let i=0; i<this.height; i++) {
                this.#graph.addVertex({x:i, y:j})
            }
        }
    }

    renderAsHtml(container) {
        for (let v of this.#graph) {
            console.log(v.id)
        }
    }
}