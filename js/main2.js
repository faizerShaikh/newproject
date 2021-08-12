var cart = getCart();
cart = [
  ...cart.reduce((map, obj) => map.set(obj.productID, obj), new Map()).values(),
];
localStorage.setItem("cart", JSON.stringify(cart));
const products = cart;
const basketRight = document.querySelector(".bas-right");
var noOfProducts = products.length;
var newTotal = 0;
var total = 0;
var lastTotal = 1;

let invoice = [];
class invoiceInfo {
  constructor(ID, quantity, price, total) {
    this.ID = ID;
    this.quantity = quantity;
    this.price = price;
    this.total = total;
  }
}

// add in invoice obj
cart.forEach((product) => {
  let prod = new invoiceInfo(product.productID,product.quantity, product.price, 0);
  invoice.push(prod);
  invoiceCalculator(invoice);
  let invoiceInLocal = getInvoice();
  invoiceInLocal.push(prod);
  localStorage.setItem("invoiceInLocal", JSON.stringify(invoiceInLocal));
  invoiceInLocal = [
    ...invoiceInLocal
      .reduce((map, obj) => map.set(obj.ID, obj), new Map())
      .values(),
  ];
  localStorage.setItem("invoiceInLocal", JSON.stringify(invoiceInLocal));
});
localStorage.setItem("cart", JSON.stringify(cart));


// function to calculate invice

function invoiceCalculator(invoice) {
    let invoiceInLocal = getInvoice();
    invoice.forEach((invo) => {
        invoiceInLocal.forEach(invoLocal => {
            invo.total = 0;
            invo.total = invo.price * invo.quantity;
            invoLocal.total = 0;
            invoLocal.total = invoLocal.price * invoLocal.quantity;
            localStorage.setItem("invoiceInLocal", JSON.stringify(invoiceInLocal));
        })
  });
}
// dipslying products to the cart
let output = "";
products.forEach((product) => {
  output = addToCart(product, output);
  basketRight.innerHTML = output;
});
displayInvoice(invoice);
// display product function
function addToCart(product, output) {
  output += `
        <div class="card-dtl" id="${product.id}">
            <div class="img">
                <img src="${product.src}" alt="product image">
            </div>
            <div class="content">
                <h2 class="product-heading clr-light">${product.name}</h2>
                <p class="product-discript-dtl clr-light" >${product.discrip}</p>
                <div class="input-wrapper"><input type="number" class="input clr-light" value="${product.quantity}" min="1" max="50" placeholder="Quantity" id="quantity"></div>
                <div class="price-tag">
                    <h2 class="price clr-light">&euro;<span id="cardPrice">${product.price}</span></h2>
                    <a class="btn-rm btn-sec" id="${product.productID}">&nbsp;Remove</a>
                </div>
            </div>
        </div>`;

  return output;
}

// displying info to the invoice
function displayInvoice(invoice) {
  const list = document.querySelector("#invoice-list");
  let output = ``;
  total = 0;
  invoice.forEach((invo) => {
    total = invo.total + total;
  });
  output += `
    <li class="invoice-itm wrap"><span> 
      Price Of <span id="noOfProd">(${cart.length})</span> 
      products</span> <span id="price">&euro; ${total}</span>
    </li>
    <li class="invoie-itm wrap">Delivery Charges <span class="sec-clr">FREE</span></li>
    <li class="invoice-total wrap">Total Ammount <span>&euro; ${total}</span></li>`;
  list.innerHTML = output;
}

// // update on quanity chenge

function updateOnQuantity(ele, id, invoice) {
  let quantity = parseInt(ele);
  let cart = getCart();
  let invoiceInLocal = getInvoice();
  invoice.forEach((invo) => {
    cart.forEach((cart) => {
      invoiceInLocal.forEach((invoLocal) => {
        if (invo.ID === id && invoLocal.ID === id && cart.productID == id) {
          invo.quantity = quantity;
          invoLocal.quantity = quantity;
          cart.quantity = quantity
        }
      });
    })
  })
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("invoiceInLocal", JSON.stringify(invoiceInLocal));
  invoiceCalculator(invoice);
  displayInvoice(invoice);
}

document.querySelector(".bas-right").addEventListener("input", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("input")) {
    let price = parseInt(
      e.target.parentElement.nextElementSibling.firstElementChild
        .lastElementChild.textContent
    );
    let id = parseInt(
      e.target.parentElement.nextElementSibling.lastElementChild.id
    );
    if (e.target.value === "") {
      document.getElementById("price").innerHTML = `&euro; ${total}`;
      document.getElementById("total").innerHTML = `&euro; ${total}`;
    } else {
      updateOnQuantity(e.target.value, id, invoice);
    }
  }
});
// removing products

basketRight.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-rm")) {
    e.target.parentElement.parentElement.parentElement.remove();
    removeProduct(parseInt(e.target.id));
    invoiceCalculator(invoice);
    displayInvoice(invoice);
  }
});

function removeProduct(prod) {
  const cart = getCart();

  cart.forEach((product, index) => {
    if (product.productID === prod) {
      cart.splice(index, 1);
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

// getting products from local Storage
function getCart() {
  let cart;
  if (localStorage.getItem("cart") === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  return cart;
}

function getInvoice() {
  let invoiceInLocal;
  if (localStorage.getItem("invoiceInLocal") === null) {
    invoiceInLocal = [];
  } else {
    invoiceInLocal = JSON.parse(localStorage.getItem("invoiceInLocal"));
  }
  return invoiceInLocal;
}
