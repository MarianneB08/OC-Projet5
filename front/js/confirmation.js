/////////////// AFFICHAGE DE LA PAGE DE CONFIRMATION ET DU NUMÉRO DE COMMANDE ///////////////

// Récupération de l'id de la commande depuis l'url de la page de confirmation
const url = window.location.href;
const urlCommande = new URL(url);
let search_params = new URLSearchParams(urlCommande.search);
let idCommande = "";

if (search_params.has('orderId')) {
    idCommande = search_params.get('orderId');
};

// Injection de l'id de la commande dans le message de confirmation
let idCommandeSpan = document.querySelector("#orderId");
idCommandeSpan.textContent = `${idCommande}`;