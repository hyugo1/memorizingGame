const cardsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const memoryGame = document.querySelector('.memory-game');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function shuffle(array) {
    let currentIndex = array.length, randomIndex, tempValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const chosenIds = [...cardsChosenId]; 

    cardsChosenId = []; 

    chosenIds.forEach((id) => {
        cards[id].querySelector('.card-front').style.transform = 'rotateY(180deg)'; 
    });

    if (cardsChosen[0] === cardsChosen[1]) {
        cardsWon.push(cardsChosen);

        chosenIds.forEach((id) => {
            cards[id].style.display = 'none'; 
        });
    }

    cardsChosen = [];

    if (cardsWon.length === cardsArray.length / 2) {
        alert('Congratulations! You won the game!');
    }
}


function createBoard() {
    const duplicatedCards = cardsArray.concat(cardsArray);
    shuffle(duplicatedCards);

    duplicatedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'unmatched');
        cardElement.setAttribute('data-id', index);
        cardElement.innerHTML = '<div class="card-back"></div><div class="card-front">' + card + '</div>';
        cardElement.addEventListener('click', flipCard);
        memoryGame.appendChild(cardElement);
    });
}

function flipCard() {
    const cardId = this.getAttribute('data-id');

    if (!this.classList.contains('unmatched') || cardsChosenId.includes(cardId)) {
        return;
    }

    this.querySelector('.card-front').style.transform = 'rotateY(0deg)';

    cardsChosen.push(cardsArray[cardId]);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
        setTimeout(() => {
            checkForMatch();
        }, 500);
    }
}

createBoard();
