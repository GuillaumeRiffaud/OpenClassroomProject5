const mainBlock = document.getElementById("main");
let order = JSON.parse(localStorage.getItem("Order"));


mainBlock.innerHTML = `<div>
                            <p>Merci pour votre commande <b>${order.contact.firstName} ${order.contact.lastName}</b> !</p>
                            <p>Votre numéro de commande est <b>${order.orderId}</b></p>
                            <p>Elle sera expédiée: <b>${order.contact.address} ${order.contact.city}</b> dans les plus brefs délais.</p>
                        </div>`;

localStorage.clear();