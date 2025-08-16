// Scroll depth indicator for blog posts
function initScrollIndicator() {
  // Only initialize on post pages
  const article = document.querySelector('article');
  if (!article) return;

  // Create scroll indicator container with background
  const container = document.createElement('div');
  container.id = 'scroll-indicator-container';
  container.className = 'fixed top-0 left-0 w-full h-1 bg-paper dark:bg-gray-950 z-50';
  
  // Create the progress indicator
  const indicator = document.createElement('div');
  indicator.id = 'scroll-indicator';
  indicator.className = 'h-full bg-primary transition-all duration-300 ease-out';
  indicator.style.width = '0%';
  
  // Append indicator to container
  container.appendChild(indicator);
  
  // Insert container at the beginning of body
  document.body.insertBefore(container, document.body.firstChild);

  // Calculate scroll progress
  function updateScrollIndicator() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate the scroll percentage
    const scrollableDistance = documentHeight - windowHeight;
    const scrollPercentage = scrollableDistance > 0 ? (scrollTop / scrollableDistance) * 100 : 0;
    
    // Update indicator width
    indicator.style.width = Math.min(scrollPercentage, 100) + '%';
    
    // Add subtle opacity changes based on scroll position
    if (scrollPercentage > 0) {
      container.style.opacity = '1';
    } else {
      container.style.opacity = '0';
    }
  }

  // Throttle scroll events for better performance
  let ticking = false;
  function throttledUpdate() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateScrollIndicator();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initialize and add event listener
  updateScrollIndicator();
  window.addEventListener('scroll', throttledUpdate, { passive: true });
  window.addEventListener('resize', throttledUpdate, { passive: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollIndicator);
} else {
  initScrollIndicator();
}
