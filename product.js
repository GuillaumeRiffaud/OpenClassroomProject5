const productId = localStorage.getItem("teddieId");
const mainBlock = document.getElementById("main");
let currentTeddie = null;


let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        currentTeddie = JSON.parse(this.responseText); // Place les produits dans un tableau products
        displayTeddieInfo();
    }
}
request.open("GET", "http://localhost:3000/api/teddies/" + productId);
request.send();

function displayTeddieInfo() {
    mainBlock.innerHTML = "<h2><a href='index.html'> Nos ours en peluche</a> > " + currentTeddie.name + "</h2>" +
        "<article><div><img src='" + currentTeddie.imageUrl + "'><div><h3>" + currentTeddie.name + "</h3><p><b>Couleurs:</b> " + currentTeddie.colors + "</p>" +
        "<p><b>Prix:</b> " + currentTeddie.price / 100 + " €</p></div></div><p><b>Description:</b> " + currentTeddie.description + "</p></article>";
}