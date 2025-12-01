import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail } from 'lucide-react';
import { EventCategory } from '../../utils/contentRules';
import { WavEvent } from '../../types';
import { Z_INDEX } from '../../lib/constants/zIndex';
import { TrapezoidButton } from './TrapezoidButton';

interface ControlsProps {
  categories: EventCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  events?: WavEvent[]; // For counting events per category
}

export const Controls: React.FC<ControlsProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  isModalOpen = false, 
  onCloseModal,
  events = []
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Count events per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      // event.category contiene el label, no el id
      counts[cat.id] = events.filter(e => e.category === cat.label).length;
    });
    return counts;
  }, [categories, events]);

  const handleCategoryClick = (categoryLabel: string) => {
    // Toggle category filter: if already selected, clear filter
    if (selectedCategory === categoryLabel) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryLabel);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Backdrop - ONLY Darken, NO blur (blur applied to wall is preserved) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "fixed inset-0 bg-black/40",
              Z_INDEX.MENU_BACKDROP
            )}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Combined Controls (Desktop & Mobile) - Centered Bottom Container */}
      <div 
        className={clsx(
          "fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4",
          Z_INDEX.CONTROLS
        )}
      >
        <AnimatePresence>
          {isModalOpen && onCloseModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
            >
              <TrapezoidButton
                onClick={onCloseModal}
                ariaLabel="Close modal"
                variant="solid"
                size="md"
              >
                <X size={20} />
              </TrapezoidButton>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout>
          <TrapezoidButton
            onClick={() => setIsOpen(!isOpen)}
            ariaLabel="Menu"
            variant="solid"
            size="md"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </TrapezoidButton>
        </motion.div>
      </div>

      {/* Menu Overlay - Blur applied ONLY to panel (economical) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={clsx(
              "fixed bottom-24 left-1/2 -translate-x-1/2 w-72 max-w-[90vw]",
              "bg-black/50 backdrop-blur-md border border-white/10 flex flex-col shadow-2xl",
              Z_INDEX.MENU_DROPDOWN
            )}
          >
            {/* "All" button - Header Style */}
            <div className="p-4 pb-2">
              <button
                onClick={() => {
                  onSelectCategory(null);
                  setIsOpen(false);
                }}
                aria-label="Mostrar todos los eventos"
                className={clsx(
                  "relative w-full px-4 py-3 text-sm font-bold uppercase tracking-wider flex items-center justify-between transition-colors overflow-hidden",
                  selectedCategory === null 
                    ? "text-white bg-brand-gradient" 
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                )}
              >
                <span className="relative z-10">TODOS</span>
                <span className={clsx(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                  selectedCategory === null 
                    ? "bg-black/30 text-white" 
                    : "bg-black text-white"
                )}>
                  {events.length}
                </span>
              </button>
            </div>

            <div className="w-full h-px bg-white/10 mb-2 mx-auto w-[90%]" />

            <div className="flex flex-col max-h-[55vh] overflow-y-auto custom-scrollbar px-4 gap-1">
              {/* Category buttons - Solo mostrar categorías con eventos */}
              {categories
                .filter(category => (categoryCounts[category.id] || 0) > 0)
                .map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.label)}
                    aria-label={`Filtrar por categoría: ${category.label}`}
                    className={clsx(
                      "relative w-full py-2.5 text-xs font-bold uppercase tracking-wide transition-colors flex items-center justify-between text-left group overflow-hidden",
                      selectedCategory === category.label 
                        ? "text-white bg-brand-gradient" 
                        : "text-neutral-300 hover:text-white"
                    )}
                  >
                    {/* Gradient Background - Hover effect for non-active items */}
                    {selectedCategory !== category.label && (
                      <>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-brand-gradient-faint"
                          style={{
                            transform: 'translateX(-100%)',
                          }}
                        />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75 bg-brand-gradient-faint"
                        />
                      </>
                    )}
                    
                    <span className="relative z-10 w-[80%] leading-tight">{category.label}</span>
                    <span className={clsx(
                      "relative z-10 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold transition-colors",
                      selectedCategory === category.label 
                        ? "bg-black/30 text-white" 
                        : "bg-zinc-800 text-neutral-500 group-hover:bg-zinc-700 group-hover:text-white"
                    )}>
                      {categoryCounts[category.id] || 0}
                    </span>
                  </button>
                ))}
            </div>
            
            <div className="p-4 pt-2 mt-2">
              <div className="w-full h-px bg-white/10 mb-4" />
              <a
                href="mailto:federico@wearevision.cl"
                aria-label="Enviar correo a federico@wearevision.cl"
                className="w-full py-2 text-sm font-bold uppercase tracking-widest text-center transition-colors text-white hover:text-neutral-300 flex items-center justify-center gap-3"
              >
                <Mail size={18} />
                <span>CONTACTO</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};