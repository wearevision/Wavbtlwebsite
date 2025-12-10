import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

import { MediaGallery } from './MediaGallery';
import { TrapezoidBadge } from './TrapezoidBadge';
import { CircularNavButton } from './CircularNavButton';

import { WavEvent, WavMedia } from '../../types';
import { useFocusTrap } from '../../src/hooks/useFocusTrap';
import { useSwipe } from '../../src/hooks/useSwipe';
import { useKeyboardNav } from '../../src/hooks/useKeyboardNav';
import { useResponsive } from '../../src/hooks/useResponsive';
import { Z_INDEX } from '../../lib/constants/zIndex';

/* -------------------------------------------------------------------------- */
/*                        ANIMATION VARIANTS - APPLE STYLE                   */
/* -------------------------------------------------------------------------- */

// ===== CONFIGURACIÓN DE TIEMPOS =====
const MODAL_DURATION = 1.0; // Modal se desenmascara en 1 segundo
const GALLERY_START = 0.5; // Galería empieza al 50% del modal (0.5s)
const GALLERY_DURATION = 0.8; // Galería se desenmascara en 0.8s
const CONTENT_START = 0.65; // Contenido empieza al 65% del modal (0.65s)
const CONTENT_DURATION = 0.6; // Cada campo dura 0.6s
const CONTENT_STAGGER = 0.65; // Siguiente empieza al 65% del anterior (0.65 × 0.6 = 0.39s)

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Expo Out (Apple-style)

// BACKDROP: Fade in/out suave
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: EASE
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.6, 
      ease: EASE
    }
  }
};

// MODAL CONTAINER: Desenmascaramiento de izquierda a derecha (wipe effect)
const modalContainerVariants = {
  hidden: { 
    clipPath: 'inset(0 100% 0 0)', // Oculto (máscara derecha cubriendo todo)
    opacity: 1
  },
  visible: { 
    clipPath: 'inset(0 0% 0 0)', // Visible (máscara desaparece)
    opacity: 1,
    transition: { 
      clipPath: {
        duration: MODAL_DURATION,
        ease: EASE
      },
      opacity: {
        duration: 0.01 // Instantáneo
      }
    }
  },
  exit: { 
    opacity: 0, // Solo fade out
    transition: { 
      duration: 0.6, 
      ease: EASE
    } 
  }
};

// MEDIA GALLERY: Desenmascaramiento desde izquierda (empieza al 50% del modal)
const mediaGalleryVariants = {
  hidden: { 
    clipPath: 'inset(0 100% 0 0)', // Oculto
    opacity: 1
  },
  visible: { 
    clipPath: 'inset(0 0% 0 0)', // Visible
    opacity: 1,
    transition: { 
      clipPath: {
        duration: GALLERY_DURATION,
        ease: EASE,
        delay: GALLERY_START // Empieza al 50% del modal
      },
      opacity: {
        duration: 0.01
      }
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// MOBILE: Media Container - Entra desde arriba hacia abajo con diagonal
const mobileMediaVariants = {
  hidden: { 
    y: -100,
    opacity: 0
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: EASE,
      delay: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// CONTENT FIELDS: Entrada sutil con movimiento pequeño y opacidad
// Cada uno empieza al 65% del avance del anterior
const contentFieldVariants = {
  hidden: { 
    y: 12, // Movimiento sutil (12px)
    opacity: 0 
  },
  visible: (index: number) => {
    // index: 0=categoría, 1=marca, 2=título, 3=párrafo, 4=año
    const delay = CONTENT_START + (index * CONTENT_DURATION * CONTENT_STAGGER);
    return {
      y: 0, 
      opacity: 1,
      transition: { 
        duration: CONTENT_DURATION,
        ease: EASE,
        delay: delay
      }
    };
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// MOBILE CONTENT FIELDS: Versión simplificada para mobile (más rápido, menos delay)
const mobileContentFieldVariants = {
  hidden: { 
    y: 8, // Movimiento más sutil en mobile (8px)
    opacity: 0 
  },
  visible: (index: number) => {
    // Stagger más rápido en mobile: 0.15s entre campos
    const delay = 0.3 + (index * 0.15);
    return {
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: EASE,
        delay: delay
      }
    };
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// CLOSE BUTTON: Aparece al final
const closeButtonVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: EASE,
      delay: CONTENT_START + (4 * CONTENT_DURATION * CONTENT_STAGGER) + 0.2 // Después de todos los campos
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// GRADIENT OVERLAYS: Aparecen con el contenido
const gradientVariants = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: EASE,
      delay: CONTENT_START
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                   MODAL                                    */
/* -------------------------------------------------------------------------- */

interface ModalProps {
  event: WavEvent;
  onClose: () => void;
  isMobile: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ event, onClose, isMobile, onNext, onPrev }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  /* Safe gallery */
  const safeGallery: WavMedia[] =
    event?.gallery?.length
      ? event.gallery
      : [{ id: 'fallback', type: 'image', url: event.image }];

  // Hook responsive con width
  const { width } = useResponsive();
  
  // REGLA CRÍTICA CON BREAKPOINT FIJO:
  // Width ≤ 1023px: Stack vertical (imagen arriba con diagonal)
  // Width ≥ 1024px: Side-by-side (imagen izquierda sin diagonal)
  const useStackedLayout = width <= 1023;

  useEffect(() => setGalleryIndex(0), [event]);
  useFocusTrap(containerRef, onClose);
  
  // Swipe gestures for mobile navigation
  useSwipe(containerRef, { 
    onSwipeLeft: onNext,
    onSwipeRight: onPrev 
  });

  // Keyboard navigation (Arrow keys + Escape) with visual feedback
  const keyPressed = useKeyboardNav({
    onNext,
    onPrev,
    onClose,
    enabled: true
  });

  // Body Scroll Lock
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((p) => (p + 1) % safeGallery.length);
  };

  return (
    <motion.div
      className={clsx(
        "fixed inset-0",
        Z_INDEX.MODAL_CONTENT,
        // ≤1023px: No flex, overflow-y-auto para scroll
        useStackedLayout && "overflow-y-auto",
        // ≥1024px: Flex para centrar, sin overflow-y
        !useStackedLayout && "flex items-center justify-center overflow-hidden"
      )}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
      style={{ pointerEvents: 'auto' }}
    >
      {/* BACKDROP - ELIMINADO backdrop-blur (solo en Wall en App.tsx) */}
      <motion.div
        className={clsx(
          "fixed inset-0 bg-black/40",
          Z_INDEX.MODAL_BACKDROP
        )}
        onClick={onClose}
        variants={backdropVariants}
        style={{ pointerEvents: 'auto' }}
      />

      {/* CARD CONTAINER - Layout basado en breakpoint 1024px */}
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative bg-black",
          Z_INDEX.MODAL_CONTENT,
          // ≤1023px: Stack vertical, full width, full screen
          useStackedLayout && "w-full min-h-screen flex flex-col",
          // ≥1024px: Side-by-side, contenido y cinematográfico
          // Objetivo: 60vw × 60vh | Máximo: 90vw × 80vh
          !useStackedLayout && "w-[60vw] max-w-[90vw] h-[60vh] max-h-[80vh] min-h-0 flex flex-row overflow-hidden"
        )}
        variants={modalContainerVariants}
      >
        
        {/* CLOSE BUTTON - Gira 90° como animación */}
        <motion.button
          onClick={onClose}
          variants={closeButtonVariants}
          className={clsx(
            "z-[70] p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-white hover:text-black transition-colors",
            // Mobile: Fixed top-right
            "fixed top-6 right-6",
            // Desktop: Absolute top-right
            "lg:absolute lg:top-6 lg:right-6 lg:p-2"
          )}
          aria-label="Close modal"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={isMobile ? 24 : 20} />
        </motion.button>

        {/* MEDIA GALLERY - Portrait: Arriba con diagonal | Landscape: Izquierda sin diagonal */}
        <motion.div 
          variants={useStackedLayout ? mobileMediaVariants : mediaGalleryVariants}
          className={clsx(
            "relative shrink-0 bg-neutral-900 overflow-hidden",
            // PORTRAIT: Imagen arriba, 45-55% altura vertical, diagonal inferior
            useStackedLayout && "w-full h-[50vh] clip-mobile-media",
            // LANDSCAPE: Imagen izquierda, 45% ancho, sin diagonal
            !useStackedLayout && "w-[45%] h-full"
          )}
        >
          <MediaGallery
            gallery={safeGallery}
            className="w-full h-full"
            currentIndex={galleryIndex}
            onIndexChange={setGalleryIndex}
          />

          {/* Gallery Navigation (Overlay) */}
          {safeGallery.length > 1 && (
            <button
              onClick={nextImg}
              className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-8 p-2 text-white/80 hover:text-white hover:scale-110 transition-all drop-shadow-lg z-20"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}
        </motion.div>

        {/* GRADIENT OVERLAYS - FIXED al modal (fuera del scroll) */}
        {!useStackedLayout && (
          <>
            {/* Top Gradient: Negro → Transparente */}
            <motion.div 
              className="absolute top-0 right-0 w-[55%] h-20 bg-gradient-to-b from-black to-transparent pointer-events-none z-20"
              aria-hidden="true"
              variants={gradientVariants}
            />
            
            {/* Bottom Gradient: Transparente → Negro */}
            <motion.div 
              className="absolute bottom-0 right-0 w-[55%] h-20 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"
              aria-hidden="true"
              variants={gradientVariants}
            />
          </>
        )}

        {/* RIGHT COLUMN: CONTENT - Sistema de proporciones consistente + Safe Areas iOS */}
        <div 
          className={clsx(
            "relative flex flex-col",
            // PORTRAIT: Full width, dark background, scrollable
            useStackedLayout && "w-full bg-black/90 px-6 py-8 overflow-y-auto",
            // LANDSCAPE: 55% width, full height, scrollable
            !useStackedLayout && "w-[55%] h-full bg-transparent px-10 py-10 lg:px-12 lg:py-12 overflow-y-auto custom-scroll-modal"
          )}
          style={{
            // Safe area para iOS: Solo en portrait (móvil/tablet vertical)
            paddingBottom: useStackedLayout 
              ? 'calc(5rem + env(safe-area-inset-bottom))' 
              : undefined
          }}
        >
          
          {/* HEADER: Category Badge - Altura fija */}
          {event.category && (
            <motion.div 
              variants={useStackedLayout ? mobileContentFieldVariants : contentFieldVariants}
              custom={0} // index 0: Categoría
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-4 md:mb-5 lg:mb-6 flex shrink-0"
            >
              <TrapezoidBadge
                label={event.category}
                size="sm"
                variant="white"
              />
            </motion.div>
          )}

          {/* BRAND/LOGO - Altura fija */}
          <motion.div 
            variants={useStackedLayout ? mobileContentFieldVariants : contentFieldVariants}
            custom={1} // index 1: Marca
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-6 md:mb-7 lg:mb-8 shrink-0"
          >
            {event.logo ? (
              <img 
                src={event.logo} 
                alt={`${event.brand} Logo`} 
                className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest text-white block">
                {event.brand}
              </span>
            )}
          </motion.div>

          {/* TITLE - Tipografía fluida con clamp() */}
          <motion.h1 
            variants={useStackedLayout ? mobileContentFieldVariants : contentFieldVariants}
            custom={2} // index 2: Título
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-black uppercase tracking-tight leading-[0.95] text-balance text-white mb-6 md:mb-7 lg:mb-8 shrink-0"
            style={{ 
              fontSize: 'clamp(26px, 4vw, 27px)',
              maxWidth: '90%' 
            }}
          >
            {event.title}
          </motion.h1>

          {/* DESCRIPTION (Párrafo) - Flex-grow para ocupar espacio disponible */}
          <motion.div 
            variants={useStackedLayout ? mobileContentFieldVariants : contentFieldVariants}
            custom={3} // index 3: Párrafo
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-grow mb-6 md:mb-8 lg:mb-10"
          >
            <p className="text-sm md:text-base lg:text-lg text-neutral-300 leading-relaxed font-light whitespace-pre-wrap">
              {event.description}
            </p>
          </motion.div>
          
          {/* METADATA GRID (Año) - Altura fija al final */}
          <motion.div 
            variants={useStackedLayout ? mobileContentFieldVariants : contentFieldVariants}
            custom={4} // index 4: Año
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 gap-8 shrink-0 mt-auto"
          >
            <div>
              <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Año</h3>
              <span className="text-xs md:text-sm lg:text-base text-white font-light">{event.year || new Date().getFullYear()}</span>
            </div>
            {event.venue && (
              <div>
                <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Lugar</h3>
                <span className="text-xs md:text-sm lg:text-base text-white font-light">{event.venue}</span>
              </div>
            )}
          </motion.div>

        </div>

      </motion.div>

      {/* NAVIGATION ARROWS - Desktop & Mobile - CIRCULAR BUTTONS */}
      {onNext && onPrev && (
        <>
          {/* Previous Button */}
          <CircularNavButton
            direction="prev"
            position="left"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            ariaLabel="Previous event"
            isActive={keyPressed === 'left'}
          />

          {/* Next Button */}
          <CircularNavButton
            direction="next"
            position="right"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            ariaLabel="Next event"
            isActive={keyPressed === 'right'}
          />
        </>
      )}
    </motion.div>
  );
};