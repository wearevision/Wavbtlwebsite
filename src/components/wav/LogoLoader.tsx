import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import logoAsset from "figma:asset/92a3b785dc625256d86bdd9c883bcbe054fc7639.png";

interface LogoLoaderProps {
  onComplete: () => void;
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2s fill + 0.5s delay
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="relative w-24 h-24 md:w-40 md:h-40">
        {/* Background (Faint) Logo */}
        <img 
          src={logoAsset} 
          className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale"
          alt="Logo Background"
        />
        
        {/* Filling Logo */}
        <motion.div 
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full overflow-hidden"
        >
           {/* Inner container fixed to full height to maintain mask position */}
           <div className="absolute bottom-0 left-0 w-full h-24 md:h-40">
             <div 
               className="w-full h-full"
               style={{
                 maskImage: `url(${logoAsset})`,
                 maskSize: 'contain',
                 maskRepeat: 'no-repeat',
                 maskPosition: 'center',
                 WebkitMaskImage: `url(${logoAsset})`,
                 WebkitMaskSize: 'contain',
                 WebkitMaskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'center',
                 background: 'linear-gradient(to top, #FF00A8, #9B00FF, #0044FF)'
               }}
             />
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
