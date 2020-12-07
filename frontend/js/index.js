const basketButton = document.getElementById("basketButton");
const mainBlock = document.getElementById("main");
let products = [];

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));

if (basketContent.length > 0) {
    basketButton.innerText = "Panier (" + basketContent.length + ")";
}

let getProductFromApi = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            resolve(request.responseText);

        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

            reject(this.status);
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

getProductFromApi
    .then(function(response) {
        products = JSON.parse(response); // Place les produits dans un tableau products

        for (let product of products) {
            const newTeddie = new teddie(product.colors, product._id, product.name, product.price, product.description, product.imageUrl);
            mainBlock.appendChild(newTeddie.createHtmlBlock());
        }
    })
    .catch(function(error) {
        mainBlock.innerHTML += `<p>Connection au serveur échouée.</p>`;
        console.error(error);
    });




class teddie {
    constructor(colors, _id, name, price, description, imageUrl) {
        this.colors = colors;
        this.price = price;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    createHtmlBlock() { // crée un bloc hmtl montrant les infos principales du teddie
        let articleBlock = document.createElement("article");
        articleBlock.innerHTML = `<div>
                                    <h3>${this.name}</h3>
                                    <p>${this.price / 100} €</p>
                                </div>`;
        articleBlock.setAttribute("id", this._id);
        articleBlock.addEventListener("click", (event) => { // article cliquable stock l'Id de l'ours concerné en local et redirige vers la page produit
            localStorage.setItem("teddieId", event.currentTarget.getAttribute("id"));
            window.location.href = "product.html";
        });

        let imgBlock = document.createElement("img");
        articleBlock.appendChild(imgBlock);
        imgBlock.setAttribute("src", this.imageUrl);

        return articleBlock;
    }
}