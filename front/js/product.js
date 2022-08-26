const url = window.location.href;
const urlProduct = new URL(url);
let idProduct = "";

let search_params = new URLSearchParams(urlProduct.search);

if(search_params.has('id')) {
    idProduct = search_params.get('id');
};

fetch(`http://localhost:3000/api/products/${idProduct}`)
.then(function (response) {
    return response.json();
})
.then(function(products) {
    console.log(products);
})


/*Pour afficher les caractéristiques d'un seul produit, il faut d'abord récupérer l'id du produit.

Comment accéder à l'id du produit ? 
- dans l'URL de chaque page

On sait que URLSearchParams peut nous aider à accéder à cet id .
*/

