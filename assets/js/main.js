// Toggle mobile menu

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

// Toggle document theme
let html = document.getElementById('html-tag');
let themeText = document.querySelector(".theme-text");

document.querySelector('#theme-toggle').addEventListener('click', () => {
  if (!html.classList.contains('dark') && !html.classList.contains('light')) {
    html.classList.remove('light');
    html.classList.add('theme-dark', 'dark');
    themeText.innerText = "Dark theme";

    // store the value whenever the user explicitly chooses dark mode
    localStorage.setItem('theme', 'dark');
    
  } else if (html.classList.contains('dark')) {
    html.classList.remove('theme-dark', 'dark');
    html.classList.add('light');
    themeText.innerText = "Light theme";

    // store the value whenever the user explicitly chooses light mode
    localStorage.setItem('theme', 'light');

  } else {
    html.classList.remove('theme-dark', 'dark', 'light');
    themeText.innerText = "System theme";

    // remove the stored value when the user chooses to respect the OS prefernce
    localStorage.removeItem('theme'); 
  }
});

// Evaluate if we need to update the theme toggle text
window.addEventListener('load', (event) => {
  if (localStorage.theme === 'dark') {
    themeText.innerText = "Dark theme";
  }
  else if (localStorage.theme === 'light') {
    themeText.innerText = "Light theme";
  }
  else {
    console.log()
  }
});

// Track click events with Fathom Analytics
var link_elements = document.querySelectorAll('[data-fathom]');
for (var i = 0, len = link_elements.length; i < len; i++) {
    link_elements[i].addEventListener('click', function(event) {
        fathom.trackGoal(event.currentTarget.getAttribute('data-fathom'), 0);
}, false); }