// Retrieve data from localStorage or initialize as an empty array
const sleepData = JSON.parse(localStorage.getItem('sleepData')) || [];

// Function to update the table and average sleep
function updateUI() {
    const tbody = document.querySelector('#sleepTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    sleepData.forEach(entry => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${entry.date}</td><td>${entry.hours}</td>`;
        tbody.appendChild(newRow);
    });

    // Update average sleep
    if (sleepData.length > 0) {
        const averageSleep = sleepData.reduce((sum, entry) => sum + entry.hours, 0) / sleepData.length;
        document.getElementById('averageSleep').innerText = `Average Sleep: ${averageSleep.toFixed(2)} hours`;
    } else {
        document.getElementById('averageSleep').innerText = 'Average Sleep: 0 hours';
    }
}

// Initialize UI on page load
updateUI();

document.getElementById('increaseBtn').addEventListener('click', () => {
    const sleepInput = document.getElementById('sleepInput');
    let currentValue = parseFloat(sleepInput.value) || 0;
    sleepInput.value = currentValue + 1;
});

document.getElementById('decreaseBtn').addEventListener('click', () => {
    const sleepInput = document.getElementById('sleepInput');
    let currentValue = parseFloat(sleepInput.value) || 0;
    if (currentValue > 0) {
        sleepInput.value = currentValue - 1;
    }
});

document.getElementById('submitBtn').addEventListener('click', () => {
    const sleepInput = document.getElementById('sleepInput');
    const hours = parseFloat(sleepInput.value);
    if (isNaN(hours) || hours <= 0) {
        alert('Please enter a valid number of hours.');
        return;
    }

    const date = new Date().toLocaleDateString();
    sleepData.push({ date, hours });

    // Save data to localStorage
    localStorage.setItem('sleepData', JSON.stringify(sleepData));

    // Update UI
    updateUI();

    // Clear input field
    sleepInput.value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    // Clear the data from localStorage
    localStorage.removeItem('sleepData');
    
    // Reset the sleepData array
    sleepData.length = 0;

    // Update UI
    updateUI();
});
