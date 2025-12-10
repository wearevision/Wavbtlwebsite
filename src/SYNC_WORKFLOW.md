# 🔄 Workflow de Sincronización: Supabase ↔ Local

## Arquitectura Híbrida

```
┌─────────────────────────────────────────────────────────────┐
│                    FUENTE DE LA VERDAD                       │
│              Supabase KV Store ("wav_events")                │
│                                                              │
│  • Datos dinámicos editables via AdminPanel                 │
│  • ~45 campos por evento (schema WavEvent)                   │
│  • Auto-enrichment con OpenAI                                │
│  • Validación automática de límites de caracteres           │
└─────────────────────────────────────────────────────────────┘
                            ↓
                     [Sincronización]
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    ARCHIVO LOCAL ESTÁTICO                    │
│                   /data/events.ts                            │
│                                                              │
│  • Datos estáticos para SEO y OG tags                       │
│  • Fallback cuando Supabase no está disponible              │
│  • Auto-generado (NO editar manualmente)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Flujo de Trabajo Normal

### 1. Editar Eventos (AdminPanel)
1. Ve a `/admin` en tu app
2. Login con credenciales de Supabase Auth
3. Edita eventos existentes o crea nuevos
4. Usa botones de IA:
   - **Auto-Completar Datos**: Llena campos vacíos
   - **Optimizar Todo**: Mejora contenido existente
5. Click en **"Guardar en Supabase"** → actualiza KV Store

### 2. Sincronizar a Local (NUEVO)
**Después de guardar cambios en Supabase:**

1. Click en botón **"Sync → Local File"** (verde) en AdminPanel
2. El sistema:
   - Fetch eventos desde Supabase
   - Normaliza todos los datos
   - Genera código TypeScript válido
3. Elige opción:
   - **OK**: Descarga archivo `events.ts`
   - **Cancelar**: Copia contenido al portapapeles
4. **Reemplaza manualmente** el archivo `/data/events.ts`
5. Listo! El archivo local está actualizado

---

## 🔧 Implementación Técnica

### Endpoint del Servidor
```typescript
GET /make-server-c4bb2206/generate-local-file
```
- **Auth**: Requiere Bearer token (Supabase session)
- **Response**: Archivo TypeScript con código completo
- **Normalización**: Aplica schema WavEvent antes de exportar

### Frontend (AdminPanel)
```typescript
handleSyncToLocalFile()
```
1. Obtiene accessToken de la sesión actual
2. Llama al endpoint `generate-local-file`
3. Muestra opciones de descarga/clipboard
4. Usuario reemplaza archivo manualmente

---

## ⚠️ IMPORTANTE: Por qué es Manual

**Figma Make no permite escritura automática de archivos desde el navegador.**

Por seguridad y arquitectura:
- El navegador NO puede escribir en `/data/events.ts` directamente
- El servidor Edge Function NO tiene acceso al filesystem del proyecto
- **Solución actual**: Descarga + reemplazo manual

### Alternativa Futura (Posible Automatización)
Si Figma Make implementa una API de filesystem:
```typescript
// Pseudo-código
await figma.writeFile('/data/events.ts', fileContent);
```
Mientras tanto: **el proceso manual es la única opción segura**.

---

## 📋 Checklist de Sincronización

### Cada vez que modificas eventos:

- [ ] Editar eventos en AdminPanel (`/admin`)
- [ ] Guardar cambios → **"Guardar en Supabase"**
- [ ] Verificar que se guardó correctamente (toast verde)
- [ ] Click en **"Sync → Local File"**
- [ ] Descargar o copiar el contenido generado
- [ ] Abrir `/data/events.ts` en tu editor
- [ ] Reemplazar TODO el contenido con el nuevo código
- [ ] Guardar el archivo
- [ ] Verificar que la app lee los datos correctamente

---

## 🎨 Eliminando Datos Falsos Actuales

El archivo `/data/events.ts` actual está **lleno de eventos de prueba** generados durante el desarrollo.

### Para limpiarlo:

**Opción A: Sync desde Supabase (Recomendado)**
1. Si ya tienes eventos reales en Supabase
2. Usa "Sync → Local File" como se explica arriba
3. Los datos falsos serán reemplazados automáticamente

**Opción B: Limpiar y empezar desde cero**
1. Edita `/data/events.ts` manualmente:
   ```typescript
   export const events = [];
   ```
2. Crea eventos reales en AdminPanel
3. Guarda en Supabase
4. Usa "Sync → Local File"

---

## 🔍 Búsqueda del Evento "Cerveza Cristal 2013"

Para encontrar si existe en Supabase:

1. Abre consola del navegador (F12)
2. Ejecuta:
   ```javascript
   fetch('https://ohyxpzowxzbnluhuofut.supabase.co/functions/v1/make-server-c4bb2206/search-event?q=cristal', {
     headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeXhwem93eHpibmx1aHVvZnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjMwODEsImV4cCI6MjA0OTQzOTA4MX0.b5MNYP9Xs66BmJdNLsLZuR5k3gg1cW8QqASYhxoOkKA' }
   }).then(r => r.json()).then(console.log);
   ```

### Si NO existe:
- Créalo en AdminPanel
- Usa "Auto-Completar Datos" para llenar campos
- Guarda en Supabase
- Sync a local file

---

## 🚀 Publicación Final

Cuando estés listo para publicar a `btl.wearevision.cl`:

1. **Asegúrate de que /data/events.ts esté actualizado** (último sync)
2. Publica desde Figma Make
3. El sitio público:
   - Lee datos dinámicos desde Supabase (prioridad)
   - Usa fallback de `/data/events.ts` si falla la conexión
   - Genera OG tags y SEO desde datos estáticos

---

## 📊 Estado Actual del Proyecto

- ✅ Sistema de sincronización implementado
- ✅ Endpoint `/generate-local-file` funcionando
- ✅ Botón "Sync → Local File" en AdminPanel
- ✅ Endpoint de búsqueda `/search-event` activo
- ⚠️ `/data/events.ts` tiene datos de prueba (pendiente reemplazo)
- ⏳ Evento "Cerveza Cristal 2013" no confirmado en Supabase

---

## 🛠 Próximos Pasos Recomendados

1. **Buscar evento Cristal** usando endpoint search
2. **Si existe**: Extraer todos los campos y documentar
3. **Si NO existe**: Crear desde cero con IA
4. **Limpiar datos falsos**: Primera sincronización completa
5. **Documentar eventos reales**: Backup de seguridad

---

**Última actualización**: 2024-12-10  
**Versión**: 2.0 (Sincronización Automática)
