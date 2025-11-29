/**
 * WAV BTL Safe Areas
 * 
 * Espacios seguros para contenido que no debe ser tapado por botones flotantes.
 * 
 * IMPORTANTE: Tailwind requiere clases completas en el código fuente.
 * Por eso exportamos strings completos con responsive variants incluidas.
 */

export const SAFE_AREAS = {
  // Top safe area (para evitar chocar con badges/close buttons)
  top: 'pt-16 md:pt-14 lg:pt-12',
  
  // Bottom safe area (para evitar que text se corte con navigation)
  bottom: 'pb-32 md:pb-28 lg:pb-24',
  
  // Horizontal safe area (para clip-path trapezoidal)
  horizontal: 'px-4 md:px-6 lg:px-10',
  
  // Combinaciones comunes
  topBottom: 'pt-16 md:pt-14 lg:pt-12 pb-32 md:pb-28 lg:pb-24',
  all: 'pt-16 md:pt-14 lg:pt-12 pb-32 md:pb-28 lg:pb-24 px-4 md:px-6 lg:px-10',
} as const;

export type SafeAreaToken = keyof typeof SAFE_AREAS;
