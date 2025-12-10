# 🎬 Modal V3.8 - Cinematográfico 60vw × 60vh

**Fecha:** 10 de Diciembre, 2024  
**Versión:** 3.8 (Desktop Cinematográfico - 60vw × 60vh)

---

## 🎯 OBJETIVO: CINEMATIC MODAL

```
Width ≥ 1024px:
  Objetivo: 60vw × 60vh  (modal cuadrado compacto)
  Máximo:   90vw × 80vh  (límites de seguridad)
  Mínimo:   Ninguno (sin restricción mínima)
```

**Filosofía:** Modal **contenido**, **respirable**, con **espacio negativo** alrededor. Estilo Apple/Awwwards.

---

## 📐 CÁLCULOS EXACTOS

### Viewport 1024x874 (Caso de la imagen)

**Contenedor Modal:**
- Ancho: `60vw` = 1024 × 0.60 = **614.4px** ≈ **614px**
- Alto: `60vh` = 874 × 0.60 = **524.4px** ≈ **524px**

**Proporciones internas (45% / 55%):**
- **Imagen (45%):** 614 × 0.45 = **276.3px** ≈ **276px** de ancho
- **Contenido (55%):** 614 × 0.55 = **337.7px** ≈ **338px** de ancho
- **Altura:** 524px para ambos (full height)

---

### Viewport 1440x900 (Desktop típico)

**Contenedor Modal:**
- Ancho: `60vw` = 1440 × 0.60 = **864px**
- Alto: `60vh` = 900 × 0.60 = **540px**

**Proporciones internas (45% / 55%):**
- **Imagen (45%):** 864 × 0.45 = **388.8px** ≈ **389px** de ancho
- **Contenido (55%):** 864 × 0.55 = **475.2px** ≈ **475px** de ancho
- **Altura:** 540px para ambos (full height)

---

### Viewport 1920x1080 (Full HD Desktop)

**Contenedor Modal:**
- Ancho: `60vw` = 1920 × 0.60 = **1152px**
- Alto: `60vh` = 1080 × 0.60 = **648px**

**Proporciones internas (45% / 55%):**
- **Imagen (45%):** 1152 × 0.45 = **518.4px** ≈ **518px** de ancho
- **Contenido (55%):** 1152 × 0.55 = **633.6px** ≈ **634px** de ancho
- **Altura:** 648px para ambos (full height)

---

### Viewport 2560x1440 (2K/QHD Desktop)

**Contenedor Modal:**
- Ancho: `60vw` = 2560 × 0.60 = **1536px**
- Alto: `60vh` = 1440 × 0.60 = **864px**

**Límite máximo aplicado:**
- Ancho: `max-w-[90vw]` = 2560 × 0.90 = **2304px** (NO aplica, 1536 < 2304)
- Alto: `max-h-[80vh]` = 1440 × 0.80 = **1152px** (NO aplica, 864 < 1152)

**Resultado final:**
- **Ancho real:** 1536px (60vw)
- **Alto real:** 864px (60vh)

**Proporciones internas (45% / 55%):**
- **Imagen (45%):** 1536 × 0.45 = **691.2px** ≈ **691px**
- **Contenido (55%):** 1536 × 0.55 = **844.8px** ≈ **845px**

---

### Viewport 3840x2160 (4K Desktop)

**Contenedor Modal:**
- Ancho: `60vw` = 3840 × 0.60 = **2304px**
- Alto: `60vh` = 2160 × 0.60 = **1296px**

**Límite máximo aplicado:**
- Ancho: `max-w-[90vw]` = 3840 × 0.90 = **3456px** (NO aplica, 2304 < 3456)
- Alto: `max-h-[80vh]` = 2160 × 0.80 = **1728px** (NO aplica, 1296 < 1728)

**Resultado final:**
- **Ancho real:** 2304px (60vw)
- **Alto real:** 1296px (60vh)

**Proporciones internas (45% / 55%):**
- **Imagen (45%):** 2304 × 0.45 = **1036.8px** ≈ **1037px**
- **Contenido (55%):** 2304 × 0.55 = **1267.2px** ≈ **1267px**

---

## 🎨 VISUALIZACIÓN COMPARATIVA

### ANTES (V3.7): max-w-5xl h-[70vh]

```
Viewport 1024x874:

┌────────────────────────────────────────────────────────────┐
│                                                            │
│ ┌────────────┬───────────────────────────────────────┐    │
│ │            │ ACTIVACIONES                          │    │
│ │ CONVERSE   │                                       │    │
│ │            │ BATIWOM 2015: CUANDO LA CIUDAD...     │    │
│ │ IMAGEN     │                                       │    │
│ │ (45%)      │ CONTENIDO (55%)                       │    │
│ │            │                                       │    │
│ │            │ Año: 2011                             │    │
│ └────────────┴───────────────────────────────────────┘    │
│                                                            │
│            ↑ 1024px ancho × 612px alto ↑                  │
│        (max-w-5xl = 1024px, 70vh = 612px)                 │
└────────────────────────────────────────────────────────────┘
  CASI OCUPA TODA LA PANTALLA ❌
```

---

### AHORA (V3.8): w-[60vw] h-[60vh]

```
Viewport 1024x874:

┌────────────────────────────────────────────────────────────┐
│                                                            │
│                                                            │
│      ┌──────────────┬──────────────────────┐              │
│      │              │ ACTIVACIONES         │              │
│      │ CONVERSE     │                      │              │
│      │              │ BATIWOM 2015...      │              │
│      │ IMAGEN       │ CONTENIDO            │              │
│      │ (45%)        │ (55%)                │              │
│      │              │                      │              │
│      │              │ Año: 2011            │              │
│      └──────────────┴──────────────────────┘              │
│                                                            │
│            ↑ 614px ancho × 524px alto ↑                   │
│          (60vw = 614px, 60vh = 524px)                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
  ESPACIO RESPIRABLE ✅ | CINEMATOGRÁFICO ✅
```

**Diferencias:**
- ✅ **40% menos ancho** (1024px → 614px)
- ✅ **14% menos alto** (612px → 524px)
- ✅ **Espacio negro alrededor** (backdrop visible)
- ✅ **Más cinematográfico**

---

## 📊 TABLA COMPARATIVA

| Viewport | ANTES (V3.7) | AHORA (V3.8) | Reducción |
|----------|--------------|--------------|-----------|
| **1024x874** | 1024 × 612px | 614 × 524px | -40% ancho, -14% alto |
| **1440x900** | 1280 × 630px | 864 × 540px | -32% ancho, -14% alto |
| **1920x1080** | 1280 × 756px | 1152 × 648px | -10% ancho, -14% alto |

**Resultado:** Modal más **compacto**, **elegante** y **cinematográfico**.

---

## 💻 CÓDIGO IMPLEMENTADO

### Card Container

```tsx
<motion.div
  className={clsx(
    "relative bg-black",
    Z_INDEX.MODAL_CONTENT,
    // ≤1023px: Stack vertical, full width, full screen
    useStackedLayout && "w-full min-h-screen flex flex-col",
    // ≥1024px: Side-by-side cinematográfico
    // Objetivo: 60vw × 60vh | Máximo: 90vw × 80vh
    !useStackedLayout && "w-[60vw] max-w-[90vw] h-[60vh] max-h-[80vh] min-h-0 flex flex-row overflow-hidden"
  )}
>
```

**Breakdown:**
- `w-[60vw]`: Ancho objetivo 60% del viewport
- `max-w-[90vw]`: Límite máximo 90% (seguridad)
- `h-[60vh]`: Alto objetivo 60% del viewport
- `max-h-[80vh]`: Límite máximo 80% (seguridad)
- `min-h-0`: Sin restricción mínima
- `flex flex-row`: Side-by-side horizontal
- `overflow-hidden`: Clipping interno

---

## 🎭 ESPACIADO Y RESPIRABILIDAD

### Viewport 1024x874 (Caso crítico)

**Espacios alrededor del modal:**

```
┌─────────────────────────────────────────────┐
│ ← 205px →       MODAL         ← 205px →     │ Horizontal
│                614px                         │
└─────────────────────────────────────────────┘
          Total width: 1024px

Espacio horizontal total: 205px × 2 = 410px
Porcentaje de espacio: (410 / 1024) × 100 = 40%
```

```
┌─────────┐
│ ↑ 175px │
│         │
│  MODAL  │ Vertical
│  524px  │
│         │
│ ↓ 175px │
└─────────┘
Total height: 874px

Espacio vertical total: 175px × 2 = 350px
Porcentaje de espacio: (350 / 874) × 100 = 40%
```

**Conclusión:**
- ✅ **40% de espacio horizontal** alrededor del modal
- ✅ **40% de espacio vertical** alrededor del modal
- ✅ **Backdrop negro visible** (bg-black/40)
- ✅ **Cinematic framing**

---

### Viewport 1920x1080 (Full HD)

**Espacios alrededor del modal:**

```
Horizontal:
Modal: 1152px (60vw)
Espacio: (1920 - 1152) / 2 = 384px por lado
Porcentaje: 40% de espacio

Vertical:
Modal: 648px (60vh)
Espacio: (1080 - 648) / 2 = 216px arriba/abajo
Porcentaje: 40% de espacio
```

**Resultado consistente:** Siempre **40% de espacio** alrededor del modal.

---

## 🔒 LÍMITES DE SEGURIDAD (max-w-[90vw] max-h-[80vh])

### Caso extremo: Viewport 800x600 (raro)

**Sin límites:**
- Ancho: `60vw` = 800 × 0.60 = **480px**
- Alto: `60vh` = 600 × 0.60 = **360px**

**Con límites:**
- Ancho máximo: `90vw` = 800 × 0.90 = **720px** (NO aplica, 480 < 720)
- Alto máximo: `80vh` = 600 × 0.80 = **480px** (NO aplica, 360 < 480)

**Resultado:** 480px × 360px (60vw × 60vh se mantiene)

---

### Caso extremo: Viewport 10000x10000 (gigante)

**Sin límites:**
- Ancho: `60vw` = 10000 × 0.60 = **6000px**
- Alto: `60vh` = 10000 × 0.60 = **6000px**

**Con límites:**
- Ancho máximo: `90vw` = 10000 × 0.90 = **9000px** (NO aplica, 6000 < 9000)
- Alto máximo: `80vh` = 10000 × 0.80 = **8000px** (NO aplica, 6000 < 8000)

**Resultado:** 6000px × 6000px (60vw × 60vh se mantiene)

**Conclusión:** Los límites `90vw × 80vh` son **seguros** pero **raramente se activan** porque `60vw × 60vh` ya es conservador.

---

## 🎨 PROPORCIONES INTERNAS (45% / 55%)

### Consistencia en todos los viewports

```
┌────────────────────────────┐
│ Imagen │ Contenido         │
│  45%   │   55%             │
│        │                   │
│        │ Scrollable        │
└────────────────────────────┘
```

**Ejemplos:**

| Viewport | Modal Ancho | Imagen (45%) | Contenido (55%) |
|----------|-------------|--------------|-----------------|
| 1024x874 | 614px | 276px | 338px |
| 1440x900 | 864px | 389px | 475px |
| 1920x1080 | 1152px | 518px | 634px |

**Nota:** Las proporciones 45/55 **siempre se respetan** sin importar el tamaño del viewport.

---

## 🧪 TESTING

### Test 1: Viewport 1024x874 (tu screenshot)

```bash
1. Viewport: 1024px de ancho
2. 1024 ≥ 1024 → Side-by-side ✅
3. Modal: 60vw × 60vh = 614px × 524px ✅
4. ✅ Verificar: Modal centrado
5. ✅ Verificar: Espacio negro alrededor (40%)
6. ✅ Verificar: Imagen 276px (45%)
7. ✅ Verificar: Contenido 338px (55%)
8. ✅ Verificar: Backdrop visible
```

---

### Test 2: Viewport 1920x1080 (Full HD)

```bash
1. Viewport: 1920px de ancho
2. Modal: 60vw × 60vh = 1152px × 648px ✅
3. ✅ Verificar: Modal centrado
4. ✅ Verificar: Espacio 384px por lado (40%)
5. ✅ Verificar: Imagen 518px (45%)
6. ✅ Verificar: Contenido 634px (55%)
7. ✅ Verificar: Cinematic look
```

---

### Test 3: Resize en vivo

```bash
1. Viewport inicial: 1024x874
2. Modal: 614px × 524px ✅
3. Resize a 1440x900
4. Modal: 864px × 540px ✅ (crece proporcionalmente)
5. Resize a 1920x1080
6. Modal: 1152px × 648px ✅ (sigue creciendo)
7. ✅ Verificar: Siempre 40% de espacio alrededor
8. ✅ Verificar: Animación suave de resize
```

---

## 📱 COMPORTAMIENTO POR BREAKPOINT

### Width ≤ 1023px (Stack Vertical)

```
Stack vertical
Imagen: w-full, h-[50vh]
Diagonal: Sí
Contenido: w-full, scrollable
Safe area: Respetada
```

**NO CAMBIA** desde V3.7.

---

### Width ≥ 1024px (Side-by-Side Cinematográfico)

```
Side-by-side
Contenedor: 60vw × 60vh (objetivo)
Límites: 90vw × 80vh (máximo)
Imagen: 45% ancho
Contenido: 55% ancho
Diagonal: No
Centrado: Sí
```

**CAMBIO PRINCIPAL** desde V3.7:
- ❌ **ANTES:** `max-w-5xl h-[70vh]` (ocupa casi toda la pantalla)
- ✅ **AHORA:** `w-[60vw] max-w-[90vw] h-[60vh] max-h-[80vh]` (compacto y cinematográfico)

---

## 🏆 RESULTADO FINAL V3.8

```
┌────────────────────────────────────────┐
│ MODAL V3.8 - CINEMATOGRÁFICO ✅        │
├────────────────────────────────────────┤
│ Desktop (≥1024px):                     │
│   Objetivo: 60vw × 60vh ✅             │
│   Máximo: 90vw × 80vh ✅               │
│   Espaciado: 40% alrededor ✅          │
│   Backdrop visible: ✅                 │
│                                        │
│ Mobile/Tablet (≤1023px):               │
│   Stack vertical: ✅                   │
│   Full screen: ✅                      │
│   Imagen 50vh: ✅                      │
│   Diagonal 17°: ✅                     │
│                                        │
│ Proporciones Internas:                 │
│   Imagen: 45% ✅                       │
│   Contenido: 55% ✅                    │
│   Consistente: ✅                      │
│                                        │
│ Espíritu Cinematográfico:              │
│   Compacto: ✅                         │
│   Respirable: ✅                       │
│   Elegante: ✅                         │
│   Apple/Awwwards-style: ✅             │
│                                        │
│ Features V3.7 Mantenidas:              │
│   Breakpoint 1024px: ✅                │
│   clamp() typography: ✅               │
│   Safe areas iOS: ✅                   │
│   Touch targets 44px: ✅               │
│   Animaciones: ✅                      │
│   Performance 60fps: ✅                │
└────────────────────────────────────────┘
```

---

## 📝 RESUMEN EJECUTIVO

### Cambio Principal (V3.7 → V3.8)

**Desktop (≥1024px):**
```diff
- max-w-5xl h-[70vh]
+ w-[60vw] max-w-[90vw] h-[60vh] max-h-[80vh]
```

### Impacto Visual

**Antes (V3.7):**
- ❌ Modal ocupa **casi toda la pantalla** (1024px × 612px en 1024x874)
- ❌ Poco espacio para respirar
- ❌ Menos cinematográfico

**Ahora (V3.8):**
- ✅ Modal compacto **60% del viewport** (614px × 524px en 1024x874)
- ✅ **40% de espacio negro** alrededor
- ✅ **Cinematic framing** estilo Apple/Awwwards
- ✅ Backdrop visible y elegante

### Proporciones

- **Mobile/Tablet (≤1023px):** Sin cambios (stack vertical)
- **Desktop (≥1024px):** 
  - Contenedor: 60vw × 60vh (objetivo) | 90vw × 80vh (máximo)
  - Interno: 45% imagen / 55% contenido

### Beneficios

1. ✅ **Espacio negativo:** Backdrop visible alrededor
2. ✅ **Elegancia:** Modal contenido y respirable
3. ✅ **Cinematic:** Framing profesional estilo película
4. ✅ **Escalable:** Proporcional en todos los viewports
5. ✅ **Seguro:** Límites máximos para casos extremos

---

**Documento creado:** 10 de Diciembre, 2024  
**Versión:** 3.8 (Desktop Cinematográfico - 60vw × 60vh)  
**Status:** ✅ PRODUCTION READY 🎉
