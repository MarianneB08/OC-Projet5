let product = JSON.parse(localStorage.getItem("choixDuClient"));
//console.log(product);

//Mise en lien de l'API avec le localStorage
for (productinStorage of product) {
    console.log(product);
    let productStorage = productinStorage;
    //console.log(productinStorage);
    fetch('http://localhost:3000/api/products/' + productStorage.kanapChoisi)
        .then((res) => res.json())
        .then((product) => {
            let elementPanier = displayPanier(product, productStorage);
            const cartItems = document.getElementById('cart__items');
            cartItems.appendChild(elementPanier);
            totalArticle(product, productStorage);
        })
};

//Mise en forme de la page Panier//
function displayPanier(product, productStorage) {

    let cartItemArticle = document.createElement('article');
    cartItemArticle.classList.add('cart__item');
    cartItemArticle.setAttribute('data-id', product._id);
    cartItemArticle.setAttribute('data-color', productStorage.couleurChoisie);


    let cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart__item__img');

    let cartImg = document.createElement('img');
    cartImg.setAttribute('src', product.imageUrl);
    cartImg.setAttribute('alt', product.altTxt);

    let cartItemContent = document.createElement('div');
    cartItemContent.classList.add('cart__item__content');

    let cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.classList.add('cart__item__content__description');

    let titreProduit = document.createElement('h2');
    titreProduit.textContent = product.name;

    let couleurKanap = document.createElement('p');
    couleurKanap.textContent = productStorage.couleurChoisie;

    let priceKanap = document.createElement('p');
    priceKanap.textContent = product.price + "€";
    priceKanap.classList.add('price')

    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.classList.add('cart__item__content__settings')

    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

    let Qte = document.createElement('p');
    Qte.textContent = 'Qté :';

    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type', 'number');
    itemQuantity.classList.add('itemQuantity');
    itemQuantity.setAttribute('name', 'itemQuantity');
    itemQuantity.setAttribute('min', '1');
    itemQuantity.setAttribute('max', '100');
    itemQuantity.setAttribute('value', productStorage.quantiteChoisie);
    itemQuantity.addEventListener('change', (event) => {
        modification(event);
    })
    let cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');

    let deleteItem = document.createElement('p');
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = "Supprimer";
    deleteItem.addEventListener('click', (event) => {
        suppression(event);
    }
    )

    cartItemArticle.appendChild(cartItemDiv)
    cartItemDiv.appendChild(cartImg)

    cartItemArticle.appendChild(cartItemContent)
    cartItemContent.appendChild(cartItemContentDescription);
    cartItemContentDescription.appendChild(titreProduit);
    cartItemContentDescription.appendChild(couleurKanap);
    cartItemContentDescription.appendChild(priceKanap);

    cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettingsQuantity.appendChild(Qte);
    cartItemContentSettingsQuantity.appendChild(itemQuantity);
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.appendChild(deleteItem)

    return cartItemArticle;
};
//**Suppression des articles**/
function suppression(event) {


    let product = JSON.parse(localStorage.getItem('choixDuClient'));

    let supprimer = event.target.closest('[data-id]');

    let productIndex = product.findIndex(
        (product) =>
            product.id == supprimer.dataset.id &&
            product.color == supprimer.dataset.color,

    );
    if (productIndex < 0) {
        return;
    }

    product.splice(productIndex, 1);
    console.log(productIndex);
    console.log(supprimer);
    console.log(product);

    alert('Ce produit à bien été supprimé.');
    localStorage.setItem('choixDuClient', JSON.stringify(product))

    location.reload();

}

//** Modification des quantité **/

function modification(event) {

    let product = JSON.parse(localStorage.getItem('choixDuClient'));

    let quantitevalue = event.target.valueAsNumber;


    let article = event.target.closest('[data-id]');

    let productIndex = product.findIndex(
        (product) =>
            product.id == article.dataset.id &&
            product.color == article.dataset.color,

    );

    if (productIndex < 0) {
        return;
    }


    product[productIndex].quantite = quantitevalue;

    localStorage.setItem("choixDuClient", JSON.stringify(product));

    location.reload();
}

//** Article Total**/

function totalArticle(product, productStorage) {


    //**Total quantité**/

    let totalQuantityProduc = document.getElementById('totalQuantity');
    totalQuantityProduc.innerHTML = parseInt(totalQuantityProduc.innerHTML) + productStorage.quantiteChoisie;



    /**Total Prix**/

    let totalPrix = document.getElementById('totalPrice');


    totalPrix.innerHTML = parseInt(totalPrix.innerHTML) + product.price * productStorage.quantiteChoisie;
}


//**Formulaire**/

function formulaire() {
    let form = document.querySelector('.cart__order__form')
    const NameRegex = new RegExp("^[a-zA-Z  -]+$");
    const AddressRegex = new RegExp("^[0-9a-zA-Z -,]+$");
    const EmailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+$")

    form.firstName.addEventListener('change', () => {
        valideFirstNameRegex(this);
    })
    form.lastName.addEventListener('change', () => {
        valideLastNameRegex(this);
    })
    form.address.addEventListener('change', () => {
        valideAddressRegex(this);
    })
    form.city.addEventListener('change', () => {
        valideCityRegex(this);

    })
    form.email.addEventListener('change', () => {
        valideEmailRegex(this);
    })

    const valideFirstNameRegex = function () {
        let firstNameErrorMsg = document.getElementById('firstName').nextElementSibling;

        if (NameRegex.test(form.firstName.value)) {
            firstNameErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            firstNameErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

    const valideLastNameRegex = function () {
        let lastNameErrorMsg = document.getElementById('lastName').nextElementSibling;

        if (NameRegex.test(form.lastName.value)) {
            lastNameErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            lastNameErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

    const valideAddressRegex = function () {
        let addressErrorMsg = document.getElementById('address').nextElementSibling;

        if (AddressRegex.test(form.address.value)) {
            addressErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            addressErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

    const valideCityRegex = function () {
        let cityErrorMsg = document.getElementById('city').nextElementSibling;

        if (NameRegex.test(form.city.value)) {
            cityErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            cityErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }


    const valideEmailRegex = function () {
        let emailErrorMsg = document.getElementById('email').nextElementSibling;

        if (EmailRegex.test(form.email.value)) {
            emailErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            emailErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

}

formulaire();

let boutonformulaire = document.querySelector('#order');

//console.log(boutonformulaire);
//Envoie du Formulaire dans le localStorage et création du OrderId//
boutonformulaire.addEventListener('click', (event) => {
    event.preventDefault();
    let product = JSON.parse(localStorage.getItem('choixDuClient'));
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    let product_id = [];
    for (let h = 0; h < product.length; h++) {
        product_id.push(product[h].id)
    }

    const order = {
        contact:
        {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: product_id,
    }

    console.log(order);

    const option = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    console.log(option);

    fetch('http://localhost:3000/api/products/order', option)
        .then((res) => res.json())
        .then((data) => {
            console.log(data),
                console.log(data.orderId);
            document.location.href = "confirmation.html?orderId=" + data.orderId
        });

})