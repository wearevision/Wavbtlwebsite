// ⚡ WAV ADMIN PANEL v3.0.0-MOBILE-FIRST ⚡ Ultra Minimal Apple Design
import React, { useState, useEffect } from 'react';
import { 
  Loader2, Plus, Save, ArrowLeft, Sparkles, 
  Check, Image as ImageIcon, Film, X, Lock, Wand2, AlertTriangle, Download, Zap, User as UserIcon, FileDown, Menu, MoreVertical, ChevronDown, Search, Filter, Trash2
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { publicAnonKey, projectId } from '../../utils/supabase/info';
import { useAdminEvents } from '../../src/hooks/useAdminEvents';
import { useEventValidation } from '../../src/hooks/useEventValidation';
import { useEventEnricher } from '../../src/hooks/useEventEnricher';
import { FormField } from './FormField';
import { OpenAIStatusIndicator } from './OpenAIStatusIndicator';
import { ClaudeOptimizer } from './ClaudeOptimizer';
import { BatchProcessingModal } from './BatchProcessingModal';
import { AssetMigrationModal } from './AssetMigrationModal';
import { OpenGraphPreview } from './OpenGraphPreview';
import { FIELD_TOOLTIPS, getCharCount, validateEvent } from '../../utils/validation';
import { EventCategory } from '../../utils/contentRules';
import { Progress } from '../ui/progress';
import { WavEvent } from '../../types';
import { toast } from 'sonner@2.0.3';
import { generateLocalEventsFile } from '../../utils/sync-to-local';
import { copyToClipboard } from '../../utils/clipboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../ui/sheet';
import { motion, AnimatePresence } from 'motion/react';

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
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [showEventsList, setShowEventsList] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showClaudeOptimizer, setShowClaudeOptimizer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // AI Console State
  const [showAIConsole, setShowAIConsole] = useState(false);
  const [aiLogs, setAILogs] = useState<Array<{ timestamp: string; type: 'info' | 'success' | 'error' | 'warning' | 'debug'; message: string }>>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentOptimizingEvent, setCurrentOptimizingEvent] = useState<string | null>(null);

  const {
    events,
    loading,
    saving,
    saveStatus,
    lastSavedAt,
    uploading,
    loadData,
    handleSave,
    saveEvent,
    handleFileChange,
    removeGalleryItem,
    updateEvent,
    addEvent,
    removeEvent,
  } = useAdminEvents();

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
      toast.error("Error de autenticación: " + error.message);
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
       toast.success("Usuario administrador creado. Ahora puedes iniciar sesión.");
    } catch (e: any) {
       toast.error("Error creando admin: " + e.message);
    } finally {
       setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleNewEvent = async () => {
    await addEvent();
    setSelectedEventIndex(0);
    setShowEventsList(false);
  };

  const handlePullFromSupabase = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    try {
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
      
      toast.success("Datos sincronizados desde Supabase");
    } catch (e) {
      console.error(e);
      toast.error("Error al sincronizar datos");
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const handleSaveToSupabase = async () => {
    const invalidEvents: string[] = [];
    
    events.forEach((event) => {
      const validation = validateEvent(event);
      if (!validation.isValid) {
        invalidEvents.push(`${event.brand || 'Sin marca'} - ${event.title || 'Sin título'}`);
      }
    });

    if (invalidEvents.length > 0) {
      toast.error(
        `No se puede guardar. ${invalidEvents.length} eventos tienen campos inválidos.`
      );
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);
    try {
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

  const handleSyncToLocalFile = async () => {
    try {
      setIsSyncing(true);
      toast.info('Generando backup...');
      
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        toast.error('No autenticado.');
        return;
      }

      const fileContent = await generateLocalEventsFile(accessToken);
      
      const shouldDownload = confirm(
        '✅ Archivo generado!\n\n' +
        `Total: ${events.length}\n\n` +
        '¿Descargar?'
      );

      if (shouldDownload) {
        const blob = new Blob([fileContent], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'events.ts';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Descargado!');
      } else {
        const success = await copyToClipboard(fileContent);
        if (success) {
          toast.success('Copiado!');
        } else {
          toast.error('Error al copiar. Intenta descargar en su lugar.');
        }
      }
    } catch (error: any) {
      console.error('Error syncing:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const currentEvent = selectedEventIndex !== null ? events[selectedEventIndex] : null;
  const currentValidation = selectedEventIndex !== null ? validationMap.get(selectedEventIndex) : null;

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = filterBrand === 'all' || event.brand === filterBrand;
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  // Get unique brands and categories
  const brands = ['all', ...Array.from(new Set(events.map(e => e.brand).filter(Boolean)))];
  const categoryOptions = ['all', ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];

  // --- Auth Gate ---
  if (!isAuthenticated) {
    return (
      <div className="bg-black flex flex-col gap-6 items-center justify-center h-screen w-full px-6">
         <div className="flex flex-col gap-2 items-center">
            <h1 className="font-medium text-xl tracking-tight">WAV CMS</h1>
            <p className="text-sm text-neutral-500">Acceso Seguro</p>
         </div>
         
         <div className="w-full max-w-sm space-y-3">
            <div className="space-y-2">
              <div className="relative flex items-center px-4 h-11 border-b border-neutral-800">
                <UserIcon className="w-4 h-4 text-neutral-500 mr-3" />
                <input 
                  type="email"
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
                  placeholder="Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="relative flex items-center px-4 h-11 border-b border-neutral-800">
                <Lock className="w-4 h-4 text-neutral-500 mr-3" />
                <input 
                  type="password"
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 w-full"
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
              className="w-full h-11 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center disabled:opacity-50 active:scale-95"
            >
              {authLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Iniciar Sesión"}
            </button>
            
            <div className="flex justify-between text-xs text-neutral-600 pt-2">
               <button onClick={onBack} className="hover:text-neutral-400 transition-colors">Volver</button>
               <button onClick={handleInitAdmin} className="hover:text-neutral-400 transition-colors">Setup</button>
            </div>
         </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Mobile Header - Ultra Minimal */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-xl z-50 border-b border-neutral-900">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Hamburger Menu */}
          <Sheet open={showMainMenu} onOpenChange={setShowMainMenu}>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2 hover:bg-neutral-900 rounded-lg transition-colors active:scale-95">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-black border-neutral-900 p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 py-4 border-b border-neutral-900">
                  <SheetTitle className="text-white text-sm font-medium">Menú</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto py-2">
                  {/* Primary Actions */}
                  <div className="px-3 space-y-1">
                    <button
                      onClick={() => {
                        handleNewEvent();
                        setShowMainMenu(false);
                      }}
                      disabled={saving || isSyncing}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                    >
                      <Plus className="w-4 h-4" />
                      Nuevo Evento
                    </button>

                    <button
                      onClick={() => {
                        handleSaveToSupabase();
                        setShowMainMenu(false);
                      }}
                      disabled={saving || isSyncing}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors disabled:opacity-50 text-left font-medium"
                    >
                      {saving || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Guardar
                    </button>
                  </div>

                  <div className="h-px bg-neutral-900 my-2" />

                  {/* Sync Options */}
                  <div className="px-3">
                    <p className="px-3 py-2 text-xs text-neutral-500 uppercase tracking-wider">Sincronizar</p>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handlePullFromSupabase();
                          setShowMainMenu(false);
                        }}
                        disabled={saving || isSyncing}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <Download className="w-4 h-4" />
                        Pull desde Supabase
                      </button>
                      <button
                        onClick={() => {
                          handleSyncToLocalFile();
                          setShowMainMenu(false);
                        }}
                        disabled={saving || isSyncing || events.length === 0}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <FileDown className="w-4 h-4" />
                        Backup Local
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-neutral-900 my-2" />

                  {/* AI Tools */}
                  <div className="px-3">
                    <p className="px-3 py-2 text-xs text-neutral-500 uppercase tracking-wider">Herramientas IA</p>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setBatchMode('fill');
                          setShowBatchModal(true);
                          setShowMainMenu(false);
                        }}
                        disabled={saving || isSyncing || events.length === 0}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <Wand2 className="w-4 h-4 text-purple-400" />
                        <div className="flex-1">
                          <div>Auto-Completar</div>
                          <div className="text-xs text-neutral-500">Rellena campos vacíos</div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setBatchMode('optimize');
                          setShowBatchModal(true);
                          setShowMainMenu(false);
                        }}
                        disabled={saving || isSyncing || events.length === 0}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <Zap className="w-4 h-4 text-pink-400" />
                        <div className="flex-1">
                          <div>Optimizar Todo</div>
                          <div className="text-xs text-neutral-500">SEO + Social</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-neutral-900 my-2" />

                  {/* More Options */}
                  <div className="px-3">
                    <p className="px-3 py-2 text-xs text-neutral-500 uppercase tracking-wider">Más Opciones</p>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setShowClaudeOptimizer(!showClaudeOptimizer);
                        }}
                        disabled={saving || isSyncing}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <div className="flex-1">
                          <div>Claude Optimizer</div>
                          <div className="text-xs text-neutral-500">Sin costos API, sin rate limits</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setShowMigrationModal(true);
                          setShowMainMenu(false);
                        }}
                        disabled={saving || isSyncing}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-900 rounded-lg transition-colors disabled:opacity-50 text-left"
                      >
                        <ImageIcon className="w-4 h-4 text-orange-400" />
                        <div className="flex-1">
                          <div>Migrar Assets</div>
                          <div className="text-xs text-neutral-500">A Supabase Storage</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-neutral-900 p-4">
                  <OpenAIStatusIndicator />
                  <button
                    onClick={handleLogout}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Title */}
          <h1 className="text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {currentEvent ? currentEvent.title || 'Nuevo Evento' : 'CMS'}
          </h1>

          {/* Right: Events List Button */}
          <button
            onClick={() => setShowEventsList(true)}
            className="p-2 -mr-2 hover:bg-neutral-900 rounded-lg transition-colors active:scale-95 flex items-center gap-2"
          >
            <span className="text-xs text-neutral-500">{events.length}</span>
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {isSyncing && (
          <div className="h-0.5 bg-neutral-900">
            <div 
              className="h-full bg-pink-600 transition-all duration-300"
              style={{ width: `${syncProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentEvent && selectedEventIndex !== null ? (
          <EventDetailMobile
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
            saveEvent={saveEvent}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Selecciona un evento</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-xs">
              Toca el icono de filtro para ver la lista de eventos
            </p>
            <button
              onClick={() => setShowEventsList(true)}
              className="px-6 py-2.5 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors active:scale-95"
            >
              Ver Eventos
            </button>
          </div>
        )}
      </div>

      {/* Events List Sheet - Full Screen Mobile */}
      <Sheet open={showEventsList} onOpenChange={setShowEventsList}>
        <SheetContent side="right" className="w-full bg-black border-none p-0 sm:max-w-md">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-neutral-900">
              <SheetHeader className="p-0 mb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-medium text-white">EVENTOS</SheetTitle>
                  <span className="text-sm text-neutral-500">{filteredEvents.length} total</span>
                </div>
              </SheetHeader>

              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full bg-neutral-900 border-none outline-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 rounded-lg"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-sm transition-colors">
                      <Filter className="w-4 h-4" />
                      Todas las marcas
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-black border-t border-neutral-900">
                    <SheetHeader className="mb-4">
                      <SheetTitle className="text-white">Filtrar por Marca</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => {
                            setFilterBrand(brand);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            filterBrand === brand 
                              ? 'bg-pink-600 text-white' 
                              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {brand === 'all' ? 'Todas las marcas' : brand}
                        </button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <button 
                  onClick={() => {
                    setFilterBrand('all');
                    setFilterCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-sm transition-colors"
                >
                  Limpiar
                </button>
              </div>

              <div className="text-xs text-neutral-600 mt-3">
                Mostrando {filteredEvents.length} de {events.length} eventos
              </div>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {filteredEvents.map((event, index) => {
                const actualIndex = events.findIndex(e => e.id === event.id);
                return (
                  <button
                    key={event.id}
                    onClick={() => {
                      setSelectedEventIndex(actualIndex);
                      setShowEventsList(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all active:scale-95 ${
                      selectedEventIndex === actualIndex
                        ? 'border-pink-600 bg-pink-600/10'
                        : 'border-neutral-900 bg-neutral-950 hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex gap-3">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-pink-400 font-medium mb-1">
                          {event.brand?.toUpperCase() || 'SIN MARCA'}
                        </div>
                        <h3 className="font-medium text-sm mb-1 line-clamp-1">
                          {event.title || 'Sin título'}
                        </h3>
                        <p className="text-xs text-neutral-500 line-clamp-2">
                          {event.description || 'Sin descripción'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-500 text-sm">No se encontraron eventos</p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Modals */}
      {showBatchModal && (
        <BatchProcessingModal
          events={events}
          mode={batchMode}
          onComplete={async () => {
            await handleSave();
            await loadData();
          }}
          onClose={() => setShowBatchModal(false)}
          onSaveEvent={(index, enrichedData) => {
            Object.entries(enrichedData).forEach(([field, value]) => {
              if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
                updateEvent(index, field, value as any);
              }
            });
          }}
        />
      )}

      {showMigrationModal && (
        <AssetMigrationModal
          onComplete={async () => {
            await loadData();
          }}
          onClose={() => setShowMigrationModal(false)}
        />
      )}

      {/* Claude Optimizer Sheet */}
      <Sheet open={showClaudeOptimizer} onOpenChange={setShowClaudeOptimizer}>
        <SheetContent side="bottom" className="bg-black border-t border-neutral-900 h-[90vh]">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Claude Optimizer
            </SheetTitle>
            <p className="text-sm text-neutral-500">
              {events.length} eventos actuales • Sin costos API • Sin rate limits
            </p>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-20">
            <ClaudeOptimizer events={events} onComplete={loadData} />
          </div>
        </SheetContent>
      </Sheet>

      {/* AI Console Modal */}
      <Sheet open={showAIConsole} onOpenChange={setShowAIConsole}>
        <SheetContent side="bottom" className="bg-black border-t border-neutral-900 h-[80vh]">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Consola de Optimización IA
            </SheetTitle>
            <p className="text-sm text-neutral-500">
              {currentOptimizingEvent || 'Evento'} • OpenAI GPT-4o
            </p>
          </SheetHeader>

          {/* Console Log */}
          <div className="bg-neutral-950 border border-neutral-900 rounded-lg h-full overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-900 bg-neutral-900/50">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ACTIVO
              </div>
              <button
                onClick={() => setAILogs([])}
                className="text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Limpiar
              </button>
            </div>

            {/* Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
              {aiLogs.length === 0 && (
                <div className="text-neutral-600 text-center py-8">
                  Esperando logs de optimización...
                </div>
              )}

              {aiLogs.map((log, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-neutral-600 flex-shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className={`flex-shrink-0 ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    log.type === 'debug' ? 'text-blue-400' :
                    'text-neutral-400'
                  }`}>
                    [{log.type.toUpperCase()}]
                  </span>
                  <span className="text-neutral-300">{log.message}</span>
                </div>
              ))}

              {isOptimizing && (
                <div className="flex gap-3 text-purple-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando con OpenAI...</span>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// --- Mobile Event Detail with Tabs ---
interface EventDetailMobileProps {
  event: WavEvent;
  eventIndex: number;
  validation: any;
  updateEvent: (index: number, field: string, value: any) => void;
  removeEvent: (index: number) => void;
  handleFileChange: (index: number, field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => Promise<void>;
  removeGalleryItem: (eventIndex: number, mediaId: string) => void;
  uploading: string | null;
  onClose: () => void;
  categories?: EventCategory[];
  saveEvent: (index: number) => Promise<void>; // Add save function prop
}

const EventDetailMobile: React.FC<EventDetailMobileProps> = ({
  event,
  eventIndex,
  validation,
  updateEvent,
  removeEvent,
  handleFileChange,
  removeGalleryItem,
  uploading,
  onClose,
  categories = [],
  saveEvent
}) => {
  const {
    isEnriching,
    enrichEvent,
    consoleLogs,
    isConsoleOpen,
    setIsConsoleOpen
  } = useEventEnricher();

  const [chatInput, setChatInput] = useState('');
  const [showMediaMenu, setShowMediaMenu] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userPrompt = chatInput.trim();
    setChatInput('');

    try {
      const result = await enrichEvent(event, userPrompt);
      
      if (result && typeof result === 'object') {
        // Map 'draft' to 'description' field
        if (result.draft) {
          updateEvent(eventIndex, 'description', result.draft);
        }
        
        // Update all other fields (except chat_response)
        Object.entries(result).forEach(([field, value]) => {
          if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
            updateEvent(eventIndex, field, value as any);
          }
        });
      }
    } catch (error) {
      console.error('Error enriching event:', error);
    }
  };

  const getValidationErrorText = () => {
    if (!validation || validation.isValid) return '';
    
    if (validation.errors instanceof Map) {
      const errors = Array.from(validation.errors.values());
      return errors.join(' • ');
    }
    
    if (validation.emptyFields && validation.emptyFields.length > 0) {
      return `Campos vacíos: ${validation.emptyFields.join(', ')}`;
    }
    
    return 'Campos incompletos';
  };

  const validationText = getValidationErrorText();

  const optimizeSingleEventWithAI = async (index: number) => {
    try {
      const result = await enrichEvent(event, 'optimize'); // Use 'optimize' mode
      
      if (result && typeof result === 'object') {
        // Map 'draft' to 'description' field
        if (result.draft) {
          updateEvent(index, 'description', result.draft);
        }
        
        // Update all other fields (except chat_response)
        Object.entries(result).forEach(([field, value]) => {
          if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
            updateEvent(index, field, value as any);
          }
        });
      }
    } catch (error: any) {
      console.error('Error optimizando evento:', error);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Fixed Tabs */}
      <Tabs defaultValue="basic" className="flex flex-col h-full">
        <div className="sticky top-0 bg-black z-40 border-b border-neutral-900">
          <TabsList className="w-full grid grid-cols-5 bg-neutral-900/50 p-0.5">
            <TabsTrigger value="basic" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black py-2.5">
              Básico
            </TabsTrigger>
            <TabsTrigger value="media" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black py-2.5">
              Media
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black py-2.5">
              SEO
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black py-2.5">
              Social
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black py-2.5">
              Datos
            </TabsTrigger>
          </TabsList>

          {/* Action Bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-t border-neutral-900">
            {/* Validation Error - Truncated with hover */}
            {validationText && (
              <div 
                className="flex-1 min-w-0 group relative"
                title={validationText}
              >
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{validationText}</span>
                </div>
                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 p-2 bg-red-900 text-red-100 text-xs rounded shadow-lg max-w-xs z-50 whitespace-normal">
                  {validationText}
                </div>
              </div>
            )}
            
            {!validationText && (
              <div className="flex-1" />
            )}

            {/* Optimize Button - Square Icon Only */}
            <button
              onClick={() => {
                // Open AI Console (managed by hook)
                setIsConsoleOpen(true);
                optimizeSingleEventWithAI(eventIndex);
              }}
              disabled={isEnriching}
              className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 active:scale-95"
              title="Optimizar con IA"
            >
              {isEnriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            </button>

            {/* Save Button */}
            <button
              onClick={async () => {
                try {
                  await saveEvent(eventIndex);
                  toast.success('✓ Evento guardado en Supabase');
                } catch (error: any) {
                  toast.error(`Error al guardar: ${error.message}`);
                }
              }}
              className="w-8 h-8 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 transition-colors active:scale-95"
              title="Guardar en Supabase"
            >
              <Save className="w-4 h-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                if (confirm('¿Eliminar este evento?')) {
                  removeEvent(eventIndex);
                  onClose();
                }
              }}
              className="w-8 h-8 flex items-center justify-center bg-red-900/20 hover:bg-red-900/30 text-red-400 transition-colors active:scale-95"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* AI Chat - Simplified */}
          <div className="px-4 py-4 bg-gradient-to-b from-purple-900/5 to-transparent border-b border-neutral-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isEnriching && handleSendMessage()}
                placeholder="Ej: Mejora el título SEO"
                disabled={isEnriching}
                className="flex-1 bg-transparent border-b border-neutral-800 px-0 py-2 text-sm text-white placeholder-neutral-600 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isEnriching || !chatInput.trim()}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-medium transition-all disabled:opacity-50 active:scale-95"
              >
                {isEnriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              </button>
            </div>
          </div>

      {/* Tabs Content */}
      <div className="px-4">
        {/* Tab: Básico */}
        <TabsContent value="basic" className="space-y-4 pb-8">
          <FormField
            label="Marca"
            value={event.brand || ''}
            onChange={(value) => updateEvent(eventIndex, 'brand', value)}
            placeholder="Nombre de la marca"
            tooltip={FIELD_TOOLTIPS.brand}
            validation={validation}
            fieldName="brand"
          />
          <FormField
            label="Cliente"
            value={event.client || ''}
            onChange={(value) => updateEvent(eventIndex, 'client', value)}
            placeholder="Cliente"
          />
          <FormField
            label="Título"
            value={event.title || ''}
            onChange={(value) => updateEvent(eventIndex, 'title', value)}
            placeholder="Título del evento"
            validation={validation}
            fieldName="title"
          />
          <FormField
            label="Categoría"
            value={event.category || ''}
            onChange={(value) => updateEvent(eventIndex, 'category', value)}
            placeholder="Categoría"
            type="select"
            options={categories.map(cat => ({ value: cat.slug, label: cat.name }))}
          />
          <FormField
            label="Descripción"
            value={event.description || ''}
            onChange={(value) => updateEvent(eventIndex, 'description', value)}
            placeholder="Descripción"
            multiline
            rows={4}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Año"
              value={event.year || ''}
              onChange={(value) => updateEvent(eventIndex, 'year', value)}
              placeholder="2024"
            />
            <FormField
              label="Mes"
              value={event.month || ''}
              onChange={(value) => updateEvent(eventIndex, 'month', value)}
              placeholder="Diciembre"
            />
          </div>
          <FormField
            label="Ciudad"
            value={event.city || ''}
            onChange={(value) => updateEvent(eventIndex, 'city', value)}
            placeholder="Santiago"
          />
          <FormField
            label="Venue"
            value={event.venue || ''}
            onChange={(value) => updateEvent(eventIndex, 'venue', value)}
            placeholder="Lugar del evento"
          />
        </TabsContent>

        {/* Tab: Media */}
        <TabsContent value="media" className="space-y-4 pb-8">
          {/* Media Menu Button */}
          <Sheet open={showMediaMenu} onOpenChange={setShowMediaMenu}>
            <SheetTrigger asChild>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-medium hover:bg-neutral-200 transition-colors active:scale-95">
                <Menu className="w-4 h-4" />
                Opciones de Media
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-black border-t border-neutral-900">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-white">Media</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                <label className="flex items-center gap-3 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer active:scale-95">
                  <ImageIcon className="w-5 h-5" />
                  <span>Subir Cover</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) { handleFileChange(eventIndex, 'image', file); setShowMediaMenu(false); } }} />
                </label>
                <label className="flex items-center gap-3 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer active:scale-95">
                  <ImageIcon className="w-5 h-5" />
                  <span>Subir Logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) { handleFileChange(eventIndex, 'logo', file); setShowMediaMenu(false); } }} />
                </label>
                <label className="flex items-center gap-3 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer active:scale-95">
                  <ImageIcon className="w-5 h-5" />
                  <span>+ Fotos a Galería</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files) { Array.from(e.target.files).forEach(file => { handleFileChange(eventIndex, 'gallery', file); }); setShowMediaMenu(false); } }} />
                </label>
                <label className="flex items-center gap-3 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-lg cursor-pointer active:scale-95">
                  <Film className="w-5 h-5" />
                  <span>+ Video a Galería</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) { handleFileChange(eventIndex, 'gallery', file); setShowMediaMenu(false); } }} />
                </label>
              </div>
            </SheetContent>
          </Sheet>

          {/* Media Previews */}
          <div className="space-y-3">
            <MediaPreviewMobile label="Cover" src={event.image} />
            <MediaPreviewMobile label="Logo" src={event.logo} />
          </div>

          {/* OpenGraph Share Link with Visual Preview */}
          {event.slug && (
            <OpenGraphPreview 
              event={event}
              ogLink={`https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/og/${event.slug}`}
            />
          )}

          {/* Gallery */}
          <div>
            <p className="text-xs text-neutral-500 mb-2">Galería ({event.gallery?.length || 0})</p>
            <div className="grid grid-cols-3 gap-2">
              {event.gallery && event.gallery.map((item) => (
                <div key={item.id} className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden group">
                  {item.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-6 h-6 text-neutral-600" />
                      <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    </div>
                  ) : (
                    <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                  )}
                  <button
                    onClick={() => removeGalleryItem(eventIndex, item.id)}
                    className="absolute top-1 right-1 p-1.5 bg-red-600 rounded-full text-white opacity-0 group-active:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {(!event.gallery || event.gallery.length === 0) && (
                <div className="col-span-3 py-8 text-center text-neutral-600 text-xs border border-dashed border-neutral-800 rounded-lg">
                  Sin items
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab: SEO */}
        <TabsContent value="seo" className="space-y-4 pb-8">
          <FormField
            label="SEO Title"
            value={event.seo_title || ''}
            onChange={(value) => updateEvent(eventIndex, 'seo_title', value)}
            placeholder="Max 60 chars"
            maxLength={60}
            charCount={getCharCount(event.seo_title)}
          />
          <FormField
            label="SEO Description"
            value={event.seo_description || event.meta_description || ''}
            onChange={(value) => {
              updateEvent(eventIndex, 'seo_description', value);
              updateEvent(eventIndex, 'meta_description', value);
            }}
            placeholder="Max 155 chars"
            multiline
            rows={3}
            maxLength={155}
            charCount={getCharCount(event.seo_description || event.meta_description)}
          />
          <FormField
            label="Keywords"
            value={Array.isArray(event.keywords) ? event.keywords.join(', ') : (event.keywords || '')}
            onChange={(value) => updateEvent(eventIndex, 'keywords', value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="kw1, kw2, kw3"
          />
          <FormField
            label="Summary"
            value={event.summary || ''}
            onChange={(value) => updateEvent(eventIndex, 'summary', value)}
            placeholder="Resumen ejecutivo"
            multiline
            rows={3}
          />
        </TabsContent>

        {/* Tab: Social */}
        <TabsContent value="social" className="space-y-4 pb-8">
          <div className="space-y-3">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Instagram</p>
            <FormField
              label="Hook"
              value={event.instagram_hook || ''}
              onChange={(value) => updateEvent(eventIndex, 'instagram_hook', value)}
              placeholder="Primera frase impactante"
            />
            <FormField
              label="Body"
              value={event.instagram_body || event.instagram_caption || ''}
              onChange={(value) => {
                 updateEvent(eventIndex, 'instagram_body', value);
                 if(!event.instagram_caption) updateEvent(eventIndex, 'instagram_caption', value);
              }}
              placeholder="Contenido principal"
              multiline
              rows={4}
            />
            <FormField
              label="Hashtags"
              value={event.instagram_hashtags || ''}
              onChange={(value) => updateEvent(eventIndex, 'instagram_hashtags', value)}
              placeholder="#Brand #Event"
            />
          </div>

          <div className="h-px bg-neutral-900 my-4" />

          <div className="space-y-3">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">LinkedIn</p>
            <FormField
              label="Post"
              value={event.linkedin_post || ''}
              onChange={(value) => updateEvent(eventIndex, 'linkedin_post', value)}
              placeholder="Update profesional"
              multiline
              rows={3}
            />
          </div>
        </TabsContent>

        {/* Tab: Metrics */}
        <TabsContent value="metrics" className="space-y-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Alcance"
              value={event.people_reached || ''}
              onChange={(value) => updateEvent(eventIndex, 'people_reached', value)}
              placeholder="150,000"
            />
            <FormField
              label="Asistentes"
              value={event.attendees || ''}
              onChange={(value) => updateEvent(eventIndex, 'attendees', value)}
              placeholder="5,000"
            />
            <FormField
              label="Días"
              value={event.days || ''}
              onChange={(value) => updateEvent(eventIndex, 'days', value)}
              placeholder="3"
            />
            <FormField
              label="Ciudades"
              value={event.cities || ''}
              onChange={(value) => updateEvent(eventIndex, 'cities', value)}
              placeholder="1"
            />
          </div>
          <FormField
            label="KPIs"
            value={Array.isArray(event.kpis) ? event.kpis.join('\n') : (event.kpis || '')}
            onChange={(value) => updateEvent(eventIndex, 'kpis', value.split('\n').filter(line => line.trim() !== ''))}
            placeholder="Un KPI por línea"
            multiline
            rows={4}
          />
        </TabsContent>
        </div>
        </div>
      </Tabs>

      {/* AI Console Modal - Inside EventDetailMobile */}
      <Sheet open={isConsoleOpen} onOpenChange={setIsConsoleOpen}>
        <SheetContent side="bottom" className="bg-black border-t border-neutral-900 h-[80vh]">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Consola de Optimización IA
            </SheetTitle>
            <p className="text-sm text-neutral-500">
              {event.title || event.brand || 'Evento'} • OpenAI GPT-4o Vision
            </p>
          </SheetHeader>

          {/* Console Log */}
          <div className="bg-neutral-950 border border-neutral-900 rounded-lg h-full overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-900 bg-neutral-900/50">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <div className={`w-2 h-2 rounded-full ${isEnriching ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                {isEnriching ? 'ACTIVO' : 'INACTIVO'}
              </div>
            </div>

            {/* Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs">
              {consoleLogs.length === 0 && (
                <div className="text-neutral-600 text-center py-8">
                  Esperando logs de optimización...
                </div>
              )}

              {consoleLogs.map((log, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-neutral-600 flex-shrink-0">
                    {log.timestamp}
                  </span>
                  <span className={`flex-shrink-0 ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    log.type === 'loading' ? 'text-blue-400' :
                    'text-neutral-400'
                  }`}>
                    {log.icon || `[${log.type.toUpperCase()}]`}
                  </span>
                  <span className="text-neutral-300 whitespace-pre-wrap">{log.message}</span>
                </div>
              ))}

              {isEnriching && (
                <div className="flex gap-3 text-purple-400 mt-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando con OpenAI Vision API...</span>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Helper Component
const MediaPreviewMobile: React.FC<{ label: string; src?: string }> = ({ label, src }) => (
  <div className="space-y-2">
    <p className="text-xs text-neutral-500">{label}</p>
    {src ? (
      <div className="relative aspect-video rounded-lg border border-neutral-900 overflow-hidden">
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div className="aspect-video bg-neutral-950 rounded-lg border border-dashed border-neutral-900 flex items-center justify-center text-neutral-600 text-xs">
        Sin imagen
      </div>
    )}
  </div>
);