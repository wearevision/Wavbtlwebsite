import { WavEvent } from '../types';
import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

export interface RefineResponse {
  draft: string;
  response: string;
}

export async function refineDescription(
  messages: { role: 'user' | 'assistant', text: string }[],
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
      response: "Lo siento, el servicio de IA no está disponible en este momento. Por favor verifique la configuración del backend."
    };
  }
}

export function getRandomResponse(): string {
    return "Procesado.";
}
