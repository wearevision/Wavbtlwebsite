# 🧪 INSTRUCCIONES - TEST MEGA AUDIT CENCOSUD

## 🎯 OBJETIVO

Probar el sistema de **Mega Audit** sobre el evento "Cumbre Creativa Cencosud" y verificar que:
1. ✅ Llena todos los campos faltantes
2. ✅ Optimiza SEO completo
3. ✅ Genera contenido social (Instagram + LinkedIn)
4. ✅ Infiere KPIs realistas
5. ✅ Guarda correctamente en Supabase

---

## 🚀 OPCIÓN 1: UI VISUAL (RECOMENDADO)

### Paso 1: Abrir la App
```
1. Abrir la app WAV BTL en el navegador
2. Verás un panel flotante en la esquina superior derecha
3. Título: "Test Mega Audit"
4. Evento: "Cumbre Creativa Cencosud"
```

### Paso 2: Ejecutar Audit
```
1. Click en el botón "Ejecutar Audit"
2. Esperar 5-10 segundos (procesamiento con GPT-4o)
3. Ver resultados en el panel:
   ✅ Verde = Success
   ❌ Rojo = Error
```

### Paso 3: Ver Resultados en Consola
```
1. Abrir DevTools (F12 o Cmd+Opt+I)
2. Tab "Console"
3. Buscar logs con formato:
   
   📊 COMPARISON - BEFORE vs AFTER
   ═══════════════════════════════════════
   
   🆕 slug: "cencosud-cumbre-creativa-..."
   🆕 seo_title: "Cencosud Cumbre Creativa 2024..."
   🆕 keywords: ["Cencosud...", "Innovación retail...", ...]
   ...
```

### Paso 4: Verificar en Supabase
```
1. Ir al Admin Panel (botón pequeño abajo-izquierda)
2. Click "Pull desde Supabase"
3. Buscar evento "Cumbre Creativa Cencosud"
4. Verificar que todos los campos nuevos estén presentes:
   - slug
   - summary
   - tone
   - audience
   - highlights
   - seo_title, seo_description
   - keywords (array de 8)
   - hashtags (array de 15)
   - instagram_hook, instagram_body, instagram_closing
   - linkedin_post, linkedin_article
   - kpis (array de 6)
   - year, month, city, venue, category, subcategory
   - people_reached, attendees, days, cities, screens
```

### Paso 5: Limpiar después del test
```
1. Ir a /App.tsx
2. Buscar: {/* TEST: Mega Audit Cencosud - Remove after testing */}
3. Comentar o eliminar: <ExecuteAuditCencosud />
4. Guardar
```

---

## 🖥️ OPCIÓN 2: LLAMADA API DIRECTA

### Usando cURL:

```bash
# 1. Obtener projectId y publicAnonKey de /utils/supabase/info.tsx
export PROJECT_ID="ykkmplrnqcwpgfdjshxn"
export ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra21wbHJucWN3cGdmZGpzaHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODAxNDYsImV4cCI6MjA3OTY1NjE0Nn0.eeOD15xLNgLumFVYnrSAk_pgAwih0IcDZK0dxU9V4jg"

# 2. Ejecutar audit
curl -X POST \
  "https://${PROJECT_ID}.supabase.co/functions/v1/make-server-c4bb2206/audit-single-event" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d '{"title": "Cumbre Creativa Cencosud"}'
```

### Usando Postman:

```
Method: POST
URL: https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206/audit-single-event

Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra21wbHJucWN3cGdmZGpzaHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODAxNDYsImV4cCI6MjA3OTY1NjE0Nn0.eeOD15xLNgLumFVYnrSAk_pgAwih0IcDZK0dxU9V4jg

Body (JSON):
{
  "title": "Cumbre Creativa Cencosud"
}

NOTE: Uses publicAnonKey for Supabase Edge Function authentication.
```

---

## 📊 QUÉ ESPERAR

### ANTES del Audit:
```json
{
  "brand": "Cencosud",
  "title": "Cumbre Creativa Cencosud",
  "description": "Cencosud buscaba reposicionar sus marcas en torno a la creatividad latinoamericana...",
  "image": "https://images.unsplash.com/..."
}
```

**Campos faltantes:** ~24 de 28 (14% completitud)

---

### DESPUÉS del Audit:
```json
{
  "brand": "Cencosud",
  "client": "Cencosud S.A.",
  
  "title": "Cencosud | Cumbre Creativa Latinoamericana - Santiago 2024",
  "slug": "cencosud-cumbre-creativa-latinoamericana-santiago-2024",
  
  "description": "Cumbre Creativa organizada por Cencosud para reposicionar sus marcas retail... +250K visitantes, generando 350+ menciones orgánicas...",
  
  "summary": "Cumbre Creativa de Cencosud reunió a +1,200 líderes del retail para explorar innovación latinoamericana...",
  
  "tone": "Corporativo, Innovador, Premium",
  "audience": "Ejecutivos C-level, Directores de Marketing, Creativos senior...",
  "highlights": [
    "Micro-espacios interactivos por vertical (Jumbo, Paris, Easy, Santa Isabel)",
    "Workshops de creatividad latinoamericana con speakers internacionales",
    "Networking estratégico con +1,200 líderes del retail",
    ...
  ],
  
  "seo_title": "Cencosud Cumbre Creativa 2024 | Innovación Retail Santiago",
  "seo_description": "Cumbre Creativa Cencosud reunió +1,200 líderes retail en experiencias inmersivas...",
  
  "keywords": [
    "Cencosud Cumbre Creativa",
    "Innovación retail Chile 2024",
    "Evento corporativo Cencosud",
    ...
  ],
  
  "hashtags": [
    "#CumbreCreativaCencosud",
    "#CencosudInnovation",
    "#RetailChile",
    ...
  ],
  
  "instagram_hook": "Cuando las marcas líderes del retail se unen para redefinir la creatividad latinoamericana 🌎✨",
  
  "instagram_body": "La Cumbre Creativa Cencosud transformó CasaPiedra en un ecosistema de innovación...",
  
  "linkedin_post": "🎯 Case Study: Cumbre Creativa Cencosud 2024\n\nCómo reunir a +1,200 líderes del retail...",
  
  "linkedin_article": "# Cumbre Creativa Cencosud 2024: Cuando el Retail se Transforma en Ecosistema de Innovación\n\n## El Contexto...",
  
  "year": "2024",
  "month": "Noviembre",
  "country": "Chile",
  "city": "Santiago",
  "venue": "Centro de Eventos CasaPiedra",
  
  "category": "Eventos Corporativos",
  "subcategory": "Cumbres y Convenciones",
  
  "people_reached": "450000",
  "attendees": "1247",
  "days": "2",
  "cities": "1",
  "screens": "6",
  
  "kpis": [
    "Asistencia: 1,247 ejecutivos (89% tasa vs registro)",
    "NPS: 92/100 entre asistentes",
    "Engagement B2B: 12.8% (3.2x benchmark corporativo)",
    ...
  ],
  
  "results_notes": "Cumbre exitosa que superó expectativas en asistencia y engagement...",
  
  "audit_summary": "SEO Score: 12 → 94. Completitud: 14% → 96%. Generados 24+ campos faltantes...",
  
  "image": "https://images.unsplash.com/..." // preserved
}
```

**Campos completados:** 27 de 28 (96% completitud) ✅

---

## ✅ CHECKLIST DE VALIDACIÓN

### Campos Core
- [ ] `title` optimizado con fórmula SEO: `{Brand} | {Event} - {Location} {Year}`
- [ ] `slug` generado SEO-friendly (lowercase, guiones)
- [ ] `description` con formato W4 (What, When, Where, Why) + métricas
- [ ] `summary` meta description optimizada (max 155 chars)

### Editorial
- [ ] `tone` definido (ej: "Corporativo, Premium")
- [ ] `audience` específico (ej: "Ejecutivos C-level 30-55 años")
- [ ] `highlights` array con 3-5 puntos clave

### SEO
- [ ] `seo_title` optimizado (max 60 chars, keywords adelante)
- [ ] `seo_description` optimizado (max 155 chars)
- [ ] `keywords` array con 5-8 keywords (branded + location + category + long-tail)
- [ ] `hashtags` array con 15-20 hashtags estratégicos
- [ ] `tags` array con 3-5 tags internos

### Social Media
- [ ] `instagram_hook` generado (pregunta o bold statement)
- [ ] `instagram_body` generado (storytelling con bullets)
- [ ] `instagram_closing` generado (CTA conversacional)
- [ ] `instagram_hashtags` string con hashtags específicos
- [ ] `alt_instagram` variante alternativa completa
- [ ] `linkedin_post` generado (formato B2B, métricas, insights)
- [ ] `linkedin_article` generado (caso de estudio largo)

### A/B Testing
- [ ] `alt_title_1` variante 1 de título
- [ ] `alt_title_2` variante 2 de título
- [ ] `alt_summary_1` variante 1 de resumen
- [ ] `alt_summary_2` variante 2 de resumen

### Location & Date
- [ ] `year` inferido (ej: "2024")
- [ ] `month` inferido (ej: "Noviembre")
- [ ] `country` inferido (ej: "Chile")
- [ ] `city` inferido (ej: "Santiago")
- [ ] `venue` inferido (ej: "Centro de Eventos CasaPiedra")
- [ ] `category` asignado (ej: "Eventos Corporativos")
- [ ] `subcategory` asignado (ej: "Cumbres y Convenciones")

### Performance
- [ ] `people_reached` inferido (alcance total)
- [ ] `attendees` inferido (asistentes directos)
- [ ] `days` inferido (duración del evento)
- [ ] `cities` inferido (número de ciudades)
- [ ] `screens` inferido (número de pantallas/instalaciones)
- [ ] `kpis` array con 3-6 métricas cuantificables
- [ ] `results_notes` párrafo agradecido (150-250 chars)

### Meta
- [ ] `audit_summary` generado con score antes/después

---

## 🐛 TROUBLESHOOTING

### Error: "Unauthorized" o "Failed to fetch events: 401"
```
✅ SOLUCIONADO: Ahora se usa publicAnonKey para autenticar con Supabase Edge Functions.
Las rutas internas del servidor no requieren verifyAuth(), pero Supabase sí requiere
el header Authorization con el publicAnonKey.

Si aún ves este error:
1. Verifica que publicAnonKey esté correcto en /utils/supabase/info.tsx
2. Asegúrate que el header Authorization esté presente en todas las requests
```

### Error: "Missing OPENAI_API_KEY"
```
Solución: 
1. Verificar que la variable de entorno OPENAI_API_KEY esté configurada en Supabase
2. Ir a Supabase Dashboard > Project Settings > Edge Functions > Secrets
3. Agregar OPENAI_API_KEY con tu API key de OpenAI
```

### Error: "Event not found"
```
Solución:
1. Verificar que el evento existe en la base de datos
2. Probar con búsqueda parcial: "Cencosud" en vez de "Cumbre Creativa Cencosud"
3. Revisar que el título coincida exactamente (case-insensitive)
```

### Error: "Failed to parse AI response"
```
Solución:
1. Revisar logs del servidor para ver la respuesta cruda de OpenAI
2. Puede ser un timeout - reintentar
3. Verificar que el modelo GPT-4o esté disponible en tu cuenta de OpenAI
```

### Audit se ejecuta pero los campos no aparecen en UI
```
Solución:
1. Hacer "Pull desde Supabase" en Admin Panel para recargar datos
2. Refrescar la página completa (Cmd+R o Ctrl+R)
3. Verificar en consola que la respuesta del audit fue exitosa
```

---

## 💰 COSTOS

- **Por audit individual:** ~$0.02 USD
- **Modelo:** GPT-4o
- **Tokens estimados:** ~3,500 tokens (2,000 input + 1,500 output)
- **Tiempo:** 5-10 segundos

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **Sistema completo:** `/MEGA_AUDIT_SYSTEM.md`
- **Changelog:** `/CHANGELOG_MEGA_AUDIT.md`
- **Prompt strategies:** `/supabase/functions/server/promptStrategies.ts`
- **Audit logic:** `/supabase/functions/server/auditAll.ts`

---

## ✅ DESPUÉS DEL TEST

1. **Verificar resultados** en Admin Panel
2. **Revisar calidad** de los campos generados
3. **Validar inferencias** (especialmente métricas y ubicaciones)
4. **Ajustar manualmente** si es necesario
5. **Remover componente de test** de /App.tsx
6. **Documentar aprendizajes** para mejoras futuras

---

**Happy Testing! 🚀**
