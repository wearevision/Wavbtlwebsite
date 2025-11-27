import React, { useState, useEffect, useMemo } from 'react';
import { 
  Loader2, Plus, Trash2, Upload, Save, ArrowLeft, Sparkles, 
  Check, Copy, Image as ImageIcon, Film, X, Send, MessageSquare, 
  Bot, User as UserIcon, RefreshCw, ChevronRight, Lock, Wand2, AlertTriangle
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { publicAnonKey, projectId } from '../../utils/supabase/info';
import { useAdminAIChat, ChatMessage } from '../../src/hooks/useAdminAIChat';
import { useAdminEvents } from '../../src/hooks/useAdminEvents';
import { useEventValidation, hasValidationErrors } from '../../src/hooks/useEventValidation';
import { FormField } from './FormField';
import { EventEditorCard } from './EventEditorCard';
import { FIELD_TOOLTIPS, getCharCount } from '../../utils/validation';

export const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@wearevision.cl");
  const [passwordInput, setPasswordInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'ai'>('content');

  // --- Hooks ---
  const {
    events,
    loading,
    saving,
    saveStatus, // New prop
    lastSavedAt,
    uploading,
    handleSave,
    handleFileChange,
    removeGalleryItem,
    updateEvent,
    addEvent,
    removeEvent,
    handleApprove,
    handleCleanupEvents
  } = useAdminEvents();

  // Validation hook
  const validationMap = useEventValidation(events);
  const hasErrors = useMemo(() => {
    for (const state of validationMap.values()) {
      if (!state.isValid) return true;
    }
    return false;
  }, [validationMap]);

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
  } = useAdminAIChat(events);

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
                // Quietly try fallback if API fails (common in iframes/permissions policy)
                fallbackCopy(text);
            });
    } else {
        fallbackCopy(text);
    }
  };

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
    <div className="h-screen bg-neutral-950 text-white p-8 overflow-y-auto font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-950/95 backdrop-blur-md z-20 border-b border-neutral-800 pb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center text-neutral-400 hover:text-white transition-colors" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
              </button>
              <h1 className="text-2xl md:text-3xl font-bold">CMS - Gestión de Contenidos</h1>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-xs text-neutral-500 hidden md:inline-block">Sesión Segura</span>
              <button 
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 underline mr-4 pt-[0px] pr-[0px] pb-[0px] pl-[5px]"
              >
                Cerrar Sesión
              </button>

              {activeTab === 'content' && (
                <button onClick={addEvent} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 border border-neutral-800 bg-transparent hover:bg-neutral-800 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
                </button>
              )}
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
              >
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Guardar Cambios
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'content' 
                  ? 'bg-white text-black' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Contenido General
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'ai' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Optimización Conversacional IA
            </button>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 right-4 flex flex-col items-end pointer-events-none">
              <span className={`text-[10px] font-mono uppercase tracking-widest transition-opacity duration-300 ${
                  saveStatus === 'idle' ? 'opacity-0' : 'opacity-100'
              } ${
                  saveStatus === 'success' ? 'text-green-500' : 
                  saveStatus === 'error' ? 'text-red-500' : 
                  'text-neutral-500'
              }`}>
                  {saveStatus === 'saving' && "Saving..."}
                  {saveStatus === 'success' && "Synced ✓"}
                  {saveStatus === 'error' && "Error ✗"}
              </span>
              
              {/* Last Saved Timestamp */}
              {lastSavedAt && (
                <span className="text-[9px] text-neutral-600 font-mono mt-1 transition-opacity duration-500">
                   Last saved: {lastSavedAt}
                </span>
              )}
          </div>
        </div>

        {activeTab === 'content' ? (
          // --- CONTENT EDITOR TAB ---
          <div className="grid gap-6 pb-20">
          {/* Normalization Banner */}
          <div className="bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/20 rounded-xl p-4 flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Wand2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-blue-300 mb-1">Sistema de Normalización Automática</h3>
                <p className="text-neutral-400 leading-relaxed max-w-3xl text-[13px]">
                  Todos los eventos se normalizan automáticamente al guardar. Si tienes eventos legacy en la base de datos,
                  usa el botón de limpieza para generar IDs, slugs, convertir gallery a arrays y eliminar campos no permitidos.
                </p>
              </div>
            </div>
            <button
              onClick={handleCleanupEvents}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 whitespace-nowrap ml-4"
            >
              {saving ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Wand2 className="mr-2 h-3 w-3" />}
              Normalizar Todos
            </button>
          </div>

          {/* Validation Warning Banner */}
          {hasErrors && (
            <div className="bg-gradient-to-r from-red-950/40 to-orange-950/40 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-300 mb-1">⚠️ Errores de Validación Detectados</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-2">
                  Algunos eventos tienen campos incompletos o inválidos. Revisa y corrige los errores antes de guardar.
                </p>
                <ul className="text-[11px] text-neutral-400 space-y-1 list-disc list-inside">
                  <li>Verifica que todos los campos obligatorios estén completos (Marca, Título, Descripción, Imagen Principal)</li>
                  <li>Asegúrate de que las URLs de imágenes sean válidas (HTTPS)</li>
                  <li>Revisa los contadores de caracteres en cada campo</li>
                </ul>
              </div>
              <div className="text-[10px] text-red-400 font-mono bg-red-950/30 px-3 py-2 rounded-md">
                {Array.from(validationMap.values()).filter(v => !v.isValid).length} evento(s) con errores
              </div>
            </div>
          )}

          {/* Events List */}
          {events.map((event, i) => (
             <EventEditorCard 
               key={event.id || i}
               event={event}
               index={i}
               validation={validationMap.get(i)}
               handleFileChange={handleFileChange}
               updateEvent={updateEvent}
               removeGalleryItem={removeGalleryItem}
               removeEvent={removeEvent}
             />
          ))}
          </div>
        ) : (
          // --- AI CONVERSATIONAL EDITOR TAB ---
          <div className="pb-24 h-full flex flex-col">
             {selectedAiEventIndex === null ? (
               // 1. Event Selector State
               <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event, idx) => (
                     <button 
                        key={event.id || idx}
                        onClick={() => handleAiSelectEvent(idx)}
                        className="bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 p-6 rounded-[0px] text-left transition-all group"
                     >
                        <span className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2 block">{event.brand}</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-pink-500 transition-colors">{event.title}</h3>
                        <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{event.description}</p>
                        <div className="mt-4 flex items-center text-xs text-neutral-400 group-hover:text-white">
                           <Sparkles className="w-3 h-3 mr-2" /> Optimizar con IA <ChevronRight className="w-3 h-3 ml-auto" />
                        </div>
                     </button>
                  ))}
               </div>
             ) : (
               // 2. Editor Workspace State
               <div className="flex flex-col h-full gap-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-lg border border-neutral-800">
                     <div>
                        <button onClick={() => setSelectedAiEventIndex(null)} className="text-xs text-neutral-400 hover:text-white mb-1 flex items-center">
                           <ArrowLeft className="w-3 h-3 mr-1" /> Seleccionar otro evento
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
                                {events[selectedAiEventIndex].brand} • {events[selectedAiEventIndex].category || 'General'}
                            </span>
                            <h2 className="text-xl font-bold text-white">
                               Editando: <span className="text-pink-500">{events[selectedAiEventIndex].title}</span>
                            </h2>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => handleAiSelectEvent(selectedAiEventIndex)}
                           className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full"
                           title="Reiniciar sesión"
                        >
                           <RefreshCw className="w-4 h-4" />
                        </button>
                     </div>
                  </div>

                  {/* Dual Pane Editor */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
                     {/* Left: Original */}
                     <div className="space-y-2 flex flex-col">
                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Descripción Original</label>
                        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-neutral-300 text-sm leading-relaxed overflow-y-auto">
                           {events[selectedAiEventIndex].description}
                        </div>
                     </div>

                     {/* Right: AI Draft */}
                     <div className="space-y-2 flex flex-col h-full overflow-y-auto pr-2">
                        <div className="flex items-center justify-between">
                           <label className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase tracking-wider flex items-center">
                              <Sparkles className="w-3 h-3 mr-2 text-pink-500" /> Borrador Optimizado
                           </label>
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
10. Orden sugerido de fotos con hero y justificación (en chat_response)
`)}
                                className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-full text-[10px] font-bold flex items-center shadow-lg shadow-purple-900/20 transition-all transform hover:scale-105"
                           >
                                <Sparkles className="w-3 h-3 mr-1" /> OPTIMIZAR TODO
                           </button>
                        </div>

                        {/* Main Description */}
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-500 uppercase">Descripción Principal (Draft)</label>
                            <textarea
                               value={aiFormState.description || ''}
                               onChange={(e) => setAiFormState(prev => ({ ...prev, description: e.target.value }))}
                               className="w-full bg-neutral-900 border border-pink-500/30 focus:border-pink-500 rounded-lg p-3 text-white text-sm leading-relaxed resize-none h-32 outline-none focus:ring-1 focus:ring-pink-500/50 transition-all"
                            />
                        </div>

                        {/* Generated Fields Grid */}
                        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {/* Audit Block */}
                            <div className="space-y-2 border-b border-neutral-800 pb-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-orange-400 uppercase">Auditoría de Contenido</h4>
                                    <button
                                        onClick={() => handleSendMessage(`Audita este evento y detecta problemas narrativos, estructuras débiles o texto mejorable.

Indica:

1. Qué falta
2. Qué sobra
3. Qué es confuso
4. Qué no está alineado con branding BTL
5. Propuestas de mejora rápidas

Datos del evento:
${JSON.stringify(events[selectedAiEventIndex], null, 2)}`)}
                                        className="px-2 py-1 bg-orange-900/20 hover:bg-orange-900/40 border border-orange-500/30 rounded text-[10px] text-orange-300 flex items-center gap-1"
                                    >
                                        <AlertTriangle className="w-3 h-3" /> Auditar (IA)
                                    </button>
                                </div>
                            </div>

                            {/* SEO Block */}
                            <div className="space-y-2 border-t border-neutral-800 pt-2">
                                <h4 className="text-xs font-bold text-blue-400 uppercase">SEO & Metadata</h4>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-neutral-500">Título Optimizado</label>
                                        <input 
                                            value={aiFormState.title || ''}
                                            onChange={(e) => setAiFormState(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 text-[15px] font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-neutral-500">Slug</label>
                                        <div className="flex gap-1">
                                            <input 
                                                value={aiFormState.slug || ''}
                                                onChange={(e) => setAiFormState(prev => ({ ...prev, slug: e.target.value }))}
                                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-mono text-neutral-400 italic"
                                            />
                                            <button
                                                onClick={() => handleSendMessage(`Genera un slug SEO corto, claro, sin tildes, sin mayúsculas, sin artículos redundantes.
Datos del evento:
- Año: ${events[selectedAiEventIndex].year || new Date().getFullYear()}
- Marca: ${events[selectedAiEventIndex].brand}
- Nombre: ${events[selectedAiEventIndex].title}
- Título: ${aiFormState.title || events[selectedAiEventIndex].title}

Devuélvelo SOLO como slug, sin explicación.`)}
                                                className="px-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs text-neutral-300"
                                                title="Generar Slug con IA"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Meta Description (Summary)</label>
                                    <textarea 
                                        value={aiFormState.summary || ''}
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, summary: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-16 resize-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[13px] text-neutral-500">Highlights</label>
                                        <button
                                            onClick={() => handleSendMessage(`Genera 3–5 highlights claros, concretos y diferenciadores de este evento. Sin humo ni adjetivos vacíos.

Datos:
- Marca: ${events[selectedAiEventIndex].brand}
- Evento: ${aiFormState.title || events[selectedAiEventIndex].title}
- Descripción: ${aiFormState.description || events[selectedAiEventIndex].description}`)}
                                            className="px-2 py-0.5 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 rounded text-[9px] text-blue-300 flex items-center gap-1"
                                            title="Generar Highlights con IA"
                                        >
                                            <Sparkles className="w-3 h-3" /> Generar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(aiFormState.highlights || []).map((h: string, i: number) => (
                                            <div key={i} className="flex items-center bg-blue-900/20 border border-blue-500/20 rounded px-2 py-0.5">
                                                <span className="text-blue-200 text-[10px] mr-1">{h}</span>
                                                <button 
                                                    onClick={() => {
                                                        const newH = [...(aiFormState.highlights || [])];
                                                        newH.splice(i, 1);
                                                        setAiFormState(prev => ({ ...prev, highlights: newH }));
                                                    }}
                                                    className="text-blue-400 hover:text-white"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            onClick={() => {
                                                const newH = [...(aiFormState.highlights || []), "New Highlight"];
                                                setAiFormState(prev => ({ ...prev, highlights: newH }));
                                            }}
                                            className="px-2 py-0.5 bg-neutral-800 text-[10px] text-neutral-400 rounded hover:bg-neutral-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[13px] text-neutral-500">Keywords</label>
                                        <textarea
                                            value={Array.isArray(aiFormState.keywords) ? aiFormState.keywords.join(', ') : aiFormState.keywords || ''}
                                            onChange={(e) => setAiFormState(prev => ({ ...prev, keywords: e.target.value.split(',').map(s => s.trim()) }))}
                                            className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-12 resize-none"
                                            placeholder="keyword1, keyword2..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[13px] text-neutral-500">Hashtags (Global)</label>
                                        <div className="flex gap-1">
                                            <textarea
                                                value={Array.isArray(aiFormState.hashtags) ? aiFormState.hashtags.join(' ') : aiFormState.hashtags || ''}
                                                onChange={(e) => setAiFormState(prev => ({ ...prev, hashtags: e.target.value.split(/[\s,]+/).filter(Boolean) }))}
                                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-12 resize-none"
                                                placeholder="#tag1 #tag2..."
                                            />
                                            <button
                                                onClick={() => handleSendMessage(`Genera los mejores hashtags para Instagram, máximo 12, combinando:
- tendencias actuales
- industria del evento
- marca
- categoría BTL / brand experience

Evento:
${aiFormState.description || events[selectedAiEventIndex].description}

Devuelve SOLO la lista separada por espacios, estilo Instagram real.`)}
                                                className="px-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs text-neutral-300 flex items-center justify-center h-12"
                                                title="Generar Hashtags con IA"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Block */}
                            <div className="space-y-2 border-t border-neutral-800 pt-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-pink-400 uppercase">Instagram Content</h4>
                                    <button
                                        onClick={() => handleSendMessage(`Genera un copy profesional y emocional para Instagram con:

1. Hook inicial de alto impacto  
2. Cuerpo breve con storytelling  
3. Cierre con CTA suave  
4. 3 líneas de separación antes de los hashtags  
5. Usa los hashtags proporcionados o genera nuevos si faltan  

Datos:
- Marca: ${events[selectedAiEventIndex].brand}
- Título del evento: ${aiFormState.title || events[selectedAiEventIndex].title}
- Highlights: ${(aiFormState.highlights || events[selectedAiEventIndex].highlights || []).join(', ')}
- Descripción: ${aiFormState.description || events[selectedAiEventIndex].description}
- Keywords: ${(aiFormState.keywords || events[selectedAiEventIndex].keywords || []).join(', ')}`)}
                                        className="px-2 py-1 bg-pink-900/20 hover:bg-pink-900/40 border border-pink-500/30 rounded text-[10px] text-pink-300 flex items-center gap-1"
                                        title="Generar Copy Completo"
                                    >
                                        <Sparkles className="w-3 h-3" /> Auto-Generar
                                    </button>
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Hook</label>
                                    <input 
                                        value={aiFormState.instagram_hook || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, instagram_hook: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-bold text-white" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Body</label>
                                    <textarea 
                                        value={aiFormState.instagram_body || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, instagram_body: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-20" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Closing</label>
                                    <input 
                                        value={aiFormState.instagram_closing || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, instagram_closing: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Hashtags (IG)</label>
                                    <input 
                                        value={aiFormState.instagram_hashtags || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, instagram_hashtags: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-pink-400" 
                                    />
                                </div>
                            </div>

                            {/* LinkedIn Block */}
                            <div className="space-y-2 border-t border-neutral-800 pt-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-blue-300 uppercase">LinkedIn Content</h4>
                                    <button
                                        onClick={() => handleSendMessage(`Genera un post para LinkedIn sobre este evento.

El tono debe mezclar:
- técnica narrativa
- retórica (ethos, pathos, logos)
- storytelling aplicado a negocios
- marketing experiencial
- neuromarketing
- liderazgo creativo
- impacto en marca y resultados

Datos:
- Marca: ${events[selectedAiEventIndex].brand}
- Nombre del evento: ${aiFormState.title || events[selectedAiEventIndex].title}
- Highlights: ${(aiFormState.highlights || events[selectedAiEventIndex].highlights || []).join(', ')}
- Descripción: ${aiFormState.description || events[selectedAiEventIndex].description}

Extensión máxima: 8–14 líneas.
Nada de humo ni frases vacías.`)}
                                        className="px-2 py-1 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 rounded text-[10px] text-blue-300 flex items-center gap-1"
                                        title="Generar Post LinkedIn"
                                    >
                                        <Sparkles className="w-3 h-3" /> Auto-Generar
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[13px] text-neutral-500">Post Corto</label>
                                    <textarea 
                                        value={aiFormState.linkedin_post || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, linkedin_post: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-16" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[13px] text-neutral-500">Artículo Largo</label>
                                        <button
                                            onClick={() => handleSendMessage(`Escribe un artículo profesional para LinkedIn basado en este evento.

Estructura:
1. Introducción narrativa (contexto + tensión)
2. El desafío de marca
3. La solución BTL / experiencia creada
4. Qué se logró (impacto y aprendizajes)
5. Conclusión inspiradora orientada a negocio

Debe mezclar:
- storytelling estratégico
- retórica
- insights creativos
- neuromarketing
- experiencia de marca
- liderazgo creativo

Datos:
- Marca: ${events[selectedAiEventIndex].brand}
- Evento: ${aiFormState.title || events[selectedAiEventIndex].title}
- Highlights: ${(aiFormState.highlights || events[selectedAiEventIndex].highlights || []).join(', ')}
- Descripción: ${aiFormState.description || events[selectedAiEventIndex].description}`)}
                                            className="px-2 py-0.5 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 rounded text-[9px] text-blue-300 flex items-center gap-1"
                                            title="Generar Artículo LinkedIn"
                                        >
                                            <Sparkles className="w-3 h-3" /> Generar Artículo
                                        </button>
                                    </div>
                                    <textarea 
                                        value={aiFormState.linkedin_article || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, linkedin_article: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-32" 
                                    />
                                </div>
                            </div>

                            {/* Alternatives Block */}
                            <div className="space-y-2 border-t border-neutral-800 pt-2">
                                <h4 className="text-xs font-bold text-neutral-400 uppercase">Variantes Alternativas (A/B)</h4>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    <input 
                                        placeholder="Título Alt 1"
                                        value={aiFormState.alt_title_1 || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, alt_title_1: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300" 
                                    />
                                    <input 
                                        placeholder="Título Alt 2"
                                        value={aiFormState.alt_title_2 || ''} 
                                        onChange={(e) => setAiFormState(prev => ({ ...prev, alt_title_2: e.target.value }))}
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300" 
                                    />
                                </div>
                                <textarea 
                                    placeholder="Copy Alt Instagram"
                                    value={aiFormState.alt_instagram || ''} 
                                    onChange={(e) => setAiFormState(prev => ({ ...prev, alt_instagram: e.target.value }))}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 h-16" 
                                />
                            </div>

                            {/* Visual Strategy Block */}
                            <div className="space-y-2 border-t border-neutral-800 pt-2">
                                <h4 className="text-xs font-bold text-purple-400 uppercase">Estrategia Visual</h4>
                                <button
                                    onClick={() => handleSendMessage(`Revisa esta lista de imágenes:

${(events[selectedAiEventIndex].gallery || []).map((g: any) => g.url).join('\n')}

Diseña la estrategia visual para un portfolio con hero trapezoidal:

1) Hero ideal  
2) Orden óptimo de imágenes  
3) Justificación clara basadas en composición, impacto visual, narrativa y claridad profesional

Formato:
Hero:
Orden:
Justificación:`)}
                                    className="w-full py-2 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/30 rounded text-xs text-purple-300 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon className="w-4 h-4" /> Sugerir Orden de Fotos (IA)
                                </button>
                            </div>
                        </div>

                        <button
                           onClick={() => {
                                if (selectedAiEventIndex !== null && events[selectedAiEventIndex]?.id) {
                                    // Filter out undefined values to prevent overwriting with undefined
                                    const updates = Object.fromEntries(
                                        Object.entries(aiFormState).filter(([_, v]) => v !== undefined)
                                    );
                                    handleApprove(events[selectedAiEventIndex].id, updates);
                                }
                           }}
                           className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm flex items-center justify-center transition-colors shadow-lg shadow-pink-900/20 mt-4 sticky bottom-0 z-10"
                        >
                           <Check className="w-4 h-4 mr-2" /> Aprobar y Guardar en CMS
                        </button>
                     </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col min-h-[300px]">
                     <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Asistente de Edición BTL</span>
                     </div>
                     
                     {/* Messages Area */}
                     <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
                        {chatHistory.map((msg, idx) => (
                           <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.role === 'assistant' && (
                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/20">
                                    <Bot className="w-4 h-4 text-white" />
                                 </div>
                              )}
                              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                 msg.role === 'user' 
                                    ? 'bg-white text-black rounded-tr-none' 
                                    : 'bg-neutral-800 text-neutral-200 rounded-tl-none'
                              }`}>
                                 {msg.text}
                              </div>
                              {msg.role === 'user' && (
                                 <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                                    <UserIcon className="w-4 h-4 text-neutral-400" />
                                 </div>
                              )}
                           </div>
                        ))}
                        {isRefining && (
                           <div className="flex gap-3 justify-start animate-pulse">
                              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                                 <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                              </div>
                              <div className="bg-neutral-800/50 p-3 rounded-2xl text-xs text-neutral-400 flex items-center">
                                 Generando optimización...
                              </div>
                           </div>
                        )}
                        <div ref={chatEndRef} />
                     </div>

                     {/* Input Area */}
                     <div className="p-4 bg-neutral-950 border-t border-neutral-800">
                        <div className="relative flex items-center gap-2">
                           <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                              placeholder="Ej: Hazlo más corto, agrega énfasis en la tecnología inmersiva, hazlo más corporativo..."
                              className="flex-1 bg-neutral-900 border border-neutral-700 text-white text-sm rounded-full px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all placeholder-neutral-600"
                              disabled={isRefining}
                           />
                           <button 
                              onClick={handleSendMessage}
                              disabled={!chatInput.trim() || isRefining}
                              className="p-3 bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-white/10"
                           >
                              {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                           </button>
                        </div>
                        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                           {["Hacerlo más corto", "Más técnico", "Más inmersivo", "Más corporativo", "Agregar detalles"].map((suggestion) => (
                              <button
                                 key={suggestion}
                                 onClick={() => setChatInput(suggestion)}
                                 className="whitespace-nowrap px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-[10px] text-neutral-400 hover:text-white transition-colors border border-neutral-700"
                              >
                                 {suggestion}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};
