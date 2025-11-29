/**
 * WAV BTL — Content Rules & Validation System
 * 
 * Este archivo define las reglas globales de longitud para todos los campos de contenido.
 * Las reglas están optimizadas para:
 * 1. SEO & AI Indexing (Google, meta tags, keywords)
 * 2. Responsive Layout (textos predecibles = CSS más simple)
 * 3. Social Media Best Practices (Instagram, LinkedIn)
 * 
 * IMPORTANTE: Estas reglas son respetadas por:
 * - Validadores en tiempo real (UI feedback)
 * - Sistema de generación con IA (prompts + truncado)
 * - Componentes responsive (truncado por breakpoint)
 */

export interface ContentRule {
  min: number;
  max: number;
  seoReason: string;
  layoutReason: string;
  aiPrompt: string;
  responsive: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const CONTENT_RULES: Record<string, ContentRule> = {
  brand: {
    min: 2,
    max: 50,
    seoReason: "Nombre de marca sin keywords stuffing. Identidad clara para indexación.",
    layoutReason: "Cabe en header de tarjeta sin line break. 1 línea máximo en mobile.",
    aiPrompt: "Usa el nombre oficial de la marca exacto, sin descriptores adicionales ni adjetivos.",
    responsive: { 
      mobile: 30,   // Truncar en mobile si excede
      tablet: 40, 
      desktop: 50 
    }
  },
  
  title: {
    min: 10,
    max: 60,
    seoReason: "Título optimizado para <title> tag. Google trunca en ~60 caracteres en SERPs.",
    layoutReason: "2 líneas máximo en tarjeta (30 chars/línea). Evita overflow en modales.",
    aiPrompt: "Genera título descriptivo de máximo 60 caracteres. Incluye verbo de acción y diferenciador clave.",
    responsive: { 
      mobile: 40,   // 2 líneas en mobile
      tablet: 50,   // 2 líneas en tablet
      desktop: 60 
    }
  },
  
  summary: {
    min: 50,
    max: 160,
    seoReason: "Meta description ideal. Google muestra 150-160 chars en resultados de búsqueda.",
    layoutReason: "3 líneas máximo en preview card. Perfecto para hover states y list views.",
    aiPrompt: "Genera resumen ejecutivo de 150 caracteres. Enfoque en valor único y diferenciador del evento.",
    responsive: { 
      mobile: 100,  // 3 líneas
      tablet: 130,  // 3 líneas
      desktop: 160 
    }
  },
  
  description: {
    min: 100,
    max: 800,
    seoReason: "Contenido sustancial para indexación. 2-3 párrafos con keywords naturales.",
    layoutReason: "Scroll contenido en modal. Máximo 800 chars previene scroll infinito y mantiene focus.",
    aiPrompt: "Genera 2-3 párrafos (máx 800 chars total): 1) Contexto, 2) Ejecución técnica, 3) Impacto/resultados.",
    responsive: { 
      mobile: 300,  // Truncado con "Leer más..."
      tablet: 500, 
      desktop: 800 
    }
  },
  
  instagram_hook: {
    min: 20,
    max: 100,
    seoReason: "Primera línea visible en feed. Instagram trunca en ~125 pero mejor práctica es 80-100.",
    layoutReason: "1-2 líneas máximo. Debe captar atención inmediata sin scroll.",
    aiPrompt: "Genera hook emocional de 80-100 caracteres. Usa pregunta retórica o afirmación impactante. Sin emojis en el hook.",
    responsive: { 
      mobile: 100, 
      tablet: 100, 
      desktop: 100 
    }
  },
  
  instagram_body: {
    min: 100,
    max: 1000,
    seoReason: "Storytelling completo con keywords naturales. Instagram permite 2200 chars pero engagement peak es 800-1000.",
    layoutReason: "Formato legible con line breaks. No abrumar al lector.",
    aiPrompt: "Genera post para Instagram (máx 1000 chars): storytelling + 3-5 emojis estratégicos + CTA claro. Incluye line breaks cada 2-3 oraciones.",
    responsive: { 
      mobile: 1000, 
      tablet: 1000, 
      desktop: 1000 
    }
  },
  
  instagram_closing: {
    min: 20,
    max: 150,
    seoReason: "Call to action final. Complementa el body sin ser repetitivo.",
    layoutReason: "Cierre memorable que refuerza mensaje principal.",
    aiPrompt: "Genera cierre impactante de 100-150 chars. CTA claro o pregunta que incentive comentarios/guardados.",
    responsive: { 
      mobile: 150, 
      tablet: 150, 
      desktop: 150 
    }
  },
  
  instagram_hashtags: {
    min: 10,
    max: 300,
    seoReason: "Mix estratégico de reach (populares) + engagement (nicho) + branding. 10-15 hashtags es sweet spot.",
    layoutReason: "Separados por espacios. Mostrar en línea compacta al final del post.",
    aiPrompt: "Genera 10-15 hashtags separados por espacios: 3 de alto volumen (100k+ posts) + 5 de nicho (10k-50k) + 2 branded. Sin # al inicio.",
    responsive: { 
      mobile: 300, 
      tablet: 300, 
      desktop: 300 
    }
  },
  
  linkedin_post: {
    min: 150,
    max: 1300,
    seoReason: "LinkedIn favorece posts 1000-1300 chars para máximo engagement. Menos = superficial, Más = truncado.",
    layoutReason: "3-5 párrafos con formato profesional. Line breaks cada 2-3 oraciones para legibilidad.",
    aiPrompt: "Genera post de LinkedIn (1000-1300 chars): 1) Hook profesional, 2) Contexto/problema, 3) Insights técnicos, 4) CTA o reflexión. Tono formal pero humano.",
    responsive: { 
      mobile: 1300, 
      tablet: 1300, 
      desktop: 1300 
    }
  },
  
  linkedin_article: {
    min: 300,
    max: 2000,
    seoReason: "Artículo profundo para LinkedIn Pulse o perfil. Google indexa artículos de LinkedIn.",
    layoutReason: "Formato largo para lectores comprometidos. Estructura con subtítulos implícitos.",
    aiPrompt: "Genera artículo de LinkedIn (1500-2000 chars): Introducción + 3 secciones temáticas + Conclusión. Tono thought leadership.",
    responsive: { 
      mobile: 2000, 
      tablet: 2000, 
      desktop: 2000 
    }
  },
  
  alt_title_1: {
    min: 10,
    max: 60,
    seoReason: "Variante de título para A/B testing o diferentes canales de distribución.",
    layoutReason: "Mismo constraint que title principal. Intercambiable sin romper layout.",
    aiPrompt: "Genera título alternativo con enfoque diferente al principal. Usa otro ángulo narrativo pero mantén keywords core.",
    responsive: { 
      mobile: 40, 
      tablet: 50, 
      desktop: 60 
    }
  },
  
  alt_title_2: {
    min: 10,
    max: 60,
    seoReason: "Segunda variante para testing avanzado. Permite optimizar mensajes por audiencia.",
    layoutReason: "Mismo constraint que title principal.",
    aiPrompt: "Genera segunda variante de título. Prueba un tono completamente distinto (ej: si title_1 es técnico, prueba emocional).",
    responsive: { 
      mobile: 40, 
      tablet: 50, 
      desktop: 60 
    }
  },
  
  slug: {
    min: 5,
    max: 80,
    seoReason: "URL-friendly identifier. SEO crítico: sin tildes, lowercase, keywords separados por guiones.",
    layoutReason: "Debe ser legible en barra de navegación y compartible.",
    aiPrompt: "Genera slug SEO: año-marca-evento en formato kebab-case. Sin artículos (el/la/los/las), sin tildes, sin caracteres especiales.",
    responsive: { 
      mobile: 80, 
      tablet: 80, 
      desktop: 80 
    }
  },
  
  highlights: {
    min: 50,
    max: 500,
    seoReason: "Bullet points clave para featured snippets de Google. Estructura fácil de indexar.",
    layoutReason: "3-5 highlights de 80-100 chars cada uno. Mostrar como lista en UI.",
    aiPrompt: "Genera 3-5 highlights concretos y diferenciadores. Cada uno 80-100 chars. Sin humo ni adjetivos vacíos. Formato: array de strings.",
    responsive: { 
      mobile: 500, 
      tablet: 500, 
      desktop: 500 
    }
  },
  
  keywords: {
    min: 20,
    max: 200,
    seoReason: "Keywords primarios y secundarios para meta tags y búsqueda interna.",
    layoutReason: "Lista separada por comas. 5-10 keywords relevantes.",
    aiPrompt: "Genera 5-10 keywords SEO separados por comas. Mix de: marca, industria, tipo de evento, tecnologías, locación.",
    responsive: { 
      mobile: 200, 
      tablet: 200, 
      desktop: 200 
    }
  },
  
  hashtags: {
    min: 10,
    max: 200,
    seoReason: "Hashtags generales (no específicos de plataforma). Para metadata y búsqueda.",
    layoutReason: "Lista compacta. Usado en múltiples contextos.",
    aiPrompt: "Genera 5-8 hashtags generales separados por espacios. Enfoque en industria y tema, no en social media vanity metrics.",
    responsive: { 
      mobile: 200, 
      tablet: 200, 
      desktop: 200 
    }
  }
};

/**
 * EventCategory — Estructura dinámica de categorías
 * 
 * Las categorías ahora se gestionan desde el CMS y se almacenan en KV store.
 * Este archivo solo define la estructura de datos.
 */
export interface EventCategory {
  id: string;                    // slug-safe identifier (ej: "activacion-de-marca")
  label: string;                 // Display name (ej: "Activación de Marca")
  description: string;           // Descripción breve para CMS
  seoDescription: string;        // Optimizada 150-160 chars para meta tags
  keywords: string[];            // Keywords para auto-detección (lowercase, sin tildes)
  isCore: boolean;               // true = categoría core recomendada por IA para SEO
  eventCount?: number;           // Calculado dinámicamente (no se guarda en DB)
  createdAt: string;             // ISO timestamp
  isArchived: boolean;           // Soft delete flag
}

/**
 * Categorías SEED (7 core basadas en análisis SEO)
 * 
 * Estas son las categorías iniciales recomendadas basadas en:
 * - Alto potencial de búsqueda SEO
 * - Claridad taxonomica
 * - Relevancia para portafolio BTL
 * 
 * El usuario puede agregar/editar/eliminar desde el CMS.
 */
export const SEED_CATEGORIES: EventCategory[] = [
  // 7 Core Categories (SEO optimized)
  {
    id: 'btl',
    label: 'BTL',
    description: 'Campañas below the line, experienciales y activaciones',
    seoDescription: 'Producción y ejecución de eventos BTL (Below The Line): experiencias de marca, activaciones en punto de venta y campañas experienciales en Chile.',
    keywords: ['btl', 'below the line', 'experiencial', 'activacion', 'punto de venta'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'ttl',
    label: 'TTL',
    description: 'Through the line - Integración de medios ATL y BTL',
    seoDescription: 'Campañas TTL (Through The Line) que integran estrategias above y below the line para máximo impacto en Chile y Latinoamérica.',
    keywords: ['ttl', 'through the line', 'integracion', '360', 'campana integral'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'activacion-de-marca',
    label: 'Activación de Marca',
    description: 'Experiencias de marca y brand activations',
    seoDescription: 'Activaciones de marca experienciales: eventos inmersivos, sampling, demostraciones de producto y experiencias memorables para consumidores.',
    keywords: ['activacion', 'brand activation', 'experiencia de marca', 'sampling', 'demostracion'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'lanzamiento',
    label: 'Lanzamiento',
    description: 'Lanzamientos de productos, servicios y campañas',
    seoDescription: 'Eventos de lanzamiento: productos, servicios, campañas y marcas. Producción integral de launch events y presentaciones corporativas.',
    keywords: ['lanzamiento', 'launch', 'estreno', 'presentacion', 'unveiling'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'corporativo',
    label: 'Corporativo',
    description: 'Eventos corporativos, conferencias y reuniones',
    seoDescription: 'Producción de eventos corporativos: conferencias, seminarios, reuniones estratégicas, team building y celebraciones empresariales.',
    keywords: ['corporativo', 'empresa', 'conferencia', 'seminario', 'team building', 'empresa'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'influencer-marketing',
    label: 'Influencer Marketing',
    description: 'Campañas con influencers y creadores de contenido',
    seoDescription: 'Estrategias de influencer marketing: gestión de campañas con creadores de contenido, activaciones digitales y eventos con influencers.',
    keywords: ['influencer', 'creator', 'digital', 'redes sociales', 'content creator'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'guerrilla-marketing',
    label: 'Guerrilla Marketing',
    description: 'Tácticas no convencionales y activaciones disruptivas',
    seoDescription: 'Guerrilla marketing: tácticas creativas y disruptivas, street marketing, flash mobs y activaciones no convencionales de alto impacto.',
    keywords: ['guerrilla', 'street marketing', 'flash mob', 'disruptivo', 'no convencional'],
    isCore: true,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  
  // 3 Optional Categories (non-core, can be added from CMS)
  {
    id: 'pr-prensa',
    label: 'PR & Prensa',
    description: 'Relaciones públicas y eventos de prensa',
    seoDescription: 'Gestión de eventos de prensa: conferencias, comunicados, media tours y estrategias de relaciones públicas.',
    keywords: ['pr', 'prensa', 'relaciones publicas', 'media', 'periodismo'],
    isCore: false,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'stands-exhibiciones',
    label: 'Stands & Exhibiciones',
    description: 'Diseño y montaje de stands para ferias',
    seoDescription: 'Diseño, producción y montaje de stands para ferias comerciales, exposiciones y exhibiciones empresariales.',
    keywords: ['stand', 'feria', 'exhibicion', 'expo', 'muestra'],
    isCore: false,
    createdAt: new Date().toISOString(),
    isArchived: false
  },
  {
    id: 'eventos-sociales',
    label: 'Eventos Sociales',
    description: 'Celebraciones, fiestas y reuniones sociales',
    seoDescription: 'Producción de eventos sociales corporativos: fiestas de fin de año, aniversarios, celebraciones y reuniones de equipo.',
    keywords: ['fiesta', 'celebracion', 'reunion', 'social', 'fin de ano', 'aniversario'],
    isCore: false,
    createdAt: new Date().toISOString(),
    isArchived: false
  }
];

/**
 * Helper para validar un campo en tiempo real
 */
export interface ValidationResult {
  valid: boolean;
  length: number;
  min: number;
  max: number;
  message: string;
  severity: 'success' | 'warning' | 'error';
}

export const validateField = (field: string, value: string): ValidationResult => {
  const rule = CONTENT_RULES[field];
  
  if (!rule) {
    return { 
      valid: true, 
      length: value?.length || 0, 
      min: 0, 
      max: Infinity, 
      message: '', 
      severity: 'success' 
    };
  }
  
  const length = value?.length || 0;
  const min = rule.min;
  const max = rule.max;
  
  // Error: fuera de rango
  if (length < min) {
    return {
      valid: false,
      length,
      min,
      max,
      message: `Mínimo ${min} caracteres (faltan ${min - length})`,
      severity: 'error'
    };
  }
  
  if (length > max) {
    return {
      valid: false,
      length,
      min,
      max,
      message: `Máximo ${max} caracteres (sobran ${length - max})`,
      severity: 'error'
    };
  }
  
  // Warning: cerca del límite superior (>90%)
  if (length > max * 0.9) {
    return {
      valid: true,
      length,
      min,
      max,
      message: `⚠️ Cerca del límite (${length}/${max})`,
      severity: 'warning'
    };
  }
  
  // Success
  return {
    valid: true,
    length,
    min,
    max,
    message: `✓ ${length}/${max}`,
    severity: 'success'
  };
};

/**
 * Helper para truncar texto según breakpoint
 */
export const truncateForBreakpoint = (
  field: string, 
  value: string, 
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): string => {
  const rule = CONTENT_RULES[field];
  if (!rule) return value;
  
  const maxLength = rule.responsive[breakpoint];
  if (value.length <= maxLength) return value;
  
  return value.substring(0, maxLength - 3) + '...';
};

/**
 * Helper para obtener sugerencias de IA basadas en reglas
 */
export const getAIPromptForField = (field: string, context?: Record<string, any>): string => {
  const rule = CONTENT_RULES[field];
  if (!rule) return `Genera contenido para el campo ${field}`;
  
  let prompt = rule.aiPrompt;
  
  // Agregar contexto si está disponible
  if (context) {
    prompt += `\n\nContexto del evento:`;
    if (context.brand) prompt += `\n- Marca: ${context.brand}`;
    if (context.title) prompt += `\n- Título: ${context.title}`;
    if (context.description) prompt += `\n- Descripción: ${context.description.substring(0, 200)}...`;
    if (context.category) prompt += `\n- Categoría: ${context.category}`;
  }
  
  return prompt;
};

/**
 * Helper para obtener color según severidad
 */
export const getValidationColor = (severity: ValidationResult['severity']): string => {
  switch (severity) {
    case 'success': return 'text-green-400';
    case 'warning': return 'text-orange-400';
    case 'error': return 'text-red-400';
    default: return 'text-neutral-400';
  }
};
