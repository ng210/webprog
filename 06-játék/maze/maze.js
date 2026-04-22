import { GrpEdge, GrpVertex, Graph } from "./graph.js"

export default class Maze extends Graph {
    width
    height

    constructor(width, height) {
        this.width = width
        this.height = height
        this.generate()
    }

    generate() {

    }
}