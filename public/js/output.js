// Simulating storage for graph data

document.addEventListener('DOMContentLoaded', () => {
    const graphInfoDiv = document.getElementById('graph-info');

    const selectedModel = localStorage.getItem('selectedModel');
    graphInfoDiv.innerHTML = `<strong>Selected Model:</strong> ${selectedModel}</p>`;

});
