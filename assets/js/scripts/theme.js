const html = document.documentElement;
const toggleButton = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const optionsMenu = document.getElementById('theme-options');
const optionButtons = document.querySelectorAll('.theme-option');
const iconWrapper = toggleButton.querySelector('.icon-wrapper');

const icons = {
  system: `<svg class="w-4 h-4 fill-gray-700 dark:fill-gray-300" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2.667c-7.36 0-13.333 5.973-13.333 13.333s5.973 13.333 13.333 13.333c7.36 0 13.333-5.973 13.333-13.333s-5.973-13.333-13.333-13.333zM16 5.333c5.893 0 10.667 4.773 10.667 10.667s-4.773 10.667-10.667 10.667v-21.333z"></path></svg>`,
  dark: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`,
  light: `<svg class="w-4 h-4 fill-gray-700" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M4.733 24.72l1.88 1.88 2.4-2.387L7.12 22.32zm9.934 5.213h2.667V26h-2.667zM16 7.333c-4.413 0-8 3.587-8 8s3.587 8 8 8 8-3.587 8-8c0-4.427-3.587-8-8-8zm10.667 9.334h4V14h-4zm-3.68 7.546l2.4 2.387 1.88-1.88-2.387-2.4zm4.28-18.266l-1.88-1.88-2.4 2.387 1.893 1.893zM17.333.733h-2.667v3.933h2.667zM5.333 14h-4v2.667h4zm3.68-7.547l-2.4-2.387-1.88 1.88 2.387 2.4 1.893-1.893z"></path></svg>`
};

const metaTheme = document.querySelector('meta[name="theme-color"]');

function setThemeColor(hex) {
  metaTheme.setAttribute('content', hex);
}

function applyTheme(value) {
  html.classList.remove('dark', 'light');

  if (value === 'dark') {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setThemeColor('#1b1b1a');
  } else if (value === 'light') {
    html.classList.add('light');
    localStorage.setItem('theme', 'light');
    setThemeColor('#fafaf9');
  } else {
    localStorage.removeItem('theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.add(isDark ? 'dark' : 'light');
    setThemeColor(isDark ? '#1b1b1a' : '#fafaf9');
  }

  themeLabel.textContent =
    value.charAt(0).toUpperCase() + value.slice(1);
  iconWrapper.innerHTML = icons[value];
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    html.classList.toggle('dark', e.matches);
    setThemeColor(e.matches ? '#1b1b1a' : '#fafaf9');
  }
});

function showMenu() {
  optionsMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
  optionsMenu.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
}

function hideMenu() {
  optionsMenu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
  optionsMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
}

toggleButton.addEventListener('click', () => {
  const isOpen = optionsMenu.classList.contains('opacity-100');
  if (isOpen) {
    hideMenu();
  } else {
    showMenu();
  }
});

optionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-theme');
    applyTheme(selected);
    hideMenu();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  applyTheme(saved || 'system');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    html.classList.remove('dark', 'light');
    html.classList.add(e.matches ? 'dark' : 'light');
  }
});

window.addEventListener('click', (e) => {
  if (!toggleButton.contains(e.target) && !optionsMenu.contains(e.target)) {
    hideMenu();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideMenu();
});

window.addEventListener('scroll', hideMenu);