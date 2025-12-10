import { useState } from 'react';
import { WavEvent } from '../../types';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

/**
 * Converts a figma:asset or relative image URL to base64 data URL
 */
const imageUrlToBase64 = async (url: string): Promise<{ data: string; mimeType: string } | null> => {
  try {
    // Skip if already a public URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return null;
    }

    // Fetch the image (works with figma:asset virtual module)
    const response = await fetch(url);
    if (!response.ok) return null;

    const blob = await response.blob();
    const mimeType = blob.type || 'image/jpeg';

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve({ data: base64, mimeType });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('[Image Converter] Failed to convert image:', url, error);
    return null;
  }
};

/**
 * Uploads an image to Supabase Storage and returns a signed URL
 */
const uploadImageToStorage = async (imageData: string, mimeType: string, fileName?: string): Promise<string | null> => {
  try {
    const response = await fetch(`${BASE_URL}/upload-temp-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        imageData,
        mimeType,
        fileName
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('[Image Upload] Failed:', error);
      return null;
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('[Image Upload] Exception:', error);
    return null;
  }
};

/**
 * Processes event images: converts local images to Supabase signed URLs
 */
const processEventImages = async (
  event: Partial<WavEvent>,
  addLog: (message: string, type: AILogEntry['type'], icon?: string) => void
): Promise<Partial<WavEvent>> => {
  const processedEvent = { ...event };
  let uploadedCount = 0;

  // Process cover image
  if (event.image && !event.image.startsWith('http')) {
    addLog(`📤 Subiendo imagen de portada a Supabase Storage...`, 'loading', '📤');
    
    const converted = await imageUrlToBase64(event.image);
    if (converted) {
      const signedUrl = await uploadImageToStorage(converted.data, converted.mimeType, 'cover');
      if (signedUrl) {
        processedEvent.image = signedUrl;
        uploadedCount++;
        addLog(`  ✓ Portada subida exitosamente`, 'success');
      }
    }
  }

  // Process gallery images (up to 3)
  if (Array.isArray(event.gallery) && event.gallery.length > 0) {
    addLog(`📤 Subiendo imágenes de galería (máx 3)...`, 'loading', '📤');
    
    const processedGallery = await Promise.all(
      event.gallery.slice(0, 3).map(async (item, idx) => {
        const url = typeof item === 'string' ? item : (item as any)?.url;
        
        if (!url || url.startsWith('http')) {
          return item; // Already public or invalid
        }

        const converted = await imageUrlToBase64(url);
        if (converted) {
          const signedUrl = await uploadImageToStorage(converted.data, converted.mimeType, `gallery-${idx}`);
          if (signedUrl) {
            uploadedCount++;
            addLog(`  ✓ Imagen ${idx + 1}/3 subida`, 'success');
            return typeof item === 'string' ? signedUrl : { ...item, url: signedUrl };
          }
        }
        
        return item; // Keep original if upload failed
      })
    );

    processedEvent.gallery = processedGallery;
  }

  if (uploadedCount > 0) {
    addLog(`✅ ${uploadedCount} ${uploadedCount === 1 ? 'imagen subida' : 'imágenes subidas'} - URLs temporales generadas (válidas 1 hora)`, 'success', '✅');
  }

  return processedEvent;
};

export interface AILogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'loading' | 'error';
  icon?: string;
}

export interface EnrichResponse {
  draft: string;
  chat_response: string;
  
  // Basic Fields
  summary?: string;
  title?: string;
  slug?: string;
  
  // Extended Identification
  client?: string;
  category?: string;
  subcategory?: string;
  year?: number;
  month?: number;
  country?: string;
  city?: string;
  venue?: string;
  
  // Content Editorial
  technical_summary?: string;
  tone?: string;
  audience?: string;
  highlights?: string[];
  
  // SEO & Metadata
  seo_title?: string;
  seo_description?: string;
  keywords?: string[];
  hashtags?: string[];
  tags?: string[];
  
  // Social Media - Instagram
  instagram_hook?: string;
  instagram_body?: string;
  instagram_closing?: string;
  instagram_hashtags?: string;
  alt_instagram?: string;
  
  // Social Media - LinkedIn
  linkedin_post?: string;
  linkedin_article?: string;
  
  // A/B Testing
  alt_title_1?: string;
  alt_title_2?: string;
  alt_summary_1?: string;
  alt_summary_2?: string;
  
  // Performance
  people_reached?: string;
  attendees?: string;
  days?: number;
  cities?: number;
  screens?: number;
  kpis?: string[];
  results_notes?: string;
}

/**
 * Hook for one-click event enrichment using AI.
 * 
 * This hook interfaces with the OpenAI API via the backend to automatically
 * populate ALL empty fields in the WavEvent schema with realistic, high-fidelity data.
 * 
 * System Prompt Strategy:
 * - Professional, Technical, Factual tone (no marketing fluff)
 * - Focus on logistics, hardware, metrics, and execution details
 * - Uses "Desafío -> Solución -> Resultado" structure for technical summaries
 * - Infers realistic data based on event context (brand, category, location)
 * 
 * Modes:
 * - "fill": Only fills empty fields (Auto-Completar Datos)
 * - "optimize": Rewrites and optimizes ALL fields, even existing ones (Optimizar Todo)
 */
export const useEventEnricher = () => {
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichProgress, setEnrichProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<AILogEntry[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  /**
   * Helper function to add a log entry with automatic timestamp
   */
  const addLog = (message: string, type: AILogEntry['type'] = 'info', icon?: string) => {
    const timestamp = new Date().toLocaleTimeString('es-CL', { hour12: false });
    setConsoleLogs(prev => [...prev, { timestamp, message, type, icon }]);
  };

  /**
   * Clear all logs
   */
  const clearLogs = () => {
    setConsoleLogs([]);
  };

  /**
   * Enriches a single event with AI-generated data.
   * 
   * @param event - The partial event to enrich
   * @param mode - "fill" (only empty fields) or "optimize" (improve all fields)
   * @returns Enriched event data
   */
  const enrichEvent = async (
    event: Partial<WavEvent>, 
    mode: 'fill' | 'optimize' = 'fill'
  ): Promise<EnrichResponse> => {
    setIsEnriching(true);
    setEnrichProgress(0);
    clearLogs(); // Clear previous logs
    setIsConsoleOpen(true); // Open console automatically

    try {
      // Log: Start
      addLog(`🚀 Inicializando Agente de Producción (GPT-4o Vision)...`, 'loading', '🚀');
      addLog(`📋 Evento: \"${event.title || 'Sin título'}\" - Marca: ${event.brand || 'N/A'}`, 'info', '📋');
      addLog(`⚙️ Modo: ${mode === 'fill' ? 'Auto-Completar Datos' : 'Optimizar Todo'}`, 'info', '⚙️');

      // DETAILED IMAGE LOGGING
      addLog(`\n━━━━━━━ ANÁLISIS DE IMÁGENES ━━━━━━━`, 'info', '📸');
      
      // Log cover image
      if (event.image) {
        addLog(`🖼️ Imagen Principal:`, 'info');
        addLog(`  → URL: ${event.image.substring(0, 80)}${event.image.length > 80 ? '...' : ''}`, 'info');
        addLog(`  → Tipo: ${event.image.startsWith('http') ? '✅ URL Pública (OK para Vision)' : '⚠️ URL Local (requiere conversión)'}`, event.image.startsWith('http') ? 'success' : 'warning');
      } else {
        addLog(`⚠️ Sin imagen principal`, 'warning');
      }

      // Log gallery images
      if (Array.isArray(event.gallery) && event.gallery.length > 0) {
        addLog(`\n📚 Galería (${event.gallery.length} imágenes):`, 'info');
        event.gallery.slice(0, 3).forEach((item, idx) => {
          const url = typeof item === 'string' ? item : (item as any)?.url;
          if (url) {
            addLog(`  ${idx + 1}. ${url.substring(0, 70)}${url.length > 70 ? '...' : ''}`, 'info');
            addLog(`     → ${url.startsWith('http') ? '✅ Pública' : '⚠️ Local'}`, url.startsWith('http') ? 'success' : 'warning');
          }
        });
        if (event.gallery.length > 3) {
          addLog(`  ⚠️ Solo se usarán las primeras 3 imágenes (límite para OpenAI)`, 'warning');
        }
      } else {
        addLog(`⚠️ Sin imágenes en galería`, 'warning');
      }

      // Count valid public images
      const publicImages = [
        event.image,
        ...(Array.isArray(event.gallery) ? event.gallery.slice(0, 3) : [])
      ].filter(img => {
        const url = typeof img === 'string' ? img : (img as any)?.url;
        return url && url.startsWith('http');
      });

      addLog(`\n📊 RESUMEN: ${publicImages.length} imagen(es) pública(s) lista(s) para Vision API`, publicImages.length > 0 ? 'success' : 'warning', '📊');

      // Process local images: upload to Supabase and get signed URLs
      setEnrichProgress(15);
      addLog(`\n━━━━━━━ PROCESAMIENTO DE IMÁGENES ━━━━━━━`, 'info', '⚙️');
      const processedEvent = await processEventImages(event, addLog);
      setEnrichProgress(25);

      // Log processed images
      const processedPublicImages = [
        processedEvent.image,
        ...(Array.isArray(processedEvent.gallery) ? processedEvent.gallery.slice(0, 3) : [])
      ].filter(img => {
        const url = typeof img === 'string' ? img : (img as any)?.url;
        return url && url.startsWith('http');
      });

      addLog(`✅ Post-procesamiento: ${processedPublicImages.length} imagen(es) disponible(s) para OpenAI`, 'success', '✅');

      // Create appropriate message based on mode
      const userMessage = mode === 'fill' 
        ? `AUTO-COMPLETAR DATOS: Por favor completa SOLO los campos vacíos de este evento con datos realistas y profesionales. NO modifiques los campos que ya tienen contenido.
          
Contexto actual:
- Marca: ${event.brand || 'No especificada'}
- Título: ${event.title || 'No especificado'}
- Descripción: ${event.description || 'No especificada'}
- Categoría: ${event.category || 'No especificada'}

IMPORTANTE: Este es un caso de estudio BTL/Experiencial para el portfolio de We Are Vision.
Genera contenido técnico, profesional y realista. Infiere datos faltantes basándote en el contexto.
NO uses emojis. Sé específico con métricas, ubicaciones y detalles logísticos.
SOLO LLENA CAMPOS VACÍOS, NO MODIFIQUES LO QUE YA EXISTE.`
        : `OPTIMIZAR TODO: Por favor mejora y optimiza TODOS los campos de este evento, incluso los que ya tienen contenido. Actúa como un Productor de Eventos BTL + Experto en SEO/AEO/LLMO.
          
Contexto actual:
- Marca: ${event.brand || 'No especificada'}
- Título: ${event.title || 'No especificado'}
- Descripción: ${event.description || 'No especificada'}
- Categoría: ${event.category || 'No especificada'}

IMPORTANTE: Mejora todo el contenido existente desde la perspectiva de:
1. Productor BTL: Detalles técnicos, logística, ejecución, métricas realistas
2. Experto SEO/AEO/LLMO: Títulos optimizados, keywords estratégicas, meta descriptions perfectas
3. Copywriter: Contenido persuasivo pero profesional, sin fluff

Reescribe títulos, descripciones, resúmenes para hacerlos más efectivos.
Optimiza el SEO y contenido social.
Mejora los KPIs y métricas.
NO uses emojis. Sé técnico y profesional.`;

      const messages = [{ role: 'user', content: userMessage }];

      // LOG THE FULL PROMPT
      addLog(`\n━━━━━━━ PROMPT ENVIADO A OPENAI ━━━━━━━`, 'info', '📤');
      addLog(`Modo detectado: ${mode.toUpperCase()}`, 'info');
      addLog(`\n--- INICIO DEL PROMPT ---`, 'info');
      const promptLines = userMessage.split('\n');
      promptLines.forEach(line => {
        if (line.trim()) {
          addLog(line, 'info');
        }
      });
      addLog(`--- FIN DEL PROMPT ---\n`, 'info');

      addLog(`🧠 Enviando request a OpenAI GPT-4o (con Vision)...`, 'loading', '🧠');
      addLog(`  → Endpoint: ${BASE_URL}/refine`, 'info');
      addLog(`  → Modelo: gpt-4o (Vision enabled)`, 'info');
      addLog(`  → Imágenes adjuntas: ${processedPublicImages.length}`, 'info');
      setEnrichProgress(30);

      const requestBody = {
        messages,
        currentDraft: event.description || '',
        event: processedEvent // Use processed event with signed URLs
      };

      addLog(`  → Enviando payload de ${JSON.stringify(requestBody).length} bytes...`, 'info');

      const res = await fetch(`${BASE_URL}/refine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(requestBody)
      });

      addLog(`\n━━━━━━━ RESPUESTA DEL SERVIDOR ━━━━━━━`, 'info', '📡');
      addLog(`Status: ${res.status} ${res.statusText}`, res.ok ? 'success' : 'error');
      setEnrichProgress(70);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        addLog(`❌ Error del servidor AI: HTTP ${res.status}`, 'error', '❌');
        if (errorData.error) {
          addLog(`❌ Detalle: ${errorData.error}`, 'error', '❌');
          console.error('[Event Enricher] Error details:', errorData);
        }
        if (errorData.details) {
          console.error('[Event Enricher] Stack trace:', errorData.details);
        }
        throw new Error(`AI Service Error: ${res.status}`);
      }

      const data = await res.json();
      
      // Log what was generated
      addLog(`\n━━━━━━━ RESULTADO DE OPTIMIZACIÓN ━━━━━━━`, 'success', '✅');
      
      const generatedFields = Object.keys(data).filter(key => 
        key !== 'draft' && key !== 'chat_response' && data[key]
      );
      
      addLog(`📝 Total de campos generados: ${generatedFields.length} de ~45 posibles`, 'success', '📝');
      
      // Log specific important fields
      if (data.title) addLog(`  → Título: "${data.title.substring(0, 60)}${data.title.length > 60 ? '...' : ''}"`, 'info');
      if (data.seo_title) addLog(`  → SEO Title: "${data.seo_title}"`, 'info');
      if (data.tone) addLog(`  → Tono detectado: "${data.tone}"`, 'info');
      if (data.audience) addLog(`  → Audiencia: "${data.audience.substring(0, 50)}${data.audience.length > 50 ? '...' : ''}"`, 'info');
      if (data.attendees) addLog(`  → Asistentes estimados: ${data.attendees}`, 'info');
      if (data.venue) addLog(`  → Venue inferido: "${data.venue}"`, 'info');
      if (data.keywords && Array.isArray(data.keywords)) addLog(`  → Keywords (${data.keywords.length}): ${data.keywords.slice(0, 5).join(', ')}${data.keywords.length > 5 ? '...' : ''}`, 'info');
      if (data.og_image) addLog(`  → OpenGraph Image: ${data.og_image.substring(0, 60)}...`, 'info');
      
      // LOG DESCRIPTION OPTIMIZATION
      if (data.draft) {
        addLog(`\n📄 Descripción Optimizada:`, 'success', '📄');
        addLog(`  → Longitud: ${data.draft.length} caracteres`, 'info');
        addLog(`  → Preview: "${data.draft.substring(0, 150)}${data.draft.length > 150 ? '...' : ''}"`, 'info');
      }
      
      // Log AI's chat response if available
      if (data.chat_response) {
        addLog(`\n💬 Análisis de la IA:`, 'info', '💬');
        const responseLines = data.chat_response.split('\n').slice(0, 10); // First 10 lines
        responseLines.forEach(line => {
          if (line.trim()) {
            addLog(`  ${line}`, 'info');
          }
        });
        if (data.chat_response.split('\n').length > 10) {
          addLog(`  ... (ver más en el campo chat_response)`, 'info');
        }
      }
      
      setEnrichProgress(100);
      addLog(`\n✅ ¡Optimización completada exitosamente!`, 'success', '✅');
      
      return data;
    } catch (error: any) {
      console.error('[Event Enricher] Error:', error);
      addLog(`\n❌ ERROR CRÍTICO: ${error.message}`, 'error', '❌');
      throw error;
    } finally {
      setIsEnriching(false);
      setTimeout(() => {
        setEnrichProgress(0);
        // Don't auto-close console - let user review logs
      }, 1000);
    }
  };

  /**
   * Enriches multiple events sequentially (to avoid rate limits).
   * 
   * @param events - Array of events to enrich
   * @param mode - "fill" or "optimize"
   * @param onProgress - Callback for progress updates (current, total)
   * @param skipCondition - Optional function to skip events (e.g., already has technical_summary)
   * @returns Array of enriched events
   */
  const enrichBatch = async (
    events: Partial<WavEvent>[],
    mode: 'fill' | 'optimize' = 'fill',
    onProgress?: (current: number, total: number) => void,
    skipCondition?: (event: Partial<WavEvent>) => boolean
  ): Promise<Array<{ index: number; result: EnrichResponse | null; error?: string }>> => {
    setIsEnriching(true);
    clearLogs(); // Clear previous logs
    setIsConsoleOpen(true); // Open console automatically
    
    const results: Array<{ index: number; result: EnrichResponse | null; error?: string }> = [];

    // Batch start log
    addLog(`🚀 Iniciando procesamiento en lote de ${events.length} eventos...`, 'loading', '🚀');
    addLog(`⚙️ Modo: ${mode === 'fill' ? 'Auto-Completar Datos' : 'Optimizar Todo'}`, 'info', '⚙️');

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      
      // Log current event
      addLog(`\n📌 Procesando evento ${i + 1}/${events.length}: "${event.title || 'Sin título'}"`, 'loading', '📌');
      
      // Skip if condition is met
      if (skipCondition && skipCondition(event)) {
        addLog(`⏭️ Omitido (skip condition cumplida)`, 'warning', '⏭️');
        console.log(`[Batch Enricher] Skipping event ${i + 1}/${events.length} (skip condition met)`);
        results.push({ index: i, result: null });
        onProgress?.(i + 1, events.length);
        continue;
      }

      try {
        console.log(`[Batch Enricher] Processing event ${i + 1}/${events.length}...`);
        
        // Count images for this event
        const imageCount = [
          event.image,
          ...(Array.isArray(event.gallery) ? event.gallery.slice(0, 3) : [])
        ].filter(img => {
          const url = typeof img === 'string' ? img : (img as any)?.url;
          return url && url.startsWith('http');
        }).length;

        if (imageCount > 0) {
          addLog(`  📸 ${imageCount} imagen(es) detectada(s)`, 'info');
        }

        // Create message
        const userMessage = mode === 'fill' 
          ? `AUTO-COMPLETAR DATOS: Por favor completa SOLO los campos vacíos de este evento con datos realistas y profesionales. NO modifiques los campos que ya tienen contenido.
            
Contexto actual:
- Marca: ${event.brand || 'No especificada'}
- Título: ${event.title || 'No especificado'}
- Descripción: ${event.description || 'No especificada'}
- Categoría: ${event.category || 'No especificada'}

IMPORTANTE: Este es un caso de estudio BTL/Experiencial para el portfolio de We Are Vision.
Genera contenido técnico, profesional y realista. Infiere datos faltantes basándote en el contexto.
NO uses emojis. Sé específico con métricas, ubicaciones y detalles logísticos.
SOLO LLENA CAMPOS VACÍOS, NO MODIFIQUES LO QUE YA EXISTE.`
          : `OPTIMIZAR TODO: Por favor mejora y optimiza TODOS los campos de este evento, incluso los que ya tienen contenido. Actúa como un Productor de Eventos BTL + Experto en SEO/AEO/LLMO.
            
Contexto actual:
- Marca: ${event.brand || 'No especificada'}
- Título: ${event.title || 'No especificado'}
- Descripción: ${event.description || 'No especificada'}
- Categoría: ${event.category || 'No especificada'}

IMPORTANTE: Mejora todo el contenido existente desde la perspectiva de:
1. Productor BTL: Detalles técnicos, logística, ejecución, métricas realistas
2. Experto SEO/AEO/LLMO: Títulos optimizados, keywords estratégicas, meta descriptions perfectas
3. Copywriter: Contenido persuasivo pero profesional, sin fluff

Reescribe títulos, descripciones, resúmenes para hacerlos más efectivos.
Optimiza el SEO y contenido social.
Mejora los KPIs y métricas.
NO uses emojis. Sé técnico y profesional.`;

        const messages = [{ role: 'user', content: userMessage }];

        addLog(`  🧠 Enviando a OpenAI...`, 'loading');
        const progress = Math.round(((i + 0.5) / events.length) * 100);
        setEnrichProgress(progress);

        const res = await fetch(`${BASE_URL}/refine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            messages,
            currentDraft: event.description || '',
            event,
            mode
          })
        });

        if (!res.ok) {
          throw new Error(`AI Service Error: ${res.status}`);
        }

        const data = await res.json();
        const generatedFields = Object.keys(data).filter(key => 
          key !== 'draft' && key !== 'chat_response' && data[key]
        );
        
        addLog(`  ✅ Completado - ${generatedFields.length} campos generados`, 'success', '✅');
        results.push({ index: i, result: data });
        
        // Update progress
        const finalProgress = Math.round(((i + 1) / events.length) * 100);
        setEnrichProgress(finalProgress);
        onProgress?.(i + 1, events.length);
        
        // Small delay to avoid rate limits (500ms between requests)
        if (i < events.length - 1) {
          addLog(`  ⏳ Esperando 500ms (rate limit protection)...`, 'info', '⏳');
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error: any) {
        console.error(`[Batch Enricher] Error processing event ${i + 1}:`, error);
        addLog(`  ❌ Error: ${error.message}`, 'error', '❌');
        results.push({ 
          index: i, 
          result: null, 
          error: error.message || 'Unknown error' 
        });
        onProgress?.(i + 1, events.length);
      }
    }

    const successCount = results.filter(r => r.result !== null).length;
    const errorCount = results.filter(r => r.error).length;
    
    addLog(`\n🎉 Procesamiento en lote completado!`, 'success', '🎉');
    addLog(`✅ Exitosos: ${successCount}/${events.length}`, 'success');
    if (errorCount > 0) {
      addLog(`❌ Errores: ${errorCount}/${events.length}`, 'error');
    }

    setIsEnriching(false);
    setEnrichProgress(100);
    
    return results;
  };

  return {
    enrichEvent,
    enrichBatch,
    isEnriching,
    enrichProgress,
    consoleLogs,
    isConsoleOpen,
    addLog,
    clearLogs,
    setIsConsoleOpen
  };
};