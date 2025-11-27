/**
 * Universal Slug Generation for WAV BTL
 * 
 * SINGLE SOURCE OF TRUTH for all slug generation in the project.
 * Used by both frontend and backend to ensure consistency.
 * 
 * Format: brand-title (kebab-case)
 * Example: "Nike Campaña 2025" → "nike-campana-2025"
 */

/**
 * Normalize special characters to ASCII equivalents
 */
const normalizeToAscii = (text: string): string => {
  const map: Record<string, string> = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
    'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
    'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
    'ã': 'a', 'õ': 'o', 'ñ': 'n', 'ç': 'c',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    'À': 'A', 'È': 'E', 'Ì': 'I', 'Ò': 'O', 'Ù': 'U',
    'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U',
    'Ä': 'A', 'Ë': 'E', 'Ï': 'I', 'Ö': 'O', 'Ü': 'U',
    'Ã': 'A', 'Õ': 'O', 'Ñ': 'N', 'Ç': 'C'
  };

  return text.split('').map(char => map[char] || char).join('');
};

/**
 * Convert text to kebab-case slug
 * 
 * Rules:
 * - Lowercase
 * - Normalize accents/tildes to ASCII
 * - Replace spaces with hyphens
 * - Remove all non-alphanumeric characters except hyphens
 * - Collapse multiple hyphens into one
 * - Trim leading/trailing hyphens
 * - Never return empty string (returns "slug" as fallback)
 * 
 * @param text - Raw text to slugify
 * @returns Kebab-case slug
 * 
 * @example
 * slugify("Campaña Inmersiva 2025") → "campana-inmersiva-2025"
 * slugify("Nike: Just Do It!") → "nike-just-do-it"
 */
export const slugify = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return 'slug';
  }

  return normalizeToAscii(text)
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start
    .replace(/-+$/, '')             // Trim hyphens from end
    || 'slug';                      // Fallback if result is empty
};

/**
 * Generate slug with brand prefix (Universal Format)
 * 
 * Format: brand-title
 * 
 * This is the ONLY function that should be used for generating event slugs
 * throughout the entire WAV BTL project (frontend + backend).
 * 
 * Rules:
 * - Always uses format: {brand}-{title}
 * - Both parts are slugified independently
 * - Empty brand defaults to "evento"
 * - Empty title defaults to provided ID or "sin-titulo"
 * - Never returns empty string
 * 
 * @param brand - Brand name (e.g., "Nike", "Coca-Cola")
 * @param title - Event title (e.g., "Campaña Inmersiva 2025")
 * @param eventId - Optional event ID for fallback
 * @returns Slug in format "brand-title"
 * 
 * @example
 * generateSlug("Nike", "Campaña Inmersiva 2025")
 * → "nike-campana-inmersiva-2025"
 * 
 * generateSlug("Coca-Cola", "Festival Innovación")
 * → "coca-cola-festival-innovacion"
 * 
 * generateSlug("", "Evento Sin Marca")
 * → "evento-evento-sin-marca"
 * 
 * generateSlug("Nike", "", "abc-123")
 * → "nike-abc-123"
 */
export const generateSlug = (brand: string, title: string, eventId?: string): string => {
  // Normalize inputs
  const brandText = (brand && typeof brand === 'string' && brand.trim()) ? brand.trim() : 'evento';
  const titleText = (title && typeof title === 'string' && title.trim()) 
    ? title.trim() 
    : (eventId || 'sin-titulo');

  // Generate individual slugs
  const brandSlug = slugify(brandText);
  const titleSlug = slugify(titleText);

  // Combine with hyphen
  const finalSlug = `${brandSlug}-${titleSlug}`;

  // Safety check: ensure we never return empty string
  return finalSlug || 'evento-sin-titulo';
};
