class Graph {
    // Takes in nodes (int[]), edges (int[][]), isDirected (bool)
    constructor(label, nodes, edges, isDirected, cpos, path, initParticlePos) {
        this.label = label;
        this.nodes = nodes;
        this.edges = edges;
        this.isDirected = isDirected;
        this.particles = [];
        this.springLen = 150
        this.cpos = cpos;
        this.path = path;
        this.initParticlePos = initParticlePos;

        // Create the nodes according the input
        if (!this.initParticlePos) {
            this.nodes.forEach((node) => {
                let x = this.cpos.x + random(-5, 5);
                let y = this.cpos.y + random(-5, 5);
                this.particles.push(new Particle(x, y, 10, node));
            });
        } else {
            this.nodes.forEach((node, idx) => {
                let x = this.cpos.x + this.initParticlePos[idx][0];
                let y = this.cpos.y + this.initParticlePos[idx][1];
                this.particles.push(new Particle(x, y, 10, node));
            });
        }
        // path regarding settings
        if (this.path) {
            this.curr = 0;
            console.log(this.curr);
        }

        // this.edges.forEach((edge) => {
        //     let p1 = this.particles[edge[0]];
        //     let p2 = this.particles[edge[1]];
        //     physics.addSpring(new VerletSpring2D(p1, p2, this.springLen, 0.01));
        // });
        // Connect all the nodes with a Spring
        for (let i = 0; i < this.particles.length - 1; i++) {
            let particle_i = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                let particle_j = this.particles[j];
                // A Spring needs two particles, a resting length, and a strength
                physics.addSpring(new VerletSpring2D(particle_i, particle_j, this.springLen, 0.002));
            }
        }
        
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
        strokeWeight(2);
        
        this.edges.forEach((edge) => {
            let p1 = this.particles[edge[0]];
            let p2 = this.particles[edge[1]];
            stroke(0, 150);
            if (this.path) {
                stroke(0, 50);
                const targetEdges = [[edge[0], edge[1]], [edge[1], edge[0]]];
                // checks if the is present in the path
                const containsAnyTarget = targetEdges.some(target =>
                    this.path.some(subArray =>
                        subArray.length === target.length && subArray.every((value, index) => value === target[index])
                    )
                );
                if (containsAnyTarget) {
                    stroke(255, 0, 0);
                }
            }
            line(p1.x, p1.y, p2.x, p2.y);
        });
    }

    showLabel() {
        this.lx = this.cpos.x;
        // y would be under the lowest node
        let lowestY = this.cpos.y
        this.particles.forEach((p) => {
            if (lowestY < p.y) {
                lowestY = p.y;
            }
        })
        this.ly = lowestY + 70;
        push();
        textSize(22);
        rectMode(CENTER);
        textAlign(CENTER);
        text(this.label, this.lx, this.ly, this.label.length * 15, 60);
        pop();
    }
    
    // Show TSP solution path
    showPath(refreshEvery) {
        if (this.path == null) return;
        if (frameCount % refreshEvery !== 0) return;
        // console.log(this.path);
        // this.particles[this.path[this
        this.particles[this.path[this.curr][0]].lit = false;
        this.curr++;
        if (this.curr >= this.path.length) {
            this.curr = 0;
        }
        this.particles[this.path[this.curr][0]].lit = true;

    }
}
