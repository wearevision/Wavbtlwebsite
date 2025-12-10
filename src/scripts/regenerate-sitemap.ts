/**
 * Script para regenerar y validar sitemaps
 * 
 * ⚠️ DEPRECATED: Este script usaba datos estáticos de /data/events.ts
 * 
 * AHORA: Los sitemaps se generan automáticamente desde Supabase en:
 * - https://[projectId].supabase.co/functions/v1/make-server-c4bb2206/sitemap.xml
 * - https://[projectId].supabase.co/functions/v1/make-server-c4bb2206/sitemap.json
 * 
 * Para debugging, usa directamente esos endpoints.
 */

// REMOVED: Static events import - Now 100% dynamic from Supabase
// import { events as staticEvents } from '../data/events';
import { generateCompleteSitemap } from '../utils/generateSitemap';
import { generateSlug } from '../utils/slug';

// Categorías comunes (puedes expandir)
const CATEGORIES = [
  'Activación de Marca',
  'Evento Corporativo',
  'Lanzamiento de Producto',
  'Experiencia Inmersiva',
  'Festival Cultural',
  'Showroom Interactivo',
];

// Configuración
const BASE_URL = 'https://wearevision.cl';

// Convertir eventos estáticos al formato WavEvent
const formattedEvents = staticEvents.map((event: any, index: number) => ({
  id: `evt-${index + 1}`,
  slug: generateSlug(event.title),
  title: event.title,
  brand: event.brand,
  description: event.description,
  image: event.image,
  category: event.category || 'Evento Corporativo',
  date: event.date || '2024',
  location: event.location || 'Chile',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

console.log('🗺️  Generando sitemaps...\n');

// Generar sitemap completo
const { xml, json, entries } = generateCompleteSitemap(
  formattedEvents as any,
  CATEGORIES,
  {
    baseUrl: BASE_URL,
    includeStatic: true,
    includeEvents: true,
    includeCategories: true,
  }
);

console.log(`✅ Sitemap generado exitosamente!\n`);
console.log(`📊 Estadísticas:`);
console.log(`   - Total URLs: ${entries.length}`);
console.log(`   - URLs estáticas: 4`);
console.log(`   - URLs de eventos: ${formattedEvents.length}`);
console.log(`   - URLs de categorías: ${CATEGORIES.length}`);
console.log('');

// Mostrar preview del XML
console.log('📄 Preview XML Sitemap:');
console.log('─'.repeat(60));
console.log(xml.split('\n').slice(0, 20).join('\n'));
console.log('...');
console.log('─'.repeat(60));
console.log('');

// Mostrar preview del JSON
console.log('📄 Preview JSON Sitemap (primeras 2 URLs):');
console.log('─'.repeat(60));
const jsonParsed = JSON.parse(json);
console.log(JSON.stringify({
  ...jsonParsed,
  urls: jsonParsed.urls.slice(0, 2),
}, null, 2));
console.log('...');
console.log('─'.repeat(60));
console.log('');

// Validaciones
console.log('🧪 Validaciones:');
let validationErrors = 0;

// 1. Verificar que todas las URLs sean ��nicas
const urls = entries.map(e => e.url);
const uniqueUrls = new Set(urls);
if (urls.length !== uniqueUrls.size) {
  console.log('   ❌ ERROR: URLs duplicadas detectadas');
  validationErrors++;
} else {
  console.log('   ✅ Todas las URLs son únicas');
}

// 2. Verificar que todas las URLs tengan protocolo correcto
const invalidUrls = entries.filter(e => !e.url.startsWith('https://'));
if (invalidUrls.length > 0) {
  console.log(`   ❌ ERROR: ${invalidUrls.length} URLs sin HTTPS`);
  validationErrors++;
} else {
  console.log('   ✅ Todas las URLs usan HTTPS');
}

// 3. Verificar que todas las prioridades estén en rango válido
const invalidPriorities = entries.filter(e => e.priority < 0 || e.priority > 1);
if (invalidPriorities.length > 0) {
  console.log(`   ❌ ERROR: ${invalidPriorities.length} prioridades inválidas`);
  validationErrors++;
} else {
  console.log('   ✅ Todas las prioridades son válidas (0-1)');
}

// 4. Verificar que todas las fechas sean ISO válidas
const invalidDates = entries.filter(e => {
  try {
    new Date(e.lastmod);
    return false;
  } catch {
    return true;
  }
});
if (invalidDates.length > 0) {
  console.log(`   ❌ ERROR: ${invalidDates.length} fechas inválidas`);
  validationErrors++;
} else {
  console.log('   ✅ Todas las fechas son válidas (ISO 8601)');
}

// 5. Verificar que el XML sea válido
if (xml.includes('<?xml') && xml.includes('</urlset>')) {
  console.log('   ✅ XML bien formateado');
} else {
  console.log('   ❌ ERROR: XML mal formateado');
  validationErrors++;
}

// 6. Verificar que el JSON sea parseable
try {
  JSON.parse(json);
  console.log('   ✅ JSON parseable');
} catch (e) {
  console.log('   ❌ ERROR: JSON no parseable');
  validationErrors++;
}

console.log('');

// Resultado final
if (validationErrors === 0) {
  console.log('🎉 ÉXITO: Sitemap válido y listo para producción!\n');
  console.log('📌 Próximos pasos:');
  console.log('   1. Deploy el código a producción');
  console.log('   2. Verificar URLs:');
  console.log(`      - ${BASE_URL}/api/sitemap.xml`);
  console.log(`      - ${BASE_URL}/api/sitemap.json`);
  console.log('   3. Registrar en Google Search Console');
  console.log('   4. Registrar en Bing Webmaster Tools');
  console.log('   5. Monitorear indexación (1-2 semanas)\n');
} else {
  console.log(`❌ ERRORES ENCONTRADOS: ${validationErrors}`);
  console.log('   Por favor corrige los errores antes de deploy.\n');
  process.exit(1);
}

// Opcional: Guardar archivos localmente para inspección
// import { writeFileSync } from 'fs';
// writeFileSync('./sitemap.xml', xml);
// writeFileSync('./sitemap.json', json);
// console.log('💾 Archivos guardados: sitemap.xml, sitemap.json\n');