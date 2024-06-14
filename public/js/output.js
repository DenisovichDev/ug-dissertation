// Simulating storage for graph data
let graphData = '';

// Simulate the /get-graph endpoint
const getGraph = () => {
    return new Promise((resolve, reject) => {
        resolve({ success: true, graphData: graphData });
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const graphInfoDiv = document.getElementById('graph-info');

    getGraph()
        .then(response => {
            if (response.success) {
                const graphData = response.graphData;
                const selectedModel = localStorage.getItem('selectedModel');
                graphInfoDiv.innerHTML = `<p><strong>Graph Data:</strong> ${graphData}</p><p><strong>Selected Model:</strong> ${selectedModel}</p>`;
            } else {
                graphInfoDiv.innerHTML = `<p>Error retrieving graph data</p>`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});
