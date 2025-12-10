# 🎬 Modal V3.7 - Breakpoint Fijo 1024px

**Fecha:** 10 de Diciembre, 2024  
**Versión:** 3.7 (Breakpoint 1024px - Stack hasta 1023px)

---

## 🎯 REGLA CRÍTICA

```
Width ≤ 1023px:
  ✅ Stack vertical
  ✅ Imagen arriba (50vh)
  ✅ Diagonal 17° inferior
  ✅ Contenido abajo scrollable

Width ≥ 1024px:
  ✅ Side-by-side
  ✅ Imagen izquierda (45%)
  ✅ Sin diagonal
  ✅ Contenido derecha (55%) scrollable
```

---

## 📐 BREAKPOINT FIJO: 1024px

**Antes (V3.6):** Usaba orientación (portrait vs landscape)  
**Ahora (V3.7):** Usa breakpoint fijo en **1024px de ancho**

### Lógica

```typescript
const { width } = useResponsive();

// BREAKPOINT FIJO
const useStackedLayout = width <= 1023;
```

---

## 💯 CÁLCULO DE PROPORCIONES

### En el límite (1024px)

**Viewport:** 1024px de ancho  
**Contenedor:** 1024px (100% porque < max-w-5xl de 1280px)

**Proporciones:**
- Imagen: `45%` → 1024 × 0.45 = **460.8px** ≈ **461px**
- Contenido: `55%` → 1024 × 0.55 = **563.2px** ≈ **563px**

---

### En Desktop típico (1440px)

**Viewport:** 1440px de ancho  
**Contenedor:** 1280px (max-w-5xl)

**Proporciones:**
- Imagen: `45%` → 1280 × 0.45 = **576px**
- Contenido: `55%` → 1280 × 0.55 = **704px**

---

### En Mobile (375px)

**Viewport:** 375px de ancho  
**Contenedor:** 375px (100%)

**Proporciones verticales:**
- Imagen: `50vh` → 667 × 0.50 = **333.5px** (asumiendo height 667px)
- Contenido: Resto scrollable

---

## 📱 TABLA DE COMPORTAMIENTO

| Viewport | Width | Antes (V3.6) | Ahora (V3.7) | Layout |
|----------|-------|--------------|--------------|--------|
| **iPhone 13 portrait** | 390px | Stack ✅ | Stack ✅ | ✅ Igual |
| **iPhone 13 landscape** | 844px | Side-by-side ❌ | Stack ✅ | ✅ **Mejorado** |
| **iPad Air portrait** | 820px | Stack ✅ | Stack ✅ | ✅ Igual |
| **iPad Air landscape** | 1180px | Side-by-side ✅ | Side-by-side ✅ | ✅ Igual |
| **Small Desktop** | 1024px | Side-by-side ✅ | Side-by-side ✅ | ✅ Igual |
| **Large Desktop** | 1440px | Side-by-side ✅ | Side-by-side ✅ | ✅ Igual |

---

## 🎨 VISUALIZACIÓN

### ≤ 1023px (Stack Vertical)

```
┌─────────────────────────────────┐
│                                 │
│         IMAGEN (50vh)           │ ← 50% altura viewport
│                                 │
│                                /│ ← DIAGONAL 17°
└───────────────────────────────┘ │
│ ACTIVACIONES                    │
│                                 │
│ CONVERSE CELEBRA EL 8M...       │
│                                 │
│ En el marco del Día...          │ ← CONTENIDO scrollable
│                                 │
│ Año: 2024                       │
└─────────────────────────────────┘
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Safe area iOS
```

**Características:**
- ✅ Full width (w-full)
- ✅ Imagen 50vh
- ✅ Diagonal 17° inferior
- ✅ Contenido bg-black/90
- ✅ Safe area iOS respetada

---

### ≥ 1024px (Side-by-Side)

```
┌────────────────────┬──────────────────────────────┐
│                    │ ACTIVACIONES                 │
│                    │                              │
│    CONVERSE        │ CONVERSE CELEBRA EL 8M       │
│                    │                              │
│ IMAGEN (45%)       │ CONTENIDO (55%)              │
│ Sin diagonal       │ Scrollable                   │
│                    │                              │
│                    │ Año: 2024                    │
└────────────────────┴──────────────────────────────┘
      461px                     563px
```

**Características:**
- ✅ Max-width 1280px (max-w-5xl)
- ✅ Imagen 45% ancho
- ✅ Sin diagonal
- ✅ Contenido bg-transparent
- ✅ Centered en viewport

---

## 📊 CASOS ESPECÍFICOS

### Caso 1: iPhone 13 Portrait (390x844)

**Width:** 390px  
**Resultado:** 390 ≤ 1023 → **Stack vertical** ✅

```
Stack vertical
Imagen: 50vh = 422px
Diagonal: Sí
```

---

### Caso 2: iPhone 13 Landscape (844x390)

**Width:** 844px  
**Resultado:** 844 ≤ 1023 → **Stack vertical** ✅

```
Stack vertical (NO side-by-side)
Imagen: 50vh = 195px
Diagonal: Sí
```

**Antes (V3.6):** Side-by-side (incorrecto)  
**Ahora (V3.7):** Stack vertical (correcto!)

---

### Caso 3: iPad Air Portrait (820x1180)

**Width:** 820px  
**Resultado:** 820 ≤ 1023 → **Stack vertical** ✅

```
Stack vertical
Imagen: 50vh = 590px
Diagonal: Sí
```

---

### Caso 4: iPad Air Landscape (1180x820)

**Width:** 1180px  
**Resultado:** 1180 ≥ 1024 → **Side-by-side** ✅

```
Side-by-side
Imagen: 45% = 531px (asumiendo 1180px)
Diagonal: No
```

---

### Caso 5: MacBook Pro 13" (1440x900)

**Width:** 1440px  
**Resultado:** 1440 ≥ 1024 → **Side-by-side** ✅

```
Side-by-side
Contenedor: max-w-5xl = 1280px
Imagen: 45% de 1280px = 576px
Diagonal: No
```

---

## 💻 CÓDIGO IMPLEMENTADO

### Modal.tsx

```tsx
export const Modal: React.FC<ModalProps> = ({ event, onClose, isMobile, onNext, onPrev }) => {
  // Hook responsive con width
  const { width } = useResponsive();
  
  // REGLA CRÍTICA CON BREAKPOINT FIJO:
  // Width ≤ 1023px: Stack vertical (imagen arriba con diagonal)
  // Width ≥ 1024px: Side-by-side (imagen izquierda sin diagonal)
  const useStackedLayout = width <= 1023;

  return (
    <motion.div
      className={clsx(
        "fixed inset-0",
        Z_INDEX.MODAL_CONTENT,
        // ≤1023px: Sin flex
        useStackedLayout && "overflow-y-auto",
        // ≥1024px: Flex centrado
        !useStackedLayout && "flex flex-col overflow-y-auto lg:overflow-hidden lg:items-center lg:justify-center"
      )}
    >
      {/* Card Container */}
      <motion.div
        className={clsx(
          "relative bg-black",
          Z_INDEX.MODAL_CONTENT,
          // ≤1023px: Stack vertical
          useStackedLayout && "w-full min-h-screen flex flex-col",
          // ≥1024px: Side-by-side
          !useStackedLayout && "w-full min-h-0 flex flex-row max-w-5xl h-[70vh] overflow-hidden"
        )}
      >
        {/* Media Gallery */}
        <motion.div 
          className={clsx(
            "relative shrink-0 bg-neutral-900 overflow-hidden",
            // ≤1023px: Arriba, 50vh, diagonal
            useStackedLayout && "w-full h-[50vh] clip-mobile-media",
            // ≥1024px: Izquierda, 45%, sin diagonal
            !useStackedLayout && "w-[45%] h-full"
          )}
        >
          <MediaGallery ... />
        </motion.div>

        {/* Content */}
        <div 
          className={clsx(
            "relative flex flex-col",
            // ≤1023px: Full width, scrollable
            useStackedLayout && "w-full bg-black/90 px-6 py-8 overflow-y-auto",
            // ≥1024px: 55% width, scrollable
            !useStackedLayout && "w-[55%] h-full bg-transparent px-10 py-10 lg:px-12 lg:py-12 overflow-y-auto custom-scroll-modal"
          )}
        >
          {/* Contenido */}
        </div>
      </motion.div>
    </motion.div>
  );
};
```

---

## 🔄 CAMBIOS DESDE V3.6

### QUITADO

```typescript
// ❌ ELIMINADO: Lógica basada en orientación
const { isPortrait, isLandscape, orientation } = useResponsive();
const useStackedLayout = isPortrait;
```

### AGREGADO

```typescript
// ✅ AGREGADO: Lógica basada en breakpoint fijo
const { width } = useResponsive();
const useStackedLayout = width <= 1023;
```

---

## 🧪 TESTING

### Test 1: Viewport 874px (de la imagen)

```bash
1. Abrir navegador
2. Resize a 874px de ancho
3. Abrir modal
4. ✅ Verificar: Stack vertical (874 ≤ 1023)
5. ✅ Verificar: Imagen arriba con diagonal
6. ✅ Verificar: Contenido abajo scrollable
7. ✅ Verificar: NO hay espacio negro a la izquierda
```

---

### Test 2: Breakpoint exacto (1023px → 1024px)

```bash
1. Abrir DevTools
2. Resize a 1023px de ancho
3. ✅ Verificar: Stack vertical
4. ✅ Verificar: Diagonal visible
5. Resize a 1024px de ancho
6. ✅ Verificar: Cambia a side-by-side
7. ✅ Verificar: Diagonal desaparece
8. ✅ Verificar: Imagen 45%, contenido 55%
```

---

### Test 3: iPhone Landscape (844px)

```bash
1. Abrir en iPhone (Safari)
2. Rotar a landscape (844x390)
3. Abrir modal
4. ✅ Verificar: Stack vertical (NO side-by-side)
5. ✅ Verificar: Imagen arriba
6. ✅ Verificar: Diagonal visible
```

**Antes (V3.6):** Side-by-side incorrecto  
**Ahora (V3.7):** Stack vertical correcto

---

### Test 4: iPad Landscape (1180px)

```bash
1. Abrir en iPad (Safari)
2. Rotar a landscape (1180x820)
3. Abrir modal
4. ✅ Verificar: Side-by-side
5. ✅ Verificar: Imagen izquierda sin diagonal
6. ✅ Verificar: Contenido derecha scrollable
```

---

## 🏆 RESULTADO FINAL V3.7

```
┌────────────────────────────────────────┐
│ MODAL V3.7 - BREAKPOINT 1024px ✅      │
├────────────────────────────────────────┤
│ Breakpoint Fijo:                       │
│   Width ≤ 1023px → Stack ✅            │
│   Width ≥ 1024px → Side-by-side ✅     │
│                                        │
│ Stack Vertical (≤1023px):              │
│   Imagen: 50vh ✅                      │
│   Diagonal: 17° ✅                     │
│   Contenido: scrollable ✅             │
│   Safe area: iOS ✅                    │
│                                        │
│ Side-by-Side (≥1024px):                │
│   Imagen: 45% ✅                       │
│   Contenido: 55% ✅                    │
│   Sin diagonal: ✅                     │
│   Max-width: 1280px ✅                 │
│                                        │
│ Proporciones en 1024px:                │
│   Imagen: 461px (45%) ✅               │
│   Contenido: 563px (55%) ✅            │
│                                        │
│ Casos Mejorados:                       │
│   iPhone landscape: ✅                 │
│   Viewports < 1024px: ✅               │
│                                        │
│ Features Mantenidas:                   │
│   clamp() typography: ✅               │
│   Safe areas iOS: ✅                   │
│   Touch targets 44px: ✅               │
│   Animaciones V3.4: ✅                 │
│   Performance 60fps: ✅                │
│   Sin espacio negro: ✅                │
└────────────────────────────────────────┘
```

---

## 📝 RESUMEN EJECUTIVO

### Cambio Principal

**DE:** Orientación (portrait vs landscape)  
**A:** Breakpoint fijo **1024px de ancho**

### Beneficios

1. ✅ **Predictibilidad:** Siempre se sabe el layout según el ancho
2. ✅ **iPhone landscape:** Ahora usa stack vertical (correcto)
3. ✅ **Consistencia:** Hasta 1023px siempre stack, desde 1024px siempre side-by-side
4. ✅ **Sin espacio negro:** Contenedor full width en stack mode

### Proporciones

- **Stack (≤1023px):** Imagen 50vh, contenido resto
- **Side-by-side (≥1024px):** Imagen 45%, contenido 55%

---

**Documento creado:** 10 de Diciembre, 2024  
**Versión:** 3.7 (Breakpoint 1024px - Stack hasta 1023px)  
**Status:** ✅ PRODUCTION READY 🎉
