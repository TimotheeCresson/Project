"use strict"

const justeprix = document.querySelector('.justeprix')
const carte = document.querySelector('.carte')
const restart = document.querySelector('.recommencer')
const devine = document.querySelector('.devine')
const aleatoire = Math.floor(Math.random() * 100) + 1;
console.log(aleatoire);

const guessInput = document.querySelector('#guess')
const btn = document.querySelector('#submit')
const texte = document.querySelector('.texte')
let tentative = 0;
const tentativeMax = 7;

btn.addEventListener('click', guessing)
guessInput.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') {
        guessing();
    }
});

restart.addEventListener('click', restartGame);
    function startGame() {
        const aleatoire = Math.floor(Math.random() * 100) + 1;
        tentative = 0;
        guessInput.disabled = false;
        btn.disabled = false;
        guessInput.value="";
        texte.textContent = "",
        guessInput.focus()
    }
    function restartGame() {
        startGame();
    }
    startGame();
        

function guessing() {
    const userGuess = parseInt(guessInput.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > 100){
        texte.textContent = "Veuillez entrer un nombre valide entre 1 et 100"
        texte.style.color = 'red'
        texte.style.textShadow = "1px 1px 2px #ffffff"
        } else {
        tentative++;

    if (userGuess < aleatoire) {
        texte.textContent = `le nombre à deviner est plus grand (Essai ${tentative})`;
        texte.style.textShadow = "1px 1px 5px #ffffff"
        devine.textContent = "?"
    }
    else if (userGuess > aleatoire) {
        texte.textContent = `le nombre à deviner est plus petit (Essai ${tentative})`;
        texte.style.textShadow = "1px 1px 5px #ffffff"
        devine.textContent="?"
    }
    else {
        texte.textContent =`Vous avez deviné le nombre ${userGuess} en ${tentative} tentatives`;
        texte.style.textShadow = "2px 1px 5px green"
        guessInput.disabled = true;
        btn.disabled = true;
        devine.textContent = aleatoire
        devine.classList.remove("hidden")
        restart.classList.remove("hidden")
    }
    if (tentative < tentativeMax){}
    else {
        texte.textContent ="Désolé, vous avez perdu"; 
        texte.style.textShadow = "1px 1px 5px red"
        devine.classList.remove("hidden")
        restart.classList.remove("hidden")
    }
    guessInput.value="";
}
}






