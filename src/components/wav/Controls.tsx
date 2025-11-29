import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail } from 'lucide-react';
import { EventCategory } from '../../utils/contentRules';
import { WavEvent } from '../../types';

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
      counts[cat.id] = events.filter(e => e.category === cat.id).length;
    });
    return counts;
  }, [categories, events]);

  const handleCategoryClick = (categoryId: string) => {
    // Toggle category filter: if already selected, clear filter
    if (selectedCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
    setIsOpen(false);
  };

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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-72 max-w-[90vw] p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col gap-2"
          >
            {/* "All" button - clears filter */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => {
                onSelectCategory(null);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-between",
                selectedCategory === null 
                  ? "bg-white text-black" 
                  : "text-white/80 hover:bg-white/10"
              )}
            >
              <span>Todas</span>
              <span className={clsx(
                "text-xs px-2 py-1 rounded-full font-bold",
                selectedCategory === null 
                  ? "bg-black/20 text-black" 
                  : "bg-white/10 text-white/60"
              )}>
                {events.length}
              </span>
            </motion.button>

            <motion.div 
              className="h-px bg-white/10 my-1"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            />

            {/* Category buttons */}
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                onClick={() => handleCategoryClick(category.id)}
                className={clsx(
                  "w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-between",
                  selectedCategory === category.id 
                    ? "bg-white text-black" 
                    : "text-white/80 hover:bg-white/10"
                )}
              >
                <span>{category.label}</span>
                <span className={clsx(
                  "text-xs px-2 py-1 rounded-full font-bold",
                  selectedCategory === category.id 
                    ? "bg-black/20 text-black" 
                    : "bg-white/10 text-white/60"
                )}>
                  {categoryCounts[category.id] || 0}
                </span>
              </motion.button>
            ))}
            
            <motion.div 
              className="h-px bg-white/10 my-1"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
            
            <motion.a
              href="mailto:federico@wearevision.cl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all text-white/80 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>Contacto</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
