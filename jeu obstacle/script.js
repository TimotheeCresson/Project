const jeu = document.querySelector(".jeu");
const personnage = document.querySelector(".personnage");
const personnage2 = document.querySelector(".personnage2");
const obstacle1 = document.querySelector(".obstacle1");
const obstacle2 = document.querySelector(".obstacle2");
const startGame = document.querySelector(".buttonStart");

let jumping = false;
let resizing = false;

// Fonction pour démarrer le jeu
function startGameFunction() {
  console.log("Jeu démarre");

  // Démarrer l'animation des obstacles avec des délais aléatoires
  animateObstacle(obstacle1, "animationObstacle1");
  animateObstacle(obstacle2, "animationObstacle2");
}

// Fonction pour démarrer l'animation d'un obstacle avec un délai aléatoire
function animateObstacle(obstacle, animationClass) {
  const delay = getRandomDelay();

  setTimeout(() => {
    obstacle.classList.add(animationClass);

    setTimeout(() => {
      obstacle.classList.remove(animationClass);
      // Répéter l'animation avec un nouveau délai aléatoire
      animateObstacle(obstacle, animationClass);
    }, 4000); // délai pour enlever ma classe
  }, delay); // délai pour ajouter de nouveau ma classe
}

// Générer un délai aléatoire entre 2 et 5 secondes
function getRandomDelay() {
  return Math.floor(Math.random() * (8000 - 2000 + 1)) + 1000;
}

// Événement pour commencer le jeu
startGame.addEventListener("click", startGameFunction);

// Événements sur les touches de direction
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    personnage.style.visibility = "visible";
    personnage2.style.right = "300px";
    jump();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown") {
    resize();
    personnage.style.visibility = "hidden";
    personnage2.style.left= "-120px";
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

// vérification obstacle touche personnage

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
  }
});

const verifObstacle2 = setInterval(function () {
  const personnageTop = parseInt(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );

  const personnage2Top = parseInt(
    window.getComputedStyle(personnage2).getPropertyValue("top")
  );

  const obstacle2left = parseInt(
    window.getComputedStyle(obstacle2).getPropertyValue("left")
  );

  console.log("personnageTop:", personnageTop);
  console.log("personnage2Top:", personnage2Top);
  console.log("obstacle2left:", obstacle2left);

  // Conditions de collision pour les deux personnages
  const collisionPersonnage1 =
    obstacle2left < 80 && obstacle2left > 0 && personnageTop <= 350;

  const collisionPersonnage2 =
    obstacle2left < 80 && obstacle2left > 0 && personnage2Top >= 300;

  if (collisionPersonnage1) {
    obstacle2.style.animation = "none";
    alert("perdu avec personnage 1");
  }

  if (collisionPersonnage2) {
    obstacle2.style.animation = "none";
    alert("perdu avec personnage 2");
  }
});



