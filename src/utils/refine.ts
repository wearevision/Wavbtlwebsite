import { WavEvent } from '../types';
import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

export interface RefineResponse {
  draft: string;
  chat_response: string; // Mapped from backend output
  
  // Basic Fields
  summary?: string;
  title?: string;
  slug?: string;
  
  // Content Editorial
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
  kpis?: string[];
}

export async function refineDescription(
  messages: { role: 'user' | 'assistant', content: string }[],
  currentDraft: string,
  event: WavEvent
): Promise<RefineResponse> {
  
  try {
    const res = await fetch(`${BASE_URL}/refine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        messages,
        currentDraft,
        event
      })
    });

    if (!res.ok) {
      throw new Error('AI Service Unavailable');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Refine Error:", error);
    // Fallback if backend fails or API key is missing
    return {
      draft: currentDraft,
      chat_response: "Lo siento, el servicio de IA no está disponible en este momento. Por favor verifique la configuración del backend."
    };
  }
}

export function getRandomResponse(): string {
    return "Procesado.";
}
