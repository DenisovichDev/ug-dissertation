const modelForm = document.getElementById('model-form');

modelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedModel = document.getElementById('model-select').value;
    localStorage.setItem('selectedModel', selectedModel);
    window.location.href = '/public/graph-output/index.html';
});

