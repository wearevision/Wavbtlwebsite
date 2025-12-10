import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Loader2, CheckCircle2, XCircle, AlertTriangle, Database, Search } from 'lucide-react';
import { Progress } from '../ui/progress';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { supabase } from '../../utils/supabase/client';

interface AssetMigrationModalProps {
  onComplete: () => void;
  onClose: () => void;
}

type LogLevel = 'info' | 'success' | 'error' | 'warning';

interface LogEntry {
  id: string;
  message: string;
  level: LogLevel;
  timestamp: Date;
}

interface MigrationStats {
  total: number;
  migrated: number;
  skipped: number;
  errors: number;
}

export const AssetMigrationModal: React.FC<AssetMigrationModalProps> = ({
  onComplete,
  onClose
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<MigrationStats>({
    total: 0,
    migrated: 0,
    skipped: 0,
    errors: 0
  });
  const [isComplete, setIsComplete] = useState(false);
  
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
        e.returnValue = '¿Estás seguro? La migración aún está en curso.';
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
        return <Database className="w-3 h-3 text-blue-500 shrink-0" />;
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
        return 'text-cyan-400';
    }
  };

  const startMigration = async () => {
    setIsProcessing(true);
    setIsComplete(false);
    setProgress(0);
    setLogs([]);

    addLog('🚀 Iniciando migración de assets...', 'info');
    addLog('📡 Conectando con Supabase Storage...', 'info');
    addLog('─────────────────────────────────────────', 'info');

    try {
      // Get current session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        addLog('⚠️ No se detectó sesión de usuario. Intentando con clave pública...', 'warning');
        addLog('ℹ️ Si falla con 401, por favor inicia sesión como administrador.', 'info');
      } else {
        addLog('🔑 Sesión de usuario detectada.', 'info');
      }

      // First attempt: Try with user token if available
      let response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/migrate-assets`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || publicAnonKey}`
          }
        }
      );

      // If 401 Unauthorized and we used a user token, retry with Anon Key
      if (response.status === 401 && token) {
        addLog('⚠️ Sesión de usuario rechazada. Reintentando con clave pública...', 'warning');
        console.log('[Migration] Retrying with Anon Key...');
        
        // Try to read error details from first failure if possible
        try {
           const errData = await response.clone().json();
           if (errData.details) {
             console.log('[Migration] First attempt 401 details:', errData.details);
             addLog(`Diagnóstico 1er intento: ${errData.details}`, 'warning');
           }
        } catch (e) { /* ignore */ }

        response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/migrate-assets`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
      }

      // Log raw response details for debugging
      console.log('[Migration] Response status:', response.status);
      
      const responseText = await response.text();
      let result;
      
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.log('[Migration] Non-JSON response:', responseText);
      }

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        if (result) {
          console.log('[Migration] Error data:', result);
          errorMessage = result.error || result.message || errorMessage;
          if (result.details) {
            errorMessage += ` | DETAILS: ${result.details}`;
            addLog(`❌ DIAGNÓSTICO: ${result.details}`, 'error');
          }
          
          // Also log server logs if available
          if (result.logs && Array.isArray(result.logs)) {
            result.logs.forEach((logMsg: string) => addLog(logMsg, 'error'));
          }
        } else {
          // If not JSON, use the text
          if (responseText) errorMessage = responseText;
        }
        
        throw new Error(errorMessage);
      }

      // If we got here, response is OK. result should be valid JSON.
      if (!result) {
        throw new Error('Respuesta vacía del servidor');
      }

      console.log('[Migration] Success result:', result);

      // Display server logs in real-time
      if (result.logs && Array.isArray(result.logs)) {
        result.logs.forEach((logMsg: string) => {
          // Parse log level from message
          let level: LogLevel = 'info';
          if (logMsg.includes('✅') || logMsg.includes('Migrated')) {
            level = 'success';
          } else if (logMsg.includes('❌') || logMsg.includes('Error')) {
            level = 'error';
          } else if (logMsg.includes('⚠️') || logMsg.includes('No files')) {
            level = 'warning';
          }

          addLog(logMsg, level);
        });
      }

      // Update stats
      if (result.stats) {
        setStats(result.stats);
      }

      setProgress(100);
      setIsComplete(true);

      addLog('─────────────────────────────────────────', 'info');
      addLog('✨ Migración completada exitosamente', 'success');

    } catch (error: any) {
      console.error('[Migration] Error:', error);
      console.error('[Migration] Error stack:', error.stack);
      
      addLog('─────────────────────────────────────────', 'info');
      addLog(`❌ ERROR: ${error.message}`, 'error');
      addLog('Por favor, revisa los logs del servidor en Supabase', 'error');
      addLog('También revisa la consola del navegador (F12) para más detalles', 'warning');
      setIsComplete(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const runAudit = async () => {
    setIsProcessing(true);
    addLog('─────────────────────────────────────────', 'info');
    addLog('🔍 Iniciando auditoría de assets...', 'info');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/audit-migration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en auditoría');
      }

      console.log('[Audit] Report:', data.report);
      
      const { report } = data;
      addLog(`📊 Resultados de Auditoría:`, 'info');
      addLog(`   • Total Eventos: ${report.total}`, 'info');
      addLog(`   • ✅ Migrados (Supabase): ${report.fully_migrated}`, 'success');
      
      if (report.has_figma_refs > 0) {
        addLog(`   • ⚠️ Pendientes (Figma): ${report.has_figma_refs}`, 'warning');
      } else {
        addLog(`   • ✨ Pendientes (Figma): 0`, 'success');
      }
      
      if (report.no_image > 0) {
        addLog(`   • ℹ️ Sin Imagen: ${report.no_image}`, 'info');
      }

      if (report.issues.length > 0) {
        addLog('⚠️ Problemas detectados:', 'warning');
        report.issues.forEach((issue: any) => {
           addLog(`   - ${issue.title}: ${issue.issue}`, 'warning');
        });
      } else {
        addLog('✨ La base de datos está limpia de referencias a Figma.', 'success');
      }

    } catch (e: any) {
      addLog(`❌ Error en auditoría: ${e.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) {
      if (!confirm('La migración está en curso. ¿Estás seguro de cerrar?')) {
        return;
      }
    }
    onClose();
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-2 rounded">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-white font-bold">Migración de Assets</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                figma:asset → Supabase Storage URLs
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="text-neutral-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="border-b border-neutral-800 bg-neutral-950/50 px-6 py-3 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Total:</span>
              <span className="text-white font-mono font-bold">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Migrados:</span>
              <span className="text-green-400 font-mono font-bold">{stats.migrated}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Omitidos:</span>
              <span className="text-yellow-400 font-mono font-bold">{stats.skipped}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Errores:</span>
              <span className="text-red-400 font-mono font-bold">{stats.errors}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-950/30 shrink-0">
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Logs Console */}
        <div className="flex-1 overflow-y-auto bg-black/30 p-4 font-mono text-xs">
          {logs.length === 0 && !isProcessing && (
            <div className="text-center text-neutral-600 py-12">
              <Database className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                Presiona <span className="text-cyan-400 font-bold">Iniciar Migración</span> para comenzar
              </p>
              <p className="text-xs mt-2 text-neutral-700">
                Este proceso migrará todas las referencias figma:asset a URLs públicas de Supabase
              </p>
            </div>
          )}

          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 py-1 hover:bg-neutral-900/30 px-2 -mx-2 rounded">
              {getLogIcon(log.level)}
              <span className={`${getLogColor(log.level)} leading-relaxed flex-1`}>
                {log.message}
              </span>
              <span className="text-neutral-700 text-[10px] shrink-0">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Actions Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-500">
            {isProcessing && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                <span>Procesando eventos...</span>
              </div>
            )}
            {isComplete && !isProcessing && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Migración completada</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isProcessing && !isComplete && (
              <>
                 <button
                  onClick={runAudit}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 border border-neutral-800 rounded hover:bg-neutral-800"
                >
                  <Search className="w-4 h-4" />
                  Auditar
                </button>

                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={startMigration}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded font-bold transition-all shadow-lg hover:shadow-cyan-500/20"
                >
                  <Database className="inline-block w-4 h-4 mr-2" />
                  Iniciar Migración
                </button>
              </>
            )}

            {isComplete && (
              <div className="flex gap-2">
                 <button
                  onClick={runAudit}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 border border-neutral-800 rounded hover:bg-neutral-800"
                >
                  <Search className="w-4 h-4" />
                  Auditar
                </button>
                <button
                  onClick={handleComplete}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded font-bold transition-all"
                >
                  <CheckCircle2 className="inline-block w-4 h-4 mr-2" />
                  Completar y Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};