
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

// THIS IS OUR OVERLAY RENDER FUNCTION AND LOCALSTORAGE



function renderOverlay(){
  let text = document.getElementById('text');
  let overlay = document.getElementById('overlay').style.display = "block";
  
  text.setAttribute('style', 'white-space: pre;');
  text.textContent = 'Hello ' + firstNameValue + ' ' + lastNameValue + "!\r\n We are happy that you chose us! \r\n We will be contacting you as soon as possible!" ;
  


  let exitButton = document.getElementById('exitButton');
  exitButton.textContent = "Exit";
  exitButton.addEventListener('click', clickHandler);

  function clickHandler(event) {
    overlay = document.getElementById('overlay').style.display = "none";
  }

  


 
}


let submitForm = document.getElementById('fullform-ceremony');
submitForm.addEventListener('submit', clickHandler);

let firstNameValue;
let lastNameValue;
let cityForm;
let occasionForm;

function clickHandler(event) {
  event.preventDefault();
  firstNameValue = event.target.firstname.value;
  lastNameValue = event.target.lastname.value;
  cityForm = event.target.city.value;
  occasionForm = event.target.subject.value;


  console.log(event.target.firstname.value);

  let Data = {

    firstName : firstNameValue,
    lastName: lastNameValue,
    city: cityForm,
    occasion: occasionForm

 };

  localStorage.setItem("UserForm", JSON.stringify(Data));


  renderOverlay();
}

// -----------------------------------------------------------------------------