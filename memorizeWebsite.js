const cardEmoji = ['😍', '😍', '😁', '😁', '🧐', '🧐', '😎', '😎', '🥰', '🥰', '😈', '😈', '🤩', '🤩', '🥶', '🥶'];
const shuffle_emoji = cardEmoji.sort(() => (Math.random() > 0.5) ? 2 : -1);
const memoryGame = document.querySelector('.memory-game');



let flippedCards = [];
let matches = 0;
let currentPlayer = 1;
const player1ScoreElement = document.querySelector('#player1 .score');
const player2ScoreElement = document.querySelector('#player2 .score');



function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    highlightCurrentPlayer(); 
}

for (let i = 0; i < shuffle_emoji.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="cardInner">
                          <div class="cardFront"></div>
                          <div class="cardBack">${shuffle_emoji[i]}</div>
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


function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector('.cardBack').textContent === card2.querySelector('.cardBack').textContent) {
        card1.classList.add('cardMatch');
        card2.classList.add('cardMatch');
        card1.classList.remove('cardOpen');
        card2.classList.remove('cardOpen');
        flippedCards = [];
        matches++;

        // Update player if they scores/match
        if (currentPlayer === 1) {
            player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + 1;
        } else {
            player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + 1;
        }

        if (matches === cardEmoji.length / 2) {
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


function highlightCurrentPlayer() {
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

highlightCurrentPlayer();
