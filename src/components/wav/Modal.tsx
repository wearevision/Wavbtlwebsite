import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { WavEvent, WavMedia } from '../../types';
import { MediaGallery } from './MediaGallery';

interface ModalProps {
  event: WavEvent;
  onClose: () => void;
  mode: string;
  isMobile: boolean;
}

// --- Animation Variants ---

// 1. Image Container Wrapper (Slide In - No ClipPath)
const desktopWrapperVariants = {
  hidden: {
    x: "50%",
    opacity: 0,
  },
  visible: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    }
  },
  exit: {
    x: "50%",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
};

// 2. Inner Clip Path Variants (Universal)
const clipVariants = {
  hidden: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  visible: {
    clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)", 
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    }
  },
  exit: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
};


// 3. Text Container Reveal (Left to Right) with Parallelogram Mask
const desktopTextContainerVariants = {
  hidden: {
    opacity: 1,
    clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)", 
    x: "-5%",
  },
  visible: {
    opacity: 1,
    x: "0%",
    clipPath: "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)", 
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.1, 
      when: "beforeChildren", 
      staggerChildren: 0.1,
    }
  },
  exit: {
    clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)",
    x: "-5%",
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
      staggerChildren: 0.02, 
      staggerDirection: -1
    }
  }
};

// 3. Text Animation Variants (Word & Letter based)
// Stagger logic: Container staggers Words, Words stagger Letters.

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // Delay between words
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03 // Delay between letters in a word
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    filter: "blur(8px)",
    transition: { duration: 0.2 }
  }
};

const logoVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: "blur(10px)",
    rotate: -10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    filter: "blur(10px)",
    transition: { duration: 0.3 }
  }
};

// Mobile Variants (Simple Slide)
const mobileVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: 40,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// --- Helper Components ---

const AnimatedText: React.FC<{ text: string; className?: string; as?: React.ElementType }> = ({ text, className, as: Component = "div" }) => {
  const words = text.split(" ");

  return (
    <Component className={clsx(
      "flex flex-wrap gap-x-[0.25em]",
      // Layout Fixes: Scrollable text + Safe area for Menu Button
      "max-h-[45vh] md:max-h-[60vh] overflow-y-auto pb-32 pr-4", 
      className
    )}>
      <motion.div 
        variants={wordContainerVariants} 
        initial="hidden" 
        animate="visible" 
        exit="exit" 
        className="contents"
      >
        {words.map((word, wIndex) => (
          <motion.span 
            key={wIndex} 
            variants={wordVariants} 
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((char, cIndex) => (
              <motion.span 
                key={cIndex} 
                variants={letterVariants} 
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
};

const AnimatedTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(" ");
  
  return (
    <motion.h2 
      className={clsx("flex flex-wrap gap-x-[0.3em] gap-y-[0.0em]", className)}
      variants={wordContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {words.map((word, wIndex) => (
        <motion.span 
          key={wIndex} 
          variants={wordVariants} 
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((char, cIndex) => (
             <motion.span 
               key={cIndex} 
               variants={letterVariants} 
               className="inline-block"
             >
               {char}
             </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export const Modal: React.FC<ModalProps> = ({ event, onClose, mode, isMobile }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const safeGallery: WavMedia[] = event.gallery && event.gallery.length > 0 
    ? event.gallery 
    : [{ type: 'image', url: event.image, id: 'legacy-main' }];

  // Reset index on open
  useEffect(() => {
    setGalleryIndex(0);
  }, [event]);

  // Accessibility: Focus Trap & Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        // Simple focus trap logic
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the close button on mount for immediate accessibility
    const timer = setTimeout(() => {
      // Find the visible close button based on media query state
      // We look for the button that is not hidden (display: none)
      const visibleCloseBtn = containerRef.current?.querySelector('button[aria-label="Close modal"]') as HTMLButtonElement;
      // Since we have two buttons and one is hidden via CSS, querySelector might return the first one (Mobile).
      // We need to check offsetParent to see if it's visible?
      // Or better: select all and find the one with non-none display.
      const btns = containerRef.current?.querySelectorAll('button[aria-label="Close modal"]');
      btns?.forEach((btn) => {
         if (window.getComputedStyle(btn).display !== 'none') {
            (btn as HTMLButtonElement).focus();
         }
      });
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleNext = () => {
    setGalleryIndex((prev) => (prev + 1) % safeGallery.length);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }} 
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-label="Close modal overlay"
      />

      {/* Main Card Container 
          Breakpoint Logic: 
          - <900px: Stacked (flex-col), items centered.
          - >=900px: Row (flex-row), items start aligned, larger gap.
      */}
      <div className="relative w-full max-w-5xl pointer-events-auto flex flex-col min-[900px]:flex-row items-center min-[900px]:items-start gap-8 min-[900px]:gap-12">
        
        {/* --- Left: Media Gallery Container & Logo --- */}
        <div className="shrink-0 w-full min-[900px]:w-[50%] flex flex-col gap-8 z-20">
            <motion.div 
              variants={isMobile ? mobileVariants : desktopWrapperVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Width Logic:
              // - <900px: Full width (stacked).
              // - >=900px: 100% of parent (which is 50% of modal).
              className="relative w-full aspect-video min-[900px]:aspect-[1.6/1]"
              style={{ 
                 filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
              }}
            >
               {/* Navigation Arrow */}
               {safeGallery.length > 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
                    exit={{ opacity: 0 }}
                    onClick={handleNext}
                    // Position Logic:
                    // - <900px: right-2 (Inside the media, because it's full width/stacked)
                    // - >=900px: -right-12 (Floating in the gap between media and text)
                    className={clsx(
                      "absolute top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 text-white hover:scale-125 transition-transform group focus:outline-none outline-none",
                      "right-2 min-[900px]:-right-12"
                    )}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
                  </motion.button>
               )}

               {/* Inner container with clip-path */}
               <motion.div 
                  variants={clipVariants}
                  className="w-full h-full overflow-hidden bg-neutral-800 relative"
                  style={{ 
                    willChange: "clip-path", 
                    transform: "translateZ(0)", // Force hardware acceleration to fix video masking issues
                    WebkitBackfaceVisibility: "hidden",
                    WebkitPerspective: "1000px"
                  }}
               >
                  <MediaGallery 
                    gallery={safeGallery} 
                    mode={mode} 
                    className="w-full h-full"
                    currentIndex={galleryIndex}
                    onIndexChange={setGalleryIndex}
                  />
               </motion.div>
            </motion.div>

            {/* Logo Moved Here - Below Container */}
            <motion.div 
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-[60%] mx-auto flex items-center justify-center"
            >
                 {event.logo ? (
                    <img src={event.logo} alt={`${event.brand} logo`} className="w-full h-auto object-contain max-h-[100px] opacity-80" />
                 ) : (
                   <div className="opacity-30">
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                       </svg>
                   </div>
                 )}
            </motion.div>
        </div>

        {/* --- Right: Content Info --- */}
        <motion.div 
            variants={isMobile ? mobileVariants : desktopTextContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              "flex flex-col text-left z-10 relative min-w-0",
              // Stacked layout spacing
              "pt-6 min-[900px]:pt-0",
              // Width Logic:
              // - 320px to 900px: Width 90% -> 80% (narrower as screen grows)
              // - >=900px: Auto width (flex-1)
              "w-[90%] md:w-[80%] min-[900px]:w-auto min-[900px]:flex-1"
            )}
        >
           {/* Header Row */}
           <div className="flex flex-row items-start justify-between pt-[0px] pr-[0px] pb-[0px] pl-[10px] mt-[0px] mr-[0px] mb-[24px] ml-[0px]">
              <div className="flex-1 min-w-0 pt-[0px] pr-[10px] pb-[0px] pl-[0px]" id="modal-title">
                <AnimatedTitle 
                  text={event.title} 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9] break-words"
                />
              </div>
           </div>

           {/* Paragraph */}
           <motion.div className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-none min-[900px]:max-w-lg">
             <AnimatedText 
                text={event.description} 
                as="div"
             />
           </motion.div>
        </motion.div>

        {/* Close Button */}
        {/* Hidden as it is now handled by the global Controls component */}
        {/* 
        <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close modal"
            className="hidden min-[900px]:block absolute -top-12 -right-12 z-50 p-2 text-white/50 hover:text-white transition-colors focus:outline-none focus:text-white focus:ring-2 focus:ring-white/20 rounded-full"
        >
            <X size={32} />
        </motion.button> 
        */}
      </div>
    </motion.div>
  );
};
