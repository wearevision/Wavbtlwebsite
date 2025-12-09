# 🔧 Solución del Error 401 en Sitemap

## 🚨 Problema Identificado

Google Search Console reportaba:
```
Error: "Sitemap is HTML"
Status: 1 error
Message: "Your Sitemap appears to be an HTML page. Please use a supported sitemap format instead."
```

Al acceder a la URL del sitemap directamente:
```json
{
  "code": 401,
  "message": "Missing authorization header"
}
```

### Causa Raíz

**Supabase Edge Functions require JWT authentication by default** para todas las rutas, incluso las públicas. Aunque nuestro código Hono no tenía middleware de autenticación en las rutas del sitemap, **Supabase interceptaba las solicitudes ANTES de que llegaran a nuestro código**.

El endpoint `/make-server-c4bb2206/sitemap.xml` estaba protegido por la infraestructura de Supabase, requiriendo un header `Authorization: Bearer <token>`, lo cual es incompatible con cómo funcionan los crawlers de Google (que NO envían tokens JWT).

---

## ✅ Solución Implementada

### 1. Nueva Edge Function Pública

Creamos una Edge Function completamente separada y pública:

```
/supabase/functions/
  ├── server/          # Función actual (protegida, requiere auth)
  └── sitemap/         # NUEVA función PÚBLICA (sin auth JWT)
      └── index.ts
```

Esta nueva función:
- ✅ **NO requiere autenticación JWT**
- ✅ Accesible públicamente por Google, Bing, y bots de IA
- ✅ Consume datos del KV Store vía el endpoint protegido `/events` (usando `SUPABASE_ANON_KEY` internamente)
- ✅ Genera XML/JSON dinámicamente
- ✅ Headers de cache optimizados

### 2. Endpoints Públicos

```
GET /sitemap/sitemap.xml   → Sitemap XML estándar
GET /sitemap/sitemap.json  → Sitemap JSON para IA
GET /sitemap/robots.txt    → Robots.txt dinámico
GET /sitemap/              → Info endpoint
```

### 3. URLs Actualizadas

**ANTES (con error 401)**:
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml
```

**AHORA (público, funciona)**:
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
```

---

## 📝 Archivos Modificados

### Nuevos Archivos

- ✅ `/supabase/functions/sitemap/index.ts` - Edge Function pública completa

### Archivos Actualizados

| Archivo | Cambio |
|---------|--------|
| `/robots.txt` | URLs actualizadas a `/sitemap/sitemap.xml` |
| `/public/robots.txt` | URLs actualizadas a `/sitemap/sitemap.xml` |
| `/App.tsx` | Referencias `<link rel="sitemap">` actualizadas (líneas 368-369) |
| `/SITEMAP_URLS_REFERENCE.txt` | Documentación actualizada con nuevas URLs |

---

## 🧪 Verificación

### Test Rápido (Navegador)

Abre estas URLs directamente en tu navegador (sin autenticación):

```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.json
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/robots.txt
```

**Resultado esperado**:
- ✅ Respuesta 200 OK
- ✅ Contenido XML/JSON válido
- ✅ NO error 401
- ✅ Datos reales de eventos del CMS

### Test con cURL

```bash
# Verificar que NO requiere autenticación
curl -I https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml

# Debería devolver:
# HTTP/2 200 
# content-type: application/xml; charset=utf-8
# cache-control: public, max-age=3600, s-maxage=3600
```

---

## 🚀 Próximos Pasos (Para Ti)

### 1. Deploy de la Nueva Función

La nueva función `sitemap` debe ser deployada a Supabase:

```bash
supabase functions deploy sitemap
```

O si usas Figma Make, el deploy debería ser automático al guardar.

### 2. Re-enviar a Google Search Console

1. Ve a: https://search.google.com/search-console
2. Sección "Sitemaps"
3. **Elimina el sitemap anterior** (el que tenía error 401)
4. **Agrega el nuevo sitemap**:
   ```
   https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
   ```
5. Haz clic en "ENVIAR"

### 3. Verificar en 24 Horas

Google tardará aproximadamente 24 horas en:
- ✅ Leer el nuevo sitemap
- ✅ Descubrir las URLs
- ✅ Comenzar a indexar

Revisa en Google Search Console:
- Estado del sitemap: Debería cambiar a **"Correcto" ✅**
- URLs descubiertas: Debería ser > 0
- Errores: Debería ser 0

---

## 🎯 Por Qué Funciona Ahora

| Aspecto | ANTES ❌ | AHORA ✅ |
|---------|----------|----------|
| **Autenticación** | Requerida (JWT) | Pública (sin auth) |
| **Acceso Google** | Bloqueado (401) | Permitido (200) |
| **Edge Function** | `server` (protegida) | `sitemap` (pública) |
| **URL** | `/make-server-c4bb2206/` | `/sitemap/` |
| **Headers** | `Authorization` requerido | Sin autenticación |

---

## 📊 Arquitectura Actualizada

```
Google Bot
    │
    ├─→ GET /sitemap/sitemap.xml (SIN AUTH)
    │       ↓
    │   Supabase Edge Function "sitemap" (PÚBLICA)
    │       ↓
    │   Hono Handler (sin verifyAuth)
    │       ↓
    │   Fetch events desde /make-server-c4bb2206/events (CON AUTH interna)
    │       ↓
    │   KV Store (wav_events)
    │       ↓
    │   Generate XML
    │       ↓
    │   Return 200 OK + XML
    │
    └─→ Google indexa correctamente ✅
```

---

## 🔍 Debugging

### Si aún obtienes 401:

1. **Verifica que la función está deployada**:
   ```bash
   curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/
   ```
   Debería devolver JSON con info de la API.

2. **Revisa logs de Supabase**:
   - Ve al dashboard de Supabase
   - Sección "Edge Functions"
   - Revisa logs de la función `sitemap`

3. **Verifica que el endpoint `/events` es accesible**:
   El sitemap consume datos desde el servidor principal. Asegúrate de que:
   ```bash
   curl -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
     https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/events
   ```
   Devuelve un array de eventos.

### Si Google dice "Sitemap is HTML":

Esto significa que Google está recibiendo una página de error HTML en lugar de XML. Verifica:
- ✅ La URL es exacta (sin typos)
- ✅ La función está deployada
- ✅ No hay errores 404 o 500 en los logs

---

## 💡 Lecciones Aprendidas

1. **Supabase Edge Functions son protegidas por defecto** - No basta con no tener middleware de auth en Hono, la infraestructura de Supabase intercepta primero.

2. **Google NO envía tokens JWT** - Los sitemaps DEBEN ser públicos sin autenticación.

3. **Separación de funciones** - Es mejor tener funciones Edge separadas por nivel de acceso (pública vs protegida) que intentar mezclar ambas en una sola.

4. **Testing desde el navegador es esencial** - Siempre verifica que la URL del sitemap funcione SIN iniciar sesión.

---

## ✅ Checklist Final

- [x] Edge Function `sitemap` creada
- [x] Endpoints XML, JSON, robots.txt implementados
- [x] URLs actualizadas en `/robots.txt` (raíz y public)
- [x] Referencias actualizadas en `/App.tsx`
- [x] Documentación actualizada
- [ ] **Deploy de la función `sitemap` a Supabase** (PENDING)
- [ ] **Re-envío a Google Search Console** (PENDING)
- [ ] **Verificación en 24h** (PENDING)

---

**Fecha**: 3 de diciembre, 2025  
**Status**: ✅ Solución implementada, pendiente deploy  
**Próximo paso**: Deploy de la Edge Function `sitemap`
