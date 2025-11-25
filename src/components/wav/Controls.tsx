import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail } from 'lucide-react';

type ColorMode = 'monochrome' | 'neon' | 'duotone' | 'glass';

interface ControlsProps {
  currentMode: ColorMode;
  setMode: (mode: ColorMode) => void;
}

export const Controls: React.FC<ControlsProps> = ({ currentMode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes: { id: ColorMode; label: string }[] = [
    { id: 'monochrome', label: 'Monochrome' },
    { id: 'neon', label: 'Neon' },
    { id: 'duotone', label: 'Duotone' },
    { id: 'glass', label: 'Glass' },
  ];

  return (
    <>
      {/* Desktop Controls - Visible on lg screens and up */}
      <div className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 gap-2 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 items-center">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={clsx(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
              currentMode === m.id 
                ? "bg-white text-black shadow-lg scale-105" 
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            {m.label}
          </button>
        ))}
        
        <div className="w-px h-4 bg-white/20 mx-1" />
        
        <a
          href="mailto:federico@wearevision.cl"
          className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 text-white/60 hover:text-white hover:bg-white/10 flex items-center gap-2"
        >
          <span>Contacto</span>
        </a>
      </div>

      {/* Mobile/Tablet Controls - Menu Button */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-lg border border-white/10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-64 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col gap-2"
          >
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all",
                  currentMode === m.id 
                    ? "bg-white text-black" 
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                {m.label}
              </button>
            ))}
            
            <div className="h-px bg-white/10 my-1" />
            
            <a
              href="mailto:federico@wearevision.cl"
              className="w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all text-white/80 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>Contacto</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
