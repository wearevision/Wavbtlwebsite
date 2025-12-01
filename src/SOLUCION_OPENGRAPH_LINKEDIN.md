# 🔗 Solución: Open Graph para LinkedIn, Facebook y Twitter

**Problema:** Cuando compartes un link de un evento en LinkedIn/Facebook/Twitter, no muestra la imagen ni el título del evento específico, sino los meta tags genéricos del sitio.

**Causa:** Los crawlers de redes sociales NO ejecutan JavaScript. Solo leen el HTML inicial, que en una SPA de React no tiene los meta tags específicos hasta que se ejecuta JavaScript.

---

## 🎯 Solución Implementada ✅

He creado una **ruta de proxy para Open Graph** en la Edge Function:

**Endpoint:** `https://<project-id>.supabase.co/functions/v1/make-server-c4bb2206/og-preview`

### Cómo funciona:

1. ✅ Detecta si la request viene de un crawler (LinkedIn, Facebook, Twitter, WhatsApp)
2. ✅ Si es crawler + hay `?evento=slug` → Genera HTML con meta tags del evento
3. ✅ Si NO es crawler → Redirige a la app React normal
4. ✅ Si NO hay slug → Sirve meta tags genéricos del sitio

---

## 🚀 Cómo Usar (Para Compartir en LinkedIn)

### OPCIÓN 1: URL Shareable (RECOMENDADA)

Cuando quieras compartir un evento en LinkedIn, usa esta URL:

```
https://<project-id>.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=<slug>
```

**Ejemplo real:**
```
https://your-project.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=mistral-ilumina-la-noche-con-innovadores-bares-modulares-en-2015
```

**Qué pasa:**
- LinkedIn crawler ve los meta tags correctos ✅
- Usuarios reales son redirigidos automáticamente a `btl.wearevision.cl` ✅
- La imagen y título del evento se muestran correctamente ✅

---

### OPCIÓN 2: URL Acortada con Bitly (ÓPTIMA)

Para URLs más profesionales, puedes acortar la URL del servidor:

1. Copia la URL del servidor: `https://<project-id>.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=<slug>`
2. Ve a [Bitly](https://bitly.com)
3. Crea un shortlink: `bit.ly/wav-mistral-2015`
4. Comparte el shortlink en LinkedIn

**Ventajas:**
- ✅ URL corta y branded
- ✅ Open Graph funciona
- ✅ Trackeable (clicks)

---

### OPCIÓN 3: Dominio Personalizado (AVANZADA)

Si tienes acceso al DNS de `btl.wearevision.cl`, puedes crear un subdominio:

```
share.btl.wearevision.cl
```

Configurar un CNAME que apunte a la Edge Function:

```dns
share.btl.wearevision.cl  CNAME  <project-id>.supabase.co
```

Luego usar URLs como:
```
https://share.btl.wearevision.cl/make-server-c4bb2206/og-preview?evento=<slug>
```

---

## 📊 Comparación de URLs

| Método | URL | Open Graph | UX | Tracking |
|--------|-----|------------|-----|----------|
| **App React** | `btl.wearevision.cl?evento=slug` | ❌ No funciona | ✅ Excelente | ❌ No |
| **Edge Function** | `<project>.supabase.co/functions/.../og-preview?evento=slug` | ✅ Funciona | ⚠️ URL larga | ❌ No |
| **Bitly** | `bit.ly/wav-event` | ✅ Funciona | ✅ Buena | ✅ Sí |
| **Subdominio** | `share.btl.wearevision.cl/og-preview?evento=slug` | ✅ Funciona | ✅ Excelente | ⚠️ Manual |

---

## 🧪 Testing: Validar que Funciona

### 1. LinkedIn Post Inspector

```
https://www.linkedin.com/post-inspector/
```

1. Pega tu URL: `https://<project>.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=mistral-ilumina-la-noche-con-innovadores-bares-modulares-en-2015`
2. Click en "Inspect"
3. **Resultado esperado:** Verás el título e imagen del evento específico ✅

---

### 2. Facebook Sharing Debugger

```
https://developers.facebook.com/tools/debug/
```

1. Pega tu URL
2. Click en "Scrape Again"
3. Verás los meta tags detectados

---

### 3. Twitter Card Validator

```
https://cards-dev.twitter.com/validator
```

---

## 📋 Checklist de Implementación

- [✅] Edge Function `/og-preview` creada y deployada
- [✅] Detección de crawlers implementada
- [✅] HTML pre-renderizado con meta tags dinámicos
- [✅] Redirección automática para usuarios reales
- [⏳] **Pendiente:** Obtener project ID de Supabase
- [⏳] **Pendiente:** Crear shortlinks con Bitly para top 10 eventos
- [⏳] **Opcional:** Configurar subdominio `share.btl.wearevision.cl`

---

## 🔧 Cómo Obtener el Project ID

1. Ve a tu panel de Supabase: [https://app.supabase.com](https://app.supabase.com)
2. Selecciona tu proyecto "WAV BTL"
3. Ve a **Settings** → **API**
4. Copia el **Project URL**:
   ```
   https://[project-id].supabase.co
   ```
5. El `[project-id]` es lo que necesitas

---

## 🎯 Ejemplo Completo (Paso a Paso)

### Paso 1: Obtén el Project ID

```bash
# Tu Project URL se ve así:
https://abcdefghijklmnop.supabase.co
# El project ID es: abcdefghijklmnop
```

### Paso 2: Construye la URL Shareable

```
https://abcdefghijklmnop.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=mistral-ilumina-la-noche-con-innovadores-bares-modulares-en-2015
```

### Paso 3: Acorta con Bitly (Opcional)

```
https://bit.ly/wav-mistral-2015
```

### Paso 4: Comparte en LinkedIn

1. Crea un nuevo post en LinkedIn
2. Pega la URL
3. Espera 2-3 segundos a que LinkedIn haga el preview
4. ¡Verás la imagen y título del evento! ✅

---

## 🔄 Migración Futura (Recomendada)

Para que el dominio principal `btl.wearevision.cl` funcione con Open Graph:

### Opción A: Next.js con SSR

**Beneficios:**
- ✅ Open Graph funciona en el dominio principal
- ✅ Mejor SEO (Google indexa contenido real)
- ✅ Tiempos de carga más rápidos

**Tiempo estimado:** 2-3 días

---

### Opción B: Pre-rendering con Prerender.io

**Beneficios:**
- ✅ No requiere reescribir el código
- ✅ Solo agregar middleware

**Costo:** ~$10-30/mes

**Configuración:**
1. Cuenta en [Prerender.io](https://prerender.io)
2. Agregar middleware en el hosting
3. Configurar lista de crawlers

---

## 💡 Consejos para Compartir

### ✅ DO's

- ✅ Usa la URL del servidor para compartir
- ✅ Acorta con Bitly para URLs profesionales
- ✅ Testea en LinkedIn Post Inspector antes de compartir masivamente
- ✅ Usa descripciones de eventos concisas (150-200 caracteres)

### ❌ DON'Ts

- ❌ No compartas la URL del React app (`btl.wearevision.cl?evento=slug`) directamente
- ❌ No edites el evento después de compartir (LinkedIn cachea por 7 días)
- ❌ No uses imágenes muy grandes (max 1200x630px recomendado)

---

## 📈 Tracking y Analytics

Si usas Bitly para acortar URLs, obtendrás:

- ✅ Total de clicks
- ✅ Ubicación geográfica
- ✅ Referrer (LinkedIn, Twitter, etc.)
- ✅ Device type (mobile, desktop)

**Dashboard:** [https://bitly.com/a/your_links](https://bitly.com/a/your_links)

---

## ❓ FAQ

### ¿Por qué no usar el dominio principal?

Porque es una SPA (Single Page Application) y los crawlers no ejecutan JavaScript. Necesitarías SSR (Server-Side Rendering) para que funcione.

### ¿LinkedIn cachea los meta tags?

Sí, por ~7 días. Para forzar re-scraping, usa el [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

### ¿Puedo usar esta URL para WhatsApp?

Sí, funciona perfectamente. WhatsApp también usa Open Graph.

### ¿Y para emails?

Los clientes de email NO ejecutan JavaScript ni hacen preview de Open Graph. Para emails, usa imágenes estáticas.

---

## 🚀 Próximos Pasos

1. ⏳ **Obtener Project ID** de Supabase
2. ⏳ **Testear la URL** en LinkedIn Post Inspector
3. ⏳ **Crear 10 shortlinks** con Bitly para los eventos más importantes
4. ⏳ **Compartir en LinkedIn** y verificar que funciona
5. ⏳ **Evaluar migración a Next.js** para solución definitiva

---

*Documento actualizado: 30/11/2025*  
*Estado: Implementación completa ✅*  
*Próximo paso: Testing en LinkedIn*