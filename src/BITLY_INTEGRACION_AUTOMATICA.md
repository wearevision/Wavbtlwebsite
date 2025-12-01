# 🔗 Integración Bitly Automatizada — Guía de Implementación

## 🎯 Objetivo

Automatizar la creación de shortlinks con Bitly cuando se guarda un evento en el Admin Panel, sin necesidad de acortarlos manualmente.

---

## 📊 Comparación de Soluciones

| Solución | Pro | Contra | Costo |
|----------|-----|--------|-------|
| **Sistema actual (Supabase shortlinks)** | ✅ Gratis, integrado | ❌ URLs largas (`/make-server-c4bb2206/s/abc`) | Gratis |
| **Bitly API** | ✅ URLs branded (`bit.ly/wav-skyy2014`) ✅ Analytics | ⚠️ Requiere API key | $0-35/mes |
| **Subdominio custom** | ✅ URLs propias (`share.wearevision.cl/skyy2014`) | ❌ Requiere DNS config | Gratis |

---

## 🚀 Opción 1: Bitly API (Recomendada)

### **Paso 1: Obtener API Key de Bitly**

1. Ve a: https://app.bitly.com/
2. Crea una cuenta (plan gratuito = 50 links/mes)
3. Ve a **Settings** → **Developer Settings**
4. Genera un **Generic Access Token**
5. Copia el token: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

### **Paso 2: Configurar Variable de Entorno en Supabase**

1. Ve a Supabase Dashboard
2. **Settings** → **Edge Functions** → **Environment Variables**
3. Agrega:
   ```
   BITLY_ACCESS_TOKEN=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

---

### **Paso 3: Crear Función de Acortamiento**

**Archivo:** `/supabase/functions/server/bitly.ts`

```typescript
/**
 * Bitly API Integration
 * 
 * Creates short links using Bitly API for professional, trackable URLs.
 */

const BITLY_API = 'https://api-ssl.bitly.com/v4/shorten';
const BITLY_TOKEN = Deno.env.get('BITLY_ACCESS_TOKEN');

export interface BitlyResponse {
  link: string;  // Shortened URL (e.g., "https://bit.ly/abc123")
  id: string;    // Bitly ID
}

/**
 * Create a Bitly short link
 * 
 * @param longUrl - The full OG preview URL
 * @param customSlug - Optional custom back-half (e.g., "wav-skyy2014")
 * @returns Bitly short URL or null if failed
 */
export async function createBitlyShortlink(
  longUrl: string,
  customSlug?: string
): Promise<BitlyResponse | null> {
  if (!BITLY_TOKEN) {
    console.error('[Bitly] No API token configured');
    return null;
  }

  try {
    const response = await fetch(BITLY_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BITLY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: longUrl,
        domain: 'bit.ly',  // Use "bit.ly" or your custom domain
        ...(customSlug && { custom_bitlinks: [customSlug] }),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Bitly] API Error: ${error}`);
      return null;
    }

    const data = await response.json();
    console.log(`[Bitly] Created shortlink: ${data.link}`);
    
    return {
      link: data.link,
      id: data.id,
    };
  } catch (error) {
    console.error('[Bitly] Failed to create shortlink:', error);
    return null;
  }
}

/**
 * Generate a custom slug for Bitly from event data
 * 
 * @param brand - Event brand (e.g., "Skyy Vodka")
 * @param year - Event year (e.g., "2014")
 * @returns Custom slug (e.g., "wav-skyy-2014")
 */
export function generateBitlySlug(brand: string, year?: string): string {
  const cleanBrand = brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 15);  // Max 15 chars for brand
  
  const prefix = 'wav';
  const yearSuffix = year ? `-${year}` : '';
  
  return `${prefix}-${cleanBrand}${yearSuffix}`;
}
```

---

### **Paso 4: Modificar Endpoint de Guardado**

**Archivo:** `/supabase/functions/server/index.tsx`

Agregar import:
```typescript
import { createBitlyShortlink, generateBitlySlug } from './bitly.ts';
```

En el endpoint `POST /events`, después de guardar el evento:

```typescript
app.post(`${BASE_PATH}/events`, async (c) => {
  // ... (código existente de guardado) ...
  
  // Auto-generate Bitly shortlinks for new events
  if (events && events.length > 0) {
    for (const event of events) {
      const slug = event.slug || slugify(event.title);
      const ogUrl = `${supabaseUrl}/functions/v1${BASE_PATH}/og-preview?evento=${slug}`;
      
      // Try to extract year from event data
      const year = event.title.match(/\\d{4}/)?.[0];
      
      // Generate custom Bitly slug
      const customSlug = generateBitlySlug(event.brand, year);
      
      // Create Bitly shortlink
      const bitlyResult = await createBitlyShortlink(ogUrl, customSlug);
      
      if (bitlyResult) {
        // Store Bitly link in event metadata
        event.bitlyUrl = bitlyResult.link;
        event.bitlyId = bitlyResult.id;
        
        console.log(`[Bitly] Created for ${event.id}: ${bitlyResult.link}`);
      }
    }
    
    // Save updated events with Bitly URLs
    await kv.set('wav_events', events);
  }
  
  return c.json({ success: true, events });
});
```

---

### **Paso 5: Actualizar Frontend para Mostrar Bitly**

**Archivo:** `/components/wav/ShareLinkButton.tsx`

```typescript
interface ShareLinkButtonProps {
  eventSlug: string;
  eventTitle: string;
  bitlyUrl?: string;  // NEW: Optional Bitly URL
  variant?: 'inline' | 'card';
}

export const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ 
  eventSlug, 
  eventTitle,
  bitlyUrl,  // NEW
  variant = 'inline'
}) => {
  // ... existing code ...
  
  // If Bitly URL exists, show it instead
  const shareUrl = bitlyUrl || ogUrl;
  
  // ... rest of component with shareUrl ...
}
```

---

### **Paso 6: Testear**

1. Guarda un evento nuevo en el Admin Panel
2. Click "Save"
3. Verifica que aparezca el Bitly shortlink
4. Copia el link: `https://bit.ly/wav-skyy-2014`
5. Pega en LinkedIn

✅ **Resultado:** LinkedIn muestra el OG con imagen/título/descripción

---

## 🎯 Beneficios de Bitly

### **1. URLs Branded y Cortas**

❌ **Antes:**
```
https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=skyy-vodka-electriza-bolivia-exito-en-patrocinio-de-evento-2014
```

✅ **Con Bitly:**
```
https://bit.ly/wav-skyy-2014
```

---

### **2. Analytics Integrado**

Dashboard de Bitly muestra:
- 📊 Total de clicks
- 🌍 Ubicación geográfica
- 📱 Device type (mobile/desktop)
- 🔗 Referrer (LinkedIn, Twitter, WhatsApp)
- 📅 Clicks por día/semana/mes

---

### **3. Editable Después de Compartir**

Si cambias la URL destino en Bitly, **todos los links compartidos se actualizan automáticamente**.

---

## 💰 Pricing de Bitly

| Plan | Links/mes | Tracking | Custom Domain | Precio |
|------|-----------|----------|---------------|--------|
| **Free** | 50 | ✅ Básico | ❌ No | Gratis |
| **Starter** | 1,500 | ✅ Avanzado | ✅ Sí | $35/mes |
| **Basic** | 1,500 | ✅ Avanzado | ✅ Sí | $29/mes (anual) |

**Recomendación:** Empezar con Free (50 links = 50 eventos/mes)

---

## 🔧 Opción 2: Custom Shortlinks con Subdominio Propio

Si prefieres URLs como `share.wearevision.cl/skyy2014`:

### **Paso 1: Configurar DNS**

En tu proveedor de DNS (GoDaddy, Cloudflare, etc.):

```
Type: CNAME
Name: share
Value: ykkmplrnqcwpgfdjshxn.supabase.co
```

---

### **Paso 2: Configurar Custom Domain en Supabase**

1. Ve a Supabase Dashboard
2. **Settings** → **API** → **Custom Domains**
3. Agrega: `share.wearevision.cl`
4. Verifica ownership (DNS TXT record)

---

### **Paso 3: Usar Nuevo Dominio**

Actualiza URLs en el sistema:

```typescript
// Antes:
const shortUrl = `${supabaseUrl}/functions/v1${BASE_PATH}/s/${code}`;

// Después:
const shortUrl = `https://share.wearevision.cl/${code}`;
```

✅ **URLs resultantes:**
```
https://share.wearevision.cl/skyy2014
https://share.wearevision.cl/cencosud2015
```

---

## 📊 Comparación Final

| Feature | Sistema Actual | Bitly | Custom Domain |
|---------|----------------|-------|---------------|
| **URL Length** | Muy larga | Corta | Corta |
| **Analytics** | ❌ No | ✅ Sí | ❌ No (sin extra tool) |
| **Setup Time** | ✅ 0 min | ⚠️ 10 min | ⚠️ 30 min |
| **Costo** | ✅ Gratis | ⚠️ $0-35/mes | ✅ Gratis |
| **Branding** | ❌ Supabase | ⚠️ bit.ly | ✅ wearevision.cl |
| **Editable** | ❌ No | ✅ Sí | ❌ No |

---

## 🎯 Recomendación Final

### **Para Empezar (Ahora):**

✅ **Usa el sistema actual** (Supabase `/s/:code`)  
✅ **Funciona perfectamente** para Open Graph  
✅ **Gratis y sin configuración**

### **Para Mejorar (En 1-2 semanas):**

✅ **Integra Bitly** (plan gratuito)  
✅ **Auto-genera shortlinks** al guardar eventos  
✅ **Trackea analytics** de clicks

### **Para Profesionalizar (En 1-2 meses):**

✅ **Configura custom domain** (`share.wearevision.cl`)  
✅ **URLs 100% branded**  
✅ **Máxima confianza del usuario**

---

## ✅ Checklist de Implementación Bitly

- [ ] Crear cuenta en Bitly
- [ ] Generar API Access Token
- [ ] Agregar `BITLY_ACCESS_TOKEN` en Supabase env vars
- [ ] Crear archivo `/supabase/functions/server/bitly.ts`
- [ ] Modificar endpoint `POST /events` para auto-generar Bitly
- [ ] Actualizar `ShareLinkButton` para mostrar Bitly URL
- [ ] Testear guardando un evento nuevo
- [ ] Verificar que LinkedIn muestre OG correctamente
- [ ] Monitorear analytics en Bitly Dashboard

---

*Documento: BITLY_INTEGRACION_AUTOMATICA.md*  
*Versión: 1.0*  
*Fecha: 30/11/2024*
