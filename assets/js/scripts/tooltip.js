document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggers = document.querySelectorAll('[aria-describedby="stage-tooltip"]');

  // Detect if device supports touch
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  tooltipTriggers.forEach(trigger => {
    const tooltipContainer = trigger.parentElement;
    const tooltip = tooltipContainer.querySelector('[role="tooltip"]');

    if (!tooltip) return;

    let isVisible = false;

    if (isTouchDevice) {
      // Mobile: tap to toggle tooltip
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        isVisible = !isVisible;

        if (isVisible) {
          tooltip.classList.remove('invisible', 'opacity-0');
          tooltip.classList.add('visible', 'opacity-100');
        } else {
          tooltip.classList.remove('visible', 'opacity-100');
          tooltip.classList.add('invisible', 'opacity-0');
        }
      });

      // Close tooltip when tapping anywhere else
      document.addEventListener('click', function(e) {
        if (!tooltipContainer.contains(e.target) && isVisible) {
          isVisible = false;
          tooltip.classList.remove('visible', 'opacity-100');
          tooltip.classList.add('invisible', 'opacity-0');
        }
      });
    } else {
      // Desktop: prevent click from doing anything (hover handles it via CSS)
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
      });
    }

    // Close tooltip on escape key (both mobile and desktop)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isVisible) {
        isVisible = false;
        tooltip.classList.remove('visible', 'opacity-100');
        tooltip.classList.add('invisible', 'opacity-0');
      }
    });
  });
});
