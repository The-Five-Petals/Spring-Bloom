//add to cart part
let carts=document.querySelectorAll('.add-cart');




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
    name:'Birthday Package',
  
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
          `<div class="product"><ion-icon name="close-circle" style="color: #d488c1;"></ion-icon><img src="./img/${item.name}.jpg" />
              <span class="sm-hide">${item.name}</span>
          </div>
          <div class="price sm-hide">JD${item.price},00</div>
          <div class="quantity">
              <ion-icon class="decrease" name="arrow-dropleft-circle" style="color: #d488c1;"></ion-icon>
                  <span>${item.inCart}</span>
              <ion-icon class="increase" name="arrow-dropright-circle" style="color: #d488c1;"></ion-icon>   
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

function clearCart(){

}
displayCart();
onLoadCartNumbers();

 

function  userMessege(){
  let text = document.getElementById('text');
  let overlay = document.getElementById('overlay').style.display = "block";
  
  text.setAttribute('style', 'white-space: pre;');
  text.textContent = 'Hello ' + fullName + ' ' + "!\r\n We are happy that you are Shop with our site! \r\n Your order Wil be delivered To you as soon as possible!" ;
  


  let exitButton = document.getElementById('exitButton');
  exitButton.textContent = "Exit";
  exitButton.addEventListener('click', popoutMsg);

  function popoutMsg(event) {
    overlay = document.getElementById('overlay').style.display = "none";
   
    
    window.localStorage.clear();
    location.reload();
    return false ;

  }

}
let checkoutForm =document.getElementById ('CheckoutForm');
checkoutForm.addEventListener('submit' ,popoutMsg);

let fullName;
  let phoneNumber;
  let address;
  let city;
 
  
  function popoutMsg (event){
  event.preventDefault();
  fullName= event.target.fullName.value;
  phoneNumber=event.target.phoneNumber.value;
  address=event.target.address.value ;
  city=event.target.city.value;
  
  
 let UserData={
  fullName:fullName,
   phoneNo:phoneNumber,
   address:address,
   city:city ,
 };
 localStorage.setItem("UserCheckout", JSON.stringify(UserData));

 userMessege();
}
