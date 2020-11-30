const mainBlock = document.getElementById("main");
const clearBasketButton = document.getElementById("clearBasket");
const sendOrderButton = document.getElementById("sendOrderButton");
const userInfoForm = document.getElementById("userInfoForm");
let duePrice = 0;

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));


function refreshOrderButton() { // rend le bouton "commander" utilisable ou non
    if (basketContent.length > 0) {
        sendOrderButton.setAttribute("enabled", true);
    } else {
        sendOrderButton.setAttribute("disabled", true);
    }
}
refreshOrderButton();

if (basketContent.length > 0) {
    for (let product of basketContent) { // affiche chaque produit du panier en html et ajoute son prix au montant à régler
        duePrice += product.price;
        mainBlock.innerHTML += `<ul>`;
        mainBlock.innerHTML += `<li>
                                            <img src="${product.imageUrl}"/>
                                            <p>${product.name}</p>
                                            <p>${product._id}</p>
                                            <p>${product.price / 100} €</p>
                                            <button>🗑️</button>
                                        </li>`;
    }
    mainBlock.innerHTML += `</ul><div>Montant total: ${duePrice /100} €</div>`;
} else { //si aucun produit, réinitialise l'html
    mainBlock.innerHTML = `<h2>Votre Panier :</h2>
                            <p>Aucun article<p>`;
}



clearBasketButton.addEventListener("click", () => { // vide le contenu du panier et réinitialise l'html
    basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    mainBlock.innerHTML = `<h2>Votre Panier :</h2>
                            <p>Aucun article<p>`;
    refreshOrderButton();
});


userInfoForm.addEventListener("submit", (event) => { // création de la commande et envoi
    event.preventDefault();
    event.stopPropagation();
    const contact = {
        firstName: document.getElementById("userFirstName").value,
        lastName: document.getElementById("userName").value,
        address: document.getElementById("userLocation").value,
        city: document.getElementById("userTown").value,
        email: document.getElementById("userEmail").value
    }
    let products = [];
    for (let product of basketContent) {
        products.push(product._id);
    }
    const order = {
        contact,
        products,
    }
    console.log(order);
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(order));
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            localStorage.setItem("Order", this.responseText);
            window.location.href = "orderconfirm.html";
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 201) {
            mainBlock.innerHTML += `<p>Échec de l'envoi de la commande</p>`;
            console.log(this.status);
        }
    }
});