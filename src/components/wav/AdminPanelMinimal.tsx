import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Plus, Save, Download, Sparkles, LogOut, 
  Loader2, ChevronDown, ChevronUp, Trash2, Upload, AlertCircle,
  Image as ImageIcon, Film, Wand2, ClipboardCheck, ArrowLeft, Globe
} from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { publicAnonKey, projectId } from '../../utils/supabase/info';
import { useAdminEvents } from '../../src/hooks/useAdminEvents';
import { useEventValidation } from '../../src/hooks/useEventValidation';
import { OpenAIStatusIndicator } from './OpenAIStatusIndicator';
import { ClaudeOptimizer } from './ClaudeOptimizer';
import { FormField } from './FormField';
import { Progress } from '../ui/progress';
import { WavEvent } from '../../types';
import { EventCategory } from '../../utils/contentRules';
import { FIELD_TOOLTIPS, getCharCount } from '../../utils/validation';
import { generateXMLSitemap, generateJSONSitemap, downloadFile } from '../../utils/sitemapGenerator';

interface AdminPanelMinimalProps {
  onBack: () => void;
  categories?: EventCategory[];
}

export const AdminPanelMinimal = ({ onBack, categories = [] }: AdminPanelMinimalProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@wearevision.cl");
  const [passwordInput, setPasswordInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

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
    handleOptimizeAll,
    optimizeSingleEvent
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
      alert("Error de autenticación: " + error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('¿Cerrar sesión?')) {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    }
  };

  const handleNewEvent = () => {
    addEvent();
    setMenuOpen(false);
  };

  const handleSaveToSupabase = async () => {
    setMenuOpen(false);
    await handleSave();
  };

  const handlePullFromSupabase = async () => {
    setMenuOpen(false);
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      setSyncProgress(50);
      await loadData();
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

  const handleMassIngest = async () => {
    if (!confirm(
      `⚠️ INGESTA MASIVA DE IA\n\n` +
      `Procesará TODOS los eventos incompletos con OpenAI.\n` +
      `Batch Size: 5 eventos por ciclo\n` +
      `Esta operación puede tardar varios minutos.\n` +
      `La IA generará textos SEO, técnicos y editoriales.\n\n` +
      `¿Comenzar Ingesta?`
    )) {
      return;
    }
    
    setMenuOpen(false);
    setIsSyncing(true);
    setSyncProgress(0);

    try {
      console.log('[Mass Ingest] Starting ingestion...');
      let processedTotal = 0;
      let errorsTotal = 0;
      
      while (true) {
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/optimize-batch`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({ batchSize: 5 })
          }
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        
        const result = await res.json();
        console.log('[Mass Ingest] Batch result:', result);
        
        processedTotal += result.processed;
        errorsTotal += result.errors;
        
        // Update progress visual (approximate)
        if (result.totalEvents > 0) {
           const percent = Math.round(((result.totalEvents - result.remaining) / result.totalEvents) * 100);
           setSyncProgress(percent);
        }

        if (result.remaining === 0 || result.processed === 0) {
           console.log('[Mass Ingest] Complete!');
           break;
        }
        
        // Short delay
        await new Promise(r => setTimeout(r, 1000));
      }

      setSyncProgress(100);
      setTimeout(() => {
        setIsSyncing(false);
        setSyncProgress(0);
      }, 500);

      await loadData();
      
      alert(
        `✅ INGESTA COMPLETADA\n\n` +
        `Eventos procesados: ${processedTotal}\n` +
        `Errores: ${errorsTotal}`
      );
    } catch (error: any) {
      console.error('[Mass Ingest] Error:', error);
      alert(`Error en Ingesta: ${error.message}`);
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const handleDownloadEventsTs = () => {
    const content = `import { WavEvent } from '../types';\n\nexport const events: WavEvent[] = ${JSON.stringify(events, null, 2)};`;
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.ts';
    a.click();
    URL.revokeObjectURL(url);
    alert("Archivo 'events.ts' descargado.\n\nReemplaza tu archivo '/data/events.ts' local con este archivo.");
  };

  const handleExportEvents = () => {
    setMenuOpen(false);
    const jsonStr = JSON.stringify(events, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wav-events-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateXMLSitemap = () => {
    setMenuOpen(false);
    const xmlContent = generateXMLSitemap(events);
    downloadFile(xmlContent, 'wav-events-sitemap.xml', 'text/xml');
  };

  const handleGenerateJSONSitemap = () => {
    setMenuOpen(false);
    const jsonContent = generateJSONSitemap(events);
    downloadFile(jsonContent, 'wav-events-sitemap.json', 'application/json');
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-white/10 bg-black/60 backdrop-blur-xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl mb-2">WAV BTL <span className="text-xs align-top text-purple-500">v2.1</span></h1>
            <p className="text-white/40 text-sm">Admin Panel — CMS</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF00A8]"
            />
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF00A8]"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-[#FF00A8] to-[#9B00FF] text-white py-3 font-medium hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {authLoading ? 'Autenticando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col h-screen overflow-hidden">
      {/* Header Minimalista con Menú Hamburguesa */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white/5 transition-colors relative"
            aria-label="Menu"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 top-2' : ''}`} />
              <span className={`absolute top-2 left-0 w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute top-4 left-0 w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 top-2' : ''}`} />
            </div>
          </button>

          {/* Logo/Title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <h1 className="text-sm font-mono tracking-[0.3em] uppercase">WAV CMS <span className="text-[9px] text-purple-400 tracking-normal">v2.1</span></h1>
            <span className="text-[10px] text-white/30 font-mono">
              {events.length}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && <Loader2 size={14} className="animate-spin text-white/40" />}
            {saveStatus === 'success' && <div className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />}
            {saveStatus === 'error' && <div className="w-2 h-2 rounded-full bg-[#FF00A8] shadow-[0_0_8px_#FF00A8]" />}
          </div>
        </div>

        {/* Progress Bar */}
        {isSyncing && (
          <div className="h-0.5 bg-gradient-to-r from-[#9B00FF] via-[#FF00A8] to-[#9B00FF] bg-[length:200%_100%] animate-[gradient_2s_ease_infinite]" 
               style={{ width: `${syncProgress}%`, transition: 'width 0.3s ease' }} 
          />
        )}
      </header>

      {/* Slide-in Menu */}
      <div className={`
        fixed left-0 top-[57px] bottom-0 w-72 bg-black/98 backdrop-blur-xl border-r border-white/10 z-40 
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full overflow-y-auto">
          {/* OpenAI Status */}
          <div className="p-4 border-b border-white/10">
            <OpenAIStatusIndicator />
          </div>

          {/* Actions */}
          <div className="p-2 space-y-1">
            <MenuButton
              icon={<Plus size={16} />}
              label="Nuevo Evento"
              onClick={handleNewEvent}
              disabled={saving || isSyncing}
            />
            <MenuButton
              icon={<Save size={16} />}
              label="Guardar en Supabase"
              onClick={handleSaveToSupabase}
              disabled={saving || isSyncing}
              variant="primary"
            />
            <MenuButton
              icon={<Download size={16} />}
              label="Sincronizar Todo (Pull)"
              onClick={handlePullFromSupabase}
              disabled={saving || isSyncing}
              variant="primary"
            />
            
            <MenuButton
              icon={<Download size={16} />}
              label="Descargar events.ts"
              onClick={handleDownloadEventsTs}
            />
            <MenuButton
              icon={<Download size={16} />}
              label="Exportar Eventos"
              onClick={handleExportEvents}
            />
            <MenuButton
              icon={<Globe size={16} />}
              label="Descargar Sitemap XML"
              onClick={handleGenerateXMLSitemap}
              variant="default"
            />
            <MenuButton
              icon={<Globe size={16} />}
              label="Descargar Sitemap JSON"
              onClick={handleGenerateJSONSitemap}
              variant="default"
            />
            
            <div className="border-t border-white/10 my-3" />

            <MenuButton
              icon={<ArrowLeft size={16} />}
              label="Volver al Sitio"
              onClick={onBack}
            />
            
            <MenuButton
              icon={<LogOut size={16} />}
              label="Cerrar Sesión"
              onClick={handleLogout}
              variant="danger"
            />
          </div>

          {/* Claude Optimizer in Menu */}
          <div className="p-4 border-t border-white/10">
            <ClaudeOptimizer 
              events={events} 
              onComplete={() => {
                loadData();
                setMenuOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content: Grid de Eventos (Tiles) */}
      <main className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-white/40" size={32} />
          </div>
        ) : events.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-white/40 mb-4">No hay eventos</p>
              <button
                onClick={handleNewEvent}
                className="px-6 py-3 bg-gradient-to-r from-[#FF00A8] to-[#9B00FF] text-white text-sm font-medium hover:opacity-90"
              >
                Crear Primer Evento
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {events.map((event, index) => (
              <EventBarComplete
                key={event.id}
                event={event}
                eventIndex={index}
                isExpanded={expandedEventId === event.id}
                onToggle={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                onDelete={() => {
                  if (confirm(`¿Eliminar "${event.title}"?`)) {
                    removeEvent(event.id);
                  }
                }}
                onUpdate={(field, value) => updateEvent(index, field, value)}
                hasErrors={validationMap[event.id]?.errors?.length > 0}
                uploading={uploading}
                handleFileChange={(field, file) => handleFileChange(event.id, field, file)}
                removeGalleryItem={(itemId) => removeGalleryItem(event.id, itemId)}
                categories={categories}
                onOptimize={optimizeSingleEvent}
                onSaveAll={handleSave}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Menu Button Component
function MenuButton({ 
  icon, 
  label, 
  onClick, 
  disabled = false, 
  variant = 'default' 
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'gradient' | 'danger';
}) {
  const baseClass = "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed";
  
  const variantClass = {
    default: "hover:bg-white/5 text-white/80 hover:text-white",
    primary: "bg-[#FF00A8]/10 border-l-2 border-[#FF00A8] text-white hover:bg-[#FF00A8]/20",
    gradient: "bg-gradient-to-r from-[#9B00FF]/10 to-[#FF00A8]/10 border-l-2 border-[#FF00A8] text-white hover:from-[#9B00FF]/20 hover:to-[#FF00A8]/20",
    danger: "hover:bg-red-500/10 text-red-400 hover:text-red-300"
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass}`}
    >
      {disabled && variant !== 'default' ? <Loader2 size={16} className="animate-spin" /> : icon}
      <span className="font-mono tracking-wider text-xs uppercase">{label}</span>
    </button>
  );
}

// Event Bar Component with ALL FIELDS
function EventBarComplete({ 
  event, 
  eventIndex,
  isExpanded,
  onToggle,
  onDelete,
  onUpdate,
  hasErrors,
  uploading,
  handleFileChange,
  removeGalleryItem,
  categories,
  onOptimize,
  onSaveAll
}: {
  event: WavEvent;
  eventIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (field: string, value: any) => void;
  hasErrors: boolean;
  uploading: string | null;
  handleFileChange: (field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => void;
  removeGalleryItem: (itemId: string) => void;
  categories: EventCategory[];
  onOptimize: (eventId: string) => Promise<any>;
  onSaveAll: () => Promise<void>;
}) {
  const [openSection, setOpenSection] = useState<string | null>('basic');
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!confirm('¿Generar contenidos con IA? Esto sobrescribirá los campos actuales si la IA lo considera mejor.')) return;
    
    setOptimizing(true);
    try {
      const res = await onOptimize(event.id);
      if (res.success) {
        // The hook relies on loadData usually, but optimizeSingleEvent updates backend KV.
        // We should ideally refresh data or optimistic update.
        // Since useAdminEvents doesn't expose "reload", and optimizeSingleEvent updates DB,
        // we might need to trigger a reload.
        // HOWEVER, AdminPanelMinimal calls loadData internally after optimizeAll.
        // We can't easily trigger reload from here.
        // BUT, `onUpdate` is for local state.
        // optimizeSingleEvent returns { event: ... } which is the new event.
        // We can use onUpdate for each field!
        
        if (res.event) {
           const newEv = res.event;
           Object.keys(newEv).forEach(key => {
             onUpdate(key, newEv[key]);
           });
           alert('Optimización completada.');
        }
      } else {
        alert('Error: ' + res.error);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="border border-white/10 bg-white/5 overflow-hidden transition-all">
      {/* Header Bar */}
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Thumbnail */}
          {event.image && (
            <div className="w-12 h-8 flex-shrink-0 overflow-hidden bg-black border border-white/10">
              <img 
                src={event.image} 
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-[#FF00A8] font-mono uppercase tracking-widest mb-0.5">
              {event.brand || 'No Brand'}
            </div>
            <div className="text-sm truncate">
              {event.title}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
            <span>{event.category}</span>
            <span>•</span>
            <span>{event.year}</span>
          </div>

          {/* Error Badge */}
          {hasErrors && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/30">
              <AlertCircle size={12} className="text-red-400" />
              <span className="text-[10px] text-red-400 font-mono">!</span>
            </div>
          )}

          {/* Expand Icon */}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded Content with ALL FIELDS */}
      {isExpanded && (
        <div className="border-t border-white/10 bg-black/40">
          {/* Quick Actions */}
          <div className="p-4 border-b border-white/10 flex gap-2 flex-wrap items-center">
            {/* 1. Generate / Optimize Button */}
            <button
              onClick={handleOptimize}
              disabled={optimizing}
              className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs hover:bg-purple-500/20 transition-colors flex items-center gap-2"
              title="Generar contenidos faltantes con IA"
            >
              {optimizing ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
              Generar Contenidos
            </button>

            {/* 2. Audit Button (Same logic for now, can be split if needed) */}
            <button
              onClick={handleOptimize}
              disabled={optimizing}
              className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors flex items-center gap-2"
              title="Auditar y mejorar textos existentes"
            >
               <ClipboardCheck size={12} />
               Auditar y Mejorar
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* 3. Save Button */}
             <button
              onClick={onSaveAll}
              className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs hover:bg-green-500/20 transition-colors flex items-center gap-2"
              title="Guardar cambios en Supabase"
            >
              <Save size={12} />
              Guardar
            </button>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <button
              onClick={onDelete}
              className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs hover:bg-red-500/20 transition-colors flex items-center gap-2"
            >
              <Trash2 size={12} />
              Eliminar
            </button>
          </div>

          {/* Collapsible Sections */}
          <div className="divide-y divide-white/5">
            {/* 1. INFORMACIÓN BÁSICA */}
            <CollapsibleSection
              title="Información Básica"
              isOpen={true}
              onToggle={() => {}}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  label="Marca"
                  value={event.brand || ''}
                  onChange={(value) => onUpdate('brand', value)}
                  tooltip={FIELD_TOOLTIPS.brand}
                  required
                  maxLength={50}
                  charCount={getCharCount(event.brand)}
                />
                <FormField
                  label="Año"
                  value={event.year?.toString() || ''}
                  onChange={(value) => onUpdate('year', parseInt(value) || 2025)}
                />
              </div>
              <FormField
                label="Título"
                value={event.title || ''}
                onChange={(value) => onUpdate('title', value)}
                tooltip={FIELD_TOOLTIPS.title}
                required
                maxLength={100}
                charCount={getCharCount(event.title)}
              />
              <FormField
                label="Descripción"
                value={event.description || ''}
                onChange={(value) => onUpdate('description', value)}
                tooltip={FIELD_TOOLTIPS.description}
                required
                multiline
                rows={4}
                maxLength={1000}
                charCount={getCharCount(event.description)}
              />
              <div className="space-y-2">
                <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
                  Categoría
                </label>
                <select
                  value={event.category || ''}
                  onChange={(e) => onUpdate('category', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF00A8] transition-colors"
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
                onChange={(value) => onUpdate('summary', value)}
                multiline
                rows={3}
                maxLength={160}
                charCount={getCharCount(event.summary)}
              />
            </CollapsibleSection>

            {/* 2. IDENTIFICACIÓN & LOCALIZACIÓN */}
            <CollapsibleSection
              title="Identificación & Localización"
              isOpen={true}
              onToggle={() => {}}
            >
              <FormField
                label="Cliente"
                value={event.client || ''}
                onChange={(value) => onUpdate('client', value)}
                tooltip={FIELD_TOOLTIPS.client}
              />
              <FormField
                label="Subcategoría"
                value={event.subcategory || ''}
                onChange={(value) => onUpdate('subcategory', value)}
                tooltip={FIELD_TOOLTIPS.subcategory}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
                    Mes
                  </label>
                  <select
                    value={event.month || ''}
                    onChange={(e) => onUpdate('month', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF00A8]"
                  >
                    <option value="">Mes</option>
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, i) => (
                      <option key={i} value={i + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                <FormField
                  label="País"
                  value={event.country || ''}
                  onChange={(value) => onUpdate('country', value)}
                  tooltip={FIELD_TOOLTIPS.country}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Ciudad"
                  value={event.city || ''}
                  onChange={(value) => onUpdate('city', value)}
                  tooltip={FIELD_TOOLTIPS.city}
                />
                <FormField
                  label="Venue / Recinto"
                  value={event.venue || ''}
                  onChange={(value) => onUpdate('venue', value)}
                  tooltip={FIELD_TOOLTIPS.venue}
                />
              </div>
            </CollapsibleSection>

            {/* 3. MULTIMEDIA */}
            <CollapsibleSection
              title="Multimedia"
              isOpen={true}
              onToggle={() => {}}
            >
              {/* Imagen Principal */}
              <div className="space-y-2">
                <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
                  Imagen Principal
                </label>
                {event.image && (
                  <img src={event.image} alt="" className="w-full h-32 object-cover border border-white/10" />
                )}
                <label className="block w-full px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-xs text-center transition-colors">
                  <ImageIcon size={14} className="inline mr-1" />
                  Subir Imagen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange('image', file);
                    }}
                    className="hidden"
                    disabled={!!uploading}
                  />
                </label>
              </div>

              {/* Logo */}
              <div className="space-y-2">
                <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
                  Logo de Marca
                </label>
                {event.logo && (
                  <img src={event.logo} alt="" className="h-12 object-contain bg-white/5 p-2 border border-white/10" />
                )}
                <label className="block w-full px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-xs text-center transition-colors">
                  <Upload size={14} className="inline mr-1" />
                  Subir Logo
                  <input
                    type="file"
                    accept="image/png,image/svg+xml"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange('logo', file);
                    }}
                    className="hidden"
                    disabled={!!uploading}
                  />
                </label>
              </div>

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
                    Galería ({event.gallery.length})
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {event.gallery.map((item) => (
                      <div key={item.id} className="relative">
                        <div className="w-full h-20 bg-black border border-white/10 overflow-hidden">
                          {item.type === 'video' ? (
                            <video src={item.url} className="w-full h-full object-cover" />
                          ) : (
                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <button
                          onClick={() => removeGalleryItem(item.id)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 flex items-center justify-center text-white hover:bg-red-600"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <label className="block w-full px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-xs text-center transition-colors">
                <Film size={14} className="inline mr-1" />
                Agregar a Galería
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange('gallery', file);
                  }}
                  className="hidden"
                  disabled={!!uploading}
                />
              </label>
            </CollapsibleSection>

            {/* 4. CONTENIDO EDITORIAL */}
            <CollapsibleSection
              title="Contenido Editorial"
              isOpen={true}
              onToggle={() => {}}
            >
              <FormField
                label="Tono de Comunicación"
                value={event.tone || ''}
                onChange={(value) => onUpdate('tone', value)}
                tooltip={FIELD_TOOLTIPS.tone}
              />
              <FormField
                label="Audiencia / Target"
                value={event.audience || ''}
                onChange={(value) => onUpdate('audience', value)}
                tooltip={FIELD_TOOLTIPS.audience}
              />
              <ArrayField
                label="Highlights (puntos clave)"
                values={event.highlights || []}
                onChange={(values) => onUpdate('highlights', values)}
                placeholder="Highlight"
              />
            </CollapsibleSection>

            {/* 5. SEO & METADATA */}
            <CollapsibleSection
              title="SEO & Metadata"
              isOpen={true}
              onToggle={() => {}}
            >
              <FormField
                label="Título SEO"
                value={event.seo_title || ''}
                onChange={(value) => onUpdate('seo_title', value)}
                tooltip={FIELD_TOOLTIPS.seo_title}
                maxLength={60}
                charCount={getCharCount(event.seo_title)}
              />
              <FormField
                label="Descripción SEO"
                value={event.seo_description || ''}
                onChange={(value) => onUpdate('seo_description', value)}
                tooltip={FIELD_TOOLTIPS.seo_description}
                multiline
                rows={3}
                maxLength={155}
                charCount={getCharCount(event.seo_description)}
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
                onChange={(value) => onUpdate('keywords', value.split(',').map(s => s.trim()).filter(Boolean))}
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
                onChange={(value) => onUpdate('tags', value.split(',').map(s => s.trim()).filter(Boolean))}
                tooltip={FIELD_TOOLTIPS.tags}
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
                onChange={(value) => onUpdate('hashtags', value.split(/[\s,]+/).filter(Boolean))}
              />
            </CollapsibleSection>

            {/* 6. PERFORMANCE & RESULTADOS */}
            <CollapsibleSection
              title="Performance & Resultados"
              isOpen={true}
              onToggle={() => {}}
            >
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Personas Alcanzadas"
                  value={event.people_reached || ''}
                  onChange={(value) => onUpdate('people_reached', value)}
                  tooltip={FIELD_TOOLTIPS.people_reached}
                />
                <FormField
                  label="Asistentes"
                  value={event.attendees || ''}
                  onChange={(value) => onUpdate('attendees', value)}
                  tooltip={FIELD_TOOLTIPS.attendees}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <FormField
                  label="Días"
                  value={event.days?.toString() || ''}
                  onChange={(value) => onUpdate('days', value ? parseInt(value) : undefined)}
                />
                <FormField
                  label="Ciudades"
                  value={event.cities?.toString() || ''}
                  onChange={(value) => onUpdate('cities', value ? parseInt(value) : undefined)}
                />
                <FormField
                  label="Pantallas"
                  value={event.screens?.toString() || ''}
                  onChange={(value) => onUpdate('screens', value ? parseInt(value) : undefined)}
                />
              </div>
              <ArrayField
                label="KPIs (Indicadores clave)"
                values={event.kpis || []}
                onChange={(values) => onUpdate('kpis', values)}
                placeholder="KPI: ej. +35% engagement"
              />
              <FormField
                label="Notas de Resultados"
                value={event.results_notes || ''}
                onChange={(value) => onUpdate('results_notes', value)}
                multiline
                rows={3}
              />
            </CollapsibleSection>

            {/* 7. SOCIAL MEDIA */}
            <CollapsibleSection
              title="Social Media"
              isOpen={true}
              onToggle={() => {}}
            >
              <FormField
                label="Instagram Hook"
                value={event.instagram_hook || ''}
                onChange={(value) => onUpdate('instagram_hook', value)}
                multiline
                rows={2}
              />
              <FormField
                label="Instagram Body"
                value={event.instagram_body || ''}
                onChange={(value) => onUpdate('instagram_body', value)}
                multiline
                rows={4}
              />
              <FormField
                label="Instagram Closing"
                value={event.instagram_closing || ''}
                onChange={(value) => onUpdate('instagram_closing', value)}
                multiline
                rows={2}
              />
              <FormField
                label="Instagram Hashtags"
                value={event.instagram_hashtags || ''}
                onChange={(value) => onUpdate('instagram_hashtags', value)}
              />
              <FormField
                label="Alt Instagram Copy"
                value={event.alt_instagram || ''}
                onChange={(value) => onUpdate('alt_instagram', value)}
                multiline
                rows={3}
              />
              <FormField
                label="LinkedIn Post"
                value={event.linkedin_post || ''}
                onChange={(value) => onUpdate('linkedin_post', value)}
                multiline
                rows={4}
              />
              <FormField
                label="LinkedIn Artículo"
                value={event.linkedin_article || ''}
                onChange={(value) => onUpdate('linkedin_article', value)}
                multiline
                rows={6}
              />
            </CollapsibleSection>

            {/* 8. A/B TESTING */}
            <CollapsibleSection
              title="A/B Testing"
              isOpen={true}
              onToggle={() => {}}
            >
              <FormField
                label="Título Alternativo #1"
                value={event.alt_title_1 || ''}
                onChange={(value) => onUpdate('alt_title_1', value)}
              />
              <FormField
                label="Título Alternativo #2"
                value={event.alt_title_2 || ''}
                onChange={(value) => onUpdate('alt_title_2', value)}
              />
              <FormField
                label="Resumen Alternativo #1"
                value={event.alt_summary_1 || ''}
                onChange={(value) => onUpdate('alt_summary_1', value)}
                multiline
                rows={3}
              />
              <FormField
                label="Resumen Alternativo #2"
                value={event.alt_summary_2 || ''}
                onChange={(value) => onUpdate('alt_summary_2', value)}
                multiline
                rows={3}
              />
            </CollapsibleSection>
          </div>
        </div>
      )}
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-xs font-mono uppercase tracking-wider">{title}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

// Array Field Component (for highlights, kpis, etc.)
function ArrayField({
  label,
  values,
  onChange,
  placeholder
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] text-white/40 uppercase tracking-wider font-mono">
        {label}
      </label>
      {values.map((value, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const newValues = [...values];
              newValues[idx] = e.target.value;
              onChange(newValues);
            }}
            className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF00A8] transition-colors"
            placeholder={`${placeholder} ${idx + 1}`}
          />
          <button
            onClick={() => {
              const newValues = values.filter((_, i) => i !== idx);
              onChange(newValues);
            }}
            className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...values, ''])}
        className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white flex items-center gap-2"
      >
        <Plus size={14} /> Agregar {placeholder}
      </button>
    </div>
  );
}