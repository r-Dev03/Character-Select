// Loading animations
const loader = document.querySelector('.loader');
const main = document.querySelector('.main');

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = 'block';
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 2000);
}

init();

//Adding a shopping cart

const cart = document.querySelector('.fa-cart-shopping')
const menu = document.querySelector('.mini-cart')
const closeCart = document.querySelector('#mini-cart-close')

cart.addEventListener('click', () => {
  cart.classList.toggle('is-active') 
  menu.classList.toggle('is-active') 
})
