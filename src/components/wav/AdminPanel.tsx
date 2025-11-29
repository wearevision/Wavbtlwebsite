import React, { useState, useEffect, useMemo } from 'react';
import { 
  Loader2, Plus, Trash2, Upload, Save, ArrowLeft, Sparkles, 
  Check, Copy, Image as ImageIcon, Film, X, Send, MessageSquare, 
  Bot, User as UserIcon, RefreshCw, ChevronRight, Lock, Wand2, AlertTriangle, Download
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { publicAnonKey, projectId } from '../../utils/supabase/info';
import { useAdminAIChat, ChatMessage } from '../../src/hooks/useAdminAIChat';
import { useAdminEvents } from '../../src/hooks/useAdminEvents';
import { useEventValidation } from '../../src/hooks/useEventValidation';
import { FormField } from './FormField';
import { EventListView } from './EventListView';
import { FIELD_TOOLTIPS, getCharCount, validateEvent } from '../../utils/validation';
import { EventCategory } from '../../utils/contentRules';
import { Progress } from '../ui/progress';
import { WavEvent } from '../../src/types';

interface AdminPanelProps {
  onBack: () => void;
  categories?: EventCategory[];
}

export const AdminPanel = ({ onBack, categories = [] }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@wearevision.cl");
  const [passwordInput, setPasswordInput] = useState("");
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

  const {
    selectedAiEventIndex,
    setSelectedAiEventIndex,
    aiDraft,
    setAiDraft,
    aiFormState,
    setAiFormState,
    chatHistory,
    chatInput,
    setChatInput,
    isRefining,
    chatEndRef,
    handleAiSelectEvent,
    handleSendMessage
  } = useAdminAIChat(events, updateEvent);

  useEffect(() => {
    checkSession();
  }, []);

  // Sincronizar sesión de IA cuando se abre un evento en el panel de detalle
  useEffect(() => {
    if (selectedEventIndex !== null && selectedEventIndex !== selectedAiEventIndex) {
      handleAiSelectEvent(selectedEventIndex);
    }
  }, [selectedEventIndex]);

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
            if (successful) alert("Copiado");
            else alert("No se pudo copiar. Por favor selecciona el texto manualmente.");
        } catch (err) {
            console.error("Fallback copy failed", err);
            alert("Error al copiar.");
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copiado"))
            .catch(err => {
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

        {/* Right: Event Detail + AI Chat */}
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
              chatHistory={chatHistory}
              chatInput={chatInput}
              setChatInput={setChatInput}
              isRefining={isRefining}
              chatEndRef={chatEndRef}
              handleSendMessage={handleSendMessage}
              aiFormState={aiFormState}
              setAiFormState={setAiFormState}
              handleCopy={handleCopy}
              handleAiSelectEvent={handleAiSelectEvent}
              categories={categories}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="p-6 bg-neutral-900 rounded-full mb-4">
                <Sparkles className="w-16 h-16 text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Selecciona un evento</h3>
              <p className="text-sm text-neutral-400 max-w-md">
                Elige un evento de la lista para editarlo con asistencia de IA conversacional.
              </p>
            </div>
          )}
        </div>
      </div>
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
  chatHistory: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  isRefining: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: (message: string) => void;
  aiFormState: Partial<WavEvent>;
  setAiFormState: React.Dispatch<React.SetStateAction<Partial<WavEvent>>>;
  handleCopy: (text: string) => void;
  handleAiSelectEvent: (index: number) => void;
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
  chatHistory,
  chatInput,
  setChatInput,
  isRefining,
  chatEndRef,
  handleSendMessage,
  aiFormState,
  setAiFormState,
  handleCopy,
  handleAiSelectEvent,
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
              onClick={() => handleAiSelectEvent(eventIndex)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full"
              title="Reiniciar sesión de IA"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
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
          handleSendMessage={handleSendMessage}
          isRefining={isRefining}
        />
        
        {/* AI Chat Section */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <AIChatPanel
            event={event}
            eventIndex={eventIndex}
            chatHistory={chatHistory}
            chatInput={chatInput}
            setChatInput={setChatInput}
            isRefining={isRefining}
            chatEndRef={chatEndRef}
            handleSendMessage={handleSendMessage}
            aiFormState={aiFormState}
            setAiFormState={setAiFormState}
            handleCopy={handleCopy}
          />
        </div>
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
  handleSendMessage: (message: string) => void;
  isRefining: boolean;
}

const EventFieldsEditor: React.FC<EventFieldsEditorProps> = ({
  event,
  eventIndex,
  validation,
  updateEvent,
  handleFileChange,
  removeGalleryItem,
  uploading,
  categories,
  handleSendMessage,
  isRefining
}) => {
  const hasError = (field: string) => validation?.errors?.has(field);
  const getError = (field: string) => validation?.errors?.get(field);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* AI Quick Actions */}
      <div className="bg-gradient-to-r from-pink-950/20 to-purple-950/20 border border-pink-500/20 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          Acciones de IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => handleSendMessage(`MODO: OPTIMIZE
Genera una optimización completa para este evento.
Mejora TODOS los campos textuales sin inventar información.

Requerimientos:
1. Título optimizado
2. Slug SEO
3. Highlights (3–5) potentes
4. Meta description
5. Keywords SEO
6. Hashtags IG
7. Copy Instagram completo
8. Post LinkedIn breve
9. Artículo LinkedIn
10. Orden sugerido de fotos con hero y justificación`)}
            disabled={isRefining}
            className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:from-neutral-700 disabled:to-neutral-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2"
          >
            {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Optimizar Todo
          </button>
          
          <button
            onClick={() => handleSendMessage(`MODO: AUDIT
Analiza este evento en profundidad y proporciona un reporte de calidad SEO y conversión.

Evalúa:
1. Título: claridad, longitud, keywords
2. Descripción: estructura, llamados a la acción
3. Keywords: relevancia, competitividad
4. Hashtags: diversidad, alcance
5. Copy IG/LI: coherencia de marca
6. Multimedia: uso estratégico de imágenes

Provee 3 recomendaciones críticas para maximizar conversión.`)}
            disabled={isRefining}
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-neutral-700 disabled:to-neutral-700 text-white rounded-md text-sm font-bold flex items-center justify-center gap-2"
          >
            {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            Auditar Contenido
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

      {/* Basic Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Información Básica</h3>
        
        {/* Brand */}
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

        {/* Title */}
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

        {/* Description */}
        <FormField
          label="Descripción"
          value={event.description || ''}
          onChange={(value) => updateEvent(eventIndex, 'description', value)}
          error={getError('description')}
          tooltip={FIELD_TOOLTIPS.description}
          required
          multiline
          rows={6}
          maxLength={1000}
          charCount={getCharCount(event.description)}
        />

        {/* Category */}
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

        {/* Summary */}
        <FormField
          label="Resumen (Meta Description)"
          value={event.summary || ''}
          onChange={(value) => updateEvent(eventIndex, 'summary', value)}
          multiline
          rows={3}
          maxLength={160}
          charCount={getCharCount(event.summary)}
        />
      </div>

      {/* Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Multimedia</h3>

        {/* Main Image */}
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

        {/* Logo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Logo de Marca (PNG/SVG)
          </label>
          {event.logo && (
            <img src={event.logo} alt="Logo" className="h-16 object-contain" />
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

        {/* Gallery */}
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

      {/* SEO & Keywords */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">SEO & Keywords</h3>

        {/* Keywords */}
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
          placeholder="keyword1, keyword2, keyword3"
        />

        {/* Hashtags */}
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

        {/* Highlights */}
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
            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm text-neutral-300"
          >
            + Agregar Highlight
          </button>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Contenido Social Media</h3>

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
          label="Instagram - Closing"
          value={event.instagram_closing || ''}
          onChange={(value) => updateEvent(eventIndex, 'instagram_closing', value)}
          placeholder="Cierre con CTA"
        />

        <FormField
          label="LinkedIn - Post Breve"
          value={event.linkedin_post || ''}
          onChange={(value) => updateEvent(eventIndex, 'linkedin_post', value)}
          multiline
          rows={4}
          placeholder="Post corto para LinkedIn"
        />

        <FormField
          label="LinkedIn - Artículo"
          value={event.linkedin_article || ''}
          onChange={(value) => updateEvent(eventIndex, 'linkedin_article', value)}
          multiline
          rows={6}
          placeholder="Artículo largo para LinkedIn"
        />
      </div>
    </div>
  );
};

// AI Chat Panel Component
interface AIChatPanelProps {
  event: WavEvent;
  eventIndex: number;
  chatHistory: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  isRefining: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: (message: string) => void;
  aiFormState: Partial<WavEvent>;
  setAiFormState: React.Dispatch<React.SetStateAction<Partial<WavEvent>>>;
  handleCopy: (text: string) => void;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({
  event,
  eventIndex,
  chatHistory,
  chatInput,
  setChatInput,
  isRefining,
  chatEndRef,
  handleSendMessage,
  aiFormState,
  setAiFormState,
  handleCopy
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-pink-400" />
          Asistente de Edición BTL
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Refina contenidos conversacionalmente. Los cambios se aplican automáticamente.
        </p>
      </div>

      {/* Chat History */}
      <div className="flex-1 bg-neutral-900/30 rounded-lg border border-neutral-800 p-4 overflow-y-auto mb-4">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-neutral-600 mb-3" />
            <p className="text-sm text-neutral-400">
              Comienza a conversar con la IA para optimizar este evento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-pink-600 text-white'
                    : 'bg-neutral-800 text-neutral-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex gap-2">
        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (chatInput.trim() && !isRefining) {
                handleSendMessage(chatInput);
              }
            }
          }}
          placeholder="Escribe tu mensaje para la IA..."
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
          rows={3}
          disabled={isRefining}
        />
        <button
          onClick={() => {
            if (chatInput.trim() && !isRefining) {
              handleSendMessage(chatInput);
            }
          }}
          disabled={!chatInput.trim() || isRefining}
          className="px-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRefining ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
