






//add to cart part
let carts=document.querySelectorAll('.add-cart');


// function Product (name , price , incart){
//   this.name = name ;
//   this.price=price;
//   this.incart=incart;
//   Product.all.push(this);
// }
// Product.all=[];

// new Product ('Flower Gori',10 ,0);
// new Product ('Pink Gori',15 ,0);
// new Product ('Heart Package',12 ,0);
// new Product ('Message Package',13 ,0);
// new Product ('Mix Package',18 ,0);
// new Product ('Birthday Package',20 ,0);

let products=[
  {
    name:'Flower Gori',
   
    price:10,
    inCart:0

  },
  {
    name:'Pink Gori',
  
    price:15,
    inCart:0

  },
  {
    name:'Heart Package',
  
    price:12,
    inCart:0,

  },
  {
    name:'Message Package',
   
    price:13,
    inCart:0,

  },
  {
    name:'Mix Package',
  
    price:18,
    inCart:0,

  },
  {
    name:'Birthday Package ',
  
    price:20,
    inCart:0

  }
];

for(let i=0;i<carts.length;i++){
  carts[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
    totalCost( products[i]);
  });

}
function cartNumbers(flower,action){


  let productNumbers=localStorage.getItem('cartNumbers');
   productNumbers=parseInt(productNumbers);
  let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
  if( action ) {
  
    localStorage.setItem('cartNumbers',productNumbers - 1);
  
    document.querySelector('.cart span').textContent  =  productNumbers - 1;

} else if ( productNumbers ) {
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.cart span').textContent  =  productNumbers + 1;
  }
  else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent=1;
  }
  setItems(flower);
}



function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


function setItems(product) {
  // let productNumbers = localStorage.getItem('cartNumbers');
  // productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {
      let currentProduct = product.name;
  
      if( cartItems[currentProduct] == undefined ) {
          cartItems = {
              ...cartItems,
              [currentProduct]: product
          }
      } 
      cartItems[currentProduct].inCart += 1;

  } else {
      product.inCart = 1;
      cartItems = { 
          [product.name]: product
      };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product,action) {
  let cart = localStorage.getItem("totalCost");
  if( action ) {
    cart = parseInt(cart);

    localStorage.setItem("totalCost", cart - product.price);
} else if(cart != null) {
      
    cart= parseInt(cart);
      localStorage.setItem("totalCost", cart + product.price);
  
  } else {
      localStorage.setItem("totalCost", product.price);
  }
}



//display in cart function 
function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

 

  let productContainer = document.querySelector('.products');
  let cart = localStorage.getItem("totalCost");
 cart = parseInt(cart);
  
  if( cartItems && productContainer ) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map( (item) => {
          productContainer.innerHTML += 
          `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="./img/${item.name}.jpg" />
              <span class="sm-hide">${item.name}</span>
          </div>
          <div class="price sm-hide">JD${item.price},00</div>
          <div class="quantity">
              <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                  <span>${item.inCart}</span>
              <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
          </div>
          <div class="total">JD${item.inCart * item.price},00</div>`;
      });

      productContainer.innerHTML += `
          <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">Basket Total</h4>
              <h4 class="basketTotal">JD${cart},00</h4>
          </div>`
         

  deleteButtons(); 
  manageQuantity();
     
    
  }
 
}
function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  for(let i=0; i < increaseButtons.length; i++) {
      decreaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent.trim();
          console.log(currentQuantity);
          currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim();
          console.log(currentProduct);

          if( cartItems[currentProduct].inCart > 1 ) {
              cartItems[currentProduct].inCart -= 1;
               totalCost(cartItems[currentProduct], "decrease");
               cartNumbers(cartItems[currentProduct], "decrease");

              

              localStorage.setItem('productsInCart', JSON.stringify(cartItems));
              displayCart();
          }
      });

      increaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
          console.log(currentQuantity);
          currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim();
          console.log(currentProduct);

          cartItems[currentProduct].inCart += 1;
           totalCost(cartItems[currentProduct]);
           cartNumbers(cartItems[currentProduct]);
          
          localStorage.setItem('productsInCart', JSON.stringify(cartItems));
          displayCart();
      });
  }
}
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.product ion-icon');
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productName;
  console.log(cartItems);

  for(let i=0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', () => {
        
          productName = deleteButtons[i].parentElement.textContent.trim();
          //.toLocaleLowerCase().replace(/ /g,'').trim();
      
          localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
          localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

          delete cartItems[productName];
          localStorage.setItem('productsInCart', JSON.stringify(cartItems));
          displayCart();
          onLoadCartNumbers();
         
      })
  }
}
displayCart();
onLoadCartNumbers();

 


//  start of function  of sliding images in ceremony page added by Hamza

let myIndex = 0;
occasions();

function occasions() {
  let i;
  let sliderImages = document.getElementsByClassName('slider-images');
  for (i = 0; i < slider-images.length; i++) {
    sliderImages[i].style.display = 'none';
  }
  myIndex++;
  if (myIndex > sliderImages.length) {myIndex = 1;}
  sliderImages[myIndex-1].style.display = 'block';
  setTimeout(occasions, 2000);
}
//end of function  of sliding images in ceremony page added by Hamza