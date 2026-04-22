class GrpVertex {
    id
    data = null
    edgesIn = []
    edgesOut = []

    constructor(id, data) {
        this.id = id
        this.data = data
    }
}

class GrpEdge {
    id
    inVertex = null
    outVertex = null

    constructor(id, v1, v2) {
        this.id = id
        this.inVertex = v1
        this.inVertex = v2
    }
}

class Graph {
    #vertices = []
    #edges = []
    
    constructor() {

    }

    addVertex(data) {
        this.#vertices.push(new GrpVertex(data))
    }

    addEdge(v1, v2) {
        const edge = new GrpEdge(this.#edges.length, v1, v2)
        this.#edges.push(edge)
        v1.edgesOut.push(edge)
        v2.edgesIn.push(edge)
    }

    dfs(start, preHandler, postHandler, edgeHandler) {

    }
}

export { GrpEdge, GrpVertex, Graph }