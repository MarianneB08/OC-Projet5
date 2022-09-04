/////////////// AFFICHER LE PRODUIT SUR LA PAGE PRODUIT ///////////////

// On récupère l'id du produit dans l'url de la page produit

const url = window.location.href;
const urlDuKanap = new URL(url);
let idDuKanap = "";
let search_params = new URLSearchParams(urlDuKanap.search);

if (search_params.has('id')) {
    idDuKanap = search_params.get('id');
};

// On appelle l'API pour récupérer les caractéristiques du produit

fetch(`http://localhost:3000/api/products/${idDuKanap}`)
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (listeDesKanap) {
        let infosDuKanap;
        for (let i in listeDesKanap) {
            infosDuKanap = i;
            // On injecte les caractéristiques dans la structure HTML
            document.querySelector('#title').innerHTML = (infosDuKanap, listeDesKanap.name);
            document.querySelector('#price').innerHTML = (infosDuKanap, listeDesKanap.price);
            document.querySelector('#description').innerHTML = (infosDuKanap, listeDesKanap.description);
            document.querySelector('.item__img').innerHTML = `<img src="${(infosDuKanap, listeDesKanap.imageUrl)}" alt="${infosDuKanap, listeDesKanap.altTxt}">`;
        }
        const tableauDeCouleurs = listeDesKanap.colors;
        for (let couleur of tableauDeCouleurs) {
            document.querySelector('#colors').innerHTML += `<option value="${couleur}"> ${couleur}</option>`
        }
    })



/////////////// MISE EN PLACE DE MESSAGES D'ALERTES ET AJOUT D'INFOS DANS LE LOCALSTORAGE ///////////////


const couleurInput = document.querySelector("#colors");
const quantiteInput = document.querySelector("#quantity");
const btnAjouterAuPanier = document.querySelector("#addToCart");

btnAjouterAuPanier.addEventListener("click", (e) => {
    if ((couleurInput.value == null || couleurInput.value === "") || (quantiteInput.value == null || quantiteInput.value === "" || quantiteInput.value <= 0)) {
        alert("Veuillez indiquer la couleur et la quantité souhaitées")
    } else if (quantiteInput.value > 100) {
        alert("Vous ne pouvez pas commander plus de 100 produits")
    }
});


/////////////// AJOUTER LE PRODUIT ET SES CARACTÉRISTIQUES AU LOCALSTORAGE ///////////////

btnAjouterAuPanier.addEventListener("click", () => {
    if (quantiteInput.value > 0 && quantiteInput.value < 100 && couleurInput.value != undefined) { // Evénement au clic sur le bouton "Ajouter au panier"
        ajouterAuLocalStorage();
    }
});

function ajouterAuLocalStorage(choixDuClient) {
    choixDuClient = { // Objet contenant les 3 informations qui doivent figurer dans le localStorage
        kanapChoisi: idDuKanap,
        couleurChoisie: couleurInput.value,
        quantiteChoisie: parseInt(quantiteInput.value)
    }
    let contenuDuLocalStorage = JSON.parse(localStorage.getItem("choixDuClient"))
    if (contenuDuLocalStorage === null) { // Cas de figure si le localStorage est vide
        contenuDuLocalStorage = []
        contenuDuLocalStorage.push(choixDuClient)
        localStorage.setItem("choixDuClient", JSON.stringify(contenuDuLocalStorage))
        alert("Votre sélection a bien été ajoutée au panier")
    } else { // Cas de figure si le localStorage contient au moins un élément
        let index = 0;
        for (let v of contenuDuLocalStorage) {
            // Cas de figure si le localStorage contient un élément avec le même ID et la même couleur
            if (v.kanapChoisi === choixDuClient.kanapChoisi && v.couleurChoisie === choixDuClient.couleurChoisie) {
                const nouvelleQuantite = v.quantiteChoisie += choixDuClient.quantiteChoisie
                contenuDuLocalStorage.splice(index,1)
                const majChoixDuClient = {
                    majId: v.kanapChoisi,
                    majCouleur: v.couleurChoisie,
                    majQuantite: nouvelleQuantite
                }
                contenuDuLocalStorage.push(majChoixDuClient)
                localStorage.setItem("choixDuClient", JSON.stringify(contenuDuLocalStorage))
                index++;
                break
            }   // Cas de figure si le localStorage contient un élément avec le même ID mais pas la même couleur
                else if (v.kanapChoisi === choixDuClient.kanapChoisi && v.couleurChoisie !== choixDuClient.couleurChoisie) {
                contenuDuLocalStorage.push(choixDuClient)
                localStorage.setItem("choixDuClient", JSON.stringify(contenuDuLocalStorage))
                index++;
                break
            }
        }
    }
}