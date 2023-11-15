"use strict"
//info
const allCell = document.querySelectorAll(".cell");
const restart = document.querySelector (".restart")
const message = document.querySelector (".message")
const firstPlayer = document.querySelector ("p")
console.log(allCell);
let currentplayer = "X";
let jeuActif = true
let etatJeu = ["", "", "", "", "", "", "", "", ""]

console.log(firstPlayer);

// condition

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

//message
function gagne() {
    message.textContent = `Le joueur ${currentplayer} a gagné`
}
function egalité() {
    message.textContent = `Egalité`
}
const tourJoueur = ()=> `C'est au tour du joueur ${currentplayer}`

firstPlayer.innerHTML = tourJoueur()



restart.addEventListener('click', restartGame)

allCell.forEach(cell => cell.addEventListener("click", clickcell))
function clickcell() {
  // console.log(this);   grâce au data-index en html, lorsuqe l'on clique sur une case nous avons la case correspondante avec le chiffre correspondant
  // On récupère l'index de la case cliqué
  const indexCase = parseInt(this.dataset.index)
  // console.log(indexCase);

  if(etatJeu[indexCase] != "" || !jeuActif) {  
    return // ici on dit si dans état jeu, à l'index de la case, c'est différent de vide ou si le jeu n'est pas actif alors je fais rien
  }

  etatJeu[indexCase] = currentplayer  // rempli le tableau état jeu lorsque l'on clique sur une case, ici par X étant donné que current player = X, On stocke l'état actuel du jeu
  this.innerHTML = currentplayer
  
  this.style.color = "white"

  verifGagne()
}

function verifGagne() {
  let tourGagnant = false

  for(let conditionVictoire of conditionsVictoire) {
    let val1 = etatJeu[conditionVictoire[0]] // dans conditions victoire, on prend la première valeur du premier tableau soit 0 
    let val2 = etatJeu[conditionVictoire[1]] // ici 1
    let val3 = etatJeu[conditionVictoire[2]] // ici 2
    if(val1 === "" || val2 === "" || val3 === ""){ // on vérifie si la personne n'a pas gagné en vérifiant si la première ligne à toutes ces cases remplies ou non sinon on continue
      continue
    }
    if(val1 === val2 && val2 === val3){ // ici on vérifie si les 3 valeurs sont égales 
      tourGagnant = true
      break
    }
  }
  if(tourGagnant){
    firstPlayer.innerHTML = ""
    gagne()
    jeuActif = false
    return
  }

  if(!etatJeu.includes("")){ // ici on dit si toutes les cases sont remplies (si etat jeu n'inclut pas de "")
    firstPlayer.innerHTML = ""
    egalité()
    jeuActif = false
    return
  }
  // ternaire: on vérifie si current player = X si oui, je met O sinon je met X
  currentplayer = currentplayer === "X" ? "O" : "X"
  firstPlayer.innerHTML = tourJoueur()
}

function restartGame() {
  currentplayer = "X"
  jeuActif = true
  etatJeu = ["", "", "", "", "", "", "", "", ""]
  firstPlayer.innerHTML = tourJoueur()
  message.innerHTML = ""
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}










/*
for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      message.textContent = `${currentPlayer} a gagné !`;
      return;
    }
  }

  if (!gameBoard.includes('') && gameActive) {
    gameActive = false;
    message.textContent = 'Match nul !';
  }
}

function handleCellClick(cellIndex) {
  const cell = cells[cellIndex];
  if (gameBoard[cellIndex] || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === 'X' ? '#f00' : '#00f';

  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  gameBoard = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
  cells.forEach((cell, index) => {
    cell.textContent = '';
    cell.style.color = '';
  });
}
}
}

const ticTacToe = new TicTacToe();
*/