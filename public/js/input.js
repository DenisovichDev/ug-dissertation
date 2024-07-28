const graphForm = document.getElementById('graph-form');
const graphInputEl = document.getElementById('graph-input');
const nodeInputEl = document.getElementById('node-input');
const typeInputEl = document.getElementById('check-input');

// For default values
graphInputEl.value = "[[2, 5, 41], [12, 19, 12], [4, 10, 2], [4, 15, 53], [6, 7, 79], [2, 8, 85], [4, 8, 23], [2, 12, 55], [6, 12, 65], [5, 9, 92], [8, 11, 78], [1, 5, 55], [1, 4, 35], [2, 17, 17], [11, 12, 43], [18, 19, 78], [4, 11, 33], [0, 18, 79], [13, 19, 37], [10, 18, 59], [10, 12, 73], [8, 10, 54], [3, 9, 45], [0, 5, 60], [15, 18, 14], [10, 16, 70], [15, 17, 24], [8, 9, 55], [0, 12, 47], [1, 7, 54], [5, 15, 45], [8, 17, 86], [16, 19, 58], [3, 5, 77], [4, 9, 26], [5, 19, 79], [4, 13, 17], [14, 19, 13], [3, 13, 47], [3, 7, 40], [13, 15, 53], [10, 13, 55], [4, 14, 79], [9, 13, 100], [1, 9, 29], [11, 15, 73], [1, 8, 39], [13, 14, 54], [15, 19, 81], [10, 19, 37], [0, 4, 47], [4, 6, 13], [9, 17, 33], [6, 14, 90], [0, 11, 34], [1, 10, 39], [0, 1, 97], [8, 15, 2], [2, 14, 33], [2, 9, 28], [0, 15, 95], [1, 3, 54], [3, 19, 74], [2, 19, 32], [12, 13, 46], [11, 19, 54], [5, 12, 53], [9, 12, 48], [7, 18, 16], [7, 10, 12], [6, 15, 75], [3, 11, 5], [9, 10, 14], [8, 18, 9], [3, 8, 27], [5, 7, 38], [6, 18, 25], [4, 12, 95], [14, 17, 92], [16, 17, 94], [1, 11, 39], [5, 11, 72], [4, 18, 37], [7, 19, 87], [3, 18, 65], [0, 9, 11], [4, 5, 92], [6, 17, 1], [0, 6, 51], [0, 3, 43], [10, 15, 46], [0, 13, 20], [2, 3, 83], [6, 9, 70], [12, 17, 45], [9, 19, 92], [3, 15, 7], [5, 17, 81], [9, 18, 41], [2, 10, 24], [5, 10, 42], [8, 13, 17], [2, 18, 71], [13, 18, 76], [1, 2, 23], [3, 4, 22], [5, 6, 59], [1, 19, 20], [3, 6, 80], [6, 11, 27], [7, 9, 17], [0, 19, 62], [11, 17, 63], [0, 17, 19], [6, 10, 3], [2, 11, 98], [7, 12, 52], [4, 19, 49], [14, 16, 33], [1, 18, 15], [1, 12, 29], [12, 15, 43], [5, 14, 50], [0, 10, 34], [3, 17, 100], [10, 11, 25], [11, 14, 94], [9, 11, 94], [1, 16, 26], [4, 16, 16], [5, 13, 97], [13, 17, 57], [8, 12, 68], [2, 13, 48], [3, 12, 33], [14, 15, 21], [5, 8, 66], [6, 8, 16], [4, 17, 93], [17, 19, 16], [10, 17, 15], [8, 19, 3], [15, 16, 79], [5, 16, 79], [1, 14, 58], [6, 19, 83], [11, 13, 54], [11, 16, 50], [0, 8, 23], [1, 15, 4], [7, 16, 99], [9, 15, 78], [2, 16, 73], [3, 14, 26], [7, 13, 60], [13, 16, 87], [17, 18, 28], [12, 18, 39], [7, 14, 13], [0, 7, 42], [9, 14, 15], [0, 14, 2], [1, 17, 77], [2, 6, 28], [7, 8, 36], [2, 7, 91], [7, 11, 96], [6, 16, 40], [5, 18, 54], [9, 16, 85], [16, 18, 90], [1, 13, 98], [7, 17, 66], [0, 2, 27], [4, 7, 47], [10, 14, 30], [14, 18, 85], [11, 18, 9], [3, 16, 16], [7, 15, 50], [12, 16, 93], [8, 16, 45], [6, 13, 53], [12, 14, 59], [1, 6, 95], [2, 15, 79], [3, 10, 24], [8, 14, 29], [2, 4, 67], [0, 16, 65]]";
nodeInputEl.value = "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]";


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

