fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const tousType = document.getElementById("tousType");
    const optionBiens = tousType.querySelectorAll("option");
    const lancerRecherche = document.querySelector(".lancerRecherche");
    const imageMaisons = document.querySelector(".imageMaisons");
    const appart = document.getElementById("appartement");
    
    let appartements = []
    let maisons = []
    let terrains = []
    maisons = data.maison
    terrains = data.terrain
    appartements = data.appartement
    const maison = document.getElementById("maison");
    const terrain = document.getElementById("terrain");
    const maisonsData = data.maison;
    const appartementData = data.appartement;
    const terrainData = data.terrain;

    function createImageElements(data) {
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

// document.querySelector("#min").addEventListener("input", filterProperties);
// document.querySelector("#max").addEventListener("input", filterProperties);

// Boucle pour parcourir les options
optionBiens.forEach((option) => {
  if (option.selected) {
    const selectedOption = option.value;
    imageMaisons.innerHTML = ""; // Vider le contenu de l'élément imageMaisons

    // Utiliser la fonction createImageElements en fonction de la valeur de l'option

    if (selectedOption === "tousType") {
      const localisationInput = document.querySelector("#localisationInput").value.toLowerCase();
      const minPrice = parseFloat(document.querySelector("#min").value) || 0;
      const maxPrice = parseFloat(document.querySelector("#max").value) || Number.POSITIVE_INFINITY; // si le champ est vide, le filtre par prix n'aura pas de limite supérieure.
      console.log(localisationInput);
      imageMaisons.innerHTML = '';
      // Filtrer par localisation
      const resultatsAppartements = appartements.filter(appartement => appartement.ville.toLowerCase().startsWith(localisationInput));
      console.log(resultatsAppartements);
      // Filtrer par prix
      const filteredByPriceAppartement = resultatsAppartements.filter(appartement => {
          const prix = parseFloat(appartement.prix);
          return !isNaN(prix) && prix >= minPrice && prix <= maxPrice;
      });
      
      // console.log(filteredByPrice);
      // Effacer les résultats précédents

    const resultatsMaisons = maisons.filter(maison => maison.ville.toLowerCase().startsWith(localisationInput));

    const filteredByPriceMaison = resultatsMaisons.filter(maison => {
      const prix = parseFloat(maison.prix);
      return !isNaN(prix) && prix >= minPrice && prix <= maxPrice;
  });
    
    const resultatsTerrains = terrains.filter(terrain => terrain.ville.toLowerCase().startsWith(localisationInput));

    const filteredByPriceTerrain = resultatsTerrains.filter(terrain => {
      const prix = parseFloat(terrain.prix);
      return !isNaN(prix) && prix >= minPrice && prix <= maxPrice;
  });

      filteredByPriceAppartement.forEach(appartement => {
        console.log(`Image Path: ./images/immobilier/${appartement.photos}`);
        const imgElementContainer = document.createElement("div");
        const imgElementContainImage = document.createElement("div")
        const descriptionElement = document.createElement("div")
        const myImage = document.createElement("div")
        const imgElement = document.createElement("img");
        imgElement.src = `./images/immobilier/${appartement.photos}`;
        imgElement.alt = appartement.titre;
        imgElement.style.display = "block";
        imgElement.classList.add("image-maison");

        myImage.classList.add("myImage")
        descriptionElement.classList.add("descriptionElement");
        descriptionElement.innerHTML = `<p>${appartement.titre}</p><span class ="ville">${appartement.ville}</span><br><span class ="prix">${appartement.prix} €</span><br><button class="savoirPlus btnImage">en savoir plus</button>`;
        
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
      
      filteredByPriceMaison.forEach(maison => {
        const imgElementContainer = document.createElement("div");
        const imgElementContainImage = document.createElement("div")
        const descriptionElement = document.createElement("div")
        const myImage = document.createElement("div")
        const imgElement = document.createElement("img");
        imgElement.src = `./images/immobilier/${maison.photos}`;
        imgElement.alt = maison.titre;
        imgElement.classList.add("image-maison");

        myImage.classList.add("myImage")
        descriptionElement.classList.add("descriptionElement");
        descriptionElement.innerHTML = `<p>${maison.titre}</p><span class ="ville">${maison.ville}</span><br><span class ="prix">${maison.prix} €</span><br><button class="savoirPlus btnImage">en savoir plus</button>`;
        
        imgElementContainImage.classList.add("containImage")
        
        imgElementContainer.append(imgElementContainImage);
        imgElementContainImage.append(descriptionElement)
        imgElementContainImage.append(imgElement)

        imgElementContainImage.append(myImage)
        myImage.append(imgElement)
        imageMaisons.append(imgElementContainer);
        imgElement.style.display = "block"
        imgElementContainImage.addEventListener('mouseover', function() {
          descriptionElement.style.display = "block"
          console.log(imgElementContainer);
        });
    
        imgElementContainer.addEventListener('mouseout', function() {
          descriptionElement.style.display = "none"; // Réinitialiser le fond lors du survol
        });
      });
    
      
        filteredByPriceTerrain.forEach(terrain => {
          const imgElementContainer = document.createElement("div");
          const imgElementContainImage = document.createElement("div")
          const descriptionElement = document.createElement("div")
          const myImage = document.createElement("div")
          const imgElement = document.createElement("img");
          imgElement.src = `./images/immobilier/${terrain.photos}`;
          imgElement.alt = terrain.titre;
          imgElement.classList.add("image-maison");

          myImage.classList.add("myImage")
          descriptionElement.classList.add("descriptionElement");
          descriptionElement.innerHTML = `<p>${terrain.titre}</p><span class ="ville">${terrain.ville}</span><br><span class ="prix">${terrain.prix} €</span><br><button class="savoirPlus btnImage">en savoir plus</button>`;
          
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

        } else if (selectedOption === "maison") {
          createImageElements(maisonsData, imageMaisons, selectedOption);
        } else if (selectedOption === "appartement") {
          createImageElements(appartementData, imageMaisons, selectedOption);
        } else if (selectedOption === "terrain") {
          createImageElements(terrainData, imageMaisons, selectedOption);
        }
      }
    });
  })
})


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
