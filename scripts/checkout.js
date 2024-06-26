import { basket,removeFromBasket, getQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";

let orderSummaryHTML = ' ';
let subtotal = 0;
let total = 0;
basket.forEach((basketItem) => {
    let matchingProduct = getProduct(basketItem.productName);
    
    let totalPrice = matchingProduct.priceCents * basketItem.lbs;
    
    subtotal +=  matchingProduct.priceCents * basketItem.lbs;
    total = subtotal + 399 + 20;

    orderSummaryHTML += `
        <div class="basket-items-container js-basket-items-container-${matchingProduct.name}">
            <div class="basket-image-container">
                <img src="${matchingProduct.img}" alt="matchingProduct.img">
            </div>
            <div class="basket-details">
                <div>
                    <p>${matchingProduct.name}</p>
                    <p>$${(totalPrice/100).toFixed(2)}</p>
                </div>
                <p>$${(matchingProduct.priceCents/100).toFixed(2)} / lb</p>
                <div>
                    <input class="basket-price-input" type="number" min="1" value="${basketItem.lbs}">
                    <button class="js-remove-button" data-product-name=${matchingProduct.name}>Remove</button>
                </div>
            </div>
        </div>
    `;
});

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
        <button id="basket-payment-button">Continue to payment</button>
    
`;


document.querySelector(".basket-container-right").innerHTML = paymentSummaryHTML;
document.querySelector(".basket-container-left").innerHTML = orderSummaryHTML;
document.querySelectorAll(".js-remove-button").forEach((button) => {
    button.addEventListener('click', () => {
        console.log("The buttons are working")
        let productName = button.dataset.productName;
        removeFromBasket(productName);

        let container = document.querySelector(`.js-basket-items-container-${productName}`);
        container.remove();
    })
})


document.querySelector('.js-basket-item-count').innerHTML = getQuantity()

