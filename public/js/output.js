// Simulating storage for graph data

document.addEventListener('DOMContentLoaded', () => {
    const graphInfoDiv = document.getElementById('graph-info');

    const selectedModel = localStorage.getItem('selectedModel');
    const tspSol = JSON.parse(localStorage.getItem('tspSolution'));

    graphInfoDiv.innerHTML = `<h3>Selected Model:</h3> <p>${selectedModel}</p><br>

        <h3>Solution to TSP:</h3> <p><strong>Path</strong>: ${JSON.stringify(tspSol.path)}<br><strong>Objective Value</strong>: ${tspSol.cost}<br><strong>Convergence Rate</strong>: ${tspSol.convergence_rate}<br><strong>Time Elapsed</strong>: ${tspSol.time_elapsed}</p>`;

});
