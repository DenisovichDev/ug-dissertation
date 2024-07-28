const ACO_URL = "http://127.0.0.1:8000/aco";
const GA_URL = "http://127.0.0.1:8000/ga";
const PSO_URL = "http://127.0.0.1:8000/pso";
const SA_URL = "http://127.0.0.1:8000/sa";
const ABC_URL = "http://127.0.0.1:8000/abc";

const modelSelect = document.getElementById('model-select');
const acoForm = document.getElementById('aco-form');
const gaForm = document.getElementById('ga-form');
const psoForm = document.getElementById('pso-form');
const saForm = document.getElementById('sa-form');
const abcForm = document.getElementById('abc-form');
const loadingAnimation = document.querySelector('.loading')

modelSelect.addEventListener('change', () => {
    hideAllForms();
    switch (modelSelect.value) {
        case 'aco':
            acoForm.classList.remove('hidden');
            break;
        case 'ga':
            gaForm.classList.remove('hidden');
            break;
        case 'pso':
            psoForm.classList.remove('hidden');
            break;
        case 'sa':
            saForm.classList.remove('hidden');
            break;
        case 'abc':
            abcForm.classList.remove('hidden');
            break;
    }
});

const hideAllForms = () => {
    acoForm.classList.add('hidden');
    gaForm.classList.add('hidden');
    psoForm.classList.add('hidden');
    saForm.classList.add('hidden');
    abcForm.classList.add('hidden');
};

const modelForm = document.getElementById('model-form');

modelForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loadingAnimation.classList.remove('hidden');

    const selectedModel = modelSelect.value;

    // Retrieve graph data from localStorage
    const graphData = JSON.parse(localStorage.getItem('graphData'));

    if (!graphData) {
        console.error('Graph data not found in localStorage');
        return;
    }

    let postData = {
        graph: {
            nodes: graphData.nodes,
            edges: graphData.graph,  // Assuming graphData.graph contains edges in the correct format
            check: graphData.type
        },
        params: {}
    };

    try {
        let url = '';

        switch (selectedModel) {
            case 'aco':
                postData.params = {
                    n_ants: JSON.parse(document.getElementById('n_ants').value),
                    n_best: JSON.parse(document.getElementById('n_best').value),
                    n_iterations: JSON.parse(document.getElementById('n_iterations').value),
                    decay: JSON.parse(document.getElementById('decay').value),
                    alpha: JSON.parse(document.getElementById('alpha').value),
                    beta: JSON.parse(document.getElementById('beta').value)
                };
                url = ACO_URL;
                localStorage.setItem('selectedModel', 'Ant Colony Optimization');
                break;
            case 'ga':
                postData.params = {
                    population_size: JSON.parse(document.getElementById('population_size').value),
                    mutation_rate: JSON.parse(document.getElementById('mutation_rate').value),
                    n_generations: JSON.parse(document.getElementById('n_generations').value),
                    elitism_size: JSON.parse(document.getElementById('elitism_size').value)
                };
                url = GA_URL;
                localStorage.setItem('selectedModel', 'Genetic Algorithm');
                break;
            case 'pso':
                postData.params = {
                    n_particles: JSON.parse(document.getElementById('n_particles').value),
                    n_iterations: JSON.parse(document.getElementById('n_iterations_pso').value),
                    w: JSON.parse(document.getElementById('w').value),
                    c1: JSON.parse(document.getElementById('c1').value),
                    c2: JSON.parse(document.getElementById('c2').value)
                };
                url = PSO_URL;
                localStorage.setItem('selectedModel', 'Particle Swarm Optimization');
                break;
            case 'sa':
                postData.params = {
                    n_iterations: JSON.parse(document.getElementById('n_iterations_sa').value),
                    initial_temp: JSON.parse(document.getElementById('initial_temp').value),
                    cooling_rate: JSON.parse(document.getElementById('cooling_rate').value)
                };
                url = SA_URL;
                localStorage.setItem('selectedModel', 'Simulated Annealing');
                break;
            case 'abc':
                postData.params = {
                    n_bees: JSON.parse(document.getElementById('n_bees').value),
                    n_iterations: JSON.parse(document.getElementById('n_iterations_abc').value),
                    limit: JSON.parse(document.getElementById('limit').value)
                };
                url = ABC_URL;
                localStorage.setItem('selectedModel', 'Artificial Bee Colony');
                break;
            default:
                console.error('Invalid model selected');
                return;
        }

        const responseData = await makePostRequest(url, postData);
        loadingAnimation.classList.add('hidden');
        localStorage.setItem('tspSolution', JSON.stringify(responseData));
        window.location.href = '/public/graph-output';
    } catch (error) {
        console.error('Error:', error);
    }
});

