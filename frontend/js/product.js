let getProductFromApi = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            resolve(request.responseText);

        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {

            reject(this.status);
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies/" + localStorage.getItem("teddieId"));
    request.send();
});

getProductFromApi
    .then(function(response) {
        let currentTeddie = JSON.parse(response);
        // affiche les informations du Teddie récupéré dans un bloc html
        document.getElementById("main").innerHTML = `<h2><a href='index.html'> Nos ours en peluche</a> > ${currentTeddie.name}</h2>
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
        // vérifie le nombre de couleurs disponibles pour cet ours et les ajoute en options de sélection
        for (let i = 0; i < currentTeddie.colors.length; i++) {
            document.getElementById("colorSelectMenu").innerHTML += "<option>" + currentTeddie.colors[i] + "</option>";
        }
        // le bouton 'ajouter au panier' push l'ours dans le tableau de produits et le stock en local
        document.getElementById("addToBasketButton").addEventListener("click", () => {
            let basketContent = JSON.parse(localStorage.getItem("basketContent"));
            basketContent.push(currentTeddie);
            localStorage.setItem("basketContent", JSON.stringify(basketContent));
            document.getElementById("basketButton").innerText = "Panier (" + basketContent.length + ")";
            document.getElementById("basketButton").removeAttribute("disabled");
            document.getElementById("basketButton").setAttribute("enabled", true);
        });
    })
    .catch(function(error) {
        document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
        console.error(error);
    });