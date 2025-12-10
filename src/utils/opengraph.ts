/**
 * OpenGraph Metadata Generator
 * 
 * Generates complete OpenGraph metadata following best practices for:
 * - Facebook
 * - LinkedIn
 * - WhatsApp
 * - Twitter/X
 * - Discord
 * - Telegram
 * - And all other social platforms
 */

import { WavEvent } from '../types';

export interface OpenGraphMetadata {
  // Core OpenGraph
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:image:width'?: string;
  'og:image:height'?: string;
  'og:image:alt': string;
  'og:url': string;
  'og:type': string;
  'og:site_name': string;
  'og:locale': string;
  
  // Twitter Card
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
  'twitter:image:alt': string;
  
  // Additional metadata
  'article:published_time'?: string;
  'article:author'?: string;
  'article:tag'?: string;
}

/**
 * Generates complete OpenGraph metadata from a WavEvent
 * 
 * Best Practices:
 * - og:title: 60 characters max (but can be longer)
 * - og:description: 200 characters max (LinkedIn), 155 for SEO
 * - og:image: Minimum 600x315px, recommended 1200x630px
 * - twitter:card: Use "summary_large_image" for better engagement
 * 
 * @param event - The event to generate metadata for
 * @param baseUrl - The base URL of the website (e.g., "https://btl.wearevision.cl")
 * @returns Complete OpenGraph metadata object
 */
export function generateOpenGraphMetadata(
  event: WavEvent, 
  baseUrl: string = 'https://btl.wearevision.cl'
): OpenGraphMetadata {
  // Title: Use seo_title if available, fallback to title with brand
  const title = event.seo_title || `${event.brand} - ${event.title}`;
  
  // Description: Use seo_description if available, fallback to summary or description
  const description = event.seo_description || event.summary || event.description?.substring(0, 155) || '';
  
  // Image: Use og_image if available, fallback to cover image
  const image = event.og_image || event.image || '';
  
  // Image alt text: Use title or description
  const imageAlt = `${event.brand} - ${event.title}`;
  
  // URL: Build canonical URL from slug
  const url = event.slug ? `${baseUrl}/event/${event.slug}` : baseUrl;
  
  // Published time (if available)
  const publishedTime = event.year && event.month 
    ? new Date(event.year, getMonthNumber(event.month) - 1, 1).toISOString()
    : undefined;
  
  // Tags: Combine hashtags and keywords
  const tags = [
    ...(event.hashtags || []),
    ...(event.keywords || [])
  ].join(', ');

  return {
    // Core OpenGraph (Facebook, LinkedIn, WhatsApp, Telegram, Discord)
    'og:title': title.substring(0, 90), // Safe limit for all platforms
    'og:description': description.substring(0, 200), // LinkedIn accepts up to 200
    'og:image': image,
    'og:image:width': '1200', // Standard OG image size
    'og:image:height': '630',
    'og:image:alt': imageAlt,
    'og:url': url,
    'og:type': 'article', // Use 'article' for events/case studies
    'og:site_name': 'We Are Vision BTL',
    'og:locale': 'es_CL',
    
    // Twitter Card (Twitter/X specific)
    'twitter:card': 'summary_large_image', // Best for engagement
    'twitter:title': title.substring(0, 70), // Twitter truncates at ~70 chars
    'twitter:description': description.substring(0, 200),
    'twitter:image': image,
    'twitter:image:alt': imageAlt,
    
    // Article metadata (optional but recommended for SEO)
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(event.brand && { 'article:author': event.brand }),
    ...(tags && { 'article:tag': tags })
  };
}

/**
 * Converts month name (Spanish) to month number
 */
function getMonthNumber(month?: string | number): number {
  if (typeof month === 'number') return month;
  if (!month) return 1;
  
  const months: Record<string, number> = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
    'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
    'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
  };
  
  return months[month.toLowerCase()] || 1;
}

/**
 * Generates HTML meta tags string from OpenGraph metadata
 * Useful for SSR or generating static HTML
 */
export function generateMetaTags(metadata: OpenGraphMetadata): string {
  return Object.entries(metadata)
    .map(([property, content]) => {
      if (!content) return '';
      const prop = property.startsWith('twitter:') ? 'name' : 'property';
      return `<meta ${prop}="${property}" content="${escapeHtml(String(content))}" />`;
    })
    .filter(Boolean)
    .join('\n    ');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Validates if an OpenGraph image URL is valid
 * 
 * Requirements:
 * - Must be HTTPS (required by most platforms)
 * - Must be publicly accessible
 * - Should be a valid image format
 */
export function validateOpenGraphImage(imageUrl: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!imageUrl) {
    errors.push('Image URL is required');
    return { valid: false, errors };
  }
  
  // Must be HTTPS (WhatsApp, LinkedIn require it)
  if (!imageUrl.startsWith('https://')) {
    errors.push('Image URL must use HTTPS (required by WhatsApp, LinkedIn, Twitter)');
  }
  
  // Should not be localhost
  if (imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1')) {
    errors.push('Image URL must be publicly accessible (not localhost)');
  }
  
  // Should have valid image extension
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const hasValidExtension = validExtensions.some(ext => 
    imageUrl.toLowerCase().includes(ext)
  );
  
  if (!hasValidExtension) {
    errors.push('Image URL should have a valid image extension (.jpg, .png, .webp, etc.)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
