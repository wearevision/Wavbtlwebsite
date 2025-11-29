import { TOKENS } from './tokens';

/**
 * WAV BTL Motion Variants
 * 
 * Todas las animaciones de Motion deben usar estas variants.
 * Garantiza consistencia según Guidelines.md §5.3
 */

const { duration, easing } = TOKENS.motion;

export const MOTION_VARIANTS = {
  // Fade In/Out (backdrop, overlays)
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: duration.long, ease: easing.global } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: duration.medium, ease: easing.global } 
    },
  },
  
  // Slide Up (mobile modals, cards)
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: duration.long, ease: easing.global } 
    },
    exit: { 
      opacity: 0, 
      y: 40, 
      transition: { duration: duration.medium, ease: easing.global } 
    },
  },
  
  // Slide Down (menus, dropdowns)
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: duration.medium, ease: easing.global } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: duration.short, ease: easing.global } 
    },
  },
  
  // Scale (buttons, tiles on hover)
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: duration.medium, ease: easing.global } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: duration.short, ease: easing.global } 
    },
  },
  
  // Clip Trapezoid (modal visual reveal)
  clipTrapezoid: {
    hidden: { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
    visible: {
      clipPath: TOKENS.geometry.clipPath.trapezoid,
      transition: { duration: duration.slow, ease: easing.global },
    },
    exit: {
      clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      transition: { duration: duration.medium, ease: easing.global },
    },
  },
  
  // Stagger Children (para listas)
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

export type MotionVariantKey = keyof typeof MOTION_VARIANTS;
