/**
 * TEST SCRIPT - MEGA AUDIT ON SINGLE EVENT
 * 
 * Este script ejecuta el Mega Audit sobre "Cumbre Creativa Cencosud"
 * y muestra el antes/después en consola.
 */

import { projectId, publicAnonKey } from './utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

async function testAuditCencosud() {
  console.log('🚀 INICIANDO TEST - MEGA AUDIT CENCOSUD\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // 1. Get current event data (before audit)
    console.log('📥 PASO 1: Obteniendo datos actuales del evento...\n');
    
    const getRes = await fetch(`${API_URL}/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (!getRes.ok) {
      throw new Error(`Failed to get events: ${getRes.status}`);
    }

    const events = await getRes.json();
    const cencosudEvent = events.find((e: any) => 
      e.title && e.title.toLowerCase().includes('cencosud')
    );

    if (!cencosudEvent) {
      console.error('❌ Evento "Cumbre Creativa Cencosud" no encontrado en la base de datos');
      return;
    }

    console.log('✅ Evento encontrado!\n');
    console.log('📊 ANTES DEL AUDIT:');
    console.log('─────────────────────────────────────────────────────────');
    console.log(JSON.stringify(cencosudEvent, null, 2));
    console.log('\n');

    // Calculate completeness BEFORE
    const totalFields = 28;
    const filledBefore = Object.keys(cencosudEvent).filter(k => 
      cencosudEvent[k] && 
      (typeof cencosudEvent[k] === 'string' ? cencosudEvent[k].trim() !== '' : true)
    ).length;
    const completenessBefore = Math.round((filledBefore / totalFields) * 100);

    console.log(`📈 Completitud ANTES: ${filledBefore}/${totalFields} campos (${completenessBefore}%)\n`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // 2. Execute MEGA AUDIT
    console.log('⚡ PASO 2: Ejecutando MEGA AUDIT con GPT-4o...\n');
    console.log('⏳ Esto puede tomar 5-10 segundos...\n');

    const auditRes = await fetch(`${API_URL}/audit-single-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        title: 'Cumbre Creativa Cencosud'
      })
    });

    if (!auditRes.ok) {
      const error = await auditRes.json();
      throw new Error(`Audit failed: ${JSON.stringify(error)}`);
    }

    const result = await auditRes.json();
    const optimizedEvent = result.optimizedEvent;

    console.log('✅ AUDIT COMPLETADO!\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('📊 DESPUÉS DEL AUDIT:');
    console.log('─────────────────────────────────────────────────────────');
    console.log(JSON.stringify(optimizedEvent, null, 2));
    console.log('\n');

    // Calculate completeness AFTER
    const filledAfter = Object.keys(optimizedEvent).filter(k => 
      optimizedEvent[k] && 
      (typeof optimizedEvent[k] === 'string' ? optimizedEvent[k].trim() !== '' : true)
    ).length;
    const completenessAfter = Math.round((filledAfter / totalFields) * 100);

    console.log(`📈 Completitud DESPUÉS: ${filledAfter}/${totalFields} campos (${completenessAfter}%)\n`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // 3. Show comparison
    console.log('📊 RESUMEN DE MEJORAS:');
    console.log('─────────────────────────────────────────────────────────');
    console.log(`• Campos completados: ${filledBefore} → ${filledAfter} (+${filledAfter - filledBefore})`);
    console.log(`• Completitud: ${completenessBefore}% → ${completenessAfter}% (+${completenessAfter - completenessBefore}%)`);
    
    // Show key new fields
    console.log('\n🆕 CAMPOS NUEVOS GENERADOS:');
    const newFields = [
      'slug', 'summary', 'tone', 'audience', 'highlights',
      'seo_title', 'seo_description', 'keywords', 'hashtags', 'tags',
      'instagram_hook', 'instagram_body', 'linkedin_post',
      'kpis', 'year', 'month', 'city', 'venue', 'category'
    ];

    newFields.forEach(field => {
      if (optimizedEvent[field] && !cencosudEvent[field]) {
        const value = optimizedEvent[field];
        if (Array.isArray(value)) {
          console.log(`\n✅ ${field}: [${value.length} items]`);
          value.slice(0, 3).forEach((item: any) => console.log(`   - ${item}`));
          if (value.length > 3) console.log(`   ... y ${value.length - 3} más`);
        } else if (typeof value === 'string') {
          const preview = value.length > 100 ? value.substring(0, 100) + '...' : value;
          console.log(`\n✅ ${field}:\n   "${preview}"`);
        } else {
          console.log(`\n✅ ${field}: ${value}`);
        }
      }
    });

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ TEST COMPLETADO EXITOSAMENTE');
    console.log('═══════════════════════════════════════════════════════════\n');

  } catch (error: any) {
    console.error('\n❌ ERROR EN TEST:');
    console.error('─────────────────────────────────────────────────────────');
    console.error(error.message || error);
    console.error('\n');
    
    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
  }
}

// Run test
testAuditCencosud();
