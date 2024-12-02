// Select elements
const firstRowElements = document.querySelectorAll('.first-row');
const secondRowElements = document.querySelectorAll('.second-row');
const thirdRowElements = document.querySelectorAll('.third-row');
const subtitleText = document.getElementById('subtitleText');
const startButton = document.querySelector('#start-button');

// Game state variables
let isRunning = false;
let canClick = false;
let startTime = 0;

// Reset all rows to the default state
function resetGame() {
    [firstRowElements, secondRowElements, thirdRowElements].forEach(row =>
        lightUpRow(row, 'primary-light')
    );
}

// Update a row's classes for lighting up with a specific color
function lightUpRow(row, color = 'bg-red') {
    row.forEach(element => {
        element.classList.remove('primary-light', 'bg-red', 'bg-green'); // Remove any existing conflicting classes
        element.classList.add(color); // Apply the new color, selected color
    });
}

// Start the game
function startGame() {
    if (isRunning) return;

    isRunning = true;
    resetGame();

    // Iterate over these times to light all up
    const delayTimes = [1000, 2000, 2000 + Math.floor(Math.random() * 2000) + 1000];

    // Light up rows sequentially
    setTimeout(() => lightUpRow(firstRowElements), delayTimes[0]);
    setTimeout(() => lightUpRow(secondRowElements), delayTimes[1]);
    setTimeout(() => {
        lightUpRow(thirdRowElements, 'bg-green');
        startTime = Date.now();
        canClick = true;
    }, delayTimes[2]);
}

// Handle the player's click
function handleMouseClick() {
    if (!isRunning || !canClick) return;

    const reflexTime = Date.now() - startTime;
    subtitleText.textContent = `Your time: ${reflexTime}ms`;

    resetGame();
    isRunning = false;
    canClick = false;
}

// Event listeners
startButton.addEventListener('click', startGame);
document.addEventListener('mousedown', handleMouseClick);
