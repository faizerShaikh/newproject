//import { products, basket } from "./index.js";
// to add in cart function
var products = [];
var cartProd = getCart();
const getvalue = (arr) => ([...new Set(arr)]);

var array = [0,1,2,1,3,4,5,2,1];
console.log(getvalue(array));

console.log(bakset)
fetch("./json/product.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        products.forEach((product) => {
            if (product.isInCart === true) {
                console.log(product);
            }
        })

        //data.forEach(product => displayProducts(product))
    })

function addToCart(product) {
    const card = document.createElement("div");
    card.classList.add("card-dtl");

    card.innerHTML = `
        <div class="img">
            <img src="${product.src}" alt="product image">
        </div>
        <div class="content">
            <h2 class="product-heading clr-light">${product.name}</h2>
            <p class="product-discript-dtl clr-light" >${product.discrip}</p>
            <div class="input-wrapper"><input type="number" class="input clr-light" value="1" min="1" max="50" placeholder="Quantity"></div>
            <div class="price-tag">
                <h2 class="price clr-light">&euro;100/-</h2>
                <a class="btn-rm btn-sec">&nbsp;Remove</a>
            </div>
        </div>`;
    const basketRight = document.querySelector('.bas-right');
    basketRight.appendChild(card);
}


function getCart() {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    return cart;
}
