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
    // Content fields
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
    !event.linkedin_post || event.linkedin_post === '',
    
    !event.alt_summary_1 || event.alt_summary_1 === '',
    !event.alt_summary_2 || event.alt_summary_2 === '',
    
    // Editorial Content fields
    !event.tone || event.tone === '',
    !event.audience || event.audience === '',
    
    // SEO Extended fields
    !event.seo_title || event.seo_title === '',
    !event.seo_description || event.seo_description === '',
    !event.tags || event.tags.length === 0,

    // Identification & Location fields
    !event.client || event.client.trim() === '',
    !event.year || event.year.trim() === '',
    !event.month || event.month.trim() === '',
    !event.country || event.country.trim() === '',
    !event.city || event.city.trim() === '',
    !event.venue || event.venue.trim() === '',
    !event.subcategory || event.subcategory.trim() === '',
    
    // Performance & Results fields
    !event.people_reached || event.people_reached.toString().trim() === '' || event.people_reached === '50000',
    !event.attendees || event.attendees.toString().trim() === '' || event.attendees === '2500',
    !event.days || event.days.toString().trim() === '' || event.days === '3',
    !event.kpis || event.kpis.length === 0,
    !event.results_notes || event.results_notes.trim() === ''
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
- Año: ${event.year || 'Desconocido'}
- País: ${event.country || 'Desconocido'}
- Ciudad: ${event.city || 'Desconocida'}
- Imagen: ${event.image || 'Sin imagen'}

CONTEXTO CRÍTICO:
Este evento es parte de un portafolio BTL de We Are Vision (Chile) que abarca desde 2007 hasta 2025.
Debes inferir inteligentemente todos los datos faltantes basándote en:
- El nombre del evento/marca
- El tipo de activación BTL
- Patrones comunes de la industria chilena/latinoamericana
- El año aproximado (si no está especificado, usa un año entre 2007-2025)

MISIÓN:
Genera contenido profesional, optimizado y COMPLETO para este evento BTL. El contenido debe ser:
- Concreto y narrativo (sin humo)
- Orientado a negocio y resultados
- Optimizado para SEO y AI indexing
- Profesional y creativo
- En español (Chile/Latinoamérica)

INSTRUCCIONES CRÍTICAS (NO NEGOCIABLES):
1. DEBES generar TODOS los campos sin excepción
2. Si un dato no está presente, DEBES inferirlo de forma inteligente
3. Los campos de IDENTIFICATION & LOCATION son OBLIGATORIOS
4. Los campos de PERFORMANCE & RESULTS son OBLIGATORIOS
5. NO omitas ningún campo del JSON de respuesta
6. Si la descripción actual es genérica, crea una profesional
7. Usa un tono profesional pero accesible
8. NO uses lenguaje promocional excesivo
9. NO inventes datos imposibles, pero SÍ infiere datos razonables
10. NUNCA uses emojis en campos profesionales (solo en Instagram)

ESTRATEGIA DE INFERENCIA:
- Activación de marca en mall → 10-15 días, 150K-300K personas alcanzadas
- Lanzamiento corporativo → 1-3 días, 500-2000 asistentes, venue: hotel/teatro
- Evento musical/festival → 1-3 días, 5K-50K asistentes, estadio/recinto
- Experiencia de marca → 7-30 días, 50K-500K personas alcanzadas

AÑOS DE EVENTOS:
Los eventos de WAV BTL van desde 2007 hasta 2025. Si no hay año especificado, infiere un año razonable.

RESPONDE CON ESTE JSON EXACTO (REEMPLAZA LOS VALORES DE EJEMPLO):

{
  "title": "Coca-Cola | Experiencia Navideña - Santiago 2024",
  "description": "Activación de marca inmersiva para el lanzamiento de la campaña navideña de Coca-Cola en Mall Plaza Vespucio. Realizada en diciembre 2024, la experiencia transformó el mall en un universo festivo con mapping 3D, zona de fotos interactivas y degustación de productos. Alcance: +250K visitantes en 15 días.",
  "summary": "Activación navideña inmersiva de Coca-Cola en Mall Plaza Vespucio con mapping 3D y experiencias interactivas. Alcance: +250K visitantes en 15 días.",
  "highlights": [
    "Mapping 3D inmersivo en fachada principal del mall",
    "Zona de fotos interactivas con elementos navideños branded",
    "Sampling de productos y experiencia de degustación"
  ],
  "keywords": [
    "Coca-Cola Santiago",
    "Activación navideña 2024",
    "Experiencia de marca Chile",
    "BTL marketing Santiago",
    "Evento Coca-Cola Navidad"
  ],
  "hashtags": [
    "#CocaCola",
    "#ActivaciónDeMarca",
    "#MarketingExperiencial"
  ],
  "instagram_hook": "✨ Transformamos Mall Plaza Vespucio en un universo navideño mágico para Coca-Cola",
  "instagram_body": "Durante 15 días, creamos una experiencia inmersiva que conectó con más de 250K visitantes. Mapping 3D, zona selfie branded y momentos únicos que hicieron brillar la Navidad.",
  "instagram_closing": "¿Estuviste ahí? Cuéntanos tu momento favorito 👇",
  "instagram_hashtags": "#CocaCola #NavidadCocaCola #MallPlaza #ExperienciaInmersiva #BTL #MarketingExperiencial",
  "linkedin_post": "Orgullosos de haber ejecutado la activación navideña de Coca-Cola en Mall Plaza Vespucio. Una experiencia inmersiva que alcanzó +250K visitantes en 15 días, combinando tecnología de mapping 3D con activaciones interactivas que generaron conexiones emocionales reales con la marca.",
  "linkedin_article": "La temporada navideña presenta desafíos únicos para las marcas: captar atención en un entorno saturado mientras se genera conexión emocional genuina. Para Coca-Cola, diseñamos una activación que transformó Mall Plaza Vespucio en un universo festivo durante 15 días de diciembre 2024. La estrategia combinó mapping 3D en la fachada principal, una zona de fotos interactivas con elementos navideños branded, y sampling de productos. El resultado: +250K visitantes impactados, alto engagement en redes sociales, y una experiencia que quedó en la memoria de miles de familias chilenas.",
  "alt_title_1": "Experiencia Navideña Coca-Cola - Mall Plaza Vespucio 2024",
  "alt_title_2": "Coca-Cola Navidad 2024 | Activación Inmersiva Santiago",
  "alt_instagram": "🎄 15 días de magia navideña con Coca-Cola en Mall Plaza Vespucio. +250K visitantes vivieron una experiencia única con mapping 3D, zona selfie y momentos inolvidables. Un regalo para Santiago entero.",
  "alt_summary_1": "Activación BTL inmersiva de Coca-Cola en Santiago. Mapping 3D y experiencias interactivas para conectar con 250K personas.",
  "alt_summary_2": "Descubre cómo Coca-Cola transformó la Navidad en Mall Plaza Vespucio con una experiencia de marca inolvidable.",
  "tone": "Festivo, Mágico, Innovador, Cercano",
  "audience": "Familias, Jóvenes adultos (18-35), Visitantes de Mall Plaza",
  "seo_title": "Coca-Cola Navidad 2024 | Activación BTL Inmersiva Santiago",
  "seo_description": "Activación de marca Coca-Cola en Mall Plaza Vespucio. Experiencia inmersiva con mapping 3D y sampling. Diciembre 2024.",
  "tags": ["Navidad", "Mapping 3D", "Mall Plaza", "BTL", "Sampling"],
  "brand": "Coca-Cola",
  "client": "Coca-Cola Chile",
  "year": "2024",
  "month": "Diciembre",
  "country": "Chile",
  "city": "Santiago",
  "venue": "Mall Plaza Vespucio",
  "subcategory": "Experiencia Inmersiva",
  "people_reached": "250000",
  "attendees": "250000",
  "days": "15",
  "cities": "1",
  "screens": "4",
  "kpis": [
    "Alcance: +250K visitantes únicos en 15 días",
    "Engagement: 8.5% en contenido orgánico",
    "UGC: 1,200 menciones espontáneas en redes sociales",
    "Tiempo promedio de interacción: 12 minutos"
  ],
  "results_notes": "Activación exitosa que superó expectativas de tráfico. Alta participación en zonas interactivas y excelente recepción del público familiar. Generó contenido orgánico valioso para la marca."
}

IMPORTANTE FINAL:
- TODOS los campos son OBLIGATORIOS, no omitas ninguno
- Los valores numéricos (people_reached, attendees, etc.) deben ser strings con números
- El venue debe ser específico (no genérico como "un mall")
- El client puede ser igual a brand si no hay distinción
- La subcategory debe ser específica (no solo "Activación")
- Los KPIs deben tener formato descriptivo con números
- El results_notes debe ser un párrafo breve pero sustancioso

Responde SOLO con el objeto JSON válido. No incluyas markdown, comentarios ni texto adicional.`;

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
 * Optimize a single event by ID
 */
export async function optimizeEventById(eventId: string): Promise<{
  success: boolean;
  event?: any;
  error?: string;
  fieldsUpdated?: string[];
}> {
  console.log(`[OPTIMIZE-SINGLE] optimizing event ${eventId}...`);

  // Get all events
  const events = await kv.get('wav_events') || [];
  const eventIndex = events.findIndex((e: any) => e.id === eventId);

  if (eventIndex === -1) {
    return { success: false, error: "Event not found" };
  }

  const event = events[eventIndex];
  const categories = await getCategories() || [];

  try {
    const fieldsUpdated: string[] = [];
    const generatedContent = await generateEventContent(event);

    // Update logic (similar to optimizeAllEvents but applying changes)
    // We apply changes regardless of whether they were empty, effectively "Improving" content if AI provides it
    // But wait, generateEventContent prompt relies on current content.
    
    // Let's update specific fields if they are present in generated content
    const fieldsToUpdate = [
      'title', 'description', 'summary', 'highlights', 'keywords', 'hashtags',
      'instagram_hook', 'instagram_body', 'instagram_closing', 'instagram_hashtags',
      'linkedin_post', 'linkedin_article', 'alt_title_1', 'alt_title_2', 'alt_instagram',
      'alt_summary_1', 'alt_summary_2', 'tone', 'audience', 'seo_title', 'seo_description', 'tags',
      'client', 'year', 'month', 'country', 'city', 'venue', 'subcategory',
      'people_reached', 'attendees', 'days', 'cities', 'screens', 'kpis', 'results_notes'
    ];

    fieldsToUpdate.forEach(field => {
       if (generatedContent[field] !== undefined && generatedContent[field] !== null && generatedContent[field] !== "") {
          // Only update if new content is different (simple check) or just overwrite
          if (JSON.stringify(event[field]) !== JSON.stringify(generatedContent[field])) {
             event[field] = generatedContent[field];
             fieldsUpdated.push(field);
          }
       }
    });

    // Auto-categorize
    if (!event.category || event.category === '') {
        const categorySuggestion = await suggestCategoryForEvent(event, categories);
        if (categorySuggestion && categorySuggestion.categoryId) {
            event.category = categorySuggestion.categoryId;
            fieldsUpdated.push('category');
        }
    }

    // Save back to KV
    events[eventIndex] = event;
    await kv.set('wav_events', events);

    return { success: true, event, fieldsUpdated };

  } catch (error) {
    console.error(`[OPTIMIZE-SINGLE] Error:`, error);
    return { success: false, error: error.message };
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
      
      if (!event.alt_summary_1) {
        event.alt_summary_1 = generatedContent.alt_summary_1;
        fieldsUpdated.push('alt_summary_1');
      }
      
      if (!event.alt_summary_2) {
        event.alt_summary_2 = generatedContent.alt_summary_2;
        fieldsUpdated.push('alt_summary_2');
      }
      
      // NEW: Update editorial fields
      if (!event.tone || event.tone === '') {
        event.tone = generatedContent.tone;
        fieldsUpdated.push('tone');
      }
      
      if (!event.audience || event.audience === '') {
        event.audience = generatedContent.audience;
        fieldsUpdated.push('audience');
      }
      
      // NEW: Update SEO extended fields
      if (!event.seo_title || event.seo_title === '') {
        event.seo_title = generatedContent.seo_title;
        fieldsUpdated.push('seo_title');
      }
      
      if (!event.seo_description || event.seo_description === '') {
        event.seo_description = generatedContent.seo_description;
        fieldsUpdated.push('seo_description');
      }
      
      if (!event.tags || event.tags.length === 0) {
        event.tags = generatedContent.tags;
        fieldsUpdated.push('tags');
      }
      
      // NEW: Update identification & location fields
      if (!event.client || event.client.trim() === '') {
        event.client = generatedContent.client;
        fieldsUpdated.push('client');
      }
      
      if (!event.year || event.year.trim() === '') {
        event.year = generatedContent.year;
        fieldsUpdated.push('year');
      }
      
      if (!event.month || event.month.trim() === '') {
        event.month = generatedContent.month;
        fieldsUpdated.push('month');
      }
      
      if (!event.country || event.country.trim() === '') {
        event.country = generatedContent.country;
        fieldsUpdated.push('country');
      }
      
      if (!event.city || event.city.trim() === '') {
        event.city = generatedContent.city;
        fieldsUpdated.push('city');
      }
      
      if (!event.venue || event.venue.trim() === '') {
        event.venue = generatedContent.venue;
        fieldsUpdated.push('venue');
      }
      
      if (!event.subcategory || event.subcategory.trim() === '') {
        event.subcategory = generatedContent.subcategory;
        fieldsUpdated.push('subcategory');
      }
      
      // NEW: Update performance & results fields
      if (!event.people_reached || event.people_reached.toString().trim() === '' || event.people_reached === '50000') {
        event.people_reached = generatedContent.people_reached;
        fieldsUpdated.push('people_reached');
      }
      
      if (!event.attendees || event.attendees.toString().trim() === '' || event.attendees === '2500') {
        event.attendees = generatedContent.attendees;
        fieldsUpdated.push('attendees');
      }
      
      if (!event.days || event.days.toString().trim() === '' || event.days === '3') {
        event.days = generatedContent.days;
        fieldsUpdated.push('days');
      }
      
      if (!event.cities || event.cities.toString().trim() === '' || event.cities === '5') {
        event.cities = generatedContent.cities;
        fieldsUpdated.push('cities');
      }
      
      if (!event.screens || event.screens.toString().trim() === '' || event.screens === '12') {
        event.screens = generatedContent.screens;
        fieldsUpdated.push('screens');
      }
      
      if (!event.kpis || event.kpis.length === 0) {
        event.kpis = generatedContent.kpis;
        fieldsUpdated.push('kpis');
      }
      
      if (!event.results_notes || event.results_notes.trim() === '') {
        event.results_notes = generatedContent.results_notes;
        fieldsUpdated.push('results_notes');
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