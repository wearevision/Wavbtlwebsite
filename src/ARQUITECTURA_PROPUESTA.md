# 🏗️ WAV BTL — ARQUITECTURA PROPUESTA (Awwwards-Level)

**Versión:** 2.0  
**Fecha:** 2025-11-29  
**Stack:** React + TypeScript + Tailwind v4 + Motion + Supabase

---

## 📐 PRINCIPIOS ARQUITECTÓNICOS

### **1. Feature-Based Architecture**
Cada feature es **self-contained** (componentes + hooks + utils + types).

**Beneficios:**
- ✅ Escalabilidad (agregar features sin tocar el core)
- ✅ Mantenibilidad (todo relacionado está junto)
- ✅ Testing (cada feature es testeable independientemente)
- ✅ Code splitting natural (lazy load por feature)

### **2. Atomic Design + Composition**
- **Atoms:** Elementos indivisibles (Button, Typography, Shape)
- **Molecules:** Combinación de atoms (Card, Badge)
- **Organisms:** Secciones complejas (Navigation, EventModal)
- **Templates:** Layouts reusables
- **Pages:** Instancias específicas

### **3. Separation of Concerns**
```
UI Layer (Components) ← Presentation
  ↓
Logic Layer (Hooks) ← Business Logic
  ↓
Data Layer (API Client) ← Data Fetching
  ↓
Server Layer (Edge Functions) ← Backend
```

### **4. Design Tokens First**
TODO debe derivar de tokens:
```tsx
// ❌ MAL
<div className="text-3xl text-[#FF00A8] mt-8">

// ✅ BIEN
<Heading level="h1" color="brandPink" spacing="large">
```

---

## 📂 ESTRUCTURA DE CARPETAS COMPLETA

```
/
├── app/
│   └── App.tsx                     # Entry point (solo routing + layout)
│
├── components/
│   ├── design-system/              # Sistema de diseño puro
│   │   ├── foundations/
│   │   │   ├── tokens.ts           # CSS vars → TypeScript
│   │   │   ├── zIndex.ts           # Z-index hierarchy
│   │   │   ├── safeAreas.ts        # Safe zones para layout
│   │   │   ├── breakpoints.ts      # Media queries
│   │   │   └── animations.ts       # Motion variants
│   │   │
│   │   ├── primitives/             # Atoms (componentes atómicos)
│   │   │   ├── Typography/
│   │   │   │   ├── Heading.tsx     # <Heading level="h1|h2|h3" size="sm|md|lg" />
│   │   │   │   ├── Body.tsx        # <Body size="sm|md|lg" weight="normal|bold" />
│   │   │   │   └── Label.tsx       # <Label size="xs|sm" uppercase />
│   │   │   │
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx      # <Button variant="primary|ghost|icon" size="sm|md|lg" />
│   │   │   │   └── IconButton.tsx  # <IconButton icon={X} label="Close" />
│   │   │   │
│   │   │   ├── TrapezoidShape/
│   │   │   │   ├── TrapezoidMask.tsx   # Geometría base 17°
│   │   │   │   └── TrapezoidBadge.tsx  # Badge con forma trapezoidal
│   │   │   │
│   │   │   ├── Container/
│   │   │   │   ├── Box.tsx         # <Box padding="md" bg="black" />
│   │   │   │   └── Stack.tsx       # <Stack direction="vertical" gap="md" />
│   │   │   │
│   │   │   └── Image/
│   │   │       ├── OptimizedImage.tsx  # Image con lazy loading
│   │   │       └── ImageWithFallback.tsx (ya existe)
│   │   │
│   │   └── compositions/           # Molecules (combinaciones)
│   │       ├── MediaViewer/
│   │       │   ├── MediaViewer.tsx     # Wrapper de video/image con controls
│   │       │   └── MediaControls.tsx
│   │       │
│   │       ├── ContentCard/
│   │       │   ├── ContentCard.tsx     # Card genérico con header+body+footer
│   │       │   └── ContentCardHeader.tsx
│   │       │
│   │       └── GlassPanel/
│   │           └── GlassPanel.tsx      # Panel con backdrop-blur
│   │
│   ├── features/                   # Feature modules (business logic)
│   │   ├── mosaic/
│   │   │   ├── components/
│   │   │   │   ├── Wall.tsx            # Grid principal
│   │   │   │   ├── Tile.tsx            # Tile individual
│   │   │   │   └── ParallaxController.tsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useParallax.ts      # Lógica de parallax
│   │   │   │   ├── useMosaicGrid.ts    # Grid calculations
│   │   │   │   └── useWallVirtualization.ts (ya existe)
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   └── geometry.ts         # Math de ángulos 17°
│   │   │   │
│   │   │   ├── constants.ts            # Grid size, spacing, etc.
│   │   │   ├── types.ts                # Tile types
│   │   │   └── index.ts                # Public API
│   │   │
│   │   ├── event-modal/
│   │   │   ├── components/
│   │   │   │   ├── EventModal.tsx      # Orquestador principal
│   │   │   │   │
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── ModalLayout.tsx         # Wrapper responsivo
│   │   │   │   │   ├── DesktopSplitLayout.tsx  # Layout desktop (asymmetric)
│   │   │   │   │   └── MobileStackLayout.tsx   # Layout mobile (vertical)
│   │   │   │   │
│   │   │   │   ├── sections/
│   │   │   │   │   ├── EventHeader.tsx         # Brand logo + Category badge
│   │   │   │   │   ├── EventBody.tsx           # Title + Description
│   │   │   │   │   ├── EventMeta.tsx           # Date, location, KPIs
│   │   │   │   │   └── EventVisuals.tsx        # MediaViewer + Gallery controls
│   │   │   │   │
│   │   │   │   └── animations/
│   │   │   │       └── modalVariants.ts        # Motion variants
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useScrollLock.ts            # Lock body scroll
│   │   │   │   ├── useModalState.ts            # Open/close logic
│   │   │   │   └── useFocusTrap.ts (ya existe)
│   │   │   │
│   │   │   ├── constants.ts                    # Safe areas, breakpoints
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── navigation/
│   │   │   ├── components/
│   │   │   │   ├── Controls.tsx                # Main navigation button
│   │   │   │   ├── CategoryMenu.tsx            # Dropdown menu
│   │   │   │   └── CategoryFilter.tsx          # Active filter indicator
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useCategoryFilter.ts        # Filter logic
│   │   │   │   └── useMenuState.ts             # Open/close menu
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── admin-panel/
│   │   │   ├── components/
│   │   │   │   ├── AdminPanel.tsx              # Main panel
│   │   │   │   ├── EventEditor/
│   │   │   │   │   ├── EventEditor.tsx
│   │   │   │   │   ├── FieldsEditor.tsx
│   │   │   │   │   ├── MediaUploader.tsx
│   │   │   │   │   └── AIOptimizer.tsx
│   │   │   │   │
│   │   │   │   └── EventList/
│   │   │   │       ├── EventListView.tsx
│   │   │   │       ├── EventBarCard.tsx
│   │   │   │       └── EventEditorCard.tsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useAdminAI.ts (ya existe)
│   │   │   │   ├── useAdminEvents.ts (ya existe)
│   │   │   │   └── useEventValidation.ts (ya existe)
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── client.ts                   # Admin API calls
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   └── seo/
│   │       ├── components/
│   │       │   ├── MetaTags.tsx                # Centraliza Helmet tags
│   │       │   ├── SchemaJSONLD.tsx (ya existe)
│   │       │   ├── BreadcrumbSchema.tsx        # NUEVO
│   │       │   ├── ArticleSchema.tsx           # NUEVO
│   │       │   └── VideoObjectSchema.tsx       # NUEVO
│   │       │
│   │       ├── utils/
│   │       │   ├── generateSchema.ts           # Schema.org builders
│   │       │   └── generateMetaTags.ts         # Meta tag builders
│   │       │
│   │       └── index.ts
│   │
│   └── ui/                         # shadcn/ui components (mantener)
│       └── ... (componentes actuales)
│
├── hooks/                          # Global hooks
│   ├── useMediaQuery.ts
│   ├── useKeyboard.ts
│   └── useScrollPosition.ts
│
├── lib/                            # Core utilities & config
│   ├── constants/
│   │   ├── tokens.ts               # Design tokens
│   │   ├── zIndex.ts               # Z-index system
│   │   ├── safeAreas.ts            # Layout safe areas
│   │   ├── breakpoints.ts          # Responsive breakpoints
│   │   └── routes.ts               # App routes
│   │
│   ├── utils/
│   │   ├── cn.ts                   # clsx + tailwind-merge
│   │   ├── slugify.ts              # URL slug generation
│   │   ├── formatters.ts           # Date, number formatters
│   │   └── validators.ts           # Input validation
│   │
│   ├── api/
│   │   ├── client.ts               # Axios/Fetch wrapper
│   │   ├── endpoints.ts            # API endpoints
│   │   └── types.ts                # API types
│   │
│   └── supabase/
│       ├── client.ts (ya existe)
│       └── storage.ts              # Storage helpers
│
├── styles/
│   ├── globals.css                 # Solo tokens + reset
│   └── animations.css              # CSS animations
│
├── types/
│   └── index.ts                    # Global types
│
├── utils/                          # Legacy utils (migrar a /lib)
│   └── ... (mantener temporalmente)
│
└── supabase/
    └── functions/
        └── server/
            ├── index.tsx
            ├── ai.ts
            ├── categories.ts
            └── ...
```

---

## 🎨 DESIGN SYSTEM: TOKENS

### **Archivo: `/lib/constants/tokens.ts`**

```typescript
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
    
    // Fluid sizes (usar con clamp)
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
      global: [0.19, 1, 0.22, 1],
      // Cubic Out (alternativa)
      smooth: [0.33, 1, 0.68, 1],
      // Linear (evitar en UI)
      linear: [0, 0, 1, 1],
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
```

---

## 🗂️ SISTEMA DE Z-INDEX

### **Archivo: `/lib/constants/zIndex.ts`**

```typescript
/**
 * WAV BTL Z-Index System
 * 
 * Jerarquía basada en Guidelines.md §5.2
 * 
 * Regla: NUNCA usar z-index hardcodeado en componentes.
 * Siempre importar de aquí.
 */

export const Z_INDEX = {
  // Base
  MOSAIC: 'z-0',
  
  // Middle layers
  TEXT_ROTATOR: 'z-10',
  CATEGORY_BADGE: 'z-20',
  
  // Overlays
  MODAL_BACKDROP: 'z-40',
  BLUR_OVERLAY: 'z-40',
  
  // Modal
  MODAL_CONTENT: 'z-50',
  
  // Navigation
  CONTROLS: 'z-55',
  MENU_DROPDOWN: 'z-55',
  CLOSE_BUTTON: 'z-55',
  
  // System
  LOADER: 'z-100',
  TOAST: 'z-100',
} as const;

// Numeric values (para Motion z prop)
export const Z_INDEX_NUMERIC = {
  MOSAIC: 0,
  TEXT_ROTATOR: 10,
  CATEGORY_BADGE: 20,
  MODAL_BACKDROP: 40,
  BLUR_OVERLAY: 40,
  MODAL_CONTENT: 50,
  CONTROLS: 55,
  MENU_DROPDOWN: 55,
  CLOSE_BUTTON: 55,
  LOADER: 100,
  TOAST: 100,
} as const;

export type ZIndexToken = keyof typeof Z_INDEX;
```

---

## 📏 SAFE AREAS

### **Archivo: `/lib/constants/safeAreas.ts`**

```typescript
/**
 * WAV BTL Safe Areas
 * 
 * Espacios seguros para contenido que no debe ser tapado por botones flotantes.
 * 
 * Problema resuelto:
 * - Modal title no choca con close button
 * - Modal description no se corta con navigation
 * - Badge no queda fuera del clip-path
 */

export const SAFE_AREAS = {
  // Top safe area (para evitar chocar con badges/close buttons)
  top: {
    mobile: 'pt-16',        // 64px (badge height + margin)
    tablet: 'pt-14',        // 56px
    desktop: 'pt-12',       // 48px
  },
  
  // Bottom safe area (para evitar que text se corte con navigation)
  bottom: {
    mobile: 'pb-32',        // 128px (botones + margen + scroll indicator)
    tablet: 'pb-28',        // 112px
    desktop: 'pb-24',       // 96px
  },
  
  // Horizontal safe area (para clip-path trapezoidal)
  horizontal: {
    mobile: 'px-4',         // 16px
    tablet: 'px-6',         // 24px
    desktop: 'px-10',       // 40px
  },
} as const;

// Helper para combinar safe areas
export const combineSafeAreas = (areas: Array<keyof typeof SAFE_AREAS>) => {
  return areas.map(area => SAFE_AREAS[area]).join(' ');
};

// Ejemplo de uso:
// <div className={clsx(
//   SAFE_AREAS.top.mobile,
//   'md:' + SAFE_AREAS.top.desktop,
//   SAFE_AREAS.bottom.mobile,
//   'md:' + SAFE_AREAS.bottom.desktop
// )} />
```

---

## 🎬 MOTION VARIANTS

### **Archivo: `/lib/constants/animations.ts`**

```typescript
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
```

---

## 🧩 EJEMPLO: COMPONENTE PRIMITIVO

### **Archivo: `/components/design-system/primitives/Typography/Heading.tsx`**

```tsx
import React from 'react';
import { clsx } from 'clsx';
import { TOKENS } from '@/lib/constants/tokens';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type HeadingColor = 'white' | 'gray' | 'brandPink' | 'brandPurple';

interface HeadingProps {
  level: HeadingLevel;
  size?: HeadingSize;
  color?: HeadingColor;
  weight?: 'normal' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
  uppercase?: boolean;
  tracking?: 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  balance?: boolean; // text-balance para evitar widows
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  size,
  color = 'white',
  weight = 'extrabold',
  align = 'left',
  uppercase = false,
  tracking = 'tight',
  balance = true,
  className,
  children,
}) => {
  const Component = level;
  
  // Default size basado en level
  const defaultSize: Record<HeadingLevel, HeadingSize> = {
    h1: '5xl',
    h2: '4xl',
    h3: '3xl',
    h4: '2xl',
    h5: 'xl',
    h6: 'lg',
  };
  
  const finalSize = size || defaultSize[level];
  
  const colorClasses: Record<HeadingColor, string> = {
    white: 'text-white',
    gray: 'text-neutral-300',
    brandPink: 'text-[var(--wav-brand-pink)]',
    brandPurple: 'text-[var(--wav-brand-purple)]',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const trackingClasses = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  };
  
  return (
    <Component
      className={clsx(
        // Base styles
        'leading-[1.1]', // Tight line-height según Guidelines
        
        // Dynamic styles
        colorClasses[color],
        weightClasses[weight],
        alignClasses[align],
        trackingClasses[tracking],
        
        // Options
        uppercase && 'uppercase',
        balance && 'text-balance',
        
        // Custom className
        className
      )}
      style={{
        fontSize: TOKENS.typography.fontSize[finalSize],
      }}
    >
      {children}
    </Component>
  );
};
```

**Uso:**
```tsx
<Heading level="h1" size="4xl" color="white" tracking="tight" balance>
  Activación Nike Run Club 2024
</Heading>
```

---

## 🧩 EJEMPLO: LAYOUT COMPONENT

### **Archivo: `/components/features/event-modal/components/layouts/DesktopSplitLayout.tsx`**

```tsx
import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { MOTION_VARIANTS } from '@/lib/constants/animations';
import { SAFE_AREAS } from '@/lib/constants/safeAreas';

interface DesktopSplitLayoutProps {
  visualContent: React.ReactNode;
  textContent: React.ReactNode;
  className?: string;
}

/**
 * Desktop Split Layout (>1024px)
 * 
 * Guidelines.md §3.1:
 * "Desktop (>1024px): Asymmetric Split.
 *  Left (Visuals): Sticky, Full Height, Trapezoidal Cut.
 *  Right (Content): Scrollable, Clean Typography."
 */
export const DesktopSplitLayout: React.FC<DesktopSplitLayoutProps> = ({
  visualContent,
  textContent,
  className,
}) => {
  return (
    <div className={clsx(
      'hidden lg:flex',           // Desktop only
      'w-full max-w-7xl',
      'h-[85vh]',                 // Max height con margen
      className
    )}>
      {/* LEFT: Visuals (Sticky) */}
      <motion.div
        className={clsx(
          'w-7/12',                // 58% del ancho
          'h-full',
          'sticky top-0',          // Sticky behavior
          'overflow-hidden',
          SAFE_AREAS.horizontal.desktop
        )}
        variants={MOTION_VARIANTS.fade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {visualContent}
      </motion.div>
      
      {/* RIGHT: Content (Scrollable) */}
      <motion.div
        className={clsx(
          'w-5/12',                // 42% del ancho
          'h-full',
          'overflow-y-auto',       // Scrollable content
          'custom-scrollbar',      // Custom scrollbar styles
          SAFE_AREAS.top.desktop,
          SAFE_AREAS.bottom.desktop,
          'pl-0 pr-10'             // Padding asimétrico
        )}
        variants={MOTION_VARIANTS.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {textContent}
      </motion.div>
    </div>
  );
};
```

---

## 🚀 MIGRACIÓN PASO A PASO

### **Paso 1: Crear Fundaciones (Sin romper nada)**

```bash
# Crear estructura
mkdir -p lib/constants
mkdir -p components/design-system/foundations
mkdir -p components/design-system/primitives/Typography
mkdir -p components/design-system/primitives/Button
mkdir -p components/design-system/primitives/TrapezoidShape

# Crear archivos
touch lib/constants/tokens.ts
touch lib/constants/zIndex.ts
touch lib/constants/safeAreas.ts
touch lib/constants/animations.ts
```

### **Paso 2: Fix Modal (Usando nuevas constantes)**

```tsx
// Modal.tsx (versión refactorizada)
import { SAFE_AREAS } from '@/lib/constants/safeAreas';
import { Z_INDEX } from '@/lib/constants/zIndex';
import { MOTION_VARIANTS } from '@/lib/constants/animations';

export const Modal: React.FC<ModalProps> = ({ event, onClose, isMobile }) => {
  return (
    <motion.div className={clsx("fixed inset-0", Z_INDEX.MODAL_CONTENT)}>
      {/* Backdrop */}
      <motion.div 
        className={Z_INDEX.MODAL_BACKDROP}
        variants={MOTION_VARIANTS.fade}
      />
      
      {/* Content with safe areas */}
      <div className={clsx(
        SAFE_AREAS.top.mobile,
        'md:' + SAFE_AREAS.top.desktop,
        SAFE_AREAS.bottom.mobile,
        'md:' + SAFE_AREAS.bottom.desktop
      )}>
        {/* Content here */}
      </div>
    </motion.div>
  );
};
```

### **Paso 3: Crear Primitivos (Uno por uno)**

```tsx
// Orden recomendado:
1. Typography/Heading.tsx
2. Typography/Body.tsx
3. Button/Button.tsx
4. TrapezoidShape/TrapezoidMask.tsx
5. Container/Box.tsx
```

### **Paso 4: Migrar Features (Incremental)**

```tsx
// No reemplazar, crear versión nueva:
components/wav/Modal.tsx             → mantener
components/features/event-modal/     → crear nueva versión

// Feature flag para A/B testing:
const useNewModal = process.env.NEXT_PUBLIC_USE_NEW_MODAL === 'true';

{useNewModal ? <EventModal /> : <Modal />}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Fase 0: Stabilización (2 días)**
- [ ] Crear `/lib/constants/tokens.ts`
- [ ] Crear `/lib/constants/zIndex.ts`
- [ ] Crear `/lib/constants/safeAreas.ts`
- [ ] Crear `/lib/constants/animations.ts`
- [ ] Actualizar `Modal.tsx` para usar constantes
- [ ] Actualizar `Controls.tsx` para usar z-index correcto
- [ ] Testing manual en mobile + desktop

### **Fase 1: Primitivos (1 semana)**
- [ ] `Typography/Heading.tsx`
- [ ] `Typography/Body.tsx`
- [ ] `Button/Button.tsx`
- [ ] `TrapezoidShape/TrapezoidMask.tsx`
- [ ] `TrapezoidShape/TrapezoidBadge.tsx` (migrar existente)
- [ ] Tests unitarios

### **Fase 2: Feature Modules (2 semanas)**
- [ ] `/features/event-modal/` (completo)
- [ ] `/features/navigation/` (refactor Controls)
- [ ] `/features/seo/` (schemas nuevos)
- [ ] Testing E2E

### **Fase 3: Optimización (1 semana)**
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle optimization
- [ ] Performance testing

---

## 📊 MÉTRICAS DE ÉXITO

| Métrica | Antes | Después | Método |
|---------|-------|---------|--------|
| Lines of code (Modal) | 234 | ~150 | cloc |
| Components reusabilidad | 30% | 80% | Manual audit |
| Bundle size | 800KB | <500KB | webpack-bundle-analyzer |
| Type safety | 70% | 95% | TypeScript strict |
| Lighthouse | 75 | 95+ | Lighthouse CI |

---

**Fin de Arquitectura Propuesta**  
Siguiente: Plan de Implementación Detallado
