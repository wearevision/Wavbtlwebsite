# 🚀 CARGA MASIVA DE EVENTOS - Guía para Antigravity

**Objetivo:** Cargar eventos desde Figma/Make directamente al backend de Supabase  
**Fecha:** 30 de Noviembre, 2025  
**Endpoint:** `POST /make-server-c4bb2206/events`

---

## 🎯 FLUJO COMPLETO: Desde IDE de Antigravity → Supabase

```
┌─────────────────────┐
│  IDE Antigravity    │
│  (Figma/Make/etc)   │
└──────────┬──────────┘
           │
           │ 1. Preparar JSON con eventos
           │
           ▼
┌─────────────────────┐
│   Validar Datos     │ ← Script de validación (opcional)
│   (local/preview)   │
└──────────┬──────────┘
           │
           │ 2. POST al endpoint
           │
           ▼
┌─────────────────────────────────────┐
│  Supabase Edge Function             │
│  POST /make-server-c4bb2206/events  │
│                                     │
│  - Auto-normaliza cada evento       │
│  - Genera UUIDs si faltan           │
│  - Detecta duplicados               │
│  - Valida campos requeridos         │
└──────────┬──────────────────────────┘
           │
           │ 3. Guardar en KV Store
           │
           ▼
┌─────────────────────┐
│  Postgres KV Store  │
│  Tabla: kv_store    │
│  Key: "wav_events"  │
└─────────────────────┘
           │
           │ 4. Frontend hace GET
           │
           ▼
┌─────────────────────┐
│  Frontend Web       │
│  btl.wearevision.cl │
│  Muestra eventos    │
└─────────────────────┘
```

---

## 📦 PASO 1: Preparar el JSON

### Estructura Mínima (REQUERIDA)

```json
[
  {
    "brand": "Nike",
    "title": "Lanzamiento Air Max 2024",
    "description": "Evento de lanzamiento exclusivo de la nueva colección Air Max 2024 en Santiago, Chile. Instalación interactiva con luz reactiva, zona de customización y DJ set en vivo. Fecha: 15 de marzo 2024. Ubicación: GAM. Asistentes: 500 personas.",
    "image": "https://ejemplo.com/nike-air-max-evento.jpg"
  },
  {
    "brand": "Coca-Cola",
    "title": "Festival de Verano 2024",
    "description": "...",
    "image": "https://ejemplo.com/cocacola-festival.jpg"
  }
]
```

**Campos OBLIGATORIOS:**
- ✅ `brand` (string, max 50 chars)
- ✅ `title` (string, max 100 chars)  
- ✅ `description` (string, max 1000 chars)
- ✅ `image` (string, URL válida de imagen)

---

### Estructura Completa (RECOMENDADA)

```json
[
  {
    "brand": "Nike",
    "title": "Lanzamiento Air Max 2024 - Chile",
    "description": "Evento de lanzamiento exclusivo de la nueva colección Air Max 2024 en Santiago, Chile. Instalación interactiva con luz reactiva, zona de customización de zapatillas con artistas locales y DJ set en vivo. Fecha: 15 de marzo 2024. Ubicación: GAM (Centro Gabriela Mistral). Asistentes: 500 sneakerheads. Resultados: 1,200 pares vendidos en preventa, 2.5M impresiones en redes sociales.",
    "image": "https://cdn.wearevision.cl/eventos/nike-airmax-2024-main.jpg",
    
    "category": "activaciones-de-marca",
    "logo": "https://cdn.wearevision.cl/logos/nike-logo.png",
    "summary": "Lanzamiento exclusivo Air Max 2024 con instalación inmersiva. 500 asistentes, 1,200 pares vendidos.",
    
    "gallery": [
      {
        "id": "gallery-001",
        "type": "image",
        "url": "https://cdn.wearevision.cl/eventos/nike-airmax-2024-gallery-1.jpg"
      },
      {
        "id": "gallery-002",
        "type": "video",
        "url": "https://cdn.wearevision.cl/eventos/nike-airmax-2024-video.mp4"
      },
      {
        "id": "gallery-003",
        "type": "image",
        "url": "https://cdn.wearevision.cl/eventos/nike-airmax-2024-gallery-2.jpg"
      }
    ],
    
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
    ],
    
    "year": 2024,
    "month": 3,
    "country": "Chile",
    "city": "Santiago",
    "venue": "GAM - Centro Gabriela Mistral",
    
    "attendees": "500",
    "people_reached": "2.5M"
  }
]
```

---

## 🔑 PASO 2: Obtener Credenciales

### Opción A: Usar `publicAnonKey` (Más Simple)

```javascript
const projectId = "{tu-project-id}";
const publicAnonKey = "{tu-public-anon-key}";
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;
```

**⚠️ LIMITACIÓN:** El backend tiene protección de autenticación en POST /events.  
Necesitas usar **Opción B** para cargas masivas.

---

### Opción B: Login de Admin (RECOMENDADO)

**Paso 2.1:** Hacer login para obtener `accessToken`

```javascript
const loginResponse = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': publicAnonKey
  },
  body: JSON.stringify({
    email: 'admin@wearevision.cl',
    password: 'TU_PASSWORD_ADMIN'
  })
});

const loginData = await loginResponse.json();
const accessToken = loginData.access_token;

console.log('✅ Login exitoso, accessToken obtenido');
```

**Paso 2.2:** Usar el `accessToken` en todas las requests

---

## 📤 PASO 3: Hacer POST con los Eventos

### Código JavaScript/TypeScript

```javascript
// CONFIGURACIÓN
const projectId = "{tu-project-id}";
const publicAnonKey = "{tu-public-anon-key}";
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

// TUS EVENTOS (array preparado en PASO 1)
const eventosParaCargar = [
  {
    "brand": "Nike",
    "title": "Lanzamiento Air Max 2024",
    "description": "...",
    "image": "https://..."
  },
  {
    "brand": "Coca-Cola",
    "title": "Festival de Verano",
    "description": "...",
    "image": "https://..."
  }
  // ... más eventos
];

// FUNCIÓN DE CARGA
async function cargarEventosMasivamente() {
  try {
    console.log(`🚀 Iniciando carga masiva de ${eventosParaCargar.length} eventos...`);
    
    // 1. Login (obtener accessToken)
    console.log('🔐 Haciendo login...');
    const loginResponse = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': publicAnonKey
      },
      body: JSON.stringify({
        email: 'admin@wearevision.cl',
        password: 'TU_PASSWORD_AQUI'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login falló: ${loginResponse.status}`);
    }
    
    const loginData = await loginResponse.json();
    const accessToken = loginData.access_token;
    console.log('✅ Login exitoso');
    
    // 2. POST eventos
    console.log(`📤 Enviando ${eventosParaCargar.length} eventos al backend...`);
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventosParaCargar)
    });
    
    // 3. Verificar respuesta
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`POST falló: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`✅ Eventos guardados exitosamente:`, result);
    console.log(`📊 Total eventos en sistema: ${result.count}`);
    
    // 4. Verificar con GET
    console.log('🔍 Verificando datos con GET...');
    const verifyResponse = await fetch(`${API_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    const eventos = await verifyResponse.json();
    console.log(`✅ Verificación completa. Eventos en sistema: ${eventos.length}`);
    
    return { success: true, count: result.count };
    
  } catch (error) {
    console.error('❌ Error en carga masiva:', error);
    throw error;
  }
}

// EJECUTAR
cargarEventosMasivamente()
  .then(result => {
    console.log('🎉 CARGA COMPLETA:', result);
  })
  .catch(error => {
    console.error('💥 CARGA FALLÓ:', error);
  });
```

---

### Código Python (si usas Python en tu IDE)

```python
import requests
import json

# CONFIGURACIÓN
PROJECT_ID = "{tu-project-id}"
PUBLIC_ANON_KEY = "{tu-public-anon-key}"
API_URL = f"https://{PROJECT_ID}.supabase.co/functions/v1/make-server-c4bb2206"

# TUS EVENTOS
eventos_para_cargar = [
    {
        "brand": "Nike",
        "title": "Lanzamiento Air Max 2024",
        "description": "...",
        "image": "https://..."
    },
    {
        "brand": "Coca-Cola",
        "title": "Festival de Verano",
        "description": "...",
        "image": "https://..."
    }
]

def cargar_eventos_masivamente():
    try:
        print(f"🚀 Iniciando carga masiva de {len(eventos_para_cargar)} eventos...")
        
        # 1. Login
        print("🔐 Haciendo login...")
        login_response = requests.post(
            f"https://{PROJECT_ID}.supabase.co/auth/v1/token?grant_type=password",
            headers={
                "Content-Type": "application/json",
                "apikey": PUBLIC_ANON_KEY
            },
            json={
                "email": "admin@wearevision.cl",
                "password": "TU_PASSWORD_AQUI"
            }
        )
        
        login_response.raise_for_status()
        access_token = login_response.json()["access_token"]
        print("✅ Login exitoso")
        
        # 2. POST eventos
        print(f"📤 Enviando {len(eventos_para_cargar)} eventos...")
        response = requests.post(
            f"{API_URL}/events",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            },
            json=eventos_para_cargar
        )
        
        response.raise_for_status()
        result = response.json()
        print(f"✅ Eventos guardados: {result}")
        
        # 3. Verificar con GET
        print("🔍 Verificando...")
        verify_response = requests.get(
            f"{API_URL}/events",
            headers={"Authorization": f"Bearer {PUBLIC_ANON_KEY}"}
        )
        
        eventos = verify_response.json()
        print(f"✅ Total eventos en sistema: {len(eventos)}")
        
        return {"success": True, "count": result["count"]}
        
    except Exception as e:
        print(f"❌ Error: {e}")
        raise

# EJECUTAR
if __name__ == "__main__":
    result = cargar_eventos_masivamente()
    print(f"🎉 CARGA COMPLETA: {result}")
```

---

## 🔍 PASO 4: Validación Pre-Carga (OPCIONAL pero RECOMENDADO)

```javascript
// Función para validar eventos ANTES de enviar
function validarEventos(eventos) {
  const errores = [];
  const advertencias = [];
  
  eventos.forEach((evento, index) => {
    const id = `Evento #${index + 1}: ${evento.brand || 'SIN MARCA'} - ${evento.title || 'SIN TÍTULO'}`;
    
    // VALIDACIONES CRÍTICAS
    if (!evento.brand || evento.brand.trim() === '') {
      errores.push(`${id} → ❌ Falta campo "brand"`);
    }
    
    if (!evento.title || evento.title.trim() === '') {
      errores.push(`${id} → ❌ Falta campo "title"`);
    }
    
    if (!evento.description || evento.description.trim() === '') {
      errores.push(`${id} → ❌ Falta campo "description"`);
    }
    
    if (!evento.image || evento.image.trim() === '') {
      errores.push(`${id} → ❌ Falta campo "image"`);
    } else if (!evento.image.startsWith('http')) {
      errores.push(`${id} → ❌ "image" no es una URL válida: ${evento.image}`);
    }
    
    // ADVERTENCIAS
    if (evento.brand && evento.brand.length > 50) {
      advertencias.push(`${id} → ⚠️ "brand" excede 50 caracteres (será truncado)`);
    }
    
    if (evento.title && evento.title.length > 100) {
      advertencias.push(`${id} → ⚠️ "title" excede 100 caracteres (será truncado)`);
    }
    
    if (evento.description && evento.description.length > 1000) {
      advertencias.push(`${id} → ⚠️ "description" excede 1000 caracteres (será truncado)`);
    }
  });
  
  // Reporte
  console.log('\n📊 VALIDACIÓN DE EVENTOS:');
  console.log(`Total a cargar: ${eventos.length}`);
  console.log(`Errores críticos: ${errores.length}`);
  console.log(`Advertencias: ${advertencias.length}`);
  
  if (errores.length > 0) {
    console.log('\n❌ ERRORES CRÍTICOS:');
    errores.forEach(err => console.log(err));
  }
  
  if (advertencias.length > 0) {
    console.log('\n⚠️ ADVERTENCIAS:');
    advertencias.forEach(adv => console.log(adv));
  }
  
  if (errores.length === 0) {
    console.log('\n✅ Validación pasada. Listo para cargar.\n');
    return true;
  } else {
    console.log('\n❌ HAY ERRORES. Corregir antes de cargar.\n');
    return false;
  }
}

// Usar ANTES de cargarEventosMasivamente()
if (validarEventos(eventosParaCargar)) {
  cargarEventosMasivamente();
} else {
  console.log('⛔ Carga cancelada por errores de validación');
}
```

---

## 🖼️ PASO 5: Manejo de Imágenes

### Opción A: URLs Externas Públicas (MÁS SIMPLE)

Si tus imágenes ya están en un CDN o servidor público:

```json
{
  "image": "https://cdn.wearevision.cl/eventos/nike-airmax-main.jpg",
  "logo": "https://cdn.wearevision.cl/logos/nike-logo.png",
  "gallery": [
    {
      "id": "gal-1",
      "type": "image",
      "url": "https://cdn.wearevision.cl/eventos/nike-airmax-gallery-1.jpg"
    }
  ]
}
```

**✅ Ventajas:**
- Más simple (no requiere upload)
- Inmediato (solo poner URLs en el JSON)

**⚠️ Requisitos:**
- Las URLs DEBEN ser públicas (accesibles sin login)
- DEBEN empezar con `https://` (no `http://`)
- DEBEN apuntar a archivos de imagen válidos (JPG, PNG, WebP)

**🔍 Probar URLs:**
```bash
# Copiar URL y pegar en navegador
# Si la imagen se ve → URL válida ✅
# Si da error 404/403 → URL inválida ❌
```

---

### Opción B: Subir a Supabase Storage (RECOMENDADO)

Si tienes archivos locales y quieres subirlos a Supabase:

**Paso 5.1:** Subir archivos

```javascript
async function subirImagenASupabase(eventId, archivoImagen, archivoLogo = null) {
  const formData = new FormData();
  formData.append('eventId', eventId);
  formData.append('mainImage', archivoImagen);
  
  if (archivoLogo) {
    formData.append('logoImage', archivoLogo);
  }
  
  const response = await fetch(`${API_URL}/upload-event-assets`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`Upload falló: ${response.status}`);
  }
  
  const result = await response.json();
  // result = { imagePath, imageUrl, logoPath, logoUrl }
  return result;
}

// Usar:
const { imageUrl, logoUrl, imagePath, logoPath } = await subirImagenASupabase(
  'abc-123-uuid',
  archivoImagenPrincipal,
  archivoLogo
);

// Luego agregar al evento:
evento.image = imageUrl;
evento.imagePath = imagePath;
evento.logo = logoUrl;
evento.logoPath = logoPath;
```

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: "Las fotos no se ven en el frontend"

**Causas posibles:**

#### A) URL de imagen es privada/requiere autenticación
```json
// ❌ INCORRECTO
{
  "image": "https://drive.google.com/file/d/abc123/view"
}

// ❌ INCORRECTO
{
  "image": "https://dropbox.com/s/abc123/photo.jpg?dl=0"
}
```

**Solución:** Usar URL pública directa o subir a Supabase Storage

```json
// ✅ CORRECTO (URL pública directa)
{
  "image": "https://cdn.ejemplo.com/eventos/nike-main.jpg"
}

// ✅ CORRECTO (Supabase Storage con signed URL)
{
  "image": "https://xyz.supabase.co/storage/v1/object/sign/make-c4bb2206-wav-assets/images/abc123_main.jpg?token=...",
  "imagePath": "images/abc123_main.jpg"
}
```

#### B) URL no empieza con https://
```json
// ❌ INCORRECTO
{
  "image": "www.ejemplo.com/foto.jpg"
}

// ✅ CORRECTO
{
  "image": "https://www.ejemplo.com/foto.jpg"
}
```

#### C) URL apunta a página HTML en vez de imagen directa
```json
// ❌ INCORRECTO (apunta a página de Unsplash, no a la imagen)
{
  "image": "https://unsplash.com/photos/abc123"
}

// ✅ CORRECTO (apunta directamente a la imagen)
{
  "image": "https://images.unsplash.com/photo-abc123?w=1080&q=80"
}
```

**Cómo verificar:**
1. Copiar la URL de `"image"`
2. Pegar en nueva pestaña del navegador
3. Si se ve la imagen sola → ✅ Correcto
4. Si se ve una página web → ❌ Incorrecto

---

### Problema 2: "Error 401 Unauthorized"

**Causa:** No estás enviando el `accessToken` correcto

**Solución:**
```javascript
// Verificar que hiciste login ANTES de POST
const accessToken = loginData.access_token;

// Verificar que el header está bien:
headers: {
  'Authorization': `Bearer ${accessToken}`,  // ⚠️ Nota el espacio después de "Bearer"
  'Content-Type': 'application/json'
}
```

---

### Problema 3: "Error 422 Validation Failed"

**Causa:** Algún evento tiene campos faltantes o inválidos

**Solución:**
1. Ver el error completo en la response
2. Buscar qué evento tiene el problema
3. Corregir y reenviar

```javascript
const response = await fetch(...);
if (!response.ok) {
  const errorText = await response.text();
  console.error('Error del backend:', errorText);
  // Leer el mensaje de error para saber qué evento falló
}
```

---

### Problema 4: "Los eventos se duplican"

**Causa:** Cada vez que haces POST, se reemplazan TODOS los eventos

**Comportamiento del endpoint:**
```javascript
// POST /events REEMPLAZA el array completo
// No hace "append", hace "replace"

// Si ya hay 10 eventos en el sistema
// Y haces POST con 5 eventos nuevos
// Resultado: Solo quedarán los 5 nuevos (los 10 anteriores se borran)
```

**Solución:**
- Si quieres AGREGAR eventos sin borrar los existentes:
  1. Hacer GET /events para obtener los existentes
  2. Agregar tus nuevos eventos al array
  3. Hacer POST con el array completo

```javascript
// 1. Obtener eventos existentes
const response = await fetch(`${API_URL}/events`);
const eventosExistentes = await response.json();

// 2. Agregar nuevos eventos
const todosLosEventos = [...eventosExistentes, ...eventosNuevos];

// 3. POST con array completo
await fetch(`${API_URL}/events`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(todosLosEventos)
});
```

---

## 📋 CHECKLIST FINAL

Antes de hacer la carga masiva:

### Pre-Carga
- [ ] Tengo el `projectId` y `publicAnonKey` de Supabase
- [ ] Tengo el email y password de admin
- [ ] Preparé el JSON con los eventos (array de objetos)
- [ ] Cada evento tiene los 4 campos mínimos (`brand`, `title`, `description`, `image`)
- [ ] Todas las URLs de imágenes son públicas y empiezan con `https://`
- [ ] Ejecuté la función de validación (opcional pero recomendado)

### Durante Carga
- [ ] Hice login exitosamente (obtuve `accessToken`)
- [ ] POST a `/events` retornó `{ success: true, count: X }`
- [ ] GET `/events` muestra los eventos cargados

### Post-Carga
- [ ] Abro el frontend (btl.wearevision.cl)
- [ ] Veo el mosaico con los eventos
- [ ] Click en un tile abre el modal correctamente
- [ ] Las imágenes cargan sin errores 404
- [ ] No hay errores en consola del navegador

---

## 📞 SOPORTE

### Si algo falla:

1. **Ver logs del backend:**
   ```bash
   # En terminal con acceso a Supabase CLI
   supabase functions logs make-server-c4bb2206 --follow
   ```

2. **Ver errores en frontend:**
   - Abrir DevTools (F12)
   - Tab "Console"
   - Buscar líneas con `❌` o errores rojos

3. **Verificar datos en Supabase:**
   - Ir a Supabase Dashboard
   - SQL Editor
   - Ejecutar:
     ```sql
     SELECT value FROM kv_store_c4bb2206 WHERE key = 'wav_events';
     ```

---

## 🎯 RESUMEN EJECUTIVO

**Para cargar 5 eventos desde Antigravity IDE:**

1. **Preparar JSON:**
   ```json
   [
     {
       "brand": "Marca 1",
       "title": "Título Evento 1",
       "description": "Descripción completa del evento...",
       "image": "https://url-publica-imagen.jpg"
     },
     { /* evento 2 */ },
     { /* evento 3 */ },
     { /* evento 4 */ },
     { /* evento 5 */ }
   ]
   ```

2. **Login + POST:**
   ```javascript
   // Login
   const loginRes = await fetch(`https://${projectId}.supabase.co/auth/v1/token?grant_type=password`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json', 'apikey': publicAnonKey },
     body: JSON.stringify({ email: 'admin@wearevision.cl', password: 'PASSWORD' })
   });
   const { access_token } = await loginRes.json();
   
   // POST eventos
   const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/events`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${access_token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(eventosArray)
   });
   
   console.log('Resultado:', await res.json());
   ```

3. **Verificar:** Abrir btl.wearevision.cl y confirmar que se ven

---

*Documento creado el 30/11/2025*  
*Para: Antigravity (Carga Masiva desde IDE)*  
*Sistema: WAV BTL v2.3.0*
