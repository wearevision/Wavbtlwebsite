import { useState, useEffect } from 'react';

/**
 * Screen types basados en WAV BTL Guidelines V2.3+ (Consolidated)
 * 
 * Mobile:  ≤1023px  (desde 0px hasta 1023px) - Stack Layout
 * Desktop: ≥1024px  (desde 1024px hasta infinito) - Side-by-side Layout
 * 
 * Nota: Sistema consolidado en 1024px como breakpoint único.
 *       Alineado con Tailwind 'lg:' (1024px) y Guidelines (>1024px = desktop).
 */
export type ScreenType = 'mobile' | 'desktop';

/**
 * Orientation types basados en aspect ratio
 * 
 * Portrait:  height > width (más alto que ancho)
 * Landscape: width > height (más ancho que alto)
 * Square:    width === height (raro, pero posible)
 */
export type Orientation = 'portrait' | 'landscape' | 'square';

interface ResponsiveState {
  screenType: ScreenType;
  isMobile: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  orientation: Orientation;
  isPortrait: boolean;
  isLandscape: boolean;
}

/**
 * Hook para detección inteligente de breakpoints
 * 
 * Sistema consolidado con breakpoint único en 1024px:
 * - Mobile (≤1023px): Stack layout, vertical flow, swipe navigation
 * - Desktop (≥1024px): Side-by-side layout, cinematográfico (60vw×60vh)
 * 
 * @returns {ResponsiveState} Estado con información del dispositivo
 * 
 * @example
 * const { screenType, isMobile, isDesktop, width } = useResponsive();
 * 
 * if (isMobile) {
 *   // Lógica mobile (stack layout)
 * } else {
 *   // Lógica desktop (side-by-side)
 * }
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    // SSR-safe: Devuelve desktop por defecto en servidor
    if (typeof window === 'undefined') {
      return {
        screenType: 'desktop',
        isMobile: false,
        isDesktop: true,
        width: 1440,
        height: 900,
        orientation: 'landscape',
        isPortrait: false,
        isLandscape: true
      };
    }

    // Cliente: Calcula el estado inicial
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenType = getScreenType(width);
    const orientation = getOrientation(width, height);
    
    return {
      screenType,
      isMobile: screenType === 'mobile',
      isDesktop: screenType === 'desktop',
      width,
      height,
      orientation,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape'
    };
  });

  useEffect(() => {
    // Función para actualizar el estado
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenType = getScreenType(width);
      const orientation = getOrientation(width, height);
      
      setState({
        screenType,
        isMobile: screenType === 'mobile',
        isDesktop: screenType === 'desktop',
        width,
        height,
        orientation,
        isPortrait: orientation === 'portrait',
        isLandscape: orientation === 'landscape'
      });
    };

    // Ejecutar inmediatamente para sincronizar con el DOM
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}

/**
 * Calcula el tipo de pantalla basado en el ancho
 * 
 * Breakpoint único: 1024px
 * - Mobile: ≤1023px (Stack layout)
 * - Desktop: ≥1024px (Side-by-side layout)
 * 
 * @param width - Ancho de la ventana en píxeles
 * @returns {ScreenType} Tipo de pantalla
 */
function getScreenType(width: number): ScreenType {
  return width <= 1023 ? 'mobile' : 'desktop';
}

/**
 * Calcula la orientación basada en el ancho y alto
 * 
 * @param width - Ancho de la ventana en píxeles
 * @param height - Alto de la ventana en píxeles
 * @returns {Orientation} Orientación de la pantalla
 */
function getOrientation(width: number, height: number): Orientation {
  if (height > width) {
    return 'portrait';
  } else if (width > height) {
    return 'landscape';
  } else {
    return 'square';
  }
}

/**
 * Hook simplificado que solo devuelve el tipo de pantalla
 * 
 * @returns {ScreenType} Tipo de pantalla actual
 * 
 * @example
 * const screenType = useScreenType();
 * 
 * switch (screenType) {
 *   case 'mobile':
 *     return <MobileLayout />;
 *   case 'desktop':
 *     return <DesktopLayout />;
 * }
 */
export function useScreenType(): ScreenType {
  const { screenType } = useResponsive();
  return screenType;
}