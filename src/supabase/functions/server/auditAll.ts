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
    throw new Error("Missing OPENAI_API_KEY");
  }

  const systemPrompt = MEGA_AUDIT_PROMPT;

  const eventContext = `
EVENTO A AUDITAR Y OPTIMIZAR:

DATOS ACTUALES:
${JSON.stringify(event, null, 2)}

INSTRUCCIONES:
1. Analiza el evento actual y detecta qué campos faltan o están débiles
2. INFIERE todos los datos que no estén presentes (ubicación, métricas, tone, audience, etc.)
3. Genera TODOS los campos del modelo completo (title, slug, description, summary, seo_*, keywords, hashtags, tags, instagram_*, linkedin_*, alt_*, kpis, brand, client, year, month, country, city, venue, category, subcategory, people_reached, attendees, days, cities, screens, results_notes, audit_summary)
4. Aplica mejores prácticas de SEO para eventos (basadas en Live Nation, Eventbrite, Insomniac)
5. Optimiza para AI Indexing (Google SGE, ChatGPT, Perplexity)
6. Usa tone of voice: profesional, descriptivo, agradecido, realista
7. NO inventes datos de la nada, pero SÍ infiere basándote en patrones comunes del tipo de evento

RESPONDE SOLO CON UN JSON VÁLIDO que contenga todos los campos optimizados.
`;

  const apiMessages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: eventContext }
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",  // Usamos GPT-4o para mejor razonamiento
      messages: apiMessages,
      response_format: { type: "json_object" },
      temperature: 0.6  // Más creativo pero aún controlado
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenAI Error:", err);
    throw new Error(`OpenAI API Error: ${res.status}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  
  try {
    const optimizedEvent = JSON.parse(content);
    
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
    console.error("Failed to parse AI response:", content);
    throw new Error("Failed to parse AI optimization response");
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

  for (let i = 0; i < events.length; i++) {
    try {
      console.log(`[Audit ${i + 1}/${events.length}] Processing: ${events[i].title || 'Untitled'}`);
      
      const optimized = await auditSingleEvent(events[i]);
      results.optimizedEvents.push(optimized);
      results.processed++;
      
      // Rate limiting: esperar 1 segundo entre requests para no saturar OpenAI API
      if (i < events.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error: any) {
      console.error(`[Audit ${i + 1}/${events.length}] Error:`, error.message);
      results.failed++;
      results.errors.push({
        eventTitle: events[i].title || 'Untitled',
        error: error.message
      });
      // Continuar con el siguiente evento aunque este falle
    }
  }

  return results;
}
