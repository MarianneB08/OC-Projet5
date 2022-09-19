/////////////// AFFICHAGE DU CONTENU DU PANIER ///////////////

// On récupère le contenu du localStorage
let contenuLocalStorage = JSON.parse(localStorage.getItem("choixClient"));

// Variables globales
let url = "http://localhost:3000/api/products/";
const prixProduitsAPI = [];
let totalArticles = document.getElementById('totalQuantity');
let totalPrix = document.getElementById('totalPrice');
let modifPluriel = document.querySelector(".cart__price p");
let modifSingulier = document.createElement("p");
let parentModifSingulier = document.querySelector(".cart__price");
let sommeQuantites;
let sommePrix;
const formulaire = document.querySelector(".cart__order__form");

// Modification de la balise meta title de la page 

document.title = "Panier";

// Fonction pour accorder au singulier du mot "Articles" si le nombre de produits est inférieur à 2
function accordSingulier(sommeQuantites, sommePrix) {
    modifPluriel.remove();
    modifSingulier.innerHTML += `Total (<span>${sommeQuantites}</span> article) : <span id="totalPrice">${sommePrix}</span> €`;
    parentModifSingulier.appendChild(modifSingulier);
}

// Affichage des totaux de la page lorsque le panier est vide
if (contenuLocalStorage === null || contenuLocalStorage == 0) {
    document.querySelector("h1").innerHTML = "Votre panier est vide";
    accordSingulier(0, 0);
}

// On récupère les informations depuis l'API en fonction des ID contenus dans le localStorage
for (element of contenuLocalStorage) {
    let kanap = element;
    fetch(`${url}${kanap.kanapChoisi}`)
        .then((response) => response.json())
        .then((produit) => {
            prixProduitsAPI.push(produit.price * kanap.quantiteChoisie);
            let itemPanier = affichagePanier(produit, kanap);
            const cartItems = document.getElementById("cart__items");
            cartItems.appendChild(itemPanier);
            afficherTotalArticlesEtPrix(contenuLocalStorage, prixProduitsAPI);
        })
        .catch((erreur) => {
            alert("Aucune information trouvée dans l'API");
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

    // Affichage et styles du bouton "Supprimer"
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
        afficherTotalArticlesEtPrix(contenuLocalStorage, prixProduitsAPI);
    })
    return cartItemArticle;
}

// Affichage du nombre total d'articles et du prix total du panier
function afficherTotalArticlesEtPrix(contenuLocalStorage, prixProduitsAPI) {
    let quantiteAffichee = contenuLocalStorage.map(contenuLocalStorage => contenuLocalStorage.quantiteChoisie);

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

    if (sommeQuantites < 2) { // Accord du mot "Articles" au singulier lorsque le panier contient moins de 2 produits
        accordSingulier(sommeQuantites, sommePrix);
    }
}

// Modification de la quantité de chaque produit par l'intermédiaire de l'input 
function modifierQuantite(e) {
    let seuilSuperieur = 100;
    let alerteNombreProduitsMax = "Vous ne pouvez pas commander plus de 100 produits";
    let produitCible = e.target.closest("article");
    let quantiteProduit = e.target.closest(".itemQuantity");
    if (quantiteProduit.value > seuilSuperieur) {
        alert(alerteNombreProduitsMax);
    } else {
        let rechercheProduit = contenuLocalStorage.find(kanap => kanap.kanapChoisi == produitCible.dataset.id && kanap.couleurChoisie == produitCible.dataset.color);
        let nouvelleQuantite = parseInt(quantiteProduit.value);
        rechercheProduit.quantiteChoisie = nouvelleQuantite;
        localStorage.setItem("choixClient", JSON.stringify(contenuLocalStorage));
    }
}

// Suppression avec le bouton "Supprimer"

function btnSuppression(e) {
    let produit_a_supprimer = e.target.closest('[data-id]');

    let indexDuProduitASupprimer = contenuLocalStorage.findIndex((contenuLocalStorage) =>
        contenuLocalStorage.kanapChoisi == produit_a_supprimer.dataset.id &&
        contenuLocalStorage.couleurChoisie == produit_a_supprimer.dataset.color);

    if (produit_a_supprimer._id == contenuLocalStorage.kanapChoisi) {
        produit_a_supprimer.remove();
        contenuLocalStorage.splice(indexDuProduitASupprimer, 1);
        localStorage.setItem("choixClient", JSON.stringify(contenuLocalStorage));
        window.location.reload();
        if (contenuLocalStorage == 0 || contenuLocalStorage === null) {
            localStorage.clear();
            alert("Votre panier est vide");
        }
    }
}

// Définition des expressions régulières pour vérifier le contenu des inputs du formulaire
let emailRegExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
let texteRegExp = new RegExp(/^[a-zéèçàA-Z- ]{2,50}$/);
let adresseRegExp = new RegExp(/^[a-zéèçàA-Z0-9- ]{2,50}$/);

// Fonction de vérification des inputs Prénom, Nom et Ville du formulaire
function validationInputTexte(inputTexte) {
    let inputTexteMessageErreur = inputTexte.nextElementSibling;

    if (texteRegExp.test(inputTexte.value)) {
        inputTexteMessageErreur.textContent = "";
        return true;
    } else {
        inputTexteMessageErreur.textContent = "Saisie non valide";
        return false;
    }
}

// Fonction de vérification de l'input Adresse du formulaire

function validationInputAdresse(inputAdresse) {
    let inputAdresseMessageErreur = inputAdresse.nextElementSibling;

    if (adresseRegExp.test(inputAdresse.value)) {
        inputAdresseMessageErreur.textContent = "";
        return true;
    } else {
        inputAdresseMessageErreur.textContent = "Adresse non valide";
        return false;
    }
}


// Fonction de vérification de l'input Email du formulaire
function validationInputEmail(inputEmail) {
    let inputEmailMessageErreur = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        inputEmailMessageErreur.textContent = "";
        return true;
    } else {
        inputEmailMessageErreur.textContent = "Adresse e-mail non valide";
        return false;
    }
}

// Écoute et comparaison des différents inputs du formulaire avec les RegExp
formulaire.firstName.addEventListener("change", function () {
    validationInputTexte(this);
})

formulaire.lastName.addEventListener("change", function () {
    validationInputTexte(this);
})

formulaire.address.addEventListener("change", function () {
    validationInputAdresse(this);
})

formulaire.city.addEventListener("change", function () {
    validationInputTexte(this);
})

formulaire.email.addEventListener("change", function () {
    validationInputEmail(this);
})

// Écoute du bouton "Commander !" et conséquences du clic
formulaire.order.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le rechargement automatique de la page au clic

    if (prixProduitsAPI.length === 0) { // Alerte dans le cas où le client clique alors que le panier est vide
        alert("Votre panier est vide ! Vous ne pouvez pas passer commande.");
        return
    }
    // Cas de figure dans lequel tous les inputs sont correctement remplis
    else if (validationInputTexte(formulaire.firstName) &&
        validationInputTexte(formulaire.lastName) &&
        validationInputAdresse(formulaire.address) &&
        validationInputTexte(formulaire.city) &&
        validationInputEmail(formulaire.email)
    ) {
        const body = requeteBody();
        const stringifiedBody = JSON.stringify(body);

        // Mise en place de la route POST pour envoyer la commande et les informations saisies dans le formulaire à l'API
        fetch(`${url}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: stringifiedBody
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                document.location.href = `./confirmation.html?orderId=${data.orderId}`;
            })
            .catch(function (error) {
                alert("Aucune information trouvée à partir de l'API");
            })
    } else {
        alert("Le formulaire est incorrect ou incomplet");
    }

    function requeteBody() {
        const prenom = formulaire.firstName.value;
        const nom = formulaire.lastName.value;
        const adresse = formulaire.address.value;
        const ville = formulaire.city.value;
        const email = formulaire.email.value;

        let idProduit = [];
        for (let i = 0; i < contenuLocalStorage.length; i++) {
            idProduit.push(contenuLocalStorage[i].kanapChoisi);
        }

        const body = {
            contact: {
                firstName: prenom,
                lastName: nom,
                address: adresse,
                city: ville,
                email: email
            },
            products: idProduit
        }
        return body
    }
})