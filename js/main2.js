var cartProd = getCart();
const products = [...cartProd.reduce((map, obj) => map.set(obj.productID, obj), new Map()).values()];
const basketRight = document.querySelector('.bas-right');
var newTotal = 0;
var noOfProducts = products.length;
var newTotal = 0;
var total = 0;

// dipslying products to the cart
products.forEach(product => {
    addToCart(product);
});
displayInvoice();
// display product function
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
            <div class="input-wrapper"><input type="number" class="input clr-light" value="1" min="1" max="50" placeholder="Quantity" id="quantity"></div>
            <div class="price-tag">
                <h2 class="price clr-light">&euro;<span id="cardPrice">${product.price}</span></h2>
                <a class="btn-rm btn-sec" id="${product.productID}">&nbsp;Remove</a>
            </div>
        </div>`;
    basketRight.appendChild(card);
}

// displying info to the invoice 
function displayInvoice() {
    let cart = getCart();
    cart.forEach((product) => {
        total = product.price + total;
    })
    document.getElementById("price").innerHTML = `&euro; ${total}`;
    document.getElementById("total").innerHTML = `&euro; ${total}`;
    document.getElementById("noOfProd").innerHTML = noOfProducts;
    newTotal = total;
}

// udating invoice info on remove

function updateInvoice(key) {
    total -= key;
    document.getElementById("price").innerHTML = `&euro; ${total}`;
    document.getElementById("total").innerHTML = `&euro; ${total}`;
    noOfProducts--;
    document.getElementById("noOfProd").innerHTML = noOfProducts;
}

// update on quanity chenge 

function updateOnQuantity(ele, price) {
    let quantity = parseInt(ele);
    //console.log(quantity)
    if (quantity === 2) {
        newTotal = ((newTotal - price) + (price * quantity));
        console.log("inside first if");
        document.getElementById("price").innerHTML = `&euro; ${newTotal}`;
        document.getElementById("total").innerHTML = `&euro; ${newTotal}`;
    } else if (quantity >= 3) {
        console.log(quantity)
        newTotal = ((newTotal - (price * (quantity-1))) + (price * quantity))
        console.log("inside sec if", newTotal, total);
        document.getElementById("price").innerHTML = `&euro; ${newTotal}`;
        document.getElementById("total").innerHTML = `&euro; ${newTotal}`;
        newTotal = total;
    }
}


document.querySelector(".bas-right").addEventListener("input", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("input")) {
        let price = parseInt(e.target.parentElement.nextElementSibling.firstElementChild.lastElementChild.textContent);
        if (e.target.value === "") {
            document.getElementById("price").innerHTML = `&euro; ${total}`;
            document.getElementById("total").innerHTML = `&euro; ${total}`;
        } else {
            updateOnQuantity(e.target.value, price);
        }
    }
})
// removing products 

basketRight.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-rm")) {
        e.target.parentElement.parentElement.parentElement.remove();
        removeProduct(parseInt(e.target.id));
        updateInvoice(e.target.previousElementSibling.lastElementChild.textContent);
        console.log(total);
    }
})

function removeProduct(prod) {
    const cart = getCart();

    cart.forEach((product, index) => {
        if (product.productID === prod) {
            cart.splice(index, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// getting products from local Storage
function getCart() {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    return cart;
}

