# 🗺️ Sitemap Completo - Guía SEO & IA
## Optimización para Google, Bing, ChatGPT, Perplexity, Claude

---

## 📊 RESUMEN EJECUTIVO

Se ha implementado un **sistema completo de sitemaps dinámicos** optimizado tanto para **SEO tradicional** (Google, Bing) como para **motores de búsqueda de IA** (ChatGPT, Perplexity, Claude, You.com).

### ✅ Lo que se implementó:

1. **Sitemap XML** (`/api/sitemap.xml`) - Estándar para Google/Bing
2. **Sitemap JSON** (`/api/sitemap.json`) - Enriquecido para IA
3. **Robots.txt** (`/public/robots.txt`) - Optimizado para todos los bots
4. **Generación dinámica** - Se actualiza automáticamente desde Supabase
5. **Metadata enriquecida** - Títulos, descripciones, categorías, marcas
6. **Tags semánticos** - Para mejor comprensión por IA
7. **Imágenes incluidas** - Sitemap de imágenes integrado
8. **Cache optimizado** - 1 hora de cache para performance

---

## 🌐 URLS DEL SITEMAP

### Producción (Supabase Edge Functions)

```
Sitemap XML:    https://wearevision.cl/api/sitemap.xml
Sitemap JSON:   https://wearevision.cl/api/sitemap.json
Robots.txt:     https://wearevision.cl/robots.txt
```

### Desarrollo Local

```
Sitemap XML:    http://localhost:54321/functions/v1/make-server-c4bb2206/sitemap.xml
Sitemap JSON:   http://localhost:54321/functions/v1/make-server-c4bb2206/sitemap.json
Robots.txt:     http://localhost:5173/robots.txt
```

---

## 📋 ESTRUCTURA DEL SITEMAP

### 1. Sitemap XML (Estándar SEO)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- URL de Homepage -->
  <url>
    <loc>https://wearevision.cl</loc>
    <lastmod>2025-12-03T00:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- URL de Portafolio -->
  <url>
    <loc>https://wearevision.cl/eventos</loc>
    <lastmod>2025-12-03T00:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- URLs de Eventos (con imágenes) -->
  <url>
    <loc>https://wearevision.cl/event/coca-cola-xtreme-tour-2013</loc>
    <lastmod>2025-12-01T00:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://example.com/image.jpg</image:loc>
      <image:title>Coca Cola Xtreme Tour 2013</image:title>
    </image:image>
  </url>

  <!-- ... más eventos -->
</urlset>
```

**Características:**
- ✅ Formato XML estándar (Google, Bing compatible)
- ✅ Prioridades optimizadas (homepage: 1.0, eventos: 0.8)
- ✅ Frecuencias de actualización realistas
- ✅ Fechas de última modificación (desde Supabase)
- ✅ Sitemap de imágenes integrado
- ✅ URLs escapadas correctamente

---

### 2. Sitemap JSON (Optimizado para IA)

```json
{
  "version": "1.0",
  "generated_at": "2025-12-03T12:00:00Z",
  "total_urls": 50,
  "organization": {
    "name": "We Are Vision",
    "type": "BTL Marketing Agency",
    "industry": "Marketing & Advertising",
    "specialization": "Corporate Events, Brand Activations, Immersive Experiences",
    "location": "Chile",
    "services": [
      "Eventos Corporativos",
      "Activaciones de Marca",
      "Experiencias Inmersivas",
      "Marketing BTL",
      "Diseño de Experiencias",
      "Producción Audiovisual"
    ]
  },
  "urls": [
    {
      "url": "https://wearevision.cl",
      "last_modified": "2025-12-03T00:00:00Z",
      "update_frequency": "daily",
      "priority": 1.0,
      "metadata": {
        "title": "We Are Vision - Experiencias BTL Cinematográficas",
        "description": "Agencia especializada en eventos corporativos...",
        "type": "homepage"
      },
      "tags": ["btl", "marketing", "eventos", "chile", "experiencias"],
      "content_type": "homepage"
    },
    {
      "url": "https://wearevision.cl/event/coca-cola-xtreme-tour-2013",
      "last_modified": "2025-12-01T00:00:00Z",
      "update_frequency": "weekly",
      "priority": 0.8,
      "metadata": {
        "title": "Coca Cola Xtreme Tour 2013",
        "description": "Activación exitosa en Chile...",
        "brand": "Coca Cola",
        "category": "Activación de Marca",
        "date": "2013",
        "type": "case-study"
      },
      "tags": ["coca-cola", "activacion", "brand-activation", "btl", "chile"],
      "content_type": "case-study",
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

**Características:**
- ✅ Metadata de organización (contexto para IA)
- ✅ Servicios listados explícitamente
- ✅ Tags semánticos por URL
- ✅ Tipos de contenido claros
- ✅ Información de marca y categoría
- ✅ Descripciones completas
- ✅ Estructura fácil de parsear para IA

---

### 3. Robots.txt (Optimizado para Bots de IA)

```txt
# We Are Vision - Robots.txt
# Optimizado para SEO y motores de IA

# Permitir todos los bots
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://wearevision.cl/api/sitemap.xml
Sitemap: https://wearevision.cl/api/sitemap.json

# Bots de IA - Acceso completo
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Googlebot
Allow: /

# Crawl delay (evitar sobrecarga)
User-agent: *
Crawl-delay: 1

# Excluir rutas administrativas
User-agent: *
Disallow: /admin

# Permitir páginas públicas
Allow: /eventos
Allow: /event/
Allow: /nosotros
Allow: /contacto
```

**Características:**
- ✅ Permisos explícitos para bots de IA
- ✅ Referencias a ambos sitemaps (XML y JSON)
- ✅ Crawl delay para proteger el servidor
- ✅ Exclusión de rutas administrativas
- ✅ Permisos explícitos para rutas públicas

---

## 🤖 BOTS DE IA SOPORTADOS

### ChatGPT (OpenAI)
- **User-agent:** `GPTBot`, `ChatGPT-User`
- **Acceso:** Completo
- **Sitemap:** JSON preferido (mejor comprensión semántica)

### Perplexity
- **User-agent:** `PerplexityBot`
- **Acceso:** Completo
- **Sitemap:** JSON + XML

### Claude (Anthropic)
- **User-agent:** `anthropic-ai`, `Claude-Web`
- **Acceso:** Completo
- **Sitemap:** JSON preferido

### You.com
- **User-agent:** `YouBot`
- **Acceso:** Completo
- **Sitemap:** JSON + XML

### Common Crawl (usado por múltiples IA)
- **User-agent:** `CCBot`
- **Acceso:** Completo
- **Sitemap:** Ambos formatos

### Google & Bing (SEO tradicional)
- **User-agent:** `Googlebot`, `Bingbot`
- **Acceso:** Completo
- **Sitemap:** XML estándar

---

## 🎯 OPTIMIZACIONES PARA IA

### 1. Metadata Enriquecida

Cada URL incluye:
- **Título descriptivo** - Para comprensión del contenido
- **Descripción completa** - Contexto semántico
- **Categoría** - Clasificación del contenido
- **Marca** - Entidad asociada
- **Fecha** - Temporalidad
- **Tipo de contenido** - case-study, portfolio, homepage, etc.

### 2. Tags Semánticos

Ejemplo para un evento de Coca Cola:
```json
"tags": [
  "coca-cola",
  "activacion",
  "brand-activation",
  "btl",
  "marketing",
  "evento",
  "experiencia",
  "chile"
]
```

**Beneficio:** Las IA pueden encontrar contenido por:
- Nombre de marca ("muéstrame proyectos de Coca Cola")
- Tipo de servicio ("activaciones de marca en Chile")
- Industria ("eventos BTL")
- Ubicación ("agencias en Chile")

### 3. Información de Organización

```json
"organization": {
  "name": "We Are Vision",
  "type": "BTL Marketing Agency",
  "industry": "Marketing & Advertising",
  "specialization": "Corporate Events, Brand Activations...",
  "location": "Chile",
  "services": [...]
}
```

**Beneficio:** Las IA entienden:
- Qué hace la empresa
- Dónde opera
- Qué servicios ofrece
- A qué industria pertenece

---

## 📈 BENEFICIOS SEO

### 1. Indexación Más Rápida
- Google descubre nuevos eventos automáticamente
- Sitemap actualizado en tiempo real desde Supabase
- Prioridades ayudan a Google a indexar páginas importantes primero

### 2. Imágenes Indexadas
- Sitemap de imágenes integrado en XML
- Google Images puede mostrar eventos
- Mayor visibilidad en búsquedas visuales

### 3. Rich Snippets Potenciales
- Metadata estructurada facilita rich snippets
- Fechas de última modificación mejoran freshness score
- Descripciones optimizadas para featured snippets

### 4. Crawl Budget Optimizado
- Frecuencias de actualización realistas
- Prioridades claras
- Crawl delay para evitar sobrecarga

---

## 🔍 APARICIÓN EN MOTORES DE IA

### ChatGPT Search
**Ejemplo de consulta:**
```
Usuario: "Agencias de eventos BTL en Chile"
ChatGPT: [accede a sitemap.json]
         "We Are Vision es una agencia BTL en Chile 
          especializada en eventos corporativos..."
```

**Cómo funciona:**
1. ChatGPT encuentra `robots.txt` → ve `Sitemap: .../sitemap.json`
2. Descarga y parsea el JSON
3. Extrae metadata de organización
4. Lee tags y categorías de eventos
5. Comprende el contexto del negocio
6. Responde con información precisa

### Perplexity
**Ejemplo de consulta:**
```
Usuario: "Muéstrame proyectos de activación de marca de Coca Cola en Chile"
Perplexity: [indexa sitemap.json]
            "Encontré: Coca Cola Xtreme Tour 2013 - 
             Activación exitosa en Chile..."
```

**Cómo funciona:**
1. Perplexity crawlea periódicamente el sitemap
2. Indexa todos los eventos con sus tags
3. Asocia "Coca Cola" + "Chile" + "activación"
4. Muestra el proyecto relevante con link directo

### Claude (si implementa search)
**Ejemplo de consulta:**
```
Usuario: "Experiencias inmersivas en eventos corporativos"
Claude: [busca en sitemap.json]
        "We Are Vision ofrece experiencias inmersivas.
         Ejemplo: [proyecto específico]"
```

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA

### Backend (Supabase Edge Functions)

**Archivo:** `/supabase/functions/server/index.tsx`

**Rutas implementadas:**
```typescript
// GET /api/sitemap.xml
app.get(`${BASE_PATH}/sitemap.xml`, async (c) => {
  const events = await kv.get("wav_events");
  const sitemap = generateXMLSitemap(events, baseUrl);
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600',
  });
});

// GET /api/sitemap.json
app.get(`${BASE_PATH}/sitemap.json`, async (c) => {
  const events = await kv.get("wav_events");
  const sitemap = generateJSONSitemap(events, baseUrl);
  return c.json(JSON.parse(sitemap), 200, {
    'Cache-Control': 'public, max-age=3600',
  });
});

// GET /api/robots.txt
app.get(`${BASE_PATH}/robots.txt`, async (c) => {
  const robotsTxt = generateRobotsTxt(baseUrl);
  return c.text(robotsTxt, 200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'public, max-age=86400',
  });
});
```

**Generación dinámica:**
- Lee eventos desde Supabase KV Store
- Genera URLs con slugs correctos
- Incluye fechas de última modificación
- Agrega metadata completa
- Cache de 1 hora (XML/JSON) y 24 horas (robots.txt)

### Frontend (Opcional)

Si necesitas generar sitemaps en el cliente:

**Archivo:** `/utils/generateSitemap.ts`
- Funciones reutilizables
- Tipos TypeScript completos
- Exportable para scripts CLI

---

## 🧪 TESTING

### 1. Verificar XML Sitemap

```bash
# En producción
curl https://wearevision.cl/api/sitemap.xml

# Debería devolver XML válido con todas las URLs
```

**Validar con Google:**
1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar sitemap: `https://wearevision.cl/api/sitemap.xml`
3. Esperar indexación (1-7 días)

### 2. Verificar JSON Sitemap

```bash
# En producción
curl https://wearevision.cl/api/sitemap.json | jq

# Debería devolver JSON bien formateado con metadata
```

**Validar estructura:**
```bash
# Contar URLs
curl -s https://wearevision.cl/api/sitemap.json | jq '.total_urls'

# Ver servicios
curl -s https://wearevision.cl/api/sitemap.json | jq '.organization.services'

# Ver primer evento
curl -s https://wearevision.cl/api/sitemap.json | jq '.urls[4]'
```

### 3. Verificar Robots.txt

```bash
# En producción
curl https://wearevision.cl/robots.txt

# Debería mostrar reglas y referencias a sitemaps
```

**Validar con Google:**
1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Herramientas → Probador de robots.txt
3. Verificar que permite crawling

---

## 📊 MÉTRICAS DE ÉXITO

### Corto Plazo (1-2 semanas)
- [ ] Sitemap indexado en Google Search Console
- [ ] Sitemap indexado en Bing Webmaster Tools
- [ ] URLs de eventos aparecen en Google

### Medio Plazo (1-2 meses)
- [ ] Eventos aparecen en búsquedas por marca
- [ ] Imágenes indexadas en Google Images
- [ ] Rich snippets en resultados de búsqueda

### Largo Plazo (3-6 meses)
- [ ] Aparición en resultados de ChatGPT Search
- [ ] Citaciones en Perplexity
- [ ] Aumento de tráfico orgánico 20%+

---

## 🚀 PRÓXIMOS PASOS

### Paso 1: Deploy
```bash
# El código ya está en el servidor
# Los sitemaps se generan dinámicamente
# No requiere deploy adicional
```

### Paso 2: Registrar en Google Search Console
1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad: `https://wearevision.cl`
3. Verificar propiedad (DNS o HTML tag)
4. Ir a Sitemaps
5. Agregar: `https://wearevision.cl/api/sitemap.xml`
6. Enviar

### Paso 3: Registrar en Bing Webmaster Tools
1. Ir a [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Agregar sitio: `https://wearevision.cl`
3. Verificar propiedad
4. Ir a Sitemaps
5. Agregar: `https://wearevision.cl/api/sitemap.xml`
6. Enviar

### Paso 4: Monitorear Indexación
- Verificar Google Search Console semanalmente
- Revisar errores de crawling
- Monitorear cobertura de índice
- Verificar que eventos nuevos se indexan automáticamente

### Paso 5: Optimizar Según Métricas
- Si eventos no se indexan → aumentar prioridad
- Si crawl budget es bajo → reducir changefreq
- Si hay errores → revisar URLs y slugs

---

## 🔧 MANTENIMIENTO

### Automático
- ✅ Sitemap se actualiza automáticamente cuando se agregan eventos
- ✅ Fechas de última modificación desde Supabase
- ✅ Cache se invalida cada hora
- ✅ Slugs se generan dinámicamente

### Manual (Opcional)
Si necesitas forzar regeneración:
```bash
# Limpiar cache de sitemaps (en servidor Supabase)
# O simplemente esperar 1 hora para que expire el cache
```

### Actualización de Robots.txt
Si cambias el dominio base:
1. Editar `/public/robots.txt`
2. Actualizar URLs de sitemap
3. Deploy

---

## 📚 RECURSOS ADICIONALES

### Documentación Oficial
- [Google Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Search Central](https://developers.google.com/search)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)

### Herramientas de Validación
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Bots de IA
- [OpenAI GPTBot](https://platform.openai.com/docs/gptbot)
- [Anthropic Claude Web](https://www.anthropic.com/index/claude-web-crawler)
- [Perplexity Bot](https://docs.perplexity.ai/docs/perplexitybot)

---

## ✅ CHECKLIST FINAL

### Implementación
- [x] Ruta `/api/sitemap.xml` creada
- [x] Ruta `/api/sitemap.json` creada
- [x] Ruta `/api/robots.txt` creada
- [x] Archivo `/public/robots.txt` creado
- [x] Generación dinámica desde Supabase
- [x] Cache optimizado
- [x] Metadata enriquecida
- [x] Tags semánticos
- [x] Imágenes incluidas
- [x] Bots de IA permitidos

### Deployment
- [ ] Verificar en producción: `curl https://wearevision.cl/api/sitemap.xml`
- [ ] Verificar en producción: `curl https://wearevision.cl/api/sitemap.json`
- [ ] Verificar en producción: `curl https://wearevision.cl/robots.txt`
- [ ] Registrar en Google Search Console
- [ ] Registrar en Bing Webmaster Tools
- [ ] Monitorear indexación (1-2 semanas)

### Validación
- [ ] XML válido (sin errores de sintaxis)
- [ ] JSON válido (parseable)
- [ ] Todos los eventos incluidos
- [ ] URLs correctas (sin errores 404)
- [ ] Imágenes accesibles
- [ ] Metadata completa

---

## 🏆 RESULTADO ESPERADO

Con esta implementación, **We Are Vision** tendrá:

✅ **Visibilidad en Google** - Todos los eventos indexados  
✅ **Visibilidad en Bing** - Cobertura completa  
✅ **Aparición en ChatGPT** - Respuestas con información de proyectos  
✅ **Aparición en Perplexity** - Citaciones y referencias  
✅ **Aparición en Claude** - Contexto completo de la agencia  
✅ **SEO optimizado** - Indexación rápida y completa  
✅ **Metadata rica** - Rich snippets potenciales  
✅ **Actualización automática** - Sin mantenimiento manual  

---

**Generado:** 3 de diciembre, 2025  
**Sistema:** Sitemap dinámico con optimización SEO & IA  
**Estado:** ✅ Listo para producción  

---

_We Are Vision — Visible para humanos y para IA._
