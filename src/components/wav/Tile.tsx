import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

interface TileProps {
  id: string;
  image: string;
  title: string;
  brand?: string;
  index: number;
  onSelect: () => void;
  mode: string;
}

export const Tile: React.FC<TileProps> = ({ id, image, title, brand, index, onSelect, mode }) => {
  // Geometry Update:
  // "Left side same angle as right side" -> Parallelogram ( / / )
  // "Top/Bottom parallel to render" -> Horizontal top/bottom edges
  // Polygon: Top-Left(20,0) -> Top-Right(100,0) -> Bottom-Right(80,100) -> Bottom-Left(0,100)
  // This creates a consistent rightward slant.
  const clipPath = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
  
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const checkFit = () => {
      const el = textRef.current;
      if (!el) return;
      
      const wrapper = el.parentElement;
      const overlay = wrapper?.parentElement; // The absolute inset-0 container
      
      if (!wrapper || !overlay) return;

      const availableWidth = wrapper.offsetWidth;
      const availableHeight = overlay.offsetHeight;
      
      const contentWidth = el.scrollWidth;
      const contentHeight = el.scrollHeight;

      let newScale = 1;

      // Check Width
      if (contentWidth > availableWidth && availableWidth > 0) {
         newScale = availableWidth / contentWidth;
      }
      
      // Check Height (with some padding safety)
      const safeHeight = availableHeight * 0.9;
      if (contentHeight > safeHeight && safeHeight > 0) {
         const hScale = safeHeight / contentHeight;
         newScale = Math.min(newScale, hScale);
      }

      setScale(newScale);
    };

    // Run immediately
    checkFit();

    // Observe resize
    const resizeObserver = new ResizeObserver(checkFit);
    if (textRef.current?.parentElement) {
      resizeObserver.observe(textRef.current.parentElement);
    }
    
    return () => resizeObserver.disconnect();
  }, [brand]);

  // Font sizing logic based on brand text length to ensure it fits within 90% width
  // We use a memoized class name calculation to avoid unnecessary calculations on render
  const textSizeClass = useMemo(() => {
    if (!brand) return "text-xl md:text-2xl";
    
    const length = brand.length;
    
    if (length > 25) {
      return "text-xs md:text-sm"; // Very long text
    } else if (length > 18) {
      return "text-sm md:text-base"; // Long text
    } else if (length > 12) {
      return "text-base md:text-lg"; // Medium text
    } else {
      return "text-xl md:text-2xl"; // Short text
    }
  }, [brand]);

  return (
    <motion.div
      layoutId={`tile-${id}`}
      className="relative group cursor-pointer w-full will-change-transform"
      style={{ 
        // 3x Larger visual appearance = standard aspect ratio but grid column is wider.
        // Keeping 16:9 or similar cinematic ratio looks good for "larger" cards.
        aspectRatio: '1.6 / 1',
      }}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 50,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onClick={onSelect}
    >
      {/* Shape Container */}
      <div 
        className="w-full h-full relative overflow-hidden bg-neutral-900"
        style={{ 
          clipPath: clipPath,
        }}
      >
        {/* Image */}
        <img 
          src={image} 
          alt={title}
          className={clsx(
            "w-full h-full object-cover transition-all duration-500",
            mode === 'duotone' ? "brightness-75" : "grayscale",
            mode === 'neon' ? "contrast-125 grayscale" : "",
          )}
          style={{
             filter: mode === 'duotone' ? 'url(#duotone-filter)' : undefined
          }}
        />

        {/* Hover Gradient Overlay */}
        <div 
          className={clsx(
            "absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center",
            mode === 'glass' ? "backdrop-blur-md bg-white/10" : ""
          )}
          style={{
            background: mode === 'duotone' 
              ? 'var(--wav-brand-blue)'
              : (mode === 'monochrome' || mode === 'neon')
                ? 'linear-gradient(135deg, rgba(255,0,168,0.85) 0%, rgba(155,0,255,0.85) 50%, rgba(0,68,255,0.85) 100%)'
                : undefined
          }}
        >
          {/* Brand Text */}
          {brand && (
            <div className="px-2 text-center w-full max-w-[65%] flex items-center justify-center overflow-hidden"> 
               <h3 
                 ref={textRef}
                 className={clsx(
                   "text-white font-black tracking-widest uppercase drop-shadow-md whitespace-pre-wrap break-words leading-tight origin-center text-center font-['Outfit']",
                   textSizeClass
                 )}
                 style={{
                   transform: `scale(${scale})`
                 }}
               >
                 {brand}
               </h3>
            </div>
          )}
        </div>
        
        {/* Stroke/Border Simulation */}
        <div 
          className="absolute inset-0 pointer-events-none border-[2px]"
          style={{
             borderColor: 'rgba(0,0,0,0.8)',
          }}
        />
      </div>
    </motion.div>
  );
};
