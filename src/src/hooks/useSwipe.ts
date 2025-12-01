/**
 * useSwipe — Custom Hook for Swipe Gestures (Mobile Navigation)
 * 
 * Detecta gestos de swipe left/right en elementos táctiles.
 * Usado para navegación de modales en mobile.
 */

import { useRef, useEffect, RefObject } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeConfig {
  minSwipeDistance?: number;
  maxSwipeTime?: number;
}

export const useSwipe = (
  elementRef: RefObject<HTMLElement>,
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) => {
  const {
    minSwipeDistance = 50,
    maxSwipeTime = 500
  } = config;

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;
      const deltaTime = touchEndTime - touchStartTime.current;

      // Check if swipe is horizontal (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Check if swipe distance and time are within thresholds
        if (Math.abs(deltaX) >= minSwipeDistance && deltaTime <= maxSwipeTime) {
          if (deltaX > 0) {
            // Swipe Right
            handlers.onSwipeRight?.();
          } else {
            // Swipe Left
            handlers.onSwipeLeft?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, handlers, minSwipeDistance, maxSwipeTime]);
};
