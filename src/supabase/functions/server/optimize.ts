/**
 * Optimize All Events — AI-powered content generation for incomplete events
 * 
 * This module provides functions to automatically complete missing fields
 * in events using OpenAI.
 */

import OpenAI from 'npm:openai';
import * as kv from './kv_store.tsx';
import { suggestCategoryForEvent, getCategories } from './categories.ts';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

interface OptimizationResult {
  eventId: string;
  brand: string;
  title: string;
  fieldsUpdated: string[];
  category?: string;
  error?: string;
}

/**
 * Checks if an event needs optimization
 * Returns true if ANY field is missing or has generic content
 */
function needsOptimization(event: any): boolean {
  const checks = [
    !event.description || event.description === 'Descripción pendiente.' || event.description.trim() === '',
    !event.brand || event.brand === 'Marca',
    !event.title || event.title === 'Evento Sin Título' || event.title.trim() === '',
    !event.category || event.category === '',
    !event.summary || event.summary === '',
    !event.highlights || event.highlights.length === 0,
    !event.keywords || event.keywords.length === 0,
    !event.hashtags || event.hashtags.length === 0,
    !event.instagram_hook || event.instagram_hook === '',
    !event.instagram_body || event.instagram_body === '',
    !event.linkedin_post || event.linkedin_post === ''
  ];
  
  // Returns true if at least one check is true (meaning at least one field needs optimization)
  return checks.some(check => check);
}

/**
 * Generate complete content for an event using AI
 */
async function generateEventContent(event: any): Promise<any> {
  const prompt = `Eres el Asistente de Optimización de Contenido del CMS WAV BTL para https://btl.wearevision.cl

EVENTO A OPTIMIZAR:
- ID: ${event.id}
- Marca: ${event.brand || 'Desconocida'}
- Título: ${event.title || 'Sin título'}
- Descripción actual: ${event.description || 'Sin descripción'}
- Imagen: ${event.image || 'Sin imagen'}

MISIÓN:
Genera contenido profesional, optimizado y completo para este evento BTL. El contenido debe ser:
- Concreto y narrativo (sin humo)
- Orientado a negocio y resultados
- Optimizado para SEO y AI indexing
- Profesional y creativo
- En español (Chile/Latinoamérica)

INSTRUCCIONES CRÍTICAS:
1. Si la descripción actual es genérica o vacía, crea una descripción profesional basándote en la marca y el título
2. Si la marca es genérica ("Marca"), mantenla pero genera contenido igualmente
3. Optimiza el título si es genérico o poco descriptivo
4. Genera TODOS los campos solicitados
5. Usa un tono profesional pero accesible
6. NO uses lenguaje promocional excesivo
7. NO inventes datos específicos (fechas, lugares, números) que no puedas inferir
8. NUNCA uses emojis

FORMATO JSON REQUERIDO:
{
  "title": "Título optimizado del evento (60 chars max)",
  "description": "Descripción narrativa profesional del evento (500-800 caracteres)",
  "summary": "Meta description para SEO (150-160 caracteres)",
  "highlights": ["Punto clave 1", "Punto clave 2", "Punto clave 3"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "instagram_hook": "Hook atractivo para Instagram (1-2 líneas)",
  "instagram_body": "Cuerpo del post de Instagram (narrativo, 3-4 líneas)",
  "instagram_closing": "Call to action o cierre (1 línea)",
  "instagram_hashtags": "#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5",
  "linkedin_post": "Post corto para LinkedIn (formato profesional, 2-3 párrafos)",
  "linkedin_article": "Artículo largo para LinkedIn (formato narrativo, 4-5 párrafos con storytelling)",
  "alt_title_1": "Variante de título alternativa 1",
  "alt_title_2": "Variante de título alternativa 2",
  "alt_instagram": "Variante alternativa de copy Instagram"
}

Responde SOLO con el objeto JSON. No incluyas markdown ni texto adicional.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error(`Error generating content for event ${event.id}:`, error);
    throw error;
  }
}

/**
 * Optimize all events in the database
 */
export async function optimizeAllEvents(): Promise<{
  total: number;
  optimized: number;
  skipped: number;
  errors: number;
  results: OptimizationResult[];
}> {
  console.log('[OPTIMIZE] Starting optimization of all events...');
  
  // Get all events
  const events = await kv.get('wav_events') || [];
  console.log(`[OPTIMIZE] Found ${events.length} events`);
  
  // Get categories for auto-categorization (initialize if empty)
  const categories = await getCategories() || [];
  console.log(`[OPTIMIZE] Found ${categories.length} categories`);
  
  const results: OptimizationResult[] = [];
  let optimized = 0;
  let skipped = 0;
  let errors = 0;
  
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    console.log(`[OPTIMIZE] Processing event ${i + 1}/${events.length}: ${event.id} - ${event.title}`);
    
    // Check if event needs optimization
    if (!needsOptimization(event)) {
      console.log(`[OPTIMIZE] Event ${event.id} already complete. Skipping.`);
      skipped++;
      results.push({
        eventId: event.id,
        brand: event.brand,
        title: event.title,
        fieldsUpdated: [],
      });
      continue;
    }
    
    try {
      const fieldsUpdated: string[] = [];
      
      // Generate content with AI
      console.log(`[OPTIMIZE] Generating content for event ${event.id}...`);
      const generatedContent = await generateEventContent(event);
      
      // Update fields only if they're missing or generic
      if (!event.title || event.title === 'Evento Sin Título') {
        event.title = generatedContent.title;
        fieldsUpdated.push('title');
      }
      
      if (!event.description || event.description === 'Descripción pendiente.') {
        event.description = generatedContent.description;
        fieldsUpdated.push('description');
      }
      
      if (!event.summary) {
        event.summary = generatedContent.summary;
        fieldsUpdated.push('summary');
      }
      
      if (!event.highlights || event.highlights.length === 0) {
        event.highlights = generatedContent.highlights;
        fieldsUpdated.push('highlights');
      }
      
      if (!event.keywords || event.keywords.length === 0) {
        event.keywords = generatedContent.keywords;
        fieldsUpdated.push('keywords');
      }
      
      if (!event.hashtags || event.hashtags.length === 0) {
        event.hashtags = generatedContent.hashtags;
        fieldsUpdated.push('hashtags');
      }
      
      if (!event.instagram_hook) {
        event.instagram_hook = generatedContent.instagram_hook;
        fieldsUpdated.push('instagram_hook');
      }
      
      if (!event.instagram_body) {
        event.instagram_body = generatedContent.instagram_body;
        fieldsUpdated.push('instagram_body');
      }
      
      if (!event.instagram_closing) {
        event.instagram_closing = generatedContent.instagram_closing;
        fieldsUpdated.push('instagram_closing');
      }
      
      if (!event.instagram_hashtags) {
        event.instagram_hashtags = generatedContent.instagram_hashtags;
        fieldsUpdated.push('instagram_hashtags');
      }
      
      if (!event.linkedin_post) {
        event.linkedin_post = generatedContent.linkedin_post;
        fieldsUpdated.push('linkedin_post');
      }
      
      if (!event.linkedin_article) {
        event.linkedin_article = generatedContent.linkedin_article;
        fieldsUpdated.push('linkedin_article');
      }
      
      if (!event.alt_title_1) {
        event.alt_title_1 = generatedContent.alt_title_1;
        fieldsUpdated.push('alt_title_1');
      }
      
      if (!event.alt_title_2) {
        event.alt_title_2 = generatedContent.alt_title_2;
        fieldsUpdated.push('alt_title_2');
      }
      
      if (!event.alt_instagram) {
        event.alt_instagram = generatedContent.alt_instagram;
        fieldsUpdated.push('alt_instagram');
      }
      
      // Auto-categorize if no category
      if (!event.category || event.category === '') {
        console.log(`[OPTIMIZE] Auto-categorizing event ${event.id}...`);
        try {
          const categorySuggestion = await suggestCategoryForEvent(event, categories);
          if (categorySuggestion && categorySuggestion.categoryId) {
            event.category = categorySuggestion.categoryId;
            fieldsUpdated.push('category');
            console.log(`[OPTIMIZE] Assigned category: ${categorySuggestion.label} (confidence: ${categorySuggestion.confidence}%)`);
          } else {
            console.log(`[OPTIMIZE] No category suggestion returned for event ${event.id}`);
          }
        } catch (catError) {
          console.error(`[OPTIMIZE] Category suggestion failed for event ${event.id}:`, catError);
          // Continue without categorization
        }
      }
      
      optimized++;
      results.push({
        eventId: event.id,
        brand: event.brand,
        title: event.title,
        fieldsUpdated,
        category: event.category
      });
      
      console.log(`[OPTIMIZE] Event ${event.id} optimized. Updated fields: ${fieldsUpdated.join(', ')}`);
      
      // Small delay to avoid rate limiting (200ms between requests)
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`[OPTIMIZE] Error processing event ${event.id}:`, error);
      errors++;
      results.push({
        eventId: event.id,
        brand: event.brand,
        title: event.title,
        fieldsUpdated: [],
        error: error.message
      });
    }
  }
  
  // Save updated events
  console.log('[OPTIMIZE] Saving optimized events to database...');
  await kv.set('wav_events', events);
  
  console.log(`[OPTIMIZE] Optimization complete. Total: ${events.length}, Optimized: ${optimized}, Skipped: ${skipped}, Errors: ${errors}`);
  
  return {
    total: events.length,
    optimized,
    skipped,
    errors,
    results
  };
}
