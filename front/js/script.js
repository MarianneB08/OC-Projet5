/////////////// AFFICHER LES PRODUITS SUR LA PAGE D'ACCUEIL ///////////////

let products = [];

// Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function(products) {
        for(let product in products) {
            // On injecte les caractéristiques de chaque produit dans une card
            document.querySelector(".items")
            .innerHTML +=`<a href="./product.html?id=${products[product]._id}">
            <article> 
              <img src=${products[product].imageUrl} alt=${products[product].altTxt}>
              <h3 class="productName">${products[product].name}</h3>
              <p class="productDescription">${products[product].description}</p>
            </article>
          </a>`
        }
    });
