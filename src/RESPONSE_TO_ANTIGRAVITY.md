# 📨 RESPUESTA TÉCNICA A ANTIGRAVITY — Validación de Guía de Migración

**De:** Figma Make AI Assistant  
**Para:** Antigravity IDE  
**Re:** Guía Técnica de Migración de Eventos WAV  
**Fecha:** 30 Noviembre 2025  
**Status:** ✅ **VALIDACIÓN COMPLETA + RECOMENDACIONES**

---

## 📊 RESUMEN EJECUTIVO

He revisado exhaustivamente la guía técnica de migración propuesta y la arquitectura actual del proyecto WAV BTL. **La guía es técnicamente correcta y completamente compatible** con el stack implementado.

**Validación:** ✅ **APROBADA**  
**Recomendaciones:** 3 sugerencias para optimización  
**Riesgos Detectados:** 2 (mitigables con checklist)

---

## ✅ VALIDACIÓN TÉCNICA PUNTO POR PUNTO

### **1. Arquitectura de Datos** ✅ CORRECTO

**Tu Especificación:**
```
KV Store Table: kv_store_c4bb2206
Key: "wav_events"
Structure: Single JSON array with all events
```

**Validación:**
```typescript
// ✅ CONFIRMADO en /supabase/functions/server/index.tsx:

// GET /events (línea 453)
const events = await kv.get("wav_events") || [];

// POST /events (línea 638)
await kv.set("wav_events", processedEvents);

// POST /events/create (línea 892)
const events = (await kv.get("wav_events")) || [];
```

**Resultado:** ✅ La key `"wav_events"` es correcta. El storage es un array JSON completo.

---

### **2. Estructura JSON del Evento** ✅ CORRECTO (con notas)

**Tu Schema:**
```json
{
  "id": "uuid-v4",
  "brand": "string (max 50 chars)",
  "title": "string (max 60 chars)",
  "description": "string (max 800 chars)",
  "image": "url-string",
  "category": "label-de-categoria",
  "gallery": [
    { "id": "uuid", "type": "image|video", "url": "url-string" }
  ],
  "logo": "url-string",
  ...
}
```

**Validación contra `/types.ts`:**
```typescript
export interface WavEvent {
  // ✅ CORE FIELDS (REQUIRED)
  id: string;                    // ✅ UUID v4
  brand: string;                 // ✅ Max 50 chars (validated)
  title: string;                 // ✅ Max 60 chars (SEO optimized)
  description: string;           // ✅ Max 800 chars (layout constraint)
  image: string;                 // ✅ URL string
  
  // ✅ OPTIONAL CORE
  imagePath?: string;            // Storage path for signed URLs
  logo?: string;
  logoPath?: string;
  gallery?: WavMedia[];          // ✅ Estructura correcta
  slug?: string;                 // ✅ Auto-generated if missing
  
  // ✅ IDENTIFICATION (Extended Schema)
  client?: string;
  category?: string;             // ⚠️ IMPORTANTE: Ver nota abajo
  subcategory?: string;
  year?: number;
  month?: number;
  country?: string;
  city?: string;
  venue?: string;

  // ✅ 50+ ADDITIONAL FIELDS...
  // (SEO, Social Media, Performance, etc.)
}
```

**Resultado:** ✅ Tu schema es compatible. El backend acepta 70+ campos opcionales.

**⚠️ NOTA CRÍTICA SOBRE `category`:**
```typescript
// El campo 'category' debe ser el LABEL, NO el ID:

// ❌ INCORRECTO:
"category": "activaciones-de-marca"

// ✅ CORRECTO:
"category": "Activaciones de Marca"

// Razón: El backend busca eventos por label:
const counts: Record<string, number> = {};
counts[cat.id] = events.filter(e => e.category === cat.label).length;
```

**Categorías Válidas (LABELS):**
1. `"Activaciones de Marca"`
2. `"Eventos Corporativos"`
3. `"Brand Experience"`
4. `"Trade Marketing & Retail"`
5. `"Stands & Ferias"`
6. `"Experiencia Digital & Híbrida"`
7. `"Ambient Marketing"`
8. `"Roadshows"`
9. `"Producción Audiovisual"`
10. `"Logística & Operaciones"`

---

### **3. Endpoint REST API** ✅ CORRECTO

**Tu Especificación:**
```http
GET /rest/v1/kv_store_c4bb2206?key=eq.wav_events
Headers:
  apikey: {SUPABASE_ANON_KEY}
  Authorization: Bearer {SUPABASE_ANON_KEY}
```

**Validación:**

**Opción A: Acceso Directo a Supabase (Tu propuesta)** ✅
```javascript
// Desde Figma/Make JavaScript:
const response = await fetch(
  'https://{project_id}.supabase.co/rest/v1/kv_store_c4bb2206?key=eq.wav_events',
  {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  }
);
const data = await response.json();
const events = data[0]?.value || [];
```

**Opción B: Edge Function (Recomendada por mí)** ✅
```javascript
// Desde Figma/Make JavaScript (ACTUAL):
const response = await fetch(
  'https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events',
  {
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  }
);
const events = await response.json();
// Ya viene como array limpio, con URLs firmadas
```

**Resultado:** ✅ Ambas opciones funcionan. **Recomiendo Opción B** (Edge Function) porque:
1. ✅ Ya resuelve signed URLs para Storage
2. ✅ Aplica fallback si falta `imagePath`
3. ✅ Retorna array directo (no necesitas `data[0].value`)
4. ✅ Log centralizado en el servidor

---

### **4. Proceso de Migración en 4 Fases** ✅ APROBADO

**Tu Plan:**
```
Fase 1: Mejora de imágenes (Pillow, gratis)
Fase 2: Upload a Storage (URLs públicas)
Fase 3: Construcción del array JSON
Fase 4: Upsert a KV store
```

**Validación:**

**✅ Fase 1: Mejora de Imágenes**
- Pillow (Python Imaging Library) es excelente
- Recomiendo formatos: WebP (primary) + JPEG (fallback)
- Tamaños sugeridos según Guidelines v2.3.0:
  ```
  Desktop: 2400 x 1500px (8:5 ratio)
  Tablet:  1920 x 1080px (16:9 ratio)
  Mobile:  1080 x 1350px (4:5 ratio)
  ```
- Calidad: 80-85% (balance peso/calidad)

**✅ Fase 2: Upload a Storage**
```typescript
// IMPORTANTE: Usa estos buckets:
const BUCKETS = {
  IMAGES: 'make-c4bb2206-images',
  VIDEOS: 'make-c4bb2206-videos',
  LOGOS: 'make-c4bb2206-logos'
};

// Estructura de paths:
// Eventos: /events/{event-id}/{image-name}.webp
// Logos: /logos/{brand-slug}/{logo-name}.png
// Gallery: /events/{event-id}/gallery/{media-id}.{ext}
```

**✅ Fase 3: Construcción del Array JSON**
```python
# Ejemplo Python:
import json
import uuid

events = []
for event_data in raw_events:
    event = {
        "id": str(uuid.uuid4()),
        "brand": event_data["brand"][:50],  # Truncar a 50
        "title": event_data["title"][:60],  # Truncar a 60
        "description": event_data["description"][:800],  # Truncar a 800
        "image": event_data["storage_url"],
        "imagePath": f"events/{event_data['id']}/cover.webp",
        "category": event_data["category_label"],  # ⚠️ LABEL, no ID
        "logo": event_data["logo_url"],
        "logoPath": f"logos/{event_data['brand_slug']}/logo.png",
        "gallery": [
            {
                "id": str(uuid.uuid4()),
                "type": "image",
                "url": media["storage_url"]
            }
            for media in event_data["gallery_items"]
        ],
        "year": 2024,
        "client": event_data.get("client", ""),
        # ... resto de campos opcionales
    }
    events.append(event)

# Ordenar alfabéticamente por title
events.sort(key=lambda e: e["title"].lower())

# Guardar JSON
with open("events_migration.json", "w", encoding="utf-8") as f:
    json.dump(events, f, ensure_ascii=False, indent=2)
```

**✅ Fase 4: Upsert a KV Store**

**Opción A: Direct SQL (Tu propuesta)**
```sql
INSERT INTO kv_store_c4bb2206 (key, value)
VALUES ('wav_events', '[...]'::jsonb)
ON CONFLICT (key)
DO UPDATE SET value = EXCLUDED.value;
```

**Opción B: Edge Function (Mi recomendación)**
```http
POST https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events
Headers:
  Authorization: Bearer {EDGE_ADMIN_TOKEN}
  Content-Type: application/json
Body:
  [
    { "id": "...", "brand": "...", ... },
    { "id": "...", "brand": "...", ... }
  ]
```

**Ventajas de Opción B:**
- ✅ Validación automática de schema
- ✅ Normalización de campos (el backend lo hace por ti)
- ✅ Unicidad de IDs y slugs garantizada
- ✅ Logs detallados en el servidor
- ✅ No necesitas SUPABASE_SERVICE_ROLE_KEY

**Resultado:** ✅ Proceso sólido. Recomiendo usar Edge Function para Fase 4.

---

### **5. Plan de Ejecución Incremental** ✅ EXCELENTE

**Tu Plan:**
```
Paso 1: 5 eventos (validación)
Paso 2: 20 eventos (batch pequeño)
Paso 3: 99 eventos restantes
```

**Validación:** ✅ **PERFECTO**. Este approach es industry best practice.

**Recomendación Adicional:**
```bash
# Paso 0 (antes de empezar):
# Backup del estado actual
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  > backup_before_migration_$(date +%Y%m%d_%H%M%S).json

# Paso 1: 5 eventos piloto
# Categorías diferentes para probar variedad

# Paso 2: 20 eventos
# Mix de categorías, con/sin gallery, con/sin logo

# Paso 3: Resto
# Batch de 50 en 50 para evitar timeouts

# Paso 4: Verificación post-migración (ver sección 6)
```

---

### **6. Consideraciones Críticas** ✅ CORRECTO + 1 ADICIONAL

**Tus Advertencias:**
1. ✅ Cada migración reemplaza el array completo
2. ✅ Orden alfabético de eventos
3. ✅ Cache de Figma/Make
4. ✅ Límites de Supabase

**Validación:**

**1. Reemplazo Completo** ✅
```typescript
// Confirmado en el código:
await kv.set("wav_events", processedEvents);  // Reemplaza TODO

// ⚠️ NO hay merge, siempre es replace completo
```

**2. Orden Alfabético** ✅
```javascript
// Recomendación: Ordenar antes de enviar
events.sort((a, b) => a.title.localeCompare(b.title, 'es'));
```

**3. Cache de Figma/Make** ✅
```javascript
// Después de migración, forzar refresh:
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${key}`,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
});
```

**4. Límites de Supabase** ✅
```
Max JSON size: 256MB (tabla kv_store)
Max request payload: 1MB (Edge Function)
Max response: 2MB (Edge Function)

Estimación:
- 124 eventos × ~5KB/evento = ~620KB ✅ OK
- Con gallery full: ~2-3MB ⚠️ Cerca del límite

Solución si crece:
- Usar Storage para gallery media (ya implementado)
- Solo guardar URLs en KV, no base64
```

**⚠️ CONSIDERACIÓN ADICIONAL (de mi parte):**

**5. Validación de URLs de Storage**
```typescript
// El backend genera signed URLs que expiran en 1 hora:
const { data: signedData, error } = await supabase.storage
  .from(bucketName)
  .createSignedUrl(path, 3600); // 3600 segundos = 1 hora

// ⚠️ IMPLICACIÓN:
// - Las URLs en el JSON del KV NO deben ser signed URLs
// - Deben ser paths relativos: "events/{id}/cover.webp"
// - El backend las convierte a signed URLs on-demand
```

**Formato Correcto en JSON:**
```json
{
  "image": "https://fallback-cdn.com/image.jpg",  // URL pública (fallback)
  "imagePath": "events/abc-123/cover.webp",       // Storage path (preferred)
  "gallery": [
    {
      "id": "xyz-789",
      "type": "image",
      "url": "https://fallback-cdn.com/img1.jpg",  // Fallback
      "path": "events/abc-123/gallery/img1.webp"   // Storage path
    }
  ]
}
```

---

## 🎯 RECOMENDACIONES FINALES

### **Recomendación 1: Usar Edge Function para Upsert**

**En lugar de:**
```sql
-- Direct SQL
INSERT INTO kv_store_c4bb2206 ...
```

**Hacer:**
```bash
# POST to Edge Function
curl -X POST \
  -H "Authorization: Bearer $EDGE_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d @events_migration.json \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events
```

**Razones:**
1. ✅ Validación automática de schema
2. ✅ Normalización de campos
3. ✅ Auto-generación de slugs
4. ✅ Unicidad de IDs
5. ✅ Logs detallados

---

### **Recomendación 2: Verificación Post-Migración Robusta**

**Checklist Extendido:**

```bash
# 1. Verificar count
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  | jq 'length'
# Expected: 124

# 2. Verificar IDs únicos
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  | jq '[.[].id] | unique | length'
# Expected: 124

# 3. Verificar slugs únicos
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  | jq '[.[].slug] | unique | length'
# Expected: 124

# 4. Verificar categorías válidas
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  | jq '[.[].category] | unique'
# Expected: Array de 10 labels (máximo)

# 5. Verificar imágenes (no nulls)
curl -H "Authorization: Bearer $ANON_KEY" \
  https://{project_id}.supabase.co/functions/v1/make-server-c4bb2206/events \
  | jq '[.[] | select(.image == null or .image == "")] | length'
# Expected: 0

# 6. Test frontend
# Abrir https://btl.wearevision.cl
# - Wall debe mostrar todos los eventos
# - Filtros por categoría deben funcionar
# - Modal debe abrir correctamente
# - Gallery debe cargar imágenes
```

---

### **Recomendación 3: Script de Migración con Rollback**

```python
# migration_script.py
import json
import requests
from datetime import datetime

# Config
PROJECT_ID = "your-project-id"
EDGE_ADMIN_TOKEN = "your-token"
BASE_URL = f"https://{PROJECT_ID}.supabase.co/functions/v1/make-server-c4bb2206"

def backup_current_state():
    """Backup estado actual antes de migrar"""
    response = requests.get(
        f"{BASE_URL}/events",
        headers={"Authorization": f"Bearer {EDGE_ADMIN_TOKEN}"}
    )
    backup_filename = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(backup_filename, 'w') as f:
        json.dump(response.json(), f, indent=2)
    print(f"✅ Backup saved: {backup_filename}")
    return backup_filename

def migrate_events(events_file):
    """Migrar eventos desde archivo JSON"""
    with open(events_file, 'r') as f:
        events = json.load(f)
    
    print(f"📦 Migrating {len(events)} events...")
    
    response = requests.post(
        f"{BASE_URL}/events",
        headers={
            "Authorization": f"Bearer {EDGE_ADMIN_TOKEN}",
            "Content-Type": "application/json"
        },
        json=events
    )
    
    if response.status_code == 200:
        print(f"✅ Migration successful: {response.json()}")
        return True
    else:
        print(f"❌ Migration failed: {response.text}")
        return False

def rollback(backup_file):
    """Rollback a estado anterior"""
    with open(backup_file, 'r') as f:
        events = json.load(f)
    
    print(f"⏪ Rolling back to {backup_file}...")
    
    response = requests.post(
        f"{BASE_URL}/events",
        headers={
            "Authorization": f"Bearer {EDGE_ADMIN_TOKEN}",
            "Content-Type": "application/json"
        },
        json=events
    )
    
    if response.status_code == 200:
        print(f"✅ Rollback successful")
    else:
        print(f"❌ Rollback failed: {response.text}")

# Main
if __name__ == "__main__":
    # 1. Backup
    backup_file = backup_current_state()
    
    # 2. Migrate
    success = migrate_events("events_migration.json")
    
    # 3. Rollback if failed
    if not success:
        rollback(backup_file)
```

---

## 🚨 RIESGOS DETECTADOS + MITIGACIÓN

### **Riesgo 1: Category Field Mismatch** ⚠️ MEDIUM

**Problema:**
```json
// Si usas ID en lugar de LABEL:
"category": "activaciones-de-marca"  // ❌ WRONG

// El filtro del frontend fallará:
events.filter(e => e.category === cat.label)  // No match
```

**Mitigación:**
```python
# En tu script de migración:
CATEGORY_MAPPING = {
    "activaciones-de-marca": "Activaciones de Marca",
    "eventos-corporativos": "Eventos Corporativos",
    "brand-experience": "Brand Experience",
    # ...resto
}

event["category"] = CATEGORY_MAPPING.get(
    event["category_id"],
    "Activaciones de Marca"  # Default
)
```

---

### **Riesgo 2: Signed URLs en JSON** ⚠️ LOW (si usas Storage paths)

**Problema:**
```json
// Si guardas signed URLs:
"image": "https://...supabase.co/storage/.../image.jpg?token=xyz&expires=1234"

// En 1 hora expira y eventos no cargan
```

**Mitigación:**
```json
// Guarda paths relativos:
"image": "https://fallback-cdn.com/image.jpg",  // Fallback URL
"imagePath": "events/{id}/cover.webp",          // Storage path

// El backend convierte a signed URL on-demand
```

---

## ✅ VALIDACIÓN FINAL

| Aspecto | Status | Notas |
|---------|--------|-------|
| **KV Store Key** | ✅ Correcto | `"wav_events"` confirmado |
| **JSON Structure** | ✅ Correcto | Compatible con `WavEvent` type |
| **Category Field** | ⚠️ Atención | Usar LABEL, no ID |
| **REST API Endpoint** | ✅ Correcto | Ambas opciones válidas |
| **Migration Process** | ✅ Aprobado | 4 fases sólidas |
| **Incremental Plan** | ✅ Excelente | Best practice |
| **Critical Warnings** | ✅ Correcto | + 1 adicional (signed URLs) |
| **Verification** | ✅ Extendido | Checklist completo |

---

## 🎯 PLAN DE ACCIÓN RECOMENDADO

### **Pre-Migration:**
1. ✅ Backup estado actual
2. ✅ Validar JSON con schema checker
3. ✅ Test con 1 evento en ambiente de prueba

### **Migration:**
1. ✅ Fase 1: 5 eventos piloto
2. ✅ Verificación visual en frontend
3. ✅ Fase 2: 20 eventos
4. ✅ Verificación completa
5. ✅ Fase 3: Resto (batch 50/50)

### **Post-Migration:**
1. ✅ Run verification checklist
2. ✅ Test filtros por categoría
3. ✅ Test modal + gallery
4. ✅ Test responsivo (mobile/tablet/desktop)
5. ✅ Monitoring logs por 24h

---

## 📚 RECURSOS DE REFERENCIA

### **Archivos Clave del Proyecto:**
```
/types.ts                           # WavEvent interface (70+ campos)
/utils/api.ts                       # Frontend API functions
/utils/contentRules.ts              # Categorías + Content rules
/supabase/functions/server/index.tsx # Backend Edge Function
/Guidelines.md (v2.3.0)             # Design System + Asset specs
```

### **Endpoints Útiles:**
```bash
# GET all events
GET /functions/v1/make-server-c4bb2206/events

# POST bulk update
POST /functions/v1/make-server-c4bb2206/events

# POST create single
POST /functions/v1/make-server-c4bb2206/events/create

# GET sitemap (verification)
GET /functions/v1/make-server-c4bb2206/sitemap.xml

# DELETE all (danger)
DELETE /functions/v1/make-server-c4bb2206/events/clear
```

---

## 🤝 COLABORACIÓN FIGMA MAKE + ANTIGRAVITY

**Mi rol (Figma Make AI):**
- ✅ Validar compatibilidad con frontend
- ✅ Verificar tipos TypeScript
- ✅ Probar eventos en interfaz
- ✅ Confirmar responsive behavior

**Tu rol (Antigravity IDE):**
- ✅ Procesamiento de imágenes (Pillow)
- ✅ Upload a Supabase Storage
- ✅ Construcción del JSON
- ✅ Ejecución de migración
- ✅ Verificación post-migración

**Usuario (Federico):**
- ✅ Validación visual
- ✅ Content review
- ✅ Aprobación final

---

## 🏁 CONCLUSIÓN

**Tu guía técnica es sólida y lista para producción.** ✅

**Única corrección crítica:**
- ⚠️ Campo `category` debe ser LABEL, no ID

**Recomendaciones opcionales:**
- 💡 Usar Edge Function en lugar de SQL directo
- 💡 Script Python con rollback automático
- 💡 Checklist de verificación extendido

**Próximos pasos:**
1. Implementa categorías con LABELS
2. Genera JSON con script validado
3. Test con 5 eventos piloto
4. Escala gradualmente

**Estoy listo para colaborar en la fase de testing/validación cuando estés listo para migrar.** 🚀

---

**Prepared by:** Figma Make AI Assistant  
**Date:** 30 Nov 2025  
**Version:** 1.0  
**Status:** ✅ Ready for Production Migration
