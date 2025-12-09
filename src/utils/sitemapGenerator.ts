/**
 * Sitemap Generator - We Are Vision
 * 
 * Genera sitemaps XML y JSON estáticos desde eventos del Admin Panel
 */

import { WavEvent } from '../types';

/**
 * Escape XML special characters
 */
const escapeXml = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Create URL-safe slug
 */
const createSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Generate XML Sitemap
 */
export const generateXMLSitemap = (events: WavEvent[], baseUrl: string = 'https://btl.wearevision.cl'): string => {
  const now = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/nosotros</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/servicios</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contacto</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Dynamic Events -->\n`;

  for (const event of events) {
    const slug = event.slug || createSlug(event.title);
    const lastmod = event.updatedAt || event.createdAt || now;
    const formattedDate = typeof lastmod === 'string' ? lastmod.split('T')[0] : now;
    
    xml += `  <url>
    <loc>${baseUrl}/?evento=${slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    
    if (event.image) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(event.image)}</image:loc>
      <image:title>${escapeXml(event.title)}</image:title>`;
      
      if (event.description) {
        const caption = event.description.substring(0, 200);
        xml += `
      <image:caption>${escapeXml(caption)}</image:caption>`;
      }
      
      xml += `
    </image:image>`;
    }
    
    xml += `
  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
};

/**
 * Generate JSON Sitemap for AI/LLM
 */
export const generateJSONSitemap = (events: WavEvent[], baseUrl: string = 'https://btl.wearevision.cl') => {
  const now = new Date().toISOString().split('T')[0];
  
  return {
    metadata: {
      title: "We Are Vision (WAV) - Marketing Experiencial & BTL Portfolio",
      description: "WAV BTL es una agencia de marketing experiencial líder en Chile y LATAM. Creamos activaciones de marca, eventos corporativos, instalaciones tecnológicas y experiencias inmersivas.",
      baseUrl: baseUrl,
      generatedAt: new Date().toISOString(),
      totalEvents: events.length,
      seo: {
        keywords: [
          "Agencia BTL Chile",
          "Marketing Experiencial",
          "Activaciones de Marca",
          "Producción de Eventos",
          "Instalaciones Tecnológicas",
          "We Are Vision",
          "WAV BTL",
          "Eventos Corporativos",
          "Lanzamiento de Productos",
          "Experiencias Inmersivas"
        ],
        language: "es-CL",
        region: "Chile, LATAM"
      }
    },
    pages: [
      {
        url: `${baseUrl}/`,
        title: "We Are Vision | Portfolio BTL",
        description: "Explora nuestro portafolio de proyectos de marketing experiencial y activaciones de marca.",
        lastModified: now,
        priority: 1.0,
        type: "homepage"
      },
      {
        url: `${baseUrl}/nosotros`,
        title: "Nosotros | We Are Vision",
        description: "Conoce más sobre nuestra agencia y equipo.",
        lastModified: now,
        priority: 0.9,
        type: "page"
      },
      {
        url: `${baseUrl}/servicios`,
        title: "Servicios | We Are Vision",
        description: "Descubre nuestros servicios de marketing experiencial y producción de eventos.",
        lastModified: now,
        priority: 0.9,
        type: "page"
      },
      {
        url: `${baseUrl}/contacto`,
        title: "Contacto | We Are Vision",
        description: "Ponte en contacto con nosotros para tu próximo proyecto.",
        lastModified: now,
        priority: 0.8,
        type: "page"
      }
    ],
    events: events.map((event) => ({
      id: event.id,
      url: `${baseUrl}/?evento=${event.slug || createSlug(event.title)}`,
      title: event.title,
      brand: event.brand,
      category: event.category,
      description: event.description,
      image: event.image,
      logo: event.logo,
      lastModified: (event.updatedAt || event.createdAt || now).toString().split('T')[0],
      priority: 0.8,
      metadata: {
        hasVideo: !!event.videoUrl,
        hasGallery: Array.isArray(event.gallery) && event.gallery.length > 0,
        tags: event.tags || []
      }
    }))
  };
};

/**
 * Download file to user's computer
 */
export const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};