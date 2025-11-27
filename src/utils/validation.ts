// WAV BTL - Event Validation System
// Ensures all events conform to WavEvent schema before saving

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// NOTE: Slug generation is now handled by the universal module /utils/slug.ts
// Do NOT duplicate slug logic here. Import { generateSlug } from './slug' instead.

// Validate URL format
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Validate required fields
export function validateEvent(event: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Brand validation
  if (!event.brand || event.brand.trim().length === 0) {
    errors.push({ field: 'brand', message: 'La marca es obligatoria' });
  } else if (event.brand.length > 50) {
    errors.push({ field: 'brand', message: 'Máximo 50 caracteres' });
  }

  // Title validation
  if (!event.title || event.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'El título es obligatorio' });
  } else if (event.title.length > 100) {
    errors.push({ field: 'title', message: 'Máximo 100 caracteres' });
  } else if (event.title.length < 5) {
    errors.push({ field: 'title', message: 'Mínimo 5 caracteres' });
  }

  // Description validation
  if (!event.description || event.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'La descripción es obligatoria' });
  } else if (event.description.length > 1000) {
    errors.push({ field: 'description', message: 'Máximo 1000 caracteres' });
  } else if (event.description.length < 20) {
    errors.push({ field: 'description', message: 'Mínimo 20 caracteres' });
  }

  // Image validation (main image)
  if (!event.image || event.image.trim().length === 0) {
    errors.push({ field: 'image', message: 'La imagen principal es obligatoria' });
  } else if (!isValidUrl(event.image)) {
    errors.push({ field: 'image', message: 'URL de imagen inválida' });
  }

  // Gallery validation (must be array)
  if (!Array.isArray(event.gallery)) {
    errors.push({ field: 'gallery', message: 'Gallery debe ser un array' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Check for forbidden fields
export function hasOnlyAllowedFields(event: any): string[] {
  // STRICT WavEvent schema - Updated to include storage paths and category
  const allowedFields = new Set([
    'id',
    'brand',
    'title',
    'description',
    'image',
    'slug',
    'gallery',
    'logo',
    'category',
    'imagePath',
    'logoPath',
    'summary',
    
    // Extended Fields
    'highlights',
    'keywords',
    'hashtags',
    'instagram_hook',
    'instagram_body',
    'instagram_closing',
    'instagram_hashtags',
    'linkedin_post',
    'linkedin_article',
    'alt_title_1',
    'alt_title_2',
    'alt_instagram'
  ]);

  const forbiddenFields: string[] = [];
  
  for (const key in event) {
    if (!allowedFields.has(key)) {
      forbiddenFields.push(key);
    }
  }

  return forbiddenFields;
}

// Character count helpers
export function getCharCount(text: string): number {
  return text?.length || 0;
}

export function getCharCountStatus(
  current: number,
  min: number,
  max: number
): 'error' | 'warning' | 'success' {
  if (current < min || current > max) return 'error';
  if (current > max * 0.9) return 'warning'; // 90% of max
  return 'success';
}

// Field tooltips
export const FIELD_TOOLTIPS = {
  brand: 'Nombre de la marca o cliente del proyecto (máx. 50 caracteres)',
  title: 'Título descriptivo del evento o campaña (5-100 caracteres)',
  description: 'Descripción detallada del proyecto BTL (20-1000 caracteres)',
  image: 'URL de la imagen principal del evento (obligatorio, formato HTTPS)',
  slug: 'Identificador único generado automáticamente desde marca + título',
  gallery: 'Galería multimedia con imágenes y videos del proyecto',
  logo: 'Logo de la marca en PNG o SVG con transparencia (opcional)'
};