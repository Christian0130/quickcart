//use the basket in local storage
export let basket = JSON.parse(localStorage.getItem('basket'));

if(!basket){
    basket = [{
        productName: "Tomato",
        lbs: 1
    },{
        productName: "Ginger",
        lbs: 1
    }]
}


//save the basket to the local storage
function saveToStorage(){
    localStorage.setItem('basket', JSON.stringify(basket));
}


//function that adds a profuct to the basket
export function addToBasket(productName){
    let matchingProduct;

    basket.forEach((basketItem) => {
        if(productName === basketItem.productName){
            matchingProduct = basketItem;
        }
    });

        if(matchingProduct){
            matchingProduct.lbs += 1;
        }else{
            basket.push({
                productName: productName,
                lbs: 1
            })
        }
        saveToStorage();          
};

//function that removes an item from the basket
export function removeFromBasket(productName){
    
    const newBasket = [];
    basket.forEach((basketItem) => {
        if(basketItem.productName != productName){
            newBasket.push(basketItem);
        }
    })

    basket = newBasket;
    saveToStorage();
}

export function getQuantity() {
    let basketQuantity;
    basketQuantity = basket.length;
    return basketQuantity;
}