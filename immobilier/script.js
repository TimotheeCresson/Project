fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const imageMaisons = document.querySelector('.imageMaisons');

    // on prend le tableau des maisons dans le data de Json
    const maisonsData = data.maison;

    // on parcours tout notre tableau de maisons et on crée pour chacune une zone image
    maisonsData.forEach(maison => {
      const imgElement = document.createElement('img');
      imgElement.src = `./images/immobilier/${maison.photos}`;
      imgElement.alt = maison.titre;

      imgElement.classList.add("image-maison");
      imageMaisons.append(imgElement);

    imgElement.addEventListener('mouseover', ()=>{
      const imgElementHover = document.createElement('div')
      imgElementHover.classList.add("imgElementHover")
      imgElementHover.style.background = `url("./images/header/headerbg.jpg")`
      imgElementHover.style.opacity = "0.5"
      imgElement.append(imgElementHover)
      console.log(imgElementHover);
    });

  

    });

      const mediaQuery = window.matchMedia( '(max-width: 619px)')

      function handleMediaQueryChange(mediaQuery) {
        const maisonsImages = document.querySelectorAll(".image-maison")

        if (mediaQuery.matches) {
          if (maisonsImages.length > 0) {
            maisonsImages[0].style.display = "none"
            maisonsImages[1].style.display = "none"
            maisonsImages[2].style.display = "none"
          }
        } else {
            // Si l'écran est plus grand que 620px, assurez-vous que l'image n'est pas masquée
            if (maisonsImages.length > 0) {
              maisonsImages[0].style.display = 'block';
              maisonsImages[1].style.display = "block"
              maisonsImages[2].style.display = "block"
        }
      }
    }

      mediaQuery.addEventListener("change", handleMediaQueryChange)

handleMediaQueryChange(mediaQuery);
  })
  .catch(error => console.error('Error fetching JSON:', error));


