const graphForm = document.getElementById('graph-form');


graphForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const graphInput = document.getElementById('graph-input').value;
    const nodeInput = document.getElementById('node-input').value;
    const typeInput = document.getElementById('check-input').value;

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

