const mainBlock = document.getElementById("main");
const clearBasketButton = document.getElementById("clearBasket");
let duePrice = 0;

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));




if (basketContent.length > 0) {
    for (let product of basketContent) { // affiche chaque produit du panier en html et ajoute son prix au montant à régler
        duePrice += product.price;
        mainBlock.innerHTML += `<div>
                                            <img src="${product.imageUrl}"/>
                                            <p>${product.name}</p>
                                            <p>${product.colors}</p>
                                            <p>${product.price / 100} €</p>
                                            <button>🗑️</button>
                                        </div>`;
    }
    mainBlock.innerHTML += `<div>Montant total: ${duePrice /100} €</div>`;
} else { //si aucun produit, réinitialise l'html
    mainBlock.innerHTML = `<h2>Votre Panier :</h2>
                            <p>Aucun article<p>`;
}



clearBasketButton.addEventListener("click", () => { // vide le contenu du panier et réinitialise l'html

    basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    console.log("Panier vidé");
    mainBlock.innerHTML = `<h2>Votre Panier :</h2>
                            <p>Aucun article<p>`;
});