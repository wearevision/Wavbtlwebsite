/**
 * Category Mapping — Auto-categorización de Eventos
 * 
 * Este archivo contiene la lógica para asignar categorías automáticamente
 * a eventos basándose en el nombre de la marca.
 * 
 * Útil para migración de eventos legacy sin categoría.
 */

import { EventCategory } from './contentRules';

/**
 * Mapeo de marcas conocidas a categorías
 * Agregar nuevas marcas aquí según el portafolio crece
 */
const BRAND_CATEGORY_MAP: Record<string, EventCategory> = {
  // 🏢 Corporativo - Bancos, Telcos, Retail
  'banco de chile': 'corporativo',
  'bbva': 'corporativo',
  'santander': 'corporativo',
  'bci': 'corporativo',
  'scotiabank': 'corporativo',
  'wom': 'corporativo',
  'entel': 'corporativo',
  'claro': 'corporativo',
  'movistar': 'corporativo',
  'vtr': 'corporativo',
  'falabella': 'corporativo',
  'ripley': 'corporativo',
  'paris': 'corporativo',
  'cencosud': 'corporativo',
  'lider': 'corporativo',
  'jumbo': 'corporativo',
  'coca-cola': 'corporativo',
  'pepsi': 'corporativo',
  'nestle': 'corporativo',
  'unilever': 'corporativo',
  
  // 🎵 Música & Entretenimiento
  'sony music': 'musica',
  'universal music': 'musica',
  'warner music': 'musica',
  'spotify': 'musica',
  'tomorrowland': 'musica',
  'lollapalooza': 'musica',
  'primavera sound': 'musica',
  'festival': 'musica',
  'concierto': 'musica',
  'música': 'musica',
  'live nation': 'musica',
  'ticketmaster': 'musica',
  
  // 🏃 Deportes & Lifestyle
  'nike': 'deportes',
  'adidas': 'deportes',
  'altra running': 'deportes',
  'reebok': 'deportes',
  'puma': 'deportes',
  'under armour': 'deportes',
  'new balance': 'deportes',
  'red bull': 'deportes',
  'redbull': 'deportes',
  'gatorade': 'deportes',
  'powerade': 'deportes',
  'marathon': 'deportes',
  'maratón': 'deportes',
  'running': 'deportes',
  'fitness': 'deportes',
  
  // 🎨 Arte & Cultura
  'moma': 'arte',
  'museo': 'arte',
  'museum': 'arte',
  'galería': 'arte',
  'gallery': 'arte',
  'teamlab': 'arte',
  'bienal': 'arte',
  'exposición': 'arte',
  'exhibition': 'arte',
  'arte': 'arte',
  'cultura': 'arte',
  
  // 🏭 Industrial & Tech
  'ibm': 'tech',
  'intel': 'tech',
  'microsoft': 'tech',
  'apple': 'tech',
  'google': 'tech',
  'amazon': 'tech',
  'samsung': 'tech',
  'huawei': 'tech',
  'mining': 'tech',
  'minería': 'tech',
  'codelco': 'tech',
  'antofagasta minerals': 'tech',
  
  // 🌆 Institucional
  'metro': 'institucional',
  'municipalidad': 'institucional',
  'gobierno': 'institucional',
  'ministerio': 'institucional',
  'municipality': 'institucional',
  'government': 'institucional',
  'servicio público': 'institucional',
  'public service': 'institucional'
};

/**
 * Keywords para detectar categoría por contexto del título/descripción
 */
const CATEGORY_KEYWORDS: Record<EventCategory, string[]> = {
  corporativo: [
    'lanzamiento', 'producto', 'campaña', 'retail', 'tienda', 'brand activation',
    'activación de marca', 'experiencia de cliente', 'customer experience'
  ],
  musica: [
    'concierto', 'festival', 'show', 'tour', 'streaming', 'live music',
    'música en vivo', 'escenario', 'stage', 'artista'
  ],
  deportes: [
    'carrera', 'maratón', 'marathon', 'running', 'fitness', 'training',
    'entrenamiento', 'deporte', 'sport', 'atleta', 'athlete', 'gym'
  ],
  arte: [
    'exposición', 'exhibition', 'instalación', 'installation', 'museo', 'museum',
    'galería', 'gallery', 'arte', 'art', 'cultura', 'culture', 'artista'
  ],
  tech: [
    'tecnología', 'technology', 'innovación', 'innovation', 'digital',
    'software', 'hardware', 'ai', 'inteligencia artificial', 'data'
  ],
  institucional: [
    'gobierno', 'government', 'público', 'public', 'ciudadanía', 'citizenship',
    'comunidad', 'community', 'urbano', 'urban', 'infraestructura'
  ],
  otro: []
};

/**
 * Normaliza texto para comparación (lowercase, sin tildes, sin espacios extra)
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover tildes
    .trim();
};

/**
 * Detecta categoría basándose en la marca
 */
const detectCategoryFromBrand = (brand: string): EventCategory | null => {
  if (!brand) return null;
  
  const normalized = normalizeText(brand);
  
  // Buscar match exacto o parcial en el mapeo
  for (const [key, category] of Object.entries(BRAND_CATEGORY_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return category;
    }
  }
  
  return null;
};

/**
 * Detecta categoría basándose en keywords en título y descripción
 */
const detectCategoryFromContent = (title: string, description: string): EventCategory | null => {
  const content = normalizeText(`${title} ${description}`);
  
  // Contar matches por categoría
  const scores: Record<EventCategory, number> = {
    corporativo: 0,
    musica: 0,
    deportes: 0,
    arte: 0,
    tech: 0,
    institucional: 0,
    otro: 0
  };
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [EventCategory, string[]][]) {
    for (const keyword of keywords) {
      if (content.includes(normalizeText(keyword))) {
        scores[category]++;
      }
    }
  }
  
  // Encontrar la categoría con más matches
  let maxScore = 0;
  let bestCategory: EventCategory | null = null;
  
  for (const [category, score] of Object.entries(scores) as [EventCategory, number][]) {
    if (score > maxScore && category !== 'otro') {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  // Requiere al menos 2 matches para asignar categoría
  return maxScore >= 2 ? bestCategory : null;
};

/**
 * Auto-categoriza un evento basándose en marca, título y descripción
 * 
 * IMPORTANTE: Esta función ahora trabaja con categorías dinámicas del KV store.
 * Requiere pasar el array de categorías disponibles como parámetro.
 * 
 * Orden de prioridad:
 * 1. Categoría existente (si ya tiene, la respeta)
 * 2. Detección por marca (usando BRAND_CATEGORY_MAP legacy)
 * 3. Detección por contenido usando keywords de las categorías disponibles
 * 4. Fallback a null (sin categoría)
 */
export const autoCategorizeEvent = (
  event: {
    brand?: string;
    title?: string;
    description?: string;
    category?: string;
  },
  availableCategories: Array<{ id: string; keywords: string[] }>
): string | null => {
  // Si ya tiene categoría válida, respetarla
  if (event.category) {
    const exists = availableCategories.find(cat => cat.id === event.category);
    if (exists) {
      return event.category;
    }
  }
  
  // Intentar por marca (legacy mapping)
  const categoryFromBrand = detectCategoryFromBrand(event.brand || '');
  if (categoryFromBrand) {
    // Verificar que la categoría legacy exista en las disponibles
    const exists = availableCategories.find(cat => cat.id === categoryFromBrand);
    if (exists) {
      return categoryFromBrand;
    }
  }
  
  // Intentar por contenido usando keywords de categorías disponibles
  const content = normalizeText(`${event.title || ''} ${event.description || ''}`);
  
  // Scoring dinámico basado en keywords de cada categoría
  const scores: Record<string, number> = {};
  
  for (const category of availableCategories) {
    scores[category.id] = 0;
    for (const keyword of category.keywords) {
      if (content.includes(normalizeText(keyword))) {
        scores[category.id]++;
      }
    }
  }
  
  // Encontrar la categoría con más matches
  let maxScore = 0;
  let bestCategoryId: string | null = null;
  
  for (const [categoryId, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategoryId = categoryId;
    }
  }
  
  // Requiere al menos 2 matches para asignar categoría con confianza
  return maxScore >= 2 ? bestCategoryId : null;
};

/**
 * Migra un array de eventos agregando categorías donde falten
 */
export const migrateEventsWithCategories = (events: any[]): any[] => {
  return events.map(event => {
    if (!event.category) {
      const detectedCategory = autoCategorizeEvent(event);
      console.log(`[Category Migration] ${event.brand} - ${event.title} → ${detectedCategory}`);
      return {
        ...event,
        category: detectedCategory
      };
    }
    return event;
  });
};

/**
 * Estadísticas de categorización
 */
export const getCategoryStats = (events: any[]): Record<EventCategory | 'uncategorized', number> => {
  const stats: Record<EventCategory | 'uncategorized', number> = {
    corporativo: 0,
    musica: 0,
    deportes: 0,
    arte: 0,
    tech: 0,
    institucional: 0,
    otro: 0,
    uncategorized: 0
  };
  
  for (const event of events) {
    if (!event.category) {
      stats.uncategorized++;
    } else {
      stats[event.category as EventCategory]++;
    }
  }
  
  return stats;
};
