# WAV BTL - Design Constants

## 📋 Uso Rápido

### Importar Constantes

```tsx
import { Z_INDEX, SAFE_AREAS, MOTION_VARIANTS, TOKENS } from '@/lib/constants';
```

O importar específicas:

```tsx
import { Z_INDEX } from '@/lib/constants/zIndex';
import { SAFE_AREAS } from '@/lib/constants/safeAreas';
```

---

## 🗂️ Z-INDEX

**Problema resuelto:** Jerarquía consistente de capas visuales.

```tsx
import { Z_INDEX } from '@/lib/constants';

// ✅ CORRECTO
<div className={Z_INDEX.MODAL_CONTENT}>

// ❌ INCORRECTO (nunca hardcodear)
<div className="z-50">
```

**Jerarquía disponible:**
- `Z_INDEX.MOSAIC` → z-0
- `Z_INDEX.TEXT_ROTATOR` → z-10
- `Z_INDEX.CATEGORY_BADGE` → z-20
- `Z_INDEX.MODAL_BACKDROP` → z-40
- `Z_INDEX.MODAL_CONTENT` → z-50
- `Z_INDEX.CONTROLS` → z-55 ⚠️ **Corregido de z-60**
- `Z_INDEX.LOADER` → z-100

---

## 📐 SAFE AREAS

**Problema resuelto:** Contenido no se tapa con botones flotantes.

```tsx
import { SAFE_AREAS } from '@/lib/constants';

// ✅ CORRECTO - Las clases ya incluyen responsive variants
<div className={SAFE_AREAS.top}>
  {/* Content aquí no choca con header/badges */}
</div>

<div className={SAFE_AREAS.bottom}>
  {/* Content aquí no se corta con navigation */}
</div>

// Combinar multiple areas
<div className={clsx(SAFE_AREAS.topBottom, 'flex flex-col')}>
  {/* Safe top AND bottom */}
</div>
```

**Valores disponibles:**
- `SAFE_AREAS.top` → `pt-16 md:pt-14 lg:pt-12`
- `SAFE_AREAS.bottom` → `pb-32 md:pb-28 lg:pb-24`
- `SAFE_AREAS.horizontal` → `px-4 md:px-6 lg:px-10`
- `SAFE_AREAS.topBottom` → Combina top + bottom
- `SAFE_AREAS.all` → Combina top + bottom + horizontal

---

## 🎬 MOTION VARIANTS

**Problema resuelto:** Animaciones inconsistentes.

```tsx
import { MOTION_VARIANTS } from '@/lib/constants';

// ✅ CORRECTO
<motion.div
  variants={MOTION_VARIANTS.fade}
  initial="hidden"
  animate="visible"
  exit="exit"
>

// ❌ INCORRECTO (no hardcodear animaciones)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

**Variants disponibles:**
- `MOTION_VARIANTS.fade` → Fade in/out
- `MOTION_VARIANTS.slideUp` → Slide from bottom
- `MOTION_VARIANTS.slideDown` → Slide from top
- `MOTION_VARIANTS.scale` → Scale in/out
- `MOTION_VARIANTS.clipTrapezoid` → Trapezoidal reveal
- `MOTION_VARIANTS.stagger` → Para listas con delay

---

## 🎨 TOKENS

**Problema resuelto:** Design system sin single source of truth.

```tsx
import { TOKENS } from '@/lib/constants';

// Colores
const myStyle = {
  color: TOKENS.colors.brandPink,
  backgroundColor: TOKENS.colors.neutralBlack,
};

// Motion
<motion.div
  transition={{
    duration: TOKENS.motion.duration.medium,
    ease: TOKENS.motion.easing.global,
  }}
/>

// Geometry
<div style={{ clipPath: TOKENS.geometry.clipPath.trapezoid }} />
```

---

## 📝 Ejemplo Completo

```tsx
import React from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { Z_INDEX, SAFE_AREAS, MOTION_VARIANTS } from '@/lib/constants';

export const MyModal = ({ onClose }) => {
  return (
    <motion.div
      className={clsx(
        "fixed inset-0 flex items-center justify-center",
        Z_INDEX.MODAL_CONTENT
      )}
      variants={MOTION_VARIANTS.fade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className={clsx(
          "absolute inset-0 bg-black/65 backdrop-blur-xl",
          Z_INDEX.MODAL_BACKDROP
        )}
        onClick={onClose}
      />
      
      {/* Content con safe areas */}
      <div className={clsx(
        "relative p-6",
        SAFE_AREAS.top.mobile,
        'md:' + SAFE_AREAS.top.desktop,
        SAFE_AREAS.bottom.mobile,
        'md:' + SAFE_AREAS.bottom.desktop
      )}>
        <h1>Mi Modal</h1>
        <p>Contenido que no se tapará con botones</p>
      </div>
    </motion.div>
  );
};
```

---

## ⚠️ REGLAS IMPORTANTES

1. **NUNCA hardcodear z-index** → Siempre usar `Z_INDEX`
2. **NUNCA hardcodear animaciones** → Siempre usar `MOTION_VARIANTS`
3. **SIEMPRE usar safe areas en modals/overlays** → Evita overlaps
4. **Importar desde `/lib/constants`** → No desde archivos individuales

---

## 🔧 Troubleshooting

**Problema:** "Cannot find module '@/lib/constants'"
**Solución:** Usar path relativo: `import { Z_INDEX } from '../../lib/constants'`

**Problema:** Safe areas no funcionan en mobile
**Solución:** Asegurarse de incluir las 3 variantes (mobile, tablet, desktop) con prefijos `md:` y `lg:`

**Problema:** Animaciones no se ven suaves
**Solución:** Verificar que estés usando `MOTION_VARIANTS` en lugar de variants custom
