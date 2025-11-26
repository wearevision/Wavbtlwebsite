export type ColorMode = 'monochrome' | 'neon' | 'duotone' | 'glass';

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
  
  [key: string]: any;
}
