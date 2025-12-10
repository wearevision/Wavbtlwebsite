import { useState } from 'react';
import { WavEvent } from '../../types';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

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

    try {
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

      setEnrichProgress(30);

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
          mode // Pass mode to backend
        })
      });

      setEnrichProgress(70);

      if (!res.ok) {
        throw new Error(`AI Service Error: ${res.status}`);
      }

      const data = await res.json();
      setEnrichProgress(100);
      
      return data;
    } catch (error) {
      console.error('[Event Enricher] Error:', error);
      throw error;
    } finally {
      setIsEnriching(false);
      setTimeout(() => setEnrichProgress(0), 1000);
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
    const results: Array<{ index: number; result: EnrichResponse | null; error?: string }> = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      
      // Skip if condition is met
      if (skipCondition && skipCondition(event)) {
        console.log(`[Batch Enricher] Skipping event ${i + 1}/${events.length} (skip condition met)`);
        results.push({ index: i, result: null });
        onProgress?.(i + 1, events.length);
        continue;
      }

      try {
        console.log(`[Batch Enricher] Processing event ${i + 1}/${events.length}...`);
        const result = await enrichEvent(event, mode);
        results.push({ index: i, result });
        
        // Update progress
        onProgress?.(i + 1, events.length);
        
        // Small delay to avoid rate limits (500ms between requests)
        if (i < events.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error: any) {
        console.error(`[Batch Enricher] Error processing event ${i + 1}:`, error);
        results.push({ 
          index: i, 
          result: null, 
          error: error.message || 'Unknown error' 
        });
        onProgress?.(i + 1, events.length);
      }
    }

    setIsEnriching(false);
    return results;
  };

  return {
    enrichEvent,
    enrichBatch,
    isEnriching,
    enrichProgress
  };
};