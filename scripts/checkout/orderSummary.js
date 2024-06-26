import { cart, removeFromCart,} from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";

export function renderOrderSummary() {

  let cartSummaryHTML = ''

  cart.forEach((cartItem) => {
      //normalizing the date(getting the other data from product.js)
      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId)

      //Generate the html of checkout.html
      cartSummaryHTML+=
      `
        <div class="order-summary js-order-summary">
            <div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                      Delivery date: ${dateString}
                    </div>
      
                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${matchingProduct.image}">
      
                      <div class="cart-item-details">
                        <div class="product-name">
                          ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                          $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
      `;
      
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove();
      renderPaymentSummary();
    });
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

