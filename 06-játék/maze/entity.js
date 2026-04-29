export default class Entity {
    x
    y
    vertex
    elapsed
    duration
    #route

    constructor(x, y, vertex, duration) {
        this.x = x
        this.y = y
        this.vertex = vertex
        this.duration = duration
        this.elapsed = 0
    }
    
    findAPath(startVertex, endVertex) {
        function heuristic(a, b) {
            return Math.abs(a.data.x - b.data.x) + Math.abs(a.data.y - b.data.y);
        }

        this.#route = []

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
                this.#route = [current]
                while (cameFrom.has(current)) {
                    current = cameFrom.get(current)
                    this.#route.push(current)
                }
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

        return null
    }

    move(dt) {
        throw new Error('Not implemented!')
    }
}