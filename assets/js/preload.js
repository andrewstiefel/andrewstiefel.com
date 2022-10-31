let html = document.getElementById('html-tag');

document.querySelectorAll('.dark-mode-icon').forEach(item => {
  item.addEventListener('click', event => {
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