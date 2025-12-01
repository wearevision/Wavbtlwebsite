# 🧪 Instrucciones para Probar el Sistema Open Graph

## ✅ Sistema Implementado y Listo

El sistema Open Graph está **100% funcional**. Aquí te muestro cómo probarlo:

---

## 🎯 Método 1: Tester Integrado (Más Fácil)

He creado un componente de prueba visual que valida todos los endpoints.

### Paso a Paso:

1. **Accede a la URL del tester:**
   ```
   https://tu-dominio.com/?test-og=true
   ```

2. **Verás una interfaz de prueba con:**
   - Configuración del evento de prueba
   - Botón "Ejecutar Pruebas del Sistema"
   - Resultados en tiempo real

3. **Click en "Ejecutar Pruebas"**
   - El sistema validará automáticamente los endpoints
   - Extraerá y mostrará los meta tags OG
   - Mostrará la preview de la imagen
   - Te dará códigos de estado HTTP

4. **Copia las URLs generadas:**
   - Usa los botones de "Copiar" junto a cada URL
   - Pégalas en LinkedIn Post Inspector para validación externa

---

## 🔍 Método 2: LinkedIn Post Inspector (Validación Oficial)

### Paso a Paso:

1. **Ve al Admin Panel:**
   ```
   https://tu-dominio.com?admin=true
   ```
   - Login con tus credenciales
   - Expande cualquier evento

2. **Busca la sección "Compartir Evento":**
   - Aparece automáticamente si el evento tiene slug e imagen
   - Verás dos URLs: "Link Social" y "Link Directo"

3. **Copia el "Link Social":**
   ```
   Ejemplo:
   https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=coca-cola-xtreme-tour-2013-activacion-exitosa-en-chile
   ```

4. **Pega en LinkedIn Post Inspector:**
   - URL: https://www.linkedin.com/post-inspector/
   - Click "Inspect"
   - **Resultado esperado:**
     - ✅ Status: 200 OK
     - ✅ Title: "[Título del Evento] | We Are Vision"
     - ✅ Description: Descripción completa del evento
     - ✅ Image: Foto del evento desde Supabase Storage

---

## 📱 Método 3: Prueba Real en Redes Sociales

### LinkedIn:
1. Copia el "Link Social" desde el Admin Panel
2. Abre LinkedIn y crea un nuevo post
3. Pega la URL en el cuadro de texto
4. **Espera 2-3 segundos** (LinkedIn scrapeará los meta tags)
5. Verás la preview card con imagen y descripción

### WhatsApp:
1. Copia el "Link Social"
2. Envíalo en cualquier chat de WhatsApp
3. El preview aparecerá automáticamente con imagen

### Facebook:
1. Usa el Facebook Sharing Debugger primero:
   - https://developers.facebook.com/tools/debug/
2. Pega la URL y click "Debug"
3. Luego comparte en Facebook

---

## 🐛 Troubleshooting

### Problema: "Error al cargar la imagen en el preview"

**Causa:** La signed URL de Supabase puede haber expirado.

**Solución:**
1. Ve al Admin Panel
2. Edita el evento problemático
3. Click "Save" (esto regenerará las signed URLs con 1 año de validez)
4. Vuelve a probar

---

### Problema: "LinkedIn muestra caché viejo"

**Causa:** LinkedIn cachea las previews por ~7 días.

**Solución:**
1. Ve a LinkedIn Post Inspector
2. Pega la URL
3. Click "Scrape Again" (esto forzará actualización del caché)

---

### Problema: "401 Unauthorized en LinkedIn"

**Causa:** Este error ya fue resuelto. El endpoint ahora **siempre sirve HTML con OG tags**.

**Verificación:**
1. Abre la URL del OG Preview en tu navegador
2. Verifica que el HTML contenga las meta tags:
   ```html
   <meta property="og:title" content="...">
   <meta property="og:image" content="...">
   <meta property="og:description" content="...">
   ```
3. Si ves el HTML correctamente, LinkedIn también lo verá

---

## 📊 Logs del Sistema

### Ver logs del servidor:

1. Ve a **Supabase Dashboard**
2. **Edge Functions** → **server** → **Logs**
3. Filtra por:
   - `[OG Preview]` - Logs del endpoint Open Graph
   - `[Shortlink]` - Logs del sistema de códigos cortos

### Logs útiles:

```bash
[OG Preview] User-Agent: LinkedInBot/1.0
[OG Preview] Serving pre-rendered HTML for: Coca-Cola Xtreme Tour 2013...
[OG Preview] Generated signed URL for image: events/evt-coke-001.jpg
[OG Preview] Signed URL expires in: 365 days
```

---

## ✅ Checklist de Verificación

Antes de compartir un evento en redes sociales:

- [ ] El evento tiene **slug** generado
- [ ] El evento tiene **imagen** (imagePath)
- [ ] La imagen existe en Supabase Storage (bucket: `make-c4bb2206-assets`)
- [ ] El endpoint `/og-preview?evento={slug}` retorna **200 OK**
- [ ] La URL funciona en **LinkedIn Post Inspector**
- [ ] La preview muestra correctamente imagen, título y descripción

---

## 🎉 ¡Todo Listo!

El sistema está **producción-ready**. Cualquier evento que tenga slug e imagen generará automáticamente:

1. ✅ URL compartible con Open Graph
2. ✅ Meta tags optimizados para redes sociales
3. ✅ Preview cards con imagen en LinkedIn/Facebook/WhatsApp
4. ✅ Signed URLs con 1 año de validez
5. ✅ Fallback robusto en el botón de copiar

---

## 🔗 URLs de Referencia

| Herramienta | URL |
|-------------|-----|
| **Tester Integrado** | `?test-og=true` |
| **Admin Panel** | `?admin=true` |
| **LinkedIn Post Inspector** | https://www.linkedin.com/post-inspector/ |
| **Facebook Debugger** | https://developers.facebook.com/tools/debug/ |
| **Documentación Completa** | `/OPEN_GRAPH_SISTEMA_COMPLETO.md` |

---

*Última actualización: Diciembre 1, 2024*  
*Sistema: Open Graph v2.4.0*  
*Estado: ✅ Producción*
