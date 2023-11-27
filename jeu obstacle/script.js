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
    personnage2.style.visibility = "hidden";
    jump();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown") {
    resize();
    personnage2.style.visibility = "visible";
    personnage.style.visibility = "hidden";
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

var verifObstacle1 = setInterval(function () {
  var personnageTop = parseInt(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );
  var obstacleleft = parseInt(
    window.getComputedStyle(obstacle1).getPropertyValue("left")
  );

  if (obstacleleft < 80 && obstacleleft > 60 && personnageTop >= 390) {
    obstacle1.style.animation = "none";
    alert("perdu");
  }
});

var verifObstacle2 = setInterval(function () {
  var personnageTop = parseInt(
    window.getComputedStyle(personnage).getPropertyValue("top")
  );
  var personnage2Top = parseInt(
    window.getComputedStyle(personnage2).getPropertyValue("top")
  );
  var obstacle2left = parseInt(
    window.getComputedStyle(obstacle2).getPropertyValue("left")
  );

  // Conditions de collision pour les deux personnages
  var collisionPersonnage1 =
    obstacle2left < 80 && obstacle2left > 0 && personnageTop >= 200;
  var collisionPersonnage2 =
    obstacle2left < 80 && obstacle2left > 0 && personnage2Top >= 900;

  if (collisionPersonnage2) {
    obstacle2.style.animation = "none";
    alert("perdu");
  }
  if (collisionPersonnage1) {
    obstacle2.style.animation = "none";
    alert("perdu");
  }
});
