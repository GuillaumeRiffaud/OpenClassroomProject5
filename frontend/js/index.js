let getListOfProductsFromApi = new Promise(function(resolve, reject) {
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

getListOfProductsFromApi
    .then(function(response) {
        let products = JSON.parse(response); // Place les produits dans un tableau products

        for (let product of products) {
            const newTeddie = new Teddie(product.colors, product._id, product.name, product.price, product.description, product.imageUrl);
            document.getElementById("main").appendChild(newTeddie.createHtmlBlock());
        }
    })
    .catch(function(error) {
        document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
        console.error(error);
    });




class Teddie {
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