class Graph {
    // Takes in nodes (int[]), edges (int[][]), isDirected (bool)
    constructor(nodes, edges, isDirected) {
        this.nodes = nodes;
        this.edges = edges;
        this.isDirected = isDirected;
        this.particles = [];
        this.springLen = 150

        // Create the nodes according the input
        this.nodes.forEach((node) => {
            let x = width / 2 + random(- height / 4, height / 4);
            let y = height / 2 + random(- height / 4, height / 4);
            this.particles.push(new Particle(x, y, 10, node));
        });

        this.edges.forEach((edge) => {
            let p1 = this.particles[edge[0]];
            let p2 = this.particles[edge[1]];
            physics.addSpring(new VerletSpring2D(p1, p2, this.springLen, 0.01));
        });
    }

    // show all the nodes
    show() {
        this.particles.forEach((p) => {
            p.show();
        });
    }

    // show the connections
    // NOTE: Add directed
    showConnections() {
        stroke(0, 150);
        strokeWeight(2);
        
        this.edges.forEach((edge) => {
            let p1 = this.particles[edge[0]];
            let p2 = this.particles[edge[1]];
            line(p1.x, p1.y, p2.x, p2.y);
        });
    }
}
