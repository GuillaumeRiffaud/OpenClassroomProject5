function refreshButtons() { // rend le bouton "commander" utilisable ou non
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    if (basketContent.length > 0) {
        document.getElementById("sendOrderButton").setAttribute("enabled", true);
    } else {
        document.getElementById("sendOrderButton").setAttribute("disabled", true);
        document.getElementById("clearBasket").setAttribute("disabled", true);
    }
}


function refreshBasketListDisplay() {
    document.getElementById("main").innerHTML = "<h2>Votre Panier :</h2>"; // réinitialise le contenu
    let duePrice = 0;
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    if (basketContent.length > 0) {
        for (let product of basketContent) { // affiche chaque produit du panier en html et ajoute son prix au montant à régler
            duePrice += product.price;
            let productPositionInArray = basketContent.indexOf(product);
            document.getElementById("main").innerHTML += `<ul>`;
            document.getElementById("main").innerHTML += `<li>
                                        <img src="${product.imageUrl}"/>
                                        <p>${product.name}</p>
                                        <p class="ids">${product._id}</p>
                                        <p>${product.price / 100} €</p>
                                        <button id="${productPositionInArray}">🗑️</button>
                                    </li>`;
        }
        document.getElementById("main").innerHTML += `</ul><div>Montant total: ${duePrice /100} €</div>`;
        for (i = 0; i < basketContent.length; i++) { // permet au bouton poubelle de supprimer le produit d'index égal à son id
            let deleteButton = document.getElementById(i);
            deleteButton.addEventListener("click", (event) => {
                let buttonId = event.currentTarget.getAttribute("id");
                basketContent.splice(buttonId, 1);
                localStorage.setItem("basketContent", JSON.stringify(basketContent));
                refreshButtons();
                refreshBasketListDisplay();
            });
        }
    } else {
        document.getElementById("main").innerHTML += `<p>Aucun article<p>`;
        window.location.href = "index.html";
    }
}






document.getElementById("clearBasket").addEventListener("click", () => { // vide le contenu du panier et réinitialise l'html
    let basketContent = [];
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    refreshBasketListDisplay();
    refreshButtons();
    window.location.href = "index.html";
});


document.getElementById("userInfoForm").addEventListener("submit", (event) => { // création de la commande et envoi
    event.preventDefault();
    event.stopPropagation();
    const contact = {
        firstName: document.getElementById("userFirstName").value,
        lastName: document.getElementById("userName").value,
        address: document.getElementById("userLocation").value,
        city: document.getElementById("userTown").value,
        email: document.getElementById("userEmail").value
    }
    let products = [];
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    for (let product of basketContent) {
        products.push(product._id);
    }
    const order = {
        contact,
        products,
    }

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(order));
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            localStorage.setItem("Order", this.responseText);
            window.location.href = "orderconfirm.html";
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 201) {
            document.getElementById("main").innerHTML += `<p>Échec de l'envoi de la commande</p>`;
            console.log(this.status);
        }
    }
});