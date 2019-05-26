const cards = document.querySelectorAll('.card');
let time = document.querySelector('.displayTime');
let moves = document.querySelector('.moves-count');
let score = document.querySelector('#score');
const modal = document.querySelector('.modal');
const cardsDeck = document.querySelector('.deck');

let blockCards = false;
let hasFlipped = false;
let firstOne, secondOne;
let openCards = [];

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

    }, 1400);
}

function resetBoard() {
    [hasFlipped, blockCards] = [false, false]
    [firstOne, secondOne] = [null, null]
}

//Mix cards

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

//Clear moves, time, reshuffle cards and alow user to restart game

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function() {
    cardsDeck.innerHTML = "";

    resetBoard();

    init();
});