# 📘 WAV BTL — Documentación Completa para Migración de Datos

**Destinatario:** Antigravity  
**Objetivo:** Migrar eventos reales desde Figma/Make al sistema WAV BTL  
**Fecha:** 30 de Noviembre, 2025  
**Versión del Sistema:** v2.3.0

---

## 📚 ÍNDICE DE DOCUMENTOS

He creado **4 documentos técnicos completos** para coordinar la migración:

### 1. **EVENTOS_DATA_EXPORT.md** 
📊 *Exportación de Datos y Arquitectura del Sistema*

**Contenido:**
- Arquitectura de almacenamiento (KV Store)
- Esquema completo `WavEvent` (TypeScript Interface)
- Sistema de auto-normalización
- Estructura de Supabase Storage
- 5 eventos de ejemplo completos (datos hipotéticos para referencia)
- Endpoints del backend

**Usa este documento para:**
- ✅ Entender la estructura de datos
- ✅ Ver ejemplos de eventos bien formados
- ✅ Conocer los endpoints disponibles

---

### 2. **GUIA_MIGRACION_ERRORES.md**
🔧 *Guía de Migración y Detección de Errores*

**Contenido:**
- 7 errores más comunes detectados
- Validaciones paso a paso
- Scripts de validación completos (JavaScript)
- Flujo de trabajo recomendado (6 pasos)
- Checklist para migración

**Usa este documento para:**
- ✅ Validar tus datos ANTES de subir
- ✅ Detectar duplicados, campos faltantes, etc.
- ✅ Ejecutar el script de validación incluido

---

### 3. **DATOS_REALES_EVENTOS.md**
📸 *Análisis de Datos Actuales del Sistema*

**Contenido:**
- Análisis de los 50 eventos actuales en `/data/events.ts`
- Problemas detectados (campos faltantes, datos demo)
- Comparación: Datos Actuales vs. Datos Reales Esperados
- Recomendaciones específicas para Antigravity

**Usa este documento para:**
- ✅ Entender el estado actual (datos demo)
- ✅ Ver qué falta para producción
- ✅ Comparar con tus datos reales

---

### 4. **STORAGE_IMAGENES_VIDEOS.md**
🗄️ *Sistema de Almacenamiento de Imágenes y Videos*

**Contenido:**
- Arquitectura de Supabase Storage
- Cómo subir imágenes (endpoint, código)
- Signed URLs (URLs firmadas temporales)
- Estructura de galería multimedia
- Mejores prácticas de optimización
- Troubleshooting común

**Usa este documento para:**
- ✅ Subir imágenes y logos a Supabase Storage
- ✅ Implementar galerías multimedia
- ✅ Resolver problemas de URLs expiradas

---

## 🎯 RESUMEN EJECUTIVO

### Estado Actual
- **50 eventos** en el sistema (datos demo)
- Campos mínimos: `brand`, `title`, `description`, `image`
- Imágenes de Unsplash (stock, no reales)
- Sin categorización, sin logos, sin galerías
- **Funciona** pero solo para demostración

### Lo Que Necesitamos
- **Eventos reales** documentados de WAV
- **Assets reales:** Fotos, videos, logos de cada evento
- **Categorización** según tipo de evento
- **Datos verificables:** Fechas, ubicaciones, métricas
- **Estructura completa** según esquema `WavEvent`

---

## 🚀 PLAN DE ACCIÓN SUGERIDO

### FASE 1: AUDITORÍA (1-2 días)
**Objetivo:** Identificar qué eventos reales tiene WAV documentados

**Tareas:**
1. ✅ Revisar portafolio de eventos ejecutados por WAV
2. ✅ Listar eventos con:
   - Fotos de calidad
   - Videos del evento
   - Logo de la marca cliente
   - Datos verificables (fecha, ubicación, asistentes)
3. ✅ Priorizar 10 eventos "estrella" para comenzar

**Output:** Lista de 10 eventos reales con assets disponibles

---

### FASE 2: PREPARACIÓN DE DATOS (2-3 días)
**Objetivo:** Estructurar datos según esquema `WavEvent`

**Tareas:**
1. ✅ Para cada evento, crear objeto con:
   ```javascript
   {
     brand: "Nombre Exacto",
     title: "Título Descriptivo (max 100 chars)",
     description: "Descripción detallada con fecha, ubicación, resultados (200-800 chars)",
     category: "Seleccionar de lista oficial",
     // ... otros campos
   }
   ```

2. ✅ Optimizar imágenes:
   - Imagen principal: 1080x1620px (2:3 ratio), JPG 85%
   - Logo: PNG con transparencia, 512x512px
   - Galería: Max 1920x1080px, JPG 80%

3. ✅ Ejecutar script de validación (incluido en `GUIA_MIGRACION_ERRORES.md`)

**Output:** Array de 10 objetos `WavEvent` validados + assets optimizados

---

### FASE 3: UPLOAD DE ASSETS (1 día)
**Objetivo:** Subir imágenes y videos a Supabase Storage

**Tareas:**
1. ✅ Login al sistema con credenciales admin
   ```javascript
   const { data: { session } } = await supabase.auth.signInWithPassword({
     email: 'admin@wearevision.cl',
     password: 'tu-password'
   });
   ```

2. ✅ Para cada evento:
   ```javascript
   // Subir imagen principal y logo
   const formData = new FormData();
   formData.append('eventId', evento.id);
   formData.append('mainImage', archivoImagen);
   formData.append('logoImage', archivoLogo);
   
   const res = await fetch(`${API_URL}/upload-event-assets`, {
     method: 'POST',
     headers: { 'Authorization': `Bearer ${accessToken}` },
     body: formData
   });
   
   const { imagePath, imageUrl, logoPath, logoUrl } = await res.json();
   
   // Actualizar evento
   evento.image = imageUrl;
   evento.imagePath = imagePath;
   evento.logo = logoUrl;
   evento.logoPath = logoPath;
   ```

3. ✅ Subir items de galería (via Admin Panel o script custom)

**Output:** 10 eventos con todas las imágenes subidas a Supabase Storage

---

### FASE 4: CARGA MASIVA (1 hora)
**Objetivo:** Subir eventos completos al sistema

**Tareas:**
1. ✅ Validación final:
   ```javascript
   const validation = checkDuplicates(eventosCompletos);
   if (validation.length > 0) {
     console.error('⚠️ DUPLICADOS:', validation);
     // Resolver antes de continuar
   }
   ```

2. ✅ POST a `/events`:
   ```javascript
   const res = await fetch(`${API_URL}/events`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${accessToken}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(eventosCompletos)
   });
   
   console.log('✅ Subidos:', (await res.json()).count, 'eventos');
   ```

3. ✅ Verificación:
   ```javascript
   const verify = await fetch(`${API_URL}/events`);
   const eventos = await verify.json();
   console.log('Total en sistema:', eventos.length);
   ```

**Output:** 10 eventos reales en producción

---

### FASE 5: ENRIQUECIMIENTO CON IA (2-3 días)
**Objetivo:** Generar contenido SEO y social media con el Admin Panel

**Tareas:**
1. ✅ Login al Admin Panel (https://btl.wearevision.cl/admin)
2. ✅ Para cada evento:
   - Seleccionar en lista
   - Abrir chat de IA
   - Generar keywords, hashtags, posts de Instagram/LinkedIn
   - Aprobar y guardar
3. ✅ Review final de contenido generado

**Output:** 10 eventos con contenido SEO y social media completo

---

### FASE 6: QA Y LAUNCH (1 día)
**Objetivo:** Verificar que todo funcione en producción

**Tareas:**
1. ✅ Probar frontend:
   - Mosaico muestra eventos correctamente
   - Imágenes cargan sin errores
   - Modal abre con toda la info
   - Galería funciona (si aplica)
2. ✅ Verificar SEO:
   - Meta tags correctos
   - Structured data (JSON-LD)
   - Sitemap.xml actualizado
3. ✅ Performance:
   - Imágenes optimizadas
   - Carga < 3 segundos
   - Mobile responsive

**Output:** Sistema en producción con eventos reales

---

## 📋 DATOS NECESARIOS POR EVENTO

Para cada evento que Antigravity migre, necesitamos:

### MÍNIMO VIABLE (MVP)
- [x] **brand:** Nombre de la marca (ej: "Nike")
- [x] **title:** Título del evento (ej: "Air Max Launch 2024")
- [x] **description:** Descripción de 200-800 caracteres con:
  - Qué se hizo
  - Cuándo y dónde
  - Resultados/impacto
- [x] **image:** URL de imagen principal (mejor si está en Supabase Storage)

### RECOMENDADO (PRODUCCIÓN)
- [ ] **category:** Categoría del evento (seleccionar de lista oficial)
- [ ] **logo:** Logo de la marca cliente (PNG con transparencia)
- [ ] **summary:** Resumen de 1-2 líneas para SEO
- [ ] **highlights:** 3-5 puntos clave (métricas, logros)

### OPCIONAL (ENRIQUECIMIENTO)
- [ ] **gallery:** 2-5 imágenes/videos del evento
- [ ] **keywords:** Keywords SEO (se puede generar con IA)
- [ ] **hashtags:** Hashtags (se puede generar con IA)
- [ ] Contenido social media (se puede generar con IA)

---

## 🔗 ENDPOINTS CLAVE

### Backend Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206
```

### 1. GET /events
**Descripción:** Obtener todos los eventos  
**Auth:** Público (usa `publicAnonKey`)  
**Response:** Array de eventos con signed URLs regeneradas

```bash
curl -X GET "https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/events" \
  -H "Authorization: Bearer {publicAnonKey}"
```

### 2. POST /events
**Descripción:** Carga masiva de eventos (reemplaza array completo)  
**Auth:** Requiere `accessToken` (admin login)  
**Body:** Array JSON de eventos

```bash
curl -X POST "https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/events" \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '[{"brand": "Nike", "title": "...", ...}]'
```

### 3. POST /upload-event-assets
**Descripción:** Subir imagen principal y/o logo  
**Auth:** Requiere `accessToken`  
**Body:** `multipart/form-data` con `eventId`, `mainImage`, `logoImage`

```javascript
const formData = new FormData();
formData.append('eventId', 'uuid-here');
formData.append('mainImage', fileInput.files[0]);
formData.append('logoImage', logoFile);

fetch(`${API_URL}/upload-event-assets`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${accessToken}` },
  body: formData
});
```

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "Validation failed for event"
**Causa:** Faltan campos obligatorios (`brand`, `title`, `description`, `image`)  
**Solución:** Verificar que cada evento tenga los 4 campos mínimos

### Error: "Duplicate ID detected"
**Causa:** Dos eventos con el mismo UUID  
**Solución:** El backend auto-corrige, pero revisar logs para encontrar el original

### Error: "Duplicate slug detected"
**Causa:** Dos eventos con el mismo slug (ej: "nike-air-max")  
**Solución:** El backend agrega contador (nike-air-max-2), pero mejor generar slug único

### Error: "Upload failed: 413 Payload Too Large"
**Causa:** Archivo > 50MB  
**Solución:** Comprimir imagen/video antes de subir

### Error: "Signed URL expired (404)"
**Causa:** URL firmada expiró (24h)  
**Solución:** Hacer GET `/events` para regenerar URLs automáticamente

---

## 📞 CONTACTO Y SOPORTE

### Documentación Técnica
- **Backend:** `/supabase/functions/server/index.tsx`
- **Normalizador:** Línea 250-389
- **Validador:** Línea 138-150
- **Upload Handler:** Línea ~700-800

### Logs en Tiempo Real
```bash
# Ver logs del servidor
supabase functions logs make-server-c4bb2206 --follow
```

### Debugging
```javascript
// Ver eventos en consola del navegador
const events = await fetch('https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/events')
  .then(r => r.json());
console.table(events);
```

---

## ✅ CHECKLIST FINAL

Antes de considerar la migración completa:

### Datos
- [ ] Mínimo 10 eventos reales documentados
- [ ] Cada evento tiene los 4 campos obligatorios
- [ ] Categorización asignada
- [ ] Descripciones con datos verificables (fechas, ubicaciones, métricas)

### Assets
- [ ] Imágenes principales optimizadas (2:3 ratio)
- [ ] Logos de marca en PNG con transparencia
- [ ] Galería con 2-5 items multimedia (si aplica)
- [ ] Todo subido a Supabase Storage

### Validación
- [ ] Script de validación ejecutado sin errores
- [ ] Sin IDs o slugs duplicados
- [ ] URLs firmadas funcionando
- [ ] Frontend muestra eventos correctamente

### SEO & Content
- [ ] Keywords generadas (manual o con IA)
- [ ] Hashtags relevantes
- [ ] Summary para meta description
- [ ] Contenido social media (opcional, se puede generar después)

### Testing
- [ ] Modal abre sin errores
- [ ] Galería funciona (si aplica)
- [ ] Mobile responsive
- [ ] Performance < 3s carga inicial
- [ ] Sitemap.xml actualizado

---

## 🎓 RECURSOS ADICIONALES

### Categorías Válidas
```javascript
const VALID_CATEGORIES = [
  'Product Launch',        // Lanzamiento de producto
  'Brand Activation',      // Activación de marca
  'Product Showcase',      // Exhibición de producto
  'Educational Event',     // Evento educativo
  'Sports Event',          // Evento deportivo
  'Music Event',           // Evento musical
  'Cultural Event',        // Evento cultural
  'Corporate Event',       // Evento corporativo
  'Experiential Marketing',// Marketing experiencial
  'Pop-up Store'          // Tienda temporal
];
```

### Ejemplo de Evento Completo
```json
{
  "id": "abc-123-uuid",
  "brand": "Nike",
  "title": "Air Max Launch Chile 2024",
  "description": "Lanzamiento exclusivo de la colección Air Max 2024 realizado el 15 de marzo 2024 en el Centro Cultural Gabriela Mistral. Experiencia inmersiva con instalación de luz reactiva, zona de customización de zapatillas y DJ set en vivo. Asistencia: 500 personas. Resultado: 1,200 pares vendidos en preventa, 2.5M impresiones en RRSS.",
  "slug": "nike-air-max-launch-chile-2024",
  "category": "Product Launch",
  
  "image": "https://{supabase}/storage/.../nike-airmax-main.jpg",
  "imagePath": "images/abc-123-uuid_main.jpg",
  
  "logo": "https://{supabase}/storage/.../nike-logo.png",
  "logoPath": "images/abc-123-uuid_logo.png",
  
  "gallery": [
    {
      "id": "gal-1",
      "type": "image",
      "url": "https://{supabase}/storage/.../instalacion.jpg",
      "path": "gallery/abc-123-uuid_gallery_0.jpg"
    },
    {
      "id": "gal-2",
      "type": "video",
      "url": "https://{supabase}/storage/.../video-recap.mp4",
      "path": "gallery/abc-123-uuid_gallery_1.mp4"
    }
  ],
  
  "summary": "Lanzamiento exclusivo Air Max 2024 con instalación inmersiva. 500 asistentes, 1,200 pares vendidos.",
  
  "highlights": [
    "Instalación de luz reactiva controlada por movimiento",
    "Zona de customización con artistas locales",
    "500 sneakerheads confirmados",
    "1,200 pares vendidos en preventa",
    "2.5M impresiones en redes sociales"
  ],
  
  "keywords": [
    "Nike", "Air Max", "lanzamiento", "Chile", "sneakers",
    "BTL", "marketing experiencial", "activación de marca"
  ],
  
  "hashtags": [
    "#NikeAirMax", "#JustDoIt", "#NikeChile", "#SneakerheadCL"
  ]
}
```

---

## 📖 ORDEN DE LECTURA RECOMENDADO

Para Antigravity, sugiero leer en este orden:

1. **Este documento (README)** → Overview general
2. **EVENTOS_DATA_EXPORT.md** → Entender la arquitectura
3. **DATOS_REALES_EVENTOS.md** → Ver el estado actual
4. **GUIA_MIGRACION_ERRORES.md** → Validar tus datos
5. **STORAGE_IMAGENES_VIDEOS.md** → Subir assets

---

## 🏁 CONCLUSIÓN

El sistema WAV BTL está **100% listo** para recibir eventos reales. El backend tiene:

✅ Auto-normalización de datos  
✅ Validación estricta  
✅ Detección de duplicados  
✅ Gestión de storage con signed URLs  
✅ Regeneración automática de URLs  
✅ Soporte para galerías multimedia  
✅ Integración con IA para contenido SEO/social  

Lo único que falta es **migrar los datos reales** desde Figma/Make siguiendo esta documentación.

**Próximo paso:** Auditar eventos reales de WAV y comenzar FASE 1.

---

*Documentación creada el 30 de Noviembre, 2025*  
*Por: Equipo WAV BTL Development*  
*Para: Antigravity (Migración de Datos)*  
*Sistema: v2.3.0*

---

**¿Preguntas? Contactar al equipo de desarrollo.**
