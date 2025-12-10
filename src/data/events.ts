/**
 * WAV Events - DEPRECATED
 * 
 * ⚠️ ESTE ARCHIVO YA NO SE USA
 * 
 * La aplicación ahora funciona 100% dinámicamente desde Supabase.
 * 
 * ANTES:
 * - Este archivo contenía datos estáticos como fallback
 * - Se actualizaba manualmente descargando desde AdminPanel
 * - Era necesario para SEO y OG tags
 * 
 * AHORA:
 * - Todos los eventos se cargan desde Supabase KV Store
 * - Si Supabase falla, la app muestra pantalla vacía (no fallback)
 * - SEO y OG tags se generan dinámicamente desde los datos de Supabase
 * - Sitemaps se generan automáticamente en el servidor
 * 
 * PARA EDITAR EVENTOS:
 * 1. Ve a /admin en la app
 * 2. Edita eventos con la interfaz visual
 * 3. Los cambios se guardan automáticamente en Supabase
 * 4. No necesitas tocar este archivo nunca más
 * 
 * VENTAJAS:
 * ✅ Sin sincronización manual
 * ✅ Cambios en tiempo real
 * ✅ Sin duplicación de datos
 * ✅ Menos archivos que mantener
 * 
 * Última actualización: 2024-12-10
 */

// Este export vacío se mantiene solo para compatibilidad con TypeScript
// pero NO se usa en ninguna parte del código
export const events: never[] = [];
