/**
 * Content Rules (Server Copy)
 * 
 * Este es una copia de las definiciones necesarias del lado del servidor.
 * Solo incluye SEED_CATEGORIES para evitar duplicar todo el archivo.
 */

export interface EventCategory {
  id: string;
  label: string;
  description: string;
  seoDescription: string;
  keywords: string[];
  isCore: boolean;
  eventCount?: number;
  createdAt: string;
  isArchived: boolean;
}

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
