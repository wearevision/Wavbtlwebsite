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
  id?: string;
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
  summary?: string; // Used for SEO Meta Description
  
  // Extended Content Fields
  highlights?: string[];
  keywords?: string[];
  hashtags?: string[]; // General hashtags
  
  // Social Media Content
  instagram_hook?: string;
  instagram_body?: string;
  instagram_closing?: string;
  instagram_hashtags?: string;
  
  linkedin_post?: string;
  linkedin_article?: string;
  
  // Alternatives
  alt_title_1?: string;
  alt_title_2?: string;
  alt_instagram?: string;
  alt_summary_1?: string;
  alt_summary_2?: string;

  // Editorial
  tone?: string;
  audience?: string;

  // SEO Extended
  seo_title?: string;
  seo_description?: string;
  tags?: string[];

  // Identification & Location
  client?: string;
  year?: string | number;
  month?: string | number;
  country?: string;
  city?: string;
  venue?: string;
  subcategory?: string;

  // Performance
  people_reached?: string;
  attendees?: string;
  days?: string | number;
  cities?: string | number;
  screens?: string | number;
  kpis?: string[];
  results_notes?: string;

  category?: string;
  [key: string]: any;
}
