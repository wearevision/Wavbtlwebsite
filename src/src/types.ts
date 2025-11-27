export type ColorMode = 'monochrome' | 'neon' | 'duotone' | 'glass';

export interface WavEvent {
  brand: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  id?: string;
  summary?: string; // Used for SEO Meta Description
  
  // Extended Content Fields
  slug?: string;
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

  category?: string;
  imagePath?: string;
  logoPath?: string;
  [key: string]: any;
}
