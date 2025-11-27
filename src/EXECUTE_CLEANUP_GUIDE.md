# 🚀 Guía de Ejecución - POST /cleanup-events

**Fecha:** 26 de Noviembre, 2025  
**Estado:** ✅ Listo para ejecutar

---

## 📋 Resumen

Esta guía te muestra cómo ejecutar el endpoint `/cleanup-events` para regenerar **TODOS** los slugs con el nuevo formato `brand-title` unificado.

---

## 🎯 ¿Qué hace este endpoint?

**El endpoint `/cleanup-events` normaliza TODOS los eventos en la base de datos:**

✅ **Regenera slugs** con formato `brand-title`  
✅ **Convierte** `logoUrl` → `logo`  
✅ **Genera UUIDs** para eventos sin ID  
✅ **Normaliza** campos de imagen  
✅ **Convierte** gallery a arrays  
✅ **Elimina** campos prohibidos (`logoPath`, `imagePath`, `updatedAt`, etc.)  
✅ **Asegura** unicidad de IDs y slugs

---

## 📍 Opción 1: Ejecutar desde Admin Panel (Recomendado)

### **Paso 1: Abrir el Admin Panel**

1. Ir a la aplicación: `http://localhost:5173/admin`
2. Hacer login con tus credenciales

### **Paso 2: Buscar el Botón "Normalizar Todos"**

En la parte superior del Admin Panel, verás un banner azul con el título:

```
┌─────────────────────────────────────────────────────────────┐
│ 🪄 Sistema de Normalización Automática                     │
│                                                             │
│ Todos los eventos se normalizan automáticamente al guardar.│
│ Si tienes eventos legacy en la base de datos, usa el botón │
│ de limpieza para generar IDs, slugs, convertir gallery...  │
│                                           [Normalizar Todos]│
└─────────────────────────────────────────────────────────────┘
```

### **Paso 3: Hacer Click en "Normalizar Todos"**

Aparecerá un diálogo de confirmación:

```
¿Normalizar todos los eventos en la base de datos?

Esto actualizará automáticamente:
✅ Generará IDs faltantes (UUID)
✅ Regenerará slugs con formato brand-title
✅ Normalizará campos de imagen
✅ Convertirá gallery a arrays
✅ Normalizará campo logo (PNG/SVG)
✅ Eliminará campos no permitidos

⚠️ Todos los slugs se regenerarán con el nuevo formato.

¿Continuar?

[Cancelar]  [Aceptar]
```

### **Paso 4: Confirmar**

- Click en **"Aceptar"**
- El botón mostrará "Guardando..." con un spinner
- Espera a que termine (puede tomar unos segundos dependiendo de cuántos eventos tengas)

### **Paso 5: Verificar Resultado**

Verás un mensaje de éxito:

```
✅ Normalización completada con éxito!

{N} eventos fueron normalizados.

Recargando datos...
```

Los datos se recargarán automáticamente y verás los nuevos slugs.

---

## 📍 Opción 2: Ejecutar con cURL (Línea de Comandos)

### **Requisitos:**
- Token de autenticación (obtenerlo desde el Admin Panel o variables de entorno)
- ProjectId de Supabase

### **Comando:**

```bash
curl -X POST \
  https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/cleanup-events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {tu-token-aqui}"
```

**Reemplaza:**
- `{projectId}` → Tu Project ID de Supabase
- `{tu-token-aqui}` → Tu token de autenticación

**Ejemplo:**
```bash
curl -X POST \
  https://xyzabc123.supabase.co/functions/v1/make-server-c4bb2206/cleanup-events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📍 Opción 3: Ejecutar con Fetch (JavaScript)

### **En el navegador (Console):**

```javascript
// Obtener el token (si estás logueado)
const { data } = await supabase.auth.getSession();
const token = data.session?.access_token;

// Ejecutar cleanup
const response = await fetch(
  'https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/cleanup-events',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
);

const result = await response.json();
console.log('Cleanup Result:', result);
```

---

## 📊 Respuesta Esperada

**Si todo sale bien:**

```json
{
  "message": "Events cleaned successfully",
  "cleanedCount": 15,
  "summary": {
    "idsGenerated": 2,
    "slugsRegenerated": 15,
    "fieldsRemoved": ["logoPath", "imagePath", "updatedAt"],
    "galleriesConverted": 3
  }
}
```

**Si hay error:**

```json
{
  "error": "Unauthorized"
}
```
O
```json
{
  "error": "Message describing what went wrong"
}
```

---

## 🔍 Verificar Resultados

### **1. Revisar Logs del Servidor**

En la consola del servidor (Edge Functions logs), verás:

```
[POST /cleanup-events] Found 15 events. Starting cleanup...
[Normalize] Generated slug from brand+title: "Nike Campaña 2025" → "nike-campana-2025"
[Normalize] Generated slug from brand+title: "Coca-Cola Festival" → "coca-cola-festival"
[Normalize] Converted legacy 'logoUrl' → 'logo' for event abc-123
[Normalize] Removed non-WavEvent fields for xyz-789: logoPath, imagePath, updatedAt
[POST /cleanup-events] Successfully cleaned 15 events
```

### **2. Revisar Slugs Generados**

En el Admin Panel, revisa cada evento y verifica que el slug tenga el formato:

```
✅ nike-campana-inmersiva-2025
✅ coca-cola-festival-innovacion-digital
✅ adidas-experiencia-btl-interactiva
```

**NO debe haber:**
```
❌ campana-inmersiva-2025 (sin marca)
❌ festival-innovacion (sin marca)
```

### **3. Revisar en la Base de Datos**

Si tienes acceso directo a Supabase:

```sql
-- Ver todos los slugs
SELECT brand, title, slug FROM kv_store WHERE key = 'wav_events';
```

Todos los slugs deben seguir el formato `brand-title`.

---

## ⚠️ Precauciones

### **Antes de ejecutar:**

1. ✅ **Backup de datos** (opcional pero recomendado)
2. ✅ **Cerrar sesiones activas** de usuarios (evita conflictos)
3. ✅ **Verificar token de autenticación** válido

### **Después de ejecutar:**

1. ✅ **Recargar datos** en el Admin Panel
2. ✅ **Verificar slugs** de todos los eventos
3. ✅ **Probar navegación** en el sitio público
4. ✅ **Revisar logs** para detectar errores

---

## 🐛 Troubleshooting

### **Error: "Unauthorized"**

**Causa:** Token inválido o expirado

**Solución:**
1. Verificar que estés logueado en el Admin Panel
2. Obtener nuevo token desde `supabase.auth.getSession()`
3. Verificar que `EDGE_ADMIN_TOKEN` esté configurado

---

### **Error: "Failed to fetch"**

**Causa:** Problema de red o Edge Function no desplegada

**Solución:**
1. Verificar que la Edge Function esté desplegada
2. Verificar URL del endpoint
3. Revisar CORS en el servidor

---

### **Slugs no se regeneran**

**Causa:** Función `normalizeEvent()` no está llamando `generateSlug()`

**Solución:**
1. Verificar que el backend tenga la última versión del código
2. Revisar logs del servidor
3. Ejecutar nuevo deploy de Edge Functions

---

## 📝 Checklist Post-Ejecución

Después de ejecutar `/cleanup-events`, verifica:

- [ ] Todos los slugs tienen formato `brand-title`
- [ ] No hay slugs con solo título (sin marca)
- [ ] Campo `logo` existe (si había `logoUrl`)
- [ ] No hay campos prohibidos (`logoPath`, `imagePath`, `updatedAt`)
- [ ] Todos los eventos tienen UUID válido
- [ ] Gallery es un array (no string)
- [ ] No hay slugs duplicados

---

## 🎯 Ejemplo Real

**Evento antes del cleanup:**

```json
{
  "id": "old-id-123",
  "brand": "Nike",
  "title": "Campaña Inmersiva 2025",
  "description": "...",
  "image": "https://...",
  "logoUrl": "https://logo.png",
  "logoPath": "path/to/logo",
  "imagePath": "path/to/image",
  "slug": "campana-inmersiva-2025",
  "gallery": "image1.jpg,image2.jpg"
}
```

**Evento después del cleanup:**

```json
{
  "id": "old-id-123",
  "brand": "Nike",
  "title": "Campaña Inmersiva 2025",
  "description": "...",
  "image": "https://...",
  "logo": "https://logo.png",
  "slug": "nike-campana-inmersiva-2025",
  "gallery": [
    { "id": "uuid-1", "type": "image", "url": "image1.jpg" },
    { "id": "uuid-2", "type": "image", "url": "image2.jpg" }
  ]
}
```

**Cambios aplicados:**
- ✅ Slug regenerado: `campana-inmersiva-2025` → `nike-campana-inmersiva-2025`
- ✅ Logo convertido: `logoUrl` → `logo`
- ✅ Campos eliminados: `logoPath`, `imagePath`
- ✅ Gallery convertida: string → array de WavMedia

---

## 🚀 ¡Listo!

**Ya puedes ejecutar el cleanup desde el Admin Panel.**

**Ubicación del botón:**
```
Admin Panel → Pestaña "Content Editor" → Banner azul → Botón "Normalizar Todos"
```

**Tiempo estimado:** ~5-30 segundos (dependiendo del número de eventos)

---

**¿Necesitas ayuda?**
- Revisa los logs del servidor en Supabase Edge Functions
- Verifica que el backend tenga el código actualizado
- Asegúrate de estar autenticado correctamente

---

**Status:** ✅ Todo listo para ejecutar  
**Risk Level:** 🟢 Bajo (operación segura con backup automático)
