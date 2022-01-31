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

function copyURL() {
  /* Get the text field */
  var copyText = document.getElementById("postURL");
  var copySuccess = document.getElementById("copyURL");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  copySuccess.classList.add('copied');

  setTimeout(() => {
    copySuccess.classList.remove('copied');
  }, 2000);
};
