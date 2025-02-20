// Game Variables
let credits = 100;
let betAmount = 0;
let betType = null; // 'high', 'mid', 'low'
let diceResults = [0, 0, 0];

// DOM Elements
const creditsDisplay = document.getElementById("credits");
const betAmountInput = document.getElementById("betAmount");
const placeBetButton = document.getElementById("placeBet");
const betHighButton = document.getElementById("betHigh");
const betMidButton = document.getElementById("betMid");
const betLowButton = document.getElementById("betLow");
const rollDiceButton = document.getElementById("rollDice");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const resultMessage = document.getElementById("resultMessage");

// Function to roll a single die (returns a random number between 1 and 6)
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to roll all three dice
// function rollDice() {
//     diceResults = [rollDie(), rollDie(), rollDie()];
//     dice1.src = `images/dice${diceResults[0]}.png`;
//     dice2.src = `images/dice${diceResults[1]}.png`;
//     dice3.src = `images/dice${diceResults[2]}.png`;
//     checkResult();
// }
// Function to roll all three dice with animation
function rollDice() {
    let rolls = 0;
    const maxRolls = 10; // Number of animation steps
    const interval = 100; // Time between each step (in milliseconds)

    const rollInterval = setInterval(() => {
        dice1.src = `images/dice${rollDie()}.png`;
        dice2.src = `images/dice${rollDie()}.png`;
        dice3.src = `images/dice${rollDie()}.png`;
        rolls++;

        if (rolls >= maxRolls) {
            clearInterval(rollInterval);
            diceResults = [rollDie(), rollDie(), rollDie()];
            dice1.src = `images/dice${diceResults[0]}.png`;
            dice2.src = `images/dice${diceResults[1]}.png`;
            dice3.src = `images/dice${diceResults[2]}.png`;
            checkResult();
        }
    }, interval);
}

// Function to check the result of the bet
function checkResult() {
    const sum = diceResults[0] + diceResults[1] + diceResults[2];
    let message = "";

    if (
        (betType === "high" && sum >= 12) ||
        (betType === "mid" && sum === 11) ||
        (betType === "low" && sum <= 10)
    ) {
        let reward = betAmount;
        if (betType === "mid") reward *= 5; // 5x reward for Mid
        credits += reward;
        message = `You won! Reward: ${reward}`;
    } else {
        credits -= betAmount;
        message = `You lost! Try again.`;
    }

    creditsDisplay.textContent = credits;
    resultMessage.textContent = message;
    resetGame();
}

// Function to reset the game state
function resetGame() {
    betAmount = 0;
    betType = null;
    betAmountInput.value = 10;
    rollDiceButton.disabled = true;
    placeBetButton.disabled = false;
    betHighButton.disabled = false;
    betMidButton.disabled = false;
    betLowButton.disabled = false;
}

// Event Listeners
placeBetButton.addEventListener("click", () => {
    betAmount = parseInt(betAmountInput.value);
    if (betAmount > credits) {
        alert("Not enough credits!");
        return;
    }
    placeBetButton.disabled = true;
    rollDiceButton.disabled = false;
});

betHighButton.addEventListener("click", () => {
    betType = "high";
    betHighButton.disabled = true;
    betMidButton.disabled = true;
    betLowButton.disabled = true;
});

betMidButton.addEventListener("click", () => {
    betType = "mid";
    betHighButton.disabled = true;
    betMidButton.disabled = true;
    betLowButton.disabled = true;
});

betLowButton.addEventListener("click", () => {
    betType = "low";
    betHighButton.disabled = true;
    betMidButton.disabled = true;
    betLowButton.disabled = true;
});

rollDiceButton.addEventListener("click", rollDice);