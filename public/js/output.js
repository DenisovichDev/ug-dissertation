// Simulating storage for graph data

document.addEventListener('DOMContentLoaded', () => {
    const graphInfoDiv = document.getElementById('graph-info');

    const selectedModel = localStorage.getItem('selectedModel');
    const tspSol = JSON.parse(localStorage.getItem('tspSolution'));

    graphInfoDiv.innerHTML = `<strong>Selected Model:</strong> <p>${selectedModel}</p><br>

        <strong>Solution to TSP:</strong> <p>Path: ${JSON.stringify(tspSol.path)}<br>Cost: ${tspSol.cost}</p>`;

});
