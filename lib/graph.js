class GrpVertex {
    id
    data = null
    flag = 0
    edgesIn = []
    edgesOut = []

    constructor(id, data) {
        this.id = id
        this.data = data
    }
}

class GrpEdge {
    id
    data = null
    vertexStart = null
    vertexEnd = null

    constructor(id, v1, v2, data) {
        this.id = id
        this.data = data
        this.vertexStart = v1
        this.vertexEnd = v2
    }
}

class Graph {
    #vertexId = 0
    #edgeId = 0
    #vertexCtor = GrpVertex
    #edgeCtor = GrpEdge

    #vertices = []
    #edges = []

    get vertices() {
        return this.#vertices
    }
    get edges() {
        return this.#edges.values()
    }

    constructor(vertexCtor, edgeCtor) {
        this.#vertexCtor = vertexCtor ?? GrpVertex
        this.#edgeCtor = edgeCtor ?? GrpEdge
    }

    addVertex(data = null) {
        const vertex = Reflect.construct(this.#vertexCtor, ['v' + String(this.#vertexId++).padStart(6, '0'), data])
        this.#vertices.push(vertex)
        return vertex
    }

    addEdge(v1, v2, data = null) {
        const edge = Reflect.construct(this.#edgeCtor, ['e' + String(this.#edgeId++).padStart(6, '0'), v1, v2, data])
        this.#edges.push(edge)
        v1.edgesOut.push(edge)
        v2.edgesIn.push(edge)
        return edge
    }
    removeEdge(edge) {
        const ei = this.#edges.findIndex(e => e == edge)
        if (ei != -1) {
            this.#edges[ei] = this.#edges.pop()
        }
    }

    defaultVertexHandler(vertex, graph) {
        console.log(vertex.id)
        return true
    }

    defaultEdgeHandler(edge, graph) {
        console.log(`${edge.id}:${edge.vertexStart.id}=>${edge.vertexEnd.id}`)
        return true
    }

    [Symbol.iterator]() {
        let ix = 0
        const data = this.#vertices

        return {
            next() {
                if (ix < data.length) {
                    return { value: data[ix++], done: false }
                }
                return { done: true };
            }
        }
    }

    dfs(start, onEnter, onLeave, onTraverse) {
        onEnter = onEnter ?? this.defaultVertexHandler
        onLeave = onLeave ?? this.defaultVertexHandler
        onTraverse = onTraverse ?? this.defaultEdgeHandler
        const visited = [{ vertex: start, edgeId: 0 }]

        let current = null
        while (visited.length > 0) {
            current = visited[visited.length - 1]
            onEnter(current.vertex, this)
            let allVisited = true
            while (current.edgeId < current.vertex.edgesOut.length) {
                const edge = current.vertex.edgesOut[current.edgeId++]
                if ((edge.vertexEnd.flag & 0x01) == 0x01) continue

                allVisited = false
                onLeave(current.vertex, this)
                onTraverse(edge, this)
                visited.push({ vertex: edge.vertexEnd, edgeId: 0 })
            }
            if (allVisited) {
                visited.pop()
            }
        }
    }
}

export { GrpEdge, GrpVertex, Graph }