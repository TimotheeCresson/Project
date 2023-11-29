fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const tousType = document.getElementById("tousType");
    const optionBiens = tousType.querySelectorAll("option");
    const lancerRecherche = document.querySelector(".lancerRecherche");
    const imageMaisons = document.querySelector(".imageMaisons");
    const appart = document.getElementById("appartement");

    
    const maison = document.getElementById("maison");
    const terrain = document.getElementById("terrain");
    const maisonsData = data.maison;
    const appartementData = data.appartement;
    const terrainData = data.terrain;

    function createImageElements(data, targetElement) {
      data.forEach((item) => {
        const imgElementContainer = document.createElement("div");
        const imgElementContainImage = document.createElement("div")
        const descriptionElement = document.createElement("div")
        const myImage = document.createElement("div")
        const imgElement = document.createElement("img");
        
        imgElement.src = `./images/immobilier/${item.photos}`;
        imgElement.alt = item.titre;
        imgElement.classList.add("image-maison");

        myImage.classList.add("myImage")
        descriptionElement.classList.add("descriptionElement");
        descriptionElement.innerHTML = `<p>${item.titre}</p><span class ="ville">${item.ville}</span><br><span class ="prix">${item.prix} €</span><br><button class="savoirPlus btnImage">en savoir plus</button>`;
        
        imgElementContainImage.classList.add("containImage")

       
        imgElementContainer.append(imgElementContainImage);
        imgElementContainImage.append(descriptionElement)
        imgElementContainImage.append(imgElement)

        imgElementContainImage.append(myImage)
        myImage.append(imgElement)

    
        targetElement.append(imgElementContainer);
        
        imgElementContainImage.addEventListener('mouseover', function() {
          descriptionElement.style.display = "block"
          console.log(imgElementContainer);
        });
    
        imgElementContainer.addEventListener('mouseout', function() {
          descriptionElement.style.display = "none"; // Réinitialiser le fond lors du survol
        });
      });
      
    }
    
    
    
    
    

    // Fonction pour gérer le clic sur un type de bien
    function handleTypeBien(data, targetElement) {
      targetElement.innerHTML = ""; // Vider le contenu de l'élément cible
      createImageElements(data, targetElement);
    }
    // Utilisation de la fonction dans vos gestionnaires de clics
    maison.addEventListener("click", () => handleTypeBien(maisonsData, imageMaisons));
    appart.addEventListener("click", () => handleTypeBien(appartementData, imageMaisons));
    terrain.addEventListener("click", () => handleTypeBien(terrainData, imageMaisons))
    console.log(imageMaisons);



    
    lancerRecherche.addEventListener("click", () => {
      const imageMaisons = document.querySelector(".imageMaisons");
      // enlever les images avant d'en rajouter
      imageMaisons.innerHTML = "";

      let selectedOption;

      optionBiens.forEach((option) => {
        if (option.selected) {
          selectedOption = option.value;
        }

        // Fonction pour créer les éléments image en fonction des données
function createImageElements(data, imageMaisons, optionValue) {
  data.forEach((item) => {
    const imgElementContainer = document.createElement("div");
    const imgElementContainImage = document.createElement("div")
    const descriptionElement = document.createElement("div")
    const myImage = document.createElement("div")
    const imgElement = document.createElement("img");
    
    imgElement.src = `./images/immobilier/${item.photos}`;
    imgElement.alt = item.titre;
    imgElement.classList.add("image-maison", optionValue);

    myImage.classList.add("myImage")
    descriptionElement.classList.add("descriptionElement");
    descriptionElement.innerHTML = `<p>${item.titre}</p><span class ="ville">${item.ville}</span><br><span class ="prix">${item.prix} €</span><br><button class="savoirPlus btnImage">en savoir plus</button>`;
    
    imgElementContainImage.classList.add("containImage")

   
    imgElementContainer.append(imgElementContainImage);
    imgElementContainImage.append(descriptionElement)
    imgElementContainImage.append(imgElement)

    imgElementContainImage.append(myImage)
    myImage.append(imgElement)


    imageMaisons.append(imgElementContainer);
    
    imgElementContainImage.addEventListener('mouseover', function() {
      descriptionElement.style.display = "block"
      console.log(imgElementContainer);
    });

    imgElementContainer.addEventListener('mouseout', function() {
      descriptionElement.style.display = "none"; // Réinitialiser le fond lors du survol
    });
  });
}

// Boucle pour parcourir les options
optionBiens.forEach((option) => {
  if (option.selected) {
    const selectedOption = option.value;
    imageMaisons.innerHTML = ""; // Vider le contenu de l'élément imageMaisons

    // Utiliser la fonction createImageElements en fonction de la valeur de l'option
    if (selectedOption === "tousType") {
      createImageElements(maisonsData, imageMaisons, selectedOption);
      createImageElements(appartementData, imageMaisons, selectedOption);
      createImageElements(terrainData, imageMaisons, selectedOption);
    } else if (selectedOption === "maison") {
      createImageElements(maisonsData, imageMaisons, selectedOption);
    } else if (selectedOption === "appartement") {
      createImageElements(appartementData, imageMaisons, selectedOption);
    } else if (selectedOption === "terrain") {
      createImageElements(terrainData, imageMaisons, selectedOption);
    }
  }
});

      });
      // cacher toutes les images au départ
      document.querySelectorAll(".image-maison").forEach((img) => {
        img.style.display = "none";
      });

      // montrer seulement les images assiociés à chaque option
      document
        .querySelectorAll(`.image-maison.${selectedOption}`)
        .forEach((img) => {
          img.style.display = "block";
        });
    });



imageMaisons.addEventListener('mouseout', function() {
  imageMaisons.style.backgroundImage = 'initial'; 
});

    const mediaQuery = window.matchMedia("(max-width: 619px)");

    function handleMediaQueryChange(mediaQuery) {
      const maisonsImages = document.querySelectorAll(".image-maison");

      if (mediaQuery.matches) {
        maisonsImages.forEach((image) => {
          image.style.display = "none";
        });
      } else {
        maisonsImages.forEach((image) => {
          image.style.display = "block";
        });
      }
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    handleMediaQueryChange(mediaQuery);
  })
  .catch((error) => console.error("Error fetching JSON:", error));
