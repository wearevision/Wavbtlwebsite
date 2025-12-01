import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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
/*                                   VARIANTS                                 */
/* -------------------------------------------------------------------------- */

const modalContainerVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: 'auto' }}
    >
      {/* BACKDROP - Subtle overlay + economic blur ONLY on mosaic wall */}
      <motion.div
        className={clsx(
          "fixed inset-0 bg-black/30 backdrop-blur-md",
          Z_INDEX.MODAL_BACKDROP
        )}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: 'none' }}
        style={{ pointerEvents: 'auto' }}
      />

      {/* CARD CONTAINER - 1/5 smaller on desktop */}
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative w-full bg-black",
          // Mobile: Min-height screen to allow scrolling
          "min-h-screen lg:min-h-0",
          // Desktop: Fixed size centered card - REDUCED SIZE (was lg:max-w-6xl lg:h-[85vh])
          "lg:max-w-5xl lg:h-[70vh] lg:overflow-hidden lg:flex lg:flex-row",
          Z_INDEX.MODAL_CONTENT
        )}
        variants={modalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        
        {/* CLOSE BUTTON - Optimized positioning to avoid header collision */}
        <button
          onClick={onClose}
          className={clsx(
            "z-[70] p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-white hover:text-black transition-colors",
            // Mobile: Fixed top-right, visible over content
            "fixed top-6 right-6",
            // Desktop: Absolute, smaller, top-right of modal card with generous spacing
            "lg:absolute lg:top-6 lg:right-6 lg:p-2"
          )}
          aria-label="Close modal"
        >
          <X size={isMobile ? 24 : 20} />
        </button>

          {/* LEFT COLUMN: VISUALS */}
          <div className={clsx(
            "relative w-full shrink-0 bg-neutral-900 overflow-hidden",
            // Mobile: 4:5 Aspect Ratio, Diagonal Bottom Cut
            "aspect-[4/5] md:h-[45vh] md:aspect-auto",
            isMobile ? "clip-trapezoid-mobile" : "lg:clip-trapezoid-left",
            // Desktop: Full height, 45% width
            "lg:w-[45%] lg:h-full"
          )}>
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
          </div>

          {/* RIGHT COLUMN: CONTENT - INCREASED PADDING & SPACING */}
          <div className={clsx(
            "relative w-full flex flex-col",
            // Mobile: Flow content, padding, dark background to cover mosaic - INCREASED
            "bg-black/90 p-8 pb-32",
            // Desktop: Full height, Scrollable internal area, Generous Padding
            "lg:w-[55%] lg:h-full lg:bg-transparent lg:p-12 lg:overflow-y-auto lg:custom-scroll-modal"
          )}>
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8 md:gap-10 lg:gap-12"
            >
              {/* HEADER: Brand & Category - OPTIMIZED LAYOUT WITH PROPER SPACING */}
              <div className={clsx(
                "flex flex-col gap-4 pb-6 relative border-b border-white/10",
                // Desktop: Horizontal layout with space between, padding-right for close button
                "lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:pr-12"
              )}>
                 {/* Logo Container */}
                 <div className="flex-shrink-0">
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
                 </div>

                 {/* Category Badge - Trapezoidal with proper spacing */}
                 {event.category && (
                   <div className="flex-shrink-0 lg:ml-auto">
                     <TrapezoidBadge
                       label={event.category}
                       size="sm"
                       variant="white"
                     />
                   </div>
                 )}
              </div>

              {/* TITLE - INCREASED LINE HEIGHT */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.0] text-balance text-white">
                {event.title}
              </h1>

              {/* BODY TEXT - OPTIMIZED READING MEASURE */}
              <div className="prose prose-invert prose-base lg:prose-lg max-w-[60ch] text-neutral-300 leading-relaxed font-light">
                 <h2 className="sr-only">Descripción del Proyecto</h2>
                 <p className="whitespace-pre-wrap">{event.description}</p>
              </div>
              
              {/* METADATA GRID - INCREASED SPACING */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8 pt-8 lg:pt-10 relative border-t border-white/10">
                 <h2 className="sr-only">Detalles del Evento</h2>
                 <div>
                   <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Cliente</h3>
                   <span className="text-sm lg:text-base text-white font-light">{event.brand}</span>
                 </div>
                 <div>
                   <h3 className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Año</h3>
                   <span className="text-sm lg:text-base text-white font-light">2024</span>
                 </div>
              </div>

            </motion.div>
          </div>

      </motion.div>

      {/* NAVIGATION ARROWS - Desktop & Mobile - CIRCULAR BUTTONS WITH GRADIENT LOADING + KEYBOARD FEEDBACK */}
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
            className={isMobile ? "" : ""}
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
            className={isMobile ? "" : ""}
          />
        </>
      )}
    </motion.div>
  );
};