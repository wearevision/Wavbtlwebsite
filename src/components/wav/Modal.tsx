import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// IMPORT CORRECTO (named export)
import { MediaGallery } from './MediaGallery';
import { TrapezoidBadge } from './TrapezoidBadge';

import { WavEvent, WavMedia } from '../../types';
import { useFocusTrap } from '../../src/hooks/useFocusTrap';

/* -------------------------------------------------------------------------- */
/*                                   VARIANTS                                 */
/* -------------------------------------------------------------------------- */

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3, ease: 'easeIn' } },
};

/* Clipping estable */
const clipTrapezoid = {
  hidden: { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
  visible: {
    clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
  exit: {
    clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  },
};

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
      className
    )}
  >
    {text}
  </motion.h1>
);

const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <motion.div
    variants={slideUp}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={clsx(
      'leading-relaxed text-neutral-300',
      'max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-4 pb-20 custom-scroll',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* BACKDROP */}
      <motion.div
        className="absolute inset-0 bg-black/65 backdrop-blur-xl"
        onClick={onClose}
        variants={fadeIn}
      />

      {/* CARD */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          'relative pointer-events-auto',
          'overflow-hidden',
          'w-full max-w-6xl lg:max-w-7xl',
          'flex flex-col lg:flex-row'
        )}
      >
        {/* LEFT (Visual) */}
        <motion.div
          className={clsx(
            'relative w-full lg:w-7/12',
            'h-[45vh] md:h-[50vh] lg:h-auto',
            'p-4 md:p-6 lg:p-10'
          )}
          variants={isMobile ? slideUp : fadeIn}
        >
          {/* Category Badge - Positioned above the media container */}
          {event.category && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-2 left-4 md:left-6 lg:left-10 z-20"
            >
              <TrapezoidBadge
                label={event.category}
                size="sm"
                variant="white"
                className="shadow-lg"
              />
            </motion.div>
          )}

          {/* Clip container */}
          <motion.div
            variants={clipTrapezoid}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full overflow-hidden bg-neutral-900 transform-gpu" // Added transform-gpu to force compositing layer
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }} // Force stacking context for Safari/Chrome video clipping
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
            'w-full lg:w-5/12',
            'p-6 md:p-10 lg:pl-0 lg:pr-10',
            'flex flex-col gap-6'
          )}
          variants={isMobile ? slideUp : fadeIn}
        >
          {/* BRAND LOGO (Placeholder logic) */}
          <motion.div 
            variants={titleVariants}
            className="flex justify-start"
          >
            {event.logo ? (
              <img 
                src={event.logo} 
                alt={`${event.brand} Logo`} 
                className="h-8 md:h-10 lg:h-12 w-auto object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <div className="h-8 md:h-10 lg:h-12 w-24 md:w-32 border border-dashed border-white/20 bg-white/5 rounded flex items-center justify-center group">
                <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                  {event.brand || "Brand"}
                </span>
              </div>
            )}
          </motion.div>

          {/* TITLE */}
          <AnimatedTitle
            text={event.title}
            className="text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
          />

          {/* TEXT */}
          <AnimatedText
            text={event.description}
            className="text-base md:text-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};