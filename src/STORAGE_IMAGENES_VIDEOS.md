# 🗄️ WAV BTL — Sistema de Almacenamiento de Imágenes y Videos

**Para:** Antigravity  
**Tema:** Explicación detallada de cómo el CMS guarda y sirve assets multimedia  
**Fecha:** 30 de Noviembre, 2025

---

## 🏗️ ARQUITECTURA DE ALMACENAMIENTO

### Opción 1: URLs Externas (ACTUAL - DEMO)
**Estado:** Implementado en `/data/events.ts`  
**Uso:** Demo y desarrollo

```json
{
  "image": "https://images.unsplash.com/photo-1639323250828-8dc3d4386661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
}
```

**✅ Ventajas:**
- No requiere upload
- Implementación inmediata
- Sin costos de storage
- URLs permanentes (Unsplash)

**❌ Desventajas:**
- Dependencia de servicio externo
- No son imágenes reales de eventos
- Sin control sobre contenido
- Sin posibilidad de branding (logos propios)

---

### Opción 2: Supabase Storage (RECOMENDADO - PRODUCCIÓN)
**Estado:** Implementado en backend, listo para usar  
**Uso:** Producción con datos reales

---

## 📦 SUPABASE STORAGE - DETALLES TÉCNICOS

### Configuración del Bucket

**Nombre del Bucket:** `make-c4bb2206-wav-assets`  
**Tipo:** Privado (requiere autenticación)  
**Ubicación:** Supabase Cloud (automático)  
**Cuota:** Según plan Supabase (generalmente 1GB gratis, escalable)

**Creación del Bucket (Automática en el servidor):**
```typescript
// /supabase/functions/server/index.tsx (línea ~90)
const BUCKET_NAME = 'make-c4bb2206-wav-assets';

// Al iniciar el servidor, verifica/crea el bucket
const { data: buckets } = await supabase.storage.listBuckets();
const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

if (!bucketExists) {
  const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: false,  // ⚠️ PRIVADO: Requiere signed URLs
    fileSizeLimit: 52428800  // 50MB por archivo
  });
  
  if (error) {
    console.error('Error creando bucket:', error);
  } else {
    console.log(`✅ Bucket ${BUCKET_NAME} creado exitosamente`);
  }
}
```

---

### Estructura de Carpetas

```
make-c4bb2206-wav-assets/
│
├── images/                          # Imágenes principales y logos
│   ├── {eventId}_main.jpg           # Imagen principal del evento (2:3 ratio)
│   ├── {eventId}_main.png           # Alternativa PNG
│   ├── {eventId}_main.webp          # Alternativa WebP (mejor compresión)
│   │
│   └── {eventId}_logo.png           # Logo de marca (PNG con alpha)
│       └── Ejemplo: "abc123_logo.png"
│
└── gallery/                         # Galería multimedia
    ├── {eventId}_gallery_0.jpg      # Primera imagen de galería
    ├── {eventId}_gallery_1.jpg      # Segunda imagen
    ├── {eventId}_gallery_2.mp4      # Primer video
    ├── {eventId}_gallery_3.jpg      # Tercera imagen
    └── ...                          # Sin límite de cantidad
```

**Convención de Nombres:**
```javascript
// Imagen principal
const mainImagePath = `images/${eventId}_main.jpg`;

// Logo
const logoPath = `images/${eventId}_logo.png`;

// Galería (índice secuencial desde 0)
const galleryImagePath = `gallery/${eventId}_gallery_${index}.jpg`;
const galleryVideoPath = `gallery/${eventId}_gallery_${index}.mp4`;
```

---

## 📤 CÓMO SUBIR ARCHIVOS (Upload Flow)

### Endpoint: `POST /upload-event-assets`

**URL Completa:**
```
https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/upload-event-assets
```

**Headers Requeridos:**
```http
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Body (FormData):**
```javascript
const formData = new FormData();

// REQUERIDO: ID del evento (UUID)
formData.append('eventId', 'abc-123-uuid-here');

// OPCIONAL: Imagen principal
formData.append('mainImage', fileInputMainImage.files[0]);

// OPCIONAL: Logo de marca
formData.append('logoImage', fileInputLogo.files[0]);
```

**Formatos Aceptados:**
- **Imágenes:** JPG, PNG, WebP, GIF
- **Videos:** MP4, MOV, AVI, WebM
- **Tamaño máximo:** 50 MB por archivo

---

### Código de Ejemplo - Frontend (JavaScript)

```javascript
// 1. Obtener accessToken (requiere login admin)
const { data: { session } } = await supabase.auth.signInWithPassword({
  email: 'admin@wearevision.cl',
  password: 'tu-password'
});
const accessToken = session.access_token;

// 2. Preparar archivos
const mainImageFile = document.getElementById('mainImageInput').files[0];
const logoFile = document.getElementById('logoInput').files[0];

// 3. Crear FormData
const formData = new FormData();
formData.append('eventId', 'abc-123-uuid');
formData.append('mainImage', mainImageFile);
formData.append('logoImage', logoFile);

// 4. Upload
const uploadResponse = await fetch(
  'https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/upload-event-assets',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
      // NO incluir Content-Type, el navegador lo agrega automáticamente con boundary
    },
    body: formData
  }
);

// 5. Obtener resultado
const result = await uploadResponse.json();

console.log('Resultado del upload:', result);
// {
//   success: true,
//   imagePath: "images/abc-123-uuid_main.jpg",
//   imageUrl: "https://{supabase}/storage/v1/object/sign/make-c4bb2206-wav-assets/images/abc-123-uuid_main.jpg?token=...",
//   logoPath: "images/abc-123-uuid_logo.png",
//   logoUrl: "https://{supabase}/storage/v1/object/sign/make-c4bb2206-wav-assets/images/abc-123-uuid_logo.png?token=..."
// }

// 6. Usar estas URLs/paths en el evento
const evento = {
  id: 'abc-123-uuid',
  brand: 'Nike',
  title: 'Air Max Launch',
  description: '...',
  
  image: result.imageUrl,        // URL firmada (temporal, 24h)
  imagePath: result.imagePath,   // Path permanente
  
  logo: result.logoUrl,
  logoPath: result.logoPath,
  
  // ... resto de campos
};

// 7. Guardar evento completo
await fetch('https://{projectId}.supabase.co/functions/v1/make-server-c4bb2206/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([evento])
});
```

---

### Código Backend - Upload Implementation

**Ubicación:** `/supabase/functions/server/index.tsx` (línea ~700-800)

```typescript
app.post(`${BASE_PATH}/upload-event-assets`, async (c) => {
  // 1. Verificar autenticación
  if (!await verifyAuth(c)) return c.text("Unauthorized", 401);

  try {
    // 2. Parse multipart form data
    const body = await c.req.parseBody();
    const eventId = body.eventId as string;
    
    if (!eventId) {
      return c.json({ error: "eventId is required" }, 400);
    }

    const result: any = { success: true };

    // 3. Upload imagen principal (si existe)
    if (body.mainImage && body.mainImage instanceof File) {
      const mainImage = body.mainImage as File;
      const ext = mainImage.name.split('.').pop();
      const path = `images/${eventId}_main.${ext}`;
      
      // Convertir File a ArrayBuffer para Supabase
      const arrayBuffer = await mainImage.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      
      // Upload a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, buffer, {
          contentType: mainImage.type,
          upsert: true  // Reemplaza si ya existe
        });
      
      if (uploadError) {
        console.error('Error subiendo imagen principal:', uploadError);
        return c.json({ error: uploadError.message }, 500);
      }
      
      // Generar signed URL (válida 24h)
      const { data: signedData } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(path, 3600 * 24);  // 24 horas
      
      result.imagePath = path;
      result.imageUrl = signedData?.signedUrl;
    }

    // 4. Upload logo (si existe)
    if (body.logoImage && body.logoImage instanceof File) {
      const logoImage = body.logoImage as File;
      const ext = logoImage.name.split('.').pop();
      const path = `images/${eventId}_logo.${ext}`;
      
      const arrayBuffer = await logoImage.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, buffer, {
          contentType: logoImage.type,
          upsert: true
        });
      
      if (uploadError) {
        console.error('Error subiendo logo:', uploadError);
        return c.json({ error: uploadError.message }, 500);
      }
      
      const { data: signedData } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(path, 3600 * 24);
      
      result.logoPath = path;
      result.logoUrl = signedData?.signedUrl;
    }

    return c.json(result);
  } catch (e: any) {
    console.error('Error en upload-event-assets:', e);
    return c.json({ error: e.message }, 500);
  }
});
```

---

## 🔐 SIGNED URLS (URLs Firmadas)

### ¿Por Qué URLs Firmadas?

El bucket es **privado** por seguridad. Las signed URLs permiten acceso temporal sin exponer el storage públicamente.

**Ventajas:**
- ✅ Control de acceso (solo quien tiene el token puede ver)
- ✅ Expiración automática (24 horas)
- ✅ Previene hotlinking no autorizado
- ✅ Permite estadísticas de acceso

**Desventajas:**
- ⚠️ URLs expiran cada 24h (deben regenerarse)

---

### Regeneración Automática

El backend regenera signed URLs en cada request `GET /events`:

```typescript
// /supabase/functions/server/index.tsx (línea ~460)
app.get(`${BASE_PATH}/events`, async (c) => {
  const events = await kv.get("wav_events") || [];
  
  // Para cada evento, regenerar signed URLs
  const eventsWithUrls = await Promise.all(events.map(async (event: any) => {
    let imageUrl = event.image;
    let logoUrl = event.logo;
    
    // Si el evento tiene imagePath, regenerar signed URL
    if (event.imagePath) {
      const { data } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(event.imagePath, 3600 * 24);  // 24h
      
      if (data) imageUrl = data.signedUrl;
    }
    
    // Si el evento tiene logoPath, regenerar signed URL
    if (event.logoPath) {
      const { data } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(event.logoPath, 3600 * 24);
      
      if (data) logoUrl = data.signedUrl;
    }
    
    // Regenerar signed URLs para galería
    let gallery = event.gallery || [];
    if (Array.isArray(gallery) && gallery.length > 0) {
      gallery = await Promise.all(gallery.map(async (item: any) => {
        if (item.path) {
          const { data } = await supabase.storage
            .from(BUCKET_NAME)
            .createSignedUrl(item.path, 3600 * 24);
          
          if (data) return { ...item, url: data.signedUrl };
        }
        return item;
      }));
    }
    
    return { 
      ...event, 
      imageUrl,   // Signed URL temporal
      logoUrl,    // Signed URL temporal
      image: imageUrl,  // Alias para compatibilidad
      logo: logoUrl,    // Alias para compatibilidad
      gallery 
    };
  }));
  
  return c.json(eventsWithUrls);
});
```

**⚠️ IMPORTANTE:**
- Los campos `image` y `logo` contienen **URLs temporales** (expiran en 24h)
- Los campos `imagePath` y `logoPath` contienen **rutas permanentes**
- El backend regenera URLs firmadas automáticamente en cada GET
- El frontend NO debe cachear las URLs por más de 24 horas

---

## 📸 GALERÍA MULTIMEDIA

### Estructura de Galería

Cada evento puede tener una galería de imágenes y videos:

```json
{
  "gallery": [
    {
      "id": "unique-uuid-1",
      "type": "image",
      "url": "https://{supabase}/storage/v1/object/sign/.../gallery/abc123_gallery_0.jpg?token=...",
      "path": "gallery/abc123_gallery_0.jpg"
    },
    {
      "id": "unique-uuid-2",
      "type": "video",
      "url": "https://{supabase}/storage/v1/object/sign/.../gallery/abc123_gallery_1.mp4?token=...",
      "path": "gallery/abc123_gallery_1.mp4"
    },
    {
      "id": "unique-uuid-3",
      "type": "image",
      "url": "https://{supabase}/storage/v1/object/sign/.../gallery/abc123_gallery_2.jpg?token=...",
      "path": "gallery/abc123_gallery_2.jpg"
    }
  ]
}
```

---

### Cómo Subir Items de Galería

**⚠️ NOTA:** Actualmente no hay endpoint específico para galería. Se debe usar el Admin Panel UI o implementar manualmente.

**Opción 1: Via Admin Panel UI**
1. Login al Admin Panel
2. Seleccionar evento
3. Sección "Gallery"
4. Click "Upload Image/Video"
5. El UI hace upload automático a Supabase Storage

**Opción 2: Upload Manual (Script Personalizado)**

```javascript
async function uploadGalleryItem(eventId, file, index) {
  const ext = file.name.split('.').pop();
  const type = file.type.startsWith('video/') ? 'video' : 'image';
  const path = `gallery/${eventId}_gallery_${index}.${ext}`;
  
  // 1. Upload a Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('make-c4bb2206-wav-assets')
    .upload(path, file, {
      contentType: file.type,
      upsert: true
    });
  
  if (uploadError) {
    console.error('Error subiendo item de galería:', uploadError);
    throw uploadError;
  }
  
  // 2. Generar signed URL
  const { data: signedData } = await supabase.storage
    .from('make-c4bb2206-wav-assets')
    .createSignedUrl(path, 3600 * 24);
  
  // 3. Retornar objeto de galería
  return {
    id: crypto.randomUUID(),
    type: type,
    url: signedData?.signedUrl || '',
    path: path
  };
}

// Uso:
const galleryItems = [];

for (let i = 0; i < files.length; i++) {
  const item = await uploadGalleryItem(eventId, files[i], i);
  galleryItems.push(item);
}

// Agregar al evento
evento.gallery = galleryItems;
```

---

## 🎨 MEJORES PRÁCTICAS

### 1. Optimización de Imágenes

**Antes de Subir:**
- ✅ Comprimir imágenes (TinyPNG, ImageOptim)
- ✅ Resize a tamaño adecuado:
  - Imagen principal: 1080x1620px (2:3 ratio)
  - Logo: 512x512px (con transparencia)
  - Galería: Max 1920x1080px
- ✅ Convertir a WebP si es posible (mejor compresión)

**Formatos Recomendados:**
```
Imagen Principal:  JPG (calidad 85%) o WebP
Logo:             PNG con alpha channel
Galería Imágenes: JPG (calidad 80-85%) o WebP
Galería Videos:   MP4 (H.264 codec)
```

---

### 2. Naming Conventions

**✅ CORRECTO:**
```
images/abc-123-uuid_main.jpg
images/abc-123-uuid_logo.png
gallery/abc-123-uuid_gallery_0.jpg
gallery/abc-123-uuid_gallery_1.mp4
gallery/abc-123-uuid_gallery_2.jpg
```

**❌ INCORRECTO:**
```
images/Nike Air Max.jpg          # Espacios en nombre
images/evento-1.jpg              # Sin eventId
gallery/foto-evento.jpg          # Sin índice secuencial
images/LOGO_NIKE.PNG             # Mayúsculas inconsistentes
```

---

### 3. Gestión de Espacio

**Monitorear Storage:**
```javascript
// Obtener uso actual del bucket
const { data, error } = await supabase.storage
  .from('make-c4bb2206-wav-assets')
  .list();

// Calcular tamaño total
let totalSize = 0;
data.forEach(file => {
  totalSize += file.metadata?.size || 0;
});

console.log(`Uso de storage: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
```

**Eliminar Archivos Huérfanos:**
```javascript
// Si eliminas un evento, eliminar sus archivos
async function deleteEventAssets(eventId) {
  const paths = [
    `images/${eventId}_main.jpg`,
    `images/${eventId}_main.png`,
    `images/${eventId}_main.webp`,
    `images/${eventId}_logo.png`
  ];
  
  for (const path of paths) {
    await supabase.storage
      .from('make-c4bb2206-wav-assets')
      .remove([path]);
  }
  
  // Eliminar items de galería
  const { data: galleryFiles } = await supabase.storage
    .from('make-c4bb2206-wav-assets')
    .list(`gallery/`, {
      search: eventId
    });
  
  const galleryPaths = galleryFiles.map(f => `gallery/${f.name}`);
  await supabase.storage
    .from('make-c4bb2206-wav-assets')
    .remove(galleryPaths);
}
```

---

## 📊 COMPARACIÓN: URLs Externas vs. Supabase Storage

| Característica | URLs Externas (Unsplash) | Supabase Storage |
|----------------|---------------------------|------------------|
| **Costo** | Gratis | Gratis (1GB) + escalable |
| **Setup** | Inmediato | Requiere upload |
| **Control** | ❌ Ninguno | ✅ Total |
| **Persistencia** | ✅ Permanente | ✅ Permanente |
| **Privacidad** | ❌ Público | ✅ Privado (signed URLs) |
| **Branding** | ❌ Stock images | ✅ Assets propios |
| **Performance** | ✅ CDN de Unsplash | ✅ CDN de Supabase |
| **SEO** | ⚠️ URLs externas | ✅ URLs propias |
| **Galería** | ❌ Una imagen sola | ✅ Múltiples items |
| **Videos** | ❌ No soporta | ✅ Soporta MP4 |

---

## 🔄 FLUJO COMPLETO: De Figma/Make a Producción

### Escenario: Evento Real con Assets Reales

```javascript
// PASO 1: Preparar datos del evento desde CMS
const eventoRaw = {
  brand: "Nike",
  title: "Air Max Launch 2024",
  description: "Lanzamiento exclusivo...",
  // ... otros campos
};

// PASO 2: Generar UUID
const eventId = crypto.randomUUID();
eventoRaw.id = eventId;

// PASO 3: Subir imagen principal y logo
const mainImageFile = /* obtener desde Figma/Make */;
const logoFile = /* obtener logo de Nike */;

const formData = new FormData();
formData.append('eventId', eventId);
formData.append('mainImage', mainImageFile);
formData.append('logoImage', logoFile);

const uploadRes = await fetch(`${API_URL}/upload-event-assets`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${accessToken}` },
  body: formData
});

const { imagePath, imageUrl, logoPath, logoUrl } = await uploadRes.json();

// PASO 4: Actualizar evento con paths
eventoRaw.image = imageUrl;
eventoRaw.imagePath = imagePath;
eventoRaw.logo = logoUrl;
eventoRaw.logoPath = logoPath;

// PASO 5: Subir items de galería (si los hay)
const galleryFiles = /* obtener desde CMS */;
const galleryItems = [];

for (let i = 0; i < galleryFiles.length; i++) {
  const file = galleryFiles[i];
  const ext = file.name.split('.').pop();
  const type = file.type.startsWith('video/') ? 'video' : 'image';
  const path = `gallery/${eventId}_gallery_${i}.${ext}`;
  
  // Upload directo a Supabase (desde script o Admin Panel)
  const { error } = await supabase.storage
    .from('make-c4bb2206-wav-assets')
    .upload(path, file, { contentType: file.type });
  
  if (!error) {
    const { data: signedData } = await supabase.storage
      .from('make-c4bb2206-wav-assets')
      .createSignedUrl(path, 3600 * 24);
    
    galleryItems.push({
      id: crypto.randomUUID(),
      type: type,
      url: signedData?.signedUrl || '',
      path: path
    });
  }
}

eventoRaw.gallery = galleryItems;

// PASO 6: Normalizar y validar
const eventoCompleto = normalizeEvent(eventoRaw);
const validation = validateEvent(eventoCompleto);

if (!validation.isValid) {
  console.error('Validación falló:', validation.errors);
  return;
}

// PASO 7: POST a /events
await fetch(`${API_URL}/events`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([eventoCompleto])
});

console.log('✅ Evento subido con todos sus assets');
```

---

## 🛠️ TROUBLESHOOTING

### Problema: "Upload falla con error 413 (Payload Too Large)"
**Solución:** El archivo excede 50MB. Comprimir antes de subir.

### Problema: "Signed URL expiró (404)"
**Solución:** Las URLs firmadas duran 24h. Hacer GET `/events` para regenerarlas.

### Problema: "Error: Bucket not found"
**Solución:** El bucket se crea automáticamente al iniciar el servidor. Reiniciar edge function.

### Problema: "Upload exitoso pero imagen no aparece en frontend"
**Solución:** Verificar que el evento tenga tanto `imagePath` como `image` (signed URL).

### Problema: "Videos no se reproducen"
**Solución:** 
1. Verificar codec (debe ser H.264)
2. Comprimir video (max 50MB)
3. Convertir a MP4 si está en otro formato

---

## ✅ CHECKLIST FINAL - STORAGE

Para cada evento en producción:

- [ ] **Imagen Principal**
  - [ ] Subida a `images/{eventId}_main.{ext}`
  - [ ] Formato: JPG o WebP
  - [ ] Ratio: 2:3 (ej: 1080x1620px)
  - [ ] Tamaño: < 5MB
  - [ ] Campo `imagePath` en evento
  - [ ] Campo `image` con signed URL

- [ ] **Logo de Marca**
  - [ ] Subido a `images/{eventId}_logo.png`
  - [ ] Formato: PNG con transparencia
  - [ ] Tamaño: 512x512px ideal
  - [ ] Tamaño archivo: < 500KB
  - [ ] Campo `logoPath` en evento
  - [ ] Campo `logo` con signed URL

- [ ] **Galería** (si aplica)
  - [ ] Cada item subido a `gallery/{eventId}_gallery_{index}.{ext}`
  - [ ] Cada item tiene `id`, `type`, `url`, `path`
  - [ ] Imágenes: JPG/WebP < 5MB
  - [ ] Videos: MP4 H.264 < 50MB
  - [ ] Array `gallery` en evento

- [ ] **Validación**
  - [ ] Evento pasa validateEvent()
  - [ ] GET `/events` retorna URLs firmadas válidas
  - [ ] Frontend muestra imágenes correctamente
  - [ ] Modal abre con galería funcional

---

*Documento generado el 30/11/2025*  
*Sistema: WAV BTL v2.3.0*  
*Backend: Supabase Edge Functions + Storage*  
*Bucket: make-c4bb2206-wav-assets*
