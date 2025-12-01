import React, { useState } from 'react';
import { Copy, Check, Share2, ExternalLink } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

interface ShareLinkButtonProps {
  eventSlug: string;
  eventTitle: string;
  variant?: 'inline' | 'card';
}

/**
 * ShareLinkButton
 * 
 * Displays shareable URLs for an event with copy-to-clipboard functionality.
 * Shows both the OG-preview URL (for social media) and the main app URL.
 */
export const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ 
  eventSlug, 
  eventTitle,
  variant = 'inline'
}) => {
  const [copiedType, setCopiedType] = useState<'og' | 'app' | null>(null);
  
  if (!eventSlug) return null;
  
  // Generate URLs
  const ogUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/og-preview?evento=${eventSlug}`;
  const appUrl = `https://btl.wearevision.cl?evento=${eventSlug}`;
  
  const handleCopy = async (url: string, type: 'og' | 'app') => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
        return;
      }
    } catch (err) {
      // Silently fall through to fallback - this is expected in some environments
    }
    
    // Fallback: Create temporary textarea and select text
    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '1px';
      textarea.style.height = '1px';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      document.body.appendChild(textarea);
      
      // Select and copy
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      } else {
        // Last resort: Show alert with URL
        alert(`No se pudo copiar automáticamente. Copia esta URL manualmente:\n\n${url}`);
      }
    } catch (err) {
      console.error('All copy methods failed:', err);
      alert(`No se pudo copiar automáticamente. Copia esta URL manualmente:\n\n${url}`);
    }
  };
  
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-neutral-500" />
        <button
          onClick={() => handleCopy(ogUrl, 'og')}
          className="px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-lg text-xs text-pink-400 transition-all flex items-center gap-2"
          title="Copiar link para redes sociales (LinkedIn, Facebook, WhatsApp)"
        >
          {copiedType === 'og' ? (
            <>
              <Check className="w-3 h-3" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Link Social</span>
            </>
          )}
        </button>
      </div>
    );
  }
  
  // Card variant - shows both URLs
  return (
    <div className="space-y-3 bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-4 h-4 text-pink-500" />
        <h4 className="text-sm font-bold text-white">Compartir Evento</h4>
      </div>
      
      {/* OG URL - For Social Media */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-neutral-400 flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            <span>Para LinkedIn, Facebook, WhatsApp</span>
          </label>
          <span className="text-[10px] text-green-500 font-mono">OG optimizada</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={ogUrl}
            readOnly
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-neutral-300 font-mono truncate"
          />
          <button
            onClick={() => handleCopy(ogUrl, 'og')}
            className="px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition-all flex items-center gap-2 shrink-0"
            title="Copiar URL para redes sociales"
          >
            {copiedType === 'og' ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs">Copiar</span>
              </>
            )}
          </button>
        </div>
        <p className="text-[10px] text-neutral-500 italic">
          * Esta URL muestra la imagen y descripción al compartir en redes sociales
        </p>
      </div>
      
      {/* App URL - Direct Link */}
      <div className="space-y-2 pt-3 border-t border-neutral-800">
        <label className="text-xs text-neutral-400">
          Link directo a la aplicación
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={appUrl}
            readOnly
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-neutral-300 font-mono truncate"
          />
          <button
            onClick={() => handleCopy(appUrl, 'app')}
            className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded transition-all flex items-center gap-2 shrink-0"
          >
            {copiedType === 'app' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Info Banner */}
      <div className="mt-4 bg-blue-950/30 border border-blue-500/30 rounded-lg p-3">
        <p className="text-[11px] text-blue-300 leading-relaxed">
          💡 <strong>Recomendación:</strong> Usa el "Link Social" para compartir en LinkedIn, Facebook o WhatsApp. 
          Los crawlers detectarán automáticamente la imagen, título y descripción del evento.
        </p>
      </div>
    </div>
  );
};