import React, { useState, useEffect, useRef } from 'react';
import { getEvents, saveEvents, uploadFile } from '../../utils/api';
import { enrichDescription } from '../../utils/enrich';
import { refineDescription } from '../../utils/refine';
import { 
  Loader2, Plus, Trash2, Upload, Save, ArrowLeft, Sparkles, 
  Check, Copy, Image as ImageIcon, Film, X, Send, MessageSquare, 
  Bot, User as UserIcon, RefreshCw, ChevronRight, Lock
} from 'lucide-react';
import { WavEvent, WavMedia } from '../../types';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@wearevision.cl");
  const [passwordInput, setPasswordInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [events, setEvents] = useState<WavEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); 
  const [activeTab, setActiveTab] = useState<'content' | 'ai'>('content');

  // --- AI Editor State ---
  const [selectedAiEventIndex, setSelectedAiEventIndex] = useState<number | null>(null);
  const [aiDraft, setAiDraft] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkSession();
    loadData();
  }, []);

  useEffect(() => {
    // Auto-scroll chat
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

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

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      const normalizedData = data.map(e => ({
        ...e,
        gallery: e.gallery || (e.image ? [{ 
            id: 'legacy-cover', 
            type: 'image', 
            url: e.image, 
            path: e.imagePath 
        } as WavMedia] : [])
      }));
      setEvents(normalizedData);
    } catch (e) {
      console.error(e);
      alert("Error cargando datos");
    }
    setLoading(false);
  };

  // --- AI Handlers ---

  const handleAiSelectEvent = (index: number) => {
    setSelectedAiEventIndex(index);
    // Generate initial draft using the basic enricher
    const initialDraft = enrichDescription(events[index].description, events[index]);
    setAiDraft(initialDraft);
    setChatHistory([
      { role: 'assistant', text: `Hola. He generado un primer borrador para "${events[index].title}". ¿Qué te gustaría mejorar?` }
    ]);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || selectedAiEventIndex === null) return;

    const prompt = chatInput;
    setChatInput("");
    setIsRefining(true);

    // Add User Message
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: prompt }];
    setChatHistory(newHistory);

    try {
      // Call AI Refiner with full history
      const { draft: newDraft, response: aiResponse } = await refineDescription(
        newHistory, 
        aiDraft, 
        events[selectedAiEventIndex]
      );
      
      setAiDraft(newDraft);
      
      // Add AI Response
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        text: aiResponse 
      }]);

    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Lo siento, hubo un error al procesar tu solicitud." }]);
    } finally {
      setIsRefining(false);
    }
  };

  async function handleApprove(eventId: string, finalText: string) {
    try {
      // Safely access environment variables to prevent crashes
      // @ts-ignore
      const env = import.meta.env || {};
      // @ts-ignore
      const procEnv = typeof process !== 'undefined' ? process.env : {};
      
      // Try VITE_ prefixed first (standard), then fallback to direct name
      const token = env.VITE_EDGE_ADMIN_TOKEN || procEnv.EDGE_ADMIN_TOKEN || "";

      if (!token) {
        console.warn("Warning: EDGE_ADMIN_TOKEN or VITE_EDGE_ADMIN_TOKEN is missing.");
      }

      const response = await fetch(
        "https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/update-event-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            eventId,
            newDescription: finalText
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("EDGE ERROR:", errorText);
        alert("Error al guardar en Supabase: " + errorText);
        return;
      }

      alert("Descripción actualizada correctamente en Supabase.");
    } catch (error) {
      console.error("NETWORK ERROR:", error);
      alert("Error de red o conexión.");
    }
  }


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

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveEvents(events);
      alert("Cambios guardados correctamente");
    } catch (e) {
      alert("Error al guardar cambios");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = async (index: number, field: 'cover' | 'logo' | 'gallery', file: File) => {
    const uploadId = `${index}-${field}-${Date.now()}`;
    setUploading(uploadId);
    
    try {
      const result = await uploadFile(file);
      const newEvents = [...events];
      const objectUrl = URL.createObjectURL(file);
      
      if (field === 'gallery') {
          const isVideo = file.type.startsWith('video/');
          const newMedia: WavMedia = {
              id: crypto.randomUUID(),
              type: isVideo ? 'video' : 'image',
              url: objectUrl,
              path: result.path
          };
          newEvents[index].gallery = [...(newEvents[index].gallery || []), newMedia];
          if (!isVideo && (!newEvents[index].imagePath || newEvents[index].gallery?.length === 1)) {
              newEvents[index].image = objectUrl;
              newEvents[index].imagePath = result.path;
          }
      } else if (field === 'logo') {
        newEvents[index].logoPath = result.path;
        newEvents[index].logoUrl = objectUrl;
      }
      setEvents(newEvents);
    } catch (e) {
      console.error(e);
      alert("Error subiendo archivo");
    } finally {
      setUploading(null);
    }
  };

  const removeGalleryItem = (eventIndex: number, mediaId: string) => {
      if (!confirm("¿Eliminar este archivo?")) return;
      const newEvents = [...events];
      const gallery = newEvents[eventIndex].gallery || [];
      newEvents[eventIndex].gallery = gallery.filter(m => m.id !== mediaId);
      if (newEvents[eventIndex].gallery?.length && newEvents[eventIndex].gallery[0].type === 'image') {
          const first = newEvents[eventIndex].gallery[0];
          newEvents[eventIndex].image = first.url;
          newEvents[eventIndex].imagePath = first.path;
      }
      setEvents(newEvents);
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([{
      brand: "Nueva Marca",
      title: "Nuevo Evento",
      description: "Descripción del evento...",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
      gallery: []
    }, ...events]);
  };

  const removeEvent = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      const newEvents = [...events];
      newEvents.splice(index, 1);
      setEvents(newEvents);
    }
  };

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
                className="text-xs text-red-400 hover:text-red-300 underline mr-4"
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
        </div>

        {activeTab === 'content' ? (
          // --- CONTENT EDITOR TAB ---
          <div className="grid gap-6 pb-20">
          {events.map((event, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-400">Galería Multimedia</label>
                        <div className="grid grid-cols-3 gap-2">
                            {event.gallery?.map((media) => (
                                <div key={media.id} className="relative aspect-square bg-neutral-800 rounded-md overflow-hidden group">
                                    {media.type === 'video' ? (
                                        <video src={media.url} className="w-full h-full object-cover opacity-50" />
                                    ) : (
                                        <img src={media.url} alt="Gallery" className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-black/50 rounded text-[10px] text-white uppercase">
                                        {media.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                                    </div>
                                    <button 
                                        onClick={() => removeGalleryItem(i, media.id)}
                                        className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square bg-neutral-800 rounded-md border border-dashed border-neutral-700 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800/50 hover:border-neutral-500 transition-all text-neutral-500 hover:text-neutral-300">
                                <Upload className="h-5 w-5 mb-1" />
                                <span className="text-[10px] font-medium">Subir</span>
                                <input 
                                    type="file" 
                                    accept="image/*,video/mp4" 
                                    multiple
                                    className="hidden" 
                                    onChange={(e) => e.target.files && Array.from(e.target.files).forEach(file => handleFileChange(i, 'gallery', file))}
                                />
                            </label>
                        </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-4">
                     <div className="flex justify-between items-start">
                       <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-neutral-400">Marca</label>
                           <input 
                             value={event.brand} 
                             onChange={(e) => updateEvent(i, 'brand', e.target.value)}
                             className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-neutral-400">Logo URL</label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                  <input 
                                    value={event.logoUrl || ''} 
                                    disabled
                                    className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-neutral-400 disabled:cursor-not-allowed pr-8"
                                  />
                                  {event.logoUrl && <img src={event.logoUrl} className="absolute right-1 top-1 h-7 w-7 object-contain" />}
                              </div>
                               <label className="cursor-pointer p-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 flex items-center justify-center shrink-0">
                                <Upload className="h-4 w-4" />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileChange(i, 'logo', e.target.files[0])} />
                              </label>
                            </div>
                         </div>
                       </div>
                       <button className="inline-flex items-center justify-center rounded-md h-9 w-9 text-red-500 hover:text-red-400 hover:bg-red-950/50 ml-2" onClick={() => removeEvent(i)}>
                         <Trash2 className="h-5 w-5" />
                       </button>
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs font-medium text-neutral-400">Título</label>
                       <input 
                         value={event.title} 
                         onChange={(e) => updateEvent(i, 'title', e.target.value)}
                         className="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-lg font-bold text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                       />
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs font-medium text-neutral-400">Descripción</label>
                       <textarea 
                         value={event.description} 
                         onChange={(e) => updateEvent(i, 'description', e.target.value)}
                         className="flex min-h-[100px] w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                       />
                     </div>
                  </div>
                </div>
              </div>
            </div>
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
                        key={idx}
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
                        <h2 className="text-xl font-bold text-white">
                           Editando: <span className="text-pink-500">{events[selectedAiEventIndex].title}</span>
                        </h2>
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
                     <div className="space-y-2 flex flex-col">
                        <div className="flex items-center justify-between">
                           <label className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase tracking-wider flex items-center">
                              <Sparkles className="w-3 h-3 mr-2 text-pink-500" /> Borrador Optimizado
                           </label>
                           <button 
                              onClick={() => { navigator.clipboard.writeText(aiDraft); alert("Copiado"); }}
                              className="text-[10px] flex items-center text-neutral-400 hover:text-white"
                           >
                              <Copy className="w-3 h-3 mr-1" /> Copiar
                           </button>
                        </div>
                        <textarea
                           value={aiDraft}
                           onChange={(e) => setAiDraft(e.target.value)}
                           className="flex-1 bg-neutral-900 border border-pink-500/30 focus:border-pink-500 rounded-lg p-4 text-white text-sm leading-relaxed resize-none outline-none focus:ring-1 focus:ring-pink-500/50 transition-all"
                        />
                        <button
                           onClick={() => selectedAiEventIndex !== null && handleApprove(events[selectedAiEventIndex].id, aiDraft)}
                           className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm flex items-center justify-center transition-colors shadow-lg shadow-pink-900/20 mt-2"
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
