const basketButton = document.getElementById("basketButton");
const productId = localStorage.getItem("teddieId");
const mainBlock = document.getElementById("main");
let currentTeddie = null;

if (localStorage.getItem("basketContent") === null) { // vérifie si le contenu du panier existe en local, si non: le crée avec un tableau vide
    let emptyArray = [];
    localStorage.setItem("basketContent", JSON.stringify(emptyArray));
}
let basketContent = JSON.parse(localStorage.getItem("basketContent"));

if (basketContent.length > 0) {
    basketButton.innerText = "Panier (" + basketContent.length + ")";
}


let getProductFromApi = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            resolve(request.responseText);

        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

            reject(this.status);
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies/" + productId);
    request.send();
});

getProductFromApi
    .then(function(response) {
        currentTeddie = JSON.parse(response);
        mainBlock.innerHTML = `<h2><a href='index.html'> Nos ours en peluche</a> > ${currentTeddie.name}</h2>
                    <article>
                        <div>
                            <img src="${currentTeddie.imageUrl}"/>
                            <div>
                                <h3>${currentTeddie.name}</h3>
                                <select name='color' id='colorSelectMenu'></select>
                                <p><b>Prix:</b> ${currentTeddie.price / 100} €</p>
                                <button id='addToBasketButton'>Ajouter au Panier</button>
                            </div>
                        </div>
                        <p><b>Description:</b> ${currentTeddie.description}</p>
                    </article>`;
        let colorSelectMenu = document.getElementById("colorSelectMenu");
        for (let i = 0; i < currentTeddie.colors.length; i++) {
            colorSelectMenu.innerHTML += "<option>" + currentTeddie.colors[i] + "</option>";
        }
        let addToBasketButton = document.getElementById("addToBasketButton");
        addToBasketButton.addEventListener("click", () => {
            basketContent.push(currentTeddie);
            localStorage.setItem("basketContent", JSON.stringify(basketContent));
            basketButton.innerText = "Panier (" + basketContent.length + ")";
        });
    })
    .catch(function(error) {
        mainBlock.innerHTML += `<p>Connection au serveur échouée.</p>`;
        console.error(error);
    });