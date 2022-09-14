// On récupère le contenu du localStorage
let contenuDuLocalStorage = JSON.parse(localStorage.getItem("choixDuClient"));
let url = "http://localhost:3000/api/products/";

// Variables globales
const prixProduitsAPI = [];
let totalArticles = document.getElementById('totalQuantity');
let totalPrix = document.getElementById('totalPrice');
let modifPluriel = document.querySelector(".cart__price p");
let modifSingulier = document.createElement("p");
let parentModifSingulier = document.querySelector(".cart__price");
let sommeQuantites;
let sommePrix;


// Accord au singulier du mot "Articles" si le nombre de produits est inférieur à 2
function accordSingulier(sommeQuantites, sommePrix) {
    modifPluriel.remove();
    modifSingulier.innerHTML += `Total (<span>${sommeQuantites}</span> article) : <span id="totalPrice">${sommePrix}</span> €`;
    parentModifSingulier.appendChild(modifSingulier);
}

// Affichage des totaux de la page lorsque le panier est vide
if (contenuDuLocalStorage === null || contenuDuLocalStorage == 0) {
    totalArticles.innerHTML = "0";
    totalPrix.innerHTML = "0";
    document.querySelector("h1").innerHTML = "Votre panier est vide";
    accordSingulier(0, 0);
}

// Bouton Commander

let btnCommander = document.querySelector("#order");
btnCommander.addEventListener("click", (e) => {
    e.preventDefault();
    envoiDuFormulaire();
})

// Soumission du formulaire

function envoiDuFormulaire() {
    if (prixProduitsAPI.length === 0) {
        alert("Votre panier est vide ! Vous ne pouvez pas passer commande.");
    }
    //const formulaire = document.querySelector(".cart__order__form");
    const body = requeteBody();
    const stringifiedBody = JSON.stringify(body);
    fetch(`${url}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: stringifiedBody
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

function requeteBody() {
    const body = {
        contact: {
            firstName: "blabla",
            lastName: "blabla",
            address: "blabla",
            city: "blabla",
            email: "blabla"
        },
        products: ["107fb5b75607497b96722bda5b504926"]
    }
    return body;
}



// On récupère les informations depuis l'API en fonction des ID contenus dans le localStorage
for (element of contenuDuLocalStorage) {
    let kanap = element;
    fetch(`${url}${kanap.kanapChoisi}`)
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
    couleurProduit.textContent = `Couleur : ${kanap.couleurChoisie}`;
    cartItemContentDescription.appendChild(couleurProduit);

    // Affichage du prix du produit
    let prixProduit = document.createElement("p");
    prixProduit.textContent = `Prix total : ${produit.price * kanap.quantiteChoisie} €`;
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
    itemQuantity.addEventListener("change", (e) => {
        modifierQuantite(e);
        window.location.reload();
    })

    let cartItemDelete = document.createElement("div");
    cartItemDelete.classList.add("cart__item__content__settings__delete");
    cartItemContentSettings.appendChild(cartItemDelete);

    // Affichage du bouton "Supprimer"
    let btnDelete = document.createElement("button");
    btnDelete.classList.add("deleteItem");
    btnDelete.textContent = "Supprimer";
    btnDelete.style.marginTop = "20px";
    btnDelete.style.fontSize = "14px";
    btnDelete.style.borderRadius = "30px";
    btnDelete.style.boxShadow = "none";
    btnDelete.style.background = "white";
    btnDelete.style.border = "2px black";
    btnDelete.style.padding = "7px";
    btnDelete.style.fontFamily = "Montserrat";
    btnDelete.style.cursor = "pointer";
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

    sommeQuantites = quantiteAffichee.reduce(
        (sum, currentQuantite) => {
            return sum + currentQuantite
        }
    )
    totalArticles.innerHTML = sommeQuantites;

    sommePrix = prixProduitsAPI.reduce(
        (sum, currentPrix) => {
            return sum + currentPrix
        }
    )
    totalPrix.innerHTML = sommePrix;

    if (sommeQuantites < 2) {
        accordSingulier(sommeQuantites, sommePrix);
    }
}

// Modification de la quantité de chaque produit par l'intermédiaire de l'input 
function modifierQuantite(e) {
    let produitCible = e.target.closest("article");
    let quantiteProduit = e.target.closest(".itemQuantity");
    let rechercheProduit = contenuDuLocalStorage.find(kanap => kanap.kanapChoisi == produitCible.dataset.id && kanap.couleurChoisie == produitCible.dataset.color);
    let nouvelleQuantite = parseInt(quantiteProduit.value);
    rechercheProduit.quantiteChoisie = nouvelleQuantite;
    localStorage.setItem("choixDuClient", JSON.stringify(contenuDuLocalStorage));
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
            alert("Votre panier est vide");
        }
    }
}