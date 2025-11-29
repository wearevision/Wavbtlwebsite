/**
 * Categories API — CRUD and AI features for dynamic categories
 * 
 * Endpoints:
 * - GET/POST /categories - List and update categories
 * - POST /categories/analyze - AI analysis of category SEO potential
 * - POST /categories/suggest - AI suggestion for event categorization
 * - POST /categories/optimize-seo - AI optimization of SEO descriptions
 */

import OpenAI from 'npm:openai';
import * as kv from './kv_store.tsx';
import { SEED_CATEGORIES } from './contentRules.ts';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const KV_KEY_CATEGORIES = 'wav_categories';
const KV_KEY_CATEGORY_SNAPSHOTS = 'wav_category_snapshots';

/**
 * Get all categories (active + archived)
 */
export async function getCategories(includeArchived: boolean = false) {
  const categories = await kv.get(KV_KEY_CATEGORIES) || [];
  
  if (includeArchived) {
    return categories;
  }
  
  return categories.filter((cat: any) => !cat.isArchived);
}

/**
 * Save categories to KV store
 */
export async function saveCategories(categories: any[]) {
  // Add eventCount to each category dynamically
  const events = await kv.get('wav_events') || [];
  
  const categoriesWithCount = categories.map(cat => {
    const count = events.filter((e: any) => e.category === cat.id).length;
    return {
      ...cat,
      eventCount: count
    };
  });
  
  await kv.set(KV_KEY_CATEGORIES, categoriesWithCount);
  return categoriesWithCount;
}

/**
 * Initialize categories with SEED if empty
 */
export async function initializeCategoriesIfEmpty() {
  const existing = await kv.get(KV_KEY_CATEGORIES);
  
  if (!existing || existing.length === 0) {
    console.log('[Categories] No categories found. Initializing with SEED...');
    await saveCategories(SEED_CATEGORIES);
    return SEED_CATEGORIES;
  }
  
  return existing;
}

/**
 * Create snapshot for rollback
 */
export async function createSnapshot(description: string = 'Auto snapshot') {
  const categories = await getCategories(true);
  const events = await kv.get('wav_events') || [];
  
  const snapshot = {
    timestamp: new Date().toISOString(),
    categories: categories,
    eventCount: events.length,
    description
  };
  
  // Keep last 10 snapshots
  const snapshots = await kv.get(KV_KEY_CATEGORY_SNAPSHOTS) || [];
  snapshots.unshift(snapshot);
  
  if (snapshots.length > 10) {
    snapshots.splice(10);
  }
  
  await kv.set(KV_KEY_CATEGORY_SNAPSHOTS, snapshots);
  
  return snapshot;
}

/**
 * Restore from snapshot
 */
export async function restoreSnapshot(timestamp: string) {
  const snapshots = await kv.get(KV_KEY_CATEGORY_SNAPSHOTS) || [];
  const snapshot = snapshots.find((s: any) => s.timestamp === timestamp);
  
  if (!snapshot) {
    throw new Error('Snapshot not found');
  }
  
  await saveCategories(snapshot.categories);
  return snapshot.categories;
}

/**
 * AI: Analyze categories for SEO potential
 */
export async function analyzeCategoriesWithAI(categories: any[]) {
  const prompt = `Eres un experto en SEO y marketing BTL en Chile y Latinoamérica.

Analiza estas categorías de eventos y rankéalas por potencial de búsqueda SEO y AI indexing:

${categories.map((cat, i) => `${i + 1}. ${cat.label}
   Description: ${cat.description}
   Keywords: ${cat.keywords.join(', ')}`).join('\n\n')}

Para cada categoría, evalúa:
1. Search volume potential (1-10)
2. AI indexing clarity (1-10)
3. Competition level (Low/Medium/High)
4. Recommendation (Keep Core / Keep Optional / Consider Merging / Remove)

Responde en JSON:
{
  "analysis": [
    {
      "categoryId": "string",
      "label": "string",
      "searchVolume": number,
      "aiIndexing": number,
      "competition": "Low" | "Medium" | "High",
      "recommendation": "Keep Core" | "Keep Optional" | "Consider Merging" | "Remove",
      "reasoning": "string",
      "suggestedKeywords": ["string"]
    }
  ],
  "coreRecommendations": ["categoryId1", "categoryId2"],
  "overallAdvice": "string"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result;
}

/**
 * AI: Suggest category for an event
 */
export async function suggestCategoryForEvent(
  event: { brand?: string; title?: string; description?: string },
  categories: any[]
) {
  const prompt = `Eres un experto en categorización de eventos BTL.

Evento:
- Marca: ${event.brand || 'N/A'}
- Título: ${event.title || 'N/A'}
- Descripción: ${event.description?.substring(0, 300) || 'N/A'}

Categorías disponibles:
${categories.map((cat, i) => `${i + 1}. ${cat.label} (ID: ${cat.id})
   Keywords: ${cat.keywords.join(', ')}`).join('\n\n')}

Sugiere la categoría más apropiada.

Responde en JSON:
{
  "categoryId": "string",
  "label": "string",
  "confidence": number (0-100),
  "matchedKeywords": ["string"],
  "reasoning": "string"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result;
}

/**
 * AI: Optimize SEO description for a category
 */
export async function optimizeSEODescription(category: {
  label: string;
  description: string;
  keywords: string[];
}) {
  const prompt = `Eres un experto en SEO para eventos BTL en Chile.

Categoría: ${category.label}
Descripción actual: ${category.description}
Keywords: ${category.keywords.join(', ')}

Genera una descripción optimizada para SEO de 150-160 caracteres que:
1. Incluya keywords naturalmente
2. Sea atractiva para Google SERPs
3. Use terminología profesional BTL
4. Mencione Chile/Latinoamérica si es relevante
5. No use lenguaje promocional excesivo

Responde en JSON:
{
  "seoDescription": "string (150-160 chars)",
  "reasoning": "string"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result;
}

/**
 * AI: Generate keywords from existing events
 */
export async function generateKeywordsFromEvents(
  categoryLabel: string,
  events: any[]
) {
  // Filter events that might belong to this category
  const sampleEvents = events.slice(0, 10).map(e => ({
    brand: e.brand,
    title: e.title,
    description: e.description?.substring(0, 200)
  }));

  const prompt = `Eres un experto en SEO y análisis de contenido.

Categoría: ${categoryLabel}

Ejemplos de eventos del portafolio:
${sampleEvents.map((e, i) => `${i + 1}. ${e.brand} - ${e.title}
   ${e.description || ''}`).join('\n\n')}

Genera 5-10 keywords relevantes para esta categoría que:
1. Ayuden a identificar automáticamente eventos similares
2. Sean términos de búsqueda comunes en la industria
3. Estén en español (Chile/Latinoamérica)
4. Sean específicos pero no demasiado nicho

Responde en JSON:
{
  "keywords": ["string"],
  "reasoning": "string"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result;
}
