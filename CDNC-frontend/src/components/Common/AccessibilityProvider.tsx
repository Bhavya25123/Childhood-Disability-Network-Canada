import React, { useRef, useEffect } from 'react';
import { useKeyboardAccessibility } from '@/hooks/use-keyboard-accessibility';

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

/**
 * Component to apply global accessibility features to the application
 * This component enhances keyboard navigation across all pages
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const appRef = useRef<HTMLDivElement>(null);
  const { ensureFocusable } = useKeyboardAccessibility();

  // On mount and when children change, ensure all interactive elements are keyboard navigable
  useEffect(() => {
    if (appRef.current) {
      ensureFocusable(appRef);
    }
    
    // Add outline style for keyboard focus only
    const style = document.createElement('style');
    style.textContent = `
      /* Show focus outline only when using keyboard, not on mouse click */
      :focus:not(:focus-visible) {
        outline: none;
      }
      :focus-visible {
        outline: 2px solid #6B46C1;
        outline-offset: 2px;
      }
      /* Make sure all interactive elements have appropriate focus states */
      a:focus-visible, 
      button:focus-visible, 
      input:focus-visible, 
      select:focus-visible, 
      textarea:focus-visible,
      [role="button"]:focus-visible,
      [tabindex]:focus-visible {
        outline: 2px solid #6B46C1;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [children]);

  return (
    <div ref={appRef} className="keyboard-accessible-app">
      {children}
    </div>
  );
};