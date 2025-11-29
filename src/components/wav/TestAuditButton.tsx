/**
 * TEST AUDIT BUTTON
 * Componente para testear el Mega Audit sobre un evento específico
 */

import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface TestAuditButtonProps {
  eventTitle: string;
  onAuditComplete?: (optimizedEvent: any) => void;
}

export function TestAuditButton({ eventTitle, onAuditComplete }: TestAuditButtonProps) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!confirm(
      `🧪 TEST - MEGA AUDIT\n\n` +
      `Evento: "${eventTitle}"\n\n` +
      `Esta operación:\n` +
      `✅ Llenará todos los campos faltantes\n` +
      `✅ Optimizará SEO completo\n` +
      `✅ Generará contenido social\n` +
      `✅ Inferirá KPIs realistas\n\n` +
      `⏱️ Tiempo estimado: ~5-10 segundos\n` +
      `💰 Costo: ~$0.02 USD\n\n` +
      `¿Continuar?`
    )) {
      return;
    }

    setIsAuditing(true);
    setError(null);
    setResult(null);

    try {
      console.log('[Test Audit] Starting audit for:', eventTitle);

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/audit-single-event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ title: eventTitle })
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      
      console.log('[Test Audit] Success:', data);
      setResult(data);

      if (onAuditComplete) {
        onAuditComplete(data.optimizedEvent);
      }

      // Show detailed results
      alert(
        `✅ MEGA AUDIT COMPLETADO\n\n` +
        `Evento: "${data.optimizedEvent.title}"\n\n` +
        `🎯 Campos optimizados:\n` +
        `• SEO: title, description, keywords\n` +
        `• Social: Instagram + LinkedIn\n` +
        `• KPIs: ${data.optimizedEvent.kpis?.length || 0} métricas\n` +
        `• Location: ${data.optimizedEvent.city || 'inferido'}, ${data.optimizedEvent.country || 'inferido'}\n\n` +
        `Revisa la consola para ver todos los detalles.`
      );

    } catch (err: any) {
      console.error('[Test Audit] Error:', err);
      setError(err.message);
      alert(
        `❌ ERROR EN AUDIT\n\n` +
        `${err.message}\n\n` +
        `Verifica:\n` +
        `• Conexión a internet\n` +
        `• OpenAI API key configurada\n` +
        `• Logs del servidor`
      );
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="inline-flex flex-col gap-2">
      <button
        onClick={handleAudit}
        disabled={isAuditing}
        className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white disabled:opacity-50 shadow-lg hover:shadow-xl"
        title="Test Mega Audit sobre este evento específico"
      >
        {isAuditing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        {isAuditing ? 'Auditando...' : `Test Audit: ${eventTitle.substring(0, 25)}...`}
      </button>

      {error && (
        <div className="text-xs text-red-500 max-w-md">
          Error: {error}
        </div>
      )}

      {result && !error && (
        <div className="text-xs text-green-600 max-w-md">
          ✅ Audit completado! Ver consola para detalles.
        </div>
      )}
    </div>
  );
}
