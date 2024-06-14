const graphForm = document.getElementById('graph-form');
const graphInputEl = document.getElementById('graph-input');
const nodeInputEl = document.getElementById('node-input');
const typeInputEl = document.getElementById('check-input');

// For default values
graphInputEl.value = "[[2, 1, 61], [7, 1, 23], [1, 5, 71], [7, 1, 38], [4, 1, 66], [7, 8, 55], [7, 3, 10], [8, 7, 31], [5, 9, 79], [3, 1, 74], [6, 8, 48], [9, 0, 31], [0, 3, 62], [9, 8, 62], [4, 6, 60], [4, 0, 26], [9, 7, 48], [3, 7, 19], [9, 0, 79], [8, 5, 17]]";
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

