# 🔧 SOLUCIÓN: Fotos No Se Ven - Fix para Antigravity

**Problema:** Los 5 eventos cargados no muestran fotos  
**Causa:** Estructura de datos incorrecta (`cover_url` vs. `image`)  
**Fecha:** 30 de Noviembre, 2025

---

## 🔴 DIAGNÓSTICO DEL PROBLEMA

### Lo que Antigravity está haciendo (INCORRECTO):

```python
# Script actual: migrate_events.py
import requests

# ❌ POST DIRECTO al KV store (bypasea la Edge Function)
response = requests.post(
    "https://ykkmplrnqcwpgfdjshxn.supabase.co/rest/v1/kv_store_c4bb2206",
    headers={
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "key": "wav_events",
        "value": [
            {
                "id": "e57dd3fb-5b25-432a-9daf-039322cbab85",
                "slug": "2007-entel-fiesta-fin-de-ano",
                "title": "Realizaton 2013: Impulsando la Visión de Unknown",
                "year": 2007,
                "brand": "Unknown",
                "cover_url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp",  # ❌ Campo incorrecto
                "gallery_urls": ["https://..."],  # ❌ Campo incorrecto
                "metadata": {...}  # ❌ Campo no esperado
            }
        ]
    }
)
```

**Problema:**
- ✅ Los datos se guardaron en el KV store
- ❌ Pero tienen estructura **diferente** a la que el frontend espera
- ❌ Frontend busca `image`, pero encuentra `cover_url`
- ❌ Frontend busca `gallery: [{id, type, url}]`, pero encuentra `gallery_urls: [...]`
- ❌ Resultado: **Las fotos no cargan**

---

## ✅ SOLUCIÓN 1: Transformar Datos y Usar Endpoint Correcto

### Script Corregido (Python)

```python
# migrate_events_FIXED.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = "ykkmplrnqcwpgfdjshxn"
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
API_URL = f"https://{PROJECT_ID}.supabase.co/functions/v1/make-server-c4bb2206"

# TUS DATOS ORIGINALES (desde Figma/Make)
eventos_antiguos = [
    {
        "id": "e57dd3fb-5b25-432a-9daf-039322cbab85",
        "slug": "2007-entel-fiesta-fin-de-ano",
        "title": "Realizaton 2013: Impulsando la Visión de Unknown",
        "year": 2007,
        "brand": "Unknown",
        "cover_url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp",
        "gallery_urls": [
            "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp",
            "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_01.webp"
        ],
        "metadata": {
            "brand": "Unknown",
            "event_name": "Realizaton 2013",
            "year": 2007,
            "content": {
                "title": "Realizaton 2013: Impulsando la Visión de Unknown",
                "summary": "WAV BTL creó una experiencia inmersiva...",
                "description": "En 2013, WAV BTL tuvo el privilegio de colaborar...",
                "hashtags": ["#MarketingExperiencial", "#EventosCorporativos"],
                "keywords": ["marketing experiencial", "eventos corporativos"]
            }
        }
    }
    # ... más eventos
]

# ✅ TRANSFORMAR a estructura WavEvent
def transformar_evento(evento_antiguo):
    """
    Transforma de estructura Antigravity → WavEvent
    """
    metadata = evento_antiguo.get("metadata", {})
    content = metadata.get("content", {})
    
    # 1. Convertir cover_url → image
    image = evento_antiguo.get("cover_url", "")
    
    # 2. Convertir gallery_urls → gallery
    gallery = []
    gallery_urls = evento_antiguo.get("gallery_urls", [])
    for idx, url in enumerate(gallery_urls):
        gallery.append({
            "id": f"gallery-{idx}",
            "type": "image",  # Asumimos que son imágenes (ajustar si hay videos)
            "url": url
        })
    
    # 3. Extraer otros campos
    description = content.get("description", content.get("summary", ""))
    if not description:
        description = "Descripción no disponible."
    
    # 4. Construir evento en formato WavEvent
    evento_transformado = {
        "id": evento_antiguo.get("id", ""),
        "slug": evento_antiguo.get("slug", ""),
        "brand": evento_antiguo.get("brand", metadata.get("brand", "Marca Desconocida")),
        "title": content.get("title", evento_antiguo.get("title", "Evento Sin Título")),
        "description": description,
        "image": image,  # ✅ Campo correcto
        "gallery": gallery,  # ✅ Estructura correcta
        
        # Campos opcionales pero recomendados
        "summary": content.get("summary", ""),
        "year": evento_antiguo.get("year"),
        "keywords": content.get("keywords", []),
        "hashtags": content.get("hashtags", []),
        "category": "eventos-corporativos"  # Ajustar según evento
    }
    
    return evento_transformado

# ✅ Transformar todos los eventos
eventos_transformados = [transformar_evento(e) for e in eventos_antiguos]

print(f"🔄 Transformados {len(eventos_transformados)} eventos")
print("\n📊 Ejemplo de evento transformado:")
print(eventos_transformados[0])

# ✅ POST al endpoint CORRECTO (Edge Function)
def cargar_eventos():
    print(f"\n🚀 Cargando {len(eventos_transformados)} eventos...")
    
    response = requests.post(
        f"{API_URL}/events",  # ✅ Endpoint correcto
        headers={
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json"
        },
        json=eventos_transformados  # ✅ Datos transformados
    )
    
    if response.status_code != 200:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        return False
    
    result = response.json()
    print(f"✅ Eventos cargados exitosamente: {result}")
    
    # Verificar con GET
    print("\n🔍 Verificando datos...")
    verify_response = requests.get(
        f"{API_URL}/events",
        headers={"Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"}
    )
    
    eventos = verify_response.json()
    print(f"✅ Total eventos en sistema: {len(eventos)}")
    
    # Verificar que las fotos estén correctas
    primer_evento = eventos[0]
    print(f"\n📸 Verificando estructura del primer evento:")
    print(f"  - Tiene 'image': {'✅' if 'image' in primer_evento else '❌'}")
    print(f"  - 'image' value: {primer_evento.get('image', 'N/A')[:100]}...")
    print(f"  - Tiene 'gallery': {'✅' if 'gallery' in primer_evento else '❌'}")
    print(f"  - 'gallery' length: {len(primer_evento.get('gallery', []))}")
    
    return True

# EJECUTAR
if __name__ == "__main__":
    if cargar_eventos():
        print("\n🎉 MIGRACIÓN COMPLETADA")
        print("👉 Ahora abre btl.wearevision.cl para verificar que las fotos se vean")
    else:
        print("\n💥 MIGRACIÓN FALLÓ")
```

---

## ✅ SOLUCIÓN 2: Script de Re-Migración (Para los 5 Eventos Ya Cargados)

Si no quieres cambiar tu script original, puedes ejecutar este script **una sola vez** para corregir los 5 eventos ya cargados:

```python
# fix_existing_events.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = "ykkmplrnqcwpgfdjshxn"
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
API_URL = f"https://{PROJECT_ID}.supabase.co/functions/v1/make-server-c4bb2206"

def fix_eventos_existentes():
    print("🔍 Obteniendo eventos actuales del KV store...")
    
    # 1. GET eventos actuales (estructura incorrecta)
    response = requests.get(
        f"{API_URL}/events",
        headers={"Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"}
    )
    
    if response.status_code != 200:
        print(f"❌ Error al obtener eventos: {response.status_code}")
        return False
    
    eventos_actuales = response.json()
    print(f"✅ Obtenidos {len(eventos_actuales)} eventos")
    
    # 2. Transformar cada evento
    eventos_corregidos = []
    
    for evento in eventos_actuales:
        print(f"\n🔄 Procesando: {evento.get('title', 'Sin título')}")
        
        # Si el evento tiene cover_url en vez de image, corregir
        if 'cover_url' in evento and 'image' not in evento:
            print(f"  ⚠️ Detectado 'cover_url' → Convirtiendo a 'image'")
            evento['image'] = evento['cover_url']
            del evento['cover_url']
        
        # Si el evento tiene gallery_urls en vez de gallery, corregir
        if 'gallery_urls' in evento and not evento.get('gallery'):
            print(f"  ⚠️ Detectado 'gallery_urls' → Convirtiendo a 'gallery'")
            gallery = []
            for idx, url in enumerate(evento['gallery_urls']):
                gallery.append({
                    "id": f"gallery-{idx}",
                    "type": "image",
                    "url": url
                })
            evento['gallery'] = gallery
            del evento['gallery_urls']
        
        # Eliminar campo metadata si existe (no es parte de WavEvent)
        if 'metadata' in evento:
            print(f"  🗑️ Eliminando campo 'metadata' (no es parte de WavEvent)")
            
            # Extraer info útil de metadata antes de eliminar
            metadata = evento.get('metadata', {})
            content = metadata.get('content', {})
            
            # Si description está vacío, usar de metadata
            if not evento.get('description'):
                evento['description'] = content.get('description', content.get('summary', ''))
            
            # Si summary está vacío, usar de metadata
            if not evento.get('summary'):
                evento['summary'] = content.get('summary', '')
            
            # Si keywords/hashtags están vacíos, usar de metadata
            if not evento.get('keywords'):
                evento['keywords'] = content.get('keywords', [])
            if not evento.get('hashtags'):
                evento['hashtags'] = content.get('hashtags', [])
            
            del evento['metadata']
        
        eventos_corregidos.append(evento)
    
    print(f"\n✅ {len(eventos_corregidos)} eventos corregidos")
    
    # 3. Guardar eventos corregidos
    print(f"\n💾 Guardando eventos corregidos...")
    
    save_response = requests.post(
        f"{API_URL}/events",
        headers={
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json"
        },
        json=eventos_corregidos
    )
    
    if save_response.status_code != 200:
        print(f"❌ Error al guardar: {save_response.status_code}")
        print(save_response.text)
        return False
    
    result = save_response.json()
    print(f"✅ Eventos guardados: {result}")
    
    # 4. Verificar
    print(f"\n🔍 Verificando estructura corregida...")
    
    verify_response = requests.get(
        f"{API_URL}/events",
        headers={"Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"}
    )
    
    eventos_verificados = verify_response.json()
    primer_evento = eventos_verificados[0]
    
    print(f"\n📸 Estructura del primer evento:")
    print(f"  - Tiene 'image': {'✅' if 'image' in primer_evento else '❌'}")
    print(f"  - Tiene 'cover_url': {'❌ (debe eliminarse)' if 'cover_url' in primer_evento else '✅ (eliminado correctamente)'}")
    print(f"  - Tiene 'gallery': {'✅' if 'gallery' in primer_evento else '❌'}")
    print(f"  - Tiene 'gallery_urls': {'❌ (debe eliminarse)' if 'gallery_urls' in primer_evento else '✅ (eliminado correctamente)'}")
    print(f"  - Tiene 'metadata': {'❌ (debe eliminarse)' if 'metadata' in primer_evento else '✅ (eliminado correctamente)'}")
    
    if 'image' in primer_evento:
        print(f"  - URL de 'image': {primer_evento['image'][:80]}...")
    
    return True

# EJECUTAR
if __name__ == "__main__":
    print("🔧 SCRIPT DE CORRECCIÓN DE EVENTOS EXISTENTES\n")
    print("Este script:")
    print("  1. Lee los 5 eventos actuales")
    print("  2. Convierte 'cover_url' → 'image'")
    print("  3. Convierte 'gallery_urls' → 'gallery'")
    print("  4. Elimina campos no válidos")
    print("  5. Guarda eventos corregidos\n")
    
    input("Presiona ENTER para continuar...")
    
    if fix_eventos_existentes():
        print("\n🎉 CORRECCIÓN COMPLETADA")
        print("👉 Ahora abre btl.wearevision.cl para verificar que las fotos se vean")
    else:
        print("\n💥 CORRECCIÓN FALLÓ")
```

---

## 🔍 VERIFICACIÓN

Después de ejecutar cualquiera de los scripts:

### 1. Verificar en Terminal

```bash
# Ver eventos en el sistema
curl -X GET "https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/events" \
  -H "Authorization: Bearer {SUPABASE_SERVICE_ROLE_KEY}" | jq '.[0] | {brand, title, image, gallery}'

# Debería mostrar:
# {
#   "brand": "Unknown",
#   "title": "Realizaton 2013...",
#   "image": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp",
#   "gallery": [
#     {
#       "id": "gallery-0",
#       "type": "image",
#       "url": "https://..."
#     }
#   ]
# }
```

### 2. Verificar en Frontend

```bash
# Abrir navegador
open https://btl.wearevision.cl

# Verificar:
# ✅ El mosaico muestra tiles con fotos
# ✅ Click en tile abre modal con foto grande
# ✅ No hay errores 404 en consola (F12 → Console)
```

---

## 📊 COMPARACIÓN: Antes vs. Después

### ❌ ANTES (Estructura Incorrecta)

```json
{
  "id": "e57dd3fb-5b25-432a-9daf-039322cbab85",
  "slug": "2007-entel-fiesta-fin-de-ano",
  "title": "Realizaton 2013",
  "brand": "Unknown",
  "cover_url": "https://...",           // ❌ Campo incorrecto
  "gallery_urls": ["https://..."],      // ❌ Campo incorrecto
  "metadata": {...}                     // ❌ Campo no válido
}
```

**Resultado:** Frontend no encuentra `image` → No muestra foto

---

### ✅ DESPUÉS (Estructura Correcta)

```json
{
  "id": "e57dd3fb-5b25-432a-9daf-039322cbab85",
  "slug": "2007-entel-fiesta-fin-de-ano",
  "title": "Realizaton 2013: Impulsando la Visión de Unknown",
  "brand": "Unknown",
  "description": "En 2013, WAV BTL tuvo el privilegio...",
  "image": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp",  // ✅ Campo correcto
  "gallery": [                           // ✅ Estructura correcta
    {
      "id": "gallery-0",
      "type": "image",
      "url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_00.webp"
    },
    {
      "id": "gallery-1",
      "type": "image",
      "url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/events/2007-entel-fiesta-fin-de-ano/gallery_01.webp"
    }
  ],
  "summary": "WAV BTL creó una experiencia inmersiva...",
  "keywords": ["marketing experiencial", "eventos corporativos"],
  "hashtags": ["#MarketingExperiencial", "#EventosCorporativos"],
  "year": 2007,
  "category": "eventos-corporativos"
}
```

**Resultado:** Frontend encuentra `image` → ✅ Muestra foto correctamente

---

## 🎯 RESUMEN EJECUTIVO

**PROBLEMA:**
- Antigravity hace POST directo al KV store (bypasea la Edge Function)
- Usa campos incorrectos (`cover_url`, `gallery_urls`, `metadata`)
- Frontend espera campos específicos (`image`, `gallery`)
- **Resultado:** Fotos no se ven

**SOLUCIÓN RÁPIDA:**
1. Ejecutar `fix_existing_events.py` (corrección de 1 sola vez)
2. Verificar en btl.wearevision.cl
3. Ahora las fotos deberían verse ✅

**SOLUCIÓN PERMANENTE:**
1. Usar `migrate_events_FIXED.py` para futuras cargas
2. Siempre usar el endpoint de la Edge Function (`POST /events`)
3. Transformar datos antes de enviar

---

## 🚨 IMPORTANTE PARA FUTURAS CARGAS

**NO hacer:**
```python
# ❌ NUNCA hacer POST directo al KV store
requests.post("https://ykkmplrnqcwpgfdjshxn.supabase.co/rest/v1/kv_store_c4bb2206", ...)
```

**SÍ hacer:**
```python
# ✅ SIEMPRE usar la Edge Function
requests.post("https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/events", ...)
```

**Ventajas de usar la Edge Function:**
- ✅ Auto-normaliza los datos
- ✅ Valida campos requeridos
- ✅ Detecta duplicados
- ✅ Genera UUIDs si faltan
- ✅ Garantiza compatibilidad con frontend

---

*Documento creado el 30/11/2025*  
*Solución para: Fotos no se ven en eventos cargados por Antigravity*  
*Sistema: WAV BTL v2.3.0*
