import { cart, removeFromCart, getQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


function renderCheckout(){
    let orderSummaryHTML = ` `;

    let subtotal = 0;
    let total = 0;
    cart.forEach((cartItem) => {
        let productId = cartItem.productId
        let matchingProduct = getProduct(productId);
        console.log(matchingProduct);
        let totalPrice = matchingProduct.priceCents * cartItem.quantity;
        subtotal +=  matchingProduct.priceCents * cartItem.quantity;
        total = subtotal + 399 + 20;
    
        orderSummaryHTML += `
            <div class="basket-items-container js-basket-items-container-${matchingProduct.id}">
                <div class="basket-image-container">
                    <img src="${matchingProduct.image}" alt="">
                </div>
                <div class="basket-details">
                    <div>
                        <p>${matchingProduct.name}</p>
                        <p>$${(totalPrice/100).toFixed(2)}</p>
                    </div>
                    <p>$${(matchingProduct.priceCents/100).toFixed(2)} / lb</p>
                    <div>
                        <input class="basket-price-input" type="number" min="1" value="${cartItem.quantity}">
                        <button class="js-remove-button" data-product-id=${matchingProduct.id}>Remove</button>
                    </div>
                </div>
            </div>
        `
    })
    
    let paymentSummaryHTML = `
            <p id="basket-order-summary">Order Summary</p>
            <div>
                <p>Subtotal</p>
                <p>$${(subtotal/100).toFixed(2)}</p>
            </div>
            <div>
                <p>Shipping</p>
                <p>$3.99</p>
            </div>
            <div>
                <p>Tax</p>
                <p>$2.0</p>
            </div>
            <div id="basket-order-summary-total">
                <p>Total</p>
                <p>$${(total/100).toFixed(2)}</p>
            </div>
            <a href="/quickCartOrders.html">
                <button id="basket-payment-button">Continue to payment</button>
            </a>
    `
    
    
    document.querySelector(".js-basket-container-left").innerHTML = orderSummaryHTML;
    document.querySelector('.js-basket-container-right').innerHTML = paymentSummaryHTML;
    document.querySelectorAll('.js-remove-button').forEach((button)  => {
        button.addEventListener('click', () => {
            let productId = button.dataset.productId;
            console.log(productId)
            removeFromCart(productId);
            let container = document.querySelector(`.js-basket-items-container-${productId}`);
            container.remove;
            renderCheckout();
        })
    })
    document.querySelector('.js-cart-count').innerHTML = getQuantity();
}

renderCheckout();