/**
 * OpenGraphPreview Component
 * 
 * Visual preview of how the OpenGraph link will look when shared
 * on social platforms (WhatsApp, LinkedIn, Facebook, Twitter, etc.)
 */

import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { WavEvent } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

interface OpenGraphPreviewProps {
  event: WavEvent;
  ogLink: string;
}

export const OpenGraphPreview: React.FC<OpenGraphPreviewProps> = ({ event, ogLink }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(ogLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Use the same logic as the server endpoint
  const ogTitle = event.seo_title || `${event.brand} - ${event.title}`;
  const ogDescription = event.seo_description || event.summary || event.description?.substring(0, 155) || '';
  const ogImage = event.og_image || event.image || '';

  return (
    <div className="space-y-4">
      {/* Link Input with Copy Button */}
      <div className="space-y-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Link OpenGraph para Compartir</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={ogLink}
            readOnly
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-xs text-neutral-400 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500 select-all"
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded font-medium text-xs transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap ${ 
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copiado
              </>
            ) : (
              'Copiar Link'
            )}
          </button>
        </div>
        <p className="text-xs text-neutral-600">
          Este link genera una preview automática con imagen, título y descripción optimizados para redes sociales
        </p>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <label className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Preview (Cómo se verá al compartir)</label>
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950 hover:border-neutral-700 transition-colors">
          {/* Image */}
          {ogImage ? (
            <div className="w-full aspect-[1.91/1] bg-neutral-900 relative overflow-hidden">
              <img 
                src={ogImage} 
                alt={ogTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-neutral-600 text-xs">Imagen no disponible</div>';
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-full aspect-[1.91/1] bg-neutral-900 flex items-center justify-center">
              <p className="text-neutral-600 text-xs">Sin imagen de OpenGraph</p>
            </div>
          )}
          
          {/* Text Content */}
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-white line-clamp-2">
                {ogTitle}
              </h3>
              <ExternalLink className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            </div>
            <p className="text-xs text-neutral-400 line-clamp-3">
              {ogDescription}
            </p>
            <p className="text-xs text-neutral-600 uppercase tracking-wide">
              btl.wearevision.cl
            </p>
          </div>
        </div>
      </div>

      {/* Platform Icons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-neutral-600">Compatible con:</span>
        <div className="flex gap-1.5 flex-wrap">
          {['WhatsApp', 'LinkedIn', 'Facebook', 'Twitter', 'Discord', 'Telegram'].map((platform) => (
            <div
              key={platform}
              className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-500 hover:bg-neutral-800 transition-colors"
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg">
        <p className="text-xs text-neutral-500 leading-relaxed">
          <span className="text-neutral-400 font-medium">💡 Cómo usar:</span> Copia el link y pégalo en cualquier red social. 
          La plataforma detectará automáticamente la imagen, título y descripción del evento.
        </p>
      </div>
    </div>
  );
};