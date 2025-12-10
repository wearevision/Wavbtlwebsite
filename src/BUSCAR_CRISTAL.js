/**
 * Script de Búsqueda Rápida: Cerveza Cristal 2013
 * 
 * INSTRUCCIONES:
 * 1. Abre tu app en el navegador
 * 2. Abre la consola (F12 → Console)
 * 3. Copia y pega TODO este archivo
 * 4. Presiona Enter
 * 5. Espera los resultados
 */

(async function buscarEventoCristal() {
  console.log('🔍 Iniciando búsqueda del evento "Cerveza Cristal 2013"...\n');

  const API_BASE = 'https://ohyxpzowxzbnluhuofut.supabase.co/functions/v1/make-server-c4bb2206';
  const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeXhwem93eHpibmx1aHVvZnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjMwODEsImV4cCI6MjA0OTQzOTA4MX0.b5MNYP9Xs66BmJdNLsLZuR5k3gg1cW8QqASYhxoOkKA';

  try {
    // Paso 1: Buscar directamente por "Cristal"
    console.log('📡 Paso 1: Búsqueda directa por "Cristal"...');
    const searchResponse = await fetch(`${API_BASE}/search-event?q=cristal`, {
      headers: { 'Authorization': TOKEN }
    });
    const searchResult = await searchResponse.json();

    if (!searchResult.error) {
      console.log('✅ ¡EVENTO ENCONTRADO CON BÚSQUEDA DIRECTA!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(JSON.stringify(searchResult, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // Mostrar campos clave
      console.log('📋 RESUMEN DEL EVENTO:');
      console.log(`   Brand: ${searchResult.brand}`);
      console.log(`   Title: ${searchResult.title}`);
      console.log(`   Year: ${searchResult.year || 'No especificado'}`);
      console.log(`   Country: ${searchResult.country || 'No especificado'}`);
      console.log(`   Description: ${searchResult.description?.substring(0, 100)}...`);
      console.log(`\n   Total campos: ${Object.keys(searchResult).length}`);
      
      return searchResult;
    }

    // Paso 2: Búsqueda por "2013"
    console.log('❌ No encontrado con "Cristal". Intentando con "2013"...\n');
    const search2013Response = await fetch(`${API_BASE}/search-event?q=2013`, {
      headers: { 'Authorization': TOKEN }
    });
    const search2013Result = await search2013Response.json();

    if (!search2013Result.error) {
      console.log('✅ ¡EVENTO DEL 2013 ENCONTRADO!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(JSON.stringify(search2013Result, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      return search2013Result;
    }

    // Paso 3: Traer todos los eventos y buscar manualmente
    console.log('❌ No encontrado con búsqueda directa. Descargando TODOS los eventos...\n');
    const allEventsResponse = await fetch(`${API_BASE}/events`, {
      headers: { 'Authorization': TOKEN }
    });
    const allEvents = await allEventsResponse.json();

    console.log(`📊 Total de eventos en Supabase: ${allEvents.length}\n`);

    // Buscar por múltiples criterios
    const cristalEvents = allEvents.filter(e => 
      (e.brand && e.brand.toLowerCase().includes('cristal')) ||
      (e.title && e.title.toLowerCase().includes('cristal')) ||
      (e.description && e.description.toLowerCase().includes('cristal')) ||
      e.year === '2013' ||
      e.year === 2013
    );

    if (cristalEvents.length > 0) {
      console.log(`✅ Encontrados ${cristalEvents.length} eventos relacionados:\n`);
      cristalEvents.forEach((e, i) => {
        console.log(`\n━━━ EVENTO ${i + 1} ━━━`);
        console.log(`Brand: ${e.brand}`);
        console.log(`Title: ${e.title}`);
        console.log(`Year: ${e.year || 'N/A'}`);
        console.log(`Slug: ${e.slug}`);
        console.log('\nDatos completos:');
        console.log(JSON.stringify(e, null, 2));
      });
      return cristalEvents;
    }

    // No encontrado
    console.log('❌ NO SE ENCONTRÓ NINGÚN EVENTO DE "CERVEZA CRISTAL" O "2013"\n');
    console.log('📋 Primeras 10 marcas disponibles:');
    const uniqueBrands = [...new Set(allEvents.map(e => e.brand).filter(Boolean))];
    uniqueBrands.slice(0, 10).forEach(brand => console.log(`   • ${brand}`));
    
    console.log('\n📋 Eventos con año especificado:');
    const eventsWithYear = allEvents.filter(e => e.year).slice(0, 5);
    eventsWithYear.forEach(e => console.log(`   • ${e.brand} (${e.year})`));

    console.log('\n💡 SUGERENCIA: El evento probablemente NO existe en Supabase.');
    console.log('   Opciones:');
    console.log('   1. Crear el evento desde cero en AdminPanel');
    console.log('   2. Usar "Auto-Completar Datos" con IA');
    console.log('   3. Revisar backups antiguos si existen\n');

    return null;

  } catch (error) {
    console.error('❌ ERROR EN LA BÚSQUEDA:');
    console.error(error);
    console.log('\n💡 Verifica:');
    console.log('   • Que estés conectado a internet');
    console.log('   • Que Supabase esté funcionando');
    console.log('   • Que el token de acceso sea válido\n');
  }
})();

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 SCRIPT DE BÚSQUEDA INICIADO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
