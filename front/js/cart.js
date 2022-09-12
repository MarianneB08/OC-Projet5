// On récupère le contenu du localStorage
let contenuDuLocalStorage = JSON.parse(localStorage.getItem("choixDuClient"));

// Variables globales
const prixProduitsAPI = [];

// On récupère les informations depuis l'API en fonction des ID contenus dans le localStorage
for (element of contenuDuLocalStorage) {
    let kanap = element;
    fetch(`http://localhost:3000/api/products/${kanap.kanapChoisi}`)
        .then((response) => response.json())
        .then((produit) => {
            prixProduitsAPI.push(produit.price * kanap.quantiteChoisie);
            let itemPanier = affichagePanier(produit, kanap);
            const cartItems = document.getElementById("cart__items");
            cartItems.appendChild(itemPanier);
            afficherTotalArticlesEtPrix(contenuDuLocalStorage, prixProduitsAPI);
        })
}


// On initie la fonction qui affiche chaque fiche produit dans le panier
function affichagePanier(produit, kanap) {

    let cartItemArticle = document.createElement("article");
    cartItemArticle.classList.add("cart__item");
    cartItemArticle.setAttribute("data-id", kanap.kanapChoisi);
    cartItemArticle.setAttribute("data-color", kanap.couleurChoisie);

    // Affichage de la photo du produit
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

    // Affichage du nom du produit
    let nomProduit = document.createElement("h2");
    nomProduit.textContent = produit.name;
    cartItemContentDescription.appendChild(nomProduit);

    // Affichage de la couleur du produit
    let couleurProduit = document.createElement("p");
    couleurProduit.textContent = kanap.couleurChoisie;
    cartItemContentDescription.appendChild(couleurProduit);

    // Affichage du prix du produit
    let prixProduit = document.createElement("p");
    prixProduit.textContent = (produit.price * kanap.quantiteChoisie) + " €";
    cartItemContentDescription.appendChild(prixProduit);

    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    // Affichage de l'input pour changer la quantité souhaitée du produit
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

    // Affichage du bouton "Supprimer"
    let btnDelete = document.createElement("p");
    btnDelete.classList.add("deleteItem");
    btnDelete.textContent = "Supprimer";
    cartItemDelete.appendChild(btnDelete);
    btnDelete.addEventListener("click", (e) => {
        btnSuppression(e);
        afficherTotalArticlesEtPrix(contenuDuLocalStorage, prixProduitsAPI);
    })

    return cartItemArticle;
}

// Affichage du nombre total d'articles et du prix total du panier
function afficherTotalArticlesEtPrix(contenuDuLocalStorage, prixProduitsAPI) {
    let quantiteAffichee = contenuDuLocalStorage.map(contenuDuLocalStorage => contenuDuLocalStorage.quantiteChoisie);
    const sommeQuantites = quantiteAffichee.reduce(
        (sum, currentQuantite) => {
            return sum += currentQuantite
        }
    )
    let totalArticles = document.getElementById('totalQuantity');
    totalArticles.innerHTML = sommeQuantites;

    const sommePrix = prixProduitsAPI.reduce(
        (sum, currentPrix) => {
            return sum += currentPrix
        }
    )
    let totalPrix = document.getElementById('totalPrice');
    totalPrix.innerHTML = sommePrix;
}


// Suppression avec le bouton "Supprimer"

function btnSuppression(e) {
    let produit_a_supprimer = e.target.closest('[data-id]');

    let indexDuProduitASupprimer = contenuDuLocalStorage.findIndex((contenuDuLocalStorage) => 
    contenuDuLocalStorage.kanapChoisi == produit_a_supprimer.dataset.id &&
    contenuDuLocalStorage.couleurChoisie == produit_a_supprimer.dataset.color);

    if (produit_a_supprimer._id == contenuDuLocalStorage.kanapChoisi) {
        produit_a_supprimer.remove();
        contenuDuLocalStorage.splice(indexDuProduitASupprimer, 1);
        localStorage.setItem("choixDuClient", JSON.stringify(contenuDuLocalStorage));
        window.location.reload();
        if (contenuDuLocalStorage == 0 || contenuDuLocalStorage === null) {
            localStorage.clear();
        }
    }
    
}