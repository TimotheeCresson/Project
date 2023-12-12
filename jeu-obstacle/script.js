const jeu = document.querySelector(".jeu");
const personnage = document.querySelector(".personnage");
// const personnage2 = document.querySelector(".personnage2");
const obstacle1 = document.querySelector(".obstacle1");
const obstacle2 = document.querySelector(".obstacle2");
const startGame = document.querySelector(".buttonStart");
const restartGame = document.querySelector(".buttonRestart");
const btnRules = document.querySelector(".buttonRules");
const rules = document.querySelector(".rules");


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
    personnage.style.top = "465px";
    personnage.style.left = "35px";
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

  if (obstacleleft < 80 && obstacleleft > 0 && personnageTop >= 390) {
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

      if (obstacleleft < 50 && obstacleleft > 0 && personnageTop <= 200) {
        obstacle1.style.animation = "none";
        alert("perdu");
        jeuEnCours = false;
      }
    });
    if (resizing) {
      resizing = false;
    }
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