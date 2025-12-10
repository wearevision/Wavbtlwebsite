import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, CheckCircle2, XCircle, AlertTriangle, Zap } from 'lucide-react';
import { WavEvent } from '../../types';
import { useEventEnricher } from '../../src/hooks/useEventEnricher';
import { Progress } from '../ui/progress';

interface BatchProcessingModalProps {
  events: WavEvent[];
  mode: 'fill' | 'optimize'; // NEW: Fill empty fields or optimize all
  onComplete: () => void;
  onClose: () => void;
  onSaveEvent: (index: number, enrichedData: any) => void;
}

type LogLevel = 'info' | 'success' | 'error' | 'warning';

interface LogEntry {
  id: string;
  message: string;
  level: LogLevel;
  timestamp: Date;
}

export const BatchProcessingModal: React.FC<BatchProcessingModalProps> = ({
  events,
  mode,
  onComplete,
  onClose,
  onSaveEvent
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState({
    total: events.length,
    processed: 0,
    success: 0,
    failed: 0,
    skipped: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  
  const { enrichBatch } = useEventEnricher();
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Prevent accidental close while processing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isProcessing) {
        e.preventDefault();
        e.returnValue = '¿Estás seguro? El procesamiento aún está en curso.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isProcessing]);

  const addLog = (message: string, level: LogLevel = 'info') => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      level,
      timestamp: new Date()
    };
    setLogs(prev => [...prev, newLog]);
  };

  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case 'success':
        return <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />;
      case 'error':
        return <XCircle className="w-3 h-3 text-red-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3 h-3 text-yellow-500 shrink-0" />;
      default:
        return <span className="w-3 h-3 shrink-0 text-blue-500">ℹ️</span>;
    }
  };

  const getLogColor = (level: LogLevel) => {
    switch (level) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  const startProcessing = async () => {
    setIsProcessing(true);
    setIsComplete(false);
    setProgress(0);
    setStats({
      total: events.length,
      processed: 0,
      success: 0,
      failed: 0,
      skipped: 0
    });
    setLogs([]);

    addLog(`🚀 Iniciando procesamiento batch de ${events.length} eventos...`, 'info');
    addLog(`⚡️ Modo: ${mode === 'fill' ? 'AUTO-COMPLETAR DATOS (solo campos vacíos)' : 'OPTIMIZAR TODO (mejora completa)'}`, 'info');
    addLog(`─────────────────────────────────────────`, 'info');

    try {
      const results = await enrichBatch(
        events,
        mode,
        (current, total) => {
          setCurrentIndex(current);
          setProgress((current / total) * 100);
          
          const event = events[current - 1];
          if (event) {
            addLog(
              `[${current}/${total}] Analizando: "${event.title || 'Sin título'}"...`,
              'info'
            );
          }
        },
        // Skip events that already have technical_summary (optional)
        (event) => {
          if (event.technical_summary && event.technical_summary.length > 50) {
            addLog(`⏭️  Omitido: "${event.title}" (ya optimizado)`, 'warning');
            setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
            return true;
          }
          return false;
        }
      );

      // Process results and update stats
      let successCount = 0;
      let failedCount = 0;

      results.forEach((result, index) => {
        const event = events[index];
        
        if (result.error) {
          failedCount++;
          addLog(`❌ ERROR: "${event.title}" - ${result.error}`, 'error');
        } else if (result.result) {
          successCount++;
          
          // Apply enriched data to the event
          onSaveEvent(index, result.result);
          
          addLog(`✅ Completado: "${event.title}"`, 'success');
        }
      });

      setStats(prev => ({
        ...prev,
        processed: events.length,
        success: successCount,
        failed: failedCount
      }));

      addLog(`─────────────────────────────────────────`, 'info');
      addLog(`🎉 PROCESAMIENTO COMPLETADO`, 'success');
      addLog(`✅ Exitosos: ${successCount}`, 'success');
      addLog(`❌ Fallidos: ${failedCount}`, 'error');
      addLog(`⏭️  Omitidos: ${stats.skipped}`, 'warning');
      addLog(`─────────────────────────────────────────`, 'info');
      addLog(`💾 Guardando cambios en Supabase...`, 'info');
      
      setIsComplete(true);
      
      try {
        await onComplete();
        addLog(`✅ Cambios guardados exitosamente en Supabase`, 'success');
        addLog(`─────────────────────────────────────────`, 'info');
        addLog(`🏁 PROCESO FINALIZADO - Todos los cambios están sincronizados`, 'success');
      } catch (saveError: any) {
        addLog(`❌ ERROR al guardar en Supabase: ${saveError.message}`, 'error');
        addLog(`⚠️  Los cambios están en memoria local. Usa "Guardar en Supabase" manualmente.`, 'warning');
      }
      
    } catch (error: any) {
      addLog(`❌ ERROR CRÍTICO: ${error.message}`, 'error');
      addLog(`Revisa los logs del navegador para más detalles.`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) {
      if (!confirm('¿Estás seguro? El procesamiento aún está en curso.')) {
        return;
      }
    }
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-neutral-950 border-2 border-purple-500/30 rounded-lg shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">
                {mode === 'fill' ? '🪄 Auto-Completar Datos (Batch)' : '✨ Optimizar Todo (Batch)'}
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {mode === 'fill' ? 'Completa campos vacíos en múltiples eventos' : 'Optimiza TODO con visión de Productor BTL + SEO Expert'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-black/40">
          <div className="text-center">
            <div className="text-2xl font-bold text-white font-mono">
              {stats.total}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              Total
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {stats.processed}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              Procesados
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 font-mono">
              {stats.success}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              Exitosos
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 font-mono">
              {stats.failed}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              Fallidos
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 font-mono">
              {stats.skipped}
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              Omitidos
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="px-6 py-3 bg-black/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400 font-mono">
                Procesando evento {currentIndex} de {stats.total}...
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Live Log Console */}
        <div className="h-[400px] overflow-y-auto bg-black px-6 py-4 font-mono text-xs">
          {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-neutral-600">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p>Esperando inicio de procesamiento...</p>
            </div>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              {getLogIcon(log.level)}
              <span className={`flex-1 ${getLogColor(log.level)}`}>
                {log.message}
              </span>
              <span className="text-neutral-700 text-[10px] shrink-0">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/50 border-t border-neutral-800">
          {!isProcessing && !isComplete && (
            <>
              <p className="text-xs text-neutral-500">
                Se procesarán {events.length} eventos secuencialmente
              </p>
              <button
                onClick={startProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl"
              >
                <Zap className="w-4 h-4" />
                Iniciar Procesamiento
              </button>
            </>
          )}
          
          {isProcessing && (
            <>
              <div className="flex items-center gap-2 text-purple-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">
                  Procesando... No cierres esta ventana.
                </span>
              </div>
              <button
                disabled
                className="px-4 py-2 bg-neutral-800 rounded-lg text-neutral-600 font-medium cursor-not-allowed"
              >
                Procesando...
              </button>
            </>
          )}

          {isComplete && (
            <>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">
                  ¡Procesamiento completado! {stats.success}/{stats.total} exitosos
                </span>
              </div>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
              >
                Cerrar
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};