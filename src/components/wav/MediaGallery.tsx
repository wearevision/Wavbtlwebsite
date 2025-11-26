import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WavMedia } from '../../types';
import { Volume2, VolumeX } from 'lucide-react';
import { clsx } from 'clsx';

interface MediaGalleryProps {
  gallery: WavMedia[];
  mode: string;
  className?: string;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const IMAGE_DURATION = 5000; // 5 seconds for images

export const MediaGallery: React.FC<MediaGalleryProps> = ({ gallery, mode, className, currentIndex, onIndexChange }) => {
  // Muted by default as requested
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const currentMedia = gallery[currentIndex];
  const nextIndex = (currentIndex + 1) % gallery.length;

  // Auto-advance logic
  useEffect(() => {
    if (!currentMedia) return;

    let timeout: NodeJS.Timeout;

    if (currentMedia.type === 'image') {
      // For images, simple timeout
      if (gallery.length > 1) {
         timeout = setTimeout(() => {
           onIndexChange(nextIndex);
         }, IMAGE_DURATION);
      }
    } else if (currentMedia.type === 'video') {
      // For videos, the 'ended' event handles it (see <video> tag)
      // If it's a single video in loop, we don't advance index, just loop.
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, gallery.length, currentMedia, nextIndex, onIndexChange]);

  // Volume Logic
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, currentIndex]);

  const handleVideoEnded = () => {
    if (gallery.length > 1) {
      onIndexChange(nextIndex);
    } else {
      // Loop single video
      videoRef.current?.play();
    }
  };

  // Clean rendering (No color filters as requested)
  const imageClasses = "w-full h-full object-cover";

  return (
    <div className={clsx("relative w-full h-full overflow-hidden bg-black", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentMedia.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {currentMedia.type === 'video' ? (
             <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  className={imageClasses}
                  autoPlay
                  playsInline
                  muted={isMuted}
                  onEnded={handleVideoEnded}
                />
             </div>
          ) : (
             <div className="relative w-full h-full">
                <img 
                  src={currentMedia.url} 
                  alt="Gallery" 
                  className={imageClasses}
                />
             </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Controls Overlay (Audio) */}
      <div className="absolute bottom-4 right-4 z-30 flex gap-2">
         {currentMedia.type === 'video' && (
             <button 
               onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
               className="p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm border border-white/10"
             >
               {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
             </button>
         )}
      </div>
      
      {/* Progress Indicators */}
      {gallery.length > 1 && (
        <div className="absolute bottom-4 left-4 z-30 flex gap-1">
          {gallery.map((_, idx) => (
            <div 
              key={idx}
              className={clsx(
                "h-1 rounded-full transition-all duration-300 shadow-sm",
                idx === currentIndex ? "w-6 bg-white" : "w-1 bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
