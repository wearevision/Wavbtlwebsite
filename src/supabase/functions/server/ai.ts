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

  // NEW SYSTEM PROMPT WITH VISION CAPABILITIES
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

👁️ **ANÁLISIS VISUAL ACTIVADO:**

Tienes acceso a las imágenes reales del evento. ÚSALAS para:

1. **Inferir el Vibe:** ¿Es de día/noche? ¿Formal/Fiesta? ¿Tech/Orgánico? Ajusta el campo \`tone\`.
   - Ejemplo: Si ves luces de neón y DJ, es "Energético, Festivo"
   - Si ves ejecutivos en trajes y presentación PowerPoint, es "Corporativo, Premium"
   - Si ves familias con niños en un mall, es "Familiar, Masivo"

2. **Estimar Escala:** Mira la multitud para ajustar \`attendees\` y \`kpis\` si faltan.
   - Foto con 50-200 personas → "Evento corporativo, 300-800 asistentes"
   - Foto con multitud masiva → "Evento masivo, 5,000-20,000 asistentes"
   - Stand en mall con flujo constante → "Activación retail, 8,000-15,000 asistentes"

3. **Describir Tecnología:** Identifica pantallas LED, luces, estructuras, domos, etc., para el \`technical_summary\`.
   - Ejemplo visual: "Pantalla LED curva de 6x3m, iluminación robótica Martin MAC Viper, estructura modular truss 12x12m"
   - Busca: Proyectores, pantallas táctiles, VR/AR headsets, lighting rigs, sound systems
   - Especifica: Tamaño aproximado, tipo de tecnología, disposición espacial

4. **Realismo:** Usa detalles visuales (colores, ropa de la gente, decoración) para enriquecer la \`description\` y el \`linkedin_post\`.
   - Colores corporativos visibles → Menciónalos
   - Branding visible → Describe la integración visual
   - Ambiente (decoración, props, escenografía) → Incluye en la narrativa

5. **Contexto Geográfico:** Identifica elementos visuales que indiquen la ubicación.
   - Logos de centros comerciales, señalética, arquitectura reconocible
   - Ayuda a inferir \`venue\`, \`city\`, \`country\`

**CRUCIAL:** Si las imágenes NO están disponibles o son URLs inválidas, trabaja SOLO con los datos textuales.

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
   - Título optimizado (NUNCA incluir la marca "WAV BTL" ni "We Are Vision". El título debe ser SOLO el nombre del evento, limpio y directo. Ejemplo: "Reunión 2016" NO "Reunión WAV BTL 2016")
   - Slug SEO-friendly (lowercase, guiones)
   - Description (W4 format: What, When, Where, Why + métricas) **MAX 800 CARACTERES**
   - Summary/Meta description (max 155 chars)
   
   **Editorial:**
   - Tono de comunicación (Premium, Corporativo, Festivo, Juvenil, Técnico)
   - Audiencia/Target (específico, ej: "Millennials 25-35, NSE ABC1")
   - Highlights (3-5 puntos clave, accionables) **cada uno MAX 100 caracteres**
   
   **SEO & Metadata:**
   - SEO Title (max 60 chars, keywords adelante, SIN marca "WAV BTL" ni "We Are Vision") **OBLIGATORIO MAX 60 CARACTERES**
   - SEO Description (max 155 chars, incluye CTA) **OBLIGATORIO MAX 155 CARACTERES**
   - Keywords (5-8: branded + location + category + long-tail)
   - Tags internos (3-5 para filtros)
   - Hashtags (15-20: branded + category + location + trending)
   
   **Social Media:**
   - Instagram: Hook, Body, Closing, Hashtags, Alt copy para A/B
   - LinkedIn: Post breve (max 1,300 chars), Artículo largo profesional
   
   **A/B Testing:**
   - 2 títulos alternativos (diferentes ángulos, SIN marca "WAV BTL" ni "We Are Vision")
   - 2 resúmenes alternativos
   
   **Performance & Location (TODOS OBLIGATORIOS - INFERIR SI NO EXISTEN):**
   - Cliente (inferir si es diferente de la marca)
   - Year (inferir del contexto o usar año actual)
   - Month (inferir del contexto o dejar vacío)
   - Country (inferir de la ciudad o usar "Chile" por defecto)
   - City (inferir del contexto o usar "Santiago" si no hay info)
   - Venue (inferir según tipo de evento: Mall, Teatro, Centro de Eventos, Espacio Público, etc.)
   - Category (clasificar correctamente)
   - Subcategory (especificar tipo más granular)
   - People_reached (inferir según tipo de evento: retail 150K-300K, eventos corporativos 500-2K, festivales 5K-50K)
   - Attendees (inferir según tipo de evento: lanzamientos 300-800, activaciones 1K-5K, eventos masivos 5K-20K)
   - Days (inferir según tipo de evento: lanzamientos 1 día, activaciones retail 10-15 días, giras 30-90 días)
   - Cities (inferir si es gira nacional o evento local: 1 ciudad o "Santiago, Valparaíso, Concepción")
   - Screens (inferir según tipo de evento: retail 2-4, eventos grandes 8-16, festivales 4-8)
   - KPIs (3-5 métricas cuantificables y realistas según tipo de evento)
   - Results_notes (párrafo agradecido, 150-250 chars, enfocado en logros y aprendizajes)
   
   **Inferencia Inteligente (CRÍTICO - USA ESTOS PATRONES):**
   
   EVENTOS RETAIL / ACTIVACIONES:
   - Duration: 10-15 días típico
   - Alcance: 150,000-300,000 personas
   - Asistentes: 8,000-15,000
   - Venue: "Mall Plaza", "Costanera Center", "Parque Arauco"
   - Screens: 2-4
   - Tone: "Festivo, Masivo"
   - Audience: "Familias, Shoppers, NSE ABC1C2"
   
   LANZAMIENTOS DE PRODUCTO / EVENTOS CORPORATIVOS:
   - Duration: 1 día
   - Alcance: 800-2,000 personas (prensa + invitados + redes)
   - Asistentes: 300-800
   - Venue: "Teatro Municipal", "Centro de Eventos CasaPiedra", "Hotel W"
   - Screens: 4-8
   - Tone: "Premium, Corporativo"
   - Audience: "Ejecutivos, Prensa, Stakeholders, Influencers"
   
   FESTIVALES / EVENTOS MASIVOS:
   - Duration: 2-3 días
   - Alcance: 30,000-100,000 personas
   - Asistentes: 5,000-20,000
   - Venue: "Parque Bicentenario", "Movistar Arena", "Espacio Riesco"
   - Screens: 8-16
   - Tone: "Energético, Juvenil"
   - Audience: "Jóvenes 18-35, Millennials, Fanáticos"
   
   GIRAS NACIONALES:
   - Duration: 30-90 días
   - Cities: "Santiago, Valparaíso, Concepción, La Serena, Puerto Montt"
   - Alcance: 500,000-1,000,000 personas
   - Asistentes: 50,000-150,000
   - Tone: "Masivo, Festivo"
   
   **En chat_response:** Justificación de las inferencias realizadas, análisis visual de las imágenes, y orden sugerido de fotos.

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
  "title": "Título optimizado (SIN marca)",
  "slug": "slug-optimizado",
  
  "tone": "Tono de comunicación (ej: Corporativo, Festivo, Premium, Juvenil)",
  "audience": "Audiencia/Target (ej: Millennials, Ejecutivos, Familias)",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  
  "seo_title": "Título SEO optimizado (max 60 caracteres, SIN marca)",
  "seo_description": "Descripción SEO optimizada (max 155 caracteres)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "tags": ["tag1", "tag2", "tag3"],
  
  "instagram_hook": "Hook inicial impactante de Instagram",
  "instagram_body": "Cuerpo del post de Instagram",
  "instagram_closing": "Cierre del post de Instagram con CTA",
  "instagram_hashtags": "#hashtag1 #hashtag2 #tag3",
  "alt_instagram": "Variante alternativa copy Instagram para A/B testing",
  
  "linkedin_post": "Copy breve para LinkedIn (máx 1,300 caracteres)",
  "linkedin_article": "Artículo largo para LinkedIn (profesional y detallado)",
  
  "alt_title_1": "Variante alternativa título 1 (SIN marca)",
  "alt_title_2": "Variante alternativa título 2 (SIN marca)",
  "alt_summary_1": "Variante alternativa resumen 1",
  "alt_summary_2": "Variante alternativa resumen 2",
  
  "kpis": ["KPI 1: +35% engagement", "KPI 2: 50K alcance", "KPI 3: 2,500 asistentes"],
  
  "client": "Nombre del cliente (si es diferente de la marca)",
  "year": "2024",
  "month": "Enero",
  "country": "Chile",
  "city": "Santiago",
  "venue": "Nombre del recinto/venue",
  "subcategory": "Subcategoría específica",
  "people_reached": "150000",
  "attendees": "12000",
  "days": "12",
  "cities": "Santiago" o "Santiago, Valparaíso, Concepción",
  "screens": "4",
  "results_notes": "Notas agradecidas sobre resultados (150-250 chars)",
  
  "og_image": "URL de la imagen para OpenGraph/redes sociales - DEBE ser la event.image o primera imagen pública de gallery. Ejemplo: https://... NO uses URLs locales. SIEMPRE usa una URL HTTPS válida.",
  
  "chat_response": "Tu respuesta conversacional (Markdown). Aquí incluye la JUSTIFICACIÓN DE LAS INFERENCIAS, ANÁLISIS VISUAL de las imágenes provistas, y orden sugerido de fotos."
}

Si algún campo no se puede generar o no es relevante para la solicitud actual, déjalo vacío pero NO omitas la clave (usa string vacío o array vacío).

REGLAS CRÍTICAS (NO NEGOCIABLES):
- ❌ NO incluir la marca "WAV BTL" ni "We Are Vision" en títulos (title, alt_title_1, alt_title_2, seo_title)
- ❌ NO usar "humo" o frases vacías como "experiencia única", "inolvidable", "revolucionario", "disruptivo"
- ❌ NO exagerar métricas o resultados sin respaldo visual
- ❌ NO usar emojis en ningún campo (excepto chat_response)
- ❌ NO inventar datos que no estén en la información provista

✅ **BUENAS PRÁCTICAS OBLIGATORIAS:**
- ✅ Títulos limpios y directos (Ejemplo correcto: "Reunión 2016", NO "Reunión WAV BTL 2016")
- ✅ Descripciones concretas basadas en hechos visuales y datos reales
- ✅ Métricas realistas inferidas del tipo de evento y escala visual
- ✅ Lenguaje profesional sin adornos innecesarios
- ✅ Enfoque en impacto tangible y resultados medibles

⚠️ LÍMITES DE CARACTERES OBLIGATORIOS (HARD LIMITS):
- draft: MAX 800 caracteres (descripción principal)
- title: MAX 100 caracteres
- summary: MAX 160 caracteres
- seo_title: MAX 60 caracteres (CRÍTICO para Google)
- seo_description: MAX 155 caracteres (CRÍTICO para Google)
- tone: MAX 50 caracteres
- audience: MAX 150 caracteres
- highlights: cada elemento MAX 100 caracteres
- instagram_hook: MAX 150 caracteres
- instagram_body: MAX 500 caracteres
- instagram_closing: MAX 150 caracteres
- instagram_hashtags: MAX 300 caracteres
- alt_instagram: MAX 500 caracteres
- linkedin_post: MAX 1,300 caracteres
- alt_title_1/2: MAX 100 caracteres
- alt_summary_1/2: MAX 160 caracteres
- client: MAX 100 caracteres
- venue: MAX 200 caracteres
- subcategory: MAX 100 caracteres
- results_notes: MAX 300 caracteres
- keywords: cada elemento MAX 50 caracteres
- tags: cada elemento MAX 50 caracteres
- hashtags: cada elemento MAX 30 caracteres
- kpis: cada elemento MAX 150 caracteres

SI EXCEDES ESTOS LÍMITES, EL BACKEND TRUNCARÁ AUTOMÁTICAMENTE TU RESPUESTA.

---

TONE OF VOICE OBLIGATORIO:
✅ Profesional, descriptivo, agradecido, realista
❌ Marketing humo, clichés vacíos, exageraciones, vaguedades

⚠️ **PROHIBICIONES ESTRICTAS (NO NEGOCIABLES):**
- ❌ NO incluir la marca "WAV BTL" ni "We Are Vision" en títulos (title, alt_title_1, alt_title_2, seo_title)
- ❌ NO usar "humo" o frases vacías como "experiencia única", "inolvidable", "revolucionario", "disruptivo"
- ❌ NO exagerar métricas o resultados sin respaldo visual
- ❌ NO usar emojis en ningún campo (excepto chat_response)
- ❌ NO inventar datos que no estén en la información provista

✅ **BUENAS PRÁCTICAS OBLIGATORIAS:**
- ✅ Títulos limpios y directos (Ejemplo correcto: "Reunión 2016", NO "Reunión WAV BTL 2016")
- ✅ Descripciones concretas basadas en hechos visuales y datos reales
- ✅ Métricas realistas inferidas del tipo de evento y escala visual
- ✅ Lenguaje profesional sin adornos innecesarios
- ✅ Enfoque en impacto tangible y resultados medibles

INSTRUCCIONES DINÁMICAS ADICIONALES (MODOS DETECTADOS):
${modeInstructions}
`;

  // ============================================================
  // VISION CAPABILITIES: Extract and prepare images
  // ============================================================
  
  const imageUrls: string[] = [];
  
  // Helper function to validate if a URL is publicly accessible
  const isValidPublicUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Must start with http/https (includes Supabase Storage URLs)
    if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
    
    // Exclude localhost and local development URLs
    if (url.includes('localhost') || url.includes('127.0.0.1') || url.includes('0.0.0.0')) return false;
    
    // Exclude figma:asset and other virtual schemes (not accessible by OpenAI)
    if (url.includes('figma:') || url.includes('blob:')) return false;
    
    // Check for valid image file extensions that OpenAI supports
    // OpenAI Vision API supports: png, jpeg, jpg, gif, webp
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const urlLower = url.toLowerCase();
    
    // Remove query parameters and hash before checking extension
    const urlWithoutQuery = urlLower.split('?')[0].split('#')[0];
    
    // Check if URL ends with a valid extension
    const hasValidExtension = validExtensions.some(ext => urlWithoutQuery.endsWith(ext));
    
    if (!hasValidExtension) {
      console.log(`⚠️  [Vision] URL doesn't have a valid image extension (png, jpg, jpeg, gif, webp): ${url.substring(0, 80)}...`);
      return false;
    }
    
    // ✅ Supabase Storage URLs are valid (https://xxxxx.supabase.co/storage/v1/object/public/...)
    // ✅ Signed URLs are also valid (contain /storage/ path)
    
    return true;
  };
  
  // 1. Add main cover image if valid
  if (isValidPublicUrl(event.image)) {
    imageUrls.push(event.image);
    console.log(`✅ [Vision] Main cover image added: ${event.image.substring(0, 60)}...`);
  } else if (event.image) {
    console.log(`⚠️  [Vision] Skipping invalid cover image URL: ${event.image.substring(0, 60)}...`);
  }
  
  // 2. Add up to 3 gallery images to save tokens
  if (Array.isArray(event.gallery)) {
    event.gallery.slice(0, 3).forEach((item: any, idx: number) => {
      const url = item?.url || item;
      if (isValidPublicUrl(url)) {
        imageUrls.push(url);
        console.log(`✅ [Vision] Gallery image ${idx + 1} added: ${url.substring(0, 60)}...`);
      } else if (url) {
        console.log(`⚠️  [Vision] Skipping invalid gallery image ${idx + 1}: ${typeof url === 'string' ? url.substring(0, 60) : typeof url}...`);
      }
    });
  }
  
  if (imageUrls.length > 0) {
    console.log(`✅ [Vision] Total valid images for AI analysis: ${imageUrls.length}`);
  } else {
    console.log(`️  [Vision] No valid public images found. AI will work with text data only.`);
  }
  
  // ============================================================
  // Construct User Message Content (Text + Images)
  // ============================================================
  
  const eventDataText = `EVENTO A OPTIMIZAR (DATA TEXTUAL):

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
- Notas de resultados: ${event.results_notes || ""}`;
  
  // Build user content array: text first, then images
  const userContent: any[] = [
    { type: "text", text: eventDataText }
  ];
  
  // Append images in OpenAI Vision format
  imageUrls.forEach((url, index) => {
    userContent.push({
      type: "image_url",
      image_url: {
        url: url,
        detail: "low" // Use "low" to save tokens, "high" for detailed analysis
      }
    });
    console.log(`[Vision] Image ${index + 1}/${imageUrls.length} formatted for Vision API`);
  });
  
  // ============================================================
  // Final Messages Array
  // ============================================================
  
  const apiMessages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userContent }, // Event data with images
  ];
  
  // Append additional chat messages (text only)
  messages.forEach(m => {
    if (m.role && (m.content || m.text)) {
      apiMessages.push({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : (m.text || '')
      });
    }
  });

  console.log(`[Vision] Total messages in API call: ${apiMessages.length}`);
  console.log(`[Vision] Messages structure:`, JSON.stringify(apiMessages.map(m => ({
    role: m.role,
    contentType: Array.isArray(m.content) ? 'array' : typeof m.content
  }))));

  let res;
  try {
    res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Changed from gpt-4o-mini to gpt-4o for Vision support
        messages: apiMessages,
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4096 // Increased for richer responses with visual analysis
      })
    });
  } catch (fetchError: any) {
    console.error("❌ Fetch error to OpenAI:", fetchError);
    throw new Error(`Network error calling OpenAI: ${fetchError.message}`);
  }

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ OpenAI API returned error status:", res.status);
    console.error("❌ OpenAI Error response:", err);
    throw new Error(`OpenAI API Error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("❌ Unexpected OpenAI response structure:", JSON.stringify(data));
    throw new Error("OpenAI returned an unexpected response structure");
  }
  
  const content = data.choices[0].message.content;
  
  if (!content) {
    console.error("❌ OpenAI returned empty content");
    throw new Error("OpenAI returned empty content");
  }
  
  try {
    const parsed = JSON.parse(content);
    console.log("✅ Successfully parsed AI response");
    return parsed;
  } catch (e: any) {
    console.error("❌ Failed to parse AI response as JSON:", content);
    console.error("❌ Parse error:", e.message);
    return { 
      draft: currentDraft, 
      chat_response: "Procesé tu solicitud pero hubo un error de formato. Por favor intenta de nuevo.",
      summary: ""
    };
  }
}