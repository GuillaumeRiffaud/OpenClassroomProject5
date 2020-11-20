const mainBlock = document.getElementById("main");
const clearBasketButton = document.getElementById("clearBasket");

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));


clearBasketButton.addEventListener("click", () => {
    basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
});

function displayProducts() {
    for (let product of basketContent) {
        mainBlock.innerHTML += "<div>" + product + "</div>";
    }
}

displayProducts();