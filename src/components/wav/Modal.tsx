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
import { Z_INDEX } from '../../lib/constants/zIndex';

/* -------------------------------------------------------------------------- */
/*                        ANIMATION VARIANTS - APPLE STYLE                   */
/* -------------------------------------------------------------------------- */

// Duración total: 600ms (más lento, más elegante)
const DURATION = 0.6;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Expo Out (Apple-style)

// BACKDROP: Fade in/out PREVIO y POSTERIOR a las animaciones de contenido
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: EASE,
      // Entra ANTES que el contenido
      delay: 0
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.4, 
      ease: EASE,
      // Sale DESPUÉS que el contenido
      delay: 0.6
    }
  }
};

// MODAL CONTAINER: Desktop - Sin clip-path, rectangular simple
const modalContainerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: DURATION, 
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.08 // Más espaciado para 600ms
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    y: 20,
    transition: { 
      duration: DURATION, 
      ease: EASE,
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1 // Reversa en salida
    } 
  }
};

// MOBILE: Media Container - Entra desde arriba hacia abajo con diagonal
const mobileMediaVariants = {
  hidden: { 
    y: -100, // Desde arriba
    opacity: 0
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: EASE,
      delay: 0.2 // Después del backdrop
    }
  },
  exit: { 
    y: -100,
    opacity: 0,
    transition: { 
      duration: 0.6,
      ease: EASE
    }
  }
};

// MOBILE: Content elements - Secuencia: Categoría → Marca → Título → Párrafo → Año
const mobileContentVariants = {
  hidden: { 
    y: 20, // Desde arriba (más sutil que el media)
    opacity: 0 
  },
  visible: (delay: number) => ({ 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: EASE,
      delay: 0.8 + delay // Empieza después del media container
    }
  }),
  exit: (delay: number) => ({ 
    y: 20, 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE,
      delay: delay // Inverso
    }
  })
};

// DESKTOP: Media Gallery - Entra desde derecha desenmascarándose + Zoom In suave
const mediaGalleryVariants = {
  hidden: { 
    x: '30%', // Comienza desde derecha
    opacity: 0,
    scale: 1.15 // Zoom inicial
  },
  visible: { 
    x: 0, 
    opacity: 1,
    scale: 1, // Zoom in suave
    transition: { 
      duration: DURATION,
      ease: EASE
    }
  },
  exit: { 
    x: '30%',
    opacity: 0,
    scale: 1.15,
    transition: { 
      duration: DURATION,
      ease: EASE
    }
  }
};

// DESKTOP: Content elements - Entran de izquierda a derecha
const slideFromLeft = {
  hidden: { 
    x: -30, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: EASE
    }
  },
  exit: { 
    x: -30, 
    opacity: 0,
    transition: { 
      duration: 0.4,
      ease: EASE
    }
  }
};

// CLOSE BUTTON: Gira 90° sobre su eje
const closeButtonVariants = {
  hidden: { 
    rotate: -90,
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: EASE,
      delay: 0.2 // Entra último
    }
  },
  exit: { 
    rotate: 90,
    opacity: 0,
    scale: 0.8,
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
        "fixed inset-0 flex flex-col",
        Z_INDEX.MODAL_CONTENT,
        // Mobile/Tablet: Allow scroll on the overlay itself
        "overflow-y-auto",
        // Desktop: Hide overlay scroll (internal scroll takes over)
        "lg:overflow-hidden lg:items-center lg:justify-center"
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

      {/* CARD CONTAINER - Rectangular simple, sin clip-paths */}
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative w-full bg-black",
          // Mobile: Sin clip-path
          "min-h-screen lg:min-h-0",
          // Desktop: Rectangular simple
          "lg:max-w-5xl lg:h-[70vh] lg:overflow-hidden lg:flex lg:flex-row",
          Z_INDEX.MODAL_CONTENT
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

        {/* LEFT COLUMN: MEDIA GALLERY - Desktop rectangular / Mobile con diagonal */}
        <motion.div 
          variants={isMobile ? mobileMediaVariants : mediaGalleryVariants}
          className={clsx(
            "relative w-full shrink-0 bg-neutral-900 overflow-hidden",
            // Mobile: 4:5 Aspect Ratio con diagonal inferior
            "aspect-[4/5] md:h-[45vh] md:aspect-auto",
            isMobile && "clip-mobile-media", // ✅ Diagonal inferior 17° en mobile
            // Desktop: Full height, 45% width, sin diagonal
            "lg:w-[45%] lg:h-full"
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

        {/* RIGHT COLUMN: CONTENT - Mobile animaciones secuenciales */}
        <div className={clsx(
          "relative w-full flex flex-col",
          // Mobile: Flow content, padding, dark background
          "bg-black/90 p-8 pb-32",
          // Desktop: Full height, Scrollable, padding estándar
          "lg:w-[55%] lg:h-full lg:bg-transparent lg:pl-12 lg:pr-12 lg:py-12 lg:overflow-y-auto lg:custom-scroll-modal"
        )}>
          
          {/* HEADER: Category Badge */}
          {event.category && (
            <motion.div 
              variants={isMobile ? undefined : slideFromLeft}
              custom={0} // delay: 0ms (primero)
              initial="hidden"
              animate="visible"
              exit="exit"
              {...(isMobile && {
                variants: mobileContentVariants,
                custom: 0 // delay: 0ms
              })}
              className="mb-6 flex"
            >
              <TrapezoidBadge
                label={event.category}
                size="sm"
                variant="white"
              />
            </motion.div>
          )}

          {/* BRAND/LOGO */}
          <motion.div 
            variants={isMobile ? undefined : slideFromLeft}
            custom={0.15} // delay: 150ms (segundo)
            initial="hidden"
            animate="visible"
            exit="exit"
            {...(isMobile && {
              variants: mobileContentVariants,
              custom: 0.15
            })}
            className="mb-8"
          >
            {event.logo ? (
              <img 
                src={event.logo} 
                alt={`${event.brand} Logo`} 
                className="h-10 md:h-12 lg:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-widest text-white">
                {event.brand}
              </span>
            )}
          </motion.div>

          {/* TITLE */}
          <motion.h1 
            variants={isMobile ? undefined : slideFromLeft}
            custom={0.3} // delay: 300ms (tercero)
            initial="hidden"
            animate="visible"
            exit="exit"
            {...(isMobile && {
              variants: mobileContentVariants,
              custom: 0.3
            })}
            className="text-[28px] md:text-[32px] lg:text-[34px] font-black uppercase tracking-tight leading-[1.0] text-balance text-white mb-8"
          >
            {event.title}
          </motion.h1>

          {/* DESCRIPTION (Párrafo) */}
          <motion.div 
            variants={isMobile ? undefined : slideFromLeft}
            custom={0.45} // delay: 450ms (cuarto)
            initial="hidden"
            animate="visible"
            exit="exit"
            {...(isMobile && {
              variants: mobileContentVariants,
              custom: 0.45
            })}
            className="prose prose-invert prose-base lg:prose-lg text-neutral-300 leading-relaxed font-light mb-10"
            style={{ maxWidth: '55ch' }}
          >
            <h2 className="sr-only">Descripción del Proyecto</h2>
            <p className="whitespace-pre-wrap">{event.description}</p>
          </motion.div>
          
          {/* METADATA GRID (Año) */}
          <motion.div 
            variants={isMobile ? undefined : slideFromLeft}
            custom={0.6} // delay: 600ms (quinto - último)
            initial="hidden"
            animate="visible"
            exit="exit"
            {...(isMobile && {
              variants: mobileContentVariants,
              custom: 0.6
            })}
            className="grid grid-cols-2 gap-4 text-xs"
          >
            <div>
              <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Año</h3>
              <span className="text-sm lg:text-base text-white font-light">{event.year || new Date().getFullYear()}</span>
            </div>
            {event.venue && (
              <div>
                <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Lugar</h3>
                <span className="text-sm lg:text-base text-white font-light">{event.venue}</span>
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