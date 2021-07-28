var catItems = document.querySelectorAll(".cat-item");
var catBody = document.querySelectorAll(".cat-body");
var cards = document.querySelectorAll(".card-dtl");
var viewDetails = document.querySelectorAll(".btn-dtl");
var dtlList = document.querySelectorAll(".dtl-list");
var abtProduct = document.querySelectorAll(".abt-product");
const basket = document.querySelector(".bas-right");
var lastItem = catBody[0];
lastItem.style.display = "block";
document.querySelectorAll(".input").defaultValue = "1";
// var hello = document.querySelector(".product-heading");
// var value = hello.innerHTML;
// console.log(value);


// ######################### to show details #################


viewDetails.forEach((vdtl) =>
  vdtl.addEventListener("click", () => {
    dtlList.forEach((dtl) => {
        
      abtProduct.forEach((abt) => {
        if (
          vdtl.dataset.open == dtl.dataset.open &&
          vdtl.dataset.open == abt.dataset.open
        ) {
          dtl.classList.toggle("open");
          abt.classList.toggle("open");
        }
      });
    });
  })
);

// ######################## to display according to catogory ########################

catItems.forEach((item) =>
  item.addEventListener("click", () => {
    catBody.forEach((body) => {
      if (item.dataset.display == body.dataset.display) {
        if (lastItem == body) {
          body.style.display = "block";
        } else {
          body.style.display = "block";
          lastItem.style.display = "none";
          lastItem = body;
        }
      }
    });
  })
);

// ####################### basket #########################
const Card = createCard("./img/Fashion.jpg","product new","pri felis verterem mediocrem cubilia natoque causae eu recteque sodales","100");

function createCard(src,_head,_dicrip,_price){
  // create card div 
  var card = document.createElement("div");
  card.classList.add("card-dtl");
  // create img div 
  var img = document.createElement("div");
  img.classList.add("img");
  card.appendChild(img);
  // create img ele 
  var imgEle = document.createElement("img");
  imgEle.src =`${src}`;
  img.appendChild(imgEle);
  // create cont div 
  var cont = document.createElement("div");
  cont.classList.add("content");
  card.appendChild(cont);
  // create h2 ele
  var h2 = document.createElement("h2");
  h2.classList.add("product-heading","clr-light");
  const head = document.createTextNode(`${_head}`);
  h2.appendChild(head);
  cont.appendChild(h2);
  // create p ele 
  var p = document.createElement("p");
  p.classList.add("product-discript-dtl","clr-light");
  const discrip = document.createTextNode(`${_dicrip}`);
  p.appendChild(discrip);
  cont.appendChild(p);
  // create input ele 
  var inpDiv = document.createElement("div");
  inpDiv.classList.add("input-wrapper");
  var inp = document.createElement("input");
  inp.classList.add("input","clr-light");
  inp.setAttribute('type','number');
  inp.setAttribute('value','1');
  inp.setAttribute('min','1');
  inp.setAttribute('max','50');
  inp.setAttribute('placeholder','Quantity');
  inpDiv.appendChild(inp);
  cont.appendChild(inpDiv);
  // create pricetag 
  var pt = document.createElement("div");
  pt.classList.add("price-tag");
  cont.appendChild(pt);
  var price=document.createElement("h2");
  price.classList.add("price","clr-light");
  const rs = document.createTextNode(`${_price}`);
  price.appendChild(rs);
  pt.appendChild(price);
  var btnRM= document.createElement("a");
  btnRM.classList.add("btn-rm","btn-sec");
  const rm=document.createTextNode("&nbsp;Remove");
  btnRM.appendChild(rm);
  pt.appendChild(btnRm);
  basket.appendChild(Card);
}



