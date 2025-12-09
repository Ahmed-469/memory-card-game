const cardElements = document.querySelectorAll('.card');
const difficultyButtonElements = document.querySelectorAll('.level');
const timerDisplayElement = document.querySelector('#TimerDisplay');
const messageDisplayElement = document.querySelector('#messageDisplay')
const startButtonElement = document.querySelector('#StartButton');

let lockCards = true;
let randomCards;
let firstCard = null
let secondCard = null

function flipCard(card){ 
    if(lockCards) return;
    card.classList.add('flip');
    if(firstCard && secondCard) return;
    else if(!firstCard){
        firstCard = card; 
        return;
    }
    secondCard = card;
    lockCards = true;
    checkCards()
}

function checkCards() {
    let firstEmoji = firstCard.querySelector('.back').textContent;
    let secondEmoji = secondCard.querySelector('.back').textContent;
    if (firstEmoji === secondEmoji) {
        firstCard = null;
        secondCard = null;
        lockCards = false;
    } 
    else {
        setTimeout(function(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard = null;
        secondCard = null;
        lockCards = false;
        } , 500);
    }
}

function previewCards(){cardElements.forEach(function(card){
    card.classList.add('flip');
    });
    setTimeout(resetCards, 2000);
    randomizeCards();
}

function resetCards(){ cardElements.forEach(function(card) {
    card.classList.remove('flip');
    });
    lockCards = false;
}

function randomizeCards(){ cardElements.forEach(function(card){
    randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
})}

cardElements.forEach(function(card) { 
    card.addEventListener('click', function() {
        flipCard(card);
    });
});

startButtonElement.addEventListener('click', previewCards);