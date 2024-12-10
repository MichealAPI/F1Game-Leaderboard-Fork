// Select elements
const subtitleText = document.getElementById('subtitleText');
const startButton = document.querySelector('#start-button');
const input = document.querySelector('#name-input');

// To light up each row
// Random 1 to 2 seconds delay in ms 
let delay = Math.floor(Math.random() * 1000) + 1000;

// Game state variables
let isRunning = false;
let canClick = false;
let startTime = 0;

// Reset all rows to the default state
function resetGame() {
    
    for (let i = 1; i <= numberOfLightCircles; i++) {
        lightUpRow(i, 'primary-light');
    }

}

// Update a row's classes for lighting up with a specific color
function lightUpRow(row, color = 'bg-red') {

    rowElements = document.querySelectorAll(`.row-${row}`);

    rowElements.forEach(element => {
        element.classList.remove('primary-light', 'bg-red', 'bg-green'); // Remove any existing conflicting classes
        element.classList.add(color); // Apply the new color, selected color
    });
    
}

// Start the game
function startGame() {

    if (isRunning) return;
    if (!checkName()) return;

    isRunning = true;
    resetGame();

    for (let i = 1; i <= numberOfLightCircles; i++) {

        if (i == numberOfLightCircles) {
            setTimeout(() => {
                lightUpRow(i, 'bg-green');
                startTime = Date.now();
                canClick = true;

                // Needed time + random time
            }, (i - 1) * delay + Math.floor(Math.random() * 2000) + 1000);
            break;
        }

        setTimeout(() => {
            lightUpRow(i);
        }, i * delay);
    }
}

// Handle the player's click
function handleMouseClick() {

    if (isRunning && !canClick) {
        alert('Early Start!');
    }

    if (!isRunning || !canClick) return;

    const reflexTime = Date.now() - startTime;
    subtitleText.textContent = `Your time: ${reflexTime}ms`;

    save(input.value, reflexTime);

    // Send the reflex time to the server


    resetGame();
    isRunning = false;
    canClick = false;
}


function checkName() {
    if (input.value === '') {
        alert('Please enter your name!');
        return false;
    }
    return true;
}

function save(name, reflexTime) {

    // Save to the server
    // https://mongoleaderboard-54b02eb48079.herokuapp.com/ranking/{id}/{time_ms}
    // POST request

    fetch(`https://mongoleaderboard-54b02eb48079.herokuapp.com/ranking/${name}/${reflexTime}`, {
        method: 'POST'
    })
}

// Event listeners
startButton.addEventListener('click', startGame);
document.addEventListener('mousedown', handleMouseClick);
