
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

  // DETECT MODES (Legacy support + Helper triggers + MEGA AUDIT MODE)
  const modes = {
    isShorter: ["SHORTER", "RESUMIDO", "BREVE", "CORTO", "LESS", "MENOS"].some(k => textUpper.includes(k)),
    isTechnical: ["TECHNICAL", "TÉCNICO", "TECNICO", "HARDWARE", "RIGGING", "SPECS"].some(k => textUpper.includes(k)),
    isEmotional: ["EMOTIONAL", "STORYTELLING", "EMOCIONAL", "NARRATIVA", "VIAJE", "FEELING"].some(k => textUpper.includes(k)),
    isCorporate: ["CORPORATE", "FORMAL", "INSTITUCIONAL", "EJECUTIVO", "BUSINESS"].some(k => textUpper.includes(k)),
    isSeo: ["SEO", "IA", "SEARCH", "SGE", "GPT", "GOOGLE", "PERPLEXITY", "INDEXING"].some(k => textUpper.includes(k)),
    isImpact: ["IMPACTO", "VALOR", "OBJETIVO", "ROI", "ALCANCE", "RESULTADO", "METRICS"].some(k => textUpper.includes(k)),
    isMegaAudit: ["OPTIMIZAR TODO", "AUDITAR", "LLENAR", "COMPLETAR", "INFERIR", "AUDIT", "FILL ALL"].some(k => textUpper.includes(k)),
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

1) MODO "OPTIMIZE" / "MEGA AUDIT" (Cuando se pida optimizar todo, auditar o completar campos):
   Genera TODOS estos campos obligatoriamente:
   
   **Core Content:**
   - Título optimizado (fórmula: {Brand} | {Event Type} - {Location} {Year})
   - Slug SEO-friendly (lowercase, guiones)
   - Description (W4 format: What, When, Where, Why + métricas)
   - Summary/Meta description (max 155 chars)
   
   **Editorial:**
   - Tono de comunicación (Premium, Corporativo, Festivo, Juvenil, Técnico)
   - Audiencia/Target (específico, ej: "Millennials 25-35, NSE ABC1")
   - Highlights (3-5 puntos clave, accionables)
   
   **SEO & Metadata:**
   - SEO Title (max 60 chars, keywords adelante)
   - SEO Description (max 155 chars, incluye CTA)
   - Keywords (5-8: branded + location + category + long-tail)
   - Tags internos (3-5 para filtros)
   - Hashtags (15-20: branded + category + location + trending)
   
   **Social Media:**
   - Instagram: Hook, Body, Closing, Hashtags, Alt copy para A/B
   - LinkedIn: Post breve (max 1,300 chars), Artículo largo profesional
   
   **A/B Testing:**
   - 2 títulos alternativos (diferentes ángulos)
   - 2 resúmenes alternativos
   
   **Performance & Location:**
   - KPIs (3-5 métricas cuantificables y realistas)
   - Brand, Client, Year, Month, Country, City, Venue
   - Category, Subcategory
   - People reached, Attendees, Days, Cities, Screens
   - Results notes (párrafo agradecido, 150-250 chars)
   
   **Inferencia Inteligente:**
   Si faltan datos, INFIERE basándote en:
   - Tipo de evento (retail → 150K-300K alcance, 10-15 días)
   - Cliente (premium → tone corporativo, venue exclusivo)
   - Ubicación mencionada
   - Patrones de eventos similares
   
   **En chat_response:** Orden sugerido de fotos con justificación

2) MODO "SPECIFIC" (Cuando se pida algo puntual):
   Genera solo lo solicitado con la máxima calidad.

---

INSTRUCCIONES ESPECÍFICAS DE FORMATO JSON (CRÍTICO):
Debes responder SIEMPRE con un objeto JSON válido. No incluyas markdown fuera del JSON.
El CMS usará tu respuesta para rellenar formularios.

ESTRUCTURA JSON COMPLETA (Todos los campos):
{
  "draft": "El texto principal de la descripción (sin títulos)",
  "summary": "Meta description para SEO (max 160 caracteres)",
  "title": "Título optimizado",
  "slug": "slug-optimizado",
  
  "tone": "Tono de comunicación (ej: Corporativo, Festivo, Premium, Juvenil)",
  "audience": "Audiencia/Target (ej: Millennials, Ejecutivos, Familias)",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  
  "seo_title": "Título SEO optimizado (max 60 caracteres)",
  "seo_description": "Descripción SEO optimizada (max 155 caracteres)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "tags": ["tag1", "tag2", "tag3"],
  
  "instagram_hook": "Hook inicial impactante de Instagram",
  "instagram_body": "Cuerpo del post de Instagram",
  "instagram_closing": "Cierre del post de Instagram con CTA",
  "instagram_hashtags": "#hashtag1 #hashtag2 #hashtag3",
  "alt_instagram": "Variante alternativa copy Instagram para A/B testing",
  
  "linkedin_post": "Copy breve para LinkedIn (máx 1,300 caracteres)",
  "linkedin_article": "Artículo largo para LinkedIn (profesional y detallado)",
  
  "alt_title_1": "Variante alternativa título 1",
  "alt_title_2": "Variante alternativa título 2",
  "alt_summary_1": "Variante alternativa resumen 1",
  "alt_summary_2": "Variante alternativa resumen 2",
  
  "kpis": ["KPI 1: +35% engagement", "KPI 2: 50K alcance", "KPI 3: 2,500 asistentes"],
  
  "chat_response": "Tu respuesta conversacional (Markdown). Aquí incluye el ORDEN SUGERIDO DE FOTOS (con justificación) si se solicita, o comentarios sobre los cambios."
}

Si algún campo no se puede generar o no es relevante para la solicitud actual, déjalo vacío pero NO omitas la clave (usa string vacío o array vacío).

REGLAS CRÍTICAS:
- NO uses emojis en ningún campo (excepto chat_response si es necesario)
- Respeta los límites de caracteres especificados
- Los arrays deben tener entre 3-5 elementos como mínimo
- Todos los campos deben estar presentes en el JSON (aunque estén vacíos)

---

🎯 EJEMPLOS DE INFERENCIA INTELIGENTE:

Si el evento dice "Coca-Cola en Santiago":
→ INFIERE: tone="Festivo", audience="Familias y millennials", venue="Mall o espacio público", people_reached="150000-300000", days="10-15"

Si dice "Lanzamiento en Teatro Municipal":
→ INFIERE: tone="Premium, Corporativo", audience="Ejecutivos, prensa, stakeholders", attendees="300-800", category="Lanzamientos de Producto"

Si menciona "Festival de música":
→ INFIERE: tone="Energético, Juvenil", audience="Jóvenes 18-35", people_reached="5000-50000", days="2-3", screens="4-8"

---

TONE OF VOICE OBLIGATORIO:
✅ Profesional, descriptivo, agradecido, realista
❌ Marketing humo, clichés vacíos, exageraciones, vaguedades

INSTRUCCIONES DINÁMICAS ADICIONALES (MODOS DETECTADOS):
${modeInstructions}
`;

  // Construct the messages payload
  const apiMessages = [
    { role: "system", content: systemPrompt },
    { 
      role: "system", 
      content: `EVENTO A OPTIMIZAR:

BÁSICO:
- Marca: ${event.brand}
- Cliente: ${event.client || "N/A"}
- Título actual: ${event.title}
- Slug actual: ${event.slug || ""}
- Descripción actual: ${currentDraft}
- Resumen actual: ${event.summary || ""}
- Categoría: ${event.category || "General"}
- Subcategoría: ${event.subcategory || "N/A"}

LOCALIZACIÓN & FECHA:
- Año: ${event.year || "No especificado"}
- Mes: ${event.month || "N/A"}
- País: ${event.country || "N/A"}
- Ciudad: ${event.city || "N/A"}
- Venue: ${event.venue || "N/A"}

CONTENIDO EDITORIAL ACTUAL:
- Tono: ${event.tone || "No definido"}
- Audiencia: ${event.audience || "No definida"}
- Highlights: ${(event.highlights || []).join(', ') || "No definidos"}

SEO ACTUAL:
- SEO Title: ${event.seo_title || ""}
- SEO Description: ${event.seo_description || ""}
- Keywords: ${(event.keywords || []).join(', ') || "No definidas"}
- Tags: ${(event.tags || []).join(', ') || "No definidos"}
- Hashtags: ${(event.hashtags || []).join(', ') || "No definidos"}

SOCIAL MEDIA ACTUAL:
- Instagram Hook: ${event.instagram_hook || ""}
- Instagram Body: ${event.instagram_body || ""}
- Instagram Closing: ${event.instagram_closing || ""}
- Instagram Hashtags: ${event.instagram_hashtags || ""}
- LinkedIn Post: ${event.linkedin_post || ""}
- LinkedIn Article: ${event.linkedin_article || ""}

PERFORMANCE:
- Alcance: ${event.people_reached || "N/A"}
- Asistentes: ${event.attendees || "N/A"}
- Duración (días): ${event.days || "N/A"}
- Ciudades (gira): ${event.cities || "N/A"}
- Pantallas: ${event.screens || "N/A"}
- KPIs actuales: ${(event.kpis || []).join(', ') || "No definidos"}
- Notas de resultados: ${event.results_notes || ""}

MULTIMEDIA:
- Imagen principal: ${event.image || ""}
- Logo: ${event.logo || ""}
- OG Image: ${event.og_image || ""}
- Galería: ${(event.gallery || []).map((g: any) => g.url).join(', ')}
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
