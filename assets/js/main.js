// Navbar mobile menu

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

// Subscribe to RSS
window.addEventListener('load', (event) => {
  if(document.getElementById('subRSS')) {
    subRSS.addEventListener('click', () => {
      fathom.trackGoal('YKQ6ZLVM', 0);
    });
  } else {
    console.log()
  }
});

// Subscribe to newsletter
window.addEventListener('load', (event) => {
  if(document.getElementById('subForm')) {
    subForm.addEventListener('submit', () => {
        fathom.trackGoal('UFIQJWTI', 0);
    });
  } else {
    console.log()
  }
});

// Click affiliate link
window.addEventListener('load', (event) => {
  if(document.getElementById('clickAff')) {
    clickAff.addEventListener('click', () => {
      fathom.trackGoal('N9ZM2BUT', 0);
    });
  } else {
    console.log()
  }
});
