const cardImages = [
    '8ball.png',
    'baseball.png',
    'basketball.png',
    'football.png',
    'world.png',
    'tennisball.png',
    'volleyball.png',
    'orange.png',
    'apple.png',
    'clock.png',
    'coin.png',
    'cookie.png',
    'pizza.png',
    'donut.png',
    'sun.png',
    'star.png'
];
const turnCounterElement = document.getElementById('turn-counter');
let turns = 0;

// Duplicate the card images to create pairs of cards
const cardImagesPairs = [...cardImages, ...cardImages];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(cardImagesPairs);

const memoryGame = document.querySelector('.memory-game');

let flippedCards = [];
let matches = 0;
let currentPlayer = 1;
const player1ScoreElement = document.querySelector('#player1 .score');
const player2ScoreElement = document.querySelector('#player2 .score');

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    highlightTheCurrentPlayer();
}

function createCard(image) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="cardInner">
                            <div class="cardFront"><img src="images/card.png" alt="Card Front"></div>
                            <div class="cardBack"><img src="images/${image}" alt="Card Back"></div>
                      </div>`;

    card.addEventListener('click', function () {
        if (!this.classList.contains('cardOpen') && flippedCards.length < 2) {
            this.classList.add('cardOpen');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    });

    return card;
}

function setupGame() {
    memoryGame.innerHTML = '';
    turns = 0;
    turnCounterElement.textContent = `Total Turns: ${turns}`;
    matches = 0;
    flippedCards = [];
    currentPlayer = 1;
    player1ScoreElement.textContent = '0';
    player2ScoreElement.textContent = '0';
    highlightTheCurrentPlayer();

    shuffleArray(cardImagesPairs);

    for (let image of cardImagesPairs) {
        const card = createCard(image);
        memoryGame.appendChild(card);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.cardBack img').src;
    const img2 = card2.querySelector('.cardBack img').src;
    turns++;
    turnCounterElement.textContent = `Total Turns: ${turns}`;

    if (img1 === img2) {
        card1.classList.add('cardMatch', `player${currentPlayer}`);
        card2.classList.add('cardMatch', `player${currentPlayer}`);
        flippedCards = [];
        matches++;

        if (currentPlayer === 1) {
            player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + 1;
        } else {
            player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + 1;
        }

        if (matches === cardImagesPairs.length / 2) {
            declareWinner();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('cardOpen');
            card2.classList.remove('cardOpen');
            flippedCards = [];
            switchPlayer();
        }, 500);
    }
}

function declareWinner() {
    let winnerMessage = '';
    const player1Score = parseInt(player1ScoreElement.textContent);
    const player2Score = parseInt(player2ScoreElement.textContent);

    if (player1Score > player2Score) {
        winnerMessage = 'Player 1 wins!';
    } else if (player1Score < player2Score) {
        winnerMessage = 'Player 2 wins!';
    } else {
        winnerMessage = "It's a tie!";
    }

    const winnerMessageElement = document.getElementById('winner-message');
    winnerMessageElement.textContent = winnerMessage;
    const gameOverMessage = document.querySelector('.game-over-message');
    gameOverMessage.style.display = 'block';
}

const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', function () {
    const gameOverMessage = document.querySelector('.game-over-message');
    gameOverMessage.style.display = 'none';
    setupGame();
});

function highlightTheCurrentPlayer() {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    if (currentPlayer === 1) {
        player1.classList.add('current');
        player2.classList.remove('current');
        player1.style.backgroundColor = 'lightblue';
        player2.style.backgroundColor = '';
    } else {
        player1.classList.remove('current');
        player2.classList.add('current');
        player2.style.backgroundColor = '#ffa8B6';
        player1.style.backgroundColor = '';
    }
}

setupGame();