/////////////// AFFICHAGE DES PRODUITS SUR LA PAGE D'ACCUEIL ///////////////

const url = "http://localhost:3000/api/products";

// Récupération des données de l'API
fetch(`${url}`)
  .then(function (reponse) {
    return reponse.json();
  })
  .catch(function (error) {
    alert("Aucun produit n'a été trouvé.");
  })
  .then(function (produits) {
    for (let exemplaire in produits) {
      // On injecte les caractéristiques de chaque produit dans une card
      let section = document.querySelector(".items");
      let cardKanap = document.createElement("a");
      cardKanap.href = `./product.html?id=${produits[exemplaire]._id}`;
      section.appendChild(cardKanap);

      let kanapArticle = document.createElement("article");
      cardKanap.appendChild(kanapArticle);

      let kanapImg = document.createElement("img");
      kanapImg.src = produits[exemplaire].imageUrl;
      kanapImg.alt = produits[exemplaire].altTxt;
      kanapArticle.appendChild(kanapImg);

      let kanapNom = document.createElement("h3");
      kanapNom.classList.add("productName");
      kanapNom.textContent = produits[exemplaire].name;
      kanapArticle.appendChild(kanapNom);

      let kanapDescription = document.createElement("p");
      kanapDescription.classList.add("productDescription");
      kanapDescription.textContent = produits[exemplaire].description;
      kanapArticle.appendChild(kanapDescription);
    }
  });