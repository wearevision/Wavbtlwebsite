# Sistema de Normalización Automática de Eventos WAV BTL

## 📋 Resumen

Todos los eventos se normalizan **automáticamente** antes de guardarse en Supabase KV, garantizando que cumplan con el schema `WavEvent` sin intervención manual.

## ✅ Transformaciones Automáticas

### 1. **Generación de ID**
- Si falta `id` o está vacío → Se genera un **UUID v4** automáticamente
- Ejemplo: `"550e8400-e29b-41d4-a716-446655440000"`

### 2. **Normalización de Imagen**
Detecta y renombra campos de imagen automáticamente:
- `img` → `image`
- `imgUrl` → `image`
- `imageUrl` → `image`
- `imgURL` → `image`

Si no hay imagen válida, se usa un **fallback SVG placeholder** (gris con texto "Sin Imagen").

### 3. **Generación de Slug**
- Si falta `slug` → Se genera automáticamente desde el `title` en formato **kebab-case**
- Ejemplo: `"Neón Corporativo Banco Chile"` → `"neon-corporativo-banco-chile"`
- Si ya existe el slug, se formatea correctamente (minúsculas, sin espacios, sin caracteres especiales)

### 4. **Normalización de Gallery**
- Si `gallery` está **vacío** o no existe → `[]` (array vacío)
- Si `gallery` es un **string** (ej. URLs separadas por coma) → Se convierte a **array de objetos**
- Cada item del gallery debe tener: `{ id, type, url }`

### 5. **Validación de Tipos**
Todos los campos obligatorios deben ser **strings**:
- `id` (string UUID)
- `brand` (string, default: `"Marca"`)
- `title` (string, default: `"Evento Sin Título"`)
- `description` (string, default: `"Descripción pendiente."`)
- `image` (string URL, default: fallback de Unsplash)
- `slug` (string kebab-case)
- `gallery` (array, default: `[]`)

### 6. **Eliminación de Campos No Permitidos**
Solo se guardan los siguientes campos:
- **Obligatorios**: `id`, `brand`, `title`, `description`, `image`, `slug`, `gallery`
- **Opcionales**: `logo`, `logoUrl`, `logoPath`, `imagePath`, `updatedAt`

Cualquier otro campo se **elimina automáticamente**.

## 🔄 Flujo de Normalización

### Frontend → Backend
```
1. Usuario edita evento en AdminPanel
2. Frontend normaliza el evento (utils/api.ts → normalizeEventForSave)
3. Evento normalizado se envía al servidor
4. Backend normaliza nuevamente (garantía de seguridad)
5. Backend valida uniqueness de ID y slug
6. Backend guarda en KV store
7. Frontend recibe confirmación
```

### Ejemplo de Transformación

**ANTES (datos del usuario):**
```json
{
  "title": "Neón Corporativo Banco Chile",
  "brand": "Banco Chile",
  "description": "Evento corporativo con iluminación neón",
  "imgUrl": "https://example.com/neon.jpg",
  "galleryUrl": "https://img1.jpg, https://img2.jpg"
}
```

**DESPUÉS (normalizado automáticamente):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Neón Corporativo Banco Chile",
  "brand": "Banco Chile",
  "description": "Evento corporativo con iluminación neón",
  "image": "https://example.com/neon.jpg",
  "slug": "neon-corporativo-banco-chile",
  "gallery": [],
  "updatedAt": "2025-11-26T10:30:00.000Z"
}
```

## 🛠️ Archivos Modificados

### Backend (Supabase Edge Function)
- `/supabase/functions/server/index.tsx`
  - Función `normalizeEvent()` centralizada
  - Integrada en `POST /events`
  - Integrada en `POST /cleanup-events`

### Frontend (React/TypeScript)
- `/utils/api.ts`
  - Función `normalizeEventForSave()` (espejo del backend)
  - Integrada en `saveEvents()` automáticamente

## 📊 Logs del Sistema

### Consola del Navegador (Frontend)
```
[Frontend Normalize] Generated new UUID: abc-123 for event: Mi Evento
[Frontend Normalize] Generated slug from title: "Mi Evento" → "mi-evento"
[saveEvents] Normalizing 5 events before saving...
[saveEvents] ✅ Server confirmed save: 5 events saved.
```

### Consola del Servidor (Edge Function)
```
[POST /events] Received 5 events. Starting normalization...
[Normalize] Generated new UUID: xyz-789 for event: Evento Sin ID
[POST /events] Successfully normalized 5 events. Saving to KV...
[POST /events] ✅ Saved 5 events to KV store.
```

## 🚀 Ventajas

1. **Sin errores de validación**: Los datos siempre cumplen con `WavEvent`
2. **Sin fallbacks en el frontend**: El muro siempre se renderiza correctamente
3. **Migración automática**: Los datos legacy se limpian al guardar
4. **Debugging mejorado**: Logs detallados en cada paso
5. **Seguridad**: Doble capa de validación (frontend + backend)

## ⚠️ Notas Importantes

- La normalización es **automática** y **transparente**
- No requiere cambios en el flujo del AdminPanel
- Los eventos existentes se normalizarán la próxima vez que se guarden
- Para limpiar eventos legacy manualmente: usar endpoint `POST /cleanup-events`

## 🔧 Endpoint de Limpieza Manual

Si tienes eventos legacy en KV que necesitan limpieza:

```bash
curl -X POST https://[PROJECT_ID].supabase.co/functions/v1/make-server-c4bb2206/cleanup-events \
  -H "Authorization: Bearer [YOUR_TOKEN]"
```

Esto normalizará todos los eventos en KV sin perder datos.

## 📝 Schema Definitivo WavEvent

```typescript
interface WavEvent {
  // OBLIGATORIOS
  id: string;           // UUID v4
  brand: string;        // Nombre de marca
  title: string;        // Título del evento
  description: string;  // Descripción completa
  image: string;        // URL de imagen principal (Supabase Storage)
  slug: string;         // URL-friendly slug (kebab-case)
  gallery: WavMedia[];  // Array de media (puede estar vacío)

  // OPCIONALES
  logo?: string;        // URL del logo
  logoUrl?: string;     // URL alternativa del logo
  logoPath?: string;    // Path en Supabase Storage
  imagePath?: string;   // Path de imagen en Storage
  updatedAt?: string;   // ISO timestamp de última actualización
}

interface WavMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  path?: string;
  thumbnail?: string;
}
```

---

**Última actualización:** 26 de noviembre, 2025  
**Sistema de normalización:** v1.0  
**Estado:** ✅ Activo en producción