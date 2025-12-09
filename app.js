const cardElements = document.querySelectorAll('.card');
const difficultyButtonElements = document.querySelectorAll('.level');
const timerDisplayElement = document.querySelector('#TimerDisplay');
const messageDisplayElement = document.querySelector('#messageDisplay')
const startButtonElement = document.querySelector('#StartButton');

let lockCards = true;

function flipCards(card){ 
    if(lockCards) return;
    card.classList.add('flip');
}

function resetCards(){ cardElements.forEach(function(card) {
    card.classList.remove('flip');
    });
    lockCards = false;
}

function previewCards(){cardElements.forEach(function(card){
    card.classList.add('flip');
    });
    setTimeout(resetCards, 2000);
}

cardElements.forEach(function(card) { 
    card.addEventListener('click', function() {
        flipCards(card);
    });
});

startButtonElement.addEventListener('click', previewCards);