# 🔧 FIX: Navegación Modal + Tiles No Clickeables

**Versión:** v2.3.1  
**Fecha:** 30 de Noviembre, 2025  
**Problema:** Navegación modal salta fuera del filtro + Tiles no clickeables

---

## ✅ PROBLEMA 1: Navegación con Filtros (FIXED)

### Comportamiento Incorrecto (Antes)

Cuando se selecciona un filtro de categoría:
1. El mosaico muestra solo 10 eventos de "Activaciones de Marca"
2. Usuario abre un evento del modal
3. Usuario presiona flecha → para ir al siguiente
4. **El modal salta a un evento de otra categoría** (que no está visible en el mosaico)
5. Usuario sigue navegando y llega a un punto donde no hay ningún modal visible

**Causa:** Las funciones `handleNextEvent` y `handlePrevEvent` navegaban usando el array completo `events` en vez de `filteredEvents`.

---

### Solución Implementada

**Archivo:** `/App.tsx` (líneas 269-284)

```tsx
// ❌ ANTES (Incorrecto)
const handleNextEvent = () => {
  if (!selectedEvent || events.length === 0) return;
  const currentIndex = events.findIndex(e => e.id === selectedId);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + 1) % events.length;
  setSelectedId(events[nextIndex].id || null);
};

// ✅ DESPUÉS (Correcto)
const handleNextEvent = () => {
  if (!selectedEvent || filteredEvents.length === 0) return;
  const currentIndex = filteredEvents.findIndex(e => e.id === selectedId);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + 1) % filteredEvents.length;
  setSelectedId(filteredEvents[nextIndex].id || null);
};
```

**Cambios:**
1. ✅ `events` → `filteredEvents` en ambas funciones
2. ✅ Ahora la navegación hace "wrap-around" solo dentro del filtro activo
3. ✅ Si hay 10 eventos filtrados, al llegar al último vuelve al primero del filtro

---

### Comportamiento Correcto (Después)

1. Usuario selecciona "Activaciones de Marca" (10 eventos)
2. Usuario abre evento #5
3. Usuario presiona flecha → 5 veces
4. Llega al evento #10 (último del filtro)
5. Usuario presiona flecha → nuevamente
6. **Vuelve al evento #1 del filtro** ✅ (wrap-around)

---

## ❌ PROBLEMA 2: Tiles No Clickeables (DIAGNÓSTICO)

### Síntomas

- Usuario intenta hacer hover sobre un tile → No hay efecto de hover
- Usuario intenta hacer click en un tile → No abre el modal
- El mosaico se ve normal pero está "congelado"

---

### Causas Posibles

#### A) Overlay Invisible Bloqueando

**Sospechoso:** Un `div` con `fixed inset-0` que quedó activo después de cerrar el modal.

**Cómo diagnosticar:**
1. Abrir DevTools (F12)
2. Tab "Elements" / "Inspector"
3. Buscar elementos con `position: fixed` y `inset: 0`
4. Ver si alguno tiene `pointer-events: auto` activo

**Z-index esperados cuando NO hay modal:**
- `z-0` → Mosaico (Wall) ✅ DEBE estar clickeable
- `z-10` → TextRotator (overlay visual, `pointer-events: none`)
- `z-[110]` → Controls (menú hamburguesa)
- `z-[90]` → Backdrop del menú (solo cuando menú está abierto)

**Z-index cuando HAY modal:**
- `z-[60]` → Modal container
- `z-40` → Modal backdrop (black/60, blur-[2px])
- `z-[70]` → Close button

---

#### B) Menú Hamburguesa Quedó Abierto

**Sospechoso:** El backdrop del menú (`z-[90]`) quedó activo.

**Archivo:** `/components/wav/Controls.tsx` (líneas 52-66)

```tsx
{/* Menu Backdrop - ONLY Darken, NO blur */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "fixed inset-0 bg-black/40",
        Z_INDEX.MENU_BACKDROP  // z-[90]
      )}
      onClick={() => setIsOpen(false)}
    />
  )}
</AnimatePresence>
```

**Prueba:**
1. Cerrar el modal (si está abierto)
2. Cerrar el menú hamburguesa (hacer click en X o fuera del menú)
3. Verificar si ahora los tiles son clickeables

---

#### C) Modal No Se Desmontó Correctamente

**Sospechoso:** El modal se cerró visualmente pero el backdrop quedó en el DOM.

**Archivo:** `/components/wav/Modal.tsx` (líneas 94-114)

```tsx
<motion.div
  className={clsx(
    "fixed inset-0 z-[60] flex flex-col",
    "overflow-y-auto",
    "lg:overflow-hidden lg:items-center lg:justify-center"
  )}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* BACKDROP - More subtle and minimal */}
  <motion.div
    className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
```

**AnimatePresence en App.tsx debe estar configurado correctamente:**

```tsx
{/* Modal Overlay */}
<AnimatePresence mode="wait">
  {selectedId && selectedEvent && (
    <Modal 
      key={selectedId}
      event={selectedEvent} 
      onClose={() => setSelectedId(null)} 
      isMobile={isMobile}
      onNext={handleNextEvent}
      onPrev={handlePrevEvent}
    />
  )}
</AnimatePresence>
```

**Verificar:**
- ✅ `mode="wait"` está presente
- ✅ `key={selectedId}` fuerza remontaje en cada evento
- ✅ Cuando `selectedId` es `null`, el modal NO debe estar en el DOM

---

### Pasos de Diagnóstico (Para el Usuario)

**Paso 1:** Verificar DevTools

```bash
# 1. Abrir DevTools (F12)
# 2. Tab "Elements"
# 3. Buscar en el DOM:
#    - Elementos con class="fixed inset-0"
#    - Verificar si tienen z-index alto (z-[60], z-[90], etc.)
#    - Ver si alguno tiene display: block o opacity > 0
```

**Paso 2:** Verificar Console

```bash
# 1. Tab "Console"
# 2. Buscar errores rojos
# 3. Buscar warnings de React
# 4. ¿Hay algún error de "Cannot read property of null"?
```

**Paso 3:** Forzar Refresco

```bash
# 1. Cerrar modal (si está abierto)
# 2. Cerrar menú (si está abierto)
# 3. Hacer Ctrl/Cmd + R (hard refresh)
# 4. Verificar si los tiles ahora son clickeables
```

**Paso 4:** Verificar Network Tab

```bash
# 1. Tab "Network"
# 2. Filtrar por "Fetch/XHR"
# 3. Verificar que GET /events retorna datos
# 4. ¿El response tiene estructura correcta?
```

---

### Fix Temporal (Si el problema persiste)

**Agregar un botón de emergencia para limpiar el estado:**

```tsx
// En App.tsx, agregar:

const handleEmergencyReset = () => {
  setSelectedId(null);
  setSelectedCategory(null);
  // Forzar remontaje del Wall
  window.location.reload();
};

// Agregar botón temporal (solo para debug):
<button
  onClick={handleEmergencyReset}
  className="fixed top-4 right-4 z-[200] px-4 py-2 bg-red-500 text-white rounded"
>
  Emergency Reset
</button>
```

---

## 📊 Checklist de Verificación

Cuando el modal está CERRADO:

- [ ] No hay elementos con `fixed inset-0` y `z-index > 20` en el DOM
- [ ] TextRotator tiene `pointer-events: none`
- [ ] Wall tiene `z-0` y NO tiene overlay encima
- [ ] Hover sobre tiles muestra escala 110% y color
- [ ] Click en tile abre el modal correctamente

Cuando el modal está ABIERTO:

- [ ] Backdrop tiene `z-[60]` o menos
- [ ] Modal content tiene `z-[60]`
- [ ] Close button tiene `z-[70]`
- [ ] Flechas de navegación funcionan dentro del filtro activo
- [ ] Presionar ESC cierra el modal

Cuando el menú está ABIERTO:

- [ ] Backdrop del menú tiene `z-[90]`
- [ ] Dropdown del menú tiene `z-[100]`
- [ ] Controls tienen `z-[110]`
- [ ] Click fuera del menú lo cierra

---

## 🎯 Próximos Pasos

1. **Usuario:** Hacer diagnóstico con DevTools
2. **Usuario:** Reportar qué encuentra en el inspector
3. **Dev:** Implementar fix específico basado en hallazgos

---

*Documento creado el 30/11/2025*  
*Fix para: Navegación modal + Tiles bloqueados*  
*Sistema: WAV BTL v2.3.1*
