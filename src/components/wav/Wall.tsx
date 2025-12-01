import React, { useMemo, useState, useEffect } from 'react';
import { motion, MotionValue, useSpring, useTransform } from 'motion/react';
import { Tile } from './Tile';
import { clsx } from 'clsx';
import { WavEvent } from '../../types';

interface WallProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onSelect: (id: string) => void;
  isMobile?: boolean;
  events: WavEvent[];
  isLoading?: boolean;
}

export const Wall: React.FC<WallProps> = ({ mouseX, mouseY, onSelect, isMobile = false, events, isLoading = false }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!isLoading && events.length > 0) {
       // Set hasMounted to true after initial loading is complete AND events are available.
       // This prevents staggered animations on subsequent re-renders (e.g., closing a modal).
       setHasMounted(true);
    }
  }, [isLoading, events.length]);

  // 1. Infinite Wall logic
  // Mobile: 10 rows, 3 cols. (Reduced density for performance)
  // Desktop: 12 rows, 6 cols. (Reduced from 16x8 -> 72 tiles)
  // This significantly reduces DOM nodes while maintaining the "infinite" feel.
  const ROWS = isMobile ? 10 : 12; 
  const COLS = isMobile ? 3 : 6; 
  
  const tiles = useMemo(() => {
    // While loading, if no events, generate placeholder tiles for skeletons
    const sourceEvents = (events && events.length > 0) ? events : (isLoading ? Array(10).fill({ id: 'skeleton', image: '', title: '', brand: '' }) : []);
    
    if (sourceEvents.length === 0) return [];
    
    return Array.from({ length: ROWS * COLS }).map((_, i) => {
      // Use a large prime multiplier to scatter the events pseudo-randomly
      // This prevents visual clusters and makes the repetition less obvious pattern-wise
      const SCATTER_PRIME = 37; 
      const eventIndex = (i * SCATTER_PRIME) % sourceEvents.length;
      const eventData = sourceEvents[eventIndex];
      
      return {
        // id: used for the React key in Wall.tsx (now unused for key, but good for debugging)
        id: `tile-${i}-${eventIndex}`, 
        // eventId: The ACTUAL unique identifier for the event content.
        // We use eventData.id (UUID) if available, fallback to index logic only if necessary.
        eventId: eventData.id || `tile-${eventIndex}`, 
        image: eventData.image, 
        title: eventData.title,
        brand: eventData.brand,
      };
    });
  }, [events, ROWS, COLS, isLoading]);

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

  // Create a stable key based on events to trigger fade transition on filter change
  // REMOVED: The key causing full re-mounts on filter change.
  // Instead, we rely on Tile components updating their props.

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black perspective-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
        */}
        <div 
          className="grid gap-y-1 gap-x-0 w-[180vw] md:w-[130vw]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {tiles.map((tile, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            
            // Critical Path Optimization
            const isCenterRow = row >= (ROWS / 2) - 2 && row <= (ROWS / 2) + 2;
            const isCenterCol = col >= (COLS / 2) - 1 && col <= (COLS / 2) + 1;
            const isCritical = isCenterRow && isCenterCol;

            const shouldExplode = !isMobile;
            const useDelay = !hasMounted && !isLoading && shouldExplode;

            return (
              <motion.div 
                key={`grid-pos-${i}`} 
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "tween", 
                  ease: "easeInOut", 
                  duration: (shouldExplode && !hasMounted) ? 0.8 : 0, 
                  delay: useDelay ? Math.min(i * 0.02, 2.0) : 0
                }}
                className={clsx(
                   "relative w-[calc(125%-4px)] z-10"
                )}
              >
                <Tile 
                  {...tile} 
                  id={tile.eventId} 
                  index={i}
                  onSelect={() => onSelect(tile.eventId)}
                  priority={isCritical}
                  isLoading={isLoading}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};