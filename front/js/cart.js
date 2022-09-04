
const cartContent = localStorage.getItem("customerChoice");
const cartItems = JSON.parse(cartContent);



/*
// Fonction pour enregistrer le panier dans le localStorage

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fonction pour récupérer le contenu du localStorage

function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null){
        return [];
    }else {
        return JSON.parse(cart);
    }
}

// Fonction d'ajout au panier

function addCart(product) {
    let cart = getCart(); // On récupère le panier qui existe dans le localStorage
    let foundProduct = cart.find(p => p.id == product.id) // On cherche dans le panier s'il existe déjà un produit dont l'ID correspond à l'ID du produit qu'on veut ajouter
    if (foundProduct != undefined) {
        foundProduct.quantity++
    }else{
        product.quantity = 1;
        cart.push(product); // Ajout du produit au panier
    }
    saveCart(cart); // On enregistre le nouveau panier après l'ajout du produit
}

// Fonction pour supprimer un produit du panier

function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}

// Changer la quantité d'un produit 

function changeQuantity(product, quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        }else {
            saveCart(cart);
        }
    }
}

// Calcul du nombre de produits dans le panier

function getNumberProduct(){
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}

// Calcul du prix total du panier

function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart){
        total += product.quantity * product.price;
    }
    return total;
}*/