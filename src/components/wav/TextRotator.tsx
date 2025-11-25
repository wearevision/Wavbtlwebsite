import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

const phrases = [
  "We Are Vision",
  "más de 20 años",
  "innovando en",
  "experiencias de marca"
];

export function TextRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const currentPhrase = phrases[index];
  const words = currentPhrase.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const wordVariants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      y: -20,
      transition: {
        duration: 0.4
      }
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      <Logo />
      
      {/* 
         Fixed height container to prevent layout shift when text changes.
         h-[150px] for mobile, h-[300px] for desktop.
         This ensures the Logo (which is flex-centered with this container) stays in a fixed vertical position.
      */}
      <div className="relative h-[150px] md:h-[300px] flex items-start justify-center w-full perspective-lg">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-wrap justify-center max-w-4xl text-center font-['Outfit'] font-black text-4xl md:text-6xl lg:text-8xl tracking-tighter text-[#FD019C] drop-shadow-2xl leading-[0.85] absolute top-0 left-0 right-0 mx-auto"
          >
            {words.map((word, wordIndex) => (
              <span 
                key={`${index}-${wordIndex}`} 
                className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span 
                    key={`${index}-${wordIndex}-${charIndex}`} 
                    variants={wordVariants} 
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
}
