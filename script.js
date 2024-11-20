let score = 0;
let timeUp = false; // Tracks whether the game is over
let lastHole;
let timer; // For countdown
let timeLeft = 30; // Total game time in seconds

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const startButton = document.querySelector('.button');

// Utility to generate a random time between min and max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Randomly select a hole (avoiding repetition)
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Show a mole for a random time and loop until the game ends
function peep() {
    const time = randomTime(500, 1300);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

// Start the game
function startGame() {
    if (timeUp) resetGame(); // Reset if the previous game was over
    score = 0;
    timeLeft = 30;
    timeUp = false;
    scoreBoard.textContent = score;

    startButton.disabled = true; // Disable start button during the game
    peep();
    startCountdown();

    setTimeout(() => {
        timeUp = true;
        startButton.disabled = false; // Enable start button after the game
        alert(`Game Over! Your final score is: ${score}`);
    }, timeLeft * 1000); // Game ends after 30 seconds
}

// Track the countdown timer
function startCountdown() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.querySelector('.timer').textContent = `Time Left: ${timeLeft}s`;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

// Reset the game UI
function resetGame() {
    scoreBoard.textContent = "0";
    document.querySelector('.timer').textContent = `Time Left: 30s`;
}

// Handle mole hit
function bonk(e) {
    if (!e.isTrusted || !e.target.closest('.mole')) return; // Only valid clicks
    const hole = this.parentNode;
    if (!hole.classList.contains('up')) return; // Mole must be up to count
    score++;
    scoreBoard.textContent = score;
    hole.classList.remove('up'); // Hide the mole after a hit
}

// Event listeners for mole clicks
moles.forEach(mole => mole.addEventListener('click', bonk));

// Start button event
startButton.addEventListener('click', startGame);
