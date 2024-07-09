document.getElementById('uploadBtn').addEventListener('click', async () => {
    const nodesFile = document.getElementById('nodesFile').files[0];
    const elementsFile = document.getElementById('elementsFile').files[0];
    const synapticMatrixFile = document.getElementById('synapticMatrixFile').files[0];

    const formData = new FormData();
    formData.append('nodes', nodesFile);
    formData.append('elements', elementsFile);
    formData.append('synaptic_matrix', synapticMatrixFile);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            updatePlot(0); // Plot initial state after upload
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error uploading files:', error);
    }
});

document.getElementById('timestepRange').addEventListener('input', (event) => {
    const timestep = event.target.value;
    updatePlot(timestep);
});

async function updatePlot(timestep) {
    try {
        const response = await fetch(`/plot?timestep=${timestep}`);
        if (response.ok) {
            const plotUrl = await response.json();
            document.getElementById('plotImage').src = plotUrl.url;
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error fetching plot:', error);
    }
}
