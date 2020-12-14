function checkBasketExists() {
    if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
        let emptyArray = [];
        localStorage.setItem("basketContent", JSON.stringify(emptyArray));
    }

    let basketContent = JSON.parse(localStorage.getItem("basketContent"));

    if (document.getElementById("basketButton") != null) {
        if (basketContent.length > 0) { // modifie l'affichage du nombre de produits dans le panier
            document.getElementById("basketButton").setAttribute("enabled", true);
            document.getElementById("basketButton").innerText = "Panier (" + basketContent.length + ")";
        } else {
            document.getElementById("basketButton").setAttribute("disabled", true);
        }
    }
}