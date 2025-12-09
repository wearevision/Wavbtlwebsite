# 🚀 Quick Fix: Logo en Google Search

## ¿Qué se hizo?
✅ Actualicé el código para que Google muestre el logo en los resultados de búsqueda usando Schema.org JSON-LD estructurado.

## ⚠️ Acción Requerida (5 minutos)

### Paso 1: Preparar el Logo
- Crea un logo **cuadrado** de 512x512px en formato PNG
- Nombre: `logo-wav-square.png`
- Fondo transparente o blanco

### Paso 2: Subir a Supabase
1. Ve a https://supabase.com/dashboard/project/ykkmplrnqcwpgfdjshxn/storage
2. Crea un bucket público llamado `assets` (si no existe)
3. Sube el archivo `logo-wav-square.png`

### Paso 3: Verificar
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png
```
Abre esta URL en tu navegador. Si ves el logo, ¡listo!

### Paso 4: Forzar Indexación
1. Ve a https://search.google.com/search-console
2. Inspecciona URL: `https://btl.wearevision.cl`
3. Click en "Request indexing"

## 📊 Resultado Esperado
En 1-3 días, al buscar "We Are Vision" en Google, aparecerá el logo junto al resultado.

**Imagen de referencia:** Así se verá
```
┌─────────────────────────────────────────────┐
│ [🟦 LOGO] wearevision.cl                    │
│ We Are Vision (WAV) | Agencia de           │
│ Marketing Experiencial & BTL                │
│ WAV BTL crea experiencias inmersivas...     │
└─────────────────────────────────────────────┘
```

---

Ver instrucciones detalladas en `/GOOGLE_LOGO_SETUP_INSTRUCTIONS.md`
