let products = [];

// Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function(products) {
        for(let product in products) {
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
