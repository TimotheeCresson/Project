fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const tousType = document.getElementById("tousType");
    const optionBiens = tousType.querySelectorAll("option");
    const lancerRecherche = document.querySelector(".lancerRecherche");
    const imageMaisons = document.querySelector(".imageMaisons");
    const appart = document.getElementById("appartement");

    console.log(appart);
    const maison = document.getElementById("maison");
    const terrain = document.getElementById("terrain");
    const maisonsData = data.maison;
    const appartementData = data.appartement;
    const terrainData = data.terrain;

    appart.addEventListener("click", () => {
      imageMaisons.innerHTML = "";
      maisonsData.forEach((maison) => {
        const imgElement = document.createElement("img");
        imgElement.src = `./images/immobilier/${maison.photos}`;
        imgElement.alt = maison.titre;
        imgElement.classList.add("image-maison"); // on rajoute dans la class la valeur de l'option
        imageMaisons.append(imgElement);
      });
    });

    maison.addEventListener("click", () => {
      imageMaisons.innerHTML = "";
      appartementData.forEach((appartement) => {
        const imgElement = document.createElement("img");
        imgElement.src = `./images/immobilier/${appartement.photos}`;
        imgElement.alt = appartement.titre;
        imgElement.classList.add("image-maison");
        imageMaisons.append(imgElement);
      });
    });

    terrain.addEventListener("click", () => {
      imageMaisons.innerHTML = "";
      terrainData.forEach((terrain) => {
        const imgElement = document.createElement("img");
        imgElement.src = `./images/immobilier/${terrain.photos}`;
        imgElement.alt = terrain.titre;
        imgElement.classList.add("image-maison");
        imageMaisons.append(imgElement);
      });
    });

    lancerRecherche.addEventListener("click", () => {
      const imageMaisons = document.querySelector(".imageMaisons");
      // enlever les images avant d'en rajouter
      imageMaisons.innerHTML = "";

      let selectedOption;

      optionBiens.forEach((option) => {
        if (option.selected) {
          selectedOption = option.value;
        }

        if (option.value === "tousType") {
          maisonsData.forEach((maison) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${maison.photos}`;
            imgElement.alt = maison.titre;
            imgElement.classList.add("image-maison", option.value); // on rajoute dans la class la valeur de l'option
            imageMaisons.append(imgElement);
          });
          appartementData.forEach((appartement) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${appartement.photos}`;
            imgElement.alt = appartement.titre;
            imgElement.classList.add("image-maison", option.value);
            imageMaisons.append(imgElement);
          });
          terrainData.forEach((terrain) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${terrain.photos}`;
            imgElement.alt = terrain.titre;
            imgElement.classList.add("image-maison", option.value);
            imageMaisons.append(imgElement);
          });
        } else if (option.value === "maison") {
          maisonsData.forEach((maison) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${maison.photos}`;
            imgElement.alt = maison.titre;
            imgElement.classList.add("image-maison", option.value); // on rajoute dans la class la valeur de l'option
            imageMaisons.append(imgElement);
          });
        } else if (option.value === "appartement") {
          appartementData.forEach((appartement) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${appartement.photos}`;
            imgElement.alt = appartement.titre;
            imgElement.classList.add("image-maison", option.value);
            imageMaisons.append(imgElement);
          });
        } else if (option.value === "terrain") {
          terrainData.forEach((terrain) => {
            const imgElement = document.createElement("img");
            imgElement.src = `./images/immobilier/${terrain.photos}`;
            imgElement.alt = terrain.titre;
            imgElement.classList.add("image-maison", option.value);
            imageMaisons.append(imgElement);
          });
        }
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

    // imageMaisons.addEventListener("mouseover", () => {
    //   imageMaisons.style.background = `url("./images/header/headerbg.jpg")`;
    //   console.log(imageMaisons);
    // });

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
