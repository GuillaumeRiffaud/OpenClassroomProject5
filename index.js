const basketButton = document.getElementById("basketButton"); //bouton du panier
const mainBlock = document.getElementById("main");
let products = [];
let productAmount = 0;

// basketButton.addEventListener("click", () => { // test du clic panier et affichage du nombre de produits
//     products.push("table");
//     productAmount = products.length;
//     console.log(products);
//     if (productAmount > 0) {
//         basketButton.textContent = "Panier (" + productAmount + ")"; // affichage du nombre de produits dans le panier
//     }
// });




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
        return listOfTeddies;
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
    createHtmlBlock() {
        let articleBlock = document.createElement("article");
        articleBlock.innerHTML = "<div><h3>" + this.name + "</h3><p>" + this.price / 100 + " €</p></div>";

        let imgBlock = document.createElement("img");
        articleBlock.appendChild(imgBlock);
        imgBlock.setAttribute("src", this.imageUrl);

        return articleBlock;
    }
}