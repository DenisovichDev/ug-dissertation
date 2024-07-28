// Simulating storage for graph data

document.addEventListener('DOMContentLoaded', () => {
    const graphInfoDiv = document.getElementById('graph-info');

    const selectedModel = localStorage.getItem('selectedModel');
    const tspSol = JSON.parse(localStorage.getItem('tspSolution'));

    graphInfoDiv.innerHTML = `<h3>Selected Model:</h3> <p>${selectedModel}</p><br>

        <h3>Solution to TSP:</h3> <p><strong>Path</strong>: ${JSON.stringify(tspSol.path)}<br><strong>Cost</strong>: ${tspSol.cost}</p>`;

});
