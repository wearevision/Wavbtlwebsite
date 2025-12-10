import React, { useState } from 'react';
import { 
  Trash2, Upload, Image as ImageIcon, Film, X, Check, 
  AlertTriangle, ChevronRight, ChevronDown, Wand2, Loader2
} from 'lucide-react';
import { FormField } from './FormField';
import { ShareLinkButton } from './ShareLinkButton';
import { getCharCount } from '../../utils/validation';
import { WavEvent } from '../../types';
import { FIELD_TOOLTIPS } from '../../utils/validation';
import { useEventEnricher } from '../../src/hooks/useEventEnricher';
import { toast } from 'sonner@2.0.3';

interface EventEditorCardProps {
  event: WavEvent;
  index: number;
  validation: any;
  handleFileChange: (index: number, field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => void;
  updateEvent: (index: number, field: string, value: string) => void;
  removeGalleryItem: (index: number, mediaId: string) => void;
  removeEvent: (index: number) => void;
}

export const EventEditorCard: React.FC<EventEditorCardProps> = ({
  event,
  index,
  validation,
  handleFileChange,
  updateEvent,
  removeGalleryItem,
  removeEvent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasValidationErrors = validation && !validation.isValid;
  const { enrichEvent, isEnriching } = useEventEnricher();

  // Handler for AI auto-complete
  const handleAutoComplete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent collapse/expand
    
    if (!event.brand || !event.title) {
      toast.error('Necesitas al menos Marca y Título para auto-completar');
      return;
    }

    try {
      toast.loading('Enriqueciendo evento con IA...', { id: 'enrich' });
      const result = await enrichEvent(event);
      
      // Apply all non-empty fields from the result
      Object.entries(result).forEach(([field, value]) => {
        if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
          // Map draft to description
          if (field === 'draft') {
            updateEvent(index, 'description', value as string);
          } else {
            updateEvent(index, field, value as any);
          }
        }
      });

      toast.success('Evento enriquecido con éxito', { id: 'enrich' });
    } catch (error) {
      console.error('[Auto-Complete] Error:', error);
      toast.error('Error al enriquecer el evento', { id: 'enrich' });
    }
  };

  // Helper to get the title string for the collapsed view
  const headerTitle = [
    event.brand, 
    event.title, 
    event.category
  ].filter(item => item && item.trim() !== "").join(" - ") || "Nuevo Evento";

  return (
    <div className={`bg-neutral-900 border-2 rounded-xl overflow-hidden shadow-sm transition-all ${
      hasValidationErrors ? 'border-red-500/50' : 'border-neutral-800'
    }`}>
        {/* Header / Collapsed View */}
        <div 
            className="flex items-center justify-between p-4 cursor-pointer bg-neutral-900 hover:bg-neutral-800/50 transition-colors select-none"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center gap-4 overflow-hidden">
                 {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-pink-500 text-[24px] not-italic underline p-[2px] m-[2px]">#{index + 1}</span>
                </div>
                
                <div className="flex flex-col min-w-0">
                    {/* Brand - Project - Category */}
                    <h3 className="text-lg md:text-xl font-bold text-white truncate italic px-[5px] py-[2px] mx-[5px] my-[2px] text-[18px]">
                        {headerTitle}
                    </h3>
                    {/* Category */}
                    <p className="text-[12px] text-neutral-500 font-mono truncate mt-1 font-bold font-normal pt-[0px] pr-[0px] pb-[0px] pl-[12px]">
                        {event.category || 'Sin categoría'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-4">
                {/* AI Auto-Complete Button */}
                <button
                  onClick={handleAutoComplete}
                  disabled={isEnriching || !event.brand || !event.title}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-md text-xs text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Auto-completar todos los campos con IA"
                >
                  {isEnriching ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3 h-3" />
                      <span>🪄 Auto-Completar</span>
                    </>
                  )}
                </button>
                
                {/* Error Indicator in Collapsed View */}
                {hasValidationErrors && !isExpanded && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-950/30 rounded text-xs text-red-400 border border-red-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{validation.errors.size}</span>
                    </div>
                )}
                
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-neutral-500" />
                )}
            </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
            <div className="border-t border-neutral-800 animate-in fade-in slide-in-from-top-2 duration-200 bg-black/20">
                 {/* Validation Status Banner */}
                 {hasValidationErrors && (
                   <div className="bg-red-950/30 border-b border-red-500/20 px-4 py-2 flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4 text-red-400" />
                     <span className="text-xs text-red-300 font-medium">
                       Este evento tiene {validation.errors.size} error{validation.errors.size !== 1 ? 'es' : ''} de validación
                     </span>
                     {validation.forbiddenFields.length > 0 && (
                       <span className="text-[10px] text-red-400 ml-auto">
                         Campos no permitidos: {validation.forbiddenFields.join(', ')}
                       </span>
                     )}
                   </div>
                 )}
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column - Media Gallery + Main Image Preview */}
                  <div className="md:col-span-4 space-y-4">
                    {/* Logo Upload */}
                    <FormField
                      label="Logo de Marca"
                      tooltip={FIELD_TOOLTIPS.logo}
                    >
                      <div className="space-y-2">
                        {event.logo ? (
                          <div className="relative aspect-[3/1] bg-neutral-800 rounded-md overflow-hidden group flex items-center justify-center p-4">
                            <img 
                              src={event.logo} 
                              alt="Brand Logo" 
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <label className="cursor-pointer px-3 py-2 bg-white text-black rounded-md text-xs font-medium hover:bg-gray-200">
                                Cambiar
                                <input 
                                  type="file" 
                                  accept="image/png,image/svg+xml" 
                                  className="hidden" 
                                  onChange={(e) => e.target.files?.[0] && handleFileChange(index, 'logo', e.target.files[0])} 
                                />
                              </label>
                              <button
                                onClick={() => updateEvent(index, 'logo', '')}
                                className="px-3 py-2 bg-red-500 text-white rounded-md text-xs font-medium hover:bg-red-600"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="aspect-[3/1] bg-neutral-800 rounded-md border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800/50 hover:border-purple-500 transition-all">
                            <Upload className="h-6 w-6 text-neutral-500 mb-2" />
                            <span className="text-xs font-medium text-neutral-400">Subir Logo</span>
                            <span className="text-[10px] text-neutral-600 mt-1">PNG/SVG con alpha</span>
                            <input 
                              type="file" 
                              accept="image/png,image/svg+xml" 
                              className="hidden" 
                              onChange={(e) => e.target.files?.[0] && handleFileChange(index, 'logo', e.target.files[0])} 
                            />
                          </label>
                        )}
                        {event.logo && (
                          <input 
                            value={event.logo} 
                            readOnly
                            className="flex h-8 w-full rounded-md border border-neutral-700 bg-neutral-800/50 px-2 py-1 text-[10px] text-neutral-500 font-mono"
                          />
                        )}
                      </div>
                    </FormField>

                    {/* Main Image Preview */}
                    <FormField
                      label="Imagen Principal"
                      tooltip={FIELD_TOOLTIPS.image}
                      error={validation?.errors.get('image')}
                    >
                      <div className="space-y-2">
                        {event.image ? (
                          <div className="relative aspect-video bg-neutral-800 rounded-md overflow-hidden group">
                            <img 
                              src={event.image} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="cursor-pointer px-3 py-2 bg-white text-black rounded-md text-xs font-medium hover:bg-gray-200">
                                Cambiar
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => e.target.files?.[0] && handleFileChange(index, 'image', e.target.files[0])} 
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <label className="aspect-video bg-neutral-800 rounded-md border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800/50 hover:border-pink-500 transition-all">
                            <ImageIcon className="h-8 w-8 text-neutral-500 mb-2" />
                            <span className="text-xs font-medium text-neutral-400">Subir Imagen Principal</span>
                            <span className="text-[10px] text-neutral-600 mt-1">Obligatorio</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => e.target.files?.[0] && handleFileChange(index, 'image', e.target.files[0])} 
                            />
                          </label>
                        )}
                        {event.image && (
                          <input 
                            value={event.image} 
                            readOnly
                            className="flex h-8 w-full rounded-md border border-neutral-700 bg-neutral-800/50 px-2 py-1 text-[10px] text-neutral-500 font-mono"
                          />
                        )}
                      </div>
                    </FormField>

                    {/* Gallery */}
                    <FormField
                      label="Galería Multimedia"
                      tooltip={FIELD_TOOLTIPS.gallery}
                    >
                      <div className="grid grid-cols-3 gap-2">
                        {event.gallery?.map((media: any) => (
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
                              onClick={() => removeGalleryItem(index, media.id)}
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
                            onChange={(e) => e.target.files && Array.from(e.target.files).forEach(file => handleFileChange(index, 'gallery', file))}
                          />
                        </label>
                      </div>
                    </FormField>
                  </div>

                  {/* Right Column - Form Fields */}
                  <div className="md:col-span-8 space-y-4">
                    {/* Header with Delete Button */}
                    <div className="flex justify-end items-start pb-4 border-b border-neutral-800">
                      <button 
                        className="inline-flex items-center justify-center rounded-md h-9 w-9 text-red-500 hover:text-red-400 hover:bg-red-950/50 transition-colors" 
                        onClick={() => removeEvent(index)}
                        title="Eliminar evento"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Brand */}
                    <FormField
                      label="Marca"
                      tooltip={FIELD_TOOLTIPS.brand}
                      error={validation?.errors.get('brand')}
                      charCount={{
                        current: getCharCount(event.brand),
                        min: 1,
                        max: 50
                      }}
                    >
                      <input 
                        value={event.brand} 
                        onChange={(e) => updateEvent(index, 'brand', e.target.value)}
                        placeholder="Ej: Coca-Cola, Nike, Apple..."
                        className={`flex h-9 w-full rounded-md border bg-neutral-800 px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 transition-colors ${
                          validation?.errors.has('brand') 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                            : 'border-neutral-700 focus:border-pink-500 focus:ring-pink-500/50'
                        }`}
                      />
                    </FormField>

                    {/* Title */}
                    <FormField
                      label="Título del Evento"
                      tooltip={FIELD_TOOLTIPS.title}
                      error={validation?.errors.get('title')}
                      charCount={{
                        current: getCharCount(event.title),
                        min: 5,
                        max: 100
                      }}
                    >
                      <input 
                        value={event.title} 
                        onChange={(e) => updateEvent(index, 'title', e.target.value)}
                        placeholder="Título descriptivo del proyecto BTL..."
                        className={`flex h-10 w-full rounded-md border bg-neutral-800 px-3 py-2 text-lg font-bold text-white focus:outline-none focus:ring-1 transition-colors ${
                          validation?.errors.has('title') 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                            : 'border-neutral-700 focus:border-pink-500 focus:ring-pink-500/50'
                        }`}
                      />
                    </FormField>

                    {/* Category - New Field */}
                     <FormField
                      label="Categoría"
                      tooltip="Categoría del evento (Ej: Lanzamiento, Activación, Showroom)"
                      charCount={{
                        current: getCharCount(event.category),
                        min: 0,
                        max: 50
                      }}
                    >
                      <input 
                        value={event.category || ''} 
                        onChange={(e) => updateEvent(index, 'category', e.target.value)}
                        placeholder="Ej: Activación BTL, Showroom Inmersivo..."
                        className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-colors"
                      />
                    </FormField>

                    {/* Auto-generated Slug Preview */}
                    {validation?.slug && (
                      <div className="bg-blue-950/20 border border-blue-500/20 rounded-md p-3 flex items-start gap-2">
                        <div className="p-1 bg-blue-500/10 rounded">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-1">
                            Slug Generado Automáticamente
                          </p>
                          <p className="text-xs text-blue-100 font-mono break-all">
                            {validation.slug}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Share Links */}
                    {validation?.slug && event.image && (
                      <ShareLinkButton 
                        eventSlug={validation.slug}
                        eventTitle={event.title}
                        variant="card"
                      />
                    )}

                    {/* Description */}
                    <FormField
                      label="Descripción"
                      tooltip={FIELD_TOOLTIPS.description}
                      error={validation?.errors.get('description')}
                      charCount={{
                        current: getCharCount(event.description),
                        min: 20,
                        max: 1000
                      }}
                    >
                      <textarea 
                        value={event.description} 
                        onChange={(e) => updateEvent(index, 'description', e.target.value)}
                        placeholder="Descripción detallada del proyecto, tecnologías usadas, resultados..."
                        className={`flex min-h-[120px] w-full rounded-md border bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 transition-colors resize-y ${
                          validation?.errors.has('description') 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                            : 'border-neutral-700 focus:border-pink-500 focus:ring-pink-500/50'
                        }`}
                      />
                    </FormField>

                    {/* AI Metadata / Summary & Extended Fields */}
                    <div className="border-t border-neutral-800 pt-4 space-y-4">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Contenido Avanzado & SEO (IA)</h4>
                        
                        {/* Highlights */}
                        <FormField label="Highlights (Bullets)" tooltip="Puntos clave del proyecto">
                            <div className="space-y-2">
                                {(event.highlights || []).map((highlight: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <input 
                                            value={highlight} 
                                            onChange={(e) => {
                                                const newHighlights = [...(event.highlights || [])];
                                                newHighlights[i] = e.target.value;
                                                updateEvent(index, 'highlights', newHighlights as any);
                                            }}
                                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300"
                                        />
                                        <button 
                                            onClick={() => {
                                                const newHighlights = (event.highlights || []).filter((_, idx) => idx !== i);
                                                updateEvent(index, 'highlights', newHighlights as any);
                                            }}
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => updateEvent(index, 'highlights', [...(event.highlights || []), ''] as any)}
                                    className="text-xs text-pink-500 hover:text-pink-400 font-medium flex items-center"
                                >
                                    <Check className="w-3 h-3 mr-1" /> Agregar Highlight
                                </button>
                            </div>
                        </FormField>

                        {/* Keywords & Hashtags */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Keywords SEO" tooltip="Separadas por coma">
                                <textarea 
                                    value={Array.isArray(event.keywords) ? event.keywords.join(', ') : event.keywords || ''}
                                    onChange={(e) => updateEvent(index, 'keywords', e.target.value.split(',').map(s => s.trim()) as any)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300 min-h-[60px]"
                                    placeholder="marketing, btl, eventos..."
                                />
                            </FormField>
                             <FormField label="Hashtags Generales" tooltip="Separados por coma o espacio">
                                <textarea 
                                    value={Array.isArray(event.hashtags) ? event.hashtags.join(' ') : event.hashtags || ''}
                                    onChange={(e) => updateEvent(index, 'hashtags', e.target.value.split(/[\s,]+/).filter(Boolean) as any)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300 min-h-[60px]"
                                    placeholder="#evento #btl..."
                                />
                            </FormField>
                        </div>

                        {/* Social Media Copy Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField label="Instagram Copy">
                                <div className="space-y-2 text-xs">
                                    <input 
                                        placeholder="Hook" 
                                        value={event.instagram_hook || ''}
                                        onChange={(e) => updateEvent(index, 'instagram_hook', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 font-bold text-white"
                                    />
                                    <textarea 
                                        placeholder="Cuerpo del post..." 
                                        value={event.instagram_body || ''}
                                        onChange={(e) => updateEvent(index, 'instagram_body', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300 min-h-[80px]"
                                    />
                                    <input 
                                        placeholder="Cierre (Call to Action)..." 
                                        value={event.instagram_closing || ''}
                                        onChange={(e) => updateEvent(index, 'instagram_closing', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300"
                                    />
                                    <input 
                                        placeholder="Hashtags específicos" 
                                        value={event.instagram_hashtags || ''}
                                        onChange={(e) => updateEvent(index, 'instagram_hashtags', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-pink-400"
                                    />
                                </div>
                             </FormField>
                             
                             <FormField label="LinkedIn Posts">
                                 <div className="space-y-2 text-xs">
                                    <textarea 
                                        placeholder="Post Corto LinkedIn..." 
                                        value={event.linkedin_post || ''}
                                        onChange={(e) => updateEvent(index, 'linkedin_post', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300 min-h-[80px]"
                                    />
                                    <textarea 
                                        placeholder="Artículo Largo LinkedIn..." 
                                        value={event.linkedin_article || ''}
                                        onChange={(e) => updateEvent(index, 'linkedin_article', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300 min-h-[80px]"
                                    />
                                </div>
                             </FormField>
                        </div>

                        {/* Alternatives */}
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Variantes Alternativas (A/B Testing)" tooltip="Opciones generadas por IA para pruebas">
                                <div className="space-y-2 text-xs">
                                    <div className="grid grid-cols-2 gap-2">
                                        <input 
                                            placeholder="Título Alternativo 1" 
                                            value={event.alt_title_1 || ''}
                                            onChange={(e) => updateEvent(index, 'alt_title_1', e.target.value)}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300"
                                        />
                                        <input 
                                            placeholder="Título Alternativo 2" 
                                            value={event.alt_title_2 || ''}
                                            onChange={(e) => updateEvent(index, 'alt_title_2', e.target.value)}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300"
                                        />
                                    </div>
                                    <textarea 
                                        placeholder="Copy Alternativo Instagram..." 
                                        value={event.alt_instagram || ''}
                                        onChange={(e) => updateEvent(index, 'alt_instagram', e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-neutral-300 min-h-[60px]"
                                    />
                                </div>
                            </FormField>
                        </div>

                        <FormField
                            label="Metadatos IA (SEO/Resumen)"
                            tooltip="Resumen generado por IA para optimización de búsqueda"
                        >
                            <textarea 
                                value={event.summary || ''} 
                                onChange={(e) => updateEvent(index, 'summary', e.target.value)}
                                placeholder="Resumen técnico para SEO..."
                                className="flex min-h-[80px] w-full rounded-md border border-neutral-700 bg-blue-950/10 px-3 py-2 text-xs font-mono text-blue-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors resize-y"
                            />
                        </FormField>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
    </div>
  );
};