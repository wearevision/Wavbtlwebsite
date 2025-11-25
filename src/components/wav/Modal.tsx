import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ModalProps {
  event: {
    title: string;
    description: string;
    image: string;
  };
  onClose: () => void;
  mode: string;
  isMobile: boolean;
}

// --- Animation Variants ---

// 1. Image Container Wipe (Right to Left) with Parallelogram Shape
const desktopImageVariants = {
  hidden: {
    x: "50%",
    opacity: 0,
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", 
  },
  visible: {
    x: "0%",
    opacity: 1,
    clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)", 
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
    }
  },
  exit: {
    x: "50%",
    opacity: 0,
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
};

// 2. Text Container Reveal (Left to Right) with Parallelogram Mask
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
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
      when: "afterChildren",
      staggerChildren: 0.05, 
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
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren" }
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
    <Component className={clsx("flex flex-wrap gap-x-[0.25em]", className)}>
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
  
  // Calculate dynamic font size logic could be here, but we'll rely on CSS + natural wrapping
  // The user asked to "never split words", so wrapping whole words is the key fix.
  
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
  // Escape key listener for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-12 pointer-events-none">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl pointer-events-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        
        {/* --- Left: Image Container --- */}
        <motion.div 
          variants={isMobile ? mobileVariants : desktopImageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative shrink-0 w-full md:w-[50%] aspect-video md:aspect-[1.6/1] z-20"
          style={{ 
             filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
          }}
        >
           <div className="w-full h-full overflow-hidden bg-neutral-800 relative">
              <ImageWithFallback 
                src={event.image} 
                alt={event.title}
                className={clsx(
                  "w-full h-full object-cover",
                  mode === 'duotone' ? "brightness-75 sepia" : "grayscale",
                  mode === 'neon' ? "contrast-125 grayscale" : ""
                )}
              />
              
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                    background: mode === 'duotone' 
                      ? 'var(--wav-brand-blue)'
                      : (mode === 'monochrome' || mode === 'neon')
                        ? 'linear-gradient(135deg, rgba(255,0,168,0.4) 0%, rgba(155,0,255,0.4) 50%, rgba(0,68,255,0.4) 100%)'
                        : undefined
                }}
              />
           </div>
        </motion.div>

        {/* --- Right: Content Info --- */}
        <motion.div 
            variants={isMobile ? mobileVariants : desktopTextContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col text-left pt-4 md:pt-0 text-white z-10 relative"
        >
           {/* Header Row */}
           <div className="flex flex-row items-start justify-between mb-6">
              <div className="flex-1">
                <AnimatedTitle 
                  text={event.title} 
                  // Added max-width and responsive sizing to help with breaking
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9]"
                />
              </div>
              
              {/* Logo */}
              <motion.div 
                variants={logoVariants} 
                className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center shrink-0 ml-4"
              >
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                 </svg>
              </motion.div>
           </div>

           {/* Paragraph */}
           <motion.div className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg">
             <AnimatedText 
                text={event.description} 
                as="div"
             />
           </motion.div>
        </motion.div>

        {/* Close Button */}
        <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute -top-12 right-0 md:-right-12 z-50 p-2 text-white/50 hover:text-white transition-colors"
        >
            <X size={32} />
        </motion.button>
      </div>
    </div>
  );
};
