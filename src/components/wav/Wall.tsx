import React, { useMemo } from 'react';
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
  // 1. Infinite Wall logic
  // Mobile: 9 rows, 6 cols.
  // Desktop: Scaled to ~65% size -> Increased density. 
  // Rows: 9 * 1.5 ~= 14. Cols: 6 * 1.5 = 9.
  const ROWS = isMobile ? 9 : 14; 
  const COLS = isMobile ? 6 : 9; 
  
  const tiles = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    return Array.from({ length: ROWS * COLS }).map((_, i) => {
      // Use modulo to loop through the events array if grid is larger than data
      const eventData = events[i % events.length];
      return {
        id: `tile-${i}`,
        image: eventData.image, 
        title: eventData.title,
        brand: eventData.brand,
        // Pass description if needed, though Tile doesn't display it currently
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
        className="relative flex flex-col items-center justify-center shrink-0 origin-center will-change-transform"
      >
        {/* 
           Grid Container
           - Mobile: w-[200vw]. For 320px viewport, grid is 640px. 6 cols -> ~106px/col. 
             Visible width 320px captures ~3 columns.
           - Desktop: w-[120vw]. For 1920px viewport, grid is 2304px. 6 cols -> ~384px/col.
             Visible width 1920px captures ~5 columns.
        */}
        <div 
          className="grid gap-y-1 gap-x-0 w-[200vw] md:w-[120vw]"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {tiles.map((tile, i) => {
            const row = Math.floor(i / COLS);
            const isEvenRow = row % 2 === 0;
            const shouldExplode = !isMobile; // Disable heavy layout animation on mobile

            return (
              <motion.div 
                layout={shouldExplode}
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
                  duration: shouldExplode ? 0.8 : 0, // No transition on mobile
                  delay: (isLoading || !shouldExplode) ? 0 : i * 0.05
                }}
                className={clsx(
                   "relative transition-transform duration-500",
                   // Removed stagger logic to maintain perfect vertical alignment of trapezoids
                   
                   // Width Override for Slant Overlap:
                   "w-[calc(125%-4px)]"
                )}
              >
                <Tile 
                  {...tile} 
                  index={i}
                  onSelect={() => onSelect(tile.id)} 
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
