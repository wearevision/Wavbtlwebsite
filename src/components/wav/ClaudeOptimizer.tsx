import React, { useState } from 'react';
import { WavEvent } from '../../types';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Loader2, Download, CheckCircle } from 'lucide-react';

interface ClaudeOptimizerProps {
  events: WavEvent[];
  onComplete: () => void;
}

export function ClaudeOptimizer({ events, onComplete }: ClaudeOptimizerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizedEvents, setOptimizedEvents] = useState<WavEvent[] | null>(null);
  const [progress, setProgress] = useState('');

  // Exponer función globalmente para que Claude inyecte eventos
  React.useEffect(() => {
    // @ts-ignore
    window.claudeInjectOptimizedEvents = (optimized: WavEvent[]) => {
      setOptimizedEvents(optimized);
      setProgress(`✅ ${optimized.length} eventos listos`);
    };
    
    return () => {
      // @ts-ignore
      delete window.claudeInjectOptimizedEvents;
    };
  }, []);

  const applyOptimizedEvents = async () => {
    if (!optimizedEvents) {
      alert('No hay eventos optimizados para aplicar');
      return;
    }

    if (!confirm(
      `¿Aplicar ${optimizedEvents.length} eventos optimizados?\n\n` +
      `Esto reemplazará TODOS los eventos actuales.`
    )) {
      return;
    }

    setIsProcessing(true);
    setProgress('Guardando...');

    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/batch-update-events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ events: optimizedEvents })
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const result = await res.json();
      console.log('✅ Eventos guardados:', result);

      alert(
        `✅ OPTIMIZACIÓN APLICADA\n\n` +
        `${optimizedEvents.length} eventos optimizados guardados.`
      );

      setOptimizedEvents(null);
      setProgress('');
      onComplete();
    } catch (error: any) {
      console.error('❌ Error aplicando eventos:', error);
      alert(`Error al guardar: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const showRawData = () => {
    const dataToExport = optimizedEvents || events;
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = optimizedEvents ? 'optimized-events.json' : 'current-events.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <h3 className="text-xs font-mono tracking-wider text-white/60 mb-1 uppercase">
          🤖 Claude Optimizer
        </h3>
        <p className="text-[10px] text-white/40 leading-relaxed">
          Sin costos API, sin rate limits, sin timeouts.
        </p>
      </div>

      {/* Status */}
      <div className="p-3 bg-white/5 border border-white/10">
        <div className="text-[10px] text-white/40 mb-1">ESTADO</div>
        <div className="text-xs text-white font-mono">
          {optimizedEvents ? (
            <span className="text-green-400">✅ {optimizedEvents.length} listos</span>
          ) : (
            <span>{events.length} eventos actuales</span>
          )}
        </div>
      </div>

      {progress && (
        <div className="p-2 bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] text-blue-400 font-mono">{progress}</div>
        </div>
      )}

      {/* Actions */}
      {optimizedEvents ? (
        <div className="space-y-2">
          <button
            onClick={applyOptimizedEvents}
            disabled={isProcessing}
            className="w-full py-2.5 bg-gradient-to-r from-[#FF00A8] to-[#9B00FF] text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-all uppercase tracking-wider"
          >
            {isProcessing ? (
              <>
                <Loader2 size={12} className="inline mr-2 animate-spin" />
                Aplicando...
              </>
            ) : (
              <>
                <CheckCircle size={12} className="inline mr-2" />
                Aplicar Optimización
              </>
            )}
          </button>
          <button
            onClick={showRawData}
            className="w-full py-2 border border-white/10 text-white/60 hover:bg-white/5 text-xs transition-colors uppercase tracking-wider"
          >
            <Download size={12} className="inline mr-2" />
            Descargar JSON
          </button>
          <button
            onClick={() => setOptimizedEvents(null)}
            className="w-full py-2 text-white/40 hover:text-white/60 text-xs transition-colors"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={showRawData}
          className="w-full py-2.5 border border-white/10 text-white/60 hover:bg-white/5 text-xs transition-colors uppercase tracking-wider"
        >
          <Download size={12} className="inline mr-2" />
          Exportar Actuales
        </button>
      )}

      {/* Instructions */}
      <details className="border border-white/5 bg-white/5">
        <summary className="px-3 py-2 cursor-pointer text-white/40 hover:text-white/60 text-[10px] uppercase tracking-wider">
          Instrucciones
        </summary>
        <div className="p-3 border-t border-white/10 text-[9px] text-white/30 space-y-1 font-mono leading-relaxed">
          <p>1. Claude lee eventos del servidor</p>
          <p>2. Genera contenido completo para cada campo</p>
          <p>3. Usuario aplica con un click</p>
          <p className="text-green-400/40 mt-2">
            ✅ Sin costos, sin límites, sin timeouts
          </p>
        </div>
      </details>
    </div>
  );
}
