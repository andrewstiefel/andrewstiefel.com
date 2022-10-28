let html = document.getElementById('html-tag');
let icon = document.getElementById('dark-mode-icon');

window.addEventListener('load', (event) => {
  document.getElementById('dark-mode-icon').addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      html.classList.add('light');
      
      // store the value in localStorage
      localStorage.theme = 'light';
      
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.theme = 'dark';
    }
  });
});

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

  html.classList.add('dark');
  html.classList.remove('light');
  localStorage.theme = 'dark';

  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.theme = 'light';
}