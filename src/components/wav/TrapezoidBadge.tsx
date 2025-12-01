/**
 * TrapezoidBadge — Badge Geométrico con Ángulo 17°
 * 
 * Componente que respeta las Guidelines de WAV BTL:
 * - Geometric Integrity (17° inward angle)
 * - No emojis
 * - Cinematic Geometry aesthetic
 */

import React from 'react';

interface TrapezoidBadgeProps {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'white';
  className?: string;
}

export const TrapezoidBadge: React.FC<TrapezoidBadgeProps> = ({
  label,
  size = 'md',
  variant = 'solid',
  className = ''
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] tracking-wide',
    sm: 'px-3 py-1 text-xs tracking-wide',
    md: 'px-4 py-1.5 text-sm tracking-wider',
    lg: 'px-5 py-2 text-base tracking-wider'
  };

  // Variant configurations
  const variantClasses = {
    solid: 'bg-neutral-800 text-white border-neutral-700',
    outline: 'bg-transparent text-neutral-300 border-neutral-700',
    ghost: 'bg-neutral-900/50 text-neutral-400 border-neutral-800',
    white: 'bg-white/95 text-black border-white backdrop-blur-sm' // White variant with slight transparency
  };

  // Clip-path for 17° trapezoid angle
  // Matches Wall.tsx tile geometry
  const clipPathStyle = {
    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
  };

  return (
    <div
      className={`
        relative overflow-hidden inline-block
        border
        font-medium uppercase
        transition-all duration-300
        whitespace-normal text-center
        break-words
        max-w-[80vw] md:max-w-[300px] lg:max-w-[400px]
        px-6
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        clipPath: `polygon(${
          { xs: '6px', sm: '8px', md: '10px', lg: '12px' }[size] || '10px'
        } 0%, 100% 0%, calc(100% - ${
          { xs: '6px', sm: '8px', md: '10px', lg: '12px' }[size] || '10px'
        }) 100%, 0% 100%)`
      }}
    >
      {/* Text content */}
      <span className="relative z-10 block">
        {label}
      </span>

      {/* Optional subtle gradient overlay for depth */}
      {variant === 'solid' && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            clipPath: `polygon(${
              { xs: '6px', sm: '8px', md: '10px', lg: '12px' }[size] || '10px'
            } 0%, 100% 0%, calc(100% - ${
              { xs: '6px', sm: '8px', md: '10px', lg: '12px' }[size] || '10px'
            }) 100%, 0% 100%)`
          }}
        />
      )}
    </div>
  );
};

/**
 * CategoryBadgeList — Grid de badges para múltiples categorías
 * Útil para mostrar tags en modales o cards
 */
interface CategoryBadgeListProps {
  categories: Array<{ id: string; label: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'white';
  onClickCategory?: (categoryId: string) => void;
}

export const CategoryBadgeList: React.FC<CategoryBadgeListProps> = ({
  categories,
  size = 'sm',
  variant = 'solid',
  onClickCategory
}) => {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onClickCategory?.(category.id)}
          disabled={!onClickCategory}
          className={`
            transition-transform hover:scale-105
            ${onClickCategory ? 'cursor-pointer' : 'cursor-default'}
          `}
        >
          <TrapezoidBadge
            label={category.label}
            size={size}
            variant={variant}
          />
        </button>
      ))}
    </div>
  );
};