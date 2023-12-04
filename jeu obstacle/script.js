const jeu = document.querySelector(".jeu");
const personnage = document.querySelector(".personnage");
// const personnage2 = document.querySelector(".personnage2");
const obstacle1 = document.querySelector(".obstacle1");
const obstacle2 = document.querySelector(".obstacle2");
const startGame = document.querySelector(".buttonStart");
const restartGame = document.querySelector(".buttonRestart");
let jeuEnCours = false;
let jumping = false;
let resizing = false;
let obstacle1Array = [];
let obstacle2Array = [];

function startGameFunction() {
  console.log("Jeu démarre");

  animateObstacle(obstacle1, "animationObstacle1");
  animateObstacle(obstacle2, "animationObstacle2");

  function animateObstacle(obstacle, animationClass) {
    
    if (!obstacle.jeuEnCours) {
      obstacle.jeuEnCours = true;

      const delay = Math.floor(Math.random() * (8000 - 2000 + 1)) + 1000;

      // Set the initial delay before starting the animation
      setTimeout(() => {
        // console.log("Ajout de la classe d'animation :", animationClass);
        obstacle.classList.add(animationClass);

        setTimeout(() => {
          // console.log("Suppression de la classe d'animation :", animationClass);
          obstacle.classList.remove(animationClass);
          const delay1 = Math.floor(Math.random() * (8000 - 2000 + 1)) + 1000;
          const delay2 = Math.floor(Math.random() * (2000 - 2000 + 1)) + 1000;
          
          obstacle.jeuEnCours = false; 

          if (obstacle === obstacle1) {
            obstacle2Array.push({ obstacle: obstacle1, animationClass: "animationObstacle2", delay: delay1
          });
          } else if (obstacle === obstacle2) {
            obstacle2Array.push({ obstacle: obstacle2, animationClass: "animationObstacle2", delay: delay2
          });
          }

          console.log(obstacle1Array, obstacle2Array);
        }, 4000); 
      }, delay); 
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
    clearInterval(verifObstacle1);
    console.log(verifObstacle1, verifObstacle2);
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
    clearInterval(verifObstacle2);
  }
});

  function restartGameFunction() {
    jeuEnCours = true;
    obstacle1.style.animation = ""; // Remettre l'animation à zéro
    obstacle2.style.animation = "";
    // Redémarrer le jeu
    startGameFunction();
    console.log(startGameFunction);
  }
  restartGame.addEventListener("click", restartGameFunction);

