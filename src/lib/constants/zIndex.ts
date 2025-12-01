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
  MODAL_NAV_BUTTONS: 'z-[60]',
  MODAL_CLOSE_BUTTON: 'z-[70]',
  
  // Menu System (ALWAYS ON TOP - Above Modal)
  MENU_BACKDROP: 'z-[90]',
  MENU_DROPDOWN: 'z-[100]',
  CONTROLS: 'z-[110]',  // Buttons always accessible
  
  // System
  LOADER: 'z-[200]',
  TOAST: 'z-[200]',
} as const;

// Numeric values (para Motion z prop si es necesario)
export const Z_INDEX_NUMERIC = {
  MOSAIC: 0,
  TEXT_ROTATOR: 10,
  CATEGORY_BADGE: 20,
  MODAL_BACKDROP: 40,
  BLUR_OVERLAY: 40,
  MODAL_CONTENT: 50,
  MODAL_NAV_BUTTONS: 60,
  MODAL_CLOSE_BUTTON: 70,
  MENU_BACKDROP: 90,
  MENU_DROPDOWN: 100,
  CONTROLS: 110,
  LOADER: 200,
  TOAST: 200,
} as const;

export type ZIndexToken = keyof typeof Z_INDEX;