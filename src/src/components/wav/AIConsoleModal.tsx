import React, { useEffect, useRef } from 'react';
import { X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface AILogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'loading' | 'error';
  icon?: string;
}

interface AIConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  logs: AILogEntry[];
  progress: number; // 0-100
  isProcessing: boolean;
  title?: string;
}

const getIcon = (type: string, customIcon?: string): string => {
  if (customIcon) return customIcon;
  
  switch (type) {
    case 'loading': return '🚀';
    case 'success': return '✅';
    case 'warning': return '⚠️';
    case 'error': return '❌';
    case 'info':
    default: return 'ℹ️';
  }
};

const getTextColor = (type: string): string => {
  switch (type) {
    case 'success': return 'text-emerald-400';
    case 'warning': return 'text-yellow-400';
    case 'error': return 'text-red-400';
    case 'loading': return 'text-cyan-400';
    case 'info':
    default: return 'text-green-400';
  }
};

export const AIConsoleModal: React.FC<AIConsoleModalProps> = ({
  isOpen,
  onClose,
  onMinimize,
  logs,
  progress,
  isProcessing,
  title = '🤖 AI Agent Active'
}) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={isProcessing ? undefined : onClose} // Non-dismissible while processing
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-3xl"
          >
            {/* Cyberpunk Terminal Window */}
            <div className="bg-zinc-950 border-2 border-emerald-500/50 rounded-lg shadow-2xl shadow-emerald-500/20 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-emerald-500/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <h2 className="font-mono text-emerald-400 tracking-wider">
                    {title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {onMinimize && (
                    <button
                      onClick={onMinimize}
                      className="p-1.5 hover:bg-zinc-700/50 rounded transition-colors text-zinc-400 hover:text-emerald-400"
                      title="Minimizar"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  {!isProcessing && (
                    <button
                      onClick={onClose}
                      className="p-1.5 hover:bg-zinc-700/50 rounded transition-colors text-zinc-400 hover:text-red-400"
                      title="Cerrar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-zinc-900 px-4 py-2 border-b border-emerald-500/20">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs text-emerald-400">
                    Progress
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated stripes */}
                    {isProcessing && (
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                          animation: 'stripe-scroll 1s linear infinite'
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Log Window */}
              <div 
                ref={logContainerRef}
                className="bg-black p-4 font-mono text-sm overflow-y-auto h-[50vh] max-h-[600px] scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-zinc-900"
              >
                {logs.length === 0 ? (
                  <div className="text-zinc-600 italic">
                    {'>'} Waiting for AI agent to start...
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-start gap-3 ${getTextColor(log.type)}`}
                      >
                        <span className="text-zinc-500 shrink-0 select-none">
                          [{log.timestamp}]
                        </span>
                        <span className="shrink-0">
                          {getIcon(log.type, log.icon)}
                        </span>
                        <span className="flex-1 break-words">
                          {log.message}
                        </span>
                      </motion.div>
                    ))}

                    {/* Blinking cursor when processing */}
                    {isProcessing && (
                      <motion.div
                        className="flex items-center gap-3 text-emerald-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-zinc-500 shrink-0">
                          [{new Date().toLocaleTimeString('es-CL', { hour12: false })}]
                        </span>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-emerald-400"
                        >
                          ▊
                        </motion.span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Status */}
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-t border-emerald-500/30 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs">
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-emerald-400">PROCESSING...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-zinc-600 rounded-full" />
                      <span className="text-zinc-500">IDLE</span>
                    </>
                  )}
                </div>

                <div className="font-mono text-xs text-zinc-500">
                  {logs.length} {logs.length === 1 ? 'event' : 'events'} logged
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inject stripe animation */}
          <style>{`
            @keyframes stripe-scroll {
              0% { background-position: 0 0; }
              100% { background-position: 40px 0; }
            }
            
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            
            .scrollbar-thin::-webkit-scrollbar-track {
              background: #18181b;
            }
            
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: rgba(16, 185, 129, 0.3);
              border-radius: 3px;
            }
            
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: rgba(16, 185, 129, 0.5);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};
