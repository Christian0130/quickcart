import { products, getProduct, productInformationFunc, productInformation } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart, getQuantity } from "../data/cart.js";

function renderShop(){
    document.querySelector('.search-button').addEventListener("click", () => {
        alert("We are still working on this feature :(")
    })

    let productsHTML = '';

    products.forEach((product) => {
        productsHTML += `

    <div class="product-container">

        <div class="product-image-container js-product-information"  onclick="window.location.href='/quickCartProductInfo.html';" data-product-id="${product.id}">
        <img class="product-image"
            src="${product.image}">
        </div>
        
        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>
        <p id="details-price">$${formatCurrency(product.priceCents)}</p>
        
        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>
        
        <button class="add-to-cart-button js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
        </button>
        </div>

        `
    })
    
    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    document.querySelectorAll(".js-product-information").forEach((div) => {
        div.addEventListener('click', () => {
            const productInfoId = div.dataset.productId;
            let productInfo = getProduct(productInfoId)
            productInformationFunc(productInfo);
            console.log(productInformation)
        })
    })
    
    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            renderShop();
            // code to fix the added message
            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
            addedMessage.classList.add('added-to-cart-visible');
    
            setTimeout(() => {
                const previousTimeoutId = addedMessage[productId];
                if (previousTimeoutId) {
                    clearTimeout(previousTimeoutId);
                  }
            
                  const timeoutId = setTimeout(() => {
                    addedMessage.classList.remove('added-to-cart-visible');
                  }, 2000);
    
                  addedMessage[productId] = timeoutId;
              });
        });
    });
    document.querySelector('.js-cart-count').innerHTML = getQuantity();
}
renderShop()