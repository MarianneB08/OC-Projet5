// On récupère le contenu du localStorage
let contenuDuLocalStorage = JSON.parse(localStorage.getItem("choixDuClient"));


// On récupère les informations depuis l'API en fonction des ID contenus dans le localStorage
for (element of contenuDuLocalStorage){
    let kanap = element;
    fetch(`http://localhost:3000/api/products/` + kanap.kanapChoisi)
    .then((response) => response.json())
    .then((produit) => {
        let itemPanier = affichagePanier(produit, kanap);
        const cartItems = document.getElementById("cart__items");
        cartItems.appendChild(itemPanier);
    })
}

// On initie la fonction qui affiche chaque fiche produit dans le panier
function affichagePanier(produit, kanap) {

    let cartItemArticle = document.createElement("article");
    cartItemArticle.classList.add("cart__item");
    cartItemArticle.setAttribute("data-id", kanap.kanapChoisi);
    cartItemArticle.setAttribute("data-color", kanap.couleurChoisie);

    let cartImgDiv = document.createElement("div");
    cartImgDiv.classList.add("cart__item__img");
    cartItemArticle.appendChild(cartImgDiv);

    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", produit.imageUrl);
    cartImg.setAttribute("alt", produit.altTxt);
    cartImgDiv.appendChild(cartImg);

    let cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    cartItemArticle.appendChild(cartItemContent);

    let cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartItemContentDescription);

    let nomProduit = document.createElement("h2");
    nomProduit.textContent = produit.name;
    cartItemContentDescription.appendChild(nomProduit);

    let couleurProduit = document.createElement("p");
    couleurProduit.textContent = kanap.couleurChoisie;
    cartItemContentDescription.appendChild(couleurProduit);

    let prixProduit = document.createElement("p");
    prixProduit.textContent = produit.price + " €";
    cartItemContentDescription.appendChild(prixProduit);

    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let quantity = document.createElement("p");
    quantity.textContent = "Qté : ";
    cartItemContentSettingsQuantity.appendChild(quantity);

    let itemQuantity = document.createElement("input");
    itemQuantity.setAttribute("type", "number");
    itemQuantity.classList.add("itemQuantity");
    itemQuantity.setAttribute("name", "itemQuantity");
    itemQuantity.setAttribute("min", "1");
    itemQuantity.setAttribute("max", "100");
    itemQuantity.setAttribute("value", kanap.quantiteChoisie);
    cartItemContentSettingsQuantity.appendChild(itemQuantity);

    let cartItemDelete = document.createElement("div");
    cartItemDelete.classList.add("cart__item__content__settings__delete");
    cartItemContentSettings.appendChild(cartItemDelete);

    let btnDelete = document.createElement("p");
    btnDelete.classList.add("deleteItem");
    btnDelete.textContent = "Supprimer";

    return cartItemArticle;
}
