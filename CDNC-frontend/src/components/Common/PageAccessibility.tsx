import React, { useEffect } from 'react';

/**
 * Component that enhances keyboard accessibility on a per-page basis.
 * This component adds focus outlines, ensures proper tab order, and 
 * handles common keyboard interactions (like ESC to close modals).
 * 
 * It should be added to every page that needs enhanced keyboard accessibility.
 */
export const PageAccessibility: React.FC = () => {
  // Add focus management when the page loads
  useEffect(() => {
    // Focus the first heading on page load for screen readers
    // but only if there's no hash in the URL (to avoid disrupting anchor link navigation)
    if (!window.location.hash) {
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        (mainHeading as HTMLElement).setAttribute('tabindex', '-1');
        // Focus without scrolling to avoid disruption
        const originalScrollPosition = window.scrollY;
        (mainHeading as HTMLElement).focus({ preventScroll: true });
        window.scrollTo({ top: originalScrollPosition });
      }
    }

    // Handle focus trap for modals
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close modals with ESC key
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
        if (openModals.length > 0) {
          // Find any close button and trigger it
          const closeButton = openModals[0].querySelector('[aria-label*="close" i]') as HTMLElement;
          if (closeButton) closeButton.click();
        }
      }
    };
    
    // Add tab indexing to interactive elements that may be missing it
    const makeElementsTabbable = () => {
      // Find potentially interactive elements without tabindex
      const potentiallyInteractive = document.querySelectorAll(
        'a:not([tabindex]), button:not([tabindex]), [role="button"]:not([tabindex]), ' +
        '[role="link"]:not([tabindex]), [role="tab"]:not([tabindex]), ' +
        'input:not([tabindex]), select:not([tabindex]), textarea:not([tabindex])'
      );
      
      potentiallyInteractive.forEach(el => {
        if (
          !el.hasAttribute('disabled') && 
          el.getAttribute('aria-hidden') !== 'true' &&
          getComputedStyle(el as Element).display !== 'none' &&
          getComputedStyle(el as Element).visibility !== 'hidden'
        ) {
          (el as HTMLElement).setAttribute('tabindex', '0');
        }
      });
    };
    
    // Run it once on mount
    makeElementsTabbable();
    
    // And also whenever the DOM might change
    const observer = new MutationObserver(makeElementsTabbable);
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);
  
  // This component doesn't render anything - it just enhances the page
  return null;
};

export default PageAccessibility;