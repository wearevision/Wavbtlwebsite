export type ColorMode = 'monochrome' | 'neon' | 'duotone' | 'glass';

export interface WavEvent {
  brand: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  id?: string;
  [key: string]: any;
}
