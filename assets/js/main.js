var html = document.documentElement;
var body = document.body;

burger();

function burger() {
    'use strict';
    document.querySelector('.navbar-burger').addEventListener('click', function () {
        if (!body.classList.contains('menu-opened')) {
            body.classList.add('menu-opened');
        } else {
            body.classList.remove('menu-opened');
        }
    });
}

var hamburger = document.querySelector(".navbar-burger");
  // On click
  hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
});
