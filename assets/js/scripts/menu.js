var body = document.body;
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
const close = document.querySelector('#close');

button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  burger.classList.toggle('hidden');
  close.classList.toggle('hidden');
  body.classList.toggle('overflow-hidden');
});