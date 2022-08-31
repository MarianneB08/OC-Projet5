/////////////// AFFICHER LE PRODUIT SUR LA PAGE PRODUIT ///////////////

// On récupère l'id du produit dans l'url de la page produit

const url = window.location.href;
const urlProduct = new URL(url);
let idProduct = "";
let search_params = new URLSearchParams(urlProduct.search);

if (search_params.has('id')) {
    idProduct = search_params.get('id');
};

// On appelle l'API pour récupérer les caractéristiques du produit

fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        let itemInfos;
        for (let i in products) {
            itemInfos = i;
            // On injecte les caractéristiques dans la structure HTML
            document.querySelector('#title').innerHTML = (itemInfos, products.name);
            document.querySelector('#price').innerHTML = (itemInfos, products.price);
            document.querySelector('#description').innerHTML = (itemInfos, products.description);
            document.querySelector('.item__img').innerHTML = `<img src="${(itemInfos, products.imageUrl)}" alt="${itemInfos, products.altTxt}">`;
        }
        const colorArray = products.colors;
        for (let color of colorArray) {
            document.querySelector('#colors').innerHTML += `<option value="${color}"> ${color}</option>`
        }
    })



/////////////// AJOUTER LE PRODUIT ET SES CARACTÉRISTIQUES AU LOCALSTORAGE ///////////////


const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
const btnAddToBasket = document.querySelector("#addToCart");

btnAddToBasket.addEventListener("click", (e) => {
    if((color.value == null || color.value === "") || (quantity.value == null || quantity.value === "" || quantity.value <= 0)){
        alert("Veuillez indiquer la couleur et la quantité souhaitées")
    }else if(quantity.value > 0 && quantity.value < 100) {
         const choices = {
            id: idProduct,
            color: color.value,
            quantity: quantity.value
         }
    }else if(quantity.value > 100) {
        alert("Vous ne pouvez pas commander plus de 100 produits")
    }
});