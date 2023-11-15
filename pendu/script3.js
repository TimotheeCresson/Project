"use strict"

const url = "./mots.json"
let selectedWord = "";
let usedLetters = [];
let errors = 0;
const bonhommeMembre = document.querySelectorAll(".bonhomme-membre")
const mot = document.getElementById("mot")
const bonneslettre = [""]
const rejouer = document.getElementById("rejouer")
console.log(selectedWord);

// Démarrer le jeu

function startGame() {
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const words = data;
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    btnLetter();
    afficherMot(); // Call afficherMot() after selectedWord is set
    console.log(selectedWord);
  })
  .catch((error) => console.error('Error loading JSON:', error));
}
startGame()


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

// Vérifier si la lettre est dans notre mot

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



// Etat du jeu

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

// Rejouer 

rejouer.addEventListener("click", resetGame)
console.log(rejouer);
function resetGame() {
    const messageFinal = document.querySelector(".messageFinal")
    usedLetters = [];
     // Clear bonneslettre to start a new game
    bonneslettre.length = 0;
    errors = 0;
    messageFinal.style.display ="none"
    let div = document.createElement("div")
    div.innerHTML = `Le mot était "<a href="https://www.google.com/search?q=${selectedWord}" target="_blank">${selectedWord}</a>`
    messageFinal.append(div)
    btnLetter()
    afficherMot()
    startGame()
}


btnLetter()