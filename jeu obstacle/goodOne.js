// /*
// ----------------------------------
//   Création de mon Jeu
// ------------------------------------
// */ 

// // Création de la div avec la classe "rules"
// const rulesDiv = document.createElement('div');
// rulesDiv.classList.add('rules');

// // Création de la div à l'intérieur de rulesDiv
// const rulesContentDiv = document.createElement('div');

// // Création des paragraphes et ajout au div rulesContentDiv
// const rulesParagraph1 = document.createElement('p');
// rulesParagraph1.textContent = '- Esquiver les obstacles';

// const rulesParagraph2 = document.createElement('p');
// rulesParagraph2.textContent = '- Pour jouer, utiliser les touches directionnelles du clavier, flèche du haut pour sauter et flèche du bas pour rétrécir (ordinateur) ou appuyer en dessous du personnage pour sauter (tablette et téléphone)';

// rulesContentDiv.appendChild(rulesParagraph1);
// rulesContentDiv.appendChild(rulesParagraph2);
// rulesDiv.appendChild(rulesContentDiv);


// // Création de la div avec la classe "container"
// const containerDiv = document.createElement('div');
// containerDiv.classList.add('container');

// // Création de la div avec la classe "button-container"
// const buttonContainerDiv = document.createElement('div');
// buttonContainerDiv.classList.add('button-container');
// containerDiv.append(buttonContainerDiv)

// // Création de la div avec la classe "buttonSet"
// const buttonSetDiv = document.createElement('div');
// buttonSetDiv.classList.add('buttonSet');

// // Création des boutons et ajout au div buttonSetDiv
// const startButton = document.createElement('button');
// startButton.classList.add('buttonStart', 'set');
// startButton.textContent = 'Start';

// const restartButton = document.createElement('button');
// restartButton.classList.add('buttonRestart', 'set');
// restartButton.textContent = 'Restart';

// const rulesButton = document.createElement('button');
// rulesButton.classList.add('buttonRules', 'set');
// rulesButton.textContent = 'Rules';

// buttonSetDiv.appendChild(startButton);
// buttonSetDiv.appendChild(restartButton);
// buttonSetDiv.appendChild(rulesButton);

// // Ajout du div buttonSetDiv à buttonContainerDiv
// buttonContainerDiv.appendChild(buttonSetDiv);

// // Création de la div avec la classe "jeu"
// const jeuDiv = document.createElement('div');
// jeuDiv.classList.add('jeu');
// containerDiv.append(jeuDiv)

// // Création de l'image du personnage avec la classe "personnage"
// const personnageImg = document.createElement('img');
// personnageImg.classList.add('personnage');
// personnageImg.src = './img/personnage.PNG';
// personnageImg.alt = 'personnage';

// // Création des divs pour les obstacles avec les classes "obstacle1" et "obstacle2"
// const obstacle1Div = document.createElement('div');
// obstacle1Div.classList.add('obstacle1');

// const obstacle2Div = document.createElement('div');
// obstacle2Div.classList.add('obstacle2');

// // Ajout de l'image du personnage et des obstacles à jeuDiv
// jeuDiv.appendChild(personnageImg);
// jeuDiv.appendChild(obstacle1Div);
// jeuDiv.appendChild(obstacle2Div);

// // Ajout des divs containerDiv, rulesDiv et jeuDiv au corps du document
// document.body.appendChild(rulesDiv);
// document.body.appendChild(containerDiv);


// Sélection des éléments du jeu
const jeu = document.querySelector(".jeu");
const personnage = document.querySelector(".personnage");
// const personnage2 = document.querySelector(".personnage2");
const obstacle1 = document.querySelector(".obstacle1");
const obstacle2 = document.querySelector(".obstacle2");
const startGame = document.querySelector(".buttonStart");
const restartGame = document.querySelector(".buttonRestart");
const btnRules = document.querySelector(".buttonRules");
const rules = document.querySelector(".rules");
//calculer la position top de l'élément personnage et stocker cette valeur dans la variable toplimit
let toplimit = parseInt(window.getComputedStyle(personnage).getPropertyValue("top"));
// on récupère la taille et la position de l'élément personnage (on obtient un objet avec des propriétés des propriétés telles que top, left, width, height )
const personnageSize = personnage.getBoundingClientRect()
// on calcule la position left de l'élément personnage et on ajoute sa largeur pour obtenir leftlimit.
let leftlimit = parseInt(window.getComputedStyle(personnage).getPropertyValue("left")) + personnageSize.width;


let jeuEnCours = false;
let jumping = false;
let resizing = false;
let obstacle1Array = [];
let obstacle2Array = [];
const obstacles = [[obstacle1,"animationObstacle1"], [obstacle2,"animationObstacle2"]]

function startGameFunction() {
  console.log("Jeu démarre");

  animateObstacle(...obstacles[Math.floor(Math.random()*obstacles.length)]);

  function animateObstacle(obstacle, animationClass) {
    if (!obstacle.jeuEnCours) {
      obstacle.jeuEnCours = true;

      setTimeout(() => {
        // console.log("Ajout de la classe d'animation :", animationClass);
        obstacle.classList.add(animationClass);

        // const delay2 = Math.floor(Math.random() * (7000 - 4000)) + 5000;
        // console.log("Delay avant suppression de la classe :", delay2);

        setTimeout(() => {
          // console.log("Suppression de la classe d'animation :", animationClass);
          obstacle.classList.remove(animationClass);
          obstacle.jeuEnCours = false; 
          
          // console.log("Nouvel obstacle en cours d'animation :");
          animateObstacle(...obstacles[Math.floor(Math.random()*obstacles.length)]);

        }, 2000); 
      }, 1000); 
    }
  }
}


    
  // function getRandomDelay() {
  //   return Math.floor(Math.random() * (8000 - 2000 + 1)) + 1000;
  // }


startGame.addEventListener("click", startGameFunction);
console.log(obstacle1);


document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    personnage.style.height = "";
    personnage.style.top = "";
    personnage.style.left = "0px";
    jump();
  } else if (e.code === "ArrowDown") {
    resize();
    personnage.style.height = "auto";
    personnage.style.top = "486px";
    personnage.style.left = "33px";
  }
});

document.addEventListener("click", (event) => {
  const personnageRect = personnage.getBoundingClientRect();
  const clickYPersonnage = event.clientY - personnageRect.top;

  // déterminer si le click est en dessous de mon personnage
  if (clickYPersonnage >= personnageRect.height / 2) {
    jump();
    personnage.style.height = "";
    personnage.style.top = "";
    personnage.style.left = "0px";
  }
});

btnRules.addEventListener("click", () => {
  if (rules.style.display === "block") {
    rules.style.display = "none";
  } else {
    rules.style.display = "block";
  }
})

// Fonction pour le saut
function jump() {
  if (!jumping) {
    jumping = true;
    personnage.classList.add("animationPerso");

    setTimeout(() => {
      personnage.classList.remove("animationPerso");
      jumping = false;
    }, 1000);
  }
}
// Fonction pour redimensionner (ajuster selon vos besoins)
function resize() {
  if (!resizing) {
    resizing = true;
  }
}


// // vérification obstacle touche personnage
// function check(obstacle) {
  
// }
const verifObstacle1 = setInterval(function () {
  const personnageTop = parseInt(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );
  const obstacleleft = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("left")
  );
  console.log(obstacleleft, leftlimit);
// console.log(personnageTop, toplimit);
  if (obstacleleft < leftlimit && obstacleleft > 0 && personnageTop >= toplimit) {
    obstacle1.style.animation = "none";
    alert("perdu");
    jeuEnCours = false;
    obstacle1.style.display = "none";
    obstacle2.style.display = "none";
    console.log(obstacle2Array);
  }
});

const verifObstacle2 = setInterval(function () {
  const personnageTop = parseInt(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );

  // const personnage2Top = parseInt(
  //   window.getComputedStyle(personnage2).getPropertyValue("top")
  // );

  const obstacle2left = parseInt(
    window.getComputedStyle(obstacle2).getPropertyValue("left")
  );

  // console.log("personnageTop:", personnageTop);
  // console.log("personnage2Top:", personnage2Top);
  // console.log("obstacle2left:", obstacle2left);

  // Conditions de collision pour les deux personnages
  const collisionPersonnage1 =
    obstacle2left < 80 && obstacle2left > 0 && personnageTop <= 350;

  const collisionPersonnage2 =
    obstacle2left < 80 && obstacle2left > 0 && personnageTop <= 450;

  // if (collisionPersonnage1) {
  //   obstacle2.style.animation = "none";
  //   alert("perdu avec personnage 1");
  // }
  // if (collisionPersonnage1) {
  //   obstacle2.style.animation = "none";
  //   alert("perdu avec personnage 1");
  // }

  // if (collisionPersonnage2) {
  //   console.log("personnageTop:", personnageTop);
  //   // console.log("personnage2Top:", personnage2Top);
  //   // console.log("obstacle2left:", obstacle2left);
  //   // console.log("obstacle2left < 80:", obstacle2left < 80 ,"obstacle2left > 0:", obstacle2left > 0 ,"personnage2Top >= 300:", personnage2Top >= 300);
  //   obstacle2.style.animation = "none";
  //   alert("perdu avec personnage 2");
  // }

  if (collisionPersonnage2 || collisionPersonnage1) {
    // console.log("personnageTop:", personnageTop);
    // console.log("personnage2Top:", personnage2Top);
    // console.log("obstacle2left:", obstacle2left);
    // console.log("obstacle2left < 80:", obstacle2left < 80 ,"obstacle2left > 0:", obstacle2left > 0 ,"personnage2Top >= 300:", personnage2Top >= 300);
    obstacle2.style.animation = "none";
    alert("perdu avec personnage 2");
    jeuEnCours = false;
    obstacle1.style.display = "none"
    obstacle2.style.display = "none"
  }
});

  function restartGameFunction() {
    jeuEnCours = true;
    obstacle1.style.animation = ""; // Remettre l'animation à zéro
    obstacle2.style.animation = "";
    obstacle1.style.display = "inline";
    obstacle2.style.display = "inline";

    // Redémarrer le jeu
    startGameFunction();
    console.log(startGameFunction);
  }
  restartGame.addEventListener("click", restartGameFunction);

  function resizeScreen() {
    console.log('resizeScreen() called');
    if (window.matchMedia('(max-width: 1100px)').matches) {
      console.log('écran plus petit que 1100px');
      const verifObstacle1 = setInterval(function () {
        console.log('fonction verifObstacle appelé');
        const personnageTop = parseInt(
          window.getComputedStyle(personnage).getPropertyValue("top")
        );
        const obstacleleft = parseInt(
          window.getComputedStyle(obstacle1).getPropertyValue("left")
        );
  
        if (obstacleleft < leftlimit && obstacleleft > 0 && personnageTop >= toplimit) {
          obstacle1.style.animation = "none";
          alert("perdu");
          jeuEnCours = false;
        }
      });
    }
  }
  
  resizeScreen();
  

  

// document.addEventListener("click", (event) => {
//   const personnageRect = personnage.getBoundingClientRect();
//   const clickYPersonnage = event.clientY - personnageRect.top;

//   // mettre une hauteur max pour le click
//   const maxClickHeight = -200; 
//   // déterminer si le click est au dessus de mon personnage
//   if (clickYPersonnage < personnageRect.height / 2 && clickYPersonnage > maxClickHeight) {
//     personnage.style.height = "";
//     personnage.style.top = "";
//     personnage.style.left = "0px";
//     jump();
//   }
// });


// document.addEventListener("click", (event) => {
//   const personnageRect = personnage.getBoundingClientRect();
//   const clickYPersonnage = event.clientY - personnageRect.top;

//   // déterminer si le click est en dessous de mon personnage
//   if (clickYPersonnage >= personnageRect.height / 2) {
//     resize();
//     personnage.style.height = "auto";
//     personnage.style.top = "465px";
//     personnage.style.left = "35px";
//   }
// });