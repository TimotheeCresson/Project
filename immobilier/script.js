fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Access the .imageMaisons element
    const imageMaisons = document.querySelector('.imageMaisons');

    // Get the "maison" array from the JSON data
    const maisonsData = data.maison;

    // Loop through the "maison" array and create image elements
    maisonsData.forEach(maison => {
      const imgElement = document.createElement('img');
      imgElement.src = `./images/immobilier/${maison.photos}`;
      imgElement.alt = maison.titre;

      // Append the image element to .imageMaisons
      imageMaisons.appendChild(imgElement);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));