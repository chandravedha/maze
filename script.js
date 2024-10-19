
let timesPlayed = 0;
let timer;
let timeElapsed = 0;
let darkMode = false;

let playerX = 0;
let playerY = 0;
const moveAmount = 100; // Each cell is 100px x 100px
const gridWidth = 3;
const gridHeight = 3;

document.addEventListener("keydown", movePlayer);

function startGame() {
    const name = document.getElementById('playerName').value;
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById('welcome').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('displayName').innerText = name;
    timesPlayed++;
    document.getElementById('timesPlayed').innerText = timesPlayed;

    startTimer();
}

function startTimer() {
    timeElapsed = 0;
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').innerText = `Time: ${timeElapsed}s`;
    }, 1000);
}

function finishGame() {
    clearInterval(timer);
    const name = document.getElementById('displayName').innerText;

    // Display modal with results
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalTime').innerText = timeElapsed;
    document.getElementById('resultModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

function toggleMode() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

function movePlayer(event) {
    const player = document.getElementById('player');
    const maze = document.getElementById('maze');

    let newX = playerX;
    let newY = playerY;

    switch (event.key) {
        case "ArrowUp":
            if (playerY > 0) newY -= moveAmount;
            break;
        case "ArrowDown":
            if (playerY < (gridHeight - 1) * moveAmount) newY += moveAmount;
            break;
        case "ArrowLeft":
            if (playerX > 0) newX -= moveAmount;
            break;
        case "ArrowRight":
            if (playerX < (gridWidth - 1) * moveAmount) newX += moveAmount;
            break;
    }

    if (isValidMove(newX, newY)) {
        playerX = newX;
        playerY = newY;
        player.style.transform = `translate(${playerX}px, ${playerY}px)`;
    }

    // Check if player has reached the finish
    const finishCell = document.getElementById('finish');
    if (playerX === finishCell.offsetLeft && playerY === finishCell.offsetTop) {
        finishGame();
    }
}

function isValidMove(x, y) {
    const nextCell = document.elementFromPoint(x + 50, y + 50); // Check cell in the center of the player
    return nextCell && !nextCell.classList.contains('wall');
}
