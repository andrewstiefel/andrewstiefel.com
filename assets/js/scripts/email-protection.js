/**
 * Email protection utility
 * Protects email addresses from bots and scrapers using multiple techniques
 */
(function() {
  'use strict';

  /**
   * ROT13 decoder for email addresses
   */
  function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(char) {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  }

  /**
   * Decode and reveal email addresses
   */
  function revealEmail(element) {
    const encodedEmail = element.dataset.email;
    const encodedSubject = element.dataset.subject || '';
    
    if (!encodedEmail) return;

    // Decode the email
    const decodedEmail = rot13(encodedEmail);
    const decodedSubject = encodedSubject ? rot13(encodedSubject) : '';
    
    // Create the mailto link
    const mailtoUrl = `mailto:${decodedEmail}${decodedSubject ? '?subject=' + encodeURIComponent(decodedSubject) : ''}`;
    
    // Update the element
    element.href = mailtoUrl;
    element.textContent = decodedEmail;
    element.classList.remove('email-protected');
    element.classList.add('email-revealed');
    
    // Update styling for revealed state
    element.style.borderBottom = '1px solid currentColor';
    element.style.textDecoration = 'none';
    
    // Add visual feedback
    element.style.opacity = '0.7';
    setTimeout(() => {
      element.style.opacity = '1';
    }, 150);
  }

  /**
   * Create a copy-to-clipboard fallback
   */
  function copyEmail(email) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showCopyFeedback();
      }).catch(err => {
        console.error('Failed to copy email:', err);
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        showCopyFeedback();
      }
    } catch (err) {
      document.body.removeChild(textArea);
      console.error('Copy failed:', err);
    }
  }

  function showCopyFeedback() {
    // Create or show copy notification
    let notification = document.getElementById('email-copy-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'email-copy-notification';
      notification.textContent = 'Email copied to clipboard!';
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 opacity-0 transition-opacity duration-300';
      document.body.appendChild(notification);
    }
    
    notification.classList.remove('opacity-0');
    setTimeout(() => {
      notification.classList.add('opacity-0');
    }, 2000);
  }

  /**
   * Initialize email protection
   */
  function initEmailProtection() {
    // Find all protected email elements
    const protectedEmails = document.querySelectorAll('[data-email]');
    
    protectedEmails.forEach(element => {
      // Add hover effect to indicate interactivity
      element.style.cursor = 'pointer';
      
      // Primary click handler - reveal email
      element.addEventListener('click', function(e) {
        // Only prevent default if email is still protected
        if (this.classList.contains('email-protected')) {
          e.preventDefault();
          revealEmail(this);
        }
        // If email is revealed, allow normal link behavior
      });

      // Double-click handler - copy to clipboard
      element.addEventListener('dblclick', function(e) {
        e.preventDefault();
        const encodedEmail = this.dataset.email;
        if (encodedEmail) {
          const decodedEmail = rot13(encodedEmail);
          copyEmail(decodedEmail);
        }
      });

      // Keyboard accessibility
      element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          revealEmail(this);
        }
      });

      // Add ARIA label for accessibility
      const encodedEmail = element.dataset.email;
      if (encodedEmail) {
        element.setAttribute('aria-label', 'Click to reveal email address');
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
      }
    });

    // Clean up any bot-readable email addresses in the DOM
    // (This runs after page load to avoid interfering with legitimate content)
    setTimeout(() => {
      cleanupBotEmails();
    }, 1000);
  }

  /**
   * Remove or obfuscate any plain email addresses that might be targeted by bots
   */
  function cleanupBotEmails() {
    // Find all links that look like mailto links but aren't protected
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    mailtoLinks.forEach(link => {
      if (!link.classList.contains('email-protected') && !link.classList.contains('email-revealed')) {
        // This is an unprotected email link - we might want to protect it too
        const email = link.href.replace('mailto:', '').split('?')[0];
        
        // Only protect if it matches our known email pattern
        if (email.includes('andrewstiefel.com')) {
          const encoded = rot13(email);
          link.dataset.email = encoded;
          link.href = '#';
          link.textContent = 'Reveal email';
          link.classList.add('email-protected');
          
          // Add the same event handlers
          link.addEventListener('click', function(e) {
            e.preventDefault();
            revealEmail(this);
          });
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailProtection);
  } else {
    initEmailProtection();
  }

  // Expose utility functions for manual use
  window.emailProtection = {
    rot13: rot13,
    revealEmail: revealEmail,
    copyEmail: copyEmail
  };

})();
