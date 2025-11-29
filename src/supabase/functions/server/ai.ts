
// Define minimal types locally to avoid import path issues in Edge Functions
interface WavEvent {
  title: string;
  brand: string;
  description: string;
  [key: string]: any;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

export async function generateRefinement(
  messages: any[],
  currentDraft: string,
  event: WavEvent
) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  // Extract latest user prompt for keyword detection
  const lastUserMessage = messages
    .filter(m => m.role === 'user')
    .pop();
  
  const userText = lastUserMessage ? (lastUserMessage.text || lastUserMessage.content || "") : "";
  const textUpper = userText.toUpperCase();

  // DETECT MODES (Legacy support + Helper triggers)
  const modes = {
    isShorter: ["SHORTER", "RESUMIDO", "BREVE", "CORTO", "LESS", "MENOS"].some(k => textUpper.includes(k)),
    isTechnical: ["TECHNICAL", "TÉCNICO", "TECNICO", "HARDWARE", "RIGGING", "SPECS"].some(k => textUpper.includes(k)),
    isEmotional: ["EMOTIONAL", "STORYTELLING", "EMOCIONAL", "NARRATIVA", "VIAJE", "FEELING"].some(k => textUpper.includes(k)),
    isCorporate: ["CORPORATE", "FORMAL", "INSTITUCIONAL", "EJECUTIVO", "BUSINESS"].some(k => textUpper.includes(k)),
    isSeo: ["SEO", "IA", "SEARCH", "SGE", "GPT", "GOOGLE", "PERPLEXITY", "INDEXING"].some(k => textUpper.includes(k)),
    isImpact: ["IMPACTO", "VALOR", "OBJETIVO", "ROI", "ALCANCE", "RESULTADO", "METRICS"].some(k => textUpper.includes(k)),
  };

  let modeInstructions = "";

  if (modes.isShorter) modeInstructions += "- MODO RESUMIDO: Genera una versión concisa (2-3 líneas). Corta el relleno, mantén el impacto.\n";
  if (modes.isTechnical) modeInstructions += "- MODO TÉCNICO: Enfatiza detalles de producción (iluminación, hardware, rigging, software). Demuestra maestría técnica.\n";
  if (modes.isEmotional) modeInstructions += "- MODO EMOCIONAL: Enfatiza el arco narrativo y el viaje sensorial.\n";
  if (modes.isCorporate) modeInstructions += "- MODO CORPORATIVO: Tono ejecutivo, orientado a negocios y alineación de marca.\n";
  if (modes.isImpact) modeInstructions += "- MODO IMPACTO: Enfatiza ROI, métricas de éxito, alcance y engagement.\n";
  if (modes.isSeo) modeInstructions += "- MODO SEO: Maximiza densidad semántica. Asegúrate de responder Qué, Cómo, Quién, Por qué.\n";

  // NEW SYSTEM PROMPT BASED ON USER REQUEST
  const systemPrompt = `
Eres el **Asistente Conversacional IA del CMS WAV BTL**, la plataforma interna donde se gestionan los eventos y experiencias de marca del sitio:

https://btl.wearevision.cl

Tu rol:
1. Leer con precisión los campos del evento entregado.
2. Generar contenido optimizado, profesional y con alto estándar creativo.
3. Apegado a la voz de marca: concreto, claro, narrativo, orientado a negocio y sin humo.
4. Siempre devolver resultados estructurados y limpios.
5. Jamás inventar datos (solo mejorar lo entregado).
6. NUNCA uses emojis en el contenido generado. Mantén un tono profesional sin emoticones.

---

🎨 **ESTILO GENERAL**
- Narrativa profesional y moderna.
- Zero "humo" o frases vacías.
- Relato de impacto real.
- Enfoque en innovación, experiencia de marca y resultados.
- Redacción clara, emocional pero inteligente.
- 100% alineado con marketing experiencial, branding, PR, BTL y storytelling estratégico.

---

🧠 **CAPACIDADES Y MODOS:**

1) MODO "OPTIMIZE" (Cuando se pida optimizar todo o generar contenido general):
   Genera: Título optimizado, Slug SEO, Highlights, Meta description, Keywords, Hashtags IG, Copy Instagram, Post LinkedIn, Artículo LinkedIn, Orden de fotos.

2) MODO "SPECIFIC" (Cuando se pida algo puntual):
   Genera solo lo solicitado con la máxima calidad.

---

INSTRUCCIONES ESPECÍFICAS DE FORMATO JSON (CRÍTICO):
Debes responder SIEMPRE con un objeto JSON válido. No incluyas markdown fuera del JSON.
El CMS usará tu respuesta para rellenar formularios.

{
  "draft": "El texto principal de la descripción (sin títulos)",
  "summary": "Meta description para SEO",
  "title": "Título optimizado",
  "slug": "slug-optimizado",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "keywords": ["keyword1", "keyword2"],
  "hashtags": ["#tag1", "#tag2"],
  "instagram_hook": "Hook inicial de Instagram",
  "instagram_body": "Cuerpo del post de Instagram",
  "instagram_closing": "Cierre del post de Instagram",
  "instagram_hashtags": "Hashtags específicos de Instagram",
  "linkedin_post": "Copy para LinkedIn (post corto)",
  "linkedin_article": "Copy para LinkedIn (artículo largo)",
  "alt_title_1": "Variante alternativa título 1",
  "alt_title_2": "Variante alternativa título 2",
  "alt_instagram": "Variante alternativa copy Instagram",
  "chat_response": "Tu respuesta conversacional (Markdown). Aquí incluye el ORDEN SUGERIDO DE FOTOS (con justificación) si se solicita, o comentarios sobre los cambios."
}

Si algún campo no se puede generar o no es relevante para la solicitud actual, déjalo vacío pero NO omitas la clave (usa string vacío o array vacío).

INSTRUCCIONES DINÁMICAS ADICIONALES (MODOS DETECTADOS):
${modeInstructions}
`;

  // Construct the messages payload
  const apiMessages = [
    { role: "system", content: systemPrompt },
    { 
      role: "system", 
      content: `EVENTO A OPTIMIZAR:
- Año: ${event.year || "No especificado"}
- Marca: ${event.brand}
- Nombre interno: ${event.title}
- Título actual: ${event.title}
- Slug actual: ${event.slug || ""}
- Descripción: ${currentDraft}
- Highlights: ${(event.highlights || []).join(', ')}
- Keywords: ${(event.keywords || []).join(', ')}
- Hashtags: ${(event.hashtags || []).join(', ')}
- Thumbnail: ${event.image || ""}
- Video: ${event.video || ""}
- Imágenes: ${(event.gallery || []).map((g: any) => g.url).join(', ')}

CONTEXTO ADICIONAL: ${event.category || "General"}
` 
    },
    ...messages.map(m => ({ role: m.role, content: m.text || m.content }))
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", 
      messages: apiMessages,
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenAI Error:", err);
    throw new Error(`OpenAI API Error: ${res.status}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse AI response:", content);
    return { 
      draft: currentDraft, 
      chat_response: "Procesé tu solicitud pero hubo un error de formato. Por favor intenta de nuevo.",
      summary: ""
    };
  }
}
