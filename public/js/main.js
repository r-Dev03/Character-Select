// Loading animations
const loader = document.querySelector('.loader');
const main = document.querySelector('.main');

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = 'block';
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 1000);
}

init();

//Adding a shopping cart slide out menu

const cart = document.querySelector('.fa-cart-shopping')
const menu = document.querySelector('.mini-cart')
const body = document.querySelector('.base') 
const closeCart = document.querySelector('#mini-cart-close')

cart.addEventListener('click', () => {
  cart.classList.toggle('is-active')
  menu.classList.toggle('enable-scroll') 
  menu.classList.toggle('is-active')
  body.classList.toggle('disable-scroll')
})

//Delete Fucntion

const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach((el)=>{
  el.addEventListener('click', deleteProduct)
})

async function deleteProduct(){
  const productId = this.parentNode.dataset.id
  console.log(productId)
  try{
      const response = await fetch('/cart/deleteProduct', {
          method: 'delete',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              'productIdFromJSFile': productId
          })
      })
      const data = await response.json()
      console.log(data)
      location.reload()
  }catch(err){
      console.log(err)
  }
}

//ADD Alert

const addBtn = document.querySelectorAll('.addProduct')
const alertSuccess = document.querySelector('.alert-success')

Array.from(addBtn).forEach((el)=>{
  el.addEventListener('submit', addAlert)
})

function addAlert(e) {
  alertSuccess.classList.toggle('hidden')
}







