import React, { useState, useEffect, useMemo } from 'react';
import { 
  Loader2, Plus, Trash2, Upload, Save, ArrowLeft, Sparkles, 
  Check, Copy, Image as ImageIcon, Film, X, ChevronRight, Lock, Wand2, AlertTriangle, Download, Zap, User as UserIcon, FileDown
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { publicAnonKey, projectId } from '../../utils/supabase/info';
// Chat IA eliminado - se reemplazó por botones directos que usan useEventEnricher
import { useAdminEvents } from '../../src/hooks/useAdminEvents';
import { useEventValidation } from '../../src/hooks/useEventValidation';
import { useEventEnricher } from '../../src/hooks/useEventEnricher';
import { FormField } from './FormField';
import { EventListView } from './EventListView';
import { ShareLinkButton } from './ShareLinkButton';
import { OpenAIStatusIndicator } from './OpenAIStatusIndicator';
import { ClaudeOptimizer } from './ClaudeOptimizer';
import { BatchProcessingModal } from './BatchProcessingModal';
import { FIELD_TOOLTIPS, getCharCount, validateEvent } from '../../utils/validation';
import { EventCategory } from '../../utils/contentRules';
import { Progress } from '../ui/progress';
import { WavEvent } from '../../types';
import { toast } from 'sonner@2.0.3';
import { generateLocalEventsFile } from '../../utils/sync-to-local';

interface AdminPanelProps {
  onBack: () => void;
  categories?: EventCategory[];
}

export const AdminPanel = ({ onBack, categories = [] }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@wearevision.cl");
  const [passwordInput, setPasswordInput] = useState("");
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchMode, setBatchMode] = useState<'fill' | 'optimize'>('fill');
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- Hooks ---
  const {
    events,
    loading,
    saving,
    saveStatus,
    lastSavedAt,
    uploading,
    loadData,
    handleSave,
    handleFileChange,
    removeGalleryItem,
    updateEvent,
    addEvent,
    removeEvent,
    handleApprove,
    handleCleanupEvents,
    handleClearAllEvents,
    handleOptimizeAll
  } = useAdminEvents();

  // Validation hook
  const validationMap = useEventValidation(events);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });
      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error: any) {
      alert("Error de autenticación: " + error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInitAdmin = async () => {
    if (!confirm("Esto inicializará el usuario administrador. ¿Continuar?")) return;
    setAuthLoading(true);
    try {
       const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/signup`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${publicAnonKey}`
         },
         body: JSON.stringify({ email: emailInput, password: passwordInput })
       });
       const data = await response.json();
       if (data.error) throw new Error(data.error);
       alert("Usuario administrador creado. Ahora puedes iniciar sesión.");
    } catch (e: any) {
       alert("Error creando admin: " + e.message);
    } finally {
       setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    
    const fallbackCopy = (val: string) => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = val;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (!successful) {
                alert("No se pudo copiar. Por favor selecciona el texto manualmente.");
            }
        } catch (err) {
            console.error("Fallback copy failed", err);
            alert("Error al copiar.");
        }
    };

    // Try Clipboard API with proper error handling
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Success - no alert needed
            })
            .catch(() => {
                // Silently fallback - this is expected in some environments
                fallbackCopy(text);
            });
    } else {
        fallbackCopy(text);
    }
  };

  // Handle new event creation
  const handleNewEvent = async () => {
    await addEvent();
    // Open the newly created event (will be at index 0 since addEvent prepends)
    setSelectedEventIndex(0);
  };

  // Handle pull from Supabase
  const handlePullFromSupabase = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setSyncProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      await loadData();
      
      clearInterval(progressInterval);
      setSyncProgress(100);
      
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);
      }, 500);
      
      alert("Datos sincronizados desde Supabase");
    } catch (e) {
      console.error(e);
      alert("Error al sincronizar datos");
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  // Handle MEGA AUDIT - Optimiza TODOS los eventos con IA
  const handleMegaAudit = async () => {
    if (!confirm(
      `⚠️ MEGA AUDIT - Llenado y Auditado Masivo\n\n` +
      `Esta operación procesará TODOS los ${events.length} eventos con IA para:\n\n` +
      `✅ Llenar campos faltantes (inferencia inteligente)\n` +
      `✅ Optimizar SEO (títulos, keywords, meta descriptions)\n` +
      `✅ Generar contenido social (Instagram, LinkedIn)\n` +
      `✅ Crear variantes A/B testing\n` +
      `✅ Inferir KPIs y métricas realistas\n` +
      `✅ Aplicar mejores prácticas de productoras top\n\n` +
      `⏱️ Tiempo estimado: ~${Math.ceil(events.length * 1.5)} segundos\n` +
      `💰 Costo estimado API: ~$${(events.length * 0.02).toFixed(2)} USD\n\n` +
      `¿Deseas continuar?`
    )) {
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);

    try {
      console.log('[Mega Audit] Starting audit for', events.length, 'events');

      // Call the audit-all endpoint with extended timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.error('[Mega Audit] Request timeout after 5 minutes');
      }, 300000); // 5 minute timeout for mega audit

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/audit-all-events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Error desconocido del servidor' }));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const result = await res.json();
      
      console.log('[Mega Audit] Complete:', result);

      // Reload data to show optimized events
      await loadData();

      setSyncProgress(100);
      
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);
      }, 500);

      alert(
        `✅ MEGA AUDIT COMPLETADO\n\n` +
        `Total: ${result.total} eventos\n` +
        `✅ Procesados: ${result.processed}\n` +
        `❌ Fallidos: ${result.failed}\n\n` +
        `Todos los eventos han sido optimizados con:\n` +
        `• SEO mejorado (títulos, keywords, meta)\n` +
        `• Contenido social completo\n` +
        `• KPIs y métricas inferidas\n` +
        `• Campos faltantes completados\n\n` +
        `Revisa los eventos para ver los cambios.`
      );

    } catch (error: any) {
      console.error('[Mega Audit] Error:', error);
      
      // Determinar el tipo de error para dar mejor feedback
      let errorMessage = error.message || 'Error desconocido';
      let helpText = '';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Timeout: La operación tardó más de 5 minutos';
        helpText = 
          `El Mega Audit tiene demasiados eventos para procesar en una sola operación.\n\n` +
          `Soluciones:\n` +
          `• Usa "Optimizar Todo" en eventos individuales\n` +
          `• Procesa eventos en grupos más pequeños\n` +
          `• Contacta soporte si el problema persiste`;
      } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = 'No se pudo conectar con el servidor';
        helpText = 
          `Posibles causas:\n` +
          `• Verifica tu conexión a internet\n` +
          `• El servidor de Supabase puede estar temporalmente inaccesible\n` +
          `• El proceso puede haber tardado más de 5 minutos (timeout)\n` +
          `• Firewall o proxy bloqueando la conexión\n\n` +
          `Solución: Intenta procesar menos eventos a la vez usando "Optimizar Todo" individual.`;
      } else if (errorMessage.includes('OPENAI_API_KEY')) {
        helpText = 
          `La API key de OpenAI no está configurada.\n\n` +
          `Para configurarla:\n` +
          `1. Ve a Supabase Dashboard\n` +
          `2. Settings → Edge Functions → Environment Variables\n` +
          `3. Agrega: OPENAI_API_KEY = tu_api_key\n` +
          `4. Redeploy las Edge Functions`;
      } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
        helpText = 
          `Error de autenticación.\n\n` +
          `Verifica que la API key de OpenAI sea válida:\n` +
          `• Debe comenzar con "sk-"\n` +
          `• Debe tener permisos activos\n` +
          `• No debe estar expirada`;
      } else if (errorMessage.includes('429')) {
        helpText = 
          `Límite de rate limit alcanzado.\n\n` +
          `OpenAI tiene límites de requests por minuto.\n` +
          `Espera unos minutos e intenta nuevamente.`;
      }
      
      alert(
        `❌ ERROR EN MEGA AUDIT\n\n` +
        `${errorMessage}\n\n` +
        (helpText || `Detalles técnicos:\n• Revisa los logs del navegador (F12)\n• Revisa los logs del servidor en Supabase\n• Verifica la configuración de OpenAI API`)
      );
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  // Handle save to Supabase with validation
  const handleSaveToSupabase = async () => {
    // Validate all events before saving
    const invalidEvents: string[] = [];
    
    events.forEach((event, index) => {
      const validation = validateEvent(event);
      if (!validation.isValid) {
        invalidEvents.push(`${event.brand || 'Sin marca'} - ${event.title || 'Sin título'}`);
      }
    });

    if (invalidEvents.length > 0) {
      alert(
        `No se puede guardar. Los siguientes eventos tienen campos vacíos o inválidos:\n\n${invalidEvents.join('\n')}\n\nPor favor, completa todos los campos obligatorios antes de guardar.`
      );
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setSyncProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      await handleSave();
      
      clearInterval(progressInterval);
      setSyncProgress(100);
      
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);
      }, 500);
    } catch (e) {
      console.error(e);
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  // Handler for applying enriched data from batch processing
  const handleApplyEnrichedData = (index: number, enrichedData: any) => {
    // Apply all non-empty fields from the enriched result
    Object.entries(enrichedData).forEach(([field, value]) => {
      if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
        updateEvent(index, field, value as any);
      }
    });
  };

  // Handler for creating local backup file (OPTIONAL - no longer required for sync)
  const handleSyncToLocalFile = async () => {
    try {
      setIsSyncing(true);
      toast.info('Generando backup de eventos desde Supabase...');
      
      // Get access token from current session
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        toast.error('No autenticado. Por favor, inicia sesión nuevamente.');
        return;
      }

      const fileContent = await generateLocalEventsFile(accessToken);
      
      // Show modal with copy-paste instructions
      const shouldDownload = confirm(
        '✅ Archivo events.ts generado desde Supabase!\n\n' +
        `Total de eventos: ${events.length}\n\n` +
        '¿Quieres descargarlo? (Luego debes reemplazar manualmente /data/events.ts)\n\n' +
        'Presiona OK para descargar, o Cancelar para copiar al portapapeles.'
      );

      if (shouldDownload) {
        // Download as file
        const blob = new Blob([fileContent], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'events.ts';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('📥 Archivo descargado! Ahora reemplaza /data/events.ts manualmente.');
      } else {
        // Copy to clipboard
        await navigator.clipboard.writeText(fileContent);
        toast.success('📋 Contenido copiado! Pégalo en /data/events.ts y guarda el archivo.');
      }
    } catch (error) {
      console.error('Error syncing to local file:', error);
      toast.error(`Error: ${error.message || 'No se pudo generar el archivo'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Get current event
  const currentEvent = selectedEventIndex !== null ? events[selectedEventIndex] : null;
  const currentValidation = selectedEventIndex !== null ? validationMap.get(selectedEventIndex) : null;

  // --- Auth Gate ---
  if (!isAuthenticated) {
    return (
      <div className="bg-black flex flex-col gap-[24px] items-center justify-center relative h-screen w-full font-sans text-white">
         <div className="flex flex-col gap-[8px] items-center">
            <h1 className="font-bold text-[24px] tracking-[1.2px]">WAV CMS</h1>
            <p className="text-[14px] text-neutral-500">Acceso Seguro v2.0</p>
         </div>
         
         <div className="w-[320px] space-y-4">
            <div className="space-y-2">
              <div className="relative bg-neutral-900 rounded-[6.8px] border border-neutral-800 overflow-hidden flex items-center px-[12px] h-[40px]">
                <UserIcon className="w-4 h-4 text-neutral-500 mr-2" />
                <input 
                  type="email"
                  className="bg-transparent border-none outline-none text-[14px] text-white placeholder-neutral-500 w-full h-full"
                  placeholder="Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="relative bg-neutral-900 rounded-[6.8px] border border-neutral-800 overflow-hidden flex items-center px-[12px] h-[40px]">
                <Lock className="w-4 h-4 text-neutral-500 mr-2" />
                <input 
                  type="password"
                  className="bg-transparent border-none outline-none text-[14px] text-white placeholder-neutral-500 w-full h-full"
                  placeholder="Contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full h-[40px] bg-white rounded-[6.8px] text-[14px] font-medium text-black hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {authLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Iniciar Sesión"}
            </button>
            
            <div className="flex justify-between text-xs text-neutral-600 pt-2">
               <button onClick={onBack} className="hover:text-neutral-400 transition-colors">Volver al sitio</button>
               <button onClick={handleInitAdmin} className="hover:text-neutral-400 transition-colors" title="Solo primer uso">Setup Admin</button>
            </div>
         </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-md z-20 border-b border-neutral-800 px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center text-neutral-400 hover:text-white transition-colors" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">CMS - Optimización Conversacional IA</h1>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-neutral-500 hidden md:inline-block">Sesión Segura</span>
            <button 
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* OpenAI Status Indicator */}
        <OpenAIStatusIndicator />

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button 
              onClick={handleNewEvent} 
              disabled={saving || isSyncing}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 border border-neutral-800 bg-transparent hover:bg-neutral-800 text-white disabled:opacity-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
            </button>
            <button 
              onClick={handleSaveToSupabase} 
              disabled={saving || isSyncing} 
              className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
            >
              {saving || isSyncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Guardar en Supabase
            </button>
            <button 
              onClick={handlePullFromSupabase} 
              disabled={saving || isSyncing}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Pull desde Supabase
            </button>
            <button 
              onClick={handleSyncToLocalFile} 
              disabled={saving || isSyncing || events.length === 0}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white disabled:opacity-50"
              title="[OPCIONAL] Descarga backup de eventos actuales (ya no necesario para sincronización - la app es 100% dinámica)"
            >
              <FileDown className="mr-2 h-4 w-4" />
              💾 Backup (Opcional)
            </button>
            <button 
              onClick={() => {
                setBatchMode('fill');
                setShowBatchModal(true);
              }} 
              disabled={saving || isSyncing || events.length === 0}
              className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white disabled:opacity-50"
              title="Auto-completa SOLO los campos vacíos de todos los eventos"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              🪄 Auto-Completar (Batch)
            </button>
            <button 
              onClick={() => {
                setBatchMode('optimize');
                setShowBatchModal(true);
              }} 
              disabled={saving || isSyncing || events.length === 0}
              className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white disabled:opacity-50 shadow-lg hover:shadow-xl"
              title="Optimiza TODO en todos los eventos con visión de Productor BTL + SEO Expert"
            >
              <Zap className="mr-2 h-4 w-4" />
              ✨ Optimizar Todo (Batch)
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-mono uppercase tracking-widest transition-opacity duration-300 ${
                saveStatus === 'idle' ? 'opacity-0' : 'opacity-100'
            } ${
                saveStatus === 'success' ? 'text-green-500' : 
                saveStatus === 'error' ? 'text-red-500' : 
                'text-neutral-500'
            }`}>
                {saveStatus === 'saving' && "Guardando..."}
                {saveStatus === 'success' && "Sincronizado"}
                {saveStatus === 'error' && "Error"}
            </span>
            
            {lastSavedAt && (
              <span className="text-[9px] text-neutral-600 font-mono mt-1 transition-opacity duration-500">
                 Último guardado: {lastSavedAt}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {isSyncing && (
          <div className="mt-3">
            <Progress value={syncProgress} className="h-1" />
          </div>
        )}

        {/* Claude Optimizer */}
        <div className="mt-6">
          <ClaudeOptimizer 
            events={events} 
            onComplete={loadData}
          />
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Event List */}
        <div className="w-1/3 border-r border-neutral-800 overflow-y-auto p-6">
          <EventListView
            events={events}
            onSelectEvent={setSelectedEventIndex}
            selectedEventId={currentEvent?.id || null}
            loading={false}
            categories={categories}
          />
        </div>

        {/* Right: Event Detail */}
        <div className="flex-1 overflow-y-auto">
          {currentEvent && selectedEventIndex !== null ? (
            <EventDetailPanel
              event={currentEvent}
              eventIndex={selectedEventIndex}
              validation={currentValidation}
              updateEvent={updateEvent}
              removeEvent={removeEvent}
              handleFileChange={handleFileChange}
              removeGalleryItem={removeGalleryItem}
              uploading={uploading}
              onClose={() => setSelectedEventIndex(null)}
              categories={categories}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="p-6 bg-neutral-900 rounded-full mb-4">
                <Sparkles className="w-16 h-16 text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Selecciona un evento</h3>
              <p className="text-sm text-neutral-400 max-w-md">
                Elige un evento de la lista para editarlo con herramientas de IA.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Batch Processing Modal */}
      {showBatchModal && (
        <BatchProcessingModal
          events={events}
          mode={batchMode}
          onComplete={async () => {
            // Auto-save to Supabase after batch processing
            await handleSave();
            await loadData(); // Reload data after batch processing
          }}
          onClose={() => setShowBatchModal(false)}
          onSaveEvent={handleApplyEnrichedData}
        />
      )}
    </div>
  );
};

// Event Detail Panel Component
interface EventDetailPanelProps {
  event: WavEvent;
  eventIndex: number;
  validation: any;
  updateEvent: (index: number, field: string, value: any) => void;
  removeEvent: (index: number) => void;
  handleFileChange: (index: number, field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => Promise<void>;
  removeGalleryItem: (eventIndex: number, mediaId: string) => void;
  uploading: string | null;
  onClose: () => void;
  categories: EventCategory[];
}

const EventDetailPanel: React.FC<EventDetailPanelProps> = ({
  event,
  eventIndex,
  validation,
  updateEvent,
  removeEvent,
  handleFileChange,
  removeGalleryItem,
  uploading,
  onClose,
  categories
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-neutral-900/50 border-b border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                {event.brand || 'Sin marca'}
              </span>
              {event.category && (
                <>
                  <span className="text-neutral-600">•</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">
                    {categories.find(c => c.id === event.category)?.label || event.category}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {event.title || 'Sin título'}
            </h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (confirm('¿Eliminar este evento?')) {
                  removeEvent(eventIndex);
                  onClose();
                }
              }}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full"
              title="Eliminar evento"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>


      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <EventFieldsEditor
          event={event}
          eventIndex={eventIndex}
          validation={validation}
          updateEvent={updateEvent}
          handleFileChange={handleFileChange}
          removeGalleryItem={removeGalleryItem}
          uploading={uploading}
          categories={categories}
        />
      </div>
    </div>
  );
};

// Event Fields Editor Component
interface EventFieldsEditorProps {
  event: WavEvent;
  eventIndex: number;
  validation: any;
  updateEvent: (index: number, field: string, value: any) => void;
  handleFileChange: (index: number, field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => Promise<void>;
  removeGalleryItem: (eventIndex: number, mediaId: string) => void;
  uploading: string | null;
  categories: EventCategory[];
}

const EventFieldsEditor: React.FC<EventFieldsEditorProps> = ({
  event,
  eventIndex,
  validation,
  updateEvent,
  handleFileChange,
  removeGalleryItem,
  uploading,
  categories
}) => {
  const hasError = (field: string) => validation?.errors?.has(field);
  const getError = (field: string) => validation?.errors?.get(field);
  const { enrichEvent, isEnriching } = useEventEnricher();

  // Handler for AI auto-complete (FILL mode - only empty fields)
  const handleAutoComplete = async () => {
    if (!event.brand || !event.title) {
      toast.error('Necesitas al menos Marca y Título para auto-completar');
      return;
    }

    try {
      toast.loading('Completando campos vacíos con IA...', { id: 'enrich' });
      const result = await enrichEvent(event, 'fill');
      
      // Apply all non-empty fields from the result
      Object.entries(result).forEach(([field, value]) => {
        if (field !== 'chat_response' && value !== undefined && value !== null && value !== '') {
          // Map draft to description
          if (field === 'draft') {
            updateEvent(eventIndex, 'description', value as string);
          } else {
            updateEvent(eventIndex, field, value as any);
          }
        }
      });

      toast.success('Campos vacíos completados con éxito', { id: 'enrich' });
    } catch (error: any) {
      console.error('Error auto-completing event:', error);
      toast.error(`Error: ${error.message}`, { id: 'enrich' });
    }
  };

  // Handler for AI optimization (OPTIMIZE mode - improves ALL fields)
  const handleOptimize = async () => {
    if (!event.brand || !event.title) {
      toast.error('Necesitas al menos Marca y Título para optimizar');
      return;
    }

    try {
      toast.loading('Optimizando evento con visión de Productor BTL + SEO Expert...', { id: 'optimize' });
      const result = await enrichEvent(event, 'optimize');
      
      // Apply ALL fields from the result (including overwrites)
      Object.entries(result).forEach(([field, value]) => {
        if (field !== 'chat_response' && value !== undefined && value !== null && value !== '') {
          // Map draft to description
          if (field === 'draft') {
            updateEvent(eventIndex, 'description', value as string);
          } else {
            updateEvent(eventIndex, field, value as any);
          }
        }
      });

      toast.success('Evento optimizado con éxito', { id: 'optimize' });
    } catch (error: any) {
      console.error('Error optimizing event:', error);
      toast.error(`Error: ${error.message}`, { id: 'optimize' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* AI Quick Actions */}
      <div className="bg-gradient-to-r from-pink-950/20 to-purple-950/20 border border-pink-500/20 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          Acciones de IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={handleAutoComplete}
            disabled={isEnriching || !event.brand || !event.title}
            className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-neutral-700 disabled:to-neutral-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2"
            title="Auto-completar SOLO los campos vacíos con datos realistas y profesionales"
          >
            {isEnriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            🪄 Auto-Completar Datos
          </button>
          
          <button
            onClick={handleOptimize}
            disabled={isEnriching || !event.brand || !event.title}
            className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:from-neutral-700 disabled:to-neutral-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2"
            title="Optimiza TODO (incluso campos existentes) con visión de Productor BTL + SEO/AEO/LLMO Expert"
          >
            {isEnriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            ✨ Optimizar Todo
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validation && !validation.isValid && (
        <div className="bg-red-950/40 border-2 border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-300 mb-2">Este evento tiene errores de validación</h4>
              <ul className="text-sm text-neutral-300 space-y-1">
                {Array.from(validation.errors.entries()).map(([field, error]) => (
                  <li key={field}>• <span className="font-medium">{field}:</span> {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 1. INFORMACIÓN BÁSICA */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Información Básica
        </h3>
        
        <FormField
          label="Marca"
          value={event.brand || ''}
          onChange={(value) => updateEvent(eventIndex, 'brand', value)}
          error={getError('brand')}
          tooltip={FIELD_TOOLTIPS.brand}
          required
          maxLength={50}
          charCount={getCharCount(event.brand)}
        />

        <FormField
          label="Título"
          value={event.title || ''}
          onChange={(value) => updateEvent(eventIndex, 'title', value)}
          error={getError('title')}
          tooltip={FIELD_TOOLTIPS.title}
          required
          maxLength={100}
          charCount={getCharCount(event.title)}
        />

        <FormField
          label="Descripción"
          value={event.description || ''}
          onChange={(value) => updateEvent(eventIndex, 'description', value)}
          error={getError('description')}
          tooltip={FIELD_TOOLTIPS.description}
          required
          multiline
          rows={6}
          maxLength={800}
          charCount={getCharCount(event.description)}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Categoría
          </label>
          <select
            value={event.category || ''}
            onChange={(e) => updateEvent(eventIndex, 'category', e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          >
            <option value="">Sin categoría</option>
            {categories.filter(c => !c.isArchived).map((cat) => (
              <option key={cat.id} value={cat.label}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label="Resumen (Meta Description)"
          value={event.summary || ''}
          onChange={(value) => updateEvent(eventIndex, 'summary', value)}
          tooltip={FIELD_TOOLTIPS.description}
          multiline
          rows={3}
          maxLength={160}
          charCount={getCharCount(event.summary)}
        />
      </div>

      {/* 2. IDENTIFICACIÓN & LOCALIZACIÓN */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Identificación & Localización
        </h3>

        <FormField
          label="Cliente"
          value={event.client || ''}
          onChange={(value) => updateEvent(eventIndex, 'client', value)}
          tooltip={FIELD_TOOLTIPS.client}
          placeholder="Nombre del cliente (si difiere de la marca)"
        />

        <FormField
          label="Subcategoría"
          value={event.subcategory || ''}
          onChange={(value) => updateEvent(eventIndex, 'subcategory', value)}
          tooltip={FIELD_TOOLTIPS.subcategory}
          placeholder="Tipo específico de evento"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Año"
            value={event.year?.toString() || ''}
            onChange={(value) => updateEvent(eventIndex, 'year', value ? parseInt(value) : undefined)}
            tooltip={FIELD_TOOLTIPS.year}
            placeholder="2024"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-300">
              Mes
            </label>
            <select
              value={event.month || ''}
              onChange={(e) => updateEvent(eventIndex, 'month', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            >
              <option value="">Seleccionar mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="País"
            value={event.country || ''}
            onChange={(value) => updateEvent(eventIndex, 'country', value)}
            tooltip={FIELD_TOOLTIPS.country}
            placeholder="Chile"
          />

          <FormField
            label="Ciudad"
            value={event.city || ''}
            onChange={(value) => updateEvent(eventIndex, 'city', value)}
            tooltip={FIELD_TOOLTIPS.city}
            placeholder="Santiago"
          />
        </div>

        <FormField
          label="Venue / Recinto"
          value={event.venue || ''}
          onChange={(value) => updateEvent(eventIndex, 'venue', value)}
          tooltip={FIELD_TOOLTIPS.venue}
          placeholder="Movistar Arena, Parque Bicentenario, etc."
        />
      </div>

      {/* 3. MULTIMEDIA */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Multimedia
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Imagen Principal {hasError('image') && <span className="text-red-400">*</span>}
          </label>
          {event.image && (
            <img src={event.image} alt="Preview" className="w-full h-48 object-cover rounded-md border border-neutral-800" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(eventIndex, 'image', file);
            }}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
          />
          {hasError('image') && (
            <p className="text-sm text-red-400">{getError('image')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Logo de Marca (PNG/SVG)
          </label>
          {event.logo && (
            <img src={event.logo} alt="Logo" className="h-16 object-contain bg-neutral-800/50 rounded p-2" />
          )}
          <input
            type="file"
            accept="image/png,image/svg+xml"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(eventIndex, 'logo', file);
            }}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300 flex items-center gap-2">
            OG Image (Open Graph para compartir en redes)
            {event.image && (
              <span className="text-xs text-green-400 font-normal">
                ✓ Detectada automáticamente
              </span>
            )}
          </label>
          <div className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-400 font-mono truncate">
            {event.og_image || event.image || 'No hay imagen configurada'}
          </div>
          <p className="text-xs text-neutral-500 italic">
            💡 El sistema usa automáticamente la imagen principal del evento para compartir en redes sociales.
          </p>
        </div>

        {/* Share Links for Social Media */}
        {validation?.slug && event.image && (
          <div className="mt-6">
            <ShareLinkButton 
              eventSlug={validation.slug}
              eventTitle={event.title}
              variant="card"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Galería de Medios
          </label>
          {event.gallery && event.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {event.gallery.map((media) => (
                <div key={media.id} className="relative group">
                  {media.type === 'image' ? (
                    <img src={media.url} alt="" className="w-full h-24 object-cover rounded-md border border-neutral-800" />
                  ) : (
                    <video src={media.url} className="w-full h-24 object-cover rounded-md border border-neutral-800" />
                  )}
                  <button
                    onClick={() => removeGalleryItem(eventIndex, media.id)}
                    className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(eventIndex, 'gallery', file);
            }}
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
          />
        </div>
      </div>

      {/* 4. CONTENIDO EDITORIAL */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Contenido Editorial
        </h3>

        <FormField
          label="Tono de Comunicación"
          value={event.tone || ''}
          onChange={(value) => updateEvent(eventIndex, 'tone', value)}
          tooltip={FIELD_TOOLTIPS.tone}
          placeholder="Corporativo, Festivo, Juvenil, Premium..."
        />

        <FormField
          label="Audiencia / Target"
          value={event.audience || ''}
          onChange={(value) => updateEvent(eventIndex, 'audience', value)}
          tooltip={FIELD_TOOLTIPS.audience}
          placeholder="Millennials, Ejecutivos, Familias..."
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Highlights (puntos clave)
          </label>
          {event.highlights && event.highlights.length > 0 && (
            <div className="space-y-2">
              {event.highlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...event.highlights];
                      newHighlights[idx] = e.target.value;
                      updateEvent(eventIndex, 'highlights', newHighlights);
                    }}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
                    placeholder={`Highlight ${idx + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newHighlights = event.highlights.filter((_, i) => i !== idx);
                      updateEvent(eventIndex, 'highlights', newHighlights);
                    }}
                    className="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 rounded-md text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              const newHighlights = [...(event.highlights || []), ''];
              updateEvent(eventIndex, 'highlights', newHighlights);
            }}
            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm text-neutral-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Agregar Highlight
          </button>
        </div>
      </div>

      {/* 5. SEO & METADATA */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          SEO & Metadata
        </h3>

        <FormField
          label="Título SEO"
          value={event.seo_title || ''}
          onChange={(value) => updateEvent(eventIndex, 'seo_title', value)}
          tooltip={FIELD_TOOLTIPS.seo_title}
          maxLength={60}
          charCount={getCharCount(event.seo_title)}
          placeholder="Título optimizado para buscadores (max 60 caracteres)"
        />

        <FormField
          label="Descripción SEO"
          value={event.seo_description || ''}
          onChange={(value) => updateEvent(eventIndex, 'seo_description', value)}
          tooltip={FIELD_TOOLTIPS.seo_description}
          multiline
          rows={3}
          maxLength={155}
          charCount={getCharCount(event.seo_description)}
          placeholder="Meta description optimizada (max 155 caracteres)"
        />

        <FormField
          label="Keywords (separadas por comas)"
          value={
            Array.isArray(event.keywords) 
              ? event.keywords.join(', ') 
              : typeof event.keywords === 'string' 
                ? event.keywords 
                : ''
          }
          onChange={(value) => updateEvent(eventIndex, 'keywords', value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="evento, marca, activación, marketing"
        />

        <FormField
          label="Tags Internos (separados por comas)"
          value={
            Array.isArray(event.tags) 
              ? event.tags.join(', ') 
              : typeof event.tags === 'string'
                ? event.tags
                : ''
          }
          onChange={(value) => updateEvent(eventIndex, 'tags', value.split(',').map(s => s.trim()).filter(Boolean))}
          tooltip={FIELD_TOOLTIPS.tags}
          placeholder="tag1, tag2, tag3"
        />

        <FormField
          label="Hashtags"
          value={
            Array.isArray(event.hashtags) 
              ? event.hashtags.join(' ') 
              : typeof event.hashtags === 'string'
                ? event.hashtags
                : ''
          }
          onChange={(value) => updateEvent(eventIndex, 'hashtags', value.split(/[\s,]+/).filter(Boolean))}
          placeholder="#tag1 #tag2 #tag3"
        />
      </div>

      {/* 6. PERFORMANCE & RESULTADOS */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Performance & Resultados
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Personas Alcanzadas"
            value={event.people_reached || ''}
            onChange={(value) => updateEvent(eventIndex, 'people_reached', value)}
            tooltip={FIELD_TOOLTIPS.people_reached}
            placeholder="50,000"
          />

          <FormField
            label="Asistentes Presenciales"
            value={event.attendees || ''}
            onChange={(value) => updateEvent(eventIndex, 'attendees', value)}
            tooltip={FIELD_TOOLTIPS.attendees}
            placeholder="2,500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Duración (días)"
            value={event.days?.toString() || ''}
            onChange={(value) => updateEvent(eventIndex, 'days', value ? parseInt(value) : undefined)}
            tooltip={FIELD_TOOLTIPS.days}
            placeholder="3"
          />

          <FormField
            label="Ciudades (Gira)"
            value={event.cities?.toString() || ''}
            onChange={(value) => updateEvent(eventIndex, 'cities', value ? parseInt(value) : undefined)}
            tooltip={FIELD_TOOLTIPS.cities}
            placeholder="5"
          />

          <FormField
            label="Pantallas / Screens"
            value={event.screens?.toString() || ''}
            onChange={(value) => updateEvent(eventIndex, 'screens', value ? parseInt(value) : undefined)}
            tooltip={FIELD_TOOLTIPS.screens}
            placeholder="12"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            KPIs (Indicadores clave)
          </label>
          {event.kpis && event.kpis.length > 0 && (
            <div className="space-y-2">
              {event.kpis.map((kpi, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={kpi}
                    onChange={(e) => {
                      const newKpis = [...event.kpis];
                      newKpis[idx] = e.target.value;
                      updateEvent(eventIndex, 'kpis', newKpis);
                    }}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
                    placeholder={`KPI ${idx + 1}: ej. +35% engagement`}
                  />
                  <button
                    onClick={() => {
                      const newKpis = event.kpis.filter((_, i) => i !== idx);
                      updateEvent(eventIndex, 'kpis', newKpis);
                    }}
                    className="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 rounded-md text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              const newKpis = [...(event.kpis || []), ''];
              updateEvent(eventIndex, 'kpis', newKpis);
            }}
            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm text-neutral-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Agregar KPI
          </button>
        </div>

        <FormField
          label="Notas de Resultados"
          value={event.results_notes || ''}
          onChange={(value) => updateEvent(eventIndex, 'results_notes', value)}
          tooltip={FIELD_TOOLTIPS.results_notes}
          multiline
          rows={4}
          placeholder="Observaciones cualitativas sobre el impacto y resultados del evento..."
        />
      </div>

      {/* 7. SOCIAL MEDIA */}
      <div className="space-y-4 bg-neutral-900/30 border border-neutral-800 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-700 pb-2">
          Contenido Social Media
        </h3>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider">Instagram</h4>
          
          <FormField
            label="Instagram - Hook"
            value={event.instagram_hook || ''}
            onChange={(value) => updateEvent(eventIndex, 'instagram_hook', value)}
            placeholder="Hook impactante para Instagram"
          />

          <FormField
            label="Instagram - Body"
            value={event.instagram_body || ''}
            onChange={(value) => updateEvent(eventIndex, 'instagram_body', value)}
            multiline
            rows={4}
            placeholder="Cuerpo del post de Instagram"
          />

          <FormField
            label="Instagram - Closing (CTA)"
            value={event.instagram_closing || ''}
            onChange={(value) => updateEvent(eventIndex, 'instagram_closing', value)}
            placeholder="Cierre con llamado a la acción"
          />

          <FormField
            label="Instagram - Hashtags"
            value={event.instagram_hashtags || ''}
            onChange={(value) => updateEvent(eventIndex, 'instagram_hashtags', value)}
            placeholder="#hashtag1 #hashtag2 #hashtag3"
          />

          <FormField
            label="Alt Copy Instagram (Variante)"
            value={event.alt_instagram || ''}
            onChange={(value) => updateEvent(eventIndex, 'alt_instagram', value)}
            multiline
            rows={3}
            placeholder="Copy alternativo para A/B testing"
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-700">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">LinkedIn</h4>

          <FormField
            label="LinkedIn - Post Breve"
            value={event.linkedin_post || ''}
            onChange={(value) => updateEvent(eventIndex, 'linkedin_post', value)}
            multiline
            rows={4}
            placeholder="Post corto para LinkedIn (máx 1,300 caracteres)"
          />

          <FormField
            label="LinkedIn - Artículo"
            value={event.linkedin_article || ''}
            onChange={(value) => updateEvent(eventIndex, 'linkedin_article', value)}
            multiline
            rows={6}
            placeholder="Artículo largo para LinkedIn (hasta 110,000 caracteres)"
          />
        </div>
      </div>

      {/* 8. A/B TESTING */}
      <div className="space-y-4 bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-500/30 rounded-lg p-5">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-purple-700/50 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          A/B Testing Variants
        </h3>

        <FormField
          label="Título Alternativo #1"
          value={event.alt_title_1 || ''}
          onChange={(value) => updateEvent(eventIndex, 'alt_title_1', value)}
          maxLength={100}
          charCount={getCharCount(event.alt_title_1)}
          placeholder="Primera variante del título para testing"
        />

        <FormField
          label="Título Alternativo #2"
          value={event.alt_title_2 || ''}
          onChange={(value) => updateEvent(eventIndex, 'alt_title_2', value)}
          maxLength={100}
          charCount={getCharCount(event.alt_title_2)}
          placeholder="Segunda variante del título para testing"
        />

        <FormField
          label="Resumen Alternativo #1"
          value={event.alt_summary_1 || ''}
          onChange={(value) => updateEvent(eventIndex, 'alt_summary_1', value)}
          multiline
          rows={3}
          maxLength={160}
          charCount={getCharCount(event.alt_summary_1)}
          placeholder="Primera variante del resumen"
        />

        <FormField
          label="Resumen Alternativo #2"
          value={event.alt_summary_2 || ''}
          onChange={(value) => updateEvent(eventIndex, 'alt_summary_2', value)}
          multiline
          rows={3}
          maxLength={160}
          charCount={getCharCount(event.alt_summary_2)}
          placeholder="Segunda variante del resumen"
        />
      </div>
    </div>
  );
};