import { getQuantity, addToCart } from "../data/cart.js";
import { productInformation } from "../data/products.js";


function renderProductInfo(){
    document.querySelector('.js-cart-count').innerHTML = getQuantity();

    let productInfoHTML = `
           <div>
                <img src="${productInformation.image}" alt="">
            </div>
            <div  class="details-info">
                <div>
                    <p>${productInformation.name}</p>
                    <p>$${(productInformation.priceCents/100).toFixed(2)}</p>
                </div>
                <div>
                    <p>Quantity: 1</p>
                    
                    <div class="added-to-cart js-added-to-cart-${productInformation.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                    </div>
                    <button class="js-add-to-cart">Add to Cart</button>
                </div>
            </div>
    `;
    
    document.querySelector('.js-product-details').innerHTML = productInfoHTML;
    let button = document.querySelector('.js-add-to-cart')
    
    button.addEventListener('click', () => {
        let productId = productInformation.id
        addToCart(productInformation.id)
        renderProductInfo()
        console.log("button working")

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
    })
    
    console.log(productInformation.id)  
}
renderProductInfo()




