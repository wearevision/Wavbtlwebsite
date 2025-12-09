# 🔍 Configuración del Logo para Google Search

## Estado Actual
✅ **Código actualizado** - El Schema.org y las meta tags ya están configurados para usar el logo desde Supabase Storage.

## ⚠️ Acción Requerida
Para que Google muestre el logo en los resultados de búsqueda, debes subir el logo al bucket público de Supabase Storage.

---

## 📋 Pasos para Configurar el Logo

### 1. Preparar el Logo
- **Formato:** PNG (preferido) o JPG
- **Dimensiones:** Mínimo 112x112px, **recomendado 512x512px** (cuadrado)
- **Peso:** Menor a 2MB
- **Fondo:** Preferiblemente transparente o blanco
- **Nombre del archivo:** `logo-wav-square.png`

### 2. Subir a Supabase Storage

#### Opción A: Desde la UI de Supabase (Recomendado)
1. Ve a https://supabase.com/dashboard/project/ykkmplrnqcwpgfdjshxn
2. En el menú lateral, selecciona **Storage**
3. Si no existe, crea un nuevo bucket llamado `assets`:
   - Click en "New bucket"
   - Nombre: `assets`
   - ✅ **IMPORTANTE:** Marca como "Public bucket"
   - Click "Create bucket"
4. Entra al bucket `assets`
5. Click en "Upload files"
6. Selecciona el archivo `logo-wav-square.png`
7. Confirma la subida

#### Opción B: Desde el Admin Panel de Make (Si está implementado)
Si agregamos funcionalidad de upload de assets en el Admin Panel, podrás subirlo directamente desde ahí.

### 3. Verificar la URL
Una vez subido, la URL pública debería ser:
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png
```

**Verificación:**
- Abre la URL en tu navegador
- Deberías ver el logo
- Si ves un error 404, revisa que el bucket sea público

---

## 🔧 URLs Configuradas en el Código

### 1. Schema.org JSON-LD (`/components/wav/SchemaJSONLD.tsx`)
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png",
  "width": 512,
  "height": 512
}
```

### 2. Favicon y Apple Touch Icon (`/App.tsx`)
```html
<link rel="icon" type="image/png" href="https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png" />
<link rel="apple-touch-icon" href="https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png" />
```

---

## 🕒 Tiempo de Indexación

Después de subir el logo:
1. **Inmediato:** El logo aparecerá como favicon en el navegador
2. **1-3 días:** Google indexará el Schema.org y mostrará el logo en Search
3. **Opcional:** Acelera el proceso usando Google Search Console:
   - Ve a https://search.google.com/search-console
   - Solicita inspección de URL para `https://btl.wearevision.cl`
   - Click en "Request indexing"

---

## 🧪 Verificar que Todo Funciona

### Test 1: Rich Results Test de Google
1. Ve a https://search.google.com/test/rich-results
2. Ingresa: `https://btl.wearevision.cl`
3. Verifica que el Schema.org "Organization" aparezca con el logo

### Test 2: Favicon
1. Abre `https://btl.wearevision.cl` en un navegador nuevo
2. Verifica que el favicon se muestre en la pestaña

### Test 3: Verificación Manual del JSON-LD
1. Abre `https://btl.wearevision.cl`
2. Inspecciona el código (F12)
3. Busca en el `<head>` el `<script type="application/ld+json">`
4. Verifica que contenga:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "We Are Vision",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png",
    ...
  }
}
```

---

## 📚 Documentación de Referencia

- [Google - Specify your organization's logo](https://developers.google.com/search/docs/appearance/structured-data/logo)
- [Schema.org - Organization](https://schema.org/Organization)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)

---

## 🚨 Troubleshooting

### ❌ El logo no aparece en Google después de 3 días
- **Causa:** Google aún no ha rastreado el sitio
- **Solución:** Fuerza el rastreo en Google Search Console

### ❌ Error 403 al acceder a la URL del logo
- **Causa:** El bucket no es público
- **Solución:** En Supabase Storage, edita el bucket `assets` y marca "Public"

### ❌ El Schema.org no aparece en Rich Results Test
- **Causa:** Error de sintaxis en el JSON-LD
- **Solución:** Verifica el código en `/components/wav/SchemaJSONLD.tsx`

---

## ✅ Checklist Final

- [ ] Logo preparado (512x512px, formato PNG)
- [ ] Bucket `assets` creado en Supabase Storage
- [ ] Bucket configurado como **público**
- [ ] Logo subido como `logo-wav-square.png`
- [ ] URL verificada en el navegador
- [ ] Rich Results Test pasado
- [ ] Favicon visible en el navegador
- [ ] Request indexing enviado en Google Search Console

---

**Última actualización:** 2025-12-09
**Estado:** ⚠️ Esperando subida del logo a Supabase Storage
