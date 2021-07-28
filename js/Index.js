var products = [];
var basket = [];

// fetching data from  json file

fetch("./json/product.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        // console.log(products);
        data.forEach(product => displayProducts(product))
    })

// function to display fetched data in html

function displayProducts(product) {
    const card = document.createElement("div");
    card.classList.add("card-dtl");

    card.innerHTML = `
        <div class="img">
		    <img src="${product.src}" alt="product image">
            <div class="dtl-list open">
               	<ul>
 		          	<li class="product-dtl clr-light">Product Details</li>
                    <li class="dtl-list-item clr-light">Model : ${product.modelNo}</li>
                    <li class="dtl-list-item clr-light">Brand : ${product.brand}</li>
                    <li class="dtl-list-item clr-light">Color : ${product.color}</li>
                    <li class="dtl-list-item clr-light">Available Stock : ${product.stock}</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <h2 class="product-heading clr-light">${product.name}</h2>
            <p class="product-discript-dtl clr-light" >${product.discrip}</p>
            <div class="dtl"><a class="btn-dtl clr-light">view details</a></div>
            <div class="abt-product open">
                <ul>
                    <li class="abt-head clr-light">About This Product</li>
                    <li class="abt-pnt clr-light">${product.dtl[1]}</li>
                    <li class="abt-pnt clr-light">${product.dtl[2]}</li>
                    <li class="abt-pnt clr-light">${product.dtl[3]}</li>
                    <li class="abt-pnt clr-light">${product.dtl[4]}</li>
                </ul>
            </div>
            <div class="price-tag">
                <h2 class="price clr-light">&euro; ${product.price}</h2>
                <a href="./basket.html" class="btn-sec clr-light" id="${product.productID}">Buy Now</a>
                <i class="fas fa-shopping-cart icon clr-light" id="${product.productID}"></i>
            </div>
        </div>`;
    const right = document.querySelector(".right");
    right.appendChild(card);
}

// to see details

document.querySelector(".right").addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-dtl')) {
        e.target.parentElement.nextElementSibling.classList.toggle('open');
        e.target.parentElement.parentElement.previousElementSibling.lastElementChild.classList.toggle('open');
    }
})

// to see by catogory 

const catItems = document.querySelectorAll('.cat-item');

catItems.forEach((catItem) => {
    catItem.addEventListener('click', (e) => {
        let key = e.target.innerText;
        const right = document.querySelector('.right').innerHTML = '';
        products.forEach((product) => {
            if (product.catogory === key) {
                displayProducts(product);
            }
        })
    })
})


// add to cart on event

document.querySelector(".right").addEventListener('click', (e) => {
    if (e.target.classList.contains('icon') || e.target.classList.contains('btn-sec')) {
        const key = e.target.id;
        products.forEach((product) => {
            if (product.productID == key) {
                let cart = getCart();
                cart.push(product)
                localStorage.setItem("cart", JSON.stringify(cart))
               // console.log('added to local');
            }
        })
        let data = getCart();
       // console.log(data);
    }
});


function getCart() {
    let cart;
    if (localStorage.getItem('cart') === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    return cart;
}