"use strict"

const findWord = [
	"javascript",
	"callback",
	"fonction",
	"recurcive",
	"responsive",
	"serveur",
	"navigateur",
	"script",
	"index",
	"style",
	"document",
	"body",
	"boucle",
	"condition",
	"variable"
]
let selectedWord = findWord[Math.floor(Math.random() * findWord.length)].toUpperCase();

let usedLetters = [];
let errors = 0;
const bonhommeMembre = document.querySelectorAll(".bonhomme-membre")
const mot = document.getElementById("mot")
const bonneslettre = [""]
const rejouer = document.getElementById("rejouer")
console.log(selectedWord);

// interprétation pour le clavier 

document.addEventListener("keypress", (e)=>{
    const letter = e.key.toUpperCase()
    if (/[A-Z]/.test(letter) && !usedLetters.includes(letter)) {
        checkLetter(letter);
    }
})


// afficher le mot si on inclut la lettre on fait sinon on laisse vide
function afficherMot() {
    mot.innerHTML = `${selectedWord
        .split('')
        .map(lettre => `<span class= "letter">${bonneslettre.includes(lettre) ? lettre : ''}</span>`
    )
    .join('') // tableau retransformé en string (''  pour ne rien mettre entre)
}
`;
// Sélection des différents membres pour les faires apparaître si mon index est inférieur aux erreurs
bonhommeMembre.forEach((membre, index)=>{
    if(index < errors){
        membre.style.display ='block'
    }
    else {
        membre.style.display = 'none'
    }
    //console.log(membre);
})

}
afficherMot()

// Création des boutons pour les lettres 
function btnLetter() {
    document.getElementById("errorCount").textContent= `Erreur : ${errors}`
    document.getElementById("usedLetters").textContent = `Lettres utilisées : ${usedLetters.join(', ')}`
    const selectedLetters = document.getElementById("selectedLetters")
        selectedLetters.innerHTML = "";
    for(let i=65; i<=90; i++) {
        const letter = String.fromCharCode(i)
        if (!usedLetters.includes(letter)) {
            const button = document.createElement("button")
            button.textContent = letter
            button.addEventListener("click", ()=> checkLetter(letter))
            selectedLetters.append(button)
            //console.log(button);
        }
    }
}
function checkLetter(letter) {
   // console.log(selectedWord, letter, selectedWord.includes(letter));
    usedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        for(let i=0; i < selectedWord.length; i++){
            if (selectedWord[i] === letter) {
                bonneslettre[i] = letter
            }
        }
    }
    else {
        errors++;
    }
    btnLetter();
    Gamestatus();
    afficherMot()
}
/*
const btn = document.querySelector("#selectedLetters button")
console.log(btn);
bonhommeMembre.forEach((btn, index)=>{
    if(bonneslettre.join("") === selectedWord){
        index.disabled = true
    }
    else if( errors >= 6){
        index.disabled = true
    }
    //console.log(membre);
})
*/

function Gamestatus() {
    const messageFinal = document.querySelector(".messageFinal")
    const messagePerdu = document.querySelector(".message")
    const button = document.querySelectorAll("#selectedLetters button") 
    if(bonneslettre.join("") === selectedWord){
        messageFinal.style.display ="block"
        button.forEach(function(b){
            b.disabled = true
        })
    } 
    else if( errors >= 6) {
        messagePerdu.innerText = "vous avez perdu"
        messageFinal.style.display ="block"
        
        button.forEach(function(b){
            b.disabled = true
        })
    }
}



rejouer.addEventListener("click", resetGame)
console.log(rejouer);
function resetGame() {
    selectedWord = findWord[Math.floor(Math.random() * findWord.length)].toUpperCase();
    const messageFinal = document.querySelector(".messageFinal")
    usedLetters = [];
     // Clear bonneslettre to start a new game
    bonneslettre.length = 0;
    errors = 0;
    messageFinal.style.display ="none"
    btnLetter()
    afficherMot()
}


btnLetter()