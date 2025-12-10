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

  const ogTitle = event.seo_title || `${event.brand} - ${event.title}`;
  const ogDescription = event.seo_description || event.summary || event.description?.substring(0, 155) || '';
  const ogImage = event.og_image || event.image || '';

  return (
    <div className="space-y-4">
      {/* Link Input with Copy Button */}
      <div className="space-y-2">
        <label className="text-xs text-neutral-500">Link OpenGraph (Compartir en Redes)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={ogLink}
            readOnly
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-xs text-neutral-400 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded font-medium text-xs transition-all active:scale-95 flex items-center gap-2 ${
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
          Compatible con WhatsApp, LinkedIn, Facebook, Twitter, Discord, Telegram y más
        </p>
      </div>

      {/* Visual Preview */}
      <div className="space-y-2">
        <label className="text-xs text-neutral-500">Preview (Cómo se verá en redes sociales)</label>
        <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950">
          {/* Image */}
          {ogImage && (
            <div className="w-full aspect-[1.91/1] bg-neutral-900 relative overflow-hidden">
              <img 
                src={ogImage} 
                alt={ogTitle}
                className="w-full h-full object-cover"
              />
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
            <p className="text-xs text-neutral-600 uppercase">
              btl.wearevision.cl
            </p>
          </div>
        </div>
      </div>

      {/* Platform Icons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-neutral-600">Probado en:</span>
        <div className="flex gap-1.5">
          {['WhatsApp', 'LinkedIn', 'Facebook', 'Twitter', 'Discord'].map((platform) => (
            <div
              key={platform}
              className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-500"
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};