/**
 * CircularNavButton — Botón de navegación con loading circular degradado WAV
 * 
 * Inspirado en el efecto de loading del logo.
 * El círculo se llena con degradado WAV en hover/focus.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CircularNavButtonProps {
  direction: 'prev' | 'next';
  onClick: (e: React.MouseEvent) => void;
  position: 'left' | 'right';
  className?: string;
  ariaLabel: string;
  isActive?: boolean; // Visual feedback when keyboard pressed
}

export const CircularNavButton: React.FC<CircularNavButtonProps> = ({
  direction,
  onClick,
  position,
  className = '',
  ariaLabel,
  isActive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  // Position classes
  const positionClasses = position === 'left' 
    ? 'left-6 lg:left-10' 
    : 'right-6 lg:right-10';
  
  // Show fill when hovered OR active via keyboard
  const showFill = isHovered || isActive;

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group fixed ${positionClasses} top-1/2 -translate-y-1/2 z-[65] ${className}`}
      initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        // Pulse effect when keyboard activated
        scale: isActive ? [1, 1.1, 1] : 1
      }}
      exit={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        scale: isActive ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.2 }
      }}
      aria-label={ariaLabel}
      style={{
        // Garantizar touch target mínimo de 44x44px (accesibilidad)
        minWidth: '44px',
        minHeight: '44px',
        // Área de touch en mobile (iOS/Android)
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div className="relative w-14 h-14 lg:w-16 lg:h-16">
        {/* SVG Circle with Gradient Fill */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 64 64"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF00A8" />
              <stop offset="50%" stopColor="#9B00FF" />
              <stop offset="100%" stopColor="#0044FF" />
            </linearGradient>
          </defs>

          {/* Base Circle (Background) */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Gradient Circle (Animated Fill) */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={`url(#gradient-${direction})`}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 176" }}
            animate={{ 
              strokeDasharray: showFill ? "176 176" : "0 176",
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
        </svg>

        {/* Icon Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon 
            className="w-6 h-6 lg:w-7 lg:h-7 text-white transition-transform duration-300 group-hover:scale-110"
            strokeWidth={2.5}
          />
        </div>

        {/* Subtle Glow on Hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle, rgba(255,0,168,0.2) 0%, rgba(155,0,255,0.1) 50%, transparent 70%)',
            filter: 'blur(8px)',
            transform: 'scale(1.2)',
            zIndex: -1
          }}
        />
      </div>
    </motion.button>
  );
};