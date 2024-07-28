const ACO_URL = "http://127.0.0.1:8000/aco";
const GA_URL = "http://127.0.0.1:8000/ga";

const modelSelect = document.getElementById('model-select');
const acoForm = document.getElementById('aco-form');

modelSelect.addEventListener('change', () => {
    if (modelSelect.value === 'aco') {
        acoForm.classList.remove('hidden');
    } else {
        acoForm.classList.add('hidden');
    }
});

const modelForm = document.getElementById('model-form');

modelForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedModel = modelSelect.value;

    if (selectedModel === 'aco') {
        const formData = {
            n_ants: JSON.parse(document.getElementById('n_ants').value),
            n_best: JSON.parse(document.getElementById('n_best').value),
            n_iterations: JSON.parse(document.getElementById('n_iterations').value),
            decay: JSON.parse(document.getElementById('decay').value),
            alpha: JSON.parse(document.getElementById('alpha').value),
            beta: JSON.parse(document.getElementById('beta').value)
        };
        localStorage.setItem('acoParams', JSON.stringify(formData));
        localStorage.setItem('selectedModel', 'Ant Colony Optimization');


        // Retrieve graph data from localStorage
        const graphData = JSON.parse(localStorage.getItem('graphData'));

        // Combine graph and params data
        const postData = {
            graph: {
                nodes: graphData.nodes,
                edges: graphData.graph,  // Assuming graphData.graph contains edges in the correct format
                check: graphData.type
            },
            params: formData
        };
        console.log(JSON.stringify(postData));

        // Send POST request to the /aco endpoint
        try {
            const responseData = await makePostRequest(ACO_URL, postData);
            localStorage.setItem('tspSolution', JSON.stringify(responseData))
            console.log('Success:', responseData);
            window.location.href = '/public/graph-output';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    window.location.href = '/public/graph-output';



});

