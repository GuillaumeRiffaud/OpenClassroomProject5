const mainBlock = document.getElementById("main");
const clearBasketButton = document.getElementById("clearBasket");

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));


function displayProducts() {
    let productHTML = "";
    if (basketContent.length > 0) {
        for (let product of basketContent) {
            console.log(product);
            productHTML += "<div>" + product + "</div>";
        }
    }
    return productHTML;
}

mainBlock.innerHTML = displayProducts();


clearBasketButton.addEventListener("click", () => {

    basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    console.log("Panier vidé");
    mainBlock.innerHTML = displayProducts();
});