import React, { useState, useEffect } from 'react';
import { RefreshCw, Download, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';
import { getEvents } from '../../utils/api';
import { WavEvent } from '../../types';

export const SyncHelper = () => {
  const [events, setEvents] = useState<WavEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleCopy = async () => {
    const json = JSON.stringify(events, null, 2);
    const success = await copyToClipboard(json);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="fixed inset-0 z-[200] bg-black p-10 text-white flex items-center justify-center">Cargando eventos reales...</div>;
  if (error) return <div className="fixed inset-0 z-[200] bg-black p-10 text-red-500 flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="fixed inset-0 z-[200] bg-black p-8 overflow-auto text-white font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-green-400">⚡ Sincronización Inversa (Reverse Sync)</h1>
        <p className="mb-6 text-gray-300">
          Estos son los <strong>{events.length} eventos reales</strong> obtenidos directamente de tu base de datos Supabase.
          <br />
          Para sincronizar tu entorno local y permitir que la IA trabaje con datos reales:
        </p>
        
        <div className="flex gap-4 mb-6">
            <button 
                onClick={handleCopy}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition-all transform active:scale-95 shadow-lg shadow-green-900/20 flex items-center gap-2"
            >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? '✅ ¡Copiado!' : '📋 Copiar JSON Completo'}
            </button>
            <a href="/" className="px-8 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-all flex items-center justify-center">
                Volver al Home
            </a>
        </div>

        <div className="relative">
            <div className="absolute top-0 right-0 bg-gray-800 text-xs px-2 py-1 rounded-bl text-gray-400">read-only</div>
            <textarea 
                className="w-full h-[60vh] bg-gray-900 p-4 text-xs font-mono rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                readOnly
                value={JSON.stringify(events, null, 2)}
                onClick={(e) => e.currentTarget.select()}
            />
        </div>
        <p className="mt-4 text-xs text-gray-500 text-center">
            Pega este contenido en el chat de la IA para actualizar /data/events.ts
        </p>
      </div>
    </div>
  );
};