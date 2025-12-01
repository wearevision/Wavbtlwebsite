/**
 * Open Graph Proxy for Social Media Crawlers
 * 
 * This Edge Function detects social media crawlers (LinkedIn, Facebook, Twitter, WhatsApp)
 * and serves pre-rendered HTML with the correct Open Graph meta tags for the specific event.
 * 
 * For regular users, it serves the normal React app.
 */

import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'LinkedInBot',
  'Twitterbot',
  'WhatsApp',
  'TelegramBot',
  'Slackbot',
  'discordbot',
  'facebot',
  'ia_archiver',
];

const isCrawler = (userAgent: string): boolean => {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(bot => ua.includes(bot.toLowerCase()));
};

interface WavEvent {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  date: string;
}

const createSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const generateEventHTML = (event: WavEvent, url: string): string => {
  const title = `${event.title} | We Are Vision`;
  const description = event.description || `Activación de marca para ${event.brand} - Marketing Experiencial BTL`;
  const image = event.image;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="We Are Vision (WAV)">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="800">
  <meta property="og:image:alt" content="${event.title} - ${event.brand}">
  <meta property="og:locale" content="es_CL">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  
  <!-- Schema.org for Social -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${event.title}",
    "description": "${description}",
    "image": "${image}",
    "author": {
      "@type": "Organization",
      "name": "We Are Vision (WAV)"
    },
    "publisher": {
      "@type": "Organization",
      "name": "We Are Vision (WAV)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://btl.wearevision.cl/logo.png"
      }
    },
    "datePublished": "${event.date}"
  }
  </script>
  
  <!-- Canonical Link -->
  <link rel="canonical" href="${url}">
  
  <!-- Redirect non-crawlers to React app -->
  <meta http-equiv="refresh" content="0; url=${url}">
  <script>
    // If JavaScript is enabled and not a crawler, redirect immediately
    if (!navigator.userAgent.match(/facebookexternalhit|LinkedInBot|Twitterbot|WhatsApp/i)) {
      window.location.href = '${url}';
    }
  </script>
</head>
<body style="font-family: system-ui; padding: 40px; background: #000; color: #fff;">
  <div style="max-width: 800px; margin: 0 auto;">
    <h1>${event.title}</h1>
    <p><strong>Marca:</strong> ${event.brand}</p>
    <p><strong>Categoría:</strong> ${event.category}</p>
    <p>${description}</p>
    <img src="${image}" alt="${event.title}" style="width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
    <p style="margin-top: 40px; color: #666;">
      <a href="https://btl.wearevision.cl" style="color: #FF00A8;">← Volver a We Are Vision</a>
    </p>
  </div>
  
  <noscript>
    <p>Este sitio requiere JavaScript para funcionar correctamente.</p>
    <p><a href="https://btl.wearevision.cl">Visitar We Are Vision</a></p>
  </noscript>
</body>
</html>`;
};

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const userAgent = req.headers.get('user-agent') || '';
  
  console.log(`[OG Proxy] Request from: ${userAgent}`);
  
  // Check if it's a crawler
  if (!isCrawler(userAgent)) {
    console.log('[OG Proxy] Not a crawler, serving normal app');
    // Not a crawler, redirect to main app
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://btl.wearevision.cl' + url.search,
      }
    });
  }
  
  // It's a crawler, check if there's an event slug
  const eventSlug = url.searchParams.get('evento');
  
  if (!eventSlug) {
    console.log('[OG Proxy] No event slug, serving generic page');
    // No event specified, serve generic page
    return new Response(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="We Are Vision (WAV) | Agencia de Marketing Experiencial & BTL">
  <meta property="og:description" content="WAV BTL es una agencia de marketing experiencial líder en Chile y LATAM. Creamos activaciones de marca, eventos corporativos, instalaciones tecnológicas y experiencias inmersivas.">
  <meta property="og:image" content="https://btl.wearevision.cl/og-cover.jpg">
  <meta property="og:url" content="https://btl.wearevision.cl">
  <meta http-equiv="refresh" content="0; url=https://btl.wearevision.cl">
</head>
<body>
  <h1>We Are Vision (WAV)</h1>
  <p>Redirigiendo...</p>
</body>
</html>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
  
  console.log(`[OG Proxy] Event slug: ${eventSlug}`);
  
  // Fetch events from KV store
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Query KV store
    const { data, error } = await supabase
      .from('kv_store_c4bb2206')
      .select('value')
      .eq('key', 'wav_events')
      .single();
    
    if (error || !data) {
      console.error('[OG Proxy] Error fetching events:', error);
      throw new Error('Events not found');
    }
    
    const events: WavEvent[] = data.value as WavEvent[];
    console.log(`[OG Proxy] Found ${events.length} events`);
    
    // Find event by slug
    const event = events.find(e => {
      const eventSlug = e.slug || createSlug(e.title);
      return eventSlug === url.searchParams.get('evento');
    });
    
    if (!event) {
      console.log(`[OG Proxy] Event not found for slug: ${eventSlug}`);
      return new Response('Event not found', { status: 404 });
    }
    
    console.log(`[OG Proxy] Serving event: ${event.title}`);
    
    // Generate and serve HTML with meta tags
    const fullUrl = `https://btl.wearevision.cl?evento=${eventSlug}`;
    const html = generateEventHTML(event, fullUrl);
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      }
    });
    
  } catch (error) {
    console.error('[OG Proxy] Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});
