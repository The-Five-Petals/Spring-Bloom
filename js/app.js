
//  start of function  of sliding images in ceremony page added by Hamza

let myIndex = 0;
occasions();

function occasions() {
  let i;
  let sliderImages = document.getElementsByClassName('slider-images');
  for (i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
  myIndex++;
  if (myIndex > sliderImages.length) {myIndex = 1;}
  sliderImages[myIndex-1].style.display = 'block';
  setTimeout(occasions, 2000);
}
// end of function  of sliding images in ceremony page added by Hamza




//add to cart part
let carts=document.querySelectorAll('.add-cart');
let products=[
  {
    name:'Flower ',
    tag:'Grey',
    price:15,
    inCart:0

  },
  {
    name:'Blue',
    tag:'Blue flower',
    price:20,
    inCart:0

  },
  {
    name:'Yellow',
    tag:'Yellow',
    price:10,
    inCart:0

  },
  {
    name:'Tulip ',
    tag:'Tulip ',
    price:25,
    inCart:0

  }
];
for(let i=0;i<carts.length;i++){
  carts[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
  });

}
function cartNumbers(product){
  console.log(product);

  let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
  }
  else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent=1;
  }

}



function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent=productNumbers;
  }
}
onLoadCartNumbers();
