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

let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        products = JSON.parse(this.responseText); // Place les produits dans un tableau products
        let listOfTeddies = [];
        for (let product of products) {
            const newTeddie = new teddie(product.colors, product._id, product.name, product.price, product.description, product.imageUrl);
            listOfTeddies.push(newTeddie);
            mainBlock.appendChild(newTeddie.createHtmlBlock());
        }
        articleLinksToProduct();
        return listOfTeddies;
    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
        mainBlock.innerHTML += `<p>Connection au serveur échouée.</p>`;
        console.log(this.status);
    }
}
request.open("GET", "http://localhost:3000/api/teddies");
request.send();



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
        articleBlock.innerHTML = "<div><h3>" + this.name + "</h3><p>" + this.price / 100 + " €</p></div>";
        articleBlock.setAttribute("id", this._id);

        let imgBlock = document.createElement("img");
        articleBlock.appendChild(imgBlock);
        imgBlock.setAttribute("src", this.imageUrl);

        return articleBlock;
    }
}

function articleLinksToProduct() { // stock l'id de l'ours cliqué avant de rediriger vers la page produit
    const articles = document.getElementsByTagName("article");
    for (article of articles) {

        article.addEventListener("click", (event) => {
            localStorage.setItem("teddieId", event.currentTarget.getAttribute("id"));
            window.location.href = "product.html";

        });
    }
}