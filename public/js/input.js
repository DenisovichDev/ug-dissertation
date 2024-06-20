const graphForm = document.getElementById('graph-form');
const graphInputEl = document.getElementById('graph-input');
const nodeInputEl = document.getElementById('node-input');
const typeInputEl = document.getElementById('check-input');

// For default values
graphInputEl.value = "[[3, 9, 86], [7, 9, 55], [8, 6, 18], [7, 4, 77], [8, 2, 48], [1, 7, 43], [1, 4, 44], [4, 8, 16], [6, 1, 19], [4, 2, 82], [6, 9, 96], [4, 6, 9], [8, 4, 56], [3, 1, 25], [1, 3, 29], [5, 6, 49], [0, 3, 35], [7, 2, 20], [8, 0, 15], [2, 6, 64], [5, 8, 79], [7, 0, 77], [0, 9, 14], [3, 2, 35], [1, 5, 59], [9, 1, 71], [3, 5, 61], [9, 8, 39], [6, 8, 3], [1, 8, 23], [5, 4, 19], [6, 0, 72], [1, 6, 14], [2, 7, 3], [9, 0, 65], [5, 3, 32], [7, 8, 85], [2, 4, 59], [2, 5, 97], [0, 1, 99], [2, 0, 55], [3, 6, 85], [3, 8, 91], [5, 7, 47], [0, 2, 42], [0, 8, 67], [9, 3, 38], [7, 6, 99], [7, 1, 66], [0, 5, 34], [3, 7, 94], [9, 5, 77], [6, 7, 66], [0, 4, 19], [2, 3, 30], [1, 9, 28], [6, 4, 30], [8, 1, 100], [6, 3, 7], [5, 1, 87], [3, 0, 100], [6, 5, 77], [4, 0, 27], [8, 9, 31], [3, 4, 70], [9, 7, 3], [5, 9, 63], [8, 5, 54], [4, 7, 13], [4, 9, 50], [6, 2, 19], [5, 2, 96], [4, 5, 46], [4, 1, 94], [0, 7, 19], [2, 9, 23], [1, 2, 75], [7, 3, 99], [9, 2, 66], [5, 0, 55], [9, 6, 66], [2, 8, 26], [9, 4, 4], [2, 1, 59], [8, 3, 72], [0, 6, 27], [4, 3, 98], [1, 0, 100], [8, 7, 42], [7, 5, 76]]";
nodeInputEl.value = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]";


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

