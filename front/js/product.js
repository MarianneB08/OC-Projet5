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
.then(function(products){
    let itemInfos;
    for(let i in products){
        itemInfos = i;
        console.log(itemInfos, products[i]);
        //console.log(itemInfos, products[i].name);
        document.querySelector('#title').innerHTML = (itemInfos, products[i].name);
        document.querySelector('#price').innerHTML = (itemInfos, products[i].price);
        document.querySelector('#description').innerHTML = (itemInfos, products[i].description);
        document.querySelector('.item__img').innerHTML = `<img src="${(itemInfos, products[i].imageUrl)}" alt="${itemInfos, products[i].altTxt}">`;
    }
}).catch(function(erreur) {
    console.log("erreur!");
})

