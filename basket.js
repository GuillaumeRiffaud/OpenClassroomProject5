const mainBlock = document.getElementById("main");
const clearBasketButton = document.getElementById("clearBasket");
let workingTeddie = null;

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));



if (basketContent.length > 0) {
    for (let product of basketContent) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                workingTeddie = JSON.parse(this.responseText); // Récupère l'objet teddie actuellement traité dans la boucle
                displayProductInfo(workingTeddie);
            }
        }
        request.open("GET", "http://localhost:3000/api/teddies/" + product);
        request.send();
    };
}

function displayProductInfo(object) {
    mainBlock.innerHTML += "<div><img src='" + object.imageUrl + "'/>" +
        "<p>" + object.name + "</p><p>" + object.colors + "</p><p>" + object.price / 100 + " €" + "</p></div>";
}





clearBasketButton.addEventListener("click", () => {

    basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    console.log("Panier vidé");
    mainBlock.innerHTML = "";
});