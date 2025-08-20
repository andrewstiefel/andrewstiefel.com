/**
 * Share functionality for copying post URLs to clipboard
 */
(function() {
  'use strict';

  function initShare() {
    const shareBtn = document.getElementById('share-btn');
    const copiedPopup = document.getElementById('copied-popup');
    
    if (!shareBtn || !copiedPopup) return;

    shareBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const url = this.getAttribute('data-url');
      
      if (!url) {
        console.warn('No URL found for sharing');
        return;
      }

      // Use the modern Clipboard API if available
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url)
          .then(() => {
            showCopiedFeedback();
          })
          .catch(err => {
            console.error('Failed to copy URL:', err);
            fallbackCopyText(url);
          });
      } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyText(url);
      }
    });

    function fallbackCopyText(text) {
      try {
        // Create a temporary textarea element
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        // Execute the copy command
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          showCopiedFeedback();
        } else {
          console.error('Fallback copy failed');
        }
      } catch (err) {
        console.error('Fallback copy error:', err);
      }
    }

    function showCopiedFeedback() {
      // Show the popup
      copiedPopup.classList.remove('opacity-0');
      copiedPopup.classList.add('opacity-100');
      
      // Hide after 2 seconds
      setTimeout(() => {
        copiedPopup.classList.remove('opacity-100');
        copiedPopup.classList.add('opacity-0');
      }, 2000);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
  } else {
    initShare();
  }
})();
