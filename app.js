const cardElements = document.querySelectorAll('.card');
const easyButtonElement = document.querySelector("#easy-button");
const mediumButtonElement = document.querySelector("#medium-button");
const hardButtonElement = document.querySelector("#hard-button");
const timerDisplayElement = document.querySelector('#timer-display');
const messageDisplayElement = document.querySelector('#message-display');
const startButtonElement = document.querySelector('#start-button');
const restartButtonElement = document.querySelector('#restart-button');

let lockCards = true;
let randomCards;
let firstCard = null;
let secondCard = null;
let timeLeft = 30;
let timers;
let selectedDifficulty = "easy";

function startGame(){
    startButtonElement.style.display = "none";
    restartButtonElement.style.display = "inline-block";

    setTimeByDifficulty();
    previewCards();
    randomizeCards();
}

function restartGame() {
    cardElements.forEach(function(card) {
        card.classList.remove('flip');
    });

    clearInterval(timers);
    lockCards = true;
    firstCard = null;
    secondCard = null;
    startGame();
}

function flipCard(card){ 
    if(lockCards) return;
    card.classList.add('flip');
    checkCards(card);
}

function hideCards(){
    cardElements.forEach(function(card) {
    card.classList.remove('flip');
    });
    lockCards = false;
}

function checkCards(card) {
    if(firstCard && secondCard) return;
    else if (card === firstCard) return;
    else if(!firstCard){
        firstCard = card; 
        return;
    }
    secondCard = card;
    lockCards = true;

    let firstEmoji = firstCard.querySelector('.back').textContent;
    let secondEmoji = secondCard.querySelector('.back').textContent;
    
    if (firstEmoji === secondEmoji) {
        firstCard = null;
        secondCard = null;
        lockCards = false;
    } 
    else {
        setTimeout(function() {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard = null;
        secondCard = null;
        lockCards = false;
        } , 600);
    }
}

function randomizeCards() {
    cardElements.forEach(function(card){
    randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
    });
}

function previewCards(){
    cardElements.forEach(function(card){
    card.classList.add('flip');
    });

    setTimeout(function() {
        hideCards();
        startTimer();
    }, 2000);

    messageDisplayElement.textContent = "";
}

function setTimeByDifficulty() {
    if(selectedDifficulty === "easy") timeLeft = 30;
    else if(selectedDifficulty === "medium") timeLeft = 20;
    else if(selectedDifficulty === "hard") timeLeft = 10;

    timerDisplayElement.textContent = `Time left ${timeLeft}s`;
}

function easyButton() {
    selectedDifficulty = "easy";
    timerDisplayElement.textContent = "Time left 30s";
    returnToStart();
}

function mediumButton() {
    selectedDifficulty = "medium";
    timerDisplayElement.textContent = "Time left 20s";
    returnToStart();
}

 function hardButton() {
    selectedDifficulty = "hard";
    timerDisplayElement.textContent = "Time left 10s";
    returnToStart();
}

function returnToStart() {
    cardElements.forEach(function(card) {
        card.classList.remove('flip');
    });

    clearInterval(timers);
    firstCard = null;
    secondCard = null;
    lockCards = true;

    messageDisplayElement.textContent = "";

    restartButtonElement.style.display = "none";
    startButtonElement.style.display = "inline-block";

    setTimeByDifficulty();
}

function startTimer() {
    clearInterval(timers);
    timers = setInterval(function() {
        if (timeLeft < 0) {
            clearInterval(timers);
            lockCards = true;
            messageDisplayElement.textContent = "You lose 😕";
            return;
        }

        timerDisplayElement.textContent = `Time left ${timeLeft}s`;
        timeLeft--;

        if (document.querySelectorAll('.card.flip').length === cardElements.length) {
        clearInterval(timers);
        lockCards = true;
        messageDisplayElement.textContent = "You win 🥳";
    }}, 1000);
}

cardElements.forEach(function(card) { 
    card.addEventListener('click', function() {
        flipCard(card);
    });
});

startButtonElement.addEventListener('click', startGame);
restartButtonElement.addEventListener('click', restartGame);

easyButtonElement.addEventListener('click', easyButton);
mediumButtonElement.addEventListener('click', mediumButton);
hardButtonElement.addEventListener('click', hardButton);