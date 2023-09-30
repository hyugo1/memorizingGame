const cardImages = [
    '8ball.png',
    'american-football.png',
    'baseball.png',
    'basketball.png',
    'football.png',
    'golfball.png',
    'tennisball.png',
    'volleyball.png'
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(cardImages);

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

for (let i = 0; i < cardImages.length; i++) {
    for (let j = 0; j < 2; j++) { 
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="cardInner">
                                <div class="cardFront"><img src="card.png" alt="Cards"></img></div>
                                <div class="cardBack"><img src="${cardImages[i]}" alt="Content Image"></div>
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
    
        memoryGame.appendChild(card);
    }
}


function checkForMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.cardBack img');
    const img2 = card2.querySelector('.cardBack img');

    if (img1.src === img2.src) {
        card1.classList.add('cardMatch');
        card2.classList.add('cardMatch');
        card1.classList.remove('cardOpen');
        card2.classList.remove('cardOpen');
        flippedCards = [];
        matches++;

        // Update player scores when you match
        if (currentPlayer === 1) {
            player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + 1;
        } else {
            player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + 1;
        }

        if (matches === cardImages.length / 2) {
            alert('Congratulations! Game Over!');
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


function highlightTheCurrentPlayer() {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    
    if (currentPlayer === 1) {
        player1.classList.add('current');
        player2.classList.remove('current');
    } else {
        player1.classList.remove('current');
        player2.classList.add('current');
    }
}

highlightTheCurrentPlayer();
