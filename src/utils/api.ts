import { events as staticEvents } from '../data/events';
import { projectId, publicAnonKey } from './supabase/info';
import { WavEvent } from '../types';
import { generateSlug } from './slug';
import womImg from "figma:asset/0e52bb6912d7d8e5b6797e64881620f5fd80deb3.png";
import altraImg from "figma:asset/29cd4a0251a94f11ff1fc14aa5794d250a39ccd2.png";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

// Image Overrides for specific brands/events (Client-side enforcement)
const IMAGE_OVERRIDES: Record<string, string> = {
  "wom": womImg,
  "altra running": altraImg,
  "altra": altraImg
};

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

  // 3. Normalize brand (max 50 characters)
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

  // 9. Build STRICT WavEvent with extended fields
  const normalized: any = {
    id,
    brand,
    title,
    description,
    image,
    slug,
    gallery,
    // Optional fields
    category: rawEvent.category || '',
    logo: logo,
    imagePath: rawEvent.imagePath,
    logoPath: rawEvent.logoPath
  };

  // Log if we're removing fields
  const allowedFields = ['id', 'brand', 'title', 'description', 'image', 'slug', 'gallery', 'logo', 'category', 'imagePath', 'logoPath'];
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
  
  // Check for image overrides
  let finalImage = optimizeUrl(data.image || data.imageUrl || FALLBACK_IMAGE);
  
  const lowerBrand = brand.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  if (IMAGE_OVERRIDES[lowerBrand]) {
    finalImage = IMAGE_OVERRIDES[lowerBrand];
  } else if (lowerTitle.includes('altra running') || lowerBrand.includes('altra')) {
    finalImage = IMAGE_OVERRIDES['altra'];
  }

  // Return STRICT WavEvent schema (Extended)
  return {
    id: data.id || crypto.randomUUID(),
    brand: brand,
    title: title,
    description: typeof data.description === 'string' ? data.description : 'No description available.',
    image: finalImage, // Fallback only for reading
    slug: data.slug || generateSlug(brand, title, data.id),
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    // Extended fields
    category: typeof data.category === 'string' ? data.category : '',
    logo: data.logo || '',
    imagePath: data.imagePath,
    logoPath: data.logoPath
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
      console.warn("⚠️ WARNING: Backend returned EMPTY array. Is the KV store empty?");
      console.warn("⚠️ Falling back to static events to prevent empty screen.");
      return staticEvents.map((e, i) => validateEvent(e, i));
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