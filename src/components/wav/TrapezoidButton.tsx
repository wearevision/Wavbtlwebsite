/**
 * TrapezoidButton — Botón con Clip-Path 17°
 * 
 * Botón que respeta las Guidelines de WAV BTL:
 * - Geometric Integrity (17° inward angle en los lados)
 * - No-Smoke Policy (funcional, high-contrast)
 * 
 * Usado para: Close button, Menu button, Navigation
 */

import React from 'react';
import { clsx } from 'clsx';

interface TrapezoidButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const TrapezoidButton: React.FC<TrapezoidButtonProps> = ({
  onClick,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ariaLabel,
  disabled = false,
  type = 'button',
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  // Variant configurations
  const variantClasses = {
    solid: 'bg-white text-black hover:bg-neutral-200 border-white/10',
    outline: 'bg-transparent text-white hover:bg-white/10 border-white/20',
    ghost: 'bg-black/50 text-white hover:bg-black/70 border-white/10',
  };

  // Clip-path para ángulo 17° PARALELO (no espejo)
  // Matching Guidelines.md geometry - ambos lados inclinados en la misma dirección
  const clipPathStyle = {
    clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        'flex items-center justify-center',
        'shadow-lg border',
        'transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={clipPathStyle}
    >
      {children}
    </button>
  );
};

/**
 * TrapezoidButtonGroup — Grupo de botones trapezoidales
 * Con spacing correcto según Guidelines.md
 */
interface TrapezoidButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export const TrapezoidButtonGroup: React.FC<TrapezoidButtonGroupProps> = ({
  children,
  className = '',
  gap = 'md',
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={clsx('flex items-center', gapClasses[gap], className)}>
      {children}
    </div>
  );
};
