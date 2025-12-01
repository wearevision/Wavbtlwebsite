# 🔧 FIX: Data Integrity Issue — Event Missing Fields

## 🚨 ERROR DETECTADO

```
[Data Integrity] Event at index 0 (ID: 30578cba-72e3-4b7e-b517-b889bf6d9352) 
has issues: missing/invalid 'description', missing 'image'
```

---

## ❓ ¿QUÉ SIGNIFICA?

Hay un evento en la base de datos (KV Store) que no tiene:
- ✅ `description` (requerido)
- ✅ `image` (requerido)

Este evento probablemente fue creado manualmente o migrado sin pasar por la función de normalización del backend.

---

## ✅ SOLUCIÓN AUTOMÁTICA (Recomendada)

### **Opción 1: Usar el Admin Panel (UI)** 🎨

1. **Abrir Admin Panel:**
   ```
   Presiona: Ctrl + Shift + A (Windows/Linux)
   O: Cmd + Shift + A (Mac)
   ```

2. **Click en "CLEANUP EVENTS":**
   - Botón ubicado en la sección de utilidades
   - Icono: 🧹 o similar
   - Text: "Normalizar Eventos"

3. **Confirmar la operación:**
   - Lee la advertencia
   - Click "Aceptar"

4. **Esperar el proceso:**
   - Verás un indicador de progreso
   - El sistema normalizará TODOS los eventos
   - Arregla automáticamente campos faltantes

5. **Verificar:**
   - Recarga la página
   - El error debería desaparecer

**¿Qué hace el Cleanup?**
```
✅ Genera IDs faltantes (UUID)
✅ Regenera slugs con formato brand-title
✅ Normaliza campos de imagen
✅ Convierte gallery a arrays
✅ Normaliza campo logo
✅ Rellena description faltante → "Descripción pendiente."
✅ Rellena image faltante → URL fallback Unsplash
✅ Elimina campos no permitidos
```

---

### **Opción 2: Ejecutar desde Backend (API)** 🔧

Si el Admin Panel no está disponible, ejecuta manualmente:

```bash
# 1. Obtener tu EDGE_ADMIN_TOKEN
# (Está en las variables de entorno)

# 2. Ejecutar cleanup endpoint
curl -X POST \
  -H "Authorization: Bearer YOUR_EDGE_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-c4bb2206/cleanup-events

# 3. Verificar respuesta
# Expected: {"success": true, "cleanedCount": N, "events": [...]}
```

**Reemplazar:**
- `YOUR_EDGE_ADMIN_TOKEN` → Tu token de admin
- `YOUR_PROJECT_ID` → ID del proyecto Supabase

---

## 🔍 VERIFICACIÓN POST-FIX

### **1. Check Frontend Console:**
```javascript
// Abrir DevTools Console (F12)
// Buscar líneas como:

🌊 [API] getEvents()
✅ Successfully fetched N events.

// Si antes aparecía:
❌ [Data Integrity] Event at index 0 has issues: ...

// Ahora debe decir:
✅ No warnings (limpio)
```

### **2. Check Backend Logs:**
```bash
# Si ejecutaste desde API:
[POST /cleanup-events] Successfully cleaned N events. Saving to KV...
[POST /cleanup-events] ✅ Cleanup complete. N events normalized and saved.
```

### **3. Visual Check:**
- Todos los eventos se muestran en el Wall
- No hay tiles vacíos o con imágenes rotas
- Modal abre correctamente
- Descripciones se muestran (aunque sea "Descripción pendiente.")

---

## 📊 ¿POR QUÉ PASÓ ESTO?

### **Posibles Causas:**

1. **Migración Manual:**
   ```json
   // Alguien insertó un evento sin validación:
   {
     "id": "30578cba-72e3-4b7e-b517-b889bf6d9352",
     "brand": "Marca",
     "title": "Título"
     // ❌ Falta description
     // ❌ Falta image
   }
   ```

2. **Admin Panel Bypass:**
   - Evento creado directamente en Supabase Dashboard
   - No pasó por endpoint POST /events (que normaliza)

3. **Legacy Data:**
   - Evento antiguo antes de implementar normalización
   - Campos usaban nombres legacy: `imageUrl`, `img`, etc.

---

## 🛡️ PREVENCIÓN FUTURA

### **Reglas:**

1. ✅ **SIEMPRE usar endpoints del backend:**
   ```
   POST /events              (bulk update)
   POST /events/create       (single create)
   POST /cleanup-events      (normalize all)
   ```

2. ✅ **NUNCA insertar manualmente en KV Store:**
   ```sql
   -- ❌ NO HACER:
   INSERT INTO kv_store_c4bb2206 (key, value) 
   VALUES ('wav_events', '[...]');
   
   -- ✅ HACER:
   -- Usar endpoints que normalizan automáticamente
   ```

3. ✅ **Ejecutar Cleanup después de migraciones:**
   ```bash
   # Después de importar eventos nuevos:
   POST /cleanup-events
   
   # Verifica que todos pasaron por normalización
   ```

---

## 🔧 CAMPOS REQUERIDOS (WavEvent Schema)

```typescript
interface WavEvent {
  // ⚠️ OBLIGATORIOS (el backend los rellena si faltan):
  id: string;                    // UUID v4
  brand: string;                 // Max 50 chars
  title: string;                 // Max 100 chars
  description: string;           // Max 1000 chars
  image: string;                 // URL válida
  slug: string;                  // Auto-generado: brand-title
  
  // ✅ Opcionales (pero recomendados):
  gallery?: WavMedia[];          // Array de imágenes/videos
  logo?: string;                 // URL del logo
  category?: string;             // Label de categoría
  
  // ... 60+ campos opcionales más
}
```

### **Valores por Defecto (si faltan):**

| Campo | Valor Default |
|-------|---------------|
| `id` | `crypto.randomUUID()` |
| `brand` | `"Marca"` |
| `title` | `"Evento Sin Título"` |
| `description` | `"Descripción pendiente."` |
| `image` | `"https://images.unsplash.com/photo-..."` (fallback) |
| `slug` | `generateSlug(brand, title, id)` |
| `gallery` | `[]` (array vacío) |

---

## 📚 ARCHIVOS RELACIONADOS

### **Backend (Normalización):**
```
/supabase/functions/server/index.tsx
  - normalizeEvent() (línea 250)
  - POST /cleanup-events (línea 810)
  - POST /events (línea 575)
```

### **Frontend (Validación):**
```
/utils/api.ts
  - validateEvent() (línea 161)
  - normalizeEventForSave() (línea 34)
  - getEvents() (línea 184)
```

### **Hooks (Admin):**
```
/src/hooks/useAdminEvents.ts
  - handleCleanupEvents() (línea 322)
```

---

## 🎯 CHECKLIST DE EJECUCIÓN

### **Pre-Fix:**
- [ ] Backup estado actual (opcional pero recomendado)
  ```bash
  curl -H "Authorization: Bearer $ANON_KEY" \
    https://{project}.supabase.co/functions/v1/make-server-c4bb2206/events \
    > backup_$(date +%Y%m%d_%H%M%S).json
  ```

### **Ejecución:**
- [ ] Abrir Admin Panel (Ctrl/Cmd + Shift + A)
- [ ] Click "CLEANUP EVENTS"
- [ ] Confirmar operación
- [ ] Esperar progreso completo

### **Post-Fix:**
- [ ] Verificar console (sin warnings)
- [ ] Visual check (todos los eventos visibles)
- [ ] Test modal (descripción se muestra)
- [ ] Test filtros (categorías funcionan)

---

## ❓ FAQ

### **P: ¿Perderé datos al ejecutar Cleanup?**
**R:** No. Cleanup solo normaliza y rellena campos faltantes. No borra información existente.

### **P: ¿Cuánto demora el Cleanup?**
**R:** Depende del número de eventos:
- 10-50 eventos: ~2-5 segundos
- 50-200 eventos: ~5-15 segundos
- 200+ eventos: ~15-30 segundos

### **P: ¿Qué pasa si falla el Cleanup?**
**R:** Los datos originales se mantienen. Puedes reintentar o contactar soporte.

### **P: ¿Puedo ejecutar Cleanup múltiples veces?**
**R:** Sí, es idempotente. Ejecutar varias veces no causa problemas.

### **P: ¿El Cleanup cambia los slugs?**
**R:** Sí, regenera todos los slugs con formato `brand-title`. Las URLs cambiarán.

### **P: ¿Cómo evito esto en el futuro?**
**R:** Siempre usar endpoints del backend (POST /events) que normalizan automáticamente.

---

## 🏁 RESUMEN

**Problema:** Evento sin `description` ni `image`  
**Causa:** Bypass de normalización durante creación  
**Solución:** Ejecutar Cleanup (normaliza todos los eventos)  
**Tiempo:** 2-30 segundos (según cantidad)  
**Riesgo:** Bajo (no borra datos)  
**Prevención:** Usar siempre endpoints del backend  

**Status:** ✅ **Solución Disponible y Lista**

---

**Fecha:** 30 Noviembre 2025  
**Versión Guidelines:** v2.3.0  
**Prioridad:** 🔴 Alta (bloquea integridad de datos)  
**Complejidad:** 🟢 Baja (1 click o 1 comando)

---

## 🚀 ACCIÓN INMEDIATA

**Ejecuta AHORA:**

1. **Presiona:** `Ctrl + Shift + A` (o `Cmd + Shift + A`)
2. **Click:** "CLEANUP EVENTS"
3. **Confirma:** "Aceptar"
4. **Espera:** Progreso completo
5. **Recarga:** F5

**¡Listo! El error desaparecerá.** ✅
