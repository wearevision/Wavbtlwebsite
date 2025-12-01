# 📦 Guía: Carga Masiva de Imágenes a Supabase Storage

**Fecha:** 30/11/2025  
**Versión:** 2.3.1  
**Estado:** ✅ Listo para Producción

---

## 🎯 Tu Flujo de Trabajo

```
1. IDE/Script Local
   ↓
2. Supabase Storage (upload directo)
   ↓
3. Base de datos KV (actualizar imagePath)
   ↓
4. Frontend renderiza → Optimizaciones automáticas
```

---

## ⚡ Quick Start

### Opción 1: Usando el Script de Ejemplo

```bash
# 1. Copia el script de ejemplo
cp SCRIPT_CARGA_MASIVA_EJEMPLO.js tu-script.js

# 2. Instala dependencias
npm install @supabase/supabase-js dotenv

# 3. Crea un archivo .env
cat > .env << EOF
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
EOF

# 4. Coloca tus imágenes en ./images/
mkdir images
# Copia tus JPGs aquí

# 5. Edita tu-script.js con los datos de tus eventos
# (Ver sección "Estructura de Datos" abajo)

# 6. Ejecuta el script
node tu-script.js
```

---

### Opción 2: Usando Supabase CLI

```bash
# 1. Instala Supabase CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Upload individual
supabase storage upload make-c4bb2206-assets/events/evento-001.jpg ./imagen.jpg

# 4. Upload masivo (folder completo)
supabase storage upload make-c4bb2206-assets/events/ ./images/*.jpg

# 5. Actualiza la base de datos manualmente o con script
```

---

### Opción 3: Usando tu Propio Script

```javascript
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Upload imagen
const { data, error } = await supabase.storage
  .from('make-c4bb2206-assets')
  .upload('events/evento-001.jpg', readFileSync('./imagen.jpg'), {
    contentType: 'image/jpeg',
    upsert: true
  })

// Actualizar evento en DB
const events = await fetch(`${SERVER_URL}/events`, {
  headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
}).then(r => r.json())

events.find(e => e.id === 'evt-001').imagePath = 'events/evento-001.jpg'

await fetch(`${SERVER_URL}/events`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ADMIN_TOKEN}`
  },
  body: JSON.stringify(events)
})
```

---

## 📋 Estructura de Datos para Carga Masiva

### Formato del Array de Eventos:

```javascript
const EVENTS = [
  {
    // ==========================================
    // CAMPOS REQUERIDOS
    // ==========================================
    id: 'evt-banco-chile-001',            // UUID único
    brand: 'Banco de Chile',              // Nombre de marca
    title: 'Neón Corporativo 2024',       // Título del evento
    description: 'Evento inmersivo...',   // Descripción completa
    
    // ==========================================
    // ARCHIVOS LOCALES (para el script)
    // ==========================================
    imageFile: './images/banco-chile.jpg',  // Path local a imagen principal
    logoFile: './images/banco-logo.png',    // Path local a logo (opcional)
    
    // ==========================================
    // CAMPOS OPCIONALES (SEO y Categorización)
    // ==========================================
    category: 'activaciones-de-marca',    // Slug de categoría
    summary: 'Breve resumen ejecutivo',   // Max 200 chars
    
    // Arrays opcionales
    highlights: [                          // Puntos destacados (bullets)
      'Asistencia de 500+ personas',
      'Coverage en prensa nacional',
      '95% de satisfacción'
    ],
    keywords: [                            // Keywords SEO
      'activación de marca',
      'evento corporativo',
      'marketing experiencial'
    ],
    hashtags: [                            // Hashtags para redes
      '#BancoDeChile',
      '#NeonCorporativo',
      '#WAV2024'
    ],
    
    // ==========================================
    // CONTENIDO SOCIAL (generado por IA)
    // ==========================================
    instagram_hook: 'Texto captivador inicial',
    instagram_body: 'Cuerpo del post',
    instagram_closing: 'Call to action',
    instagram_hashtags: '#Tag1 #Tag2 #Tag3',
    
    linkedin_post: 'Post corporativo para LinkedIn',
    linkedin_article: 'Artículo largo formato',
    
    // ==========================================
    // A/B TESTING (variantes de títulos)
    // ==========================================
    alt_title_1: 'Título alternativo 1',
    alt_title_2: 'Título alternativo 2',
    alt_instagram: 'Hook alternativo Instagram'
  },
  
  // ... más eventos
]
```

---

## 📊 Especificaciones de Imágenes

### Imagen Principal (imageFile):

```
Propósito:    Cover image del evento (aparece en el tile del mosaico)
Tamaño:       1920px × 1280px (ratio 3:2)
Formato:      JPG (80-90% quality) o PNG
Peso máximo:  3 MB
Nombre:       Descriptivo, ej: banco-chile-neon-2024.jpg
```

**✅ CORRECTO:**
```
./images/banco-chile-neon-2024.jpg
- 1920 × 1280 px
- JPG quality 85%
- 1.2 MB
```

**❌ INCORRECTO:**
```
./images/IMG_1234.jpg
- 4000 × 3000 px (muy grande)
- PNG sin comprimir
- 8 MB (muy pesado)
```

---

### Logo (logoFile - Opcional):

```
Propósito:    Logo de la marca (aparece en el modal del evento)
Tamaño:       500px × 500px (o aspecto 3:1 horizontal)
Formato:      PNG con transparencia o SVG
Peso máximo:  500 KB
Nombre:       Descriptivo, ej: banco-chile-logo.png
```

**Ejemplo:**
```
./logos/banco-chile-logo.png
- 500 × 167 px (3:1 ratio)
- PNG con alpha channel
- 50 KB
```

---

## 🔧 Proceso Paso a Paso

### 1. Preparar las Imágenes

```bash
# Estructura de carpetas recomendada
project/
├── images/
│   ├── banco-chile-neon.jpg
│   ├── entel-5g.jpg
│   └── cencosud-retail.jpg
├── logos/
│   ├── banco-chile.png
│   ├── entel.png
│   └── cencosud.png
└── tu-script.js
```

---

### 2. Configurar el Script

```javascript
// tu-script.js

const EVENTS = [
  {
    id: 'evt-001',
    brand: 'Banco de Chile',
    title: 'Neón Corporativo 2024',
    description: '...',
    imageFile: './images/banco-chile-neon.jpg',
    logoFile: './logos/banco-chile.png',
    category: 'activaciones-de-marca'
  },
  // ... más eventos
]
```

---

### 3. Ejecutar la Carga

```bash
node tu-script.js
```

**Salida esperada:**
```
🔍 Verificando configuración...

✅ Supabase URL: https://xyz.supabase.co
✅ Bucket: make-c4bb2206-assets
✅ Eventos a procesar: 3

🚀 Iniciando carga masiva...

📥 Obteniendo eventos actuales de la base de datos...
   Encontrados: 12 eventos

📦 Procesando: Banco de Chile - Neón Corporativo 2024
   ID: evt-001
  📤 Subiendo: ./images/banco-chile-neon.jpg → events/evt-001.jpg
  ✅ Subida exitosa: events/evt-001.jpg
  📤 Subiendo: ./logos/banco-chile.png → logos/evt-001.png
  ✅ Subida exitosa: logos/evt-001.png
  ✅ Evento procesado exitosamente

...

💾 Guardando eventos en la base de datos...
✅ Base de datos actualizada: 15 eventos totales

==================================================
📊 RESUMEN DE CARGA MASIVA
==================================================
✅ Éxitos:  3
❌ Errores:  0
📦 Total:    3
==================================================

🎉 Carga masiva completada!

📋 Próximos pasos:
   1. Verifica las imágenes en Supabase Dashboard → Storage
   2. Recarga el frontend para ver las imágenes
   3. Verifica en DevTools → Network que las URLs incluyen:
      ?width=600&quality=70&format=webp
```

---

### 4. Verificar en Supabase Dashboard

1. Ve a **Supabase Dashboard** → **Storage**
2. Selecciona el bucket `make-c4bb2206-assets`
3. Deberías ver:
   ```
   events/
   ├── evt-001.jpg  (1.2 MB)
   ├── evt-002.jpg  (980 KB)
   └── evt-003.jpg  (1.5 MB)
   
   logos/
   ├── evt-001.png  (45 KB)
   ├── evt-002.png  (52 KB)
   └── evt-003.png  (38 KB)
   ```

---

### 5. Verificar en la Base de Datos

```bash
# Usando curl
curl https://xyz.supabase.co/functions/v1/make-server-c4bb2206/events \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.[0] | {id, title, imagePath, logoPath}'
```

**Salida esperada:**
```json
{
  "id": "evt-001",
  "title": "Neón Corporativo 2024",
  "imagePath": "events/evt-001.jpg",
  "logoPath": "logos/evt-001.png"
}
```

---

### 6. Verificar en el Frontend

1. **Recarga el frontend**
   ```bash
   # En tu navegador
   https://btl.wearevision.cl
   ```

2. **Abre DevTools** (F12) → **Network** → **Img**

3. **Verifica las URLs de las imágenes:**
   ```
   ✅ CORRECTO:
   https://xyz.supabase.co/storage/.../evt-001.jpg?token=abc&width=600&quality=70&format=webp
   
   ❌ INCORRECTO (sin optimizaciones):
   https://xyz.supabase.co/storage/.../evt-001.jpg?token=abc
   ```

4. **Inspecciona el elemento `<img>`:**
   ```html
   <img
     src="...?width=600&quality=70&format=webp"
     srcset="
       ...?width=300&quality=60&format=webp 300w,
       ...?width=600&quality=70&format=webp 600w,
       ...?width=1200&quality=75&format=webp 1200w
     "
     sizes="(max-width: 640px) 300px, ..."
   />
   ```

---

## ⚠️ Troubleshooting

### Problema: "Error uploading: File already exists"

**Solución:**
```javascript
// Usa upsert: true para sobrescribir
await supabase.storage
  .from('make-c4bb2206-assets')
  .upload(fileName, fileBuffer, {
    upsert: true  // ← Agrega esto
  })
```

---

### Problema: "Bucket not found"

**Solución:**
```javascript
// El bucket se crea automáticamente al iniciar el servidor
// Si no existe, créalo manualmente:

const { data, error } = await supabase.storage.createBucket(
  'make-c4bb2206-assets',
  {
    public: false,
    allowedMimeTypes: ['image/*', 'video/*'],
    fileSizeLimit: 52428800  // 50MB
  }
)
```

---

### Problema: "Las imágenes no se ven en el frontend"

**Checklist:**
1. ✅ ¿La imagen se subió correctamente a Storage?
   - Verifica en Dashboard → Storage
2. ✅ ¿El `imagePath` está guardado en la base de datos?
   - Verifica con `curl` o en Supabase SQL Editor
3. ✅ ¿El servidor genera signed URLs?
   - Verifica en DevTools → Network → Response
4. ✅ ¿El bucket tiene los permisos correctos?
   - El bucket debe ser **privado** (el servidor genera signed URLs)

---

### Problema: "Las optimizaciones no se aplican"

**Verificación:**
```javascript
// En Tile.tsx, verifica que getOptimizedUrl se esté llamando:
const getOptimizedUrl = (width: number, quality: number) => {
  const separator = image.includes('?') ? '&' : '?';
  return `${image}${separator}width=${width}&quality=${quality}&format=webp`;
};

// Inspecciona en DevTools que la URL tenga estos parámetros:
// ?width=600&quality=70&format=webp
```

Si la URL NO tiene parámetros:
1. Verifica que `image` tenga una signed URL válida
2. Verifica que `getOptimizedUrl()` se esté llamando en el `src` del `<img>`

---

## 📊 Performance Esperado

### Antes de la Carga:
```
Mosaico: Vacío o con placeholders SVG grises
Lighthouse: ~65 (sin imágenes reales)
```

### Después de la Carga:
```
Mosaico: Imágenes reales optimizadas
Lighthouse: ~85-95
```

**Métricas detalladas:**

| Métrica | Antes | Después |
|---------|-------|---------|
| **First Contentful Paint** | 2.5s | 1.2s |
| **Largest Contentful Paint** | 4.5s | 2.3s |
| **Total Blocking Time** | 300ms | 150ms |
| **Cumulative Layout Shift** | 0.15 | 0.05 |
| **Speed Index** | 3.8s | 2.1s |

---

## 🎨 Recomendaciones de Diseño

### Para Mejores Resultados Visuales:

**1. Composición de la Imagen:**
- ✅ Sujeto principal centrado
- ✅ Evita texto pequeño (se pierde en tiles pequeños)
- ✅ Contraste alto (se ve mejor en hover)
- ✅ Evita bordes blancos (usa sangrado completo)

**2. Iluminación:**
- ✅ Buena iluminación (evita imágenes oscuras)
- ✅ Colores saturados (más impacto visual)
- ✅ Evita grises planos

**3. Aspecto Ratio:**
- ✅ Mantén 3:2 (1920×1280) para consistencia
- ❌ Evita 16:9 (se recorta en mobile)
- ❌ Evita cuadradas (se deforman)

---

## 📚 Recursos Adicionales

### Scripts y Ejemplos:
- **`/SCRIPT_CARGA_MASIVA_EJEMPLO.js`** - Script completo funcional
- **`/OPTIMIZACION_IMAGENES_SUPABASE.md`** - Detalles técnicos
- **`/RESUMEN_OPTIMIZACION_IMAGENES.md`** - Overview rápido

### Documentación Externa:
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)

---

## 🎉 Conclusión

Con este flujo de carga masiva:
- ✅ Subes 50 eventos con imágenes en ~2-3 minutos
- ✅ Las optimizaciones se aplican automáticamente
- ✅ Zero configuración manual en el frontend
- ✅ Performance Awwwards-level out-of-the-box

**¿Listo para tu primera carga masiva?** 🚀

---

*Documento creado: 30/11/2025*  
*Última actualización: 30/11/2025*  
*Próxima revisión: Post-primera carga masiva*
