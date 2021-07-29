var products = [];
const search = document.querySelector("#input");
const right = document.querySelector(".right");

// fetching data from  json file

fetch("./json/product.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    // console.log(products);
    let output = "";
    data.forEach((product) => {
      output = displayProducts(product, output);
    });
    right.innerHTML = output;
  });

// function to display fetched data in html

function displayProducts(product, output) {
  output += `
    <div class="card-dtl">
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
        </div>
    </div>`;
  return output;
}

// to see details

right.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-dtl")) {
    e.target.parentElement.nextElementSibling.classList.toggle("open");
    e.target.parentElement.parentElement.previousElementSibling.lastElementChild.classList.toggle(
      "open"
    );
  }
});

// to see by catogory

const catItems = document.querySelectorAll(".cat-item");

catItems.forEach((catItem) => {
  catItem.addEventListener("click", (e) => {
    let key = e.target.innerText;
    right.innerHTML = "";
    products.forEach((product) => {
      if (product.catogory === key) {
        displayProducts(product);
      }
    });
  });
});

// add to cart on event

right.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("icon") ||
    e.target.classList.contains("btn-sec")
  ) {
    const key = e.target.id;
    products.forEach((product) => {
      if (product.productID == key) {
        let cart = getCart();
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        // console.log('added to local');
      }
    });
    let data = getCart();
    // console.log(data);
  }
});

// search event
const searchProduct = async (searchContent) => {
  const res = await fetch("../json/product.json");
  const products = await res.json();
  let matchProducts = products.filter((product) => {
    const regex = new RegExp(`^${searchContent}`, "gi");
    return product.name.match(regex) || product.catogory.match(regex);
  });
  if (searchContent === "") {
    // right.innerHTML = '';
    let output = "";
    products.forEach((product) => {
      output = displayProducts(product, output);
    });
    right.innerHTML = output;
  } else if (matchProducts.length === 0) {
    console.log("len is 0");
    console.log(right);
    right.innerHTML = ` <h2 class="default-msg">Sorry There Is No Such Product Or Catagory For You...</h2>`;
  } else {
    let output = "";
    matchProducts.forEach((product) => {
      output = displayProducts(product, output);
    });
    right.innerHTML = output;
  }
};

search.addEventListener("input", () => searchProduct(search.value));

function getCart() {
  let cart;
  if (localStorage.getItem("cart") === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  return cart;
}
