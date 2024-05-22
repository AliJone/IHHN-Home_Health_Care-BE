class EdmondsKarp {
    constructor(numOfVertices) {
        // Initialize the number of vertices
        this.n = numOfVertices;
        // Initialize flow and capacity matrices
        this.flow = Array.from({ length: numOfVertices }, () => Array(numOfVertices).fill(0));
        this.capacity = Array.from({ length: numOfVertices }, () => Array(numOfVertices).fill(0));
        // Initialize parent and visited arrays
        this.parent = Array(numOfVertices).fill(-1);
        this.visited = Array(numOfVertices).fill(false);
    }

    // Add an edge with a specified capacity
    addEdge(from, to, capacity) {
        this.capacity[from][to] += capacity;
    }

    // Find the maximum flow from source to sink
    getMaxFlow(source, sink) {
        let totalFlow = 0;
        // Perform BFS to find an augmenting path
        while (this.bfs(source, sink)) {
            let pathFlow = Infinity;
            // Find the maximum flow through the path found by BFS
            for (let v = sink; v !== source; v = this.parent[v]) {
                let u = this.parent[v];
                pathFlow = Math.min(pathFlow, this.capacity[u][v] - this.flow[u][v]);
            }
            // Update residual capacities of the edges and reverse edges along the path
            for (let v = sink; v !== source; v = this.parent[v]) {
                let u = this.parent[v];
                this.flow[u][v] += pathFlow;
                this.flow[v][u] -= pathFlow;
            }
            totalFlow += pathFlow;
        }
        return totalFlow;
    }

    // Perform BFS to find an augmenting path
    bfs(source, sink) {
        this.visited.fill(false);
        let queue = [source];
        this.visited[source] = true;
        this.parent.fill(-1);

        while (queue.length > 0) {
            let current = queue.shift();
            // Explore neighbors of the current vertex
            for (let next = 0; next < this.n; next++) {
                // Check if the vertex is not visited and has available capacity
                if (!this.visited[next] && this.capacity[current][next] - this.flow[current][next] > 0) {
                    queue.push(next);
                    this.visited[next] = true;
                    this.parent[next] = current;
                    // If we reached the sink, return true
                    if (next === sink) return true;
                }
            }
        }
        return false;
    }
}

module.exports = EdmondsKarp;
