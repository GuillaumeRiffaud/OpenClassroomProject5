const basketButton = document.getElementById("basketButton");
const productId = localStorage.getItem("teddieId");
const mainBlock = document.getElementById("main");
let currentTeddie = null;

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));

if (basketContent.length > 0) {
    basketButton.innerText = "Panier (" + basketContent.length + ")";
}

let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        currentTeddie = JSON.parse(this.responseText); // Récupère l'objet teddie actuellement consulté
        displayTeddieInfo();
        addToBasket();

    }
}
request.open("GET", "http://localhost:3000/api/teddies/" + productId);
request.send();

function displayTeddieInfo() { // crée le bloc html montrant les informations du teddie consulté
    mainBlock.innerHTML = `<h2><a href='index.html'> Nos ours en peluche</a> > ${currentTeddie.name}</h2>
                                <article>
                                    <div>
                                        <img src="${currentTeddie.imageUrl}"/>
                                        <div>
                                            <h3>${currentTeddie.name}</h3>
                                            <select name='color' id='colorSelectMenu'></select>
                                            <p><b>Prix:</b> ${currentTeddie.price / 100} €</p>
                                            <button id='addToBasketButton'>Ajouter au Panier</button>
                                        </div>
                                    </div>
                                    <p><b>Description:</b> ${currentTeddie.description}</p>
                                </article>`;
    colorSelectHtml();
}

function colorSelectHtml() { // ajoute une option de sélection de couleur autant de fois qu'il y a de couleurs
    let colorSelectMenu = document.getElementById("colorSelectMenu");
    for (let i = 0; i < currentTeddie.colors.length; i++) {
        colorSelectMenu.innerHTML += "<option>" + currentTeddie.colors[i] + "</option>";
    }
}

function addToBasket() { // donne sa fonctionnalité au bouton "ajouter au panier" créé et stock en local
    let addToBasketButton = document.getElementById("addToBasketButton");
    addToBasketButton.addEventListener("click", () => {
        basketContent.push(currentTeddie);
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
        basketButton.innerText = "Panier (" + basketContent.length + ")";
    });
}