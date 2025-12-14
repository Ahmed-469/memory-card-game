const cardElements = document.querySelectorAll('.card');
const easyButtonElement = document.querySelector("#easy-button");
const mediumButtonElement = document.querySelector("#medium-button");
const hardButtonElement = document.querySelector("#hard-button");
const timerDisplayElement = document.querySelector('#timer-display');
const messageDisplayElement = document.querySelector('#message-display')
const startButtonElement = document.querySelector('#start-button');

let lockCards = true;
let randomCards;
let firstCard = null
let secondCard = null
let timeleft = 30;
let timers;
let selectedDifficulty = "easy";

function startGame(){
    if(selectedDifficulty === "easy") timeleft = 30;
    else if(selectedDifficulty === "medium") timeleft = 20;
    else if(selectedDifficulty === "hard") timeleft = 10;
    previewCards();
    randomizeCards();
}

function flipCard(card){ 
    if(lockCards) return;
    card.classList.add('flip');
    checkCards(card);
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
        setTimeout(function(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard = null;
        secondCard = null;
        lockCards = false;
        } , 1000);
    }
}

function startTimer() {
    timers = setInterval(function() {
        if (timeleft < 0) {
            clearInterval(timers);
            lockCards = true;
            messageDisplayElement.textContent = "You lose 😕";
            return;
        }

        timerDisplayElement.textContent = `Time left ${timeleft}s`;
        timeleft--;

        if(document.querySelectorAll('.card.flip').length === cardElements.length){
        clearInterval(timers);
        lockCards = true;
        messageDisplayElement.textContent = "You win 🥳";
    }}, 1000);
}

function previewCards(){cardElements.forEach(function(card){
    card.classList.add('flip');
    });
    setTimeout(function() {
        resetCards();
        startTimer();
    }, 2000);
    messageDisplayElement.textContent = "";
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

startButtonElement.addEventListener('click', startGame);

easyButtonElement.addEventListener('click', function() {
    selectedDifficulty = "easy";
    timerDisplayElement.textContent = "Time left 30s";
});
mediumButtonElement.addEventListener('click', function() {
    selectedDifficulty = "medium";
    timerDisplayElement.textContent = "Time left 20s";
});
hardButtonElement.addEventListener('click', function() {
    selectedDifficulty = "hard";
    timerDisplayElement.textContent = "Time left 10s";
});