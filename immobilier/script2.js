// Fonction pour créer une image avec gestionnaires d'événements
function createImageElement(data, optionValue) {
    const imgElement = document.createElement("img");
    imgElement.src = `./images/immobilier/${data.photos}`;
    imgElement.alt = data.titre;
    imgElement.classList.add("image-maison", optionValue);
  
    imgElement.addEventListener('mouseover', function () {
      imgElement.style.backgroundImage = 'url(./images/header/headerbg.jpg)';
    });
  
    imgElement.addEventListener('mouseout', function () {
      imgElement.style.backgroundImage = 'initial';
    });
  
    return imgElement;
  }
  
  // Fonction pour vider le contenu de l'élément
  function clearElementContent(image) {
    image.innerHTML = "";
  }
  
  // Fonction pour gérer le clic sur un type de bien
  function handleTypeClick(data, optionValue, imageMaisons) {
    clearElementContent(imageMaisons);
  
    data.forEach((item) => {
      const imgElement = createImageElement(item, optionValue);
      imageMaisons.append(imgElement);
    });
  }
  
  // Fonction pour gérer le clic sur le bouton de recherche
  function handleSearchClick(optionBiens, imageMaisons, maisonsData, appartementData, terrainData) {
    const selectedOption = Array.from(optionBiens).find((option) => option.selected)?.value || "tousType";
  
    clearElementContent(imageMaisons);
  
    if (selectedOption === "tousType") {
      handleTypeClick(maisonsData, "tousType", imageMaisons);
      handleTypeClick(appartementData, "tousType", imageMaisons);
      handleTypeClick(terrainData, "tousType", imageMaisons);
    } else {
      const selectedData = selectedOption === "maison" ? maisonsData :
        selectedOption === "appartement" ? appartementData :
        selectedOption === "terrain" ? terrainData : [];
  
      handleTypeClick(selectedData, selectedOption, imageMaisons);
    }
  
    hideAllImages();
    showSelectedImages(selectedOption);
  }
  
  // Fonction pour masquer toutes les images
  function hideAllImages() {
    document.querySelectorAll(".image-maison").forEach((img) => {
      img.style.display = "none";
    });
  }
  
  // Fonction pour afficher seulement les images associées à l'option sélectionnée
  function showSelectedImages(selectedOption) {
    document
      .querySelectorAll(`.image-maison.${selectedOption}`)
      .forEach((img) => {
        img.style.display = "block";
      });
  }
  
  // Fonction pour gérer les changements de média query
  function handleMediaQueryChange(mediaQuery, maisonsImages) {
    maisonsImages.forEach((image) => {
      image.style.display = mediaQuery.matches ? "none" : "block";
    });
  }
  
  // Main code
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
  
      maison.addEventListener("click", () => handleTypeClick(maisonsData, "maison", imageMaisons));
      appart.addEventListener("click", () => handleTypeClick(appartementData, "appartement", imageMaisons));
      terrain.addEventListener("click", () => handleTypeClick(terrainData, "terrain", imageMaisons));
  
      lancerRecherche.addEventListener("click", () =>
        handleSearchClick(optionBiens, imageMaisons, maisonsData, appartementData, terrainData)
      );
  
      imageMaisons.addEventListener('mouseout', function () {
        imageMaisons.style.backgroundImage = 'initial';
      });
  
      const mediaQuery = window.matchMedia("(max-width: 619px)");
  
      mediaQuery.addEventListener("change", () => handleMediaQueryChange(mediaQuery, document.querySelectorAll(".image-maison")));
      handleMediaQueryChange(mediaQuery, document.querySelectorAll(".image-maison"));
    })
    .catch((error) => console.error("Error fetching JSON:", error));
  