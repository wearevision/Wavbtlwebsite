/**
 * Asset Migration Helper Script
 * 
 * Este script ejecuta la migración de figma:asset → Supabase Storage URLs
 * 
 * USO:
 * 1. Abre la consola del navegador (F12)
 * 2. Pega este código
 * 3. Ejecuta: runAssetMigration()
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function runAssetMigration() {
  console.log('🚀 Iniciando migración de assets...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/migrate-assets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('\n📊 RESULTADOS DE LA MIGRACIÓN:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📦 Total de eventos: ${result.stats?.total || 0}`);
    console.log(`✅ Migrados exitosamente: ${result.stats?.migrated || 0}`);
    console.log(`⊘ Omitidos (ya migrados): ${result.stats?.skipped || 0}`);
    console.log(`❌ Errores: ${result.stats?.errors || 0}`);
    
    if (result.logs && result.logs.length > 0) {
      console.log('\n📝 LOGS DETALLADOS:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      result.logs.forEach((log: string) => {
        // Colorear logs según su contenido
        if (log.includes('✅')) {
          console.log('%c' + log, 'color: #10b981');
        } else if (log.includes('❌')) {
          console.log('%c' + log, 'color: #ef4444');
        } else if (log.includes('⚠️')) {
          console.log('%c' + log, 'color: #f59e0b');
        } else {
          console.log(log);
        }
      });
    }
    
    console.log('\n✨ Migración completada exitosamente!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 Próximos pasos:');
    console.log('   1. Recarga el AdminPanel para ver las nuevas URLs');
    console.log('   2. Prueba compartir un evento en LinkedIn');
    console.log('   3. Prueba GPT-4 Vision con Auto-Completar');
    
    return result;
    
  } catch (error: any) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ ERROR EN LA MIGRACIÓN');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(error.message || error);
    console.error('\n💡 Soluciones:');
    console.error('   • Verifica que el servidor esté corriendo');
    console.error('   • Revisa los logs de Supabase Edge Functions');
    console.error('   • Verifica que el bucket "events" exista y sea público');
    
    throw error;
  }
}

// Auto-ejecutar si se importa desde consola
if (typeof window !== 'undefined') {
  (window as any).runAssetMigration = runAssetMigration;
  console.log('✅ Helper cargado. Ejecuta: runAssetMigration()');
}
