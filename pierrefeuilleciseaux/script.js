"use strict"
//Sélectionner nos objets
const pierre = document.querySelector(".pierre");
const feuille = document.querySelector(".feuille");
const ciseaux = document.querySelector(".ciseaux");
const choixDuJoueurDiv = document.querySelector(".choixDuJoueur")
const choixOrdiDiv = document.querySelector(".choixOrdi")
const joueurGagnant = document.querySelector(".gagnant")
console.log(pierre, feuille, ciseaux);

pierre.addEventListener("click", function() {
    jouer("pierre")
})
feuille.addEventListener("click", function() {
    jouer("feuille")
})
ciseaux.addEventListener("click", function() {
    jouer("ciseaux")
})

function jouer(choixJoueur) {
    const choixOrdinateur = generateurDeChoix()

    choixDuJoueurDiv.textContent = `Vous avez choisit : ${choixJoueur}`
    choixOrdiDiv.textContent = `L'ordinateur a choisit : ${choixOrdinateur}`

    const afficherResultat = determinerGagnant(choixJoueur, choixOrdinateur)

    joueurGagnant.textContent = afficherResultat
}

function generateurDeChoix() {
    const choixObjet = ["pierre", "ciseaux", "feuille"]
    const choixObjetGenerateur = Math.floor(Math.random() * 3)
    return choixObjet[choixObjetGenerateur]
}
function determinerGagnant(choixJoueur, choixOrdinateur) {
    if (choixJoueur === choixOrdinateur) {
        return joueurGagnant.textContent = "Egalité"
    } 
    else if (
        choixJoueur === "feuille" && choixOrdinateur === "ciseaux" ||
        choixJoueur === "ciseaux" && choixOrdinateur === "pierre" ||
        choixJoueur === "pierre" && choixOrdinateur === "feuille" 
    )
    {
        return joueurGagnant.textContent = "l'ordinateur a gagné"
    }
    else {return joueurGagnant.textContent = "Vous avez gagné"}
}
