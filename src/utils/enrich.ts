import { WavEvent } from '../types';

export function enrichDescription(original: string, event: WavEvent): string {
  const btlTerms = [
    "activación BTL",
    "experiencia inmersiva",
    "instalación tecnológica",
    "producción de eventos",
    "escenografía",
    "brand experience",
    "Chile",
    "LATAM"
  ];

  // Basic logic to expand text without using an external AI API yet (simulated enrichment)
  // In a real scenario, this would call an LLM. Here we use a template-based approach 
  // to demonstrate the "Semantic Optimization" output as requested.
  
  const contextIntro = `Para el proyecto ${event.title}, desarrollado junto a ${event.brand}, diseñamos una propuesta integral de brand experience.`;
  
  const techContext = "La implementación integró activaciones BTL de alto impacto, combinando escenografía física con instalaciones tecnológicas avanzadas para crear una narrativa coherente.";
  
  const locationContext = "Este despliegue reafirma nuestro liderazgo en producción de eventos en Chile y LATAM, enfocándonos en conectar emocionalmente con las audiencias.";

  // Check which terms are missing
  const missingTerms = btlTerms.filter(term => !original.toLowerCase().includes(term.toLowerCase()));
  
  // Construct the enriched text
  // 1. Original text (preserved)
  // 2. Context Intro (if short)
  // 3. Tech context
  // 4. Location/Closing
  
  let enriched = original.trim();
  
  if (!enriched.endsWith('.')) enriched += '.';
  
  // If original is very short, prepend context
  if (enriched.length < 50) {
    enriched = `${contextIntro} ${enriched}`;
  }

  enriched += ` ${techContext}`;
  
  // If we still have many missing terms, try to weave them in or add the location context which has some
  if (missingTerms.length > 3) {
    enriched += ` ${locationContext}`;
  } else {
    enriched += " Una experiencia inmersiva diseñada para perdurar en la memoria del consumidor.";
  }
  
  // Ensure professional tone and discreet mention of WAV BTL if not present
  if (!enriched.includes("WAV BTL")) {
    enriched += " Una ejecución con el sello de calidad y prolijidad técnica de WAV BTL.";
  }

  return enriched;
}
