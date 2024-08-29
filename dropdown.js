fetch('http://localhost:3000/makes')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('make');
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.make;
            option.textContent = item.make;
            selectElement.appendChild(option);
        });
    })
    .catch(err => console.error('Error fetching makes:', err));

document.getElementById('make').addEventListener('change', function () { // event listener detect selections
    const selectedMake = this.value;
    const modelDropdown = document.getElementById('model');

    modelDropdown.innerHTML = '<option value="">All models</option>'; // reset

    fetch(`http://localhost:3000/models?make=${selectedMake}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(models => {
            modelDropdown.innerHTML = '<option value="">All models</option>';
            models.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                modelDropdown.appendChild(option); // appending to selections
            });
        })
        .catch(error => console.error('Error fetching models:', error));
});

document.getElementById('model').addEventListener('change', function () { // logic is same as previous method
    const selectedMake = document.getElementById('make').value;
    const selectedModel = this.value;
    const yearDropdown = document.getElementById('year');

    yearDropdown.innerHTML = '<option value="">Any years</option>';

    fetch(`http://localhost:3000/years?make=${selectedMake}&model=${selectedModel}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(years => {
            yearDropdown.innerHTML = '<option value="">Any years</option>'; // reset
            years.forEach(item => {
                const option = document.createElement('option');
                option.value = item.year;
                option.textContent = item.year;
                yearDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching years:', error));
});

