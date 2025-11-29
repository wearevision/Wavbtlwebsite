import { events as staticEvents } from '../data/events';
import { projectId, publicAnonKey } from './supabase/info';
import { WavEvent } from '../types';
import { generateSlug } from './slug';
import { EventCategory } from './contentRules';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

// Fallback data for robustness
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80";

const optimizeUrl = (url: string): string => {
  if (!url) return FALLBACK_IMAGE;
  if (url.includes('images.unsplash.com')) {
    // Ensure WebP format and appropriate size if not already set
    if (!url.includes('fm=')) url += '&fm=webp';
    if (!url.includes('w=')) url += '&w=1080';
    if (!url.includes('q=')) url += '&q=80';
  }
  return url;
};

/**
 * Generate a UUID v4
 */
const generateUUID = (): string => {
  return crypto.randomUUID();
};

/**
 * Normalize Event Schema (Frontend)
 * 
 * Mirrors the backend normalization to ensure data consistency.
 * This provides a first layer of validation before sending to the server.
 * 
 * STRICT WavEvent Schema:
 * {
 *   id: string,
 *   brand: string,
 *   title: string,
 *   description: string,
 *   image: string,
 *   slug: string,
 *   gallery: GalleryItem[]
 * }
 * 
 * Automatic Transformations:
 * 1. Generates UUID if 'id' is missing
 * 2. Converts legacy fields (imageUrl, img, imgUrl) → 'image'
 * 3. Generates slug from brand+title if missing (kebab-case)
 * 4. Converts gallery to array (empty [] if missing)
 * 5. Truncates text fields to maximum length
 * 6. Removes ALL non-allowed fields
 */
export const normalizeEventForSave = (rawEvent: any): any => {
  // 1. Generate UUID if missing
  let id = rawEvent.id;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    id = generateUUID();
    console.log(`[Frontend Normalize] Generated new UUID: ${id} for event: ${rawEvent.title || 'Untitled'}`);
  }

  // 2. Normalize image field (handle various legacy naming conventions)
  // WARNING: Converts imageUrl → image (legacy field)
  let image = rawEvent.image;
  if (!image || typeof image !== 'string') {
    // Try alternative field names and WARN
    if (rawEvent.imageUrl) {
      console.warn(`[Frontend Normalize] Converting legacy 'imageUrl' → 'image' for event ${id}`);
      image = rawEvent.imageUrl;
    } else if (rawEvent.imgUrl) {
      console.warn(`[Frontend Normalize] Converting legacy 'imgUrl' → 'image' for event ${id}`);
      image = rawEvent.imgUrl;
    } else if (rawEvent.img) {
      console.warn(`[Frontend Normalize] Converting legacy 'img' → 'image' for event ${id}`);
      image = rawEvent.img;
    } else {
      image = '';
    }
  }
  
  // Ensure we have a valid image URL or fallback
  if (!image || typeof image !== 'string' || image.trim() === '') {
    image = FALLBACK_IMAGE;
  }

  // 3. Assign default category if missing (temporary, will be replaced by AI categorization)
  let category = rawEvent.category;
  if (!category || typeof category !== 'string' || category.trim() === '') {
    // Auto-assign based on brand/title keywords (temporary logic)
    const text = `${rawEvent.brand || ''} ${rawEvent.title || ''}`.toLowerCase();
    if (text.includes('festival') || text.includes('music') || text.includes('concierto')) {
      category = 'Festivales y Música';
    } else if (text.includes('retail') || text.includes('tienda') || text.includes('pop')) {
      category = 'Retail Experience';
    } else if (text.includes('arte') || text.includes('cultura') || text.includes('museo')) {
      category = 'Arte y Cultura';
    } else if (text.includes('tech') || text.includes('innovación') || text.includes('digital')) {
      category = 'Tech y Innovación';
    } else if (text.includes('instalación') || text.includes('mapping')) {
      category = 'Instalaciones Interactivas';
    } else if (text.includes('corporativo') || text.includes('evento') || text.includes('summit')) {
      category = 'Eventos Corporativos';
    } else {
      category = 'Activaciones de Marca'; // Default fallback
    }
  }

  // 4. Normalize brand (max 50 characters)
  let brand = rawEvent.brand;
  if (!brand || typeof brand !== 'string' || brand.trim() === '') {
    brand = 'Marca';
  } else if (brand.length > 50) {
    brand = brand.substring(0, 50);
  }

  // 4. Normalize title (max 100 characters)
  let title = rawEvent.title;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    title = 'Evento Sin Título';
  } else if (title.length > 100) {
    title = title.substring(0, 100);
  }

  // 5. Normalize description (max 1000 characters)
  let description = rawEvent.description;
  if (!description || typeof description !== 'string' || description.trim() === '') {
    description = 'Descripción pendiente.';
  } else if (description.length > 1000) {
    description = description.substring(0, 1000);
  }

  // 6. Generate slug with UNIVERSAL FORMAT (brand-title)
  let slug = rawEvent.slug;
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    slug = generateSlug(brand, title, id);
    console.log(`[Frontend Normalize] Generated slug from brand+title: "${brand}" + "${title}" → "${slug}"`);
  }
  // If slug exists, respect it (user may have customized it)

  // 7. Normalize gallery to array
  let gallery: any[] = [];
  if (Array.isArray(rawEvent.gallery)) {
    gallery = rawEvent.gallery;
  } else if (typeof rawEvent.gallery === 'string') {
    // If gallery came as comma-separated string, convert to array
    const items = rawEvent.gallery.split(',').map((s: string) => s.trim()).filter(Boolean);
    gallery = items.map((url: string) => ({
      id: generateUUID(),
      type: 'image',
      url: url
    }));
    console.log(`[Frontend Normalize] Converted gallery string to array for event ${id}`);
  }
  // If gallery is missing/undefined, it remains []

  // 8. Normalize logo (optional - PNG/SVG with alpha)
  let logo = rawEvent.logo;
  if (logo && typeof logo !== 'string') {
    logo = undefined;
  }

  // 9. Build STRICT WavEvent with ALL extended fields
  const normalized: any = {
    id,
    brand,
    title,
    description,
    image,
    slug,
    gallery,
    // Optional/Extended fields
    category, // Auto-assigned or from rawEvent
    logo: logo,
    imagePath: rawEvent.imagePath,
    logoPath: rawEvent.logoPath,
    // SEO & Content fields
    summary: rawEvent.summary || '',
    highlights: Array.isArray(rawEvent.highlights) ? rawEvent.highlights : [],
    keywords: Array.isArray(rawEvent.keywords) ? rawEvent.keywords : [],
    hashtags: Array.isArray(rawEvent.hashtags) ? rawEvent.hashtags : [],
    // Social Media fields
    instagram_hook: rawEvent.instagram_hook || '',
    instagram_body: rawEvent.instagram_body || '',
    instagram_closing: rawEvent.instagram_closing || '',
    instagram_hashtags: rawEvent.instagram_hashtags || '',
    linkedin_post: rawEvent.linkedin_post || '',
    linkedin_article: rawEvent.linkedin_article || '',
    // Alternative content
    alt_title_1: rawEvent.alt_title_1 || '',
    alt_title_2: rawEvent.alt_title_2 || '',
    alt_instagram: rawEvent.alt_instagram || '',
    // Metadata
    year: rawEvent.year || new Date().getFullYear()
  };

  // Log if we're removing fields
  const allowedFields = [
    'id', 'brand', 'title', 'description', 'image', 'slug', 'gallery', 'logo', 'category', 
    'imagePath', 'logoPath', 'summary',
    'highlights', 'keywords', 'hashtags',
    'instagram_hook', 'instagram_body', 'instagram_closing', 'instagram_hashtags',
    'linkedin_post', 'linkedin_article',
    'alt_title_1', 'alt_title_2', 'alt_instagram', 'year'
  ];
  const removedFields = Object.keys(rawEvent).filter(key => !allowedFields.includes(key));
  if (removedFields.length > 0) {
    console.log(`[Frontend Normalize] Removed non-WavEvent fields for ${id}:`, removedFields.join(', '));
  }

  return normalized;
};

const validateEvent = (data: any, index: number): WavEvent => {
  const issues: string[] = [];

  if (!data.id) issues.push("missing 'id'");
  if (typeof data.brand !== 'string') issues.push("missing/invalid 'brand'");
  if (typeof data.title !== 'string') issues.push("missing/invalid 'title'");
  if (typeof data.description !== 'string') issues.push("missing/invalid 'description'");
  
  // STRICT: Only check for 'image' field, not imageUrl
  if (!data.image) {
    // Log warning if legacy imageUrl exists
    if (data.imageUrl) {
      console.warn(`[Data Integrity] Event at index ${index} uses LEGACY 'imageUrl' instead of 'image'. This should be normalized.`);
    }
    issues.push("missing 'image'");
  }

  if (issues.length > 0) {
    console.warn(`[Data Integrity] Event at index ${index} (ID: ${data.id || 'unknown'}) has issues:`, issues.join(', '), data);
  }

  const brand = typeof data.brand === 'string' ? data.brand : 'Brand';
  const title = typeof data.title === 'string' ? data.title : 'Untitled Event';
  
    // Auto-assign based on keywords to match HARDCODED_CATEGORIES
    if (!data.category || data.category === '') {
      const text = `${data.brand || ''} ${data.title || ''} ${data.description || ''}`.toLowerCase();
      
      if (text.includes('festival') || text.includes('musica') || text.includes('concierto') || text.includes('sonido')) {
        data.category = 'festivales-y-musica';
      } else if (text.includes('retail') || text.includes('tienda') || text.includes('pop') || text.includes('compra')) {
        data.category = 'retail-experience';
      } else if (text.includes('arte') || text.includes('cultura') || text.includes('museo') || text.includes('galeria')) {
        data.category = 'arte-y-cultura';
      } else if (text.includes('tech') || text.includes('innovacion') || text.includes('digital') || text.includes('ia') || text.includes('data')) {
        data.category = 'tech-y-innovacion';
      } else if (text.includes('instalacion') || text.includes('mapping') || text.includes('luz') || text.includes('proyeccion')) {
        data.category = 'instalaciones-interactivas';
      } else if (text.includes('corporativo') || text.includes('evento') || text.includes('summit') || text.includes('conferencia')) {
        data.category = 'eventos-corporativos';
      } else {
        data.category = 'activaciones-de-marca'; // Default fallback
      }
    }

    // Return STRICT WavEvent schema (Extended) - preserve ALL fields from backend
  return {
    id: data.id || crypto.randomUUID(),
    brand: brand,
    title: title,
    description: typeof data.description === 'string' ? data.description : 'No description available.',
    image: optimizeUrl(data.image || data.imageUrl || FALLBACK_IMAGE),
    slug: data.slug || generateSlug(brand, title, data.id),
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    // Extended fields - preserve ALL data from backend
    category: typeof data.category === 'string' ? data.category : '',
    logo: data.logo || '',
    imagePath: data.imagePath,
    logoPath: data.logoPath,
    // SEO & Content fields
    summary: data.summary || '',
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    hashtags: Array.isArray(data.hashtags) ? data.hashtags : [],
    // Social Media fields
    instagram_hook: data.instagram_hook || '',
    instagram_body: data.instagram_body || '',
    instagram_closing: data.instagram_closing || '',
    instagram_hashtags: data.instagram_hashtags || '',
    linkedin_post: data.linkedin_post || '',
    linkedin_article: data.linkedin_article || '',
    // Alternative content
    alt_title_1: data.alt_title_1 || '',
    alt_title_2: data.alt_title_2 || '',
    alt_instagram: data.alt_instagram || '',
    // Metadata
    year: data.year || new Date().getFullYear()
  };
};

export const getEvents = async (): Promise<WavEvent[]> => {
  console.group("🌊 [API] getEvents()");
  try {
    console.log(`Fetching from: ${BASE_URL}/events`);
    const response = await fetch(`${BASE_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Backend returned error: ${errorText}`);
      throw new Error(`Backend error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Raw payload received:", data);
    
    if (!Array.isArray(data)) {
      console.error("❌ CRITICAL: Response is not an array!", data);
      console.warn("⚠️ Falling back to static events due to invalid data structure.");
      return staticEvents.map((e, i) => validateEvent(e, i));
    }

    if (data.length === 0) {
      console.warn("⚠️ WARNING: Backend returned EMPTY array. KV store is empty.");
      console.log("✅ Returning empty array (no fallback to static data).");
      return [];
    }
    
    console.log(`✅ Successfully fetched ${data.length} events from backend.`);

    // Validate and normalize each event
    const normalizedData = data.map((item, index) => validateEvent(item, index));

    console.groupEnd();
    return normalizedData;
  } catch (e) {
    console.error("❌ Network/Logic Error in getEvents:", e);
    console.warn("⚠️ Falling back to static events due to exception.");
    console.groupEnd();
    return staticEvents.map((e, i) => validateEvent(e, i));
  }
};

export const saveEvents = async (events: any[], token?: string) => {
    console.log(`[saveEvents] Normalizing ${events.length} events before saving...`);
    
    // NORMALIZE ALL EVENTS BEFORE SENDING TO SERVER
    const normalizedEvents = events.map((event, index) => {
      console.log(`[saveEvents] Normalizing event ${index + 1}/${events.length}: "${event.title || 'Untitled'}"`);
      return normalizeEventForSave(event);
    });
    
    console.log(`[saveEvents] Successfully normalized ${normalizedEvents.length} events. Sending to server...`);
    
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
      console.error(`[saveEvents] Server returned error: ${errorText}`);
      throw new Error(`Failed to save: ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`[saveEvents] ✅ Server confirmed save: ${result.count || normalizedEvents.length} events saved.`);
    
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
  return response.json(); // Returns { path: "..." }
};

export const createEvent = async (event: Partial<WavEvent>, token?: string) => {
    console.log(`[createEvent] Creating new event: "${event.title}"`);
    
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
      console.error(`[createEvent] Server returned error: ${errorText}`);
      throw new Error(`Failed to create event: ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`[createEvent] ✅ Event created successfully.`);
    
    return result.event;
};

/**
 * HARDCODED CATEGORIES (Frontend-only due to Supabase middleware issue)
 * 
 * These are the 7 core categories from the Masterplan Híbrido ABC.
 * They are stored client-side to bypass Supabase Edge Function authentication
 * issues that block any endpoint containing "categories" in the URL.
 */
const HARDCODED_CATEGORIES: EventCategory[] = [
  {
    id: 'activaciones-de-marca',
    label: 'Activaciones de Marca',
    description: 'Experiencias inmersivas que conectan marcas con audiencias en tiempo real',
    seoDescription: 'Descubre nuestras activaciones de marca: experiencias inmersivas que conectan marcas con audiencias en tiempo real mediante tecnología y creatividad de vanguardia.',
    keywords: ['activacion', 'marca', 'experiencial', 'inmersivo', 'engagement'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'eventos-corporativos',
    label: 'Eventos Corporativos',
    description: 'Conferencias, lanzamientos y experiencias empresariales de alto impacto',
    seoDescription: 'Creamos eventos corporativos de alto impacto: conferencias, lanzamientos de producto y experiencias empresariales que transforman objetivos de negocio en momentos memorables.',
    keywords: ['corporativo', 'conferencia', 'lanzamiento', 'empresa', 'b2b'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'instalaciones-interactivas',
    label: 'Instalaciones Interactivas',
    description: 'Arte digital, mapping y escenografías que transforman espacios',
    seoDescription: 'Instalaciones interactivas que combinan arte digital, video mapping y escenografías innovadoras para transformar espacios en experiencias inmersivas únicas.',
    keywords: ['instalacion', 'interactivo', 'mapping', 'arte digital', 'escenografia'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'festivales-y-musica',
    label: 'Festivales y Música',
    description: 'Escenarios, audiovisual en vivo y experiencias musicales',
    seoDescription: 'Diseño y producción de festivales y experiencias musicales: escenarios innovadores, audiovisual en vivo y tecnología de vanguardia para eventos memorables.',
    keywords: ['festival', 'musica', 'concierto', 'escenario', 'audiovisual'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'retail-experience',
    label: 'Retail Experience',
    description: 'Puntos de venta, pop-ups y experiencias de compra innovadoras',
    seoDescription: 'Transformamos el retail con experiencias innovadoras: puntos de venta interactivos, pop-up stores y estrategias que conectan productos con consumidores.',
    keywords: ['retail', 'punto de venta', 'pop-up', 'compra', 'comercio'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'arte-y-cultura',
    label: 'Arte y Cultura',
    description: 'Exposiciones, galerías y proyectos culturales',
    seoDescription: 'Proyectos de arte y cultura que fusionan creatividad y tecnología: exposiciones inmersivas, galerías digitales y experiencias culturales innovadoras.',
    keywords: ['arte', 'cultura', 'exposicion', 'galeria', 'museo'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'tech-y-innovacion',
    label: 'Tech y Innovación',
    description: 'AR/VR, AI, data viz y experiencias tecnológicas de vanguardia',
    seoDescription: 'Experiencias tecnológicas de vanguardia: realidad aumentada, realidad virtual, inteligencia artificial y visualización de datos para proyectos innovadores.',
    keywords: ['tecnologia', 'innovacion', 'ar', 'vr', 'ai', 'realidad aumentada', 'realidad virtual'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  }
];

export const getCategories = async () => {
  console.group("📂 [API] getCategories()");
  console.log("⚡ Using HARDCODED categories (frontend-only) due to Supabase middleware blocking backend endpoints");
  console.log(`✅ Returning ${HARDCODED_CATEGORIES.length} hardcoded categories`);
  console.groupEnd();
  
  // Return a copy to prevent mutations
  return Promise.resolve([...HARDCODED_CATEGORIES]);
};

export const clearAllEvents = async (token?: string) => {
    console.log(`[clearAllEvents] ⚠️ CLEARING ALL EVENTS FROM DATABASE`);
    
    const response = await fetch(`${BASE_URL}/events/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token || publicAnonKey}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[clearAllEvents] Server returned error: ${errorText}`);
      throw new Error(`Failed to clear events: ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`[clearAllEvents] ✅ All events cleared from database.`);
    
    return result;
};