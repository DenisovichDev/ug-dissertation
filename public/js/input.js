const graphForm = document.getElementById('graph-form');
const graphInputEl = document.getElementById('graph-input');
const nodeInputEl = document.getElementById('node-input');
const typeInputEl = document.getElementById('check-input');

// For default values
graphInputEl.value = "[[0, 2, 93], [0, 12, 79], [2, 3, 61], [0, 7, 46], [4, 6, 80], [2, 6, 87], [5, 11, 34], [7, 9, 39], [3, 13, 70], [0, 6, 68], [3, 11, 33], [6, 12, 58], [4, 7, 72], [2, 7, 24], [5, 12, 1], [4, 5, 38], [1, 2, 95], [5, 13, 82], [8, 13, 9], [0, 10, 58], [3, 9, 1], [1, 4, 76], [6, 9, 46], [0, 3, 28], [6, 13, 77], [3, 5, 43], [1, 8, 76], [4, 11, 28], [10, 12, 13], [5, 8, 90], [8, 9, 4], [4, 8, 77], [11, 12, 3], [7, 8, 21], [5, 9, 91], [0, 8, 19], [7, 11, 99], [7, 12, 64], [5, 7, 84], [6, 7, 25], [4, 9, 78], [0, 4, 88], [2, 4, 34], [7, 10, 42], [4, 10, 88], [6, 11, 68], [12, 13, 2], [3, 8, 2], [1, 13, 30], [4, 12, 15], [9, 10, 16], [8, 10, 37], [1, 9, 90], [1, 12, 61], [9, 12, 61], [8, 11, 93], [4, 13, 64], [0, 11, 6], [1, 11, 98], [10, 13, 20], [5, 10, 99], [9, 11, 92], [2, 8, 93], [1, 5, 97], [7, 13, 35], [0, 13, 15], [2, 13, 46], [10, 11, 71], [1, 10, 4], [2, 12, 19], [3, 12, 42], [2, 5, 53], [0, 9, 47], [2, 10, 85], [0, 1, 27], [2, 9, 41], [3, 4, 74], [8, 12, 61], [6, 10, 80], [6, 8, 64], [3, 10, 47], [1, 7, 64], [1, 6, 38], [9, 13, 25], [0, 5, 8], [2, 11, 15], [5, 6, 24], [3, 7, 22], [3, 6, 8], [1, 3, 16], [11, 13, 67]]";
nodeInputEl.value = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]";


graphForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const graphInput = graphInputEl.value;
    const nodeInput = nodeInputEl.value;
    const typeInput = typeInputEl.value;

    const nodesArray = JSON.parse(nodeInput);
    const graphArray = JSON.parse(graphInput);

    const formData = {
        graph: graphArray,
        nodes: nodesArray,
        type: typeInput
    };


    console.log(formData);

    // Save the form data to local storage
    localStorage.setItem('graphData', JSON.stringify(formData));

    // Redirect to model selection page
    window.location.href = '/public/home/model-selection.html';

});

