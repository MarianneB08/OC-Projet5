/////////////// AFFICHER LES PRODUITS SUR LA PAGE D'ACCUEIL ///////////////

let produits = [];

// Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function(produits) {
        for(let exemplaire in produits) {
            // On injecte les caractéristiques de chaque produit dans une card
            document.querySelector(".items")
            .innerHTML +=`<a href="./product.html?id=${produits[exemplaire]._id}">
            <article> 
              <img src=${produits[exemplaire].imageUrl} alt=${produits[exemplaire].altTxt}>
              <h3 class="productName">${produits[exemplaire].name}</h3>
              <p class="productDescription">${produits[exemplaire].description}</p>
            </article>
          </a>`
        }
    });
