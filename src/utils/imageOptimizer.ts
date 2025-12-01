/**
 * WAV BTL Image Optimizer
 * 
 * Supabase Storage Image Transformation API
 * Docs: https://supabase.com/docs/guides/storage/serving/image-transformations
 * 
 * Genera URLs optimizadas con:
 * - Formato WebP (70-90% más liviano que JPEG/PNG)
 * - Crop automático (cover/contain/fill)
 * - Resize inteligente
 * - Quality adaptativo
 */

export type ImageFit = 'cover' | 'contain' | 'fill';
export type ImageFormat = 'webp' | 'avif' | 'origin';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
  resize?: ImageFit;
}

/**
 * Optimiza una URL de Supabase Storage con transformaciones automáticas
 * 
 * @param url - URL original de Supabase Storage
 * @param options - Opciones de optimización
 * @returns URL transformada con parámetros de optimización
 * 
 * @example
 * ```ts
 * // Tile optimizado (crop cover, aspect 1.6:1)
 * optimizeImage(url, { width: 600, height: 375, quality: 70 })
 * 
 * // Modal hero (contain, alta calidad)
 * optimizeImage(url, { width: 1200, quality: 85, resize: 'contain' })
 * ```
 */
export const optimizeImage = (
  url: string,
  options: ImageOptimizationOptions = {}
): string => {
  // Si no es una URL de Supabase Storage, retornar sin modificar
  if (!url || !url.includes('supabase.co/storage')) {
    return url;
  }

  const {
    width,
    height,
    quality = 75,
    format = 'webp',
    resize = 'cover'
  } = options;

  // Construir parámetros de transformación
  const params = new URLSearchParams();

  if (width) params.set('width', width.toString());
  if (height) params.set('height', height.toString());
  params.set('quality', quality.toString());
  params.set('format', format);
  params.set('resize', resize);

  // Detectar si la URL ya tiene parámetros
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}${params.toString()}`;
};

/**
 * Preset para Tiles del Mosaic Wall
 * - Sizes aligned with user request: 320px (mobile), 768px (tablet), 1024px (desktop)
 * - Quality: 65% (Aggressive optimization as requested)
 */
export const optimizeForTile = (
  url: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const sizes = {
    small: { width: 320, height: 200 },    // Mobile thumbnail
    medium: { width: 600, height: 375 },   // Tablet / Standard
    large: { width: 800, height: 500 }     // Desktop
  };

  const { width, height } = sizes[size];

  return optimizeImage(url, {
    width,
    height,
    quality: 65, // User requested 60-70
    resize: 'cover',
    format: 'webp'
  });
};

/**
 * Preset para Modal Hero Image
 * - Sizes aligned with user request: 768px, 1280px, 1600px
 */
export const optimizeForModal = (
  url: string,
  size: 'mobile' | 'tablet' | 'desktop' | 'xl' = 'desktop'
): string => {
  const configs = {
    mobile: { width: 600, height: 750, quality: 70 },    // Mobile
    tablet: { width: 768, height: 960, quality: 70 },    // Tablet
    desktop: { width: 1280, height: 1600, quality: 75 }, // Desktop
    xl: { width: 1600, height: 2000, quality: 75 }       // Large Screens
  };

  // Fallback for the 'size' parameter if it comes from old code
  const config = configs[size] || configs['desktop'];
  const { width, height, quality } = config;

  return optimizeImage(url, {
    width,
    height,
    quality,
    resize: 'cover',
    format: 'webp'
  });
};

/**
 * Preset para Thumbnails (EventBarCard, Admin, etc)
 */
export const optimizeForThumbnail = (url: string): string => {
  return optimizeImage(url, {
    width: 320,
    height: 320,
    quality: 60,
    resize: 'cover',
    format: 'webp'
  });
};

/**
 * Genera srcSet responsive para <img>
 */
export const generateSrcSet = (
  url: string,
  type: 'tile' | 'modal' | 'thumbnail' = 'tile'
): string => {
  if (type === 'tile') {
    return [
      `${optimizeForTile(url, 'small')} 320w`,
      `${optimizeForTile(url, 'medium')} 600w`,
      `${optimizeForTile(url, 'large')} 800w`
    ].join(', ');
  }

  if (type === 'modal') {
    return [
      `${optimizeForModal(url, 'mobile')} 600w`,
      `${optimizeForModal(url, 'tablet')} 768w`,
      `${optimizeForModal(url, 'desktop')} 1280w`,
      `${optimizeForModal(url, 'xl')} 1600w`
    ].join(', ');
  }

  // thumbnail (single size)
  return optimizeForThumbnail(url);
};

/**
 * Calcula peso estimado de una imagen optimizada (aprox.)
 * WebP reduce ~70-80% vs JPEG original
 */
export const estimateImageSize = (
  width: number,
  height: number,
  quality: number
): number => {
  // Fórmula aproximada: pixels * quality * 0.1 bytes (WebP comprimido)
  const pixels = width * height;
  const qualityFactor = quality / 100;
  const baseSize = pixels * 0.1 * qualityFactor;
  
  return Math.round(baseSize / 1024); // KB
};

/**
 * Debug: Imprime info de optimización
 */
export const debugImageOptimization = (url: string, options: ImageOptimizationOptions) => {
  const optimized = optimizeImage(url, options);
  const size = estimateImageSize(
    options.width || 600,
    options.height || 375,
    options.quality || 75
  );

  console.group('🖼️ Image Optimization');
  console.log('Original:', url);
  console.log('Optimized:', optimized);
  console.log('Estimated Size:', `~${size}KB`);
  console.log('Config:', options);
  console.groupEnd();
};

/**
 * Procesa un archivo para upload (usado en Admin Panel)
 * Renombra, comprime y prepara el archivo antes de subirlo a Supabase
 * 
 * @param file - Archivo original del input
 * @param slug - Slug del evento (para naming)
 * @param type - Tipo de media ('cover' | 'gallery' | 'logo')
 * @param index - Índice para items de galería
 * @returns File procesado listo para upload
 */
export const processFileForUpload = async (
  file: File,
  slug: string,
  type: 'cover' | 'gallery' | 'logo',
  index?: number
): Promise<File> => {
  // Generar nombre del archivo
  const timestamp = Date.now();
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  
  let fileName: string;
  if (type === 'cover') {
    fileName = `${slug}-cover.${extension}`;
  } else if (type === 'logo') {
    fileName = `${slug}-logo.${extension}`;
  } else {
    // gallery
    fileName = `${slug}-gallery-${index || 1}.${extension}`;
  }

  // Crear nuevo File con nombre correcto
  // Nota: La compresión real la hace Supabase on-the-fly con los parámetros de URL
  // Aquí solo renombramos el archivo para mantener convención de nombres
  const processedFile = new File([file], fileName, { type: file.type });

  return processedFile;
};