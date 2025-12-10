// REMOVED: Static events import - Now 100% dynamic from Supabase
// import { events as staticEvents } from '../data/events';
import { projectId, publicAnonKey } from './supabase/info';
import { WavEvent } from '../types';
import { generateSlug } from './slug';
import { EventCategory } from './contentRules';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

// Fallback image - Placeholder gris simple (data URI)
// Cuando el usuario suba una imagen real a Supabase, esta se reemplaza automáticamente
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23171717'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23525252'%3ESin Imagen%3C/text%3E%3C/svg%3E";

// PHASE 9: Retry configuration for Supabase timeouts
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * PHASE 9: Retry utility function with exponential backoff
 */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok && retries > 0 && response.status >= 500) {
      // Retry on server errors
      console.warn(`⚠️ Fetch failed with ${response.status}, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    return response;
  } catch (error: any) {
    if (retries > 0 && (error.name === 'AbortError' || error.message?.includes('fetch'))) {
      console.warn(`⚠️ Fetch timeout/error, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

/**
 * Generate a UUID v4
 */
const generateUUID = (): string => {
  return crypto.randomUUID();
};

/**
 * Normalize Event Schema (Frontend)
 * Updated to support Extended Schema
 */
export const normalizeEventForSave = (rawEvent: any): any => {
  // 1. Generate UUID if missing
  let id = rawEvent.id;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    id = generateUUID();
    console.log(`[Frontend Normalize] Generated new UUID: ${id} for event: ${rawEvent.title || 'Untitled'}`);
  }

  // 2. Normalize image field
  let image = rawEvent.image;
  if (!image || typeof image !== 'string') {
    if (rawEvent.imageUrl) image = rawEvent.imageUrl;
    else if (rawEvent.imgUrl) image = rawEvent.imgUrl;
    else if (rawEvent.img) image = rawEvent.img;
    else image = '';
  }
  if (!image || typeof image !== 'string' || image.trim() === '') {
    image = FALLBACK_IMAGE;
  }

  // 3. Category
  let category = rawEvent.category;
  if (!category || typeof category !== 'string' || category.trim() === '') {
    category = 'activaciones-de-marca'; 
  }

  // 4. Brand & Title
  let brand = rawEvent.brand || 'Marca';
  if (brand.length > 50) brand = brand.substring(0, 50);

  let title = rawEvent.title || 'Evento Sin Título';
  if (title.length > 100) title = title.substring(0, 100);

  // 5. Description
  let description = rawEvent.description || 'Descripción pendiente.';
  if (description.length > 1000) description = description.substring(0, 1000);

  // 6. Slug
  let slug = rawEvent.slug;
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    slug = generateSlug(brand, title, id);
  }

  // 7. Gallery
  let gallery: any[] = [];
  if (Array.isArray(rawEvent.gallery)) {
    gallery = rawEvent.gallery;
  } else if (typeof rawEvent.gallery === 'string') {
    const items = rawEvent.gallery.split(',').map((s: string) => s.trim()).filter(Boolean);
    gallery = items.map((url: string) => ({
      id: generateUUID(),
      type: 'image',
      url: url
    }));
  }

  // 8. Logo
  let logo = rawEvent.logo;
  if (logo && typeof logo !== 'string') logo = undefined;

  // 9. Build STRICT WavEvent with ALL extended fields
  const normalized: any = {
    id,
    brand,
    title,
    description,
    image,
    slug,
    gallery,
    category,
    logo,
    imagePath: rawEvent.imagePath,
    logoPath: rawEvent.logoPath,
    
    // IDENTIFICATION (Extended)
    client: rawEvent.client || '',
    subcategory: rawEvent.subcategory || '',
    year: rawEvent.year ? Number(rawEvent.year) : new Date().getFullYear(),
    month: rawEvent.month ? Number(rawEvent.month) : undefined,
    country: rawEvent.country || '',
    city: rawEvent.city || '',
    venue: rawEvent.venue || '',

    // VISUALS (Extended)
    og_image: rawEvent.og_image || '',

    // CONTENT (Extended)
    technical_summary: rawEvent.technical_summary || '',
    summary: rawEvent.summary || '',
    highlights: Array.isArray(rawEvent.highlights) ? rawEvent.highlights : [],
    tone: rawEvent.tone || '',
    audience: rawEvent.audience || '',

    // SEO & METADATA
    seo_title: rawEvent.seo_title || '',
    seo_description: rawEvent.seo_description || '',
    keywords: Array.isArray(rawEvent.keywords) ? rawEvent.keywords : [],
    hashtags: Array.isArray(rawEvent.hashtags) ? rawEvent.hashtags : [],
    tags: Array.isArray(rawEvent.tags) ? rawEvent.tags : [],

    // PERFORMANCE
    people_reached: rawEvent.people_reached || '',
    attendees: rawEvent.attendees || '',
    days: rawEvent.days ? Number(rawEvent.days) : undefined,
    cities: rawEvent.cities ? Number(rawEvent.cities) : undefined,
    screens: rawEvent.screens ? Number(rawEvent.screens) : undefined,
    kpis: Array.isArray(rawEvent.kpis) ? rawEvent.kpis : [],
    results_notes: rawEvent.results_notes || '',

    // SOCIAL MEDIA
    instagram_hook: rawEvent.instagram_hook || '',
    instagram_body: rawEvent.instagram_body || '',
    instagram_closing: rawEvent.instagram_closing || '',
    instagram_hashtags: rawEvent.instagram_hashtags || '',
    alt_instagram: rawEvent.alt_instagram || '',
    linkedin_post: rawEvent.linkedin_post || '',
    linkedin_article: rawEvent.linkedin_article || '',

    // VARIANTS
    alt_title_1: rawEvent.alt_title_1 || '',
    alt_title_2: rawEvent.alt_title_2 || '',
    alt_summary_1: rawEvent.alt_summary_1 || '',
    alt_summary_2: rawEvent.alt_summary_2 || ''
  };

  return normalized;
};

const validateEvent = (data: any, index: number): WavEvent => {
  const issues: string[] = [];

  if (!data.id) issues.push("missing 'id'");
  if (typeof data.brand !== 'string') issues.push("missing/invalid 'brand'");
  if (typeof data.title !== 'string') issues.push("missing/invalid 'title'");
  if (typeof data.description !== 'string') issues.push("missing/invalid 'description'");
  
  if (!data.image) {
    if (data.imageUrl) {
      console.warn(`[Data Integrity] Event at index ${index} uses LEGACY 'imageUrl' instead of 'image'.`);
    }
    issues.push("missing 'image'");
  }

  if (issues.length > 0) {
    console.warn(`[Data Integrity] Event at index ${index} (ID: ${data.id || 'unknown'}) has issues:`, issues.join(', '));
  }

  // Reuse normalization logic for consistency
  return normalizeEventForSave(data);
};

export const getEvents = async (): Promise<WavEvent[]> => {
  console.group("🌊 [API] getEvents()");
  try {
    console.log(`Fetching from: ${BASE_URL}/events`);
    const response = await fetchWithRetry(`${BASE_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Backend returned error: ${errorText}`);
      throw new Error(`Backend error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn("⚠️ Invalid data structure from Supabase - returning empty array");
      return [];
    }

    if (data.length === 0) {
      console.log("✅ Returning empty array (no events in Supabase)");
      return [];
    }
    
    console.log(`✅ Successfully fetched ${data.length} events from Supabase`);
    return data.map((item, index) => validateEvent(item, index));
  } catch (e) {
    console.error("❌ Network/Logic Error in getEvents:", e);
    console.warn("⚠️ Returning empty array (Supabase unavailable)");
    return []; // Return empty instead of static fallback
  } finally {
    console.groupEnd();
  }
};

export const saveEvents = async (events: any[], token?: string) => {
    console.log(`[saveEvents] Normalizing ${events.length} events before saving...`);
    
    const normalizedEvents = events.map((event, index) => {
      return normalizeEventForSave(event);
    });
    
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(normalizedEvents)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save: ${errorText}`);
    }
    
    const result = await response.json();
    return result;
};

export const uploadFile = async (file: File, token?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token || publicAnonKey}`
    },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to upload');
  return response.json(); 
};

export const createEvent = async (event: Partial<WavEvent>, token?: string) => {
    const normalizedEvent = normalizeEventForSave(event);
    
    const response = await fetch(`${BASE_URL}/events/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(normalizedEvent)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create event: ${errorText}`);
    }
    
    const result = await response.json();
    return result.event;
};

/**
 * HARDCODED CATEGORIES
 */
const HARDCODED_CATEGORIES: EventCategory[] = [
  {
    id: 'activaciones-de-marca',
    label: 'Activaciones de Marca',
    description: 'Experiencias de alto impacto que conectan marcas con personas.',
    seoDescription: 'Agencia experta en Activaciones de Marca, Sampling, Street Marketing y Pop-up Stores en Chile.',
    keywords: ['activacion', 'sampling', 'street marketing', 'pop-up', 'guerrilla'],
    subcategories: [
      'Sampling & Degustaciones',
      'Street Marketing',
      'Guerrilla Creativa',
      'Pop-up Stores',
      'Product Trial Experience',
      'Activaciones Deportivas',
      'Activaciones Wellness'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'eventos-corporativos',
    label: 'Eventos Corporativos',
    description: 'Producción integral de eventos, cumbres y lanzamientos.',
    seoDescription: 'Producción de Eventos Corporativos, Lanzamientos, Seminarios y Team Building en Santiago.',
    keywords: ['corporativo', 'lanzamiento', 'summit', 'seminario', 'kickoff'],
    subcategories: [
      'Lanzamientos de Producto',
      'Kickoff & Cultura Interna',
      'Cumbres & Summits',
      'Seminarios / Charlas',
      'Press Days / Media Events',
      'Roadshows Corporativos',
      'Team Building Experiencial'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'brand-experience',
    label: 'Brand Experience',
    description: 'Instalaciones inmersivas y museografía de marca.',
    seoDescription: 'Diseño de Brand Experience, Instalaciones Sensoriales y Recorridos Experienciales.',
    keywords: ['brand experience', 'inmersivo', 'sensorial', 'museografia', 'arte'],
    subcategories: [
      'Instalaciones Sensoriales',
      'Recorridos Experienciales',
      'AR / VR / MR Experiences',
      'Photo Opportunities',
      'Intervenciones Artísticas',
      'Museografía de Marca',
      'Hologramas / Mapping'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'trade-marketing-retail',
    label: 'Trade Marketing & Retail',
    description: 'Estrategias de punto de venta y shopper experience.',
    seoDescription: 'Servicios de Trade Marketing, Exhibición POP y Shopper Experience para retail.',
    keywords: ['trade', 'retail', 'pop', 'merchandising', 'shopper'],
    subcategories: [
      'Exhibición POP',
      'Impulsadoras / Promotores',
      'Merchandising',
      'Trade Activations',
      'Shop-in-Shop',
      'Corners',
      'Shopper Experience'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'stands-ferias',
    label: 'Stands & Ferias',
    description: 'Arquitectura efímera y stands customizados.',
    seoDescription: 'Diseño y montaje de Stands para Ferias, Booths y Arquitectura Efímera.',
    keywords: ['stand', 'feria', 'booth', 'arquitectura efimera', 'pabellon'],
    subcategories: [
      'Stands Modulares',
      'Stands Custom',
      'Pabellones Temáticos',
      'Booths Retail',
      'Stands Itinerantes',
      'Diseño 3D / Render',
      'Arquitectura Efímera'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'experiencia-digital-hibrida',
    label: 'Experiencia Digital & Híbrida',
    description: 'Soluciones tech, gamificación y eventos virtuales.',
    seoDescription: 'Agencia de Experiencias Digitales, Gamificación, Streaming y Filtros AR.',
    keywords: ['digital', 'hibrido', 'gamificacion', 'streaming', 'app'],
    subcategories: [
      'Gamificación',
      'Streaming / Live Commerce',
      'Filtros AR',
      'Apps QR / Registro',
      'Experiencias 3D',
      'Plataformas Híbridas',
      'Interacciones Digitales'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'ambient-marketing',
    label: 'Ambient Marketing',
    description: 'Intervenciones urbanas y publicidad no tradicional.',
    seoDescription: 'Campañas de Ambient Marketing, Intervenciones Urbanas y Proyecciones OOH.',
    keywords: ['ambient', 'urbano', 'ooh', 'proyeccion', 'intervencion'],
    subcategories: [
      'Intervenciones Urbanas',
      'Instalaciones Públicas',
      'Proyecciones / Mapping',
      'Túneles Experienciales',
      'Impact Spots',
      'Publicidad No Tradicional OOH'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'roadshows',
    label: 'Roadshows',
    description: 'Giras promocionales y módulos móviles.',
    seoDescription: 'Producción de Roadshows, Brand Trucks y Giras Nacionales de marketing.',
    keywords: ['roadshow', 'gira', 'truck', 'movil', 'terreno'],
    subcategories: [
      'Brand Trucks',
      'Módulos Móviles',
      'Giras Nacionales',
      'Activaciones Regionales',
      'Sensibilización en Terreno'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'produccion-audiovisual',
    label: 'Producción Audiovisual',
    description: 'Contenido visual, animación y cobertura de eventos.',
    seoDescription: 'Servicios de Producción Audiovisual, Video Eventos, Motion Graphics y Drone.',
    keywords: ['audiovisual', 'video', 'foto', 'drone', 'animacion'],
    subcategories: [
      'Recap Videos',
      'Cápsulas / Testimoniales',
      'Motion Graphics',
      'Animación 2D / 3D',
      'Visuales LED',
      'Drone / FPV',
      'Fotografía'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'logistica-operaciones',
    label: 'Logística & Operaciones',
    description: 'Soporte operativo, staffing y gestión integral.',
    seoDescription: 'Logística para eventos, Staffing, Permisos y Gestión de Operaciones BTL.',
    keywords: ['logistica', 'operaciones', 'staff', 'seguridad', 'montaje'],
    subcategories: [
      'Staffing',
      'Transporte',
      'Permisos',
      'Seguridad',
      'Bodegas',
      'Montaje / Desmontaje',
      'Gestión de Inventarios'
    ],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  }
];

export const getCategories = async () => {
  console.group("📂 [API] getCategories()");
  console.log("⚡ Using HARDCODED categories (frontend-only)");
  console.log(`✅ Returning ${HARDCODED_CATEGORIES.length} hardcoded categories`);
  console.groupEnd();
  
  return Promise.resolve([...HARDCODED_CATEGORIES]);
};

export const clearAllEvents = async (token?: string) => {
    console.log(`[clearAllEvents] ⚠️ CLEARING ALL EVENTS`);
    const response = await fetch(`${BASE_URL}/events/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to clear events`);
    }
    return await response.json();
};