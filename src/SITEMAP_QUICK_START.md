# 🚀 Sitemap - Inicio Rápido
## Optimización SEO & IA en 5 Minutos

---

## ✅ LO QUE YA ESTÁ LISTO

Tu sitio ya tiene un **sistema completo de sitemaps** optimizado para:

- ✅ **Google** (SEO tradicional)
- ✅ **Bing** (SEO tradicional)
- ✅ **ChatGPT** (búsquedas de IA)
- ✅ **Perplexity** (búsquedas de IA)
- ✅ **Claude** (búsquedas de IA)
- ✅ **You.com** (búsquedas de IA)

**Todo funciona automáticamente.** Los sitemaps se generan dinámicamente desde tus eventos en Supabase.

⚡ **DATOS REALES**: Cada vez que se genera el sitemap, lee los eventos directamente desde el CMS (Supabase KV Store). No hay datos de prueba o falsos.

---

## 🌐 TUS URLS DE SITEMAP

```
XML (para Google/Bing):
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml

JSON (para IA - ChatGPT, Perplexity, Claude):
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json

Robots.txt:
https://wearevision.cl/robots.txt
```

### 📊 Metadata Incluida (Datos Reales del CMS)

Cada sitemap incluye:
- **Total de eventos** (cuenta real desde KV)
- **Marcas atendidas** (únicas del portafolio)
- **Categorías de servicio** (extraídas de los eventos)
- **Cobertura geográfica** (países y ciudades reales)
- **KPIs agregados** (personas alcanzadas, ciudades, etc.)
- **Keywords y hashtags** (desde campos del CMS)
- **Tags inteligentes** (auto-clasificación por escala, ubicación, año)

---

## 📋 PASOS PARA ACTIVAR SEO

### 1️⃣ Registrar en Google Search Console (5 min)

1. Ve a: [Google Search Console](https://search.google.com/search-console)
2. Click "Agregar propiedad"
3. Ingresa: `https://wearevision.cl`
4. Verifica propiedad (opción DNS o HTML tag)
5. Una vez verificado:
   - Click "Sitemaps" en el menú izquierdo
   - Click "Agregar nuevo sitemap"
   - Pega: `https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml`
   - Click "Enviar"

**Resultado:** Google empezará a indexar todos tus eventos automáticamente.

---

### 2️⃣ Registrar en Bing Webmaster Tools (3 min)

1. Ve a: [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Click "Agregar sitio"
3. Ingresa: `https://wearevision.cl`
4. Verifica propiedad
5. Una vez verificado:
   - Click "Sitemaps" en el menú
   - Click "Enviar sitemap"
   - Pega: `https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml`
   - Click "Enviar"

**Resultado:** Bing indexará tus eventos.

---

### 3️⃣ Verificar que Funciona (2 min)

**Opción A: Verificar en navegador**

Abre estas URLs en tu navegador:
- XML: https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml
- JSON: https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json

**Deberías ver:**
- XML: Lista de URLs en formato XML
- JSON: Metadata completa de tus eventos

**Opción B: Verificar en terminal**

```bash
# Verificar XML
curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml

# Verificar JSON
curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json | jq
```

---

## 🤖 ACTIVAR BOTS DE IA

**¡No tienes que hacer nada!** Los bots de IA encontrarán automáticamente tu sitemap a través de `robots.txt`.

### Cómo funciona:

1. **ChatGPT** busca `robots.txt` → encuentra sitemap.json → indexa tu contenido
2. **Perplexity** crawlea periódicamente → lee sitemap → incluye en resultados
3. **Claude** (si implementa search) → usa metadata enriquecida del JSON

**Timeline:**
- **Google/Bing:** 1-7 días para indexación inicial
- **Bots de IA:** Varía (ChatGPT/Perplexity crawlean periódicamente)

---

## 📊 MONITOREAR RESULTADOS

### En Google Search Console (después de 1 semana)

1. Ve a "Cobertura" → verás cuántas páginas están indexadas
2. Ve a "Sitemaps" → verás cuántas URLs se enviaron vs. indexadas
3. Ve a "Rendimiento" → verás impresiones y clicks

**Objetivo:** 100% de eventos indexados en 2-4 semanas

### En Bing Webmaster Tools

1. Similar a Google
2. Ve a "Informes y datos" → "Exploración de sitios"

---

## 🎯 QUÉ ESPERAR

### Semana 1-2
- ✅ Sitemap enviado
- ✅ Google/Bing empiezan a crawlear
- ✅ Primeros eventos indexados

### Semana 3-4
- ✅ 50-80% de eventos indexados
- ✅ Aparición en resultados de búsqueda
- ✅ Primeros clicks orgánicos

### Mes 2-3
- ✅ 100% indexado
- ✅ Rich snippets (posiblemente)
- ✅ Imágenes en Google Images
- ✅ Aparición en ChatGPT/Perplexity (si crawlean)

---

## 🔍 PRUEBAS DE BÚSQUEDA

### Google (después de 2 semanas)

Prueba estas búsquedas:
```
"We Are Vision eventos BTL"
"agencia eventos corporativos Chile"
"Coca Cola activación Chile" (si tienes ese evento)
site:wearevision.cl
```

### ChatGPT Search (si tienes acceso)

Prueba:
```
"Agencias de eventos BTL en Chile"
"Proyectos de activación de marca Coca Cola en Chile"
"We Are Vision portafolio"
```

**Si ChatGPT menciona We Are Vision = ✅ ÉXITO**

---

## ❓ PREGUNTAS FRECUENTES

### ¿Tengo que regenerar el sitemap cuando agrego eventos?
**No.** El sitemap se genera dinámicamente desde Supabase. Cada vez que Google/Bing accede, ve los eventos actualizados.

### ¿Cuánto tarda en aparecer en Google?
**1-7 días** para que Google crawlee. **2-4 semanas** para indexación completa.

### ¿Por qué hay dos sitemaps (XML y JSON)?
- **XML:** Para Google y Bing (SEO tradicional)
- **JSON:** Para motores de IA (ChatGPT, Perplexity) - metadata enriquecida

### ¿Puedo personalizar el sitemap?
Sí, edita `/supabase/functions/server/index.tsx` en las funciones:
- `generateXMLSitemap()`
- `generateJSONSitemap()`

### ¿Cómo verifico si los bots de IA crawlean mi sitio?
Revisa los logs del servidor Supabase. Verás `User-Agent: GPTBot`, `PerplexityBot`, etc.

---

## 🛠️ TROUBLESHOOTING

### "Google dice que mi sitemap tiene errores"

**Causa:** URLs mal formateadas o 404s

**Solución:**
1. Verifica que todos los eventos tengan slugs válidos
2. Abre el sitemap en navegador y verifica URLs
3. Click en cada URL para verificar que carga

### "Bing no encuentra mi sitemap"

**Causa:** Cache o URL incorrecta

**Solución:**
1. Verifica la URL exacta del sitemap
2. Espera 24 horas (cache)
3. Reenvía el sitemap

### "ChatGPT no menciona mi sitio"

**Causa:** ChatGPT crawlea periódicamente, no en tiempo real

**Solución:**
1. Espera 4-8 semanas
2. Verifica que `robots.txt` permite `GPTBot`
3. Asegúrate de que el sitemap JSON sea accesible

---

## 📚 DOCUMENTACIÓN COMPLETA

Para más detalles, ver:
- **`/SITEMAP_SEO_AI_GUIDE.md`** - Guía técnica completa
- **`/utils/generateSitemap.ts`** - Código de generación
- **`/supabase/functions/server/index.tsx`** - Endpoints del servidor

---

## ✅ CHECKLIST FINAL

- [ ] Sitemap XML accesible en navegador
- [ ] Sitemap JSON accesible en navegador
- [ ] Robots.txt accesible
- [ ] Sitemap registrado en Google Search Console
- [ ] Sitemap registrado en Bing Webmaster Tools
- [ ] Monitoreo configurado (verificar semanalmente)

---

**¡Listo!** Tu sitio ahora está optimizado para SEO tradicional y motores de búsqueda de IA. 🚀

**Próximo paso:** Espera 1-2 semanas y revisa Google Search Console para ver resultados.

---

_Generado: 3 de diciembre, 2025_  
_Sistema: Sitemap dinámico optimizado para SEO & IA_  
_Estado: ✅ Activo y funcionando_
