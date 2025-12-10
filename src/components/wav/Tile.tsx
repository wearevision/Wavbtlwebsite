import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { optimizeForTile, generateSrcSet } from '../../utils/imageOptimizer';

interface TileProps {
  id: string;
  image: string;
  title: string;
  brand?: string;
  index: number;
  onSelect: () => void;
  priority?: boolean;
  isLoading?: boolean;
  technical_summary?: string; // AEO: For LLM crawlers
}

export const Tile = React.memo<TileProps>(({ id, image, title, brand, index, onSelect, priority = false, isLoading = false, technical_summary }) => {
  // Geometry Update:
  // "Left side same angle as right side" -> Parallelogram ( / / )
  // "Top/Bottom parallel to render" -> Horizontal top/bottom edges
  // Polygon: Top-Left(20,0) -> Top-Right(100,0) -> Bottom-Right(80,100) -> Bottom-Left(0,100)
  // This creates a consistent rightward slant.
  const clipPath = "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)";
  
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // OPTIMIZATION: Only calculate text fitting on hover to save CPU.
  // The text is hidden (opacity-0) by default, so we don't need to calc it until required.
  const handleMouseEnter = () => {
    if (isLoading) return;
    const el = textRef.current;
    if (!el) return;
    
    const wrapper = el.parentElement;
    const overlay = wrapper?.parentElement; 
    
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

  if (isLoading) {
    return (
      <div 
        className="relative w-full aspect-[1.6/1] bg-neutral-900/50 overflow-hidden"
        style={{ clipPath }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
        <div className="absolute inset-0 border-[2px] border-black/80 pointer-events-none" />
      </div>
    );
  }

  return (
    <motion.article
      layoutId={`tile-${id}`}
      className="relative group cursor-pointer w-full aspect-[1.6/1]"
      style={{ 
        clipPath: clipPath, 
      }}
      whileHover={{ 
        zIndex: 50,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onMouseEnter={handleMouseEnter}
      onClick={onSelect}
      role="button"
      aria-label={`Ver proyecto ${title} para la marca ${brand || 'Desconocida'}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      >
        <img
          // LCP OPTIMIZATION: Critical tiles use aggressive eager loading
          // Peripheral tiles use lazy loading to reduce initial network load
          loading={priority ? "eager" : "lazy"}
          // DECODING STRATEGY: 
          // - Critical: sync (blocks until decoded, ensures immediate LCP paint)
          // - Peripheral: async (non-blocking, better for offscreen content)
          decoding={priority ? "sync" : "async"}
          // FETCH PRIORITY: Browser hint for network prioritization
          fetchpriority={priority ? "high" : "low"}
          src={optimizeForTile(image, 'medium')}
          srcSet={generateSrcSet(image, 'tile')}
          // OPTIMIZATION: More accurate sizes to prevent loading overly large images.
          // Mobile: 180vw / 3 cols ≈ 60vw.
          // Desktop: 130vw / 6 cols ≈ 22vw.
          sizes="(max-width: 768px) 60vw, 25vw"
          alt={title}
          className={clsx(
            "w-full h-full object-cover grayscale bg-neutral-900 transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </motion.div>

      {/* Hover Gradient Overlay - Monochrome mode only */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-brand-gradient-strong"
      >
        {/* Brand Text */}
        {brand && (
          <div className="px-2 text-center w-full max-w-[65%] flex items-center justify-center overflow-hidden"> 
             <h3 
               ref={textRef}
               className={clsx(
                 "text-white font-black tracking-widest uppercase drop-shadow-md whitespace-pre-wrap break-words leading-tight origin-center text-center font-sans",
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
        className="absolute inset-0 pointer-events-none border-[2px] border-black/80"
      />
      
      {/* AEO OPTIMIZATION: Hidden structured data for LLM crawlers */}
      {technical_summary && (
        <div className="sr-only" aria-hidden="true">
          <meta itemProp="description" content={technical_summary} />
          <p itemProp="name">{title}</p>
          <p itemProp="brand">{brand}</p>
        </div>
      )}
    </motion.article>
  );
});