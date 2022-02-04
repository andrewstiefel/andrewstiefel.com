// Navbar mobile menu

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

// New Copy URL to share
window.addEventListener('load', (event) => {
  if(document.getElementById('copyURL')) {
    copyURL.addEventListener('click', () => {
      /* Get the text field */
      var copyText = document.getElementById("postURL");
      var copySuccess = document.getElementById("shareText");

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
