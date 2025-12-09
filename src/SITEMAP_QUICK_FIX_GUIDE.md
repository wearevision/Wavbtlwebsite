# ⚡ Guía Rápida: Solucionar Error 401 del Sitemap

## 🎯 TL;DR (Too Long; Didn't Read)

**Problema**: Google Search Console decía "Sitemap is HTML" y mostraba error 401  
**Causa**: Supabase bloqueaba el acceso (requería autenticación JWT)  
**Solución**: Nueva Edge Function pública `/sitemap/` sin autenticación  

---

## 🚀 3 Pasos Para Solucionarlo

### ✅ Paso 1: Verificar que la Nueva Función Existe

Abre tu navegador y ve a:
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
```

**Si ves XML con eventos** → ✅ Todo funciona, continúa al Paso 2  
**Si ves error 401 o 404** → ⚠️ Necesitas deployar la función (ver abajo)

---

### ✅ Paso 2: Re-enviar a Google Search Console

1. **Ve a**: https://search.google.com/search-console
2. **Click en**: "Sitemaps" (menú lateral izquierdo)
3. **Elimina el sitemap viejo** (el que dice "1 error")
   - Click en los 3 puntos `⋮` 
   - "Eliminar sitemap"
4. **Agrega el nuevo sitemap**:
   ```
   https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
   ```
5. **Click en** "ENVIAR"

---

### ✅ Paso 3: Esperar 24 Horas

Google necesita tiempo para:
- ⏳ Leer el sitemap (1-2 horas)
- ⏳ Descubrir URLs (4-8 horas)
- ⏳ Empezar a indexar (12-24 horas)

**Revisa el estado en Google Search Console**:
- Estado: "Correcto" ✅
- URLs descubiertas: > 0
- Errores: 0

---

## 🔧 Si Necesitas Deployar la Función

Si en el Paso 1 viste error 404 o 401, significa que la función no está deployada.

### En Figma Make (Supabase integrado):

**La función debería auto-deployarse**, pero si no:

1. Abre el archivo `/supabase/functions/sitemap/index.ts`
2. Haz un cambio mínimo (agrega un espacio o comentario)
3. Guarda el archivo (Cmd/Ctrl + S)
4. Espera 30 segundos
5. Verifica de nuevo la URL del Paso 1

### Con Supabase CLI (si tienes acceso):

```bash
cd tu-proyecto
supabase functions deploy sitemap
```

---

## 🧪 Test Rápido (2 minutos)

### Test 1: ¿Funciona el XML?
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.xml
```
✅ Debería mostrar XML bien formado con eventos

### Test 2: ¿Funciona el JSON?
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/sitemap.json
```
✅ Debería mostrar JSON con `portfolio`, `events`, etc.

### Test 3: ¿Funciona robots.txt?
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/sitemap/robots.txt
```
✅ Debería mostrar texto plano con "User-agent: *"

---

## 📋 Checklist Rápido

- [ ] La URL del XML abre en el navegador SIN pedir login
- [ ] El XML contiene eventos reales (no placeholders)
- [ ] El sitemap viejo fue eliminado de Google Search Console
- [ ] El nuevo sitemap fue enviado a Google Search Console
- [ ] Google Search Console muestra "Correcto" o "En espera"

---

## 🚨 Troubleshooting

### "Sigo viendo error 401"

**Solución**: La función `sitemap` no está deployada o no es pública.

**Fix rápido**:
1. Verifica en Supabase Dashboard → Edge Functions
2. Debería aparecer una función llamada `sitemap`
3. Si no existe, re-guarda el archivo `/supabase/functions/sitemap/index.ts`

---

### "Google dice que el sitemap es HTML"

**Solución**: La URL está incorrecta o la función devuelve un error.

**Fix rápido**:
1. Abre la URL en el navegador
2. Si ves HTML en lugar de XML, revisa los logs de Supabase
3. Asegúrate de que la URL sea exacta (sin espacios, sin typos)

---

### "No hay eventos en el sitemap"

**Solución**: El KV Store no tiene datos o la función no puede acceder.

**Fix rápido**:
1. Verifica que `/make-server-c4bb2206/events` devuelve datos:
   ```bash
   curl -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
     https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/events
   ```
2. Si devuelve `[]` vacío, agrega eventos desde el Admin Panel
3. Si devuelve 401, verifica el `SUPABASE_ANON_KEY`

---

## 📞 Soporte

### Documentación Completa

- 📘 `/SITEMAP_FIX_SUMMARY.md` - Explicación técnica detallada
- 📄 `/SITEMAP_COMPLETE_SETUP.md` - Setup original completo
- 🔗 `/SITEMAP_URLS_REFERENCE.txt` - URLs para copy/paste

### Dashboard de Supabase

- **Edge Functions**: https://supabase.com/dashboard/project/ykkmplrnqcwpgfdjshxn/functions
- **Logs**: Sección "Logs" dentro de cada función
- **Storage**: Verificar que los eventos tienen imágenes

---

## ✅ Resultado Esperado

Después de seguir estos pasos:

```
┌─────────────────────────────────────────────────────┐
│  ✅ Sitemap XML accesible públicamente              │
│  ✅ Google puede leer sin autenticación             │
│  ✅ URLs descubiertas en Search Console             │
│  ✅ Indexación comenzando                           │
│  ✅ Sin errores 401                                 │
└─────────────────────────────────────────────────────┘
```

---

## 🎉 ¡Listo!

Una vez completados los 3 pasos, tu sitemap estará funcionando correctamente y Google comenzará a indexar tus eventos automáticamente.

**Tiempo estimado**: 5 minutos de tu tiempo + 24 horas de Google  
**Dificultad**: ⭐⭐☆☆☆ (Fácil)  
**Impacto**: 🚀🚀🚀🚀🚀 (Crítico para SEO)

---

**Fecha**: 3 de diciembre, 2025  
**Versión**: 2.0 (Fix para error 401)  
**Status**: ✅ Solución lista para implementar
