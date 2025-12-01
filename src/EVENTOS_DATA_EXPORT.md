# 📊 WAV BTL — Eventos Cargados en Masa (Data Export para Antigravity)

**Fecha de Exportación:** 30 de Noviembre, 2025  
**Sistema:** We Are Vision - CMS & Frontend  
**Versión Backend:** v2.3.0 (con Auto-Normalización)

---

## 🏗️ Arquitectura de Almacenamiento

### 1. Base de Datos (KV Store)
**Ubicación:** Supabase Postgres  
**Tabla:** `kv_store_c4bb2206`  
**Key Principal:** `"wav_events"`  
**Tipo:** Array JSON de objetos `WavEvent`

```sql
-- Estructura de la tabla KV
CREATE TABLE kv_store_c4bb2206 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Los eventos se almacenan como:
INSERT INTO kv_store_c4bb2206 (key, value) 
VALUES ('wav_events', '[{...evento1}, {...evento2}, ...]');
```

**Operaciones Disponibles:**
- `kv.get("wav_events")` → Retorna array completo de eventos
- `kv.set("wav_events", eventsArray)` → Reemplaza todo el array
- `kv.getByPrefix("wav_")` → Obtiene todas las keys que empiecen con "wav_"

---

### 2. Almacenamiento de Imágenes y Videos

#### 🗂️ Supabase Storage (Bucket Privado)
**Bucket Name:** `make-c4bb2206-wav-assets`  
**Tipo:** Privado (requiere signed URLs)  
**Duración de URLs firmadas:** 24 horas (3600 * 24 segundos)

#### Estructura de Archivos en el Bucket:
```
make-c4bb2206-wav-assets/
├── images/
│   ├── {eventId}_main.jpg          # Imagen principal del evento
│   └── {eventId}_logo.png          # Logo de la marca (PNG con alpha)
├── gallery/
│   ├── {eventId}_gallery_{index}.jpg   # Imágenes de la galería
│   └── {eventId}_gallery_{index}.mp4   # Videos de la galería
```

#### Ejemplo de Paths Almacenados:
```json
{
  "id": "abc123",
  "image": "https://signed-url-expires-in-24h.supabase.co/...",
  "imagePath": "images/abc123_main.jpg",
  "logo": "https://signed-url-expires-in-24h.supabase.co/...",
  "logoPath": "images/abc123_logo.png",
  "gallery": [
    {
      "id": "xyz789",
      "type": "image",
      "url": "https://signed-url-expires-in-24h.supabase.co/...",
      "path": "gallery/abc123_gallery_0.jpg"
    },
    {
      "id": "def456",
      "type": "video",
      "url": "https://signed-url-expires-in-24h.supabase.co/...",
      "path": "gallery/abc123_gallery_1.mp4"
    }
  ]
}
```

**⚠️ IMPORTANTE:**
- Los campos `image` y `logo` en el JSON contienen **URLs firmadas temporales** (24h).
- Los campos `imagePath` y `logoPath` contienen las **rutas permanentes** en el bucket.
- El backend regenera las signed URLs automáticamente en cada request GET `/events`.
- La galería (`gallery`) sigue el mismo patrón: `url` (temporal) + `path` (permanente).

---

## 📋 Esquema de Datos `WavEvent` (TypeScript Interface)

```typescript
export interface WavEvent {
  // ===== CAMPOS REQUERIDOS (validados en backend) =====
  id: string;                    // UUID generado automáticamente si falta
  brand: string;                 // Máx 50 caracteres
  title: string;                 // Máx 100 caracteres
  description: string;           // Máx 1000 caracteres
  image: string;                 // URL firmada (temporal)
  slug: string;                  // generado desde brand + title (kebab-case)
  
  // ===== CAMPOS OPCIONALES =====
  imagePath?: string;            // Ruta permanente en Supabase Storage
  logo?: string;                 // URL firmada del logo (PNG/SVG con alpha)
  logoPath?: string;             // Ruta permanente del logo
  category?: string;             // Categoría del evento (según contentRules.ts)
  summary?: string;              // Resumen corto (usado en SEO meta description)
  
  // ===== GALERÍA MULTIMEDIA =====
  gallery?: WavMedia[];          // Array de imágenes/videos
  
  // ===== CONTENIDO GENERADO POR IA =====
  highlights?: string[];         // Puntos destacados (3-5 bullets)
  keywords?: string[];           // Keywords SEO (8-12)
  hashtags?: string[];           // Hashtags (#tag1, #tag2)
  
  // ===== CONTENIDO SOCIAL MEDIA =====
  instagram_hook?: string;       // Hook inicial para Instagram
  instagram_body?: string;       // Cuerpo del post
  instagram_closing?: string;    // Cierre del post
  instagram_hashtags?: string;   // Hashtags específicos de IG
  
  linkedin_post?: string;        // Post corto para LinkedIn
  linkedin_article?: string;     // Artículo largo para LinkedIn
  
  // ===== TÍTULOS ALTERNATIVOS =====
  alt_title_1?: string;          // Título alternativo 1
  alt_title_2?: string;          // Título alternativo 2
  alt_instagram?: string;        // Título para Instagram
}

export interface WavMedia {
  id: string;                    // UUID único del item
  type: 'image' | 'video';       // Tipo de medio
  url: string;                   // URL firmada (temporal, 24h)
  path?: string;                 // Ruta permanente en bucket
}
```

---

## 🔄 Sistema de Auto-Normalización

### Función: `normalizeEvent(rawEvent)`
**Ubicación:** `/supabase/functions/server/index.tsx` (línea 250-389)

**Transformaciones Automáticas:**
1. ✅ Genera UUID si `id` falta o está vacío
2. ✅ Convierte campos legacy (`imageUrl`, `imgUrl`, `img`) → `image`
3. ✅ Genera slug desde `brand + title` (kebab-case)
4. ✅ Convierte `gallery` a array ([] si falta)
5. ✅ Trunca textos a límites máximos
6. ✅ Asigna valores por defecto a campos faltantes:
   - `brand` → `"Marca"`
   - `title` → `"Evento Sin Título"`
   - `description` → `"Descripción pendiente."`
   - `image` → URL de Unsplash como fallback
7. ✅ Remueve campos NO permitidos (limpia el objeto)

**Ejemplo de Normalización:**
```javascript
// INPUT (datos crudos desde CMS)
{
  "imgUrl": "https://example.com/photo.jpg",  // ❌ Campo legacy
  "titulo": "Lanzamiento Producto X",        // ❌ Campo no válido
  "brand": "Nike"
}

// OUTPUT (después de normalizeEvent)
{
  "id": "f8d9c2a1-...",                      // ✅ UUID generado
  "brand": "Nike",                            // ✅ Preservado
  "title": "Evento Sin Título",              // ✅ Default (titulo no existe)
  "description": "Descripción pendiente.",    // ✅ Default
  "image": "https://example.com/photo.jpg",  // ✅ Convertido desde imgUrl
  "slug": "nike-evento-sin-titulo",          // ✅ Generado
  "gallery": [],                              // ✅ Array vacío por defecto
  "logo": "",
  "category": "",
  "summary": ""
  // "titulo" fue removido (no es campo válido)
}
```

---

## 🎯 5 EVENTOS DE EJEMPLO EXPORTADOS

**⚠️ NOTA:** Estos son datos hipotéticos para demostración.  
Para obtener los datos reales, ejecutar:

```bash
# Desde el Admin Panel:
# 1. Login con admin@wearevision.cl
# 2. Click en botón "Descargar JSON"
# O desde terminal:
curl -X GET "https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/events" \
  -H "Authorization: Bearer {publicAnonKey}"
```

---

### Evento #1: Nike Air Max Launch
```json
{
  "id": "30578cba-72e3-4b7e-b517-b889bf6d9352",
  "brand": "Nike",
  "title": "Lanzamiento Air Max 2024 - Evento Exclusivo Chile",
  "description": "Evento de lanzamiento exclusivo de la nueva colección Air Max 2024 en el centro de Santiago. Incluye activaciones interactivas, zona de prueba de producto y DJ set en vivo. Dirigido a sneakerheads y entusiastas del streetwear.",
  "slug": "nike-lanzamiento-air-max-2024-evento-exclusivo-chile",
  "category": "Product Launch",
  
  "image": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/30578cba-72e3-4b7e-b517-b889bf6d9352_main.jpg?token=...",
  "imagePath": "images/30578cba-72e3-4b7e-b517-b889bf6d9352_main.jpg",
  
  "logo": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/30578cba-72e3-4b7e-b517-b889bf6d9352_logo.png?token=...",
  "logoPath": "images/30578cba-72e3-4b7e-b517-b889bf6d9352_logo.png",
  
  "gallery": [
    {
      "id": "gallery-001",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_0.jpg?token=...",
      "path": "gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_0.jpg"
    },
    {
      "id": "gallery-002",
      "type": "video",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_1.mp4?token=...",
      "path": "gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_1.mp4"
    },
    {
      "id": "gallery-003",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_2.jpg?token=...",
      "path": "gallery/30578cba-72e3-4b7e-b517-b889bf6d9352_gallery_2.jpg"
    }
  ],
  
  "summary": "Lanzamiento exclusivo Nike Air Max 2024 con activaciones en vivo",
  
  "highlights": [
    "Primera exhibición en Latinoamérica de la colección Air Max 2024",
    "Zona de personalización de zapatillas con artistas locales",
    "DJ set exclusivo con artistas nacionales",
    "Acceso anticipado a compra para asistentes"
  ],
  
  "keywords": [
    "Nike", "Air Max", "lanzamiento", "sneakers", "streetwear", 
    "Chile", "Santiago", "evento exclusivo", "BTL", "activación de marca"
  ],
  
  "hashtags": [
    "#NikeAirMax", "#JustDoIt", "#SneakerheadChile", "#NikeChile", 
    "#StreetStyle", "#LaunchEvent"
  ],
  
  "instagram_hook": "🔥 ¿Listo para descubrir el futuro del diseño de sneakers?",
  "instagram_body": "Nike Air Max 2024 llega a Chile con un evento que NO te puedes perder. Personaliza tu par, conoce la historia detrás del diseño y vive la experiencia Air Max como nunca antes. \n\n📍 Centro de Santiago\n🎧 DJ set + activaciones interactivas\n👟 Acceso anticipado exclusivo",
  "instagram_closing": "Swipe para ver lo que te espera ➡️",
  "instagram_hashtags": "#NikeAirMax #JustDoIt #SneakerheadChile #NikeChile #StreetStyle #LaunchEvent",
  
  "linkedin_post": "Nike Chile presenta la nueva colección Air Max 2024 con un evento BTL que combina innovación, diseño y experiencia de marca. Un caso de estudio en activación de producto premium.",
  "linkedin_article": "## Nike Air Max 2024: Caso de Estudio en Activación de Marca Premium\n\nEl lanzamiento de la colección Air Max 2024 en Chile representa un ejemplo destacado de estrategia BTL integrada...\n\n### Objetivos de Campaña\n1. Generar awareness en público objetivo (18-35 años)\n2. Crear contenido orgánico en redes sociales\n3. Facilitar ventas anticipadas\n\n### Estrategia de Activación\n- Venue exclusivo en ubicación estratégica\n- Experiencias sensoriales (música, personalización)\n- Integración de influencers locales\n\n### Resultados Esperados\n- 500+ asistentes confirmados\n- 2M+ impresiones en redes sociales\n- 70% conversión a ventas",
  
  "alt_title_1": "Air Max 2024: El Evento que Revoluciona el Streetwear en Chile",
  "alt_title_2": "Nike Presenta Air Max 2024 con Experiencia Inmersiva",
  "alt_instagram": "Air Max 2024 🔥 Chile Edition"
}
```

---

### Evento #2: Cerveza Corona - Playa Urbana
```json
{
  "id": "a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c",
  "brand": "Corona",
  "title": "Playa Urbana 2024 - La Playa Llega al Centro",
  "description": "Activación de marca Corona que transforma una plaza céntrica en una playa tropical urbana. Incluye arena real, reposeras, música en vivo y degustaciones gratuitas. Experiencia inmersiva de verano en pleno centro de la ciudad.",
  "slug": "corona-playa-urbana-2024-la-playa-llega-al-centro",
  "category": "Brand Activation",
  
  "image": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_main.jpg?token=...",
  "imagePath": "images/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_main.jpg",
  
  "logo": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_logo.png?token=...",
  "logoPath": "images/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_logo.png",
  
  "gallery": [
    {
      "id": "corona-gallery-001",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_gallery_0.jpg?token=...",
      "path": "gallery/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_gallery_0.jpg"
    },
    {
      "id": "corona-gallery-002",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_gallery_1.jpg?token=...",
      "path": "gallery/a8f3b5c9-1d2e-4a6f-9b8c-7e5d4f3a2b1c_gallery_1.jpg"
    }
  ],
  
  "summary": "Corona transforma el centro de Santiago en una playa urbana con arena real y activaciones tropicales",
  
  "highlights": [
    "100 toneladas de arena blanca importada",
    "Reposeras de madera personalizadas",
    "Fotocall 360° con escenografía tropical",
    "Degustaciones gratuitas con bartenders profesionales"
  ],
  
  "keywords": [
    "Corona", "cerveza", "playa urbana", "activación", "verano", 
    "BTL", "experiencia de marca", "Santiago", "tropical", "evento gratuito"
  ],
  
  "hashtags": [
    "#CoronaChile", "#PlayaUrbana", "#VeranoCorona", "#BTLChile", "#MarcaExperiencial"
  ],
  
  "instagram_hook": "🏝️ ¿Quién dijo que necesitas ir a la playa para vivir el verano?",
  "instagram_body": "Corona trae la playa al corazón de Santiago. Arena real, reposeras, música tropical y la mejor cerveza. Todo gratis.\n\n📍 Plaza de Armas\n📅 Viernes a Domingo (12:00 - 20:00)\n🆓 Entrada liberada\n\nVení con tus amigos y viví la experiencia Corona.",
  "instagram_closing": "Etiqueta a quien llevarías 👇",
  "instagram_hashtags": "#CoronaChile #PlayaUrbana #VeranoCorona #BTLChile",
  
  "linkedin_post": "Corona reimagina la activación de marca urbana con 'Playa Urbana 2024', transformando espacios públicos en experiencias inmersivas. Un caso destacado de marketing sensorial.",
  "linkedin_article": "## Playa Urbana 2024: Activación de Marca Experiencial\n\n### Contexto\nEn un mercado saturado de publicidad tradicional, Corona apuesta por experiencias tangibles que conectan emocionalmente con el consumidor...",
  
  "alt_title_1": "Corona Trae el Paraíso Tropical al Centro de Santiago",
  "alt_title_2": "Playa Urbana: La Activación que Redefine el Marketing Experiencial",
  "alt_instagram": "Playa en el Centro 🏝️ Corona Edition"
}
```

---

### Evento #3: Samsung Galaxy - Tech Experience
```json
{
  "id": "f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e",
  "brand": "Samsung",
  "title": "Galaxy Experience Center - Tecnología del Futuro Hoy",
  "description": "Showroom inmersivo de Samsung que permite probar la nueva línea Galaxy antes de su lanzamiento oficial. Incluye estaciones de realidad virtual, zona gaming, fotografía profesional y asesoría técnica personalizada.",
  "slug": "samsung-galaxy-experience-center-tecnologia-del-futuro-hoy",
  "category": "Product Showcase",
  
  "image": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_main.jpg?token=...",
  "imagePath": "images/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_main.jpg",
  
  "logo": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_logo.png?token=...",
  "logoPath": "images/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_logo.png",
  
  "gallery": [
    {
      "id": "samsung-gallery-001",
      "type": "video",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_0.mp4?token=...",
      "path": "gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_0.mp4"
    },
    {
      "id": "samsung-gallery-002",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_1.jpg?token=...",
      "path": "gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_1.jpg"
    },
    {
      "id": "samsung-gallery-003",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_2.jpg?token=...",
      "path": "gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_2.jpg"
    },
    {
      "id": "samsung-gallery-004",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_3.jpg?token=...",
      "path": "gallery/f5d8c3b2-9a1e-4f6c-8b7d-5e4a3f2c1d0e_gallery_3.jpg"
    }
  ],
  
  "summary": "Showroom exclusivo Samsung Galaxy con VR, gaming y prueba de productos antes del lanzamiento oficial",
  
  "highlights": [
    "Acceso anticipado a nueva línea Galaxy S24",
    "Estación VR con juegos exclusivos",
    "Workshop de fotografía móvil con profesionales",
    "Descuentos especiales para asistentes"
  ],
  
  "keywords": [
    "Samsung", "Galaxy", "tecnología", "smartphones", "VR", 
    "gaming", "fotografía móvil", "lanzamiento", "Chile", "experiencia tecnológica"
  ],
  
  "hashtags": [
    "#SamsungGalaxy", "#GalaxyS24", "#TechChile", "#SamsungChile", "#InnovaciónTech"
  ],
  
  "instagram_hook": "📱 El futuro de la tecnología móvil ya está aquí",
  "instagram_body": "Sé de los primeros en probar la nueva línea Galaxy S24 en nuestro Experience Center. VR, gaming de última generación y workshops gratuitos.\n\n📍 Costanera Center\n🎮 Experiencia VR incluida\n📸 Aprende fotografía pro con Galaxy\n🎁 Regalos y descuentos exclusivos",
  "instagram_closing": "Reserva tu slot en el link de la bio 👆",
  "instagram_hashtags": "#SamsungGalaxy #GalaxyS24 #TechChile #SamsungChile",
  
  "linkedin_post": "Samsung Chile lanza Galaxy Experience Center, redefiniendo cómo las marcas tech conectan con early adopters mediante experiencias inmersivas hands-on.",
  "linkedin_article": "## Galaxy Experience Center: Reinventando el Product Launch Tech\n\n### Desafío\nEn un mercado donde los consumidores investigan exhaustivamente antes de comprar smartphones premium, Samsung necesitaba crear touchpoints físicos que generaran convicción de compra...\n\n### Solución\nExperience center de 300m² con 6 estaciones temáticas:\n1. Zona VR Gaming\n2. Studio Fotográfico\n3. Productividad Business\n4. SmartHome Integration\n5. Wearables Lab\n6. Trade-in Express\n\n### Métricas de Éxito\n- 1,200 visitantes/semana\n- Tiempo promedio: 45 minutos\n- Conversión a pre-orden: 34%",
  
  "alt_title_1": "Samsung Galaxy S24: Experiencia Inmersiva Pre-Lanzamiento",
  "alt_title_2": "Experience Center: Toca el Futuro con Samsung",
  "alt_instagram": "Galaxy S24 🚀 Pruébalo Primero"
}
```

---

### Evento #4: Red Bull - Music Academy
```json
{
  "id": "c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a",
  "brand": "Red Bull",
  "title": "Red Bull Music Academy - Masterclass con Productores Internacionales",
  "description": "Serie de masterclasses exclusivas con productores musicales de renombre internacional. Los asistentes aprenden técnicas de producción, sound design y mezcla profesional. Incluye sesiones prácticas con equipamiento de estudio de nivel mundial.",
  "slug": "red-bull-music-academy-masterclass-con-productores-internacionales",
  "category": "Educational Event",
  
  "image": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_main.jpg?token=...",
  "imagePath": "images/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_main.jpg",
  
  "logo": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_logo.png?token=...",
  "logoPath": "images/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_logo.png",
  
  "gallery": [
    {
      "id": "redbull-gallery-001",
      "type": "video",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_gallery_0.mp4?token=...",
      "path": "gallery/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_gallery_0.mp4"
    },
    {
      "id": "redbull-gallery-002",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_gallery_1.jpg?token=...",
      "path": "gallery/c9b7a5d3-2e1f-4c8d-9a6b-8f7e5d4c3b2a_gallery_1.jpg"
    }
  ],
  
  "summary": "Masterclasses exclusivas de producción musical con equipamiento profesional y mentores internacionales",
  
  "highlights": [
    "Productores con Grammy y créditos top 10 Billboard",
    "Estudio profesional con equipamiento de $500K+",
    "Cupos limitados (30 participantes por sesión)",
    "Certificado Red Bull Music Academy al finalizar"
  ],
  
  "keywords": [
    "Red Bull", "music production", "masterclass", "DJ", "producción musical", 
    "sound design", "audio engineering", "Chile", "educación musical", "beatmaking"
  ],
  
  "hashtags": [
    "#RedBullMusicAcademy", "#MusicProduction", "#RBMA", "#ProducciónMusical", "#SoundDesign"
  ],
  
  "instagram_hook": "🎧 ¿Sueñas con producir tracks de nivel mundial?",
  "instagram_body": "Red Bull Music Academy trae a Chile a productores que han trabajado con Beyoncé, Drake y Travis Scott.\n\n3 días intensivos de:\n✅ Técnicas de producción avanzadas\n✅ Mixing & mastering profesional\n✅ Sound design creativo\n✅ Networking con la industria\n\nCupos MUY limitados.",
  "instagram_closing": "Postula antes del 15 de diciembre 👆",
  "instagram_hashtags": "#RedBullMusicAcademy #MusicProduction #RBMA #Chile",
  
  "linkedin_post": "Red Bull Music Academy demuestra cómo las marcas pueden posicionarse como líderes culturales creando valor educativo genuino en comunidades de nicho.",
  "linkedin_article": "## Red Bull Music Academy: Branded Content que Transciende\n\n### El Poder del Contenido Educacional\nRed Bull no vende bebidas energéticas en RBMA. Vende pertenencia a una comunidad global de creadores...",
  
  "alt_title_1": "Red Bull Music Academy: De Bedroom Producer a Estudio Profesional",
  "alt_title_2": "Masterclass Exclusiva: Los Secretos de la Producción de Clase Mundial",
  "alt_instagram": "RBMA 🎛️ Chile Edition"
}
```

---

### Evento #5: Adidas - Running Collective
```json
{
  "id": "e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f",
  "brand": "Adidas",
  "title": "Adidas Running Collective - Desafío Urbano 10K",
  "description": "Carrera urbana nocturna de 10 kilómetros que recorre los puntos icónicos de Santiago. Incluye kit de participación con nueva línea Ultraboost, estaciones de hidratación, pacing teams y after-party con DJs. Combina deporte, comunidad y cultura urbana.",
  "slug": "adidas-running-collective-desafio-urbano-10k",
  "category": "Sports Event",
  
  "image": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_main.jpg?token=...",
  "imagePath": "images/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_main.jpg",
  
  "logo": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_logo.png?token=...",
  "logoPath": "images/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_logo.png",
  
  "gallery": [
    {
      "id": "adidas-gallery-001",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_0.jpg?token=...",
      "path": "gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_0.jpg"
    },
    {
      "id": "adidas-gallery-002",
      "type": "video",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_1.mp4?token=...",
      "path": "gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_1.mp4"
    },
    {
      "id": "adidas-gallery-003",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_2.jpg?token=...",
      "path": "gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_2.jpg"
    },
    {
      "id": "adidas-gallery-004",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_3.jpg?token=...",
      "path": "gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_3.jpg"
    },
    {
      "id": "adidas-gallery-005",
      "type": "image",
      "url": "https://xyzabc.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_4.jpg?token=...",
      "path": "gallery/e4f6d8c2-3a5b-9c1e-7f8d-6e5a4c3d2b1f_gallery_4.jpg"
    }
  ],
  
  "summary": "Carrera urbana nocturna 10K con kit Ultraboost, pacing teams y after-party en Santiago",
  
  "highlights": [
    "Kit runner con remera técnica Adidas + número de competencia",
    "Circuito nocturno iluminado por los icónicos lugares de Santiago",
    "Pacing teams para cada nivel (5:00 a 7:00 min/km)",
    "Medalla finisher + acceso a after-party exclusiva",
    "Premios para top 3 por categoría"
  ],
  
  "keywords": [
    "Adidas", "running", "carrera", "10K", "Ultraboost", 
    "running collective", "Chile", "Santiago", "deportes", "fitness community"
  ],
  
  "hashtags": [
    "#AdidasRunning", "#RunningCollective", "#Ultraboost", "#10KChile", 
    "#ImpossibleIsNothing", "#AdidasChile"
  ],
  
  "instagram_hook": "🏃‍♀️ La noche del 20 de enero, Santiago corre diferente",
  "instagram_body": "Adidas Running Collective presenta el Desafío Urbano 10K. Una carrera que NO es solo una carrera.\n\n🎽 Kit runner exclusivo (incluye polera técnica)\n🏅 Medalla finisher edición limitada\n🎵 After-party con DJs y sorpresas\n👟 Oportunidad de probar Ultraboost Light\n\nCorre, conecta, celebra.",
  "instagram_closing": "Inscripciones abiertas. Link en bio 👆\n#CuposLimitados",
  "instagram_hashtags": "#AdidasRunning #RunningCollective #Ultraboost #10KChile #ImpossibleIsNothing",
  
  "linkedin_post": "Adidas transforma el running en una experiencia de marca completa: deporte + comunidad + cultura urbana. Un modelo de activación BTL que genera engagement genuino.",
  "linkedin_article": "## Adidas Running Collective: Community Building a Través del Deporte\n\n### El Contexto del Running Urbano en Chile\nEl running ha experimentado un boom en Santiago post-pandemia, con grupos informales creciendo 300%...\n\n### Estrategia de Adidas\n1. **Producto como experiencia**: Cada corredor prueba Ultraboost\n2. **Comunidad sobre competencia**: Pacing teams inclusivos\n3. **Cultura urbana**: Circuito que celebra la ciudad\n\n### Resultados Proyectados\n- 2,000 runners inscritos\n- 60% primera carrera con Adidas\n- NPS post-evento: 85+\n- Contenido UGC: 5,000+ posts",
  
  "alt_title_1": "Desafío Urbano 10K: Santiago Corre con Adidas",
  "alt_title_2": "Running Collective: La Carrera que Une a la Ciudad",
  "alt_instagram": "Corremos juntos 🏃‍♂️ 10K Nocturno"
}
```

---

## 🔍 Checklist para Antigravity: Validación de Datos

Al analizar estos eventos, verificar:

### ✅ Campos Requeridos
- [ ] `id` es un UUID válido (formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- [ ] `brand` tiene entre 1 y 50 caracteres
- [ ] `title` tiene entre 1 y 100 caracteres
- [ ] `description` tiene entre 1 y 1000 caracteres
- [ ] `image` es una URL válida (HTTP/HTTPS)
- [ ] `slug` está en formato kebab-case (ej: marca-titulo-evento)

### ✅ Campos de Storage
- [ ] `imagePath` sigue el patrón: `images/{eventId}_main.jpg`
- [ ] `logoPath` sigue el patrón: `images/{eventId}_logo.png`
- [ ] Cada item de `gallery` tiene:
  - [ ] `id` (UUID)
  - [ ] `type` ("image" o "video")
  - [ ] `url` (signed URL temporal)
  - [ ] `path` (patrón: `gallery/{eventId}_gallery_{index}.{ext}`)

### ✅ Campos Opcionales Generados por IA
- [ ] `highlights` es array de strings (3-5 items idealmente)
- [ ] `keywords` es array de strings (8-12 items idealmente)
- [ ] `hashtags` es array de strings (formato #tag)
- [ ] Campos de Instagram (`instagram_hook`, `instagram_body`, etc.) están presentes
- [ ] Campos de LinkedIn están presentes

### ⚠️ Errores Comunes a Detectar
1. **IDs duplicados:** Verificar que no haya dos eventos con el mismo `id`
2. **Slugs duplicados:** Verificar que no haya dos eventos con el mismo `slug`
3. **Imágenes sin path:** Si `imagePath` existe pero `image` no, o viceversa
4. **Gallery malformada:** Items sin `type` o con `type` que no sea "image"|"video"
5. **Campos legacy:** Presencia de `imageUrl`, `imgUrl`, `logoUrl` (deberían convertirse a `image`/`logo`)
6. **Textos truncados:** Títulos cortados exactamente en 100 caracteres (indica posible truncamiento)

---

## 📡 Endpoints del Backend

### GET `/make-server-c4bb2206/events`
**Descripción:** Retorna todos los eventos con signed URLs regeneradas  
**Headers:** `Authorization: Bearer {publicAnonKey}`  
**Response:**
```json
[
  { ...evento1 },
  { ...evento2 },
  ...
]
```

### POST `/make-server-c4bb2206/events`
**Descripción:** Carga masiva de eventos (reemplaza el array completo)  
**Headers:** 
- `Authorization: Bearer {accessToken}` (requiere login admin)
- `Content-Type: application/json`

**Body:**
```json
[
  {
    "brand": "Nike",
    "title": "Lanzamiento Air Max 2024",
    "description": "...",
    "image": "https://...",
    // Otros campos opcionales
  },
  // Más eventos...
]
```

**Auto-Normalización:** Cada evento pasa por `normalizeEvent()` antes de guardarse

### POST `/make-server-c4bb2206/upload-event-assets`
**Descripción:** Sube imagen principal y/o logo a Supabase Storage  
**Headers:** `Authorization: Bearer {accessToken}`  
**Body:** `multipart/form-data`
- `eventId`: UUID del evento
- `mainImage`: Archivo (opcional)
- `logoImage`: Archivo (opcional)

**Response:**
```json
{
  "success": true,
  "imagePath": "images/{eventId}_main.jpg",
  "imageUrl": "https://...signed-url...",
  "logoPath": "images/{eventId}_logo.png",
  "logoUrl": "https://...signed-url..."
}
```

---

## 🚀 Próximos Pasos para Migración

1. **Exportar datos actuales desde Figma/Make**
2. **Mapear campos al esquema `WavEvent`**
3. **Subir imágenes a Supabase Storage** (via Admin Panel o API)
4. **Hacer POST a `/events` con el array completo**
5. **Verificar con GET `/events`** que los datos sean correctos
6. **Validar en frontend** que los eventos se muestren correctamente

---

**Contacto Backend:**  
`/supabase/functions/server/index.tsx` (línea 1-1000+)  
**KV Key:** `wav_events`  
**Bucket:** `make-c4bb2206-wav-assets`  

---

*Documento generado automáticamente el 30/11/2025*  
*Sistema: WAV BTL v2.3.0*
