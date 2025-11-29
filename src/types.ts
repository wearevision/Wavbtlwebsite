// Removed: Only Monochrome mode is used now
// export type ColorMode = 'monochrome';

export type MediaType = 'image' | 'video';

export interface WavMedia {
  id: string;
  type: MediaType;
  url: string;
  path?: string; // Storage path for generating signed URLs
  thumbnail?: string; // Optional thumbnail for videos
}

export interface WavEvent {
  id: string;
  brand: string;
  title: string;
  description: string;
  
  // Main cover image (used for the Wall tile)
  image: string; 
  imagePath?: string;

  logo?: string;
  logoPath?: string;

  // Detailed gallery for the Modal
  gallery?: WavMedia[];

  slug?: string;
  
  // Extended Identification
  client?: string;
  category?: string;
  subcategory?: string;
  year?: number;
  month?: number;
  country?: string;
  city?: string;
  venue?: string;

  // Extended Visuals
  og_image?: string;

  // Extended Content
  summary?: string;
  highlights?: string[];
  tone?: string;
  audience?: string;

  // SEO & Metadata
  seo_title?: string;
  seo_description?: string;
  keywords?: string[];
  hashtags?: string[];
  tags?: string[];

  // Performance
  people_reached?: string;
  attendees?: string;
  days?: number;
  cities?: number;
  screens?: number;
  kpis?: string[];
  results_notes?: string;

  // Social Media
  instagram_hook?: string;
  instagram_body?: string;
  instagram_closing?: string;
  instagram_hashtags?: string;
  alt_instagram?: string;
  linkedin_post?: string;
  linkedin_article?: string;

  // A/B Testing
  alt_title_1?: string;
  alt_title_2?: string;
  alt_summary_1?: string;
  alt_summary_2?: string;
  
  [key: string]: any;
}
