# 🎬 Modal Animations - Quick Reference

## 🎯 CONFIGURACIÓN RÁPIDA

### Constantes de Animación
```typescript
const DURATION = 0.4; // 400ms máximo
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Expo Out
```

---

## 📐 GEOMETRÍA (CSS)

### Modal Desktop - Diagonales Paralelas
```css
.clip-modal-desktop {
  clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
}
```

### Media Gallery - Máscara Diagonal
```css
.clip-media-gallery {
  clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
}
```

---

## 🎬 VARIANTS DE ANIMACIÓN

### 1. Backdrop (Simple Fade)
```typescript
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE } }
};
```

### 2. Modal Container (Fade + Scale + Slide)
```typescript
const modalContainerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.06
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    y: 20,
    transition: { 
      duration: 0.4, 
      ease: EASE,
      staggerChildren: 0.04,
      staggerDirection: -1
    } 
  }
};
```

### 3. Media Gallery (Slide + Zoom In)
```typescript
const mediaGalleryVariants = {
  hidden: { x: '30%', opacity: 0, scale: 1.15 },
  visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { x: '30%', opacity: 0, scale: 1.15, transition: { duration: 0.4, ease: EASE } }
};
```

### 4. Content Elements (Slide from Left)
```typescript
const slideFromLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } },
  exit: { x: -30, opacity: 0, transition: { duration: 0.3, ease: EASE } }
};
```

### 5. Close Button (Rotate + Scale)
```typescript
const closeButtonVariants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.8 },
  visible: { 
    rotate: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: EASE, delay: 0.15 }
  },
  exit: { rotate: 90, opacity: 0, scale: 0.8, transition: { duration: 0.35, ease: EASE } }
};
```

---

## 🎯 USO EN COMPONENTES

### Modal Container
```tsx
<motion.div
  variants={modalContainerVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  className={clsx(
    "relative w-full bg-black",
    !isMobile && "clip-modal-desktop" // Solo desktop
  )}
>
```

### Media Gallery
```tsx
<motion.div 
  variants={mediaGalleryVariants}
  className={clsx(
    isMobile ? "clip-trapezoid-mobile" : "lg:clip-media-gallery"
  )}
>
```

### Content Elements (con stagger automático)
```tsx
{/* Category Badge */}
<motion.div variants={slideFromLeft}>
  <TrapezoidBadge label={event.category} />
</motion.div>

{/* Brand/Logo */}
<motion.div variants={slideFromLeft}>
  <img src={event.logo} />
</motion.div>

{/* Title */}
<motion.h1 variants={slideFromLeft}>
  {event.title}
</motion.h1>

{/* Description */}
<motion.div variants={slideFromLeft}>
  <p>{event.description}</p>
</motion.div>
```

### Close Button
```tsx
<motion.button
  onClick={onClose}
  variants={closeButtonVariants}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <X size={20} />
</motion.button>
```

---

## 📊 TIMELINE VISUAL

```
0ms  ═══════════════════════════════════════════════
     │
     ├─ BACKDROP (250ms)
     │  └─ opacity: 0 → 1
     │
     ├─ MODAL CONTAINER (400ms)
     │  ├─ opacity: 0 → 1
     │  ├─ scale: 0.96 → 1
     │  └─ y: 20 → 0
     │
60ms ├─ MEDIA GALLERY (400ms) [stagger: 0ms]
     │  ├─ x: 30% → 0 (derecha a izquierda)
     │  ├─ opacity: 0 → 1
     │  └─ scale: 1.15 → 1 (zoom in)
     │
120ms├─ CATEGORY (350ms) [stagger: +60ms]
     │  ├─ x: -30 → 0
     │  └─ opacity: 0 → 1
     │
180ms├─ BRAND (350ms) [stagger: +120ms]
     │  ├─ x: -30 → 0
     │  └─ opacity: 0 → 1
     │
240ms├─ TITLE (350ms) [stagger: +180ms]
     │  ├─ x: -30 → 0
     │  └─ opacity: 0 → 1
     │
300ms├─ DESCRIPTION (350ms) [stagger: +240ms]
     │  ├─ x: -30 → 0
     │  └─ opacity: 0 → 1
     │
360ms├─ METADATA (350ms) [stagger: +300ms]
     │  ├─ x: -30 → 0
     │  └─ opacity: 0 → 1
     │
150ms├─ CLOSE BUTTON (400ms) [delay: 150ms]
     │  ├─ rotate: -90 → 0
     │  ├─ opacity: 0 → 1
     │  └─ scale: 0.8 → 1
     │
600ms═══════════════════════════════════════════════
     ✅ ANIMACIÓN COMPLETA
```

---

## 🎨 LAYOUT (Desktop)

```
┌────────────────────────────────────────────────────────┐
│  ╱                                                  ╲   │
│ ╱  MEDIA GALLERY (45%)     │  CONTENT (55%)        ╲  │
│╱                            │                        ╲ │
││  [Photo/Video]             │  [X] ← Rotate 90°      ││
││                            │                        ││
││  clip-media-gallery        │  [Category] ←─┐       ││
││  (20% → 80%)               │               │       ││
││                            │  [Brand]   ←──┤       ││
││  Zoom: 1.08 → 1.0          │               │       ││
││  Slide: 30% → 0            │  [Title]   ←──┤ Slide ││
││                            │               │ Left  ││
││                            │  [Text]    ←──┤       ││
││                            │               │       ││
││                            │  [Metadata]←──┘       ││
│╲                            │  pl-16 (diagonal)     ╱│
│ ╲                           │                      ╱ │
│  ╲                                                ╱  │
└────────────────────────────────────────────────────────┘
   clip-modal-desktop (18% → 82%)
```

---

## ⚡ PERFORMANCE TIPS

### ✅ DO
- Use `transform` (GPU-accelerated)
- Use `opacity` (GPU-accelerated)
- Keep clip-path static (no animations)
- Use `will-change` sparingly (Motion handles it)

### ❌ DON'T
- Animate `width`, `height`, `top`, `left`
- Multiple `backdrop-blur` layers
- Animate `box-shadow`
- Use `filter` on large containers

---

## 🔍 DEBUGGING

### Ver Stagger en DevTools
```tsx
// Aumentar temporalmente para debugging
staggerChildren: 0.15 // (en vez de 0.06)
```

### Desactivar Animaciones (Testing)
```tsx
// En variants, cambiar durations a 0
transition: { duration: 0 }
```

### Verificar GPU Acceleration
```
Chrome DevTools → Performance → Record
Buscar: "Composite Layers" (verde = GPU)
```

---

## 📱 MOBILE (Pendiente)

```typescript
// TODO: Implementar para mobile
const mobileModalVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.3, ease: EASE } }
};
```

---

## 🎓 RECURSOS

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Apple Human Interface Guidelines - Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Cubic Bezier Generator](https://cubic-bezier.com/#.16,1,.3,1)

---

**Last Updated:** 10 Dec 2024  
**Version:** 2.0 Desktop
