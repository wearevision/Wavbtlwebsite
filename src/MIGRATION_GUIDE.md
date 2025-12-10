# 🔥 Guía de Migración de Assets - WAV BTL

## ✅ PROBLEMA RESUELTO:
El botón "🔥 MIGRAR ASSETS 🔥" ahora está visible en AdminPanel (posición #2, después de "Nuevo Evento").

## 📋 PRE-REQUISITOS ANTES DE MIGRAR:

### 1. **Bucket "events" debe existir en Supabase Storage**
El servidor ahora crea automáticamente el bucket `events` (público) al iniciar.

### 2. **Los archivos de imágenes deben estar subidos a Supabase Storage**
Cada evento debe tener sus imágenes en la siguiente estructura:

```
Supabase Storage → Bucket "events" → Carpetas por evento:

events/
  ├── evento-1-id/
  │   ├── gallery_01.webp
  │   ├── gallery_02.webp
  │   └── gallery_03.webp
  ├── evento-2-id/
  │   ├── gallery_01.webp
  │   └── gallery_02.webp
  └── evento-3-id/
      └── gallery_01.webp
```

**IMPORTANTE:** 
- Los archivos DEBEN llamarse `gallery_01.webp`, `gallery_02.webp`, etc.
- El primer archivo (`gallery_01.webp`) se convertirá en `event.image`
- Los demás archivos se agregarán al array `event.gallery`

### 3. **Verificar que los eventos tengan `id` único**
Cada evento en KV Store debe tener un campo `id` que coincida con el nombre de la carpeta en Storage.

---

## 🚀 CÓMO USAR LA MIGRACIÓN:

### Paso 1: Sube las imágenes a Supabase Storage
1. Ve a **Supabase Dashboard** → **Storage**
2. Selecciona el bucket **"events"**
3. Para cada evento, crea una carpeta con el ID del evento
4. Sube los archivos renombrados como `gallery_01.webp`, `gallery_02.webp`, etc.

### Paso 2: Ejecuta la migración desde Admin
1. Ve a **btl.wearevision.cl/admin**
2. Login
3. Click en el botón **"🔥 MIGRAR ASSETS 🔥"** (posición #2)
4. En el modal, click **"Iniciar Migración"**
5. Observa los logs en tiempo real

### Paso 3: Verifica los resultados
El modal mostrará:
- ✅ **Migrados:** Eventos actualizados correctamente
- ⚠️ **Omitidos:** Eventos que ya tenían URLs de Supabase o no tenían `figma:asset`
- ❌ **Errores:** Eventos sin carpeta o sin archivos en Storage

---

## 🔧 MEJORAS IMPLEMENTADAS:

### 1. **Mejor manejo de errores**
- Logs detallados en consola del navegador
- Mensajes de error específicos en el modal
- Stack traces para debugging

### 2. **Bucket "events" auto-creado**
- El servidor crea automáticamente el bucket al iniciar
- Configurado como **PÚBLICO** (necesario para OpenGraph/SEO)
- Límite de 50MB por archivo

### 3. **Validación de estructura**
- Verifica que exista la carpeta del evento
- Verifica que existan archivos `gallery_*.webp`
- Ordena alfabéticamente para asegurar orden correcto

---

## 🐛 TROUBLESHOOTING:

### Error: "No files found in events/{eventId}/"
**Causa:** La carpeta del evento no existe o está vacía.
**Solución:** Sube al menos un archivo `gallery_01.webp` a la carpeta.

### Error: "No gallery_*.webp files found"
**Causa:** Los archivos no siguen el patrón `gallery_*.webp`.
**Solución:** Renombra los archivos a `gallery_01.webp`, `gallery_02.webp`, etc.

### Error: "Error listing files: ..."
**Causa:** Problema de permisos o bucket no existe.
**Solución:** 
1. Verifica que el bucket "events" exista
2. Verifica que sea PÚBLICO
3. Redeploy el servidor para auto-crear el bucket

### Error: "HTTP 401: Unauthorized"
**Causa:** Token de auth expirado o inválido.
**Solución:** Cierra sesión y vuelve a iniciar sesión en Admin.

---

## 📊 FLUJO COMPLETO:

```
1. Evento en KV Store (tiene figma:asset)
   ↓
2. Script busca carpeta events/{evento.id}/ en Storage
   ↓
3. Lista archivos gallery_*.webp
   ↓
4. Genera URLs públicas:
   - gallery_01.webp → event.image
   - gallery_02.webp+ → event.gallery[...]
   ↓
5. Actualiza evento en KV Store
   ↓
6. Frontend muestra URLs de Supabase
```

---

## ✨ RESULTADO FINAL:

Antes:
```json
{
  "image": "figma:asset/abc123.png",
  "gallery": []
}
```

Después:
```json
{
  "image": "https://xxx.supabase.co/storage/v1/object/public/events/evento-1/gallery_01.webp",
  "imagePath": "evento-1/gallery_01.webp",
  "gallery": [
    {
      "id": "uuid-1",
      "type": "image",
      "url": "https://xxx.supabase.co/storage/v1/object/public/events/evento-1/gallery_02.webp",
      "path": "evento-1/gallery_02.webp"
    },
    {
      "id": "uuid-2",
      "type": "image",
      "url": "https://xxx.supabase.co/storage/v1/object/public/events/evento-1/gallery_03.webp",
      "path": "evento-1/gallery_03.webp"
    }
  ]
}
```

---

**¿Necesitas ayuda?** Revisa los logs en:
1. Console del navegador (F12)
2. Supabase Dashboard → Functions → Logs
