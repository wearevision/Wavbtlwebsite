# 🔗 Guía de OpenGraph - We Are Vision BTL

## 📋 ¿Qué es OpenGraph?

OpenGraph es un protocolo que permite que tus links se vean atractivos cuando se comparten en redes sociales. En lugar de mostrar solo un URL, muestra:

- ✅ Imagen grande (1200x630px)
- ✅ Título optimizado
- ✅ Descripción persuasiva
- ✅ Nombre del sitio
- ✅ Metadata adicional

## 🎯 Plataformas Compatibles

El sistema funciona en **TODAS** las plataformas principales:

### ✅ Probado y Funcional:
- **WhatsApp** - Preview completo con imagen
- **LinkedIn** - Card profesional
- **Facebook** - Rich preview
- **Twitter/X** - Summary card con imagen grande
- **Discord** - Embed rico
- **Telegram** - Preview instantáneo
- **Slack** - Unfurl completo
- **iMessage** - Rich link

### 📱 Cómo se ve en cada plataforma:

#### WhatsApp
```
┌──────────────────────────┐
│   [IMAGEN 1200x630]      │
├──────────────────────────┤
│ Coca-Cola Xtreme Tour    │
│ Activación BTL masiva... │
│ btl.wearevision.cl       │
└──────────────────────────┘
```

#### LinkedIn
```
┌──────────────────────────┐
│   [IMAGEN GRANDE]        │
│                          │
│ COCA-COLA XTREME TOUR    │
│ Activación BTL masiva    │
│ en Chile con +50,000...  │
│                          │
│ 📍 btl.wearevision.cl   │
└──────────────────────────┘
```

## 🚀 Cómo Usar

### 1. En el AdminPanel

1. Ve al evento que quieres compartir
2. Abre el **tab "Media"**
3. Verás una sección **"Link OpenGraph"** con:
   - Input con el link generado automáticamente
   - Botón **"Copiar Link"**
   - Preview visual de cómo se verá

4. Haz clic en **"Copiar Link"**
5. Pega el link en cualquier red social

### 2. El Link Generado

El formato del link es:
```
https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/og/{event-slug}
```

Ejemplo real:
```
https://abc123.supabase.co/functions/v1/make-server-c4bb2206/og/coca-cola-xtreme-tour-2024
```

### 3. ¿Qué pasa cuando alguien hace clic?

1. **Redes sociales** (Facebook, WhatsApp, etc.) **escanean** el link
2. Leen los meta tags OpenGraph
3. Muestran el **preview enriquecido** con imagen y título
4. Usuario hace clic → Se redirige al sitio principal después de 3 segundos

## 🛠️ Configuración Técnica

### Backend: Endpoint OpenGraph

**Ubicación:** `/supabase/functions/server/index.tsx`

**Ruta:** `GET /og/:slug`

**Ejemplo:**
```bash
GET /make-server-c4bb2206/og/coca-cola-xtreme-tour-2024
```

**Respuesta:** HTML completo con meta tags

### Meta Tags Generados

```html
<!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://btl.wearevision.cl/event/slug">
<meta property="og:title" content="Coca-Cola - Xtreme Tour 2024">
<meta property="og:description" content="Activación BTL masiva...">
<meta property="og:image" content="https://...imagen.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="We Are Vision BTL">
<meta property="og:locale" content="es_CL">

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="Coca-Cola - Xtreme Tour">
<meta property="twitter:description" content="...">
<meta property="twitter:image" content="https://...">

<!-- Article Metadata -->
<meta property="article:published_time" content="2024-01-01T00:00:00.000Z">
<meta property="article:author" content="Coca-Cola">
<meta property="article:tag" content="#btl, #marketing, #eventos">
```

## 📐 Especificaciones de Imagen

### Requisitos OBLIGATORIOS:

- ✅ **Formato:** HTTPS (no HTTP)
- ✅ **Extensión:** .jpg, .jpeg, .png, .webp
- ✅ **Acceso:** Público (no localhost)
- ✅ **Tamaño recomendado:** 1200x630px
- ✅ **Ratio:** 1.91:1 (estándar OpenGraph)
- ✅ **Peso:** < 5MB

### ¿Qué pasa si no cumple?

- ❌ **Sin HTTPS:** WhatsApp y LinkedIn NO mostrarán la imagen
- ❌ **Localhost:** Las redes sociales no pueden acceder
- ❌ **Muy pequeña:** Se verá pixelada
- ❌ **Muy grande:** Carga lenta

## 🔧 Flujo de Generación Automática

### 1. Usuario sube imagen
```
event.image = "https://supabase.co/.../imagen.jpg"
```

### 2. IA optimiza evento
```bash
Click en "Optimizar con IA" ⚡
  ↓
GPT-4o Vision analiza imagen
  ↓
Genera: og_image = event.image
```

### 3. Backend crea página OpenGraph
```bash
GET /og/event-slug
  ↓
Busca evento en KV store
  ↓
Genera HTML con meta tags
  ↓
Devuelve página completa
```

### 4. Redes sociales escanean
```bash
Usuario comparte link en WhatsApp
  ↓
WhatsApp hace GET al link
  ↓
Lee meta tags og:*
  ↓
Muestra preview rico
```

## 🧪 Cómo Probar

### Herramientas de Testing:

1. **Facebook Sharing Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   ```
   - Pega tu link
   - Click en "Scrape Again"
   - Ve el preview

2. **LinkedIn Post Inspector**
   ```
   https://www.linkedin.com/post-inspector/
   ```
   - Pega tu link
   - Click en "Inspect"

3. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   ```
   - Pega tu link
   - Ve el preview de Twitter

4. **WhatsApp (Testing Real)**
   - Envíate el link a ti mismo
   - WhatsApp generará preview automático
   - Verifica imagen y texto

### Testing Manual:

```bash
# 1. Abre el link en el navegador
https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/og/tu-evento

# 2. Verifica que:
- ✅ Se ve la página de loading
- ✅ La imagen se carga
- ✅ El título es correcto
- ✅ Redirige después de 3 segundos

# 3. Inspecciona el HTML (View Source)
- ✅ Verifica que existen meta tags og:*
- ✅ Verifica que og:image es HTTPS
- ✅ Verifica que og:title no está vacío
```

## 🐛 Troubleshooting

### ❌ "La imagen no aparece en WhatsApp"

**Solución:**
1. Verifica que `og_image` sea HTTPS (no HTTP)
2. Verifica que la imagen sea pública
3. Usa Facebook Debugger para forzar re-scrape
4. Espera 5-10 minutos (WhatsApp cachea)

### ❌ "El preview muestra datos viejos"

**Solución:**
1. Facebook cachea por 7 días
2. Usa Facebook Sharing Debugger → "Scrape Again"
3. Para LinkedIn: Post Inspector → "Inspect"
4. Para WhatsApp: Espera 24 horas o modifica el link levemente

### ❌ "El link no redirige"

**Solución:**
1. Verifica que el `slug` del evento existe
2. Verifica que el evento está guardado en Supabase
3. Revisa logs del backend en Supabase Dashboard

### ❌ "Aparece 'Evento no encontrado'"

**Solución:**
1. Verifica que el slug en el link coincide con `event.slug`
2. Guarda el evento en Supabase (botón "Guardar")
3. Verifica que el evento no fue eliminado

## 📊 Mejores Prácticas

### ✅ DO:
- Usa imágenes de alta calidad (1200x630px)
- Asegúrate que `seo_title` y `seo_description` existan
- Usa la IA para generar `og_image` automáticamente
- Prueba el link en al menos 3 plataformas
- Guarda el evento después de optimizarlo

### ❌ DON'T:
- No uses URLs locales (localhost)
- No uses imágenes muy pequeñas (< 600px)
- No uses HTTP (solo HTTPS)
- No compartas links sin verificar preview primero
- No edites el slug después de compartir

## 🎨 Personalización

### Modificar el HTML de la página OpenGraph

**Ubicación:** `/supabase/functions/server/index.tsx` línea ~3175

Puedes personalizar:
- Logo (actualmente "WAV")
- Colores del gradiente
- Tiempo de redirección (actualmente 3 segundos)
- Estilos CSS

### Modificar el componente de Preview

**Ubicación:** `/components/wav/OpenGraphPreview.tsx`

Puedes personalizar:
- Diseño del preview
- Botones adicionales
- Tooltips
- Animaciones

## 📚 Recursos Adicionales

- [OpenGraph Protocol](https://ogp.me/)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/)
- [LinkedIn Share Inspector](https://www.linkedin.com/post-inspector/)

---

**¿Necesitas ayuda?** Revisa los logs del backend en Supabase Dashboard → Functions → make-server-c4bb2206
