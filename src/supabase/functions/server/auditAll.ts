/**
 * MEGA AUDIT FUNCTION
 * Procesa todos los eventos y los optimiza con SEO + AI Indexing best practices
 */

import { MEGA_AUDIT_PROMPT } from './promptStrategies.ts';

interface WavEvent {
  title: string;
  brand: string;
  description: string;
  [key: string]: any;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

export async function auditSingleEvent(event: WavEvent) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no está configurada. Por favor configura esta variable de entorno en Supabase.");
  }

  const systemPrompt = MEGA_AUDIT_PROMPT;

  const eventContext = `
EVENTO A AUDITAR Y OPTIMIZAR:

DATOS ACTUALES:
${JSON.stringify(event, null, 2)}

CONTEXTO CRÍTICO:
Este evento es parte del portafolio BTL de We Are Vision (Chile) que abarca desde 2007 hasta 2025.
Debes inferir inteligentemente TODOS los datos faltantes basándote en:
- El nombre del evento/marca existente
- El tipo de activación BTL (inferir de la categoría o título)
- Patrones comunes de la industria chilena/latinoamericana
- Si no hay año especificado, usa un año razonable entre 2007-2025

INSTRUCCIONES OBLIGATORIAS:
1. Analiza el evento actual y detecta qué campos faltan o están débiles
2. INFIERE todos los datos que no estén presentes (cliente, subcategory, month, venue, year, país, ciudad, etc.)
3. Genera TODOS los campos del modelo completo:
   - Identificación: brand, client, year, month, country, city, venue, category, subcategory
   - Contenido: title, slug, description, summary, keywords, hashtags, tags
   - SEO: seo_title, seo_description
   - Social Media: instagram_hook, instagram_body, instagram_closing, instagram_hashtags, alt_instagram
   - LinkedIn: linkedin_post, linkedin_article
   - Performance: people_reached, attendees, days, cities, screens, kpis, results_notes
   - Variantes: alt_title_1, alt_title_2, alt_summary_1, alt_summary_2
4. Aplica mejores prácticas de SEO para eventos (basadas en Live Nation, Eventbrite, Insomniac)
5. Optimiza para AI Indexing (Google SGE, ChatGPT, Perplexity)
6. Usa tone of voice: profesional, descriptivo, agradecido, realista
7. NO inventes datos imposibles, pero SÍ infiere basándote en patrones comunes del tipo de evento

ESTRATEGIA DE INFERENCIA INTELIGENTE:
- Activación de marca en mall → 10-15 días, 150K-300K personas alcanzadas
- Lanzamiento corporativo → 1-3 días, 500-2000 asistentes, venue: hotel/teatro
- Evento musical/festival → 1-3 días, 5K-50K asistentes, estadio/recinto grande
- Experiencia de marca → 7-30 días, 50K-500K personas alcanzadas

IMPORTANTE: 
- Si el campo 'year' está vacío, infiere un año entre 2007-2025 basándote en el contexto
- Si el campo 'month' está vacío, infiere un mes apropiado (ej: eventos navideños en Diciembre)
- Si 'venue' está vacío, infiere un recinto específico apropiado para el tipo de evento
- Si 'client' está vacío, usa el mismo valor que 'brand' o infiere el cliente según la marca
- Si 'subcategory' está vacío, infiere el tipo específico de evento BTL
- Los valores numéricos (people_reached, attendees, etc.) deben ser strings
- Los KPIs deben tener formato "Métrica: Valor + contexto"

RESPONDE SOLO CON UN JSON VÁLIDO que contenga todos los campos optimizados.
`;

  const apiMessages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: eventContext }
  ];

  console.log(`[Audit] Starting audit for event: ${event.title || event.id}`);

  let res;
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error(`[Audit] Timeout after 60 seconds for event: ${event.title || event.id}`);
    }, 60000); // 60 second timeout per event

    res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // Usamos gpt-4o-mini para mejor rate limits (200K TPM vs 30K TPM)
        messages: apiMessages,
        response_format: { type: "json_object" },
        temperature: 0.6  // Más creativo pero aún controlado
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
  } catch (fetchError: any) {
    console.error(`[Audit] Network error calling OpenAI for event ${event.title || event.id}:`, fetchError);
    
    if (fetchError.name === 'AbortError') {
      throw new Error(`Timeout: La solicitud a OpenAI tardó más de 60 segundos. El evento "${event.title || event.id}" tiene mucho contenido o OpenAI está lento. Intenta de nuevo.`);
    }
    
    throw new Error(`No se pudo conectar con OpenAI API: ${fetchError.message}. Verifica tu conexión a internet y que la API key esté configurada.`);
  }

  if (!res.ok) {
    let errorMessage = `OpenAI API Error: ${res.status} ${res.statusText}`;
    
    try {
      const errorData = await res.json();
      console.error(`[Audit] OpenAI Error Response:`, errorData);
      
      if (errorData.error?.message) {
        errorMessage = `OpenAI Error: ${errorData.error.message}`;
      }
      
      if (res.status === 401) {
        errorMessage = "OpenAI API key inválida o no configurada. Verifica OPENAI_API_KEY en Supabase.";
      } else if (res.status === 429) {
        errorMessage = "OpenAI Rate Limit: Has excedido el límite de requests. Espera un momento e intenta de nuevo.";
      } else if (res.status === 500) {
        errorMessage = "OpenAI Server Error: El servidor de OpenAI está teniendo problemas. Intenta de nuevo en unos minutos.";
      }
    } catch (e) {
      console.error(`[Audit] Could not parse error response:`, e);
    }
    
    throw new Error(errorMessage);
  }

  const data = await res.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    console.error(`[Audit] Invalid OpenAI response structure:`, data);
    throw new Error("OpenAI retornó una respuesta inválida (sin contenido). Intenta de nuevo.");
  }
  
  const content = data.choices[0].message.content;
  
  try {
    const optimizedEvent = JSON.parse(content);
    
    console.log(`[Audit] Successfully optimized event: ${event.title || event.id}`);
    
    // Merge with original event (keep fields that AI didn't generate)
    return {
      ...event,
      ...optimizedEvent,
      // Keep original images/gallery unless AI provides new ones
      image: optimizedEvent.image || event.image,
      logo: optimizedEvent.logo || event.logo,
      gallery: optimizedEvent.gallery || event.gallery,
    };
  } catch (e) {
    console.error(`[Audit] Failed to parse AI response for event ${event.title || event.id}:`, content);
    throw new Error(`Failed to parse AI optimization response. La IA retornó JSON inválido. Intenta de nuevo.`);
  }
}

export async function auditAllEvents(events: WavEvent[]) {
  const results = {
    total: events.length,
    processed: 0,
    failed: 0,
    optimizedEvents: [] as any[],
    errors: [] as any[]
  };

  console.log(`[Audit All] Starting mega audit for ${events.length} events. Estimated time: ~${Math.ceil(events.length * 1.5)} seconds`);

  for (let i = 0; i < events.length; i++) {
    try {
      const startTime = Date.now();
      console.log(`[Audit ${i + 1}/${events.length}] Processing: ${events[i].title || 'Untitled'}`);
      
      const optimized = await auditSingleEvent(events[i]);
      results.optimizedEvents.push(optimized);
      results.processed++;
      
      const elapsed = Date.now() - startTime;
      console.log(`[Audit ${i + 1}/${events.length}] ✅ Success in ${elapsed}ms. Progress: ${Math.round((i + 1) / events.length * 100)}%`);
      
      // Rate limiting: esperar 200ms entre requests (balance entre velocidad y rate limits)
      if (i < events.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error: any) {
      console.error(`[Audit ${i + 1}/${events.length}] ❌ Error:`, error.message);
      results.failed++;
      results.errors.push({
        eventTitle: events[i].title || 'Untitled',
        error: error.message
      });
      // Continuar con el siguiente evento aunque este falle
      
      // Si hay muchos errores consecutivos, esperar más tiempo
      if (i < events.length - 1 && results.failed > 3) {
        console.log(`[Audit] Multiple errors detected. Waiting 2 seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  console.log(`[Audit All] Complete! Processed: ${results.processed}/${results.total}, Failed: ${results.failed}`);

  return results;
}