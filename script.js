const cards = document.querySelectorAll('.card');
let time = document.querySelector('.displayTime');
let moves = document.querySelector('.moves-count');
let score = document.querySelector('#score');
const modal = document.querySelector('.modal');
const cardsDeck = document.querySelector('.deck');
const timer = document.querySelector('.timer');
let liveTimer, totalSeconds = 0;

let blockCards = false;
let hasFlipped = false;
let firstOne, secondOne;

function flipCard() {

    if (blockCards) return
    if (this === firstOne) return;

    this.classList.add('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstOne = this;

        return;
    }

    secondOne = this;

    checkMatch();
}

function checkMatch() {

    let isMatch = firstOne.dataset.framework === secondOne.dataset.framework;

    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstOne.removeEventListener('click', flipCard);
    secondOne.removeEventListener('click', flipCard);

    resetBoard();

}

function unflipCards() {
    blockCards = true;

    setTimeout(() => {
        firstOne.classList.remove('flip');
        secondOne.classList.remove('flip');

        resetBoard();

    }, 1300);
}


function resetBoard() {
    [hasFlipped, blockCards] = [false, false]
    [firstOne, secondOne] = [null, null]
}

cards.forEach(card => card.addEventListener('click', flipCard));


const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function() {
    cardsDeck.innerHTML = "";


});

restartBtn.addEventListener('click', function() {
    cardsDeck.innerHTML = '.deck';

});


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();