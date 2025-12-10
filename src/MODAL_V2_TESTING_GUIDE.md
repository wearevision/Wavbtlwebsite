# 🧪 Modal V2.0 - Testing Guide

## 🎯 TESTING CHECKLIST COMPLETO

### 1. VISUAL TESTING (Manual)

#### A. Geometría (Desktop)
```
✅ Checklist:
- [ ] Abrir modal en desktop (>1024px)
- [ ] Verificar que el modal tenga diagonal en AMBOS lados
- [ ] Verificar que las diagonales sean PARALELAS (mismo ángulo)
- [ ] Verificar que la media gallery tenga diagonales en ambos lados
- [ ] Verificar que las diagonales de la gallery sean paralelas entre sí
- [ ] Comparar con los tiles del Wall (mismo ángulo ~17°)
```

**Herramientas:**
- Browser DevTools → Inspector → Hover sobre el modal
- Ver el `clip-path` en Computed Styles
- Debe mostrar: `polygon(18% 0px, 100% 0px, 82% 100%, 0px 100%)`

---

#### B. Layout y Justificación de Textos
```
✅ Checklist:
- [ ] Textos alineados a la izquierda
- [ ] Margen izquierdo extra siguiendo la diagonal (pl-16)
- [ ] Contenido no choca con el borde diagonal
- [ ] Scroll solo en columna derecha (contenido)
- [ ] Media gallery sticky en desktop
```

**Scroll Test:**
- Abrir un evento con mucho texto
- Scrollear → Solo debe moverse el contenido derecho
- La imagen izquierda debe permanecer fija (sticky)

---

### 2. ANIMATION TESTING

#### A. Entrada del Modal (Desktop)

**Test Manual:**
1. Click en cualquier tile del Wall
2. Observar la secuencia:

```
T=0ms
✅ Backdrop aparece (fade in negro semi-transparente)
✅ Modal container aparece desde abajo (20px slide + scale 0.96→1)

T=60ms
✅ Media gallery entra desde DERECHA (x: 30% → 0)
✅ Zoom in suave visible (scale: 1.15 → 1)
✅ Desenmascaramiento diagonal progresivo

T=120ms
✅ Category badge entra desde IZQUIERDA (x: -30 → 0)

T=180ms
✅ Brand/Logo entra desde IZQUIERDA (x: -30 → 0)

T=240ms
✅ Title entra desde IZQUIERDA (x: -30 → 0)

T=300ms
✅ Description entra desde IZQUIERDA (x: -30 → 0)

T=360ms
✅ Metadata grid entra desde IZQUIERDA (x: -30 → 0)

T=150ms (paralelo)
✅ Botón X rota de -90° a 0° mientras aparece
```

**Cómo verificar:**
- **Grabación en cámara lenta:** Mac (QuickTime) → File → New Screen Recording → 0.5x speed
- **Chrome DevTools:** Performance → Record → Replay at 0.25x
- **Manual:** Contar "1-Mississippi, 2-Mississippi" (~1 segundo = secuencia completa)

---

#### B. Salida del Modal

**Test Manual:**
1. Presionar X o Escape o Click en backdrop
2. Observar la secuencia REVERSA:

```
✅ Elementos de contenido se van primero (x: 0 → -30)
✅ Metadata → Description → Title → Brand → Category (stagger reverso)
✅ Media gallery se va a la derecha (x: 0 → 30%) con zoom out
✅ Botón X rota de 0° a 90° mientras desaparece
✅ Modal container se va abajo (y: 0 → 20) con scale out (1 → 0.96)
✅ Backdrop fade out
```

**Duración esperada:** ~400ms (más rápida que entrada)

---

#### C. Zoom en Media Gallery

**Test Específico:**
1. Abrir modal
2. Observar SOLO la imagen/video (ignorar el resto)
3. Debe verse:
   - ✅ Imagen empieza ligeramente más grande (zoom inicial)
   - ✅ Se ajusta suavemente al tamaño final (zoom in)
   - ✅ Efecto "breathe in" sutil

**Cambio de imagen en gallery:**
1. Click en flecha derecha (si hay múltiples imágenes)
2. Observar transición entre imágenes:
   - ✅ Imagen actual: zoom out leve + fade out (scale: 1 → 1.05)
   - ✅ Imagen nueva: zoom in + fade in (scale: 1.08 → 1)
   - ✅ Duración: 800ms (más lenta, cinematográfica)

---

#### D. Botón X - Rotación

**Test Interactivo:**
1. Abrir modal
2. Enfocarse SOLO en el botón X
3. Verificar:
   - ✅ Entra rotando de -90° (horizontal izquierda) a 0° (vertical)
   - ✅ Escala de 0.8 a 1.0 mientras rota
   - ✅ Fade in simultáneo (opacity 0 → 1)
   - ✅ Delay de 150ms (entra después que el contenido empieza)

4. Cerrar modal (click en X)
5. Verificar:
   - ✅ Sale rotando de 0° a 90° (horizontal derecha)
   - ✅ Escala de 1.0 a 0.8
   - ✅ Fade out simultáneo

6. Hover sobre el X
   - ✅ Scale 1.1 (crece ligeramente)
   - ✅ Fondo cambia a blanco, texto a negro

7. Click en X (presionar y mantener)
   - ✅ Scale 0.95 (se comprime)

---

### 3. BLUR TESTING (Crítico)

**Objetivo:** Verificar que NO hay blur duplicado

#### Test A: Inspección Visual
```
1. Abrir modal en desktop
2. Inspeccionar el Wall de fondo
3. ✅ Debe estar borroso (blur-[2px])
4. ✅ Debe estar en grayscale
5. ✅ Debe tener opacity-60

6. Inspeccionar el backdrop (capa negra semi-transparente)
7. ✅ NO debe tener backdrop-blur
8. ✅ Solo debe tener bg-black/40
```

#### Test B: DevTools Performance
```
1. Abrir Chrome DevTools → Performance
2. Click en Record
3. Abrir un modal
4. Stop recording
5. Buscar "Composite Layers"
6. ✅ Debe haber SOLO 1 capa con blur (el Wall)
7. ❌ El backdrop NO debe aparecer en composite layers
```

**Por qué importa:**
- Blur duplicado = 2x GPU usage
- Performance drop en dispositivos de gama media/baja
- Potencial jank visual (frames dropped)

---

### 4. RESPONSIVE TESTING

#### Desktop (>1024px)
```
✅ Checklist:
- [ ] Modal tiene clip-path con diagonales
- [ ] Layout horizontal (45% media + 55% content)
- [ ] Scroll interno solo en columna derecha
- [ ] Padding left: 4rem (pl-16) en contenido
- [ ] Todas las animaciones activas
```

#### Tablet (768px - 1024px)
```
✅ Checklist:
- [ ] Modal SIN clip-path en container
- [ ] Layout vertical (stack)
- [ ] Media gallery con aspect 45vh
- [ ] Scroll en todo el contenedor
- [ ] Animaciones adaptadas a vertical
```

#### Mobile (<768px)
```
✅ Checklist:
- [ ] Modal SIN clip-path en container
- [ ] Media gallery con aspect 4:5
- [ ] Media gallery CON clip-path móvil (diagonal inferior)
- [ ] Scroll completo
- [ ] Swipe gestures funcionales
```

**Herramienta:**
- Chrome DevTools → Device Toolbar (Cmd+Shift+M)
- Probar: iPhone 12 Pro, iPad Pro, Desktop HD

---

### 5. INTERACTION TESTING

#### A. Keyboard Navigation
```
✅ Test Flow:
1. Abrir modal (click en tile)
2. Presionar Tab
   - ✅ Focus debe ir al botón X
3. Presionar Arrow Right
   - ✅ Debe navegar al siguiente evento
   - ✅ CircularNavButton derecho debe mostrar feedback visual
4. Presionar Arrow Left
   - ✅ Debe navegar al evento anterior
   - ✅ CircularNavButton izquierdo debe mostrar feedback visual
5. Presionar Escape
   - ✅ Debe cerrar el modal
   - ✅ Focus debe volver al tile original
```

#### B. Mouse/Touch Gestures
```
✅ Desktop:
- [ ] Click en backdrop cierra modal
- [ ] Click en X cierra modal
- [ ] Hover en X muestra escala 1.1
- [ ] Click en flechas navega eventos
- [ ] Hover en flechas muestra feedback

✅ Mobile:
- [ ] Tap en backdrop cierra modal
- [ ] Tap en X cierra modal
- [ ] Swipe izquierda → siguiente evento
- [ ] Swipe derecha → evento anterior
- [ ] Pull to close (pendiente implementación)
```

#### C. Focus Trap
```
✅ Test:
1. Abrir modal
2. Presionar Tab repetidamente
3. ✅ Focus debe quedarse DENTRO del modal
4. ✅ No debe saltar a elementos del Wall de fondo
5. Cerrar modal (Escape)
6. ✅ Focus debe volver al elemento que abrió el modal
```

---

### 6. PERFORMANCE TESTING

#### A. FPS Monitoring (Chrome DevTools)

**Setup:**
1. Abrir Chrome DevTools → Performance
2. Enable "Screenshots" checkbox
3. Enable FPS meter: Cmd+Shift+P → "Show FPS meter"

**Test:**
1. Click Record
2. Abrir modal
3. Navegar entre eventos (arrow keys)
4. Cerrar modal
5. Stop Recording

**Criterios de éxito:**
- ✅ **FPS:** 60fps constante (verde en el gráfico)
- ✅ **Frame time:** <16.7ms (60fps = 1000ms/60)
- ❌ **Red bars:** Indicador de jank (debe evitarse)
- ✅ **GPU rasterization:** Activo (verde en Layers)

---

#### B. Memory Leak Testing

**Test prolongado:**
1. Abrir modal → Cerrar modal (repeat 20 veces)
2. Chrome DevTools → Memory
3. Take heap snapshot
4. Repeat modal open/close 20 veces más
5. Take another heap snapshot
6. Compare snapshots

**Criterios de éxito:**
- ✅ **Detached DOM nodes:** 0 (no memory leaks)
- ✅ **Event listeners:** Se limpian al cerrar modal
- ✅ **Memory usage:** Estable (no crece indefinidamente)

**Common leaks to watch:**
- useEffect sin cleanup
- Event listeners sin removeEventListener
- Referencias a DOM nodes destruidos

---

#### C. Network Performance

**Test:**
1. Chrome DevTools → Network
2. Throttle to "Fast 3G"
3. Abrir modal con múltiples imágenes

**Criterios de éxito:**
- ✅ **Eager loading:** Imágenes críticas cargan primero
- ✅ **Lazy loading:** Imágenes periféricas cargan después
- ✅ **srcSet:** Diferentes resoluciones según viewport
- ✅ **WebP format:** Imágenes optimizadas a WebP (70% lighter)

---

### 7. ACCESSIBILITY TESTING

#### A. Screen Reader (VoiceOver - Mac)
```
Setup: Cmd+F5 (activar VoiceOver)

✅ Test Flow:
1. Navegar al Wall
2. ✅ VoiceOver lee: "Grid of event tiles"
3. Click en tile
4. ✅ VoiceOver lee: "Dialog opened, [Event Title]"
5. Navegar con VO+Arrow
6. ✅ VoiceOver lee todos los elementos en orden lógico
7. Presionar Escape
8. ✅ VoiceOver lee: "Dialog closed"
```

#### B. ARIA Compliance
```
Herramienta: axe DevTools (Chrome extension)

✅ Checklist:
- [ ] role="dialog" en modal container
- [ ] aria-modal="true" en modal container
- [ ] aria-label en botones (X, arrows)
- [ ] Headings jerárquicos (h1, h2, h3)
- [ ] Alt text en imágenes
- [ ] Focus management correcto
```

#### C. Color Contrast
```
Herramienta: Chrome DevTools → Lighthouse → Accessibility

✅ Verificar:
- [ ] Texto blanco sobre negro: WCAG AAA (21:1)
- [ ] Texto gris sobre negro: WCAG AA mínimo (4.5:1)
- [ ] Botones con hover: Contraste suficiente
```

---

### 8. CROSS-BROWSER TESTING

#### A. Chrome/Edge (Chromium)
```
✅ Expected:
- Todas las animaciones smooth
- fetchPriority funcional
- GPU acceleration activo
- Motion/React 100% compatible
```

#### B. Safari (WebKit)
```
⚠️ Watch out:
- clip-path puede tener pequeñas diferencias de rendering
- backdrop-filter tiene soporte completo desde Safari 9
- Verificar zoom en iOS Safari (puede comportarse diferente)

✅ Test específico:
- iPad Pro (Safari)
- iPhone 12 Pro (Safari)
- macOS Safari (latest)
```

#### C. Firefox (Gecko)
```
⚠️ Watch out:
- fetchPriority no soportado (graceful degradation)
- Motion/React puede tener ligeras diferencias de easing

✅ Test:
- Animaciones deben verse fluidas igualmente
- Fallback a loading="eager" sin fetchPriority
```

---

### 9. EDGE CASES

#### A. Eventos sin Galería
```
Test: Evento con solo 1 imagen (sin gallery)

✅ Verificar:
- [ ] Imagen de portada se muestra
- [ ] NO hay flechas de navegación de galería
- [ ] NO hay progress indicators (dots)
- [ ] Animaciones funcionan igual
```

#### B. Texto Muy Largo
```
Test: Evento con descripción de 1000+ caracteres

✅ Verificar:
- [ ] Scroll aparece en columna derecha
- [ ] Media gallery permanece sticky
- [ ] No hay overflow horizontal
- [ ] Animación de entrada no se corta
```

#### C. Sin Logo
```
Test: Evento sin logo (solo texto de marca)

✅ Verificar:
- [ ] Texto del brand se muestra en su lugar
- [ ] Mismo tamaño y peso visual que logo
- [ ] Animación slideFromLeft funciona igual
```

---

### 10. REGRESSION TESTING

**Antes de deploy, verificar que NO se rompió:**

```
✅ Wall Background:
- [ ] Tiles siguen visibles (con blur cuando modal abierto)
- [ ] Parallax del Wall sigue funcionando
- [ ] Hover en tiles funciona (gradient overlay)

✅ Modal Anterior (Mobile):
- [ ] Funcionalidad mobile intacta
- [ ] Clip-path mobile correcto
- [ ] Swipe gestures funcionan

✅ Navegación Global:
- [ ] CircularNavButtons funcionan
- [ ] Keyboard navigation (arrows)
- [ ] Deep linking preservado

✅ Performance:
- [ ] No degradación de FPS
- [ ] No memory leaks nuevos
- [ ] Network requests optimizados
```

---

## 🎓 DEBUGGING TIPS

### Animaciones Muy Rápidas (No se ven)
```typescript
// Temporal: Aumentar duración para debugging
const DURATION = 2; // En vez de 0.4

// Temporal: Aumentar stagger
staggerChildren: 0.3 // En vez de 0.06
```

### Ver Composite Layers
```
Chrome DevTools → More Tools → Layers
✅ Verde = GPU-accelerated
❌ Gris = Software rendering (slow)
```

### Detectar Repaints
```
Chrome DevTools → Rendering → Paint flashing
✅ Mínimo verde = Bueno
❌ Mucho verde = Repaints excesivos (optimizar)
```

### Ver Easing Curve
```
Website: cubic-bezier.com
Input: .16, 1, .3, 1
✅ Ver visualmente el easing curve
```

---

## 📊 TESTING SCORECARD

```
┌──────────────────────────────────────────┐
│ Modal V2.0 Testing Scorecard             │
├──────────────────────────────────────────┤
│ Visual:              ✅ [ ] [ ] [ ] [ ]  │
│ Animation:           ✅ [ ] [ ] [ ] [ ]  │
│ Blur:                ✅ [ ] [ ] [ ] [ ]  │
│ Responsive:          ✅ [ ] [ ] [ ] [ ]  │
│ Interaction:         ✅ [ ] [ ] [ ] [ ]  │
│ Performance:         ✅ [ ] [ ] [ ] [ ]  │
│ Accessibility:       ✅ [ ] [ ] [ ] [ ]  │
│ Cross-Browser:       ✅ [ ] [ ] [ ] [ ]  │
│ Edge Cases:          ✅ [ ] [ ] [ ] [ ]  │
│ Regression:          ✅ [ ] [ ] [ ] [ ]  │
├──────────────────────────────────────────┤
│ Total Score:         __/10               │
│ Required for Deploy: 10/10 ✅            │
└──────────────────────────────────────────┘
```

---

**Testing Guide Versión:** 2.0  
**Última actualización:** 10 de Diciembre, 2024  
**Próxima revisión:** Post-Mobile Implementation
