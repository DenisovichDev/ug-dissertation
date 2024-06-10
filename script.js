document.addEventListener('DOMContentLoaded', () => {
    const graphForm = document.getElementById('graph-form');
    const modelForm = document.getElementById('model-form');

    // Simulating storage for graph data
    let graphData = '';

    // Simulate the /save-graph endpoint
    const saveGraph = (data) => {
        return new Promise((resolve, reject) => {
            graphData = data.graphData;
            resolve({ success: true });
        });
    };

    // Simulate the /get-graph endpoint
    const getGraph = () => {
        return new Promise((resolve, reject) => {
            resolve({ success: true, graphData: graphData });
        });
    };

    if (graphForm) {
        graphForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const graphInput = document.getElementById('graph-input').value;

            saveGraph({ graphData: graphInput })
                .then(response => {
                    if (response.success) {
                        window.location.href = 'model-selection.html';
                    } else {
                        alert('Error saving graph data');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }

    if (modelForm) {
        modelForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedModel = document.getElementById('model-select').value;
            localStorage.setItem('selectedModel', selectedModel);
            window.location.href = 'show-graph.html';
        });
    }

    const graphInfoDiv = document.getElementById('graph-info');
    if (graphInfoDiv) {
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
    }
});

