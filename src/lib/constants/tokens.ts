/**
 * WAV BTL Design Tokens
 * 
 * Single source of truth para TODO el sistema de diseño.
 * Derivado de /styles/globals.css pero exportado a TypeScript.
 */

export const TOKENS = {
  // ========================
  // COLORS
  // ========================
  colors: {
    // Brand
    brandPink: 'var(--wav-brand-pink)',
    brandPurple: 'var(--wav-brand-purple)',
    brandBlue: 'var(--wav-brand-blue)',
    
    // Neutrals
    neutralWhite: 'var(--wav-neutral-white)',
    neutralBlack: 'var(--wav-neutral-black)',
    neutralGray100: 'var(--wav-neutral-gray100)',
    neutralGray500: 'var(--wav-neutral-gray500)',
    neutralGray900: 'var(--wav-neutral-gray900)',
  },
  
  // ========================
  // SPACING (4px base)
  // ========================
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  // ========================
  // TYPOGRAPHY
  // ========================
  typography: {
    fontFamily: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
    
    // Fluid sizes (usar con clamp en styles)
    fontSize: {
      xs: 'clamp(0.75rem, 1vw, 0.875rem)',     // 12-14px
      sm: 'clamp(0.875rem, 1.5vw, 1rem)',      // 14-16px
      base: 'clamp(1rem, 2vw, 1.125rem)',      // 16-18px
      lg: 'clamp(1.125rem, 2.5vw, 1.25rem)',   // 18-20px
      xl: 'clamp(1.25rem, 3vw, 1.5rem)',       // 20-24px
      '2xl': 'clamp(1.5rem, 4vw, 2rem)',       // 24-32px
      '3xl': 'clamp(2rem, 5vw, 3rem)',         // 32-48px
      '4xl': 'clamp(2.5rem, 6vw, 4rem)',       // 40-64px
      '5xl': 'clamp(3rem, 8vw, 5rem)',         // 48-80px
    },
    
    lineHeight: {
      tight: 1.1,     // Titles
      normal: 1.5,    // Body
      relaxed: 1.6,   // Reading
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // ========================
  // MOTION
  // ========================
  motion: {
    duration: {
      instant: 0.1,
      short: 0.12,
      medium: 0.26,
      long: 0.42,
      slow: 0.6,
    },
    
    easing: {
      // Expo Out (Awwwards standard)
      global: [0.19, 1, 0.22, 1] as const,
      // Cubic Out (alternativa)
      smooth: [0.33, 1, 0.68, 1] as const,
      // Linear (evitar en UI)
      linear: [0, 0, 1, 1] as const,
    },
    
    scale: {
      hover: 1.1,      // Tiles
      active: 0.95,    // Buttons
    },
  },
  
  // ========================
  // GEOMETRY
  // ========================
  geometry: {
    trapezoidAngle: 17,           // degrees
    trapezoidRatio: 1.4,
    clipPath: {
      trapezoid: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
      trapezoidInverted: 'polygon(0% 0%, 82% 0%, 100% 100%, 18% 100%)',
    },
  },
  
  // ========================
  // BORDER RADIUS
  // ========================
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    full: '9999px',
  },
  
  // ========================
  // SHADOWS
  // ========================
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // ========================
  // BLUR
  // ========================
  blur: {
    sm: '4px',
    md: '12px',
    lg: '20px',
    xl: '40px',
  },
} as const;

// Type helpers
export type ColorToken = keyof typeof TOKENS.colors;
export type SpacingToken = keyof typeof TOKENS.spacing;
export type TypographySizeToken = keyof typeof TOKENS.typography.fontSize;
