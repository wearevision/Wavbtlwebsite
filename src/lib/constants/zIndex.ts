/**
 * WAV BTL Z-Index System
 * 
 * Jerarquía basada en Guidelines.md §5.2
 * 
 * Regla: NUNCA usar z-index hardcodeado en componentes.
 * Siempre importar de aquí.
 */

export const Z_INDEX = {
  // Base
  MOSAIC: 'z-0',
  
  // Middle layers
  TEXT_ROTATOR: 'z-10',
  CATEGORY_BADGE: 'z-20',
  
  // Overlays
  MODAL_BACKDROP: 'z-40',
  BLUR_OVERLAY: 'z-40',
  
  // Modal
  MODAL_CONTENT: 'z-50',
  
  // Navigation (según Guidelines.md debe ser z-55, NO z-60)
  CONTROLS: 'z-55',
  MENU_DROPDOWN: 'z-55',
  CLOSE_BUTTON: 'z-55',
  
  // System
  LOADER: 'z-100',
  TOAST: 'z-100',
} as const;

// Numeric values (para Motion z prop si es necesario)
export const Z_INDEX_NUMERIC = {
  MOSAIC: 0,
  TEXT_ROTATOR: 10,
  CATEGORY_BADGE: 20,
  MODAL_BACKDROP: 40,
  BLUR_OVERLAY: 40,
  MODAL_CONTENT: 50,
  CONTROLS: 55,
  MENU_DROPDOWN: 55,
  CLOSE_BUTTON: 55,
  LOADER: 100,
  TOAST: 100,
} as const;

export type ZIndexToken = keyof typeof Z_INDEX;
