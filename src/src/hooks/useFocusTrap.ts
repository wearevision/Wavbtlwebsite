import { useEffect, RefObject } from 'react';

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        // Simple focus trap logic
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the close button on mount for immediate accessibility
    const timer = setTimeout(() => {
      // Find the visible close button based on media query state
      // We look for the button that is not hidden (display: none)
      const btns = containerRef.current?.querySelectorAll('button[aria-label="Close modal"]');
      btns?.forEach((btn) => {
         if (window.getComputedStyle(btn).display !== 'none') {
            (btn as HTMLElement).focus();
         }
      });
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose, containerRef]);
};
