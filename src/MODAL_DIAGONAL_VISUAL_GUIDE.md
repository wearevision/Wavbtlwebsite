# 📐 Modal - Guía Visual de Diagonales

## 🎯 VISTA COMPLETA (Desktop)

```
════════════════════════════════════════════════════════════════════════════════
                            MODAL CONTAINER
                       (clip-modal-desktop: 18% / 82%)
════════════════════════════════════════════════════════════════════════════════

        ╱────────────────────────────────────────────────────────╲
       ╱                                                          ╲
      ╱  18%                                                   82% ╲
     ╱                                                              ╲
    ╱                                                                ╲
   │                                                                  │
   │  ┌──────────────────┐  ┌────────────────────────────────────┐  │
   │  │                  │  │                                    │  │
   │  │   ╱──────────╲   │  │         [X] CLOSE BUTTON          │  │
   │  │  ╱            ╲  │  │                                    │  │
   │  │ ╱   MEDIA      ╲ │  │  ┌─────────────────────────────┐  │  │
   │  │╱    GALLERY     ╲│  │  │  [Category Badge]           │  │  │
   │  ││                 ││  │  │                             │  │  │
   │  ││   40% WIDTH     ││  │  │  [Brand/Logo]               │  │  │
   │  ││                 ││  │  │                             │  │  │
   │  ││ 15% → 85%       ││  │  │  [Title - 34px]             │  │  │
   │  ││ (Diagonales     ││  │  │  ACTIVACIÓN BTL:            │  │  │
   │  ││  paralelas)     ││  │  │  BIORITMO REVOLUCIONA       │  │  │
   │  ││                 ││  │  │  PANAMÁ CON SU NUEVO...     │  │  │
   │  ││                 ││  │  │                             │  │  │
   │  ││                 ││  │  │  [Description - Max 55ch]   │  │  │
   │  ││                 ││  │  │  En WAV BTL diseñamos una   │  │  │
   │  │╲                 ╱│  │  │  experiencia de marca...    │  │  │
   │  │ ╲               ╱ │  │  │  (texto continúa...)        │  │  │
   │  │  ╲─────────────╱  │  │  │                             │  │  │
   │  │                  │  │  │  [Metadata Grid]            │  │  │
   │  │  TRAPEZOIDE      │  │  │  AÑO: 2019 | LUGAR: Panamá  │  │  │
   │  │  INVERTIDO       │  │  │                             │  │  │
   │  └──────────────────┘  │  └╲────────────────────────────┘  │  │
   │                        │   └─────────────────────────────┘  │  │
   │   ← 40% width →        │   ←────── 60% width ──────→        │  │
   │                        │                                    │  │
   │                        │      CONTENT CONTAINER             │  │
   │                        │  (clip-content-diagonal: 0% / 6%)  │  │
   │                        │                                    │  │
   │                        │  Padding: pl-20, pr-16, py-12     │  │
   │                        │  Diagonal inferior: 6% offset      │  │
   │                        │                                    │  │
   ╲                                                                ╱
    ╲                                                              ╱
     ╲                                                            ╱
      ╲                                                          ╱
       ╲────────────────────────────────────────────────────────╱
         0%                                                  100%

════════════════════════════════════════════════════════════════════════════════
```

---

## 🔍 ZOOM: Media Gallery (Trapezoide Simétrico)

```
ANTES (V2.0) - Solo diagonal izquierda:
┌─────────────────────────┐
│                         │  ← Lado derecho RECTO
│                         │
│      Foto/Video         │
│                         │
│                         │
│                         │
└─────────────────────────┘
  ↑
  Diagonal solo aquí (20% offset)


DESPUÉS (V2.1) - Diagonales paralelas:

      15%             85%
       ╱─────────────╲     ← Superior: Diagonal en AMBOS lados
      ╱               ╲
     ╱                 ╲
    ╱                   ╲
   ╱    Foto/Video      ╲
  ╱                      ╲
 ╱                        ╲
╱                          ╲
└──────────────────────────┘  ← Inferior: 0% → 100%
0%                        100%

✅ RESULTADO: Trapezoide invertido simétrico
✅ Diagonales paralelas entre sí (~17° cada una)
```

---

## 🔍 ZOOM: Content Container (Diagonal Inferior)

```
ANTES (V2.0) - Sin clip-path:
┌────────────────────────────────┐
│ [Category Badge]               │
│                                │
│ [Brand/Logo]                   │
│                                │
│ [Title - 48px]                 │  ← Título muy grande
│ ACTIVACIÓN BTL: BIORITMO       │
│ REVOLUCIONA PANAMÁ CON...      │
│                                │
│ [Description]                  │
│ Texto que puede cortarse al... │  ← Corte potencial
│                                │
│ [Metadata]                     │
└────────────────────────────────┘  ← Borde perpendicular


DESPUÉS (V2.1) - Con clip-path diagonal:
┌────────────────────────────────┐
│ [Category Badge]               │
│                                │
│ [Brand/Logo]                   │
│                                │
│ [Title - 34px]                 │  ← Título optimizado
│ ACTIVACIÓN BTL: BIORITMO       │
│ REVOLUCIONA PANAMÁ CON SU      │
│ NUEVO GIMNASIO                 │
│                                │
│ [Description - Max 55ch]       │  ← Width controlado
│ En WAV BTL diseñamos una       │
│ experiencia de marca impacta   │
│ para el lanzamiento del...     │
│                                │
│ [Metadata]                     │
│ AÑO: 2019 | LUGAR: Panamá      │
│                                │
└╲───────────────────────────────┘  ← Diagonal inferior (6% offset)
 6%                           100%

✅ RESULTADO: Borde inferior NO perpendicular
✅ Sigue diagonal paralela (~17°)
✅ Textos no se cortan (55ch max)
```

---

## 📏 PROPORCIÓN DE ANCHOS

```
═══════════════════════════════════════════════════════════
                    MODAL WIDTH: 100%
═══════════════════════════════════════════════════════════

┌─────────────────┬──────────────────────────────────────┐
│                 │                                      │
│   MEDIA         │        CONTENT                       │
│   GALLERY       │        CONTAINER                     │
│                 │                                      │
│   40%           │        60%                           │
│                 │                                      │
└─────────────────┴──────────────────────────────────────┘

V2.0: 45% Media / 55% Content
V2.1: 40% Media / 60% Content  ← +5% más espacio para texto
```

---

## 🎨 ALINEACIÓN DE TEXTOS (Concepto Diagonal)

```
ALINEACIÓN PERPENDICULAR (típica):
│ Texto alineado al borde
│ Texto alineado al borde
│ Texto alineado al borde
│ Texto alineado al borde
│
└─────────────────────
  ↑ Borde perpendicular


ALINEACIÓN DIAGONAL PARALELA (WAV BTL V2.1):
│ Texto alineado
│ Texto alineado 
│ Texto alineado  
│ Texto alineado   
│ Texto alineado    
 ╲─────────────────────
  ↑ Borde diagonal (~17°)

✅ El "borde izquierdo imaginario" sigue la diagonal
✅ Padding aumenta progresivamente (pl-20 base)
✅ Clip-path inferior crea la diagonal visual
```

---

## 🔢 MATEMÁTICAS DE LAS DIAGONALES

### Media Gallery (Trapezoide Simétrico)

```
Dimensiones:
- Superior: 15% offset (izq), 85% width, 15% offset (der)
- Inferior: 0% offset (izq), 100% width, 0% offset (der)

Cálculo diagonal izquierda:
  Δx = 15% del ancho total
  Δy = 100% de la altura
  Ángulo visual ≈ 17° (por proporción container)

Cálculo diagonal derecha:
  Δx = 15% del ancho total
  Δy = 100% de la altura
  Ángulo visual ≈ 17° (simétrico)

Resultado:
  ╱───────╲
 ╱         ╲
╱           ╲
```

### Content Container (Diagonal Inferior)

```
Dimensiones:
- Superior: 0% offset, 100% width
- Inferior: 6% offset, 94% width

Cálculo diagonal:
  Δx = 6% del ancho total
  Δy = 100% de la altura
  Ángulo visual ≈ 3-4° (sutil pero visible)

Resultado:
┌─────────┐
│         │
│         │
└╲────────┘
  ↑ Diagonal sutil
```

---

## 🎯 PUNTOS CLAVE

### 1. Media Gallery (CRÍTICO)
```
✅ DEBE tener diagonal en AMBOS lados
✅ Forma de trapezoide invertido
✅ Clip-path: polygon(15% 0, 85% 0, 100% 100%, 0 100%)
✅ 40% width en desktop
```

### 2. Content Container
```
✅ Diagonal inferior (no perpendicular)
✅ Clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%)
✅ 60% width en desktop
✅ Padding: pl-20 (aumentado), pr-16
```

### 3. Título
```
✅ 34px en desktop (antes 48px)
✅ Más legible y balanceado
✅ Reduce riesgo de overflow
```

### 4. Description
```
✅ Max-width: 55ch
✅ Previene líneas demasiado largas
✅ Óptimo para lectura
✅ Evita cortes en diagonal derecha
```

---

## 🧪 TESTING VISUAL

### Test 1: Verificar Diagonales de Media Gallery

```
PASO 1: Abrir modal en desktop
PASO 2: Inspeccionar el contenedor de foto/video
PASO 3: Verificar forma:

INCORRECTO:                 CORRECTO:
┌────────────┐              ╱──────────╲
│ Foto/Video │             ╱  Foto/Video ╲
└────────────┘            └──────────────┘
Solo diagonal izq.        Diagonal AMBOS lados
```

### Test 2: Verificar Diagonal de Content

```
PASO 1: Inspeccionar contenedor de contenido (derecha)
PASO 2: Verificar borde inferior izquierdo
PASO 3: Debe verse:

INCORRECTO:                 CORRECTO:
┌──────────┐                ┌──────────┐
│ Texto    │                │ Texto    │
└──────────┘                └╲─────────┘
Perpendicular               Diagonal (~17°)
```

### Test 3: Verificar Tamaño de Título

```
PASO 1: Inspeccionar elemento <h1>
PASO 2: Ver computed font-size
PASO 3: Debe mostrar:

Desktop: 34px ✅
Tablet:  32px ✅
Mobile:  28px ✅
```

---

## 🏆 CHECKLIST FINAL

```
Modal V2.1 - Desktop Geometry Checklist:

[ ] Media Gallery tiene diagonal en lado IZQUIERDO
[ ] Media Gallery tiene diagonal en lado DERECHO
[ ] Media Gallery forma trapezoide invertido
[ ] Content Container tiene diagonal inferior
[ ] Content Container NO tiene borde perpendicular
[ ] Título es 34px en desktop
[ ] Description tiene max-width 55ch
[ ] Textos no se cortan
[ ] Layout es 40% (media) / 60% (content)
[ ] Todas las diagonales son paralelas (~17°)

Si todos los items están ✅, el modal está perfecto.
```

---

**Guía Visual Versión:** 2.1  
**Creada:** 10 de Diciembre, 2024  
**Uso:** Testing y validación visual
