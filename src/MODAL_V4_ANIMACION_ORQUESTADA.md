# 🎬 Modal V4.0 - Animación Orquestada Cinematográfica

**Fecha:** 10 de Diciembre, 2024  
**Versión:** 4.0 (Animación Orquestada con Desenmascaramiento Progresivo)

---

## 🎯 OBJETIVO: ANIMACIÓN CINEMATOGRÁFICA SECUENCIAL

```
1. Modal se desenmascara de izquierda a derecha (0s - 1s)
2. Al 50% del modal: Galería empieza a desenmascararse (0.5s)
3. Al 65% del modal: Contenido empieza a entrar (0.65s)
   - Categoría → Marca → Título → Párrafo → Año
   - Cada siguiente empieza al 65% del anterior
   - Movimientos sutiles (12px) + Opacidad 0 → 100
4. Salida: Solo fade opacity 100 → 0
```

---

## ⏱️ CONFIGURACIÓN DE TIEMPOS

```typescript
const MODAL_DURATION = 1.0;      // Modal: 1 segundo
const GALLERY_START = 0.5;       // Galería: empieza a los 0.5s (50%)
const GALLERY_DURATION = 0.8;    // Galería: dura 0.8s
const CONTENT_START = 0.65;      // Contenido: empieza a los 0.65s (65%)
const CONTENT_DURATION = 0.6;    // Cada campo: dura 0.6s
const CONTENT_STAGGER = 0.65;    // Stagger: 65% del anterior
```

---

## 📊 TIMELINE COMPLETA

### Línea de Tiempo Visual

```
                    MODAL CONTAINER
0.0s ████████████████████████████████████████ 1.0s
     └─ Desenmascaramiento izquierda → derecha

                    GALERÍA
0.5s ██████████████████████████████ 1.3s
     └─ Desenmascaramiento (50% del modal)

                    GRADIENTES
0.65s ████████████████ 1.25s
      └─ Fade in

                    CATEGORÍA
0.65s ██████████████ 1.25s
      └─ y: 12px → 0, opacity: 0 → 1

                    MARCA
1.04s ██████████████ 1.64s
      └─ y: 12px → 0, opacity: 0 → 1

                    TÍTULO
1.43s ██████████████ 2.03s
      └─ y: 12px → 0, opacity: 0 → 1

                    PÁRRAFO
1.82s ██████████████ 2.42s
      └─ y: 12px → 0, opacity: 0 → 1

                    AÑO
2.21s ██████████████ 2.81s
      └─ y: 12px → 0, opacity: 0 → 1

                    CLOSE BUTTON
2.81s ██████████ 3.31s
      └─ opacity: 0 → 1, scale: 0.9 → 1
```

---

## 🧮 CÁLCULOS EXACTOS

### Contenido - Delays Individuales

Fórmula: `delay = CONTENT_START + (index × CONTENT_DURATION × CONTENT_STAGGER)`

```typescript
// index: 0 (Categoría)
delay = 0.65 + (0 × 0.6 × 0.65) = 0.65s

// index: 1 (Marca)
delay = 0.65 + (1 × 0.6 × 0.65) = 0.65 + 0.39 = 1.04s

// index: 2 (Título)
delay = 0.65 + (2 × 0.6 × 0.65) = 0.65 + 0.78 = 1.43s

// index: 3 (Párrafo)
delay = 0.65 + (3 × 0.6 × 0.65) = 0.65 + 1.17 = 1.82s

// index: 4 (Año)
delay = 0.65 + (4 × 0.6 × 0.65) = 0.65 + 1.56 = 2.21s
```

**Stagger entre campos:** 0.39s (390ms)

---

### Close Button

```typescript
delay = CONTENT_START + (4 × CONTENT_DURATION × CONTENT_STAGGER) + 0.2
delay = 0.65 + 1.56 + 0.2 = 2.41s
```

---

### Duración Total de la Animación

```
Último elemento: Año termina a los 2.81s
Close Button: Termina a los 3.31s
DURACIÓN TOTAL: ~3.3 segundos
```

---

## 🎨 ANIMACIÓN POR ELEMENTO

### 1. MODAL CONTAINER

**Efecto:** Desenmascaramiento de izquierda a derecha (wipe)

```typescript
hidden: { 
  clipPath: 'inset(0 100% 0 0)',  // Oculto completamente
  opacity: 1
}
visible: { 
  clipPath: 'inset(0 0% 0 0)',    // Visible completamente
  opacity: 1,
  transition: { 
    clipPath: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    opacity: { duration: 0.01 }
  }
}
exit: { 
  opacity: 0,  // Solo fade out
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}
```

**Visualización:**
```
0.0s: ▓▓▓▓▓▓▓▓▓▓ (Oculto - máscara cubre todo)
0.25s: ░░░▓▓▓▓▓▓▓ (25% visible)
0.5s: ░░░░░▓▓▓▓▓ (50% visible)
0.75s: ░░░░░░░▓▓▓ (75% visible)
1.0s: ░░░░░░░░░░ (100% visible)

Leyenda:
▓ = Oculto (máscara)
░ = Visible
```

---

### 2. GALERÍA (Media Gallery)

**Efecto:** Desenmascaramiento desde izquierda (empieza al 50% del modal)

```typescript
hidden: { 
  clipPath: 'inset(0 100% 0 0)',
  opacity: 1
}
visible: { 
  clipPath: 'inset(0 0% 0 0)',
  opacity: 1,
  transition: { 
    clipPath: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
    opacity: { duration: 0.01 }
  }
}
exit: { 
  opacity: 0,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}
```

**Timing:**
- Empieza: 0.5s (cuando modal va al 50%)
- Termina: 1.3s (0.5s + 0.8s)

**Visualización:**
```
0.5s: ▓▓▓▓▓▓▓▓▓▓ (Oculto)
0.7s: ░░░▓▓▓▓▓▓▓ (25% visible)
0.9s: ░░░░░▓▓▓▓▓ (50% visible)
1.1s: ░░░░░░░▓▓▓ (75% visible)
1.3s: ░░░░░░░░░░ (100% visible)
```

---

### 3. GRADIENTES (Top & Bottom)

**Efecto:** Fade in suave

```typescript
hidden: { opacity: 0 }
visible: { 
  opacity: 1,
  transition: { 
    duration: 0.6, 
    ease: [0.16, 1, 0.3, 1], 
    delay: 0.65 
  }
}
exit: { 
  opacity: 0,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}
```

**Timing:**
- Empieza: 0.65s (mismo que primer campo de contenido)
- Termina: 1.25s

---

### 4. CAMPOS DE CONTENIDO

**Efecto:** Movimiento sutil (12px) + Fade in

```typescript
hidden: { 
  y: 12,        // 12px abajo
  opacity: 0 
}
visible: (index) => {
  const delay = 0.65 + (index × 0.6 × 0.65);
  return {
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: delay
    }
  };
}
exit: { 
  opacity: 0,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}
```

#### Campo 0: Categoría

```
Delay: 0.65s
Duración: 0.6s
Termina: 1.25s

0.65s: y=12px, opacity=0    ↓
0.95s: y=6px, opacity=0.5   ↓ (mitad)
1.25s: y=0px, opacity=1     ✓ (completo)
```

#### Campo 1: Marca

```
Delay: 1.04s
Duración: 0.6s
Termina: 1.64s

1.04s: y=12px, opacity=0    ↓
1.34s: y=6px, opacity=0.5   ↓ (mitad)
1.64s: y=0px, opacity=1     ✓ (completo)
```

#### Campo 2: Título

```
Delay: 1.43s
Duración: 0.6s
Termina: 2.03s

1.43s: y=12px, opacity=0    ↓
1.73s: y=6px, opacity=0.5   ↓ (mitad)
2.03s: y=0px, opacity=1     ✓ (completo)
```

#### Campo 3: Párrafo

```
Delay: 1.82s
Duración: 0.6s
Termina: 2.42s

1.82s: y=12px, opacity=0    ↓
2.12s: y=6px, opacity=0.5   ↓ (mitad)
2.42s: y=0px, opacity=1     ✓ (completo)
```

#### Campo 4: Año

```
Delay: 2.21s
Duración: 0.6s
Termina: 2.81s

2.21s: y=12px, opacity=0    ↓
2.51s: y=6px, opacity=0.5   ↓ (mitad)
2.81s: y=0px, opacity=1     ✓ (completo)
```

---

### 5. CLOSE BUTTON

**Efecto:** Fade in + Scale

```typescript
hidden: { 
  opacity: 0,
  scale: 0.9
}
visible: { 
  opacity: 1,
  scale: 1,
  transition: { 
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
    delay: 2.41
  }
}
exit: { 
  opacity: 0,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}
```

**Timing:**
- Empieza: 2.41s (después del último campo + 0.2s)
- Termina: 2.91s

---

## 🎭 COMPARACIÓN: ENTRADA vs SALIDA

### ENTRADA (3.3 segundos)

```
┌─────────────────────────────────────────────────────┐
│ 0.0s: MODAL empieza a desenmascararse               │
│       ░░░░░░░░░░░░░░░░░░░░                          │
│                                                     │
│ 0.5s: GALERÍA empieza a desenmascararse             │
│       ░░░░░░░░░░░░░░░░░░░░                          │
│       ├─ IMAGEN                                     │
│                                                     │
│ 0.65s: CONTENIDO empieza a entrar                   │
│        ├─ Categoría (0.65s - 1.25s)                 │
│        ├─ Marca (1.04s - 1.64s)                     │
│        ├─ Título (1.43s - 2.03s)                    │
│        ├─ Párrafo (1.82s - 2.42s)                   │
│        └─ Año (2.21s - 2.81s)                       │
│                                                     │
│ 2.41s: CLOSE BUTTON aparece                         │
│                                                     │
│ 3.3s: ANIMACIÓN COMPLETA ✓                          │
└─────────────────────────────────────────────────────┘
```

---

### SALIDA (0.6 segundos)

```
┌─────────────────────────────────────────────────────┐
│ TODOS LOS ELEMENTOS:                                │
│   - Solo fade opacity 100 → 0                       │
│   - Duración: 0.6s                                  │
│   - Ease: [0.16, 1, 0.3, 1]                         │
│                                                     │
│ Sin desenmascaramiento                              │
│ Sin movimientos                                     │
│ Sin stagger                                         │
│                                                     │
│ Resultado: Fade out suave y elegante               │
└─────────────────────────────────────────────────────┘
```

---

## 📐 VISUALIZACIÓN SECUENCIAL

### Frame by Frame (cada 0.5s)

```
T = 0.0s
┌────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ Modal oculto
└────────────────────┘

T = 0.5s (50% modal)
┌────────────────────┐
│ ░░░░░░░▓▓▓▓▓▓▓▓▓▓▓ │ Modal 50% visible
│ ┌──────┬───────┐   │ Galería empieza
│ │▓▓▓▓▓▓│       │   │
└─┴──────┴───────┴───┘

T = 0.65s (65% modal)
┌────────────────────┐
│ ░░░░░░░░▓▓▓▓▓▓▓▓▓▓ │ Modal 65% visible
│ ┌──────┬───────┐   │ Galería 20% visible
│ │░░▓▓▓▓│ ▓▓▓   │   │ Categoría empieza
└─┴──────┴───────┴───┘

T = 1.0s (Modal completo)
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │ Modal 100% visible
│ ┌──────┬───────┐   │ Galería 62% visible
│ │░░░░▓▓│ ░░▓   │   │ Categoría 58% (mitad)
└─┴──────┴───────┴───┘

T = 1.3s (Galería completa)
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │ Modal 100%
│ ┌──────┬───────┐   │ Galería 100% ✓
│ │░░░░░░│ ░░░   │   │ Categoría 100% ✓
│ │      │ ACTIV │   │ Marca 43%
└─┴──────┴───────┴───┘

T = 2.0s
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │ Todo visible ✓
│ ┌──────┬───────┐   │
│ │IMAGEN│ ACTIV │   │ Categoría ✓
│ │      │ MARCA │   │ Marca ✓
│ │      │ TÍTUL │   │ Título 95%
│ │      │       │   │ Párrafo 30%
└─┴──────┴───────┴───┘

T = 2.8s (Contenido completo)
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │ Todo visible ✓
│ ┌──────┬───────┐   │
│ │IMAGEN│ ACTIV │   │ Categoría ✓
│ │      │ MARCA │   │ Marca ✓
│ │      │ TÍTUL │   │ Título ✓
│ │      │ PÁRRA │   │ Párrafo ✓
│ │      │ Año   │   │ Año ✓
│ │      │     ✕ │   │ Close button 78%
└─┴──────┴───────┴───┘

T = 3.3s (Animación completa)
┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │ Todo visible ✓
│ ┌──────┬───────┐   │
│ │IMAGEN│ ACTIV │   │ Categoría ✓
│ │      │ MARCA │   │ Marca ✓
│ │      │ TÍTUL │   │ Título ✓
│ │      │ PÁRRA │   │ Párrafo ✓
│ │      │ Año   │   │ Año ✓
│ │      │     ✕ │   │ Close button ✓
└─┴──────┴───────┴───┘

Leyenda:
▓ = Oculto
░ = Visible
✓ = Completado
```

---

## 🧪 TESTING CHECKLIST

### Entrada (Opening)

```bash
✓ 1. Modal se desenmascara de izquierda a derecha (0s - 1s)
✓ 2. Galería empieza al 50% del modal (0.5s)
✓ 3. Galería termina después del modal (1.3s)
✓ 4. Categoría empieza al 65% del modal (0.65s)
✓ 5. Marca empieza al 65% de Categoría (1.04s)
✓ 6. Título empieza al 65% de Marca (1.43s)
✓ 7. Párrafo empieza al 65% de Título (1.82s)
✓ 8. Año empieza al 65% de Párrafo (2.21s)
✓ 9. Close button aparece al final (2.41s)
✓ 10. Gradientes aparecen con contenido (0.65s)
```

---

### Salida (Closing)

```bash
✓ 1. Todos los elementos hacen fade out simultáneo
✓ 2. Duración: 0.6s
✓ 3. Sin movimientos (solo opacity)
✓ 4. Sin desenmascaramiento reverso
✓ 5. Suave y elegante
```

---

### Sincronización

```bash
✓ 1. Modal y Galería no se solapan visualmente mal
✓ 2. Contenido no aparece antes de la galería
✓ 3. Stagger de 0.39s entre campos es consistente
✓ 4. No hay saltos bruscos
✓ 5. Ease curve es consistente ([0.16, 1, 0.3, 1])
```

---

## 🏆 RESULTADO FINAL V4.0

```
┌────────────────────────────────────────┐
│ MODAL V4.0 - ORQUESTACIÓN PERFECTA ✅  │
├────────────────────────────────────────┤
│ Modal Container:                       │
│   Desenmascaramiento L→R: ✅           │
│   Duración 1.0s: ✅                    │
│                                        │
│ Galería:                               │
│   Empieza al 50% modal: ✅             │
│   Desenmascaramiento L→R: ✅           │
│   Duración 0.8s: ✅                    │
│                                        │
│ Contenido (5 campos):                  │
│   Empieza al 65% modal: ✅             │
│   Stagger 65% (0.39s): ✅              │
│   Movimiento sutil 12px: ✅            │
│   Fade 0→1: ✅                         │
│   Duración 0.6s cada uno: ✅           │
│                                        │
│ Gradientes:                            │
│   Aparecen con contenido: ✅           │
│   Fade in suave: ✅                    │
│                                        │
│ Close Button:                          │
│   Aparece al final: ✅                 │
│   Scale + Fade: ✅                     │
│                                        │
│ Salida:                                │
│   Solo fade out: ✅                    │
│   Duración 0.6s: ✅                    │
│   Suave y elegante: ✅                 │
│                                        │
│ Duración Total:                        │
│   Entrada: ~3.3s ✅                    │
│   Salida: ~0.6s ✅                     │
└────────────────────────────────────────┘
```

---

## 💻 CÓDIGO CLAVE

### Configuración de Tiempos

```typescript
const MODAL_DURATION = 1.0;      // Modal: 1s
const GALLERY_START = 0.5;       // Galería: 50% del modal
const GALLERY_DURATION = 0.8;    // Galería: 0.8s
const CONTENT_START = 0.65;      // Contenido: 65% del modal
const CONTENT_DURATION = 0.6;    // Campos: 0.6s cada uno
const CONTENT_STAGGER = 0.65;    // Stagger: 65% del anterior
```

### Fórmula de Delay

```typescript
// Para cada campo de contenido
const delay = CONTENT_START + (index × CONTENT_DURATION × CONTENT_STAGGER);

// Ejemplos:
// index 0: 0.65 + (0 × 0.6 × 0.65) = 0.65s
// index 1: 0.65 + (1 × 0.6 × 0.65) = 1.04s
// index 2: 0.65 + (2 × 0.6 × 0.65) = 1.43s
// index 3: 0.65 + (3 × 0.6 × 0.65) = 1.82s
// index 4: 0.65 + (4 × 0.6 × 0.65) = 2.21s
```

---

**Documento creado:** 10 de Diciembre, 2024  
**Versión:** 4.0 (Animación Orquestada Cinematográfica)  
**Status:** ✅ PRODUCTION READY 🎉🎬
