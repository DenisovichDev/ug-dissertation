let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

// Force directed graph,
// heavily based on: http://code.google.com/p/fidgen/

// Reference to physics world
let physics;
let cnv;

// A list of cluster objects
let cluster;

// Boolean that indicates whether we draw connections or not
let showPhysics = true;
let showParticles = true;

let solution, graphInfo;
let initParticlePos = [];

function preload() {
    tspSolution = JSON.parse(localStorage.getItem('tspSolution'));
    graphInfo = JSON.parse(localStorage.getItem('graphData'));

}

function setup() {
    cnv = createCanvas(w = 600, h = 600);
    cnv.id('graph-canvas');
    cnv.parent('graph-viz');

    // Initialize the physics
    physics = new VerletPhysics2D();

    // Spawn a new random graph
    // cluster = new Cluster(int(random(2, 20)), random(10, height / 2));

    // Initial particle (node) positions relative to the centre
    // So that both the graphs look the same
    graphInfo.nodes.forEach(() => {
        let x = random(-5, 5);
        let y = random(-5, 5);
        initParticlePos.push([x, y]);
    });

    // Make a graph
    ipGraph = new Graph("Input Graph", graphInfo.nodes, graphInfo.graph, graphInfo.type == 'u', { x: w / 2 - 150, y: h / 2}, null, initParticlePos);
    opGraph = new Graph("Solution to TSP", graphInfo.nodes, graphInfo.graph, graphInfo.type == 'u', { x: w / 2 + 150, y: h / 2}, tspSolution.path, initParticlePos);
}

function draw() {
    // Update the physics world
    physics.update();

    background(255);

    // if (frameCount % 120 == 0) {
    //     cluster = new Cluster(int(random(2, 20)), random(height / 3, height / 2));
    // }


    // If we want to see the physics
    if (showPhysics) {
        ipGraph.showConnections();
        opGraph.showConnections();
    }
    // Display all points
    if (showParticles) {
        ipGraph.show();
        opGraph.show();
        opGraph.showPath(40);
        ipGraph.showLabel();
        opGraph.showLabel();
    }
}

// Key press commands
function keyPressed() {
    if (key == "c") {
        showPhysics = !showPhysics;
    if (!showPhysics) showParticles = true;
    } else if (key == "p") {
        showParticles = !showParticles;
    if (!showParticles) showPhysics = true;
    } else if (key == "n") {
        physics.clear();
        // cluster = new Cluster(int(random(2, 20)), random(10, height / 2));
    }
}

