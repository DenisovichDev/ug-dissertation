class Cluster {
  // We initialize a Cluster with a number of nodes, a diameter, and centerpoint
  constructor(n, length) {
    // A cluster is a grouping of nodes
    this.particles = [];

    // Create the nodes
    for (let i = 0; i < n; i++) {
      // We can't put them right on top of each other
      let x = width / 2 + random(-50, 50);
      let y = height / 2 + random(-50, 50);
      let vn = floor(random(n+1));
      this.particles.push(new Particle(x, y, 10, vn));
    }

    // Connect all the nodes with a Spring
    for (let i = 0; i < this.particles.length - 1; i++) {
      let particle_i = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        let particle_j = this.particles[j];
        // A Spring needs two particles, a resting length, and a strength
          if (random() > 0.5) {
              physics.addSpring(new VerletSpring2D(particle_i, particle_j, length, 0.01));
          }
      }
    }
  }

  show() {
    // Show all the nodes
    for (let n of this.particles) {
      n.show();
    }
  }

  // Draw all the internal connections
  showConnections() {
    stroke(0, 150);
    strokeWeight(2);
    for (let i = 0; i < this.particles.length - 1; i++) {
      let pi = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        let pj = this.particles[j];
        line(pi.x, pi.y, pj.x, pj.y);
      }
    }
  }
}

