import { getQuantity } from "../data/cart.js";

document.querySelector('.hello-button').addEventListener("click", () => {
    alert("Shadow says Hi!")
})

document.querySelector('.js-cart-count').innerHTML = getQuantity();