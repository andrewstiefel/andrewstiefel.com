let html = document.getElementById('html-tag');
let themeText = document.querySelector(".theme-text");

document.querySelector('#theme-toggle').addEventListener('click', () => {
  if (!html.classList.contains('dark') && !html.classList.contains('light')) {
    html.classList.remove('light');
    html.classList.add('theme-dark', 'dark');
    themeText.innerText = "Dark";

    // store the value whenever the user explicitly chooses dark mode
    localStorage.setItem('theme', 'dark');
    
  } else if (html.classList.contains('dark')) {
    html.classList.remove('theme-dark', 'dark');
    html.classList.add('light');
    themeText.innerText = "Light";

    // store the value whenever the user explicitly chooses light mode
    localStorage.setItem('theme', 'light');

  } else {
    html.classList.remove('theme-dark', 'dark', 'light');
    themeText.innerText = "System";

    // remove the stored value when the user chooses to respect the OS prefernce
    localStorage.removeItem('theme'); 
  }
});

// Evaluate if we need to update the theme toggle text
window.addEventListener('load', (event) => {
  if (localStorage.theme === 'dark') {
    themeText.innerText = "Dark";
  }
  else if (localStorage.theme === 'light') {
    themeText.innerText = "Light";
  }
  else {
    console.log()
  }
});