// convergence_chart.js

// Function to create the convergence chart
function createConvergenceChart() {
    // Retrieve the 'tspSolution' item from local storage
    const tspSolution = JSON.parse(localStorage.getItem('tspSolution'));

    // Extract convergence data from the tspSolution
    const convergenceData = tspSolution.convergence_data;

    // Prepare the data for the chart
    const labels = convergenceData.map((_, index) => index + 1);
    const data = convergenceData.map(item => item[1]); // Assuming each tuple is [generation, value]

    // Get the context of the canvas element we want to select
    const ctx = document.getElementById('convergenceChart').getContext('2d');

    // Create the chart
    const convergenceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Objective Value',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Generation'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Objective Value'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Convergence Chart'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Generation: ${tooltipItem.label}, Objective Value: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}

// Call the function to create the chart when the window loads
window.onload = function() {
    createConvergenceChart();
};

