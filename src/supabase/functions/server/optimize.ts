/**
 * Optimize All Events — AI-powered content generation for incomplete events
 * 
 * This module provides functions to automatically complete missing fields
 * in events using OpenAI.
 */

import * as kv from './kv_store.tsx';
import { suggestCategoryForEvent, getCategories } from './categories.ts';
import { generateRefinement } from './ai.ts';

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
 * Generate complete content for an event using AI (via generateRefinement in ai.ts)
 * Now supports GPT-4 Vision thanks to the centralized logic in ai.ts
 */
async function generateEventContent(event: any): Promise<any> {
  console.log(`[generateEventContent] Delegating to ai.ts (Vision Enabled) for event: ${event.title}`);
  
  // Create a fake conversation history that triggers the "MEGA AUDIT" mode in ai.ts
  // The keyword "OPTIMIZAR TODO" is crucial here.
  const messages = [
    { 
      role: 'user', 
      content: 'OPTIMIZAR TODO. Analiza visualmente las imágenes (si existen) e infiere todos los datos faltantes. Genera contenido completo y profesional.' 
    }
  ];

  // Call the centralized AI logic which handles Vision, prompts, and formatting
  return await generateRefinement(messages, event.description || '', event);
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

/**
 * Optimize a batch of events (for bulk processing without timeouts)
 */
export async function optimizeBatch(batchSize: number = 5): Promise<{
  processed: number;
  remaining: number;
  totalEvents: number;
  results: OptimizationResult[];
  errors: number;
}> {
  console.log(`[OPTIMIZE-BATCH] Starting batch optimization (size: ${batchSize})...`);
  
  // Get all events
  const events = await kv.get('wav_events') || [];
  const categories = await getCategories() || [];
  
  // Find candidates for optimization
  const candidates: number[] = [];
  
  for (let i = 0; i < events.length; i++) {
    if (needsOptimization(events[i])) {
      candidates.push(i);
    }
  }
  
  const remainingTotal = candidates.length;
  console.log(`[OPTIMIZE-BATCH] Found ${remainingTotal} events needing optimization.`);
  
  if (candidates.length === 0) {
    return {
      processed: 0,
      remaining: 0,
      totalEvents: events.length,
      results: [],
      errors: 0
    };
  }
  
  // Take only the batch size
  const batchIndices = candidates.slice(0, batchSize);
  const results: OptimizationResult[] = [];
  let errors = 0;
  
  // Process in parallel
  await Promise.all(batchIndices.map(async (index) => {
    const event = events[index];
    try {
      console.log(`[OPTIMIZE-BATCH] Generating content for event ${event.id}...`);
      const generatedContent = await generateEventContent(event);
      const fieldsUpdated: string[] = [];
      
      // Update fields
      const updateField = (field: string) => {
        if (!event[field] || event[field] === '' || event[field] === 'Descripción pendiente.' || 
            event[field] === 'Evento Sin Título' || (Array.isArray(event[field]) && event[field].length === 0)) {
          if (generatedContent[field]) {
            event[field] = generatedContent[field];
            fieldsUpdated.push(field);
          }
        }
      };
      
      // List of fields to attempt to update
      const fields = [
        'title', 'description', 'summary', 'highlights', 'keywords', 'hashtags',
        'instagram_hook', 'instagram_body', 'instagram_closing', 'instagram_hashtags',
        'linkedin_post', 'linkedin_article', 'alt_title_1', 'alt_title_2', 'alt_instagram',
        'alt_summary_1', 'alt_summary_2', 'tone', 'audience', 'seo_title', 'seo_description', 'tags',
        'client', 'year', 'month', 'country', 'city', 'venue', 'subcategory',
        'people_reached', 'attendees', 'days', 'cities', 'screens', 'kpis', 'results_notes'
      ];
      
      fields.forEach(f => updateField(f));
      
      // Auto-categorize
      if (!event.category || event.category === '') {
        try {
          const categorySuggestion = await suggestCategoryForEvent(event, categories);
          if (categorySuggestion && categorySuggestion.categoryId) {
            event.category = categorySuggestion.categoryId;
            fieldsUpdated.push('category');
          }
        } catch (e) {
          console.error(`[OPTIMIZE-BATCH] Category error for ${event.id}`, e);
        }
      }
      
      results.push({
        eventId: event.id,
        brand: event.brand,
        title: event.title,
        fieldsUpdated,
        category: event.category
      });
      
    } catch (error) {
      console.error(`[OPTIMIZE-BATCH] Error processing event ${event.id}:`, error);
      errors++;
      results.push({
        eventId: event.id,
        brand: event.brand,
        title: event.title,
        fieldsUpdated: [],
        error: error.message
      });
    }
  }));
  
  // Save updated events
  if (results.length > 0) {
    console.log('[OPTIMIZE-BATCH] Saving updated batch to database...');
    await kv.set('wav_events', events);
  }
  
  return {
    processed: results.length,
    remaining: remainingTotal - results.length,
    totalEvents: events.length,
    results,
    errors
  };
}