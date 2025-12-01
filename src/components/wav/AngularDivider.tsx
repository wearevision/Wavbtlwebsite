/**
 * AngularDivider — Separador con Ángulo 17° (Identidad de Marca WAV)
 * 
 * Componente que aplica la geometría cinematográfica como elemento decorativo.
 * Usado en modales, secciones, y cualquier división visual.
 */

import React from 'react';
import clsx from 'clsx';

interface AngularDividerProps {
  /** Dirección del ángulo: positivo (/) o negativo (\) */
  direction?: 'forward' | 'backward';
  /** Opacidad del gradiente */
  opacity?: 'subtle' | 'medium' | 'strong';
  /** Color del gradiente */
  color?: 'white' | 'pink' | 'gradient';
  /** Espaciado vertical */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Clase adicional */
  className?: string;
}

export const AngularDivider: React.FC<AngularDividerProps> = ({
  direction = 'forward',
  opacity = 'medium',
  color = 'white',
  spacing = 'md',
  className = ''
}) => {
  // Opacidad mapping
  const opacityMap = {
    subtle: 'from-white/10 via-white/5 to-transparent',
    medium: 'from-white/20 via-white/10 to-transparent',
    strong: 'from-white/40 via-white/20 to-transparent'
  };

  // Color mapping
  const colorMap = {
    white: opacityMap[opacity],
    pink: 'from-[#FF00A8]/30 via-[#FF00A8]/15 to-transparent',
    gradient: 'from-[#FF00A8]/20 via-[#9B00FF]/10 to-[#0044FF]/20'
  };

  // Spacing mapping
  const spacingMap = {
    none: '',
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8'
  };

  // Ángulo: ~17° = skewY(-1deg) para sutil, skewY(-0.5deg) para muy sutil
  const skewValue = direction === 'forward' ? '-0.5deg' : '0.5deg';

  return (
    <div className={clsx('w-full h-[1px] relative', spacingMap[spacing], className)}>
      <div 
        className={clsx('absolute inset-0 bg-gradient-to-r', colorMap[color])}
        style={{ 
          transform: `skewY(${skewValue})`,
          transformOrigin: direction === 'forward' ? 'left' : 'right'
        }}
      />
    </div>
  );
};

/**
 * AngularCorner — Detalle decorativo angular para esquinas
 * Útil para acentuar cards, modales, o secciones
 */
interface AngularCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'gradient';
}

export const AngularCorner: React.FC<AngularCornerProps> = ({
  position,
  size = 'md',
  color = 'white'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  const clipPathMap = {
    'top-left': 'polygon(0 0, 100% 0, 0 100%)',
    'top-right': 'polygon(0 0, 100% 0, 100% 100%)',
    'bottom-left': 'polygon(0 0, 0 100%, 100% 100%)',
    'bottom-right': 'polygon(100% 0, 100% 100%, 0 100%)'
  };

  const colorStyle = color === 'gradient'
    ? { background: 'linear-gradient(135deg, rgba(255,0,168,0.3) 0%, rgba(155,0,255,0.3) 50%, rgba(0,68,255,0.3) 100%)' }
    : { background: 'rgba(255,255,255,0.1)' };

  return (
    <div 
      className={clsx('absolute pointer-events-none', sizeMap[size], positionMap[position])}
      style={{
        ...colorStyle,
        clipPath: clipPathMap[position]
      }}
    />
  );
};
