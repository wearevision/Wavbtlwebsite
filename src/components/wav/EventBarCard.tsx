/**
 * EventBarCard — Tarjeta Horizontal Compacta
 * 
 * Componente para vista de lista del CMS.
 * Muestra información resumida de un evento en formato barra horizontal.
 */

import React from 'react';
import { WavEvent } from '../../types';
import { ImageIcon } from 'lucide-react';
import { optimizeForThumbnail } from '../../utils/imageOptimizer';

interface EventBarCardProps {
  event: WavEvent;
  onClick: () => void;
  isSelected?: boolean;
  showSkeleton?: boolean;
}

export const EventBarCard: React.FC<EventBarCardProps> = ({
  event,
  onClick,
  isSelected = false,
  showSkeleton = false
}) => {
  // Detectar si el evento está vacío o incompleto
  const isEmpty = !event.title || !event.description || !event.image;
  const shouldShowSkeleton = showSkeleton || isEmpty;

  if (shouldShowSkeleton) {
    return (
      <button
        onClick={onClick}
        className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg p-4 transition-all group"
      >
        <div className="flex items-center gap-4">
          {/* Skeleton Thumbnail */}
          <div className="w-20 h-20 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0 animate-pulse">
            <ImageIcon className="w-8 h-8 text-neutral-600" />
          </div>

          {/* Skeleton Content */}
          <div className="flex-1 flex flex-col gap-2 items-start">
            <div className="h-3 w-24 bg-neutral-800 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-neutral-700 rounded animate-pulse" />
            <div className="h-3 w-full bg-neutral-800 rounded animate-pulse" />
          </div>

          {/* Skeleton Badge */}
          <div className="h-6 w-32 bg-neutral-800 rounded-full animate-pulse flex-shrink-0" />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full bg-neutral-900 border transition-all group text-left rounded-lg overflow-hidden ${
        isSelected 
          ? 'border-pink-500 shadow-lg shadow-pink-500/20' 
          : 'border-neutral-800 hover:border-pink-500/50'
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 bg-neutral-800 rounded overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform">
          {event.image ? (
            <img
              src={optimizeForThumbnail(event.image)}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-neutral-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Brand */}
          <div className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-1 truncate">
            {event.brand || 'Sin marca'}
          </div>

          {/* Title */}
          <h3 className="font-bold text-white group-hover:text-pink-500 transition-colors mb-1 line-clamp-1">
            {event.title || 'Sin título'}
          </h3>

          {/* Summary/Description */}
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {event.summary || event.description?.substring(0, 160) || 'Sin descripción disponible'}
          </p>
        </div>
      </div>
    </button>
  );
};

/**
 * SkeletonEventBar — Placeholder para eventos cargando
 */
export const SkeletonEventBar: React.FC = () => {
  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-neutral-800 rounded animate-pulse flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-24 bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-neutral-700 rounded animate-pulse" />
          <div className="h-3 w-full bg-neutral-800 rounded animate-pulse" />
        </div>
        <div className="h-6 w-32 bg-neutral-800 rounded-full animate-pulse flex-shrink-0 hidden md:block" />
      </div>
    </div>
  );
};