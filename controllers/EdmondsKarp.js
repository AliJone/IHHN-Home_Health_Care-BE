class EdmondsKarp {
    constructor(numOfVertices) {
        this.n = numOfVertices;
        this.flow = Array.from({ length: numOfVertices }, () => Array(numOfVertices).fill(0));
        this.capacity = Array.from({ length: numOfVertices }, () => Array(numOfVertices).fill(0));
        this.parent = Array(numOfVertices).fill(-1);
        this.visited = Array(numOfVertices).fill(false);
    }

    addEdge(from, to, capacity) {
        this.capacity[from][to] += capacity;
    }

    getMaxFlow(source, sink) {
        let totalFlow = 0;
        while (this.bfs(source, sink)) {
            let pathFlow = Infinity;
            for (let v = sink; v !== source; v = this.parent[v]) {
                let u = this.parent[v];
                pathFlow = Math.min(pathFlow, this.capacity[u][v] - this.flow[u][v]);
            }
            for (let v = sink; v !== source; v = this.parent[v]) {
                let u = this.parent[v];
                this.flow[u][v] += pathFlow;
                this.flow[v][u] -= pathFlow;
            }
            totalFlow += pathFlow;
        }
        return totalFlow;
    }

    bfs(source, sink) {
        this.visited.fill(false);
        let queue = [source];
        this.visited[source] = true;
        this.parent.fill(-1);

        while (queue.length > 0) {
            let current = queue.shift();
            for (let next = 0; next < this.n; next++) {
                if (!this.visited[next] && this.capacity[current][next] - this.flow[current][next] > 0) {
                    queue.push(next);
                    this.visited[next] = true;
                    this.parent[next] = current;
                    if (next === sink) return true;
                }
            }
        }
        return false;
    }
}

module.exports = EdmondsKarp;
