import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";

let ordersHTML = ``;
import { getQuantity } from "../data/cart.js";

document.querySelector('.js-cart-count').innerHTML = getQuantity();
cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    let matchingProduct = getProduct(productId);


    console.log(cartItem)
    ordersHTML +=`
    <div class="product-container">
            <div class="product-image-container">
                <img src="${matchingProduct.image}" alt="">
            </div>
            <div class="product-details">
                <p>${matchingProduct.name}</p>
                <p>$${(matchingProduct.priceCents/100).toFixed(2)}</p>
            </div>
    </div>
    `
})

document.querySelector('.order-review-container').innerHTML = ordersHTML;