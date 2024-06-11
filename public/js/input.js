const graphForm = document.getElementById('graph-form');

// Simulating storage for graph data
let graphData = '';


// Simulate the /save-graph endpoint
const saveGraph = (data) => {
    return new Promise((resolve, reject) => {
        graphData = data.graphData;
        resolve({ success: true });
    });
};

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

