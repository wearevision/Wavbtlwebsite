# Estrategia de Visibilidad en IA - Datos Reales del CMS

## 🎯 Resumen Ejecutivo

El sistema de sitemap de We Are Vision ahora está **100% conectado con datos REALES** del CMS en Supabase. Cada vez que se genera un sitemap (XML o JSON), extrae información actualizada directamente de la base de datos.

---

## 📊 Datos Reales Incluidos en Sitemaps

### Metadata de Organización (Agregada Automáticamente)

```json
{
  "organization": {
    "portfolio_stats": {
      "total_events": 127,           // ← Cuenta REAL de eventos en KV
      "brands_served": 45,            // ← Marcas únicas en el portafolio
      "categories": 8,                // ← Categorías únicas
      "countries": ["Chile", "Perú"], // ← Países donde operamos
      "cities_coverage": 12,          // ← Ciudades cubiertas
      "total_people_reached": 850000  // ← Suma de people_reached
    },
    
    "featured_brands": [
      "Coca Cola",                    // ← Top 10 marcas por frecuencia
      "Movistar",
      "Samsung",
      // ... ordenadas por cantidad de eventos
    ],
    
    "services": [
      "Activación de Marca",          // ← Extraído desde event.category
      "Evento Corporativo",
      "Roadshow",
      // ... todas las categorías únicas
    ]
  }
}
```

### Metadata por Evento (Campos REALES del CMS)

Cada evento en el sitemap incluye **TODA** la información disponible:

```json
{
  "url": "https://wearevision.cl/event/coca-cola-xtreme-tour-2013",
  "metadata": {
    // CAMPOS BÁSICOS (siempre presentes)
    "title": "Coca Cola Xtreme Tour 2013",
    "description": "...",
    "brand": "Coca Cola",
    "category": "Activación de Marca",
    
    // IDENTIFICACIÓN (si está en el CMS)
    "client": "Coca Cola Chile",
    "year": "2013",
    "month": "Diciembre",
    "country": "Chile",
    "city": "Santiago",
    "venue": "Parque O'Higgins",
    "subcategory": "Tour Musical",
    
    // KPIS Y RESULTADOS (si están en el CMS)
    "people_reached": "50000",
    "attendees": "15000",
    "days": "3",
    "cities_count": "5",
    "screens": "12",
    
    // KEYWORDS Y SEO (si están en el CMS)
    "keywords": ["música", "juventud", "bebidas"],
    "hashtags": ["#CocaColaXtreme", "#Tour2013"],
    "seo_title": "...",
    "seo_description": "..."
  },
  
  // TAGS ENRIQUECIDOS (generados automáticamente)
  "tags": [
    "coca-cola",
    "activacion-de-marca",
    "santiago",
    "chile",
    "year-2013",
    "brand-activation",
    "experiential-marketing",
    "large-scale",        // ← Auto-agregado si people_reached > 10000
    "multi-city"          // ← Auto-agregado si cities > 1
  ]
}
```

---

## 🔄 Flujo de Datos (100% Dinámico)

```
┌─────────────────────────────────────────────────────────┐
│  ADMIN PANEL                                            │
│  - Usuario crea/edita evento                            │
│  - Completa campos: brand, category, keywords, KPIs     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  SUPABASE KV STORE                                      │
│  - Guarda en clave "wav_events"                         │
│  - Normalización automática (slug, validación)          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  SITEMAP ENDPOINTS (Server)                             │
│                                                          │
│  GET /sitemap.xml   → kv.get("wav_events")              │
│  GET /sitemap.json  → kv.get("wav_events")              │
│                                                          │
│  ✅ Lee datos REALES cada vez                           │
│  ✅ Genera metadata agregada en tiempo real             │
│  ✅ Cache: 1 hora (balance entre frescura y performance)│
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  MOTORES DE IA                                          │
│  - ChatGPT (GPTBot)                                     │
│  - Perplexity (PerplexityBot)                           │
│  - Claude (anthropic-ai)                                │
│                                                          │
│  → Crawlea sitemap.json cada 1-4 semanas               │
│  → Indexa metadata enriquecida                          │
│  → Responde preguntas con datos actualizados            │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Mejoras Implementadas

### 1. Extracción de Stats Reales

**Antes:**
```javascript
// Hardcodeado
services: ['Eventos Corporativos', 'Activaciones de Marca']
```

**Ahora:**
```javascript
// Dinámico desde KV
const uniqueCategories = [...new Set(events.map(e => e.category).filter(Boolean))];
services: uniqueCategories.length > 0 ? uniqueCategories : [/* fallback */]
```

### 2. Portfolio Stats Agregados

```javascript
portfolio_stats: {
  total_events: events.length,                           // Cuenta real
  brands_served: uniqueBrands.length,                    // Marcas únicas
  total_people_reached: events                           // Suma de impacto
    .map(e => parseInt(e.people_reached) || 0)
    .reduce((sum, val) => sum + val, 0)
}
```

### 3. Featured Brands por Frecuencia

```javascript
function getBrandsByFrequency(events) {
  // Cuenta eventos por marca
  // Ordena de mayor a menor
  // Retorna top 10
}
```

### 4. Tags Inteligentes

- **Geográficos REALES**: Desde `event.country`, `event.city`
- **Temporales**: `year-2013`, `month-diciembre`
- **Keywords del CMS**: Desde `event.keywords`
- **Hashtags del CMS**: Desde `event.hashtags`
- **Auto-clasificación por escala**:
  - `large-scale` si `people_reached > 10000`
  - `multi-city` si `cities > 1`
  - `long-term-campaign` si `days > 7`

### 5. XML con Image Sitemap

```xml
<image:image>
  <image:loc>https://...</image:loc>
  <image:title>Coca Cola Xtreme Tour 2013</image:title>
  <image:caption>Activación musical que alcanzó...</image:caption>
</image:image>
```

---

## 📍 URLs de Producción

### Sitemap XML (Google, Bing)
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml
```

### Sitemap JSON (ChatGPT, Perplexity, Claude)
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json
```

### Robots.txt
```
https://wearevision.cl/robots.txt
```

---

## 🧪 Verificación de Datos Reales

### Test 1: Contar eventos en sitemap
```bash
curl -s https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json | jq '.total_urls'

# Debería mostrar: número de eventos + 4 (páginas estáticas)
```

### Test 2: Ver portfolio stats
```bash
curl -s [...]/sitemap.json | jq '.organization.portfolio_stats'

# Debería mostrar stats calculadas desde KV:
# {
#   "total_events": 127,
#   "brands_served": 45,
#   "categories": 8,
#   ...
# }
```

### Test 3: Ver marcas top
```bash
curl -s [...]/sitemap.json | jq '.organization.featured_brands'

# Debería mostrar array de marcas ordenadas por frecuencia
```

### Test 4: Ver metadata de un evento
```bash
curl -s [...]/sitemap.json | jq '.urls[] | select(.content_type == "case-study") | .metadata | {title, brand, category, people_reached, keywords}' | head -20

# Debería mostrar eventos REALES con todos los campos
```

### Test 5: Ver tags enriquecidos
```bash
curl -s [...]/sitemap.json | jq '.urls[] | select(.content_type == "case-study") | {title: .metadata.title, tags}' | head -20

# Debería mostrar tags dinámicos (ciudad, año, escala, etc.)
```

---

## 🎨 Casos de Uso para IA

### Caso 1: Búsqueda por Marca

**Usuario pregunta a ChatGPT:**
> "¿Qué eventos ha hecho We Are Vision para Coca Cola?"

**ChatGPT:**
1. Busca `robots.txt` → encuentra `sitemap.json`
2. Descarga y parsea el JSON
3. Filtra eventos donde `metadata.brand === "Coca Cola"`
4. Responde con lista de eventos, KPIs, descripción

**Respuesta esperada:**
> "We Are Vision ha realizado 8 eventos para Coca Cola, incluyendo:
> 1. **Coca Cola Xtreme Tour 2013** - Activación musical en 5 ciudades, alcanzando 50,000 personas
> 2. **Coca Cola Happiness Tour 2014** - ..."

---

### Caso 2: Búsqueda por Categoría + Ubicación

**Usuario pregunta a Perplexity:**
> "Agencias de activaciones de marca en Santiago, Chile"

**Perplexity:**
1. Crawlea sitemap.json
2. Ve `organization.location: "Chile"`
3. Ve múltiples eventos con `metadata.category: "Activación de Marca"` y `metadata.city: "Santiago"`
4. Indexa We Are Vision como especialista local

**Respuesta esperada:**
> "We Are Vision es una agencia BTL en Santiago, Chile, especializada en activaciones de marca. Han realizado 45+ proyectos en Santiago, incluyendo..."

---

### Caso 3: Búsqueda por KPIs

**Usuario pregunta a Claude:**
> "Eventos masivos en Chile con más de 10,000 asistentes"

**Claude:**
1. Busca sitemap.json
2. Filtra eventos con `metadata.people_reached > 10000`
3. Ve tag `large-scale` auto-agregado
4. Contextualiza con descripción

**Respuesta esperada:**
> "We Are Vision ha ejecutado varios eventos de gran escala en Chile:
> - **Samsung Galaxy Tour**: 80,000 personas alcanzadas
> - **Movistar FutureX**: 35,000 asistentes en 3 días
> ..."

---

## 📈 Monitoreo y Actualización

### Frecuencia de Crawling por IA

| Motor | Bot User-Agent | Frecuencia Estimada | Cache |
|-------|---------------|---------------------|-------|
| ChatGPT | `GPTBot` | 1-4 semanas | Memoria contextual |
| Perplexity | `PerplexityBot` | 1-2 semanas | Índice actualizado |
| Claude | `anthropic-ai` | Variable | Sin crawling confirmado* |
| Google | `Googlebot` | 1-7 días | Search index |
| Bing | `Bingbot` | 1-14 días | Search index |

\* Claude aún no implementa web crawling masivo como ChatGPT/Perplexity

### Logs del Servidor

Cada vez que se genera un sitemap, el servidor logea:

```
[SITEMAP.JSON] Generando desde datos reales del CMS...
[SITEMAP.JSON] 127 eventos encontrados en KV
[SITEMAP.JSON] Evento de muestra: {
  title: "Coca Cola Xtreme Tour 2013",
  brand: "Coca Cola",
  category: "Activación de Marca",
  hasKeywords: true,
  hasLocation: true
}
[SITEMAP.JSON] ✅ Generado con metadata enriquecida
```

Esto permite verificar en tiempo real que se están usando **datos REALES**, no falsos.

---

## ✅ Checklist de Validación

- [x] **Sitemap XML genera desde KV** (`kv.get("wav_events")`)
- [x] **Sitemap JSON genera desde KV** (`kv.get("wav_events")`)
- [x] **Stats agregados son dinámicos** (total_events, brands_served, etc.)
- [x] **Marcas top ordenadas por frecuencia** (getBrandsByFrequency)
- [x] **Tags incluyen datos del CMS** (keywords, hashtags, city, year)
- [x] **Tags auto-clasifican eventos** (large-scale, multi-city, etc.)
- [x] **Metadata de eventos completa** (todos los campos opcionales)
- [x] **Logs de debugging activados** (console.log en cada generación)
- [x] **Cache optimizado** (1 hora, balance frescura/performance)
- [x] **Robots.txt permite bots de IA** (GPTBot, PerplexityBot, etc.)

---

## 🔧 Mantenimiento

### Actualizar un Evento

1. Edita el evento en el Admin Panel
2. Guarda cambios → se actualiza KV
3. Espera hasta 1 hora (cache del sitemap)
4. Próxima generación usará datos actualizados
5. Bots de IA crawlearán en su próximo ciclo (1-4 semanas)

### Forzar Regeneración de Sitemap

```bash
# Opción 1: Esperar 1 hora (cache expira)
# Opción 2: Hacer request directo
curl https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/sitemap.json

# Esto fuerza regeneración si cache expiró
```

### Agregar Nuevo Campo al Sitemap

1. Agregar campo al schema de eventos en el CMS
2. Asegurar que se guarda en KV (normalizeEvent)
3. Editar `generateJSONSitemap()` para incluir el campo:

```javascript
metadata: {
  // ... campos existentes
  nuevo_campo: event.nuevo_campo,  // ← Agregar aquí
}
```

4. Deploy del servidor
5. Verificar en próxima generación

---

## 🎯 KPIs de Éxito

### Corto Plazo (1-2 meses)

- [ ] Sitemap XML indexado en Google Search Console
- [ ] Sitemap XML indexado en Bing Webmaster Tools
- [ ] 100% de eventos del CMS incluidos en sitemap
- [ ] Logs muestran metadata enriquecida correctamente

### Mediano Plazo (3-6 meses)

- [ ] ChatGPT responde preguntas sobre We Are Vision con datos del sitemap
- [ ] Perplexity incluye We Are Vision en resultados para "agencia BTL Chile"
- [ ] Google Images indexa imágenes de eventos (via image sitemap)
- [ ] Tráfico orgánico desde búsquedas de marca aumenta

### Largo Plazo (6-12 meses)

- [ ] We Are Vision aparece en top 3 de "agencia BTL Chile" en IA
- [ ] Portfolio stats en sitemap superan 200+ eventos
- [ ] Featured brands incluyen 100+ marcas
- [ ] Tráfico desde IA representa 10%+ del total

---

## 📞 Soporte

Para cualquier duda sobre el sistema de sitemaps:

1. **Verificar logs del servidor** (Supabase Dashboard → Edge Functions → Logs)
2. **Testear endpoints directamente** (curl con jq)
3. **Revisar este documento** para casos de uso
4. **Verificar KV store** tiene eventos correctos (`kv.get("wav_events")`)

---

**Última actualización:** Diciembre 2025  
**Versión:** 2.0 (Datos Reales)  
**Estado:** ✅ Producción
