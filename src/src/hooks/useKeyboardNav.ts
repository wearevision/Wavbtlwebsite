import { useEffect, useRef, useState } from 'react';

/**
 * useKeyboardNav Hook
 * 
 * Provides keyboard navigation for modal/carousel interfaces.
 * - Arrow Left → Previous
 * - Arrow Right → Next
 * - Escape → Close
 * 
 * Features:
 * - Only active when enabled (modal open)
 * - Ignores events from input/textarea elements
 * - Prevents default scroll behavior on arrows
 * - Debounced to prevent rapid-fire navigation
 * - Returns keyPressed state for visual feedback
 * 
 * @param onNext - Function to call for next navigation
 * @param onPrev - Function to call for previous navigation
 * @param onClose - Function to call for close/exit
 * @param enabled - Whether keyboard navigation is active (default: true)
 * @returns keyPressed - Current key being pressed ('left' | 'right' | null)
 */

interface UseKeyboardNavProps {
  onNext?: () => void;
  onPrev?: () => void;
  onClose: () => void;
  enabled?: boolean;
}

export const useKeyboardNav = ({
  onNext,
  onPrev,
  onClose,
  enabled = true,
}: UseKeyboardNavProps) => {
  const lastKeyTime = useRef<number>(0);
  const DEBOUNCE_MS = 200; // Prevent rapid-fire navigation
  const [keyPressed, setKeyPressed] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const now = Date.now();
      const timeSinceLastKey = now - lastKeyTime.current;

      switch (e.key) {
        case 'ArrowLeft':
        case 'Left':
          if (onPrev && timeSinceLastKey > DEBOUNCE_MS) {
            e.preventDefault(); // Prevent page scroll
            onPrev();
            lastKeyTime.current = now;
            setKeyPressed('left');
            // Reset after visual feedback duration
            setTimeout(() => setKeyPressed(null), 300);
          }
          break;

        case 'ArrowRight':
        case 'Right':
          if (onNext && timeSinceLastKey > DEBOUNCE_MS) {
            e.preventDefault(); // Prevent page scroll
            onNext();
            lastKeyTime.current = now;
            setKeyPressed('right');
            // Reset after visual feedback duration
            setTimeout(() => setKeyPressed(null), 300);
          }
          break;

        case 'Escape':
        case 'Esc':
          e.preventDefault();
          onClose();
          break;

        default:
          break;
      }
    };

    // Add listener with capture phase for early interception
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [enabled, onNext, onPrev, onClose]);

  return keyPressed;
};