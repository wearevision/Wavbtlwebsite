import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail } from 'lucide-react';
import { ColorMode } from '../../types';

interface ControlsProps {
  currentMode: ColorMode;
  setMode: (mode: ColorMode) => void;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ currentMode, setMode, isModalOpen = false, onCloseModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes: { id: ColorMode; label: string }[] = [
    { id: 'monochrome', label: 'Monochrome' },
    { id: 'neon', label: 'Neon' },
    { id: 'duotone', label: 'Duotone' },
    { id: 'glass', label: 'Glass' },
  ];

  return (
    <>
      {/* Combined Controls (Desktop & Mobile) - Centered Bottom Container */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-4"
      >
        <AnimatePresence>
          {isModalOpen && onCloseModal && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              onClick={onCloseModal}
              className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-lg border border-white/10 hover:scale-105 transition-transform"
              aria-label="Close modal"
            >
              <X size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          layout // Allows the button to slide when its sibling appears/disappears
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-lg border border-white/10 hover:scale-105 transition-transform"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-64 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col gap-2"
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
