# ✅ Sitemap - Checklist de Verificación
## Lista de tareas para activar SEO & Indexación por IA

---

## 📋 VERIFICACIÓN TÉCNICA

### Backend (Supabase)

- [ ] **Sitemap XML funciona**
  ```bash
  curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml
  ```
  ✅ Debe devolver XML válido con `<urlset>` y múltiples `<url>`

- [ ] **Sitemap JSON funciona**
  ```bash
  curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json | jq
  ```
  ✅ Debe devolver JSON con `organization` y `urls[]`

- [ ] **Robots.txt funciona**
  ```bash
  curl https://wearevision.cl/robots.txt
  ```
  ✅ Debe mostrar permisos y referencias a sitemaps

- [ ] **Todos los eventos están incluidos**
  ```bash
  curl -s [...]/sitemap.json | jq '.total_urls'
  ```
  ✅ Número debe coincidir con eventos en Supabase + 4 estáticas

- [ ] **URLs son correctas**
  - [ ] Todas usan HTTPS
  - [ ] No hay duplicados
  - [ ] Slugs son válidos (sin espacios, caracteres especiales)

- [ ] **Metadata completa**
  - [ ] Títulos presentes
  - [ ] Descripciones presentes
  - [ ] Categorías asignadas
  - [ ] Marcas incluidas

- [ ] **Imágenes incluidas**
  ```bash
  curl -s [...]/sitemap.xml | grep "image:loc"
  ```
  ✅ Debe mostrar URLs de imágenes

---

## 🌐 REGISTRO EN MOTORES DE BÚSQUEDA

### Google Search Console

- [ ] **Cuenta creada/acceso verificado**
  - Ir a: https://search.google.com/search-console

- [ ] **Propiedad agregada**
  - [ ] Dominio: `https://wearevision.cl`
  - [ ] Método de verificación elegido (DNS, HTML tag, Google Analytics, etc.)
  - [ ] Propiedad verificada ✅

- [ ] **Sitemap enviado**
  - [ ] Ir a: Sitemaps (menú izquierdo)
  - [ ] Agregar: `https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml`
  - [ ] Estado: "Éxito" (puede tardar 1-2 días)

- [ ] **Primera indexación confirmada**
  - [ ] Ir a: Cobertura
  - [ ] Ver: Páginas indexadas > 0

### Bing Webmaster Tools

- [ ] **Cuenta creada/acceso verificado**
  - Ir a: https://www.bing.com/webmasters

- [ ] **Sitio agregado**
  - [ ] Dominio: `https://wearevision.cl`
  - [ ] Verificación completada

- [ ] **Sitemap enviado**
  - [ ] Ir a: Sitemaps
  - [ ] Agregar: `https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml`
  - [ ] Estado: Enviado

- [ ] **Primera indexación confirmada**
  - [ ] Ir a: Informes y datos → Exploración de sitios
  - [ ] Ver: Páginas indexadas > 0

---

## 🔍 VALIDACIÓN SEO

### Google

- [ ] **Búsqueda directa funciona**
  ```
  site:wearevision.cl
  ```
  ✅ Debe mostrar páginas del sitio

- [ ] **Homepage indexada**
  ```
  site:wearevision.cl inurl:wearevision.cl
  ```
  ✅ Homepage debe aparecer

- [ ] **Eventos indexados**
  ```
  site:wearevision.cl inurl:event
  ```
  ✅ Debe mostrar páginas de eventos

- [ ] **Búsquedas de marca funcionan**
  ```
  "We Are Vision eventos BTL"
  "We Are Vision Chile"
  ```
  ✅ Sitio debe aparecer en primeros resultados

- [ ] **Imágenes indexadas**
  - Ir a: Google Images
  - Buscar: `site:wearevision.cl`
  ✅ Debe mostrar imágenes de eventos

### Bing

- [ ] **Búsqueda directa funciona**
  ```
  site:wearevision.cl
  ```

- [ ] **Eventos indexados**
  ```
  site:wearevision.cl
  ```

---

## 🤖 BOTS DE IA

### Permisos Verificados

- [ ] **robots.txt permite GPTBot**
  ```bash
  curl https://wearevision.cl/robots.txt | grep "GPTBot"
  ```
  ✅ Debe mostrar: `User-agent: GPTBot` + `Allow: /`

- [ ] **robots.txt permite PerplexityBot**
  ```bash
  curl https://wearevision.cl/robots.txt | grep "PerplexityBot"
  ```
  ✅ Debe mostrar permisos

- [ ] **robots.txt permite Claude**
  ```bash
  curl https://wearevision.cl/robots.txt | grep "anthropic-ai"
  ```
  ✅ Debe mostrar permisos

- [ ] **robots.txt referencia sitemap JSON**
  ```bash
  curl https://wearevision.cl/robots.txt | grep "sitemap.json"
  ```
  ✅ Debe tener línea: `Sitemap: [...]/sitemap.json`

### Pruebas de Aparición (después de 4-8 semanas)

- [ ] **ChatGPT Search menciona We Are Vision**
  - Pregunta: "Agencias de eventos BTL en Chile"
  - ✅ We Are Vision debería aparecer en respuesta

- [ ] **Perplexity cita proyectos**
  - Pregunta: "Activaciones de marca en Chile"
  - ✅ Debería mencionar proyectos de We Are Vision

- [ ] **You.com muestra resultados**
  - Buscar: "We Are Vision portafolio"
  - ✅ Debería mostrar eventos

---

## 📊 MONITOREO (Semanal)

### Google Search Console

- [ ] **Cobertura**
  - [ ] Páginas indexadas: XX / YY
  - [ ] Páginas con errores: 0
  - [ ] Páginas excluidas: revisar razones

- [ ] **Sitemaps**
  - [ ] Estado: Éxito
  - [ ] URLs enviadas: ~50-100
  - [ ] URLs indexadas: >80% (después de 2-4 semanas)

- [ ] **Rendimiento**
  - [ ] Impresiones: aumentando
  - [ ] Clicks: >0
  - [ ] CTR: >2%
  - [ ] Posición promedio: mejorando

- [ ] **Experiencia**
  - [ ] Core Web Vitals: Bueno
  - [ ] Móvil: Sin errores
  - [ ] HTTPS: Válido

### Bing Webmaster Tools

- [ ] **Informes de rastreo**
  - [ ] Páginas rastreadas: aumentando
  - [ ] Errores de rastreo: 0

- [ ] **Sitemaps**
  - [ ] Estado: Procesado
  - [ ] URLs procesadas: >50%

---

## 🔧 MANTENIMIENTO

### Mensual

- [ ] **Verificar que eventos nuevos se indexan**
  - [ ] Agregar evento en admin panel
  - [ ] Esperar 24-48 horas
  - [ ] Verificar en sitemap.json
  - [ ] Verificar en Google Search Console

- [ ] **Revisar errores de crawling**
  - [ ] Google Search Console → Cobertura → Errores
  - [ ] Corregir URLs rotas o redirigir

- [ ] **Analizar búsquedas**
  - [ ] Google Search Console → Rendimiento
  - [ ] Identificar queries con impresiones pero sin clicks
  - [ ] Optimizar meta descriptions

### Trimestral

- [ ] **Actualizar prioridades**
  - [ ] Eventos antiguos: reducir priority a 0.6
  - [ ] Eventos destacados: aumentar a 0.9

- [ ] **Revisar changefreq**
  - [ ] Eventos finalizados: monthly
  - [ ] Eventos activos: weekly

- [ ] **Optimizar metadata**
  - [ ] Mejorar títulos para SEO
  - [ ] Expandir descripciones
  - [ ] Agregar keywords relevantes

---

## 🎯 OBJETIVOS & KPIs

### Mes 1

- [ ] **100% de eventos enviados** a Google/Bing via sitemap
- [ ] **>30% indexados** en Google
- [ ] **>20% indexados** en Bing
- [ ] **0 errores** en Search Console

### Mes 2

- [ ] **>80% indexados** en Google
- [ ] **>60% indexados** en Bing
- [ ] **>100 impresiones/semana** en Google
- [ ] **>5 clicks/semana** orgánicos

### Mes 3

- [ ] **95-100% indexados** en ambos motores
- [ ] **>500 impresiones/semana**
- [ ] **>20 clicks/semana**
- [ ] **CTR >3%**
- [ ] **Aparición en ChatGPT/Perplexity** (si crawlean)

### Mes 6

- [ ] **Posición promedio <20** para keywords principales
- [ ] **Rich snippets** en algunos resultados
- [ ] **Imágenes indexadas** en Google Images
- [ ] **Tráfico orgánico +30%** vs. baseline

---

## 🚨 TROUBLESHOOTING

### "No veo mi sitemap en Google Search Console"

- [ ] Verificar URL del sitemap (copiar/pegar exacta)
- [ ] Esperar 24-48 horas (Google tarda en procesarlo)
- [ ] Verificar que sitemap.xml devuelve 200 OK
- [ ] Revisar robots.txt tiene referencia correcta

### "Eventos no se indexan"

- [ ] Verificar que eventos tienen slugs únicos
- [ ] Verificar que URLs responden 200 (no 404)
- [ ] Revisar que no hay `noindex` en meta tags
- [ ] Aumentar priority de eventos a 0.9

### "ChatGPT no menciona mi sitio"

- [ ] Esperar 4-8 semanas (crawling periódico)
- [ ] Verificar robots.txt permite GPTBot
- [ ] Verificar sitemap.json accesible
- [ ] Revisar metadata está completa

### "Hay URLs duplicadas en sitemap"

- [ ] Verificar función `generateSlug()` es determinística
- [ ] Revisar que eventos no tienen slugs duplicados
- [ ] Regenerar sitemap y verificar

---

## 📚 RECURSOS

### Validadores

- [ ] **XML Sitemap Validator**
  - https://www.xml-sitemaps.com/validate-xml-sitemap.html

- [ ] **Google Rich Results Test**
  - https://search.google.com/test/rich-results

- [ ] **Schema Validator**
  - https://validator.schema.org/

### Documentación

- [ ] **Google Search Central**
  - https://developers.google.com/search

- [ ] **Bing Webmaster Guidelines**
  - https://www.bing.com/webmasters/help

- [ ] **OpenAI GPTBot**
  - https://platform.openai.com/docs/gptbot

### Archivos del Proyecto

- [ ] `/SITEMAP_SEO_AI_GUIDE.md` - Guía técnica completa
- [ ] `/SITEMAP_QUICK_START.md` - Inicio rápido
- [ ] `/SITEMAP_IMPLEMENTATION_SUMMARY.md` - Resumen de implementación
- [ ] `/SITEMAP_CHECKLIST.md` - Este documento

---

## ✅ CHECKLIST DE LANZAMIENTO

### Antes de Publicitar

- [ ] Sitemap XML funciona ✅
- [ ] Sitemap JSON funciona ✅
- [ ] Robots.txt configurado ✅
- [ ] Eventos incluidos ✅
- [ ] Metadata completa ✅
- [ ] Registrado en Google ✅
- [ ] Registrado en Bing ✅
- [ ] Primera indexación confirmada ✅

### Después del Lanzamiento

- [ ] Monitoreo semanal configurado
- [ ] Dashboard de métricas creado
- [ ] Alertas configuradas (errores de crawling)
- [ ] Plan de optimización continua

---

## 🏆 ÉXITO CONFIRMADO CUANDO:

```
✅ 95%+ de eventos indexados
✅ >1000 impresiones/mes orgánicas
✅ >50 clicks/mes orgánicos
✅ CTR >3%
✅ Posición promedio <15
✅ 0 errores en Search Console
✅ Aparición en resultados de IA (ChatGPT/Perplexity)
✅ Tráfico orgánico creciente mes a mes
```

---

**Última actualización:** 3 de diciembre, 2025  
**Revisión recomendada:** Semanal (primeros 2 meses), luego mensual  

---

_Usa este checklist para verificar que todo está funcionando correctamente._  
_Marca cada casilla a medida que completas las tareas._ ✅
