const modal = document.getElementById('search-modal');
const input = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

let searchLoaded = false;
let index, store = {};
let currentFocus = -1;

function toggleModal(show) {
    if (show) {
      modal.classList.add('opacity-100');
      modal.classList.remove('opacity-0', 'pointer-events-none');
      input.focus();
      loadSearch();
    } else {
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      input.blur();
    }
}

document.addEventListener('keydown', function (e) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if ((isMac && e.metaKey && e.key === 'k') || (!isMac && e.ctrlKey && e.key === 'k')) {
    e.preventDefault();
    // Track keyboard shortcut usage with Fathom
    if (typeof fathom !== 'undefined') {
      fathom.trackEvent('Search');
    }
    toggleModal(true);
  }
  if (e.key === 'Escape') {
    toggleModal(false);
  }
});

modal.addEventListener('click', function (e) {
  if (e.target === modal) toggleModal(false);
});

// Button event listeners
document.getElementById('search-trigger')?.addEventListener('click', () => toggleModal(true));
document.getElementById('search-trigger-mobile')?.addEventListener('click', () => toggleModal(true));
document.getElementById('modal-close')?.addEventListener('click', () => toggleModal(false));

async function loadSearch() {
  if (searchLoaded) return;
  searchLoaded = true;

  // Dynamically import FlexSearch
  const FlexSearchModule = await import('/assets/js/vendor/flexsearch.bundle.module.min.js');
    const FlexSearch = FlexSearchModule.default;

  // Initialize index
  index = new FlexSearch.Document({
    document: {
      id: 'url',
      index: ['title', 'content', 'tags'],
      store: ['title', 'url']
    },
    tokenize: 'forward',
    cache: true
  });

  store = {};

  // Fetch search data
  const res = await fetch('/search.json');
  const data = await res.json();

  for (const post of data) {
    index.add(post);
    store[post.url] = post;
  }

  // Input handler
  input.addEventListener('input', function () {
    const query = this.value.trim();
    if (!query) {
      searchResults.innerHTML = '<div class="text-gray-400 dark:text-gray-200 text-center">Quick search for anything</div>';
      return;
    }

    const results = index.search(query, { enrich: true });
    const urls = new Set();
    results.forEach(group => {
      group.result.forEach(r => urls.add(r.doc.url));
    });

    if (urls.size === 0) {
      searchResults.innerHTML = '<div class="text-gray-400 dark:text-gray-200 text-center">No results found</div>';
      return;
    }

    searchResults.innerHTML = Array.from(urls).map(url => {
      const post = store[url];
      return `
        <a href="${post.url}"
           onclick="document.getElementById('search-modal').classList.add('hidden')"
           class="block px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-600 rounded text-left">
          <div class="font-medium text-gray-800 dark:text-gray-200">${post.title}</div>
        </a>`;
    }).join('');
  });

  // Keyboard navigation
  input.addEventListener('keydown', function (e) {
    const items = searchResults.querySelectorAll('a');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      currentFocus = (currentFocus + 1) % items.length;
      updateActive(items);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      currentFocus = (currentFocus - 1 + items.length) % items.length;
      updateActive(items);
      e.preventDefault();
    } else if (e.key === 'Enter' && currentFocus > -1) {
      items[currentFocus].click();
    }
  });
}

function updateActive(items) {
  items.forEach((item, i) => {
    const isActive = i === currentFocus;
    item.classList.toggle('bg-gray-100', isActive);
    item.classList.toggle('dark:bg-gray-600', isActive);
  });
}