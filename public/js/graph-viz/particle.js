class Particle extends VerletParticle2D {
    constructor(x, y, r, n) {
        super(x, y);
        this.r = r;
        this.n = n;
    }

    show() {
        fill(190);
        stroke(0);
        circle(this.x, this.y, this.r * 2);
        textSize(10);
        fill(0);
        noStroke();
        text(this.n, this.x - 3, this.y + 4);
    }
}

