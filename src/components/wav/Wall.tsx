import React, { useMemo, useState, useEffect } from 'react';
import { motion, MotionValue, useSpring, useTransform } from 'motion/react';
import { Tile } from './Tile';
import { clsx } from 'clsx';
import { WavEvent } from '../../types';

interface WallProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onSelect: (id: string) => void;
  mode: string;
  isMobile?: boolean;
  events: WavEvent[];
  isLoading?: boolean;
}

export const Wall: React.FC<WallProps> = ({ mouseX, mouseY, onSelect, mode, isMobile = false, events, isLoading = false }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
       // Set hasMounted to true after initial loading is complete.
       // This prevents staggered animations on subsequent re-renders (e.g., closing a modal).
       setHasMounted(true);
    }
  }, [isLoading]);

  // 1. Infinite Wall logic
  // Mobile: 12 rows, 5 cols. (Increased density for vertical coverage)
  // Desktop: 24 rows, 12 cols. (Increased for infinite feel on larger screens)
  const ROWS = isMobile ? 12 : 24; 
  const COLS = isMobile ? 5 : 12; 
  
  const tiles = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    return Array.from({ length: ROWS * COLS }).map((_, i) => {
      // Use a large prime multiplier to scatter the events pseudo-randomly
      // This prevents visual clusters and makes the repetition less obvious pattern-wise
      const SCATTER_PRIME = 37; 
      const eventIndex = (i * SCATTER_PRIME) % events.length;
      const eventData = events[eventIndex];
      
      return {
        id: `tile-${i}-${eventIndex}`, // Critical: Must be unique for React key. 'i' ensures uniqueness in grid, 'eventIndex' tracks data.
        // We construct a selection ID that matches App.tsx's parsing logic: "tile-{index}"
        // App.tsx uses: events[parseInt(id.split('-')[1]) % events.length]
        // So we must pass the EXACT eventIndex we calculated above.
        eventId: `tile-${eventIndex}`, 
        image: eventData.image, 
        title: eventData.title,
        brand: eventData.brand,
      };
    });
  }, [events]);

  const springConfig = { damping: 40, stiffness: 150 };
  
  // Orientation Logic
  // Desktop: rotateZ [-2, 2], rotateX [2, -2]
  // Mobile: rotateZ [-7, 7] (from Gamma), rotateX 0 (no tilt rotation, only shift)
  const rotateZRange = isMobile ? [-7, 7] : [-2, 2];
  const rotateXRange = isMobile ? [0, 0] : [2, -2];

  const rotateZ = useTransform(mouseX, [-1, 1], rotateZRange); 
  const rotateX = useTransform(mouseY, [-1, 1], rotateXRange);
  
  const smoothRotateZ = useSpring(rotateZ, springConfig);
  const smoothRotateX = useSpring(rotateX, springConfig);

  // Movement shift
  // Desktop: [-50, 50] for both X and Y
  // Mobile: 
  //   - Gamma -> Z rotation (handled above). Does it shift X? Prompt doesn't explicitly disable it, but usually tilt rotates.
  //     Let's keep X shift subtle or same. The prompt says "gamma... -> mosaic Z-axis rotation". 
  //     It doesn't mention X shift for gamma. I'll assume X shift is fine or I can reduce it. 
  //     Let's keep standard X shift for now as it adds depth.
  //   - Beta -> Y shift 0px -> +25px.
  //     Input mapping in App.tsx ensures Y is [0, 0.5] for Beta [0, 60].
  //     Wall maps [-1, 1] -> [-50, 50].
  //     So input 0 -> 0px. Input 0.5 -> 25px. This matches the requirement perfectly with existing range.
  const xShift = useTransform(mouseX, [-1, 1], [-50, 50]);
  const yShift = useTransform(mouseY, [-1, 1], [-50, 50]);
  const smoothX = useSpring(xShift, springConfig);
  const smoothY = useSpring(yShift, springConfig);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black perspective-lg">
      <motion.div
        style={{
          rotateZ: smoothRotateZ,
          rotateX: smoothRotateX,
          x: smoothX,
          y: smoothY,
        }}
        className="relative flex flex-col items-center justify-center shrink-0 origin-center"
      >
        {/* 
           Grid Container
           - Mobile: w-[160vw]. Reduced to improve vertical fit logic.
           - Desktop: w-[140vw]. Expanded.
        */}
        <div 
          className="grid gap-y-1 gap-x-0 w-[160vw] md:w-[160vw]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {tiles.map((tile, i) => {
            const row = Math.floor(i / COLS);
            const isEvenRow = row % 2 === 0;
            const shouldExplode = !isMobile; // Disable heavy layout animation on mobile
            const useDelay = !hasMounted && !isLoading && shouldExplode;

            return (
              <motion.div 
                // Removed layout={shouldExplode} to prevent disappearing tiles bug during parent transforms
                key={tile.id} 
                initial={false}
                animate={isLoading ? (
                  shouldExplode ? { 
                    position: "absolute", 
                    top: "50%", 
                    left: "50%", 
                    x: "-50%", 
                    y: "-50%", 
                    scale: 0,
                    zIndex: 0,
                    opacity: 0
                  } : {
                    // Mobile Loading: Fully rendered behind the loader (static)
                    // CRITICAL: Explicitly set position relative to override potential 'absolute' from initial desktop render
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    opacity: 1,
                    scale: 1,
                    x: 0, 
                    y: 0,
                    zIndex: 1
                  }
                ) : (
                  shouldExplode ? { 
                    position: "relative", 
                    top: "auto", 
                    left: "auto", 
                    x: 0, 
                    y: 0, 
                    scale: 1,
                    zIndex: 1,
                    opacity: 1
                  } : {
                    // Mobile Loaded: Stays the same (static)
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    zIndex: 1
                  }
                )}
                transition={{ 
                  type: "tween", 
                  ease: "easeInOut", 
                  duration: (shouldExplode && !hasMounted) ? 0.8 : 0, 
                  delay: useDelay ? Math.min(i * 0.02, 2.0) : 0
                }}
                className={clsx(
                   "relative", // Removed conflicting transition-transform duration-500 which fights with Framer Motion
                   
                   // Width Override for Slant Overlap:
                   "w-[calc(125%-4px)]"
                )}
              >
                <Tile 
                  {...tile} 
                  id={tile.eventId} // Pass the REAL event ID to the Tile component
                  index={i}
                  onSelect={() => onSelect(tile.eventId)} // Pass real ID on click
                  mode={mode}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
