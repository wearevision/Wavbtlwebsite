/**
 * Generador de Sitemap Dinámico
 * Optimizado para SEO y motores de búsqueda de IA (Google, Bing, ChatGPT, Perplexity, Claude)
 * 
 * Features:
 * - XML Sitemap estándar (Google, Bing)
 * - Metadata enriquecida para IA
 * - Prioridades por tipo de página
 * - Frecuencia de actualización
 * - Última modificación
 * - URLs canónicas
 */

import { WavEvent } from '../types';
import { generateSlug } from './slug';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  // AI-specific metadata
  title?: string;
  description?: string;
  category?: string;
  brand?: string;
  date?: string;
}

export interface SitemapConfig {
  baseUrl: string;
  includeStatic?: boolean;
  includeEvents?: boolean;
  includeCategories?: boolean;
}

/**
 * Genera URLs de eventos desde data completa
 */
export function generateEventUrls(events: WavEvent[], baseUrl: string): SitemapEntry[] {
  return events.map(event => {
    const slug = event.slug || generateSlug(event.title);
    const lastmod = event.updated_at 
      ? new Date(event.updated_at).toISOString()
      : event.created_at
        ? new Date(event.created_at).toISOString()
        : new Date().toISOString();

    return {
      url: `${baseUrl}/event/${slug}`,
      lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8,
      // AI-specific metadata
      title: event.title,
      description: event.description,
      category: event.category,
      brand: event.brand,
      date: event.date,
    };
  });
}

/**
 * Genera URLs estáticas del sitio
 */
export function generateStaticUrls(baseUrl: string): SitemapEntry[] {
  const now = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastmod: now,
      changefreq: 'daily' as const,
      priority: 1.0,
      title: 'We Are Vision - Experiencias BTL Cinematográficas',
      description: 'Agencia especializada en eventos corporativos, activaciones de marca y experiencias inmersivas con estética cinematográfica.',
    },
    {
      url: `${baseUrl}/eventos`,
      lastmod: now,
      changefreq: 'daily' as const,
      priority: 0.9,
      title: 'Portafolio de Eventos - We Are Vision',
      description: 'Explora nuestro catálogo completo de experiencias BTL, activaciones de marca y eventos corporativos.',
    },
    {
      url: `${baseUrl}/nosotros`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.7,
      title: 'Nosotros - We Are Vision',
      description: 'Conoce nuestro equipo, metodología y filosofía de diseño de experiencias.',
    },
    {
      url: `${baseUrl}/contacto`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.6,
      title: 'Contacto - We Are Vision',
      description: 'Conversemos sobre tu próximo evento o activación de marca.',
    },
  ];
}

/**
 * Genera URLs de categorías
 */
export function generateCategoryUrls(categories: string[], baseUrl: string): SitemapEntry[] {
  const now = new Date().toISOString();

  return categories.map(category => ({
    url: `${baseUrl}/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: now,
    changefreq: 'weekly' as const,
    priority: 0.7,
    title: `Eventos ${category} - We Are Vision`,
    description: `Explora nuestros proyectos de ${category}.`,
    category,
  }));
}

/**
 * Genera XML Sitemap estándar (Google, Bing)
 */
export function generateXMLSitemap(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const escapedUrl = entry.url.replace(/&/g, '&').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '<').replace(/>/g, '>');
    
    return `  <url>
    <loc>${escapedUrl}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
}

/**
 * Genera JSON Sitemap para IA (ChatGPT, Perplexity, Claude)
 * Formato enriquecido con metadata para mejor comprensión semántica
 */
export function generateJSONSitemap(entries: SitemapEntry[]): string {
  const sitemap = {
    version: '1.0',
    generated_at: new Date().toISOString(),
    total_urls: entries.length,
    organization: {
      name: 'We Are Vision',
      type: 'BTL Agency',
      industry: 'Marketing & Advertising',
      specialization: 'Corporate Events, Brand Activations, Immersive Experiences',
      location: 'Chile',
    },
    urls: entries.map(entry => ({
      url: entry.url,
      last_modified: entry.lastmod,
      update_frequency: entry.changefreq,
      priority: entry.priority,
      metadata: {
        title: entry.title,
        description: entry.description,
        category: entry.category,
        brand: entry.brand,
        date: entry.date,
      },
      // Tags para mejorar descubrimiento por IA
      tags: extractTags(entry),
      // Tipo de contenido
      content_type: getContentType(entry.url),
    })),
  };

  return JSON.stringify(sitemap, null, 2);
}

/**
 * Extrae tags relevantes para indexación por IA
 */
function extractTags(entry: SitemapEntry): string[] {
  const tags: string[] = [];

  // Tags de categoría
  if (entry.category) {
    tags.push(entry.category.toLowerCase());
  }

  // Tags de marca
  if (entry.brand) {
    tags.push(entry.brand.toLowerCase());
  }

  // Tags de tipo de contenido
  if (entry.url.includes('/event/')) {
    tags.push('case-study', 'portfolio', 'project');
  }

  // Tags de industria
  tags.push('btl', 'marketing', 'events', 'brand-activation', 'experiential-marketing');

  // Tags geográficos
  tags.push('chile', 'latam', 'south-america');

  return [...new Set(tags)]; // Remove duplicates
}

/**
 * Determina el tipo de contenido
 */
function getContentType(url: string): string {
  if (url.includes('/event/')) return 'case-study';
  if (url.includes('/categoria/')) return 'category-archive';
  if (url.includes('/eventos')) return 'portfolio';
  if (url.includes('/nosotros')) return 'about';
  if (url.includes('/contacto')) return 'contact';
  return 'page';
}

/**
 * Genera sitemap completo con todas las URLs
 */
export function generateCompleteSitemap(
  events: WavEvent[],
  categories: string[],
  config: SitemapConfig
): { xml: string; json: string; entries: SitemapEntry[] } {
  const entries: SitemapEntry[] = [];

  // URLs estáticas
  if (config.includeStatic !== false) {
    entries.push(...generateStaticUrls(config.baseUrl));
  }

  // URLs de eventos
  if (config.includeEvents !== false) {
    entries.push(...generateEventUrls(events, config.baseUrl));
  }

  // URLs de categorías
  if (config.includeCategories !== false) {
    entries.push(...generateCategoryUrls(categories, config.baseUrl));
  }

  // Ordenar por prioridad (mayor a menor)
  entries.sort((a, b) => b.priority - a.priority);

  return {
    xml: generateXMLSitemap(entries),
    json: generateJSONSitemap(entries),
    entries,
  };
}

/**
 * Genera robots.txt optimizado
 */
export function generateRobotsTxt(baseUrl: string): string {
  return `# We Are Vision - Robots.txt
# Optimizado para SEO y motores de IA

# Bots permitidos (todos)
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap.json

# Bots de IA específicos
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

# Crawl delay para bots pesados (evitar sobrecarga)
User-agent: *
Crawl-delay: 1

# Excluir rutas administrativas
User-agent: *
Disallow: /admin
Disallow: /api/internal
Disallow: /.git

# Permitir explícitamente todas las páginas públicas
Allow: /eventos
Allow: /event/
Allow: /categoria/
Allow: /nosotros
Allow: /contacto
`;
}
