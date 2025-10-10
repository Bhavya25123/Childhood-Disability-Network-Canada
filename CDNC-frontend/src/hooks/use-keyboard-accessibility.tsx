import { useEffect } from 'react';

type FocusableSelector = string;
type KeyboardHandler = (e: KeyboardEvent) => void;

interface UseKeyboardAccessibilityOptions {
  /**
   * Selector for elements that should be focusable with the tab key
   * Default is standard interactive elements
   */
  focusableSelector?: FocusableSelector;
  
  /**
   * Function to be called when the escape key is pressed
   */
  onEscape?: KeyboardHandler;
  
  /**
   * Function to be called when the enter key is pressed
   */
  onEnter?: KeyboardHandler;
  
  /**
   * Function to be called when the space key is pressed
   */
  onSpace?: KeyboardHandler;
}

/**
 * Hook to manage keyboard accessibility throughout the application
 */
export const useKeyboardAccessibility = ({
  focusableSelector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
  onEscape,
  onEnter,
  onSpace,
}: UseKeyboardAccessibilityOptions = {}) => {
  
  // Set up global keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle escape key
      if (e.key === 'Escape' && onEscape) {
        onEscape(e);
      }
      
      // Handle enter key
      if (e.key === 'Enter' && onEnter) {
        onEnter(e);
      }
      
      // Handle space key
      if (e.key === ' ' && onSpace) {
        onSpace(e);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape, onEnter, onSpace]);
  
  /**
   * Forces all focusable elements within the container to have tabIndex=0 if not already set
   */
  const ensureFocusable = (containerRef: React.RefObject<HTMLElement>) => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll<HTMLElement>(focusableSelector);
      elements.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
        }
      });
    }
  };
  
  /**
   * Trap focus within a modal or dialog
   */
  const trapFocus = (containerRef: React.RefObject<HTMLElement>) => {
    if (!containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus the first element when mounted
    firstElement.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // If shift+tab and focus is on first element, move to last element
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // If tab and focus is on last element, move to first element
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    containerRef.current.addEventListener('keydown', handleTabKey);
    
    return () => {
      containerRef.current?.removeEventListener('keydown', handleTabKey);
    };
  };
  
  return {
    ensureFocusable,
    trapFocus
  };
};