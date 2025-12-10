# ✅ ACTUALIZACIÓN: PROMPTS DE OPTIMIZACIÓN IA (CSM)

**Fecha:** 10 de Diciembre, 2024  
**Archivo Modificado:** `/supabase/functions/server/ai.ts`  
**Versión:** AI Prompt System v3.0  
**Status:** ✅ IMPLEMENTADO

---

## 🎯 OBJETIVO

Actualizar los prompts del sistema de optimización IA (CSM - Content System Manager) para que:

1. ❌ **NO incluya la marca "WAV BTL" ni "We Are Vision" en títulos**
2. ❌ **NO use "humo" o frases vacías** ("experiencia única", "inolvidable", etc.)
3. ✅ **Use formato limpio y directo** (Ejemplo: "Reunión 2016" NO "Reunión WAV BTL 2016")

---

## 📝 CAMBIOS IMPLEMENTADOS

### 1️⃣ TÍTULOS SIN MARCA (Core Content)

#### ANTES:
```
- Título optimizado (NUNCA incluir marca en el título, la marca ya aparece en el modal. 
  Usa formato: {Tipo de Evento} en {Location} {Year})
```

#### DESPUÉS:
```
- Título optimizado (NUNCA incluir la marca "WAV BTL" ni "We Are Vision". 
  El título debe ser SOLO el nombre del evento, limpio y directo. 
  Ejemplo: "Reunión 2016" NO "Reunión WAV BTL 2016")
```

---

### 2️⃣ SEO TITLE SIN MARCA (SEO & Metadata)

#### ANTES:
```
- SEO Title (max 60 chars, keywords adelante, SIN marca en título) 
  **OBLIGATORIO MAX 60 CARACTERES**
```

#### DESPUÉS:
```
- SEO Title (max 60 chars, keywords adelante, SIN marca "WAV BTL" ni "We Are Vision") 
  **OBLIGATORIO MAX 60 CARACTERES**
```

---

### 3️⃣ TÍTULOS ALTERNATIVOS SIN MARCA (A/B Testing)

#### ANTES:
```
**A/B Testing:**
- 2 títulos alternativos (diferentes ángulos, SIN marca)
- 2 resúmenes alternativos
```

#### DESPUÉS:
```
**A/B Testing:**
- 2 títulos alternativos (diferentes ángulos, SIN marca "WAV BTL" ni "We Are Vision")
- 2 resúmenes alternativos
```

---

### 4️⃣ PROHIBICIONES ESTRICTAS (Nueva Sección)

Se agregó una nueva sección completa de **PROHIBICIONES Y BUENAS PRÁCTICAS**:

```markdown
⚠️ **PROHIBICIONES ESTRICTAS (NO NEGOCIABLES):**
- ❌ NO incluir la marca "WAV BTL" ni "We Are Vision" en títulos 
     (title, alt_title_1, alt_title_2, seo_title)
- ❌ NO usar "humo" o frases vacías como "experiencia única", 
     "inolvidable", "revolucionario", "disruptivo"
- ❌ NO exagerar métricas o resultados sin respaldo visual
- ❌ NO usar emojis en ningún campo (excepto chat_response)
- ❌ NO inventar datos que no estén en la información provista

✅ **BUENAS PRÁCTICAS OBLIGATORIAS:**
- ✅ Títulos limpios y directos 
     (Ejemplo correcto: "Reunión 2016", NO "Reunión WAV BTL 2016")
- ✅ Descripciones concretas basadas en hechos visuales y datos reales
- ✅ Métricas realistas inferidas del tipo de evento y escala visual
- ✅ Lenguaje profesional sin adornos innecesarios
- ✅ Enfoque en impacto tangible y resultados medibles
```

---

### 5️⃣ REGLAS CRÍTICAS ACTUALIZADAS (JSON Schema)

Se actualizó la sección de **REGLAS CRÍTICAS** para incluir las prohibiciones:

#### ANTES:
```markdown
REGLAS CRÍTICAS (NO NEGOCIABLES):
- NO uses emojis en ningún campo (excepto chat_response si es necesario)
- **RESPETA ESTRICTAMENTE LOS LÍMITES DE CARACTERES**
- Los arrays deben tener entre 3-5 elementos como mínimo
- Todos los campos deben estar presentes en el JSON (aunque estén vacíos)
```

#### DESPUÉS:
```markdown
REGLAS CRÍTICAS (NO NEGOCIABLES):
- ❌ NO incluir la marca "WAV BTL" ni "We Are Vision" en títulos 
     (title, alt_title_1, alt_title_2, seo_title)
- ❌ NO usar "humo" o frases vacías como "experiencia única", 
     "inolvidable", "revolucionario", "disruptivo"
- ❌ NO exagerar métricas o resultados sin respaldo visual
- ❌ NO usar emojis en ningún campo (excepto chat_response)
- ❌ NO inventar datos que no estén en la información provista

✅ **BUENAS PRÁCTICAS OBLIGATORIAS:**
- ✅ Títulos limpios y directos 
     (Ejemplo correcto: "Reunión 2016", NO "Reunión WAV BTL 2016")
- ✅ Descripciones concretas basadas en hechos visuales y datos reales
- ✅ Métricas realistas inferidas del tipo de evento y escala visual
- ✅ Lenguaje profesional sin adornos innecesarios
- ✅ Enfoque en impacto tangible y resultados medibles
```

---

## 📊 IMPACTO DE LOS CAMBIOS

### Campos Afectados por "NO MARCA":

```typescript
✅ title: "Reunión 2016" // ❌ NO "Reunión WAV BTL 2016"
✅ seo_title: "Reunión 2016 - Evento Corporativo Santiago" // ❌ NO "Reunión WAV BTL 2016"
✅ alt_title_1: "Convención Anual 2016" // ❌ NO "Convención Anual WAV BTL 2016"
✅ alt_title_2: "Encuentro Corporativo 2016" // ❌ NO "Encuentro WAV BTL 2016"
```

**Razón:** La marca ya aparece en el modal en un campo separado (event.brand), incluirla en el título es redundante.

---

### Frases "Humo" Prohibidas:

```
❌ "experiencia única e inolvidable"
❌ "revolucionario evento que transformó la industria"
❌ "disruptiva activación que rompió paradigmas"
❌ "innovadora propuesta que superó expectativas"
❌ "espectacular montaje que dejó a todos sin palabras"

✅ "Activación retail con pantallas LED interactivas"
✅ "Lanzamiento de producto para 500 ejecutivos y prensa"
✅ "Gira nacional de 30 días en 5 ciudades"
✅ "Evento corporativo con streaming en vivo"
✅ "Instalación inmersiva con sensores de movimiento"
```

**Razón:** Marketing profesional se basa en hechos, no en adjetivos vacíos.

---

## 🎬 EJEMPLOS: ANTES vs DESPUÉS

### Ejemplo 1: Título de Evento Corporativo

**ANTES (Incorrecto):**
```json
{
  "title": "Reunión Anual WAV BTL 2016 - Experiencia Inolvidable",
  "seo_title": "Reunión Anual WAV BTL 2016 | We Are Vision",
  "alt_title_1": "WAV BTL Reunión 2016 - Evento Corporativo Único",
  "alt_title_2": "Reunión Ejecutiva WAV BTL 2016"
}
```

**DESPUÉS (Correcto):**
```json
{
  "title": "Reunión 2016",
  "seo_title": "Reunión 2016 - Evento Corporativo Santiago",
  "alt_title_1": "Convención Anual 2016",
  "alt_title_2": "Encuentro Corporativo 2016"
}
```

---

### Ejemplo 2: Description sin "Humo"

**ANTES (Incorrecto):**
```json
{
  "draft": "Una experiencia única e inolvidable que transformó la manera de ver los eventos corporativos. Un revolucionario encuentro que rompió todos los paradigmas, dejando a los asistentes sin palabras con su disruptiva propuesta."
}
```

**DESPUÉS (Correcto):**
```json
{
  "draft": "Evento corporativo realizado en Santiago el 15 de octubre de 2016. Reunión anual de ejecutivos con presentación de resultados anuales, talleres de liderazgo y networking. Participaron 350 colaboradores de 5 regiones. Destacó la integración de pantallas LED para presentaciones interactivas y sistema de votación en tiempo real."
}
```

---

### Ejemplo 3: Instagram sin "Humo"

**ANTES (Incorrecto):**
```json
{
  "instagram_hook": "🚀 La experiencia más REVOLUCIONARIA del año está aquí",
  "instagram_body": "Un evento INOLVIDABLE que transformó la industria para SIEMPRE. Una propuesta DISRUPTIVA que superó TODAS las expectativas. ¿Quieres saber más? 👇",
  "instagram_closing": "¡Una experiencia ÚNICA que nunca olvidarás! 💫✨"
}
```

**DESPUÉS (Correcto):**
```json
{
  "instagram_hook": "350 colaboradores reunidos en Santiago",
  "instagram_body": "Nuestra reunión anual 2016 incluyó presentación de resultados, talleres de liderazgo y networking. Destacó el sistema de votación interactiva con pantallas LED y streaming en vivo para equipos remotos.",
  "instagram_closing": "Gracias a todos los que participaron y aportaron ideas"
}
```

---

## 🧪 VALIDACIÓN DEL SISTEMA

### ✅ Test 1: Optimizar Evento Existente

```bash
# Backend endpoint
POST /make-server-c4bb2206/optimize-event/:eventId

# Resultado esperado:
{
  "success": true,
  "event": {
    "title": "Reunión 2016", // ✅ SIN marca
    "seo_title": "Reunión 2016 - Evento Corporativo", // ✅ SIN marca
    "description": "Evento corporativo realizado en...", // ✅ SIN humo
    "alt_title_1": "Convención Anual 2016", // ✅ SIN marca
    "alt_title_2": "Encuentro Corporativo 2016" // ✅ SIN marca
  }
}
```

---

### ✅ Test 2: Optimizar Todos los Eventos

```bash
# Backend endpoint
POST /make-server-c4bb2206/optimize-all-events

# Resultado esperado:
{
  "total": 50,
  "optimized": 45,
  "skipped": 5,
  "errors": 0,
  "results": [
    {
      "eventId": "event-1",
      "title": "Lanzamiento iPhone X", // ✅ SIN marca WAV BTL
      "fieldsUpdated": ["title", "seo_title", "description"]
    }
  ]
}
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

Al optimizar un evento con IA, verifica que:

```
✅ Títulos NO contienen "WAV BTL" ni "We Are Vision"
✅ Títulos NO contienen "humo" (único, inolvidable, revolucionario)
✅ Description es concreta y basada en hechos
✅ Métricas son realistas según tipo de evento
✅ SEO title respeta los 60 caracteres
✅ SEO description respeta los 155 caracteres
✅ Highlights son accionables (no adjetivos vacíos)
✅ Instagram copy es profesional sin emojis excesivos
✅ LinkedIn post es ejecutivo y orientado a negocio
```

---

## 🔄 PROMPTS ACTUALIZADOS

### Trigger: "OPTIMIZAR TODO" o "MEGA AUDIT"

```typescript
const messages = [
  { 
    role: 'user', 
    content: 'OPTIMIZAR TODO. Analiza visualmente las imágenes e infiere todos los datos faltantes.' 
  }
];
```

**Resultado:** La IA generará todos los campos según las nuevas reglas:
- ✅ Títulos sin marca
- ✅ Descripciones sin humo
- ✅ Métricas realistas
- ✅ Contenido profesional

---

## 📖 CONTEXTO ADICIONAL

### ¿Por qué NO incluir la marca en títulos?

1. **Redundancia:** La marca ya aparece en `event.brand` y se muestra en el modal
2. **SEO:** Los títulos con marca ocupan espacio valioso (60 chars)
3. **UX:** El usuario ya sabe que está en el sitio de WAV BTL
4. **Flexibilidad:** Permite reutilizar contenido en otros contextos

---

### ¿Por qué NO usar "humo"?

1. **Credibilidad:** Marketing profesional se basa en hechos, no promesas
2. **SEO:** Google prioriza contenido informativo sobre marketing genérico
3. **Conversión:** Los usuarios buscan información concreta, no adjetivos
4. **Branding:** WAV BTL se posiciona como agencia técnica y profesional

---

### Ejemplo de Título Correcto:

```
✅ CORRECTO: "Reunión 2016"
   - Limpio
   - Directo
   - Sin marca
   - Sin humo
   - Fácil de entender

❌ INCORRECTO: "Reunión Anual WAV BTL 2016 - Experiencia Corporativa Inolvidable"
   - Incluye marca (redundante)
   - Incluye "humo" (Inolvidable)
   - Demasiado largo
   - Dificulta SEO
```

---

## 🎯 RESULTADO FINAL

El sistema de optimización IA ahora genera contenido:

```
✅ Profesional y concreto
✅ Sin marca en títulos
✅ Sin "humo" o frases vacías
✅ Basado en análisis visual real
✅ Con métricas realistas
✅ Optimizado para SEO
✅ Listo para publicar
```

---

## 📞 SOPORTE

Si la IA sigue generando títulos con marca o "humo":

1. Verifica que el archivo `/supabase/functions/server/ai.ts` esté actualizado
2. Reinicia el servidor Deno: `deno cache --reload`
3. Prueba con un evento nuevo: `POST /optimize-event/:eventId`
4. Revisa los logs del servidor para mensajes de error

---

**Documento creado:** 10 de Diciembre, 2024  
**Autor:** Sistema de Optimización WAV BTL  
**Versión:** 3.0 (AI Prompt System)  
**Status:** ✅ IMPLEMENTADO Y DOCUMENTADO
