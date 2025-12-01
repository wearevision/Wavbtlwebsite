# 🔧 WAV BTL — Guía de Migración y Detección de Errores

**Para:** Antigravity (Migración de datos desde Figma/Make)  
**De:** Equipo WAV BTL Development  
**Fecha:** 30 de Noviembre, 2025

---

## 🎯 Objetivo de Este Documento

Coordinar la migración de eventos reales desde el CMS de Figma/Make al sistema WAV BTL, identificando y previniendo errores comunes en la estructura de datos.

---

## ⚠️ ERRORES MÁS COMUNES DETECTADOS

### 1. Campos Faltantes (Crítico)

**Problema:** Eventos sin `description` o `image`

**Ejemplo de error detectado:**
```json
{
  "id": "30578cba-72e3-4b7e-b517-b889bf6d9352",
  "brand": "Nike",
  "title": "Lanzamiento Air Max",
  // ❌ FALTA: description
  // ❌ FALTA: image
  "slug": "nike-lanzamiento-air-max"
}
```

**✅ Solución Backend Implementada:**
El sistema ahora auto-normaliza estos casos:
- `description` → `"Descripción pendiente."`
- `image` → URL de Unsplash como fallback

**🔍 Cómo Detectar:**
```bash
# Revisar logs del servidor después de subir eventos
# Buscar líneas como:
[Normalize] Event {id} has no valid description, using default.
[Normalize] Event {id} has no valid image, using fallback.
```

**💡 Recomendación para Antigravity:**
Antes de hacer POST, validar cada evento con este checklist mínimo:
```javascript
const validateMinimum = (event) => {
  const errors = [];
  
  if (!event.brand || event.brand.trim() === '') {
    errors.push('brand está vacío');
  }
  
  if (!event.title || event.title.trim() === '') {
    errors.push('title está vacío');
  }
  
  if (!event.description || event.description.trim() === '') {
    errors.push('description está vacío o faltante');
  }
  
  if (!event.image || event.image.trim() === '') {
    errors.push('image está vacío o faltante');
  }
  
  return errors;
};
```

---

### 2. Campos con Nombres Legacy (Advertencia)

**Problema:** Usar nombres de campos antiguos que ya no existen en el esquema

**Ejemplos de campos legacy detectados:**
```json
{
  "imgUrl": "https://...",       // ❌ Debería ser "image"
  "imageUrl": "https://...",     // ❌ Debería ser "image"
  "logoUrl": "https://...",      // ❌ Debería ser "logo"
  "brandLogo": "https://...",    // ❌ Debería ser "logo"
  "brand_logo": "https://...",   // ❌ Debería ser "logo"
  "titulo": "...",               // ❌ Campo inválido (no existe)
  "descripcion": "...",          // ❌ Campo inválido (no existe)
}
```

**✅ Solución Backend Implementada:**
El normalizador convierte automáticamente:
- `imageUrl`, `imgUrl`, `img`, `imgURL` → `image`
- `logoUrl`, `brandLogo`, `brand_logo` → `logo`
- Cualquier otro campo NO permitido es **removido** del objeto final

**🔍 Cómo Detectar:**
```bash
# Logs del servidor mostrarán:
[Normalize] Converted legacy 'imageUrl' → 'image' for event {id}
[Normalize] Removed non-WavEvent fields for {id}: titulo, descripcion
```

**💡 Recomendación para Antigravity:**
Hacer un pre-procesamiento de los datos antes de enviarlos:
```javascript
const convertLegacyFields = (rawEvent) => {
  return {
    ...rawEvent,
    // Convertir campos legacy
    image: rawEvent.image || rawEvent.imageUrl || rawEvent.imgUrl || rawEvent.img,
    logo: rawEvent.logo || rawEvent.logoUrl || rawEvent.brandLogo || rawEvent.brand_logo,
    // Remover campos legacy
    imageUrl: undefined,
    imgUrl: undefined,
    logoUrl: undefined,
    brandLogo: undefined,
    brand_logo: undefined
  };
};
```

---

### 3. IDs o Slugs Duplicados (Crítico)

**Problema:** Dos o más eventos con el mismo ID o slug

**Ejemplo de error:**
```json
[
  {
    "id": "abc123",
    "slug": "nike-air-max",
    "brand": "Nike",
    "title": "Air Max 2024"
  },
  {
    "id": "abc123",  // ❌ DUPLICADO!
    "slug": "nike-air-max",  // ❌ DUPLICADO!
    "brand": "Nike",
    "title": "Air Max Limited Edition"
  }
]
```

**✅ Solución Backend Implementada:**
El sistema detecta duplicados y auto-corrige:

**Para IDs duplicados:**
```javascript
// Si detecta ID duplicado, genera uno nuevo:
finalId = `${originalId}-${Date.now()}-${randomString}`
// Ejemplo: "abc123-1733001234567-x7k2m"
```

**Para Slugs duplicados:**
```javascript
// Si detecta slug duplicado, agrega contador:
finalSlug = `${baseSlug}-2`
// Ejemplo: "nike-air-max" → "nike-air-max-2"
```

**🔍 Cómo Detectar:**
```bash
# Logs del servidor mostrarán:
[POST /events] Duplicate ID detected. Generated new ID: abc123-1733001234567-x7k2m
[POST /events] Duplicate slug detected. Changed "nike-air-max" → "nike-air-max-2"
```

**💡 Recomendación para Antigravity:**
Antes de enviar datos, verificar unicidad:
```javascript
const checkDuplicates = (events) => {
  const ids = new Map();
  const slugs = new Map();
  const duplicates = [];
  
  events.forEach((event, index) => {
    // Check ID
    if (ids.has(event.id)) {
      duplicates.push({
        type: 'ID',
        value: event.id,
        positions: [ids.get(event.id), index]
      });
    } else {
      ids.set(event.id, index);
    }
    
    // Check Slug
    if (slugs.has(event.slug)) {
      duplicates.push({
        type: 'SLUG',
        value: event.slug,
        positions: [slugs.get(event.slug), index]
      });
    } else {
      slugs.set(event.slug, index);
    }
  });
  
  return duplicates;
};

// Uso:
const dupes = checkDuplicates(eventsArray);
if (dupes.length > 0) {
  console.error('DUPLICADOS DETECTADOS:', dupes);
  // Manejar antes de hacer POST
}
```

---

### 4. Textos Excediendo Límites (Advertencia)

**Problema:** Textos más largos que el límite permitido

**Límites Estrictos:**
- `brand`: 50 caracteres
- `title`: 100 caracteres
- `description`: 1000 caracteres

**Ejemplo de error:**
```json
{
  "brand": "Nike Inc. - Innovación Deportiva y Tecnología de Alto Rendimiento para Atletas Profesionales",  
  // ❌ 91 caracteres (excede 50)
  
  "title": "Lanzamiento Exclusivo de la Nueva Colección Air Max 2024 con Tecnología de Amortiguación Revolucionaria y Diseño Sostenible para el Futuro del Running",
  // ❌ 154 caracteres (excede 100)
}
```

**✅ Solución Backend Implementada:**
El normalizador trunca automáticamente:
```javascript
if (brand.length > 50) {
  brand = brand.substring(0, 50);
  // "Nike Inc. - Innovación Deportiva y Tecnología de" (cortado en 50)
}

if (title.length > 100) {
  title = title.substring(0, 100);
  // "Lanzamiento Exclusivo de la Nueva Colección Air Max 2024 con Tecnología de Amortiguación Revolu" (cortado en 100)
}
```

**🔍 Cómo Detectar:**
```bash
# Logs del servidor:
[Normalize] Brand truncated to 50 chars for event {id}
[Normalize] Title truncated to 100 chars for event {id}
[Normalize] Description truncated to 1000 chars for event {id}
```

**⚠️ PROBLEMA CON TRUNCAMIENTO:**
El truncamiento puede cortar palabras a la mitad:
```
Texto original: "Tecnología Revolucionaria"
Texto truncado: "Tecnología Revolucion" ← ¡Palabra cortada!
```

**💡 Recomendación para Antigravity:**
Pre-validar límites y avisar al usuario ANTES de subir:
```javascript
const validateLengths = (event) => {
  const warnings = [];
  
  if (event.brand.length > 50) {
    warnings.push({
      field: 'brand',
      current: event.brand.length,
      max: 50,
      preview: event.brand.substring(0, 50) + '...'
    });
  }
  
  if (event.title.length > 100) {
    warnings.push({
      field: 'title',
      current: event.title.length,
      max: 100,
      preview: event.title.substring(0, 100) + '...'
    });
  }
  
  if (event.description.length > 1000) {
    warnings.push({
      field: 'description',
      current: event.description.length,
      max: 1000,
      preview: event.description.substring(0, 100) + '...'
    });
  }
  
  return warnings;
};
```

---

### 5. URLs de Imágenes Inválidas o Rotas (Crítico)

**Problema:** URLs que no apuntan a imágenes válidas

**Ejemplos de errores:**
```json
{
  "image": "http://localhost:3000/image.jpg",  // ❌ localhost no funciona en producción
  "image": "/assets/nike.jpg",                 // ❌ Ruta relativa inválida
  "image": "www.example.com/photo.jpg",        // ❌ Falta protocolo http(s)
  "image": "",                                  // ❌ String vacío
  "image": null,                                // ❌ Null
  "logo": "data:image/png;base64,iVBORw0KG..." // ⚠️ Base64 (no recomendado, usar Supabase Storage)
}
```

**✅ Solución Backend Implementada:**
Si la imagen es inválida, usa fallback de Unsplash:
```javascript
if (!image || typeof image !== 'string' || image.trim() === '') {
  image = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80';
}
```

**💡 Recomendación para Antigravity:**

**Opción A: Usar URLs externas (más rápido)**
```json
{
  "image": "https://cdn.ejemplo.com/eventos/nike-air-max.jpg",
  "logo": "https://cdn.ejemplo.com/logos/nike.png"
}
```
✅ Ventaja: Carga inmediata, no requiere subir archivos  
❌ Desventaja: Dependes de servidor externo, URLs pueden expirar

**Opción B: Subir a Supabase Storage (recomendado para producción)**
```javascript
// Flujo completo:
// 1. Crear evento con ID temporal
const eventId = crypto.randomUUID();

// 2. Subir imagen a Supabase Storage via API
const formData = new FormData();
formData.append('eventId', eventId);
formData.append('mainImage', imageFile);
formData.append('logoImage', logoFile);

const uploadResponse = await fetch(
  'https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/upload-event-assets',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
  }
);

const { imagePath, imageUrl, logoPath, logoUrl } = await uploadResponse.json();

// 3. Crear evento con los paths y URLs
const event = {
  id: eventId,
  brand: "Nike",
  title: "Air Max 2024",
  image: imageUrl,        // URL firmada (temporal, 24h)
  imagePath: imagePath,   // Ruta permanente en bucket
  logo: logoUrl,
  logoPath: logoPath,
  // ... resto de campos
};

// 4. Enviar a POST /events
```

✅ Ventaja: Control total, URLs siempre disponibles, privacidad  
❌ Desventaja: Más complejo, requiere dos requests (upload + create)

---

### 6. Galería Malformada (Advertencia)

**Problema:** Array de galería con estructura incorrecta

**Ejemplos de errores:**
```json
{
  "gallery": "https://img1.jpg, https://img2.jpg"  
  // ❌ String en vez de array
}

{
  "gallery": [
    "https://img1.jpg",  // ❌ String directo (falta estructura)
    "https://img2.jpg"
  ]
}

{
  "gallery": [
    {
      "url": "https://img1.jpg"  // ❌ Falta 'id' y 'type'
    }
  ]
}

{
  "gallery": [
    {
      "id": "abc123",
      "type": "pdf",  // ❌ Type inválido (solo 'image' o 'video')
      "url": "https://doc.pdf"
    }
  ]
}
```

**✅ Formato Correcto:**
```json
{
  "gallery": [
    {
      "id": "unique-id-1",
      "type": "image",
      "url": "https://images.com/photo1.jpg",
      "path": "gallery/eventId_gallery_0.jpg"  // Opcional si está en Supabase
    },
    {
      "id": "unique-id-2",
      "type": "video",
      "url": "https://videos.com/clip1.mp4",
      "path": "gallery/eventId_gallery_1.mp4"
    }
  ]
}
```

**✅ Solución Backend Implementada:**
```javascript
// Si gallery es string separado por comas, lo convierte:
if (typeof rawEvent.gallery === 'string') {
  const items = rawEvent.gallery.split(',').map(s => s.trim()).filter(Boolean);
  gallery = items.map(url => ({
    id: crypto.randomUUID(),
    type: 'image',  // Asume image por defecto
    url: url
  }));
}

// Si gallery falta o es undefined, asigna array vacío:
if (!Array.isArray(rawEvent.gallery)) {
  gallery = [];
}
```

**💡 Recomendación para Antigravity:**
Validar estructura antes de enviar:
```javascript
const validateGallery = (gallery) => {
  if (!Array.isArray(gallery)) {
    return { valid: false, error: 'gallery debe ser un array' };
  }
  
  for (let i = 0; i < gallery.length; i++) {
    const item = gallery[i];
    
    if (!item.id || typeof item.id !== 'string') {
      return { valid: false, error: `Item ${i}: falta campo 'id'` };
    }
    
    if (!item.type || !['image', 'video'].includes(item.type)) {
      return { valid: false, error: `Item ${i}: 'type' debe ser 'image' o 'video'` };
    }
    
    if (!item.url || typeof item.url !== 'string') {
      return { valid: false, error: `Item ${i}: falta campo 'url'` };
    }
  }
  
  return { valid: true };
};
```

---

### 7. Categorías Inválidas (Advertencia)

**Problema:** Usar categorías que no existen en el sistema

**Categorías Válidas** (según `/utils/contentRules.ts`):
```typescript
const VALID_CATEGORIES = [
  'Product Launch',
  'Brand Activation',
  'Product Showcase',
  'Educational Event',
  'Sports Event',
  'Music Event',
  'Cultural Event',
  'Corporate Event',
  'Experiential Marketing',
  'Pop-up Store'
];
```

**Ejemplos de errores:**
```json
{
  "category": "lanzamiento"  // ❌ En español (debe ser en inglés)
}

{
  "category": "product-launch"  // ❌ Con guiones (debe ser espacios)
}

{
  "category": "Launch Event"  // ❌ No existe (debe ser "Product Launch")
}
```

**✅ Solución Backend Implementada:**
El campo `category` se acepta como está (no hay validación estricta), pero se recomienda usar las categorías oficiales para consistencia.

**💡 Recomendación para Antigravity:**
```javascript
const VALID_CATEGORIES = [
  'Product Launch',
  'Brand Activation',
  'Product Showcase',
  'Educational Event',
  'Sports Event',
  'Music Event',
  'Cultural Event',
  'Corporate Event',
  'Experiential Marketing',
  'Pop-up Store'
];

const validateCategory = (category) => {
  if (!category || category.trim() === '') {
    return { valid: true, warning: 'Sin categoría asignada' };
  }
  
  if (!VALID_CATEGORIES.includes(category)) {
    return { 
      valid: false, 
      error: `Categoría "${category}" no es válida`,
      suggestion: `Usar una de: ${VALID_CATEGORIES.join(', ')}`
    };
  }
  
  return { valid: true };
};
```

---

## 🔄 Flujo de Trabajo Recomendado

### Paso 1: Exportar desde Figma/Make
```javascript
// Obtener datos crudos desde tu CMS
const rawEvents = await fetchEventsFromCMS();
console.log(`Eventos obtenidos: ${rawEvents.length}`);
```

### Paso 2: Pre-Validación Local
```javascript
const validationResults = rawEvents.map((event, index) => {
  return {
    index,
    brand: event.brand,
    title: event.title,
    errors: [
      ...validateMinimum(event),
      ...validateLengths(event).map(w => `⚠️ ${w.field} excede límite`),
      ...(validateGallery(event.gallery).valid ? [] : [validateGallery(event.gallery).error]),
      ...(validateCategory(event.category).valid ? [] : [validateCategory(event.category).error])
    ],
    duplicates: [] // Se llena después
  };
});

// Check duplicados globales
const duplicates = checkDuplicates(rawEvents);
duplicates.forEach(dup => {
  dup.positions.forEach(pos => {
    validationResults[pos].duplicates.push(`${dup.type}: ${dup.value}`);
  });
});

// Mostrar reporte
validationResults.forEach(result => {
  if (result.errors.length > 0 || result.duplicates.length > 0) {
    console.error(`\n❌ Evento #${result.index}: ${result.brand} - ${result.title}`);
    result.errors.forEach(err => console.error(`  - ${err}`));
    result.duplicates.forEach(dup => console.error(`  - DUPLICADO: ${dup}`));
  }
});
```

### Paso 3: Convertir Campos Legacy
```javascript
const cleanedEvents = rawEvents.map(event => convertLegacyFields(event));
```

### Paso 4: Subir Imágenes (si usas Supabase Storage)
```javascript
// Solo si tienes archivos locales y quieres subirlos a Supabase
for (const event of cleanedEvents) {
  if (event.imageFile) {
    const formData = new FormData();
    formData.append('eventId', event.id);
    formData.append('mainImage', event.imageFile);
    
    if (event.logoFile) {
      formData.append('logoImage', event.logoFile);
    }
    
    const uploadRes = await fetch(`${API_URL}/upload-event-assets`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
      body: formData
    });
    
    const { imagePath, imageUrl, logoPath, logoUrl } = await uploadRes.json();
    
    event.image = imageUrl;
    event.imagePath = imagePath;
    event.logo = logoUrl || '';
    event.logoPath = logoPath || '';
    
    // Remover archivos temporales
    delete event.imageFile;
    delete event.logoFile;
  }
}
```

### Paso 5: POST Eventos al Backend
```javascript
const response = await fetch(`${API_URL}/events`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(cleanedEvents)
});

if (!response.ok) {
  const errorData = await response.json();
  console.error('Error al subir eventos:', errorData);
  throw new Error(errorData.error);
}

const result = await response.json();
console.log(`✅ ${result.count} eventos guardados correctamente`);
```

### Paso 6: Verificar con GET
```javascript
const verifyResponse = await fetch(`${API_URL}/events`, {
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  }
});

const savedEvents = await verifyResponse.json();
console.log(`Eventos en sistema: ${savedEvents.length}`);

// Comparar con lo que subiste
if (savedEvents.length !== cleanedEvents.length) {
  console.warn(`⚠️ Discrepancia: Subiste ${cleanedEvents.length}, hay ${savedEvents.length}`);
}
```

---

## 📊 Script de Validación Completo

```javascript
// validation-script.js
// Ejecutar ANTES de hacer POST a /events

const API_URL = 'https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206';
const publicAnonKey = '{publicAnonKey}';
const accessToken = '{obtenerDesdeLogin}';

const VALID_CATEGORIES = [
  'Product Launch', 'Brand Activation', 'Product Showcase',
  'Educational Event', 'Sports Event', 'Music Event',
  'Cultural Event', 'Corporate Event', 'Experiential Marketing', 'Pop-up Store'
];

function validateEvent(event, index) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!event.id || event.id.trim() === '') {
    errors.push('❌ Campo "id" faltante (se auto-generará)');
  }
  
  if (!event.brand || event.brand.trim() === '') {
    errors.push('❌ Campo "brand" faltante o vacío');
  } else if (event.brand.length > 50) {
    warnings.push(`⚠️ "brand" excede 50 caracteres (${event.brand.length}). Se truncará.`);
  }
  
  if (!event.title || event.title.trim() === '') {
    errors.push('❌ Campo "title" faltante o vacío');
  } else if (event.title.length > 100) {
    warnings.push(`⚠️ "title" excede 100 caracteres (${event.title.length}). Se truncará.`);
  }
  
  if (!event.description || event.description.trim() === '') {
    errors.push('❌ Campo "description" faltante o vacío');
  } else if (event.description.length > 1000) {
    warnings.push(`⚠️ "description" excede 1000 caracteres (${event.description.length}). Se truncará.`);
  }
  
  if (!event.image || event.image.trim() === '') {
    errors.push('❌ Campo "image" faltante o vacío');
  } else if (!event.image.startsWith('http')) {
    errors.push(`❌ "image" no es una URL válida: ${event.image}`);
  }
  
  // Category validation
  if (event.category && !VALID_CATEGORIES.includes(event.category)) {
    warnings.push(`⚠️ Categoría "${event.category}" no está en la lista oficial`);
  }
  
  // Gallery validation
  if (event.gallery && !Array.isArray(event.gallery)) {
    errors.push('❌ "gallery" debe ser un array');
  } else if (Array.isArray(event.gallery)) {
    event.gallery.forEach((item, i) => {
      if (!item.id) errors.push(`❌ gallery[${i}] falta campo "id"`);
      if (!item.type || !['image', 'video'].includes(item.type)) {
        errors.push(`❌ gallery[${i}] "type" debe ser "image" o "video"`);
      }
      if (!item.url) errors.push(`❌ gallery[${i}] falta campo "url"`);
    });
  }
  
  // Legacy fields warning
  const legacyFields = ['imageUrl', 'imgUrl', 'logoUrl', 'brandLogo', 'brand_logo'];
  const foundLegacy = legacyFields.filter(field => event[field]);
  if (foundLegacy.length > 0) {
    warnings.push(`⚠️ Campos legacy detectados: ${foundLegacy.join(', ')} (se auto-convertirán)`);
  }
  
  return { errors, warnings };
}

function checkDuplicates(events) {
  const ids = new Map();
  const slugs = new Map();
  const duplicates = [];
  
  events.forEach((event, index) => {
    if (ids.has(event.id)) {
      duplicates.push({
        type: 'ID',
        value: event.id,
        positions: [ids.get(event.id), index],
        events: [events[ids.get(event.id)], event]
      });
    } else {
      ids.set(event.id, index);
    }
    
    if (event.slug && slugs.has(event.slug)) {
      duplicates.push({
        type: 'SLUG',
        value: event.slug,
        positions: [slugs.get(event.slug), index],
        events: [events[slugs.get(event.slug)], event]
      });
    } else if (event.slug) {
      slugs.set(event.slug, index);
    }
  });
  
  return duplicates;
}

async function validateAndUploadEvents(eventsArray) {
  console.log(`\n🔍 Validando ${eventsArray.length} eventos...\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  // Individual validation
  eventsArray.forEach((event, index) => {
    const { errors, warnings } = validateEvent(event, index);
    
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\nEvento #${index + 1}: ${event.brand || 'SIN MARCA'} - ${event.title || 'SIN TÍTULO'}`);
      
      errors.forEach(err => {
        console.log(`  ${err}`);
        totalErrors++;
      });
      
      warnings.forEach(warn => {
        console.log(`  ${warn}`);
        totalWarnings++;
      });
    }
  });
  
  // Duplicate validation
  const duplicates = checkDuplicates(eventsArray);
  if (duplicates.length > 0) {
    console.log('\n🚨 DUPLICADOS DETECTADOS:\n');
    duplicates.forEach(dup => {
      console.log(`${dup.type} duplicado: "${dup.value}"`);
      console.log(`  Eventos: #${dup.positions[0] + 1} y #${dup.positions[1] + 1}`);
      console.log(`  - "${dup.events[0].title}"`);
      console.log(`  - "${dup.events[1].title}"`);
      totalErrors++;
    });
  }
  
  console.log(`\n📊 Resumen:`);
  console.log(`  Total eventos: ${eventsArray.length}`);
  console.log(`  Errores críticos: ${totalErrors}`);
  console.log(`  Advertencias: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ HAY ERRORES CRÍTICOS. Revisar antes de subir.\n');
    return false;
  }
  
  if (totalWarnings > 0) {
    console.log('\n⚠️ HAY ADVERTENCIAS. El backend auto-corregirá, pero revisa los datos.\n');
  }
  
  console.log('\n✅ Validación pasada. Listo para subir.\n');
  
  // Upload
  const confirmed = confirm('¿Proceder con la carga a Supabase?');
  if (!confirmed) {
    console.log('Carga cancelada.');
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventsArray)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error del servidor:', errorData);
      return false;
    }
    
    const result = await response.json();
    console.log(`✅ ${result.count} eventos guardados exitosamente.`);
    
    // Verify
    const verifyResponse = await fetch(`${API_URL}/events`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    const savedEvents = await verifyResponse.json();
    console.log(`✅ Verificación: ${savedEvents.length} eventos en la base de datos.`);
    
    return true;
  } catch (error) {
    console.error('❌ Error de red:', error);
    return false;
  }
}

// Ejemplo de uso:
// const migratedEvents = [ /* array de eventos desde Figma/Make */ ];
// await validateAndUploadEvents(migratedEvents);
```

---

## 🎯 Checklist Final para Antigravity

Antes de hacer la migración masiva:

- [ ] **Exportar eventos actuales desde Figma/Make**
- [ ] **Mapear campos al esquema `WavEvent`**
  - [ ] `brand`, `title`, `description`, `image` son obligatorios
  - [ ] Convertir campos legacy (`imageUrl` → `image`, etc.)
  - [ ] Asignar categorías válidas
- [ ] **Validar datos con script de validación**
  - [ ] Ejecutar `validateEvent()` para cada evento
  - [ ] Ejecutar `checkDuplicates()` en el array completo
  - [ ] Resolver errores críticos (❌)
  - [ ] Revisar advertencias (⚠️)
- [ ] **Decidir estrategia de imágenes**
  - [ ] Opción A: Usar URLs externas directas
  - [ ] Opción B: Subir a Supabase Storage (recomendado)
- [ ] **Si usas Supabase Storage:**
  - [ ] Subir imágenes una por una via `/upload-event-assets`
  - [ ] Obtener `imagePath` y `logoPath` de cada respuesta
  - [ ] Incluir estos paths en los objetos de evento
- [ ] **Hacer POST a `/events`**
  - [ ] Usar `accessToken` de admin (requiere login previo)
  - [ ] Enviar array completo de eventos
- [ ] **Verificar resultado**
  - [ ] GET `/events` para confirmar que todo se guardó
  - [ ] Revisar logs del servidor para warnings de normalización
  - [ ] Probar en frontend que los eventos se muestren correctamente

---

## 📞 Contacto y Soporte

**Backend Server:** `/supabase/functions/server/index.tsx`  
**Normalizador:** Línea 250-389  
**Validador:** Línea 138-150  
**KV Store Key:** `"wav_events"`  
**Storage Bucket:** `"make-c4bb2206-wav-assets"`

**Logs del Servidor:**  
Ejecutar en Supabase Dashboard → Edge Functions → Logs

**Para debugging en tiempo real:**
```bash
# Ver logs del servidor en tiempo real
supabase functions logs make-server-c4bb2206 --follow
```

---

*Documento generado el 30/11/2025*  
*Sistema: WAV BTL v2.3.0*  
*Para uso interno del equipo de desarrollo*
