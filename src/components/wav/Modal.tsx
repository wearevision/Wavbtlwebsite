import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// IMPORT CORRECTO (named export)
import { MediaGallery } from './MediaGallery';
import { TrapezoidBadge } from './TrapezoidBadge';

import { WavEvent, WavMedia } from '../../types';
import { useFocusTrap } from '../../src/hooks/useFocusTrap';
import { Z_INDEX } from '../../lib/constants/zIndex';
import { SAFE_AREAS } from '../../lib/constants/safeAreas';
import { MOTION_VARIANTS } from '../../lib/constants/animations';

/* -------------------------------------------------------------------------- */
/*                                   VARIANTS                                 */
/* -------------------------------------------------------------------------- */

// Local variants específicos del modal (los globales vienen de MOTION_VARIANTS)
const titleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

/* -------------------------------------------------------------------------- */
/*                          ANIMATED TITLE + TEXT                             */
/* -------------------------------------------------------------------------- */

const AnimatedTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <motion.h1
    variants={titleVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={clsx(
      'uppercase tracking-tight font-extrabold text-balance',
      // Ancho aumentado 1.5×
      'max-w-[95ch]',
      className
    )}
  >
    {text}
  </motion.h1>
);

const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <motion.div
    variants={MOTION_VARIANTS.slideUp}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={clsx(
      'leading-relaxed text-neutral-300',
      // Ancho aumentado 1.5× (de 65ch a ~95ch)
      'max-w-[95ch]',
      // SCROLL SOLO EN DESCRIPCIÓN con scrollbar personalizado
      'overflow-y-auto custom-scroll-modal',
      // Max-height dinámico para mobile/tablet, sin límite en desktop
      'max-h-[40vh] md:max-h-[45vh] lg:max-h-[50vh]',
      // Padding right para el scrollbar
      'pr-3',
      className
    )}
  >
    {text}
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*                                   MODAL                                    */
/* -------------------------------------------------------------------------- */

interface ModalProps {
  event: WavEvent;
  onClose: () => void;
  isMobile: boolean;
}

export const Modal: React.FC<ModalProps> = ({ event, onClose, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  /* Safe gallery */
  const safeGallery: WavMedia[] =
    event?.gallery?.length
      ? event.gallery
      : [{ id: 'fallback', type: 'image', url: event.image }];

  useEffect(() => setGalleryIndex(0), [event]);
  useFocusTrap(containerRef, onClose);

  const nextImg = () => setGalleryIndex((p) => (p + 1) % safeGallery.length);

  return (
    <motion.div
      ref={containerRef}
      className={clsx(
        "fixed inset-0 flex items-center justify-center",
        // Margen balanceado para centrado óptimo
        "p-6 md:p-16 lg:p-24",
        Z_INDEX.MODAL_CONTENT
      )}
      variants={MOTION_VARIANTS.fade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* BACKDROP */}
      <motion.div
        className="absolute inset-0 bg-black/65 backdrop-blur-xl"
        onClick={onClose}
        variants={MOTION_VARIANTS.fade}
      />

      {/* CARD */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          'relative pointer-events-auto',
          'overflow-hidden',
          // Modal optimizado para layout centrado
          'w-full max-w-xl md:max-w-2xl lg:max-w-5xl',
          // Desktop: flex-row con items-center para centrar verticalmente foto y contenido
          'flex flex-col lg:flex-row lg:items-center',
          'z-10'
        )}
      >
        {/* LEFT (Visual) */}
        <motion.div
          className={clsx(
            'relative w-full lg:w-1/2',
            // Aspect ratio 3:2 (3 de alto, 2 de ancho) = más ancha y menos rectangular
            'h-[45vh] md:h-[50vh] lg:aspect-[2/3]',
            // Padding reducido para diseño más compacto
            'p-4 md:p-6 lg:p-6',
            // Flex-shrink para evitar que se comprima
            'lg:flex-shrink-0'
          )}
          variants={isMobile ? MOTION_VARIANTS.slideUp : MOTION_VARIANTS.fade}
        >
          {/* Clip container */}
          <motion.div
            initial={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }}
            animate={{ 
              clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
              transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
            }}
            exit={{ 
              clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
              transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
            }}
            className="w-full h-full overflow-hidden bg-neutral-900 transform-gpu"
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          >
            <MediaGallery
              gallery={safeGallery}
              className="w-full h-full"
              currentIndex={galleryIndex}
              onIndexChange={setGalleryIndex}
            />
          </motion.div>

          {/* Next */}
          {safeGallery.length > 1 && (
            <button
              onClick={nextImg}
              className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-white opacity-90 hover:opacity-100 transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </motion.div>

        {/* RIGHT (Content) */}
        <motion.div
          className={clsx(
            'w-full lg:w-1/2',
            // Padding interior reducido
            'p-6 md:p-6 lg:p-10',
            'flex flex-col gap-5',
            // Padding bottom grande para evitar overlap con botones (máscara)
            'pb-32 md:pb-36',
            // SIN overflow - el scroll está solo en la descripción
            'overflow-visible'
          )}
          variants={isMobile ? MOTION_VARIANTS.slideUp : MOTION_VARIANTS.fade}
        >
          {/* BRAND LOGO + CATEGORY BADGE */}
          <motion.div 
            variants={titleVariants}
            className="flex items-center justify-between gap-4"
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              {event.logo ? (
                <img 
                  src={event.logo} 
                  alt={`${event.brand} Logo`} 
                  className="h-6 md:h-8 lg:h-10 w-auto object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="h-6 md:h-8 lg:h-10 w-20 md:w-24 border border-dashed border-white/20 bg-white/5 rounded flex items-center justify-center group">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                    {event.brand || "Brand"}
                  </span>
                </div>
              )}
            </div>

            {/* Category Badge a la derecha */}
            {event.category && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TrapezoidBadge
                  label={event.category}
                  size="xs"
                  variant="white"
                  className="shadow-lg"
                />
              </motion.div>
            )}
          </motion.div>

          {/* TITLE - Tipografía más pequeña y compacta */}
          <AnimatedTitle
            text={event.title}
            className="text-2xl md:text-3xl lg:text-3xl leading-[0.95]"
          />

          {/* TEXT - Tipografía reducida para mejor lectura */}
          <AnimatedText
            text={event.description}
            className="text-sm md:text-sm lg:text-base"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};