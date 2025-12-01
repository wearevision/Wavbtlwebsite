/**
 * Script de Carga Masiva a Supabase Storage
 * 
 * Uso:
 * 1. Coloca tus imágenes en ./images/
 * 2. Actualiza EVENTS con los datos de tus eventos
 * 3. Ejecuta: node SCRIPT_CARGA_MASIVA_EJEMPLO.js
 * 
 * Requisitos:
 * - npm install @supabase/supabase-js dotenv
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import 'dotenv/config'

// ====================================
// CONFIGURACIÓN
// ====================================

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-c4bb2206`
const BUCKET_NAME = 'make-c4bb2206-assets'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// ====================================
// DATOS DE EVENTOS
// ====================================

const EVENTS = [
  {
    id: 'evt-banco-chile-001',
    brand: 'Banco de Chile',
    title: 'Neón Corporativo 2024',
    description: 'Evento inmersivo con luz y sonido para conectar con audiencias jóvenes.',
    category: 'activaciones-de-marca',
    imageFile: './images/banco-chile-neon.jpg',  // Path local a la imagen
    logoFile: './images/banco-chile-logo.png'     // Opcional
  },
  {
    id: 'evt-entel-002',
    brand: 'Entel',
    title: 'Experiencia 5G',
    description: 'Demostración de velocidad de red mediante efectos lumínicos.',
    category: 'eventos-corporativos',
    imageFile: './images/entel-5g.jpg'
  },
  // ... agregar más eventos aquí
]

// ====================================
// FUNCIONES
// ====================================

/**
 * Sube una imagen a Supabase Storage
 */
async function uploadImage(filePath, storagePath) {
  try {
    console.log(`  📤 Subiendo: ${filePath} → ${storagePath}`)
    
    const fileBuffer = readFileSync(filePath)
    const contentType = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg'
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,  // Sobrescribe si ya existe
        cacheControl: '3600'
      })
    
    if (error) throw error
    
    console.log(`  ✅ Subida exitosa: ${storagePath}`)
    return storagePath
  } catch (error) {
    console.error(`  ❌ Error subiendo ${filePath}:`, error.message)
    return null
  }
}

/**
 * Obtiene todos los eventos actuales de la base de datos
 */
async function getEvents() {
  const response = await fetch(`${SERVER_URL}/events`, {
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    }
  })
  
  if (!response.ok) {
    throw new Error(`Error fetching events: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Guarda eventos actualizados en la base de datos
 */
async function saveEvents(events) {
  const response = await fetch(`${SERVER_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify(events)
  })
  
  if (!response.ok) {
    throw new Error(`Error saving events: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Carga masiva de eventos con imágenes
 */
async function uploadMassive() {
  console.log('🚀 Iniciando carga masiva...\n')
  
  let successCount = 0
  let errorCount = 0
  
  // 1. Obtener eventos actuales
  console.log('📥 Obteniendo eventos actuales de la base de datos...')
  let existingEvents = await getEvents()
  console.log(`   Encontrados: ${existingEvents.length} eventos\n`)
  
  // 2. Crear un Map para búsqueda rápida
  const eventMap = new Map(existingEvents.map(e => [e.id, e]))
  
  // 3. Procesar cada evento
  for (const eventData of EVENTS) {
    console.log(`\n📦 Procesando: ${eventData.brand} - ${eventData.title}`)
    console.log(`   ID: ${eventData.id}`)
    
    try {
      // 3.1 Subir imagen principal
      let imagePath = null
      if (eventData.imageFile) {
        const storagePath = `events/${eventData.id}.jpg`
        imagePath = await uploadImage(eventData.imageFile, storagePath)
      }
      
      // 3.2 Subir logo (opcional)
      let logoPath = null
      if (eventData.logoFile) {
        const storagePath = `logos/${eventData.id}.png`
        logoPath = await uploadImage(eventData.logoFile, storagePath)
      }
      
      // 3.3 Actualizar o crear evento
      const eventToSave = {
        id: eventData.id,
        brand: eventData.brand,
        title: eventData.title,
        description: eventData.description,
        category: eventData.category || '',
        imagePath: imagePath || '',
        logoPath: logoPath || '',
        image: '',  // Se genera automáticamente en el servidor
        logo: '',   // Se genera automáticamente en el servidor
        gallery: [],
        slug: '',   // Se genera automáticamente en normalizeEvent
        
        // Campos extendidos (opcionales)
        summary: eventData.summary || '',
        highlights: eventData.highlights || [],
        keywords: eventData.keywords || [],
        hashtags: eventData.hashtags || [],
        
        // Preservar campos existentes si el evento ya existe
        ...(eventMap.get(eventData.id) || {})
      }
      
      // Actualizar en el Map
      eventMap.set(eventData.id, eventToSave)
      
      successCount++
      console.log(`  ✅ Evento procesado exitosamente`)
      
    } catch (error) {
      errorCount++
      console.error(`  ❌ Error procesando evento:`, error.message)
    }
  }
  
  // 4. Guardar todos los eventos actualizados
  console.log('\n\n💾 Guardando eventos en la base de datos...')
  const allEvents = Array.from(eventMap.values())
  
  try {
    await saveEvents(allEvents)
    console.log(`✅ Base de datos actualizada: ${allEvents.length} eventos totales`)
  } catch (error) {
    console.error('❌ Error guardando en la base de datos:', error.message)
  }
  
  // 5. Resumen
  console.log('\n\n' + '='.repeat(50))
  console.log('📊 RESUMEN DE CARGA MASIVA')
  console.log('='.repeat(50))
  console.log(`✅ Éxitos:  ${successCount}`)
  console.log(`❌ Errores:  ${errorCount}`)
  console.log(`📦 Total:    ${EVENTS.length}`)
  console.log('='.repeat(50) + '\n')
  
  // 6. Próximos pasos
  console.log('🎉 Carga masiva completada!\n')
  console.log('📋 Próximos pasos:')
  console.log('   1. Verifica las imágenes en Supabase Dashboard → Storage')
  console.log('   2. Recarga el frontend para ver las imágenes')
  console.log('   3. Verifica en DevTools → Network que las URLs incluyen:')
  console.log('      ?width=600&quality=70&format=webp\n')
}

// ====================================
// VALIDACIONES PREVIAS
// ====================================

console.log('🔍 Verificando configuración...\n')

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Faltan variables de entorno')
  console.error('   Asegúrate de tener un archivo .env con:')
  console.error('   SUPABASE_URL=https://...')
  console.error('   SUPABASE_SERVICE_ROLE_KEY=...')
  process.exit(1)
}

console.log(`✅ Supabase URL: ${SUPABASE_URL}`)
console.log(`✅ Bucket: ${BUCKET_NAME}`)
console.log(`✅ Eventos a procesar: ${EVENTS.length}\n`)

// Verificar que los archivos existen
let missingFiles = []
for (const event of EVENTS) {
  if (event.imageFile && !require('fs').existsSync(event.imageFile)) {
    missingFiles.push(event.imageFile)
  }
  if (event.logoFile && !require('fs').existsSync(event.logoFile)) {
    missingFiles.push(event.logoFile)
  }
}

if (missingFiles.length > 0) {
  console.error('❌ Error: Archivos no encontrados:')
  missingFiles.forEach(f => console.error(`   - ${f}`))
  process.exit(1)
}

console.log('✅ Todos los archivos existen\n')

// ====================================
// EJECUTAR
// ====================================

uploadMassive()
  .then(() => {
    console.log('✅ Script finalizado exitosamente')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Error fatal:', error)
    process.exit(1)
  })
