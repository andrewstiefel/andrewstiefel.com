// Table of Contents Generator
function generateTableOfContents() {
  const tocContainer = document.getElementById('table-of-contents');
  const articleContent = document.querySelector('.prose');
  
  console.log('TOC: Container found:', !!tocContainer);
  console.log('TOC: Article content found:', !!articleContent);
  
  if (!tocContainer || !articleContent) {
    console.log('TOC: Missing required elements');
    return;
  }

  const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
  console.log('TOC: Found', headings.length, 'headings');
  
  if (headings.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }

  // Generate unique IDs for headings that don't have them
  headings.forEach((heading, index) => {
    if (!heading.id) {
      const text = heading.textContent.trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      
      heading.id = id || `heading-${index}`;
    }
  });

  // Build the table of contents HTML with simplified structure
  let tocHTML = '';
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent.trim();
    const id = heading.id;
    
    // Calculate indentation based on heading level
    const indent = Math.max(0, level - 2); // Start from h2, so h2=0, h3=1, etc.
    const indentClass = indent > 0 ? `ml-${indent * 4}` : '';
    
    tocHTML += `<div class="toc-item toc-level-${level} ${indentClass}">
      <a href="#${id}" class="toc-link">${text}</a>
    </div>`;
  });

  const tocList = tocContainer.querySelector('.toc-content');
  if (tocList) {
    tocList.innerHTML = tocHTML;
    console.log('TOC: Generated HTML:', tocHTML);
    
    // Set up collapsible functionality
    setupTocCollapse(tocContainer, tocList);
  } else {
    console.log('TOC: Could not find .toc-content element');
  }

  // Add smooth scrolling and active state management
  const tocLinks = tocContainer.querySelectorAll('.toc-link');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without scrolling
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });

  // Highlight current section on scroll
  function updateActiveSection() {
    let current = '';
    const offset = 100; // Offset for header height
    
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= offset) {
        current = heading.id;
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Throttled scroll listener
  let ticking = false;
  function throttledUpdateActiveSection() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', throttledUpdateActiveSection);
  
  // Initialize active state
  updateActiveSection();
}

// Set up collapsible functionality
function setupTocCollapse(tocContainer, tocContent) {
  const toggleButton = document.getElementById('toc-toggle');
  const chevronIcon = document.getElementById('toc-chevron');
  const contentElement = document.getElementById('toc-content');
  
  if (!toggleButton || !chevronIcon || !contentElement) {
    console.log('TOC: Missing collapse elements');
    return;
  }
  
  let isExpanded = false;
  
  // Function to expand TOC
  function expandToc() {
    isExpanded = true;
    contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
    chevronIcon.style.transform = 'rotate(90deg)';
    toggleButton.setAttribute('aria-expanded', 'true');
  }
  
  // Function to collapse TOC
  function collapseToc() {
    isExpanded = false;
    contentElement.style.maxHeight = '0px';
    chevronIcon.style.transform = 'rotate(0deg)';
    toggleButton.setAttribute('aria-expanded', 'false');
  }
  
  // Toggle function
  function toggleToc() {
    if (isExpanded) {
      collapseToc();
    } else {
      expandToc();
    }
  }
  
  // Set up event listener
  toggleButton.addEventListener('click', toggleToc);
  
  // Initialize in collapsed state
  toggleButton.setAttribute('aria-expanded', 'false');
  collapseToc();
  
  console.log('TOC: Collapse functionality initialized');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', generateTableOfContents);
