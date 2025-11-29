# 🚀 WAV BTL — PLAN DE IMPLEMENTACIÓN V2.0 (Con IA Media Processing)

**Timeline Total:** 3-4 semanas  
**Enfoque:** Migración a Supabase + CMS inteligente + Pipeline de IA  
**Objetivo:** Sistema production-ready para 100+ eventos reales con procesamiento automático

---

## 📊 OVERVIEW ESTRATÉGICO

```
┌─────────────────────────────────────────────────────────────────┐
│  FASES DEL PROYECTO                                             │
└─────────────────────────────────────────────────────────────────┘

SEMANA 1: Infraestructura Base
├─ Días 1-2: Fix críticos frontend (Modal, SEO básico)
├─ Días 3-4: Setup Supabase producción (DB + Storage + Functions)
└─ Día 5: Design System foundations

SEMANA 2: CMS + IA Pipeline
├─ Días 6-7: Admin Panel CMS (upload masivo, metadata)
├─ Días 8-9: Pipeline IA - Fase 1 (análisis visual, generación textos)
└─ Día 10: Testing pipeline con 3-5 eventos reales

SEMANA 3: IA Media Processing Avanzado
├─ Días 11-12: Cropeo inteligente de fotos
├─ Días 13-14: Análisis de videos + clips automáticos
└─ Día 15: Mejora de calidad con IA (upscaling, estabilización)

SEMANA 4: Producción & Repoblación Masiva
├─ Días 16-17: Quality assurance + ajustes finales
├─ Días 18-19: Ingesta de 100+ eventos existentes
└─ Día 20: Deploy a producción + testing final
```

---

## 🎯 SEMANA 1: INFRAESTRUCTURA BASE

### **DÍA 1-2: FIXES CRÍTICOS FRONTEND** (Ya documentado en Plan V1)

**Tasks:**
- [ ] Crear `/lib/constants/` (tokens, zIndex, safeAreas, animations)
- [ ] Fix Modal layout con safe areas
- [ ] Actualizar Controls.tsx z-index
- [ ] SEO básico (BreadcrumbSchema, ArticleSchema)
- [ ] Testing manual

**Entregable:** Frontend estable sin bugs visuales.

---

### **DÍA 3-4: SETUP SUPABASE PRODUCCIÓN**

#### **Objetivo:** Crear proyecto Supabase real + estructura relacional

#### **3.1 Crear Proyecto Supabase (1 hora)**

```bash
# En Supabase Dashboard:
1. Create new project: "wav-btl-production"
2. Region: us-east-1 (o South America si disponible)
3. Database password: [STRONG PASSWORD]
4. Wait for provisioning (~2 min)
```

#### **3.2 Ejecutar Migrations SQL (2 horas)**

**Archivo: `/supabase/migrations/001_initial_schema.sql`**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CLIENTS TABLE
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_id UUID,
  industry TEXT,
  website TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SUBCATEGORIES TABLE
CREATE TABLE subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  active BOOLEAN DEFAULT TRUE,
  UNIQUE(category_id, slug),
  created_at TIMESTAMP DEFAULT NOW()
);

-- USERS TABLE (para admin)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- EVENTS TABLE (principal)
CREATE TABLE events (
  -- Identificación
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  
  -- Core content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  summary TEXT,
  
  -- Clasificación
  client_id UUID REFERENCES clients(id),
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES subcategories(id),
  
  -- Temporal
  event_date DATE,
  year INTEGER,
  month INTEGER,
  
  -- Ubicación
  country TEXT DEFAULT 'Chile',
  city TEXT,
  venue TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  og_image_id UUID, -- Will reference media(id)
  canonical_url TEXT,
  
  -- Tone & Audience
  tone TEXT CHECK (tone IN ('professional', 'playful', 'luxury', 'technical', 'youthful', 'corporate')),
  target_audience TEXT,
  
  -- Performance
  people_reached INTEGER,
  attendees INTEGER,
  days_duration INTEGER,
  cities_count INTEGER,
  screens_count INTEGER,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- MEDIA TABLE (fotos, videos, logos)
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Storage
  storage_path TEXT NOT NULL,
  original_filename TEXT,
  file_size BIGINT,
  
  -- Tipo
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'logo')),
  mime_type TEXT,
  
  -- Dimensiones
  width INTEGER,
  height INTEGER,
  duration FLOAT,
  aspect_ratio TEXT,
  
  -- Metadata de IA
  ai_detected_objects JSONB,
  ai_transcription TEXT,
  ai_description TEXT,
  ai_quality_score FLOAT,
  
  -- Crops (para imágenes)
  crops JSONB,
  
  -- Clips (para videos)
  clips JSONB,
  
  -- Procesamiento
  is_processed BOOLEAN DEFAULT FALSE,
  processing_status TEXT DEFAULT 'pending',
  processing_error TEXT,
  
  -- Orden
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- KEYWORDS TABLE
CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- EVENT_KEYWORDS (many-to-many)
CREATE TABLE event_keywords (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  keyword_id UUID REFERENCES keywords(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, keyword_id)
);

-- EVENT_SOCIAL_CONTENT
CREATE TABLE event_social_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Instagram
  instagram_hook TEXT,
  instagram_body TEXT,
  instagram_closing TEXT,
  instagram_hashtags TEXT,
  
  -- LinkedIn
  linkedin_post TEXT,
  linkedin_article TEXT,
  
  -- A/B Testing
  title_variant_a TEXT,
  title_variant_b TEXT,
  description_variant_a TEXT,
  description_variant_b TEXT,
  
  -- Performance tracking
  variant_a_impressions INTEGER DEFAULT 0,
  variant_b_impressions INTEGER DEFAULT 0,
  variant_a_clicks INTEGER DEFAULT 0,
  variant_b_clicks INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- EVENT_KPIS
CREATE TABLE event_kpis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  kpi_name TEXT NOT NULL,
  kpi_value TEXT NOT NULL,
  kpi_unit TEXT,
  display_order INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- ÍNDICES PARA PERFORMANCE
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_client ON events(client_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_media_event ON media(event_id);
CREATE INDEX idx_media_type ON media(media_type);
CREATE INDEX idx_media_featured ON media(is_featured);
CREATE INDEX idx_media_processing ON media(processing_status);

-- Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access for published events
CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (status = 'published');

-- Policy: Public can view media of published events
CREATE POLICY "Public can view media of published events"
  ON media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = media.event_id 
      AND events.status = 'published'
    )
  );

-- Policy: Admins can do everything (will be refined with auth)
-- (Temporal - configurar auth después)
```

**Ejecutar:**
```bash
# En Supabase Dashboard > SQL Editor
# Copy-paste el SQL anterior y ejecutar
```

#### **3.3 Poblar Categorías Iniciales (30 min)**

```sql
-- Insert categories
INSERT INTO categories (name, slug, description, display_order, active) VALUES
('Activaciones de Marca', 'activaciones-de-marca', 'Experiencias interactivas para generar engagement', 1, true),
('Eventos Corporativos', 'eventos-corporativos', 'Congresos, seminarios, team building', 2, true),
('Lanzamientos de Producto', 'lanzamientos-de-producto', 'Presentación de nuevos productos', 3, true),
('Experiencias Inmersivas', 'experiencias-inmersivas', 'VR, mapping, instalaciones sensoriales', 4, true),
('Stands & Ferias', 'stands-ferias', 'Diseño y construcción de stands', 5, true),
('Instalaciones Tecnológicas', 'instalaciones-tecnologicas', 'Proyectos tech e interactivos', 6, true),
('Producción Audiovisual', 'produccion-audiovisual', 'Streaming, grabación, live shows', 7, true),
('Arquitectura Efímera', 'arquitectura-efimera', 'Construcciones temporales, escenografías', 8, true),
('Retail & Pop-Ups', 'retail-pop-ups', 'Tiendas temporales, POS', 9, true),
('Logística & Operaciones', 'logistica-operaciones', 'Gestión de eventos complejos', 10, true);
```

#### **3.4 Configurar Storage (1 hora)**

**En Supabase Dashboard:**

1. **Storage > Create Bucket:**
   - Name: `wav-events-media`
   - Public: NO (private)
   - File size limit: 100MB
   - Allowed MIME types: `image/*, video/*`

2. **Crear Políticas de Storage:**

```sql
-- Policy: Public can view media URLs (signed URLs will be used)
CREATE POLICY "Public can view event media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wav-events-media');

-- Policy: Authenticated users can upload (temporal - refinar después)
CREATE POLICY "Authenticated can upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'wav-events-media' AND auth.role() = 'authenticated');
```

#### **3.5 Actualizar Edge Functions (2 horas)**

**Migrar de KV Store a Postgres:**

**Archivo: `/supabase/functions/server/db.ts` (nuevo)**

```typescript
import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper para generar signed URLs
export const generateSignedUrls = async (media: any[]) => {
  const BUCKET = 'wav-events-media';
  const EXPIRY = 3600 * 24; // 24 horas
  
  return Promise.all(media.map(async (item) => {
    if (!item.storage_path) return item;
    
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(item.storage_path, EXPIRY);
    
    if (data) {
      return { ...item, url: data.signedUrl };
    }
    return item;
  }));
};
```

**Actualizar `/supabase/functions/server/index.tsx`:**

```typescript
import { supabase, generateSignedUrls } from './db.ts';

// GET /events - Ahora desde Postgres
app.get(`${BASE_PATH}/events`, async (c) => {
  try {
    // Query events con joins
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        client:clients(name, slug),
        category:categories(name, slug),
        media(*)
      `)
      .eq('status', 'published')
      .order('event_date', { ascending: false });
    
    if (error) throw error;
    
    // Generar signed URLs para media
    const eventsWithMedia = await Promise.all(events.map(async (event) => {
      if (event.media && event.media.length > 0) {
        event.media = await generateSignedUrls(event.media);
      }
      return event;
    }));
    
    return c.json(eventsWithMedia);
  } catch (e) {
    console.error("Error fetching events:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST /events - Ahora a Postgres
app.post(`${BASE_PATH}/events`, async (c) => {
  if (!await verifyAuth(c)) return c.text("Unauthorized", 401);
  
  try {
    const eventData = await c.req.json();
    
    // Insert event
    const { data: newEvent, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
    
    if (error) throw error;
    
    return c.json(newEvent);
  } catch (e) {
    console.error("Error creating event:", e);
    return c.json({ error: e.message }, 500);
  }
});
```

**Entregable:** Base de datos relacional funcionando + Edge Functions actualizadas.

---

### **DÍA 5: DESIGN SYSTEM FOUNDATIONS**

(Ya documentado en Plan V1 - Día 3-4)

**Tasks:**
- [ ] Crear primitivos básicos (Heading, Body, Button)
- [ ] TrapezoidMask component
- [ ] Index files para imports

**Entregable:** Sistema de componentes base listo.

---

## 🤖 SEMANA 2: CMS + IA PIPELINE

### **DÍA 6-7: ADMIN PANEL CMS**

#### **Objetivo:** Interfaz para subir carpetas de eventos + metadata manual

#### **6.1 Crear Upload Component (3 horas)**

**Archivo: `/components/features/admin-panel/components/EventUploader.tsx`**

```tsx
import React, { useState } from 'react';
import { Upload, FolderOpen, Image, Video } from 'lucide-react';

interface EventUploaderProps {
  onUploadComplete: (files: File[], metadata: any) => void;
}

export const EventUploader: React.FC<EventUploaderProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState({
    client: '',
    eventDate: '',
    category: '',
  });
  
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    // Convertir FileList a Array y filtrar solo imágenes/videos
    const filesArray = Array.from(fileList).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    setFiles(filesArray);
  };
  
  const handleSubmit = () => {
    if (files.length === 0) {
      alert('Debes subir al menos 1 archivo');
      return;
    }
    
    if (!metadata.client || !metadata.eventDate || !metadata.category) {
      alert('Completa los campos requeridos');
      return;
    }
    
    onUploadComplete(files, metadata);
  };
  
  return (
    <div className="p-6 bg-neutral-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Upload Evento</h2>
      
      {/* Folder Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-bold">
          Seleccionar carpeta de evento
        </label>
        <input
          type="file"
          multiple
          webkitdirectory=""
          directory=""
          onChange={handleFolderUpload}
          className="block w-full"
        />
        <p className="text-sm text-neutral-400 mt-2">
          {files.length} archivos seleccionados
        </p>
      </div>
      
      {/* Metadata Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-bold">Cliente *</label>
          <input
            type="text"
            value={metadata.client}
            onChange={(e) => setMetadata({...metadata, client: e.target.value})}
            className="w-full p-2 bg-black border border-white/20 rounded"
            placeholder="Nike"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-bold">Fecha *</label>
          <input
            type="date"
            value={metadata.eventDate}
            onChange={(e) => setMetadata({...metadata, eventDate: e.target.value})}
            className="w-full p-2 bg-black border border-white/20 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-bold">Categoría *</label>
          <select
            value={metadata.category}
            onChange={(e) => setMetadata({...metadata, category: e.target.value})}
            className="w-full p-2 bg-black border border-white/20 rounded"
          >
            <option value="">Seleccionar...</option>
            <option value="activaciones-de-marca">Activaciones de Marca</option>
            <option value="eventos-corporativos">Eventos Corporativos</option>
            {/* ...resto de categorías */}
          </select>
        </div>
      </div>
      
      {/* Preview */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Preview:</h3>
          <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
            {files.slice(0, 12).map((file, i) => (
              <div key={i} className="aspect-square bg-neutral-800 rounded overflow-hidden">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video size={24} className="text-white/40" />
                  </div>
                )}
              </div>
            ))}
            {files.length > 12 && (
              <div className="aspect-square bg-neutral-800 rounded flex items-center justify-center">
                <span className="text-sm">+{files.length - 12}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-white text-black font-bold rounded hover:bg-neutral-200 transition"
      >
        Subir y Procesar con IA →
      </button>
    </div>
  );
};
```

#### **6.2 Crear Upload Handler (2 horas)**

**Archivo: `/src/hooks/useEventUpload.ts`**

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface UploadProgress {
  total: number;
  uploaded: number;
  current: string;
}

export const useEventUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({ total: 0, uploaded: 0, current: '' });
  
  const uploadEvent = async (files: File[], metadata: any) => {
    setIsUploading(true);
    setProgress({ total: files.length, uploaded: 0, current: '' });
    
    try {
      // 1. Crear evento en DB (status: 'draft')
      const { data: event, error: eventError } = await supabase
        .from('events')
        .insert({
          title: `${metadata.client} - Evento ${metadata.eventDate}`, // Temporal
          description: 'Procesando con IA...', // Será reemplazado por IA
          status: 'draft',
          event_date: metadata.eventDate,
        })
        .select()
        .single();
      
      if (eventError) throw eventError;
      
      // 2. Subir archivos a Storage
      const uploadedMedia = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(prev => ({ ...prev, uploaded: i, current: file.name }));
        
        // Generar path único
        const ext = file.name.split('.').pop();
        const fileName = `${event.id}/${Date.now()}-${i}.${ext}`;
        
        // Upload a Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('wav-events-media')
          .upload(fileName, file);
        
        if (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError);
          continue;
        }
        
        // 3. Crear registro en tabla media
        const { data: mediaRecord, error: mediaError } = await supabase
          .from('media')
          .insert({
            event_id: event.id,
            storage_path: fileName,
            original_filename: file.name,
            file_size: file.size,
            media_type: file.type.startsWith('image/') ? 'image' : 'video',
            mime_type: file.type,
            processing_status: 'pending', // IA lo procesará
          })
          .select()
          .single();
        
        if (!mediaError) {
          uploadedMedia.push(mediaRecord);
        }
      }
      
      setProgress(prev => ({ ...prev, uploaded: files.length, current: 'Completado!' }));
      
      // 4. Trigger IA processing
      await fetch('/api/process-event-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id }),
      });
      
      setIsUploading(false);
      return event;
      
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      throw error;
    }
  };
  
  return { uploadEvent, isUploading, progress };
};
```

**Entregable:** CMS funcional para subir eventos con archivos.

---

### **DÍA 8-9: PIPELINE IA - FASE 1**

#### **Objetivo:** Análisis visual automático + generación de textos

#### **8.1 Crear Edge Function para IA (4 horas)**

**Archivo: `/supabase/functions/server/ai-processor.ts`**

```typescript
import { OpenAI } from "npm:openai";
import { supabase } from './db.ts';

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

// Importar el schema JSON
import eventSchema from './wav-event-schema.json' assert { type: 'json' };

export const processEventWithAI = async (eventId: string) => {
  console.log(`[AI] Starting processing for event ${eventId}`);
  
  try {
    // 1. Fetch event y su media
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select(`
        *,
        media(*)
      `)
      .eq('id', eventId)
      .single();
    
    if (eventError) throw eventError;
    
    // 2. Analizar imágenes con GPT-4 Vision
    const imageAnalysis = await analyzeImages(event.media.filter(m => m.media_type === 'image'));
    
    // 3. Generar contenido con GPT-4
    const generatedContent = await generateEventContent(event, imageAnalysis);
    
    // 4. Actualizar evento en DB
    await supabase
      .from('events')
      .update({
        title: generatedContent.title,
        description: generatedContent.description,
        summary: generatedContent.summary,
        seo_title: generatedContent.seo_title,
        seo_description: generatedContent.seo_description,
        tone: generatedContent.tone,
        target_audience: generatedContent.target_audience,
        status: 'review', // Listo para revisión humana
      })
      .eq('id', eventId);
    
    // 5. Crear social content
    await supabase
      .from('event_social_content')
      .insert({
        event_id: eventId,
        instagram_hook: generatedContent.instagram_hook,
        instagram_body: generatedContent.instagram_body,
        instagram_closing: generatedContent.instagram_closing,
        instagram_hashtags: generatedContent.instagram_hashtags,
        linkedin_post: generatedContent.linkedin_post,
        title_variant_a: generatedContent.title_variant_a,
        title_variant_b: generatedContent.title_variant_b,
      });
    
    // 6. Crear keywords
    for (const keyword of generatedContent.keywords) {
      // Upsert keyword
      const { data: kw } = await supabase
        .from('keywords')
        .upsert({ keyword }, { onConflict: 'keyword' })
        .select()
        .single();
      
      // Link to event
      await supabase
        .from('event_keywords')
        .insert({ event_id: eventId, keyword_id: kw.id });
    }
    
    console.log(`[AI] ✅ Completed processing for event ${eventId}`);
    return { success: true };
    
  } catch (error) {
    console.error(`[AI] Error processing event ${eventId}:`, error);
    
    // Marcar evento con error
    await supabase
      .from('events')
      .update({ status: 'draft', description: `Error: ${error.message}` })
      .eq('id', eventId);
    
    throw error;
  }
};

// Analizar imágenes con GPT-4 Vision
async function analyzeImages(images: any[]) {
  const imageUrls = images.slice(0, 10).map(img => ({
    type: "image_url",
    image_url: { url: img.url }
  }));
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: `Eres un experto en marketing BTL analizando fotos de eventos.
        
Analiza estas imágenes y responde en JSON:
{
  "client": "Marca detectada (logo visible)",
  "event_type": "Tipo de evento (activación, stand, lanzamiento, etc.)",
  "venue": "Lugar (mall, parque, estadio, etc.)",
  "technologies": ["LED", "VR", "Mapping", etc.],
  "people_count": "Estimación de asistentes (<100, 100-500, 500-2000, >2000)",
  "tone": "professional | playful | luxury | technical | youthful | corporate",
  "key_elements": ["Elemento 1", "Elemento 2", ...],
  "description": "Descripción detallada de lo que ves en las imágenes"
}`
      },
      {
        role: "user",
        content: imageUrls
      }
    ],
    max_tokens: 1000,
  });
  
  return JSON.parse(response.choices[0].message.content);
}

// Generar todo el contenido textual
async function generateEventContent(event: any, visualAnalysis: any) {
  const prompt = `Eres un copywriter experto en marketing BTL para We Are Vision, una agencia líder en Chile.

CONTEXTO DEL EVENTO:
- Fecha: ${event.event_date}
- Análisis visual: ${JSON.stringify(visualAnalysis, null, 2)}

SCHEMA COMPLETO:
${JSON.stringify(eventSchema, null, 2)}

TASK:
Genera TODO el contenido para este evento siguiendo el schema JSON adjunto.
Incluye TODOS los campos requeridos:
- title (SEO optimizado, 50-80 chars)
- description (narrativa 2-3 párrafos, 200-1000 chars)
- summary (1-2 oraciones, max 160 chars)
- seo_title, seo_description
- keywords (array de 10-15 keywords)
- hashtags (array de 5-8 hashtags)
- instagram_hook, instagram_body, instagram_closing, instagram_hashtags
- linkedin_post
- title_variant_a, title_variant_b
- description_variant_a, description_variant_b
- tone, target_audience

INSTRUCCIONES:
1. Analiza el análisis visual para entender el evento
2. Crea un título descriptivo que incluya marca + tipo de evento
3. Describe lo que VES en las imágenes de forma profesional
4. Genera keywords combinando: marca, industria, tecnología, ubicación
5. Crea contenido RRSS adaptado a cada plataforma
6. Si no hay suficiente info, sé creativo pero honesto

Responde SOLO con JSON válido (sin markdown):`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "Eres un experto en marketing BTL y copywriting. Respondes SOLO en JSON válido." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 3000,
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

#### **8.2 Crear Endpoint en Server (1 hora)**

```typescript
// En /supabase/functions/server/index.tsx

import { processEventWithAI } from './ai-processor.ts';

app.post(`${BASE_PATH}/process-event-ai`, async (c) => {
  if (!await verifyAuth(c)) return c.text("Unauthorized", 401);
  
  try {
    const { eventId } = await c.req.json();
    
    if (!eventId) {
      return c.json({ error: 'Missing eventId' }, 400);
    }
    
    // Procesar en background (no esperar respuesta)
    processEventWithAI(eventId).catch(err => 
      console.error('Background AI processing error:', err)
    );
    
    return c.json({ success: true, message: 'Processing started' });
    
  } catch (e) {
    console.error("Error starting AI processing:", e);
    return c.json({ error: e.message }, 500);
  }
});
```

**Entregable:** Pipeline de IA funcionando - genera textos automáticamente.

---

### **DÍA 10: TESTING PIPELINE**

**Objetivo:** Probar pipeline completo con 3-5 eventos reales

**Tasks:**
- [ ] Subir 3 eventos de prueba (carpetas reales de WAV)
- [ ] Verificar que IA genera contenido coherente
- [ ] Ajustar prompts si es necesario
- [ ] Medir tiempos de procesamiento
- [ ] Documentar casos edge

**Entregable:** Pipeline validado y optimizado.

---

## 🎨 SEMANA 3: IA MEDIA PROCESSING AVANZADO

### **DÍA 11-12: CROPEO INTELIGENTE DE FOTOS**

#### **Objetivo:** Generar crops automáticos para diferentes aspect ratios

#### **11.1 Implementar Detección de Objetos (3 horas)**

**Usar GPT-4 Vision para detectar regiones de interés:**

```typescript
async function generateSmartCrops(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: `Analiza esta imagen y sugiere crops optimizados para diferentes aspect ratios.

Detecta:
1. Logos de marcas (posición x,y)
2. Rostros de personas (posición x,y)
3. Productos destacados (posición x,y)
4. Zona de acción principal

Responde en JSON:
{
  "detections": [
    {"type": "logo", "x": 100, "y": 50, "w": 200, "h": 100, "importance": 0.9},
    {"type": "face", "x": 500, "y": 300, "w": 150, "h": 150, "importance": 0.7},
    ...
  ],
  "suggested_crops": {
    "square_1_1": {"x": 200, "y": 100, "w": 800, "h": 800, "focus": "logo and main action"},
    "landscape_16_9": {"x": 0, "y": 200, "w": 1920, "h": 1080, "focus": "wide view"},
    "portrait_4_5": {"x": 300, "y": 0, "w": 800, "h": 1000, "focus": "people"},
    "ultrawide_21_9": {"x": 0, "y": 300, "w": 1920, "h": 823, "focus": "panoramic"}
  }
}`
      },
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      }
    ]
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

#### **11.2 Integrar en Pipeline (2 horas)**

Actualizar `ai-processor.ts`:

```typescript
// Después de subir imágenes, procesar crops
for (const media of event.media.filter(m => m.media_type === 'image')) {
  const signedUrl = await getSignedUrl(media.storage_path);
  const crops = await generateSmartCrops(signedUrl);
  
  // Guardar crops en DB
  await supabase
    .from('media')
    .update({ 
      crops: crops.suggested_crops,
      ai_detected_objects: crops.detections,
    })
    .eq('id', media.id);
}
```

**Entregable:** Crops automáticos listos para cada imagen.

---

### **DÍA 13-14: ANÁLISIS DE VIDEOS + CLIPS AUTOMÁTICOS**

#### **Objetivo:** Detectar escenas y generar clips de 5-15 segundos

#### **13.1 Implementar Scene Detection (4 horas)**

**Usar servicio externo (Cloudflare Stream o similar) o implementar con ffmpeg:**

```typescript
async function analyzeVideoScenes(videoPath: string) {
  // Opción 1: Usar Cloudflare Stream API
  // Opción 2: Usar ffmpeg en Edge Function (limitado)
  // Opción 3: Usar servicio tercero (Mux, etc.)
  
  // Ejemplo simplificado con timestamps manuales:
  // En producción real, usar servicio de análisis de video
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `Basándote en la transcripción de audio y descripción del video, sugiere 3-5 clips de 5-15 segundos que sean ideales para RRSS.

Prioriza:
- Momentos con logo visible
- Acción/interacción de personas
- Reveals de productos
- Momentos emocionales
- Panorámicas impresionantes

Responde en JSON:
{
  "clips": [
    {
      "start": 5.2,
      "end": 12.8,
      "duration": 7.6,
      "description": "Logo reveal con transición LED",
      "score": 0.95,
      "best_for": "Instagram Reels"
    },
    ...
  ]
}`
      },
      {
        role: "user",
        content: `Video duration: 120 segundos
Transcription: [audio transcription here]
Description: Activación de marca en mall con pantallas LED`
      }
    ]
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

#### **13.2 Guardar Clips Sugeridos (1 hora)**

```typescript
// En ai-processor.ts
for (const media of event.media.filter(m => m.media_type === 'video')) {
  const clips = await analyzeVideoScenes(media.storage_path);
  
  await supabase
    .from('media')
    .update({ clips: clips.clips })
    .eq('id', media.id);
}
```

**Entregable:** Clips sugeridos automáticamente por IA.

---

### **DÍA 15: MEJORA DE CALIDAD CON IA**

#### **Objetivo:** Upscaling de imágenes, estabilización de video

**Opciones:**

1. **Upscaling de imágenes (<1920px):**
   - Usar API de Replicate (Real-ESRGAN, etc.)
   - Procesar solo si quality_score > 60

2. **Estabilización de video:**
   - Usar Cloudflare Stream
   - O servicio tercero especializado

3. **Compresión inteligente:**
   - WebP para imágenes
   - H.265 para videos

**Implementación simplificada (ejemplo con Replicate):**

```typescript
import Replicate from "npm:replicate";

const replicate = new Replicate({
  auth: Deno.env.get("REPLICATE_API_TOKEN"),
});

async function upscaleImage(imageUrl: string) {
  const output = await replicate.run(
    "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
    {
      input: {
        image: imageUrl,
        scale: 2,
        face_enhance: false
      }
    }
  );
  
  return output; // URL de imagen mejorada
}
```

**Entregable:** Sistema de mejora de calidad opcional.

---

## 🚀 SEMANA 4: PRODUCCIÓN & REPOBLACIÓN MASIVA

### **DÍA 16-17: QUALITY ASSURANCE**

**Tasks:**
- [ ] Revisar manualmente 10 eventos procesados por IA
- [ ] Ajustar prompts según resultados
- [ ] Crear checklist de QA
- [ ] Documentar workflow de revisión humana

### **DÍA 18-19: INGESTA MASIVA**

**Estrategia:**
1. Crear script de batch upload
2. Procesar 10 eventos por día (para no saturar OpenAI API)
3. Revisión humana gradual

**Script ejemplo:**

```typescript
// batch-upload.ts
const eventFolders = [
  '/path/to/evento-1',
  '/path/to/evento-2',
  // ... 100+ eventos
];

for (const folder of eventFolders) {
  const files = await readFolder(folder);
  const metadata = extractMetadataFromFolderName(folder);
  
  await uploadEvent(files, metadata);
  
  // Rate limiting (10 eventos/día)
  await sleep(8.64e6); // 24 horas / 10 = 8.64M ms
}
```

### **DÍA 20: DEPLOY A PRODUCCIÓN**

**Checklist final:**
- [ ] Migrar .env variables a producción
- [ ] Configurar dominio custom
- [ ] SSL certificates
- [ ] CDN setup (Cloudflare)
- [ ] Analytics (GA4, Clarity)
- [ ] Monitoring (Sentry)
- [ ] Backup strategy

**Entregable:** Sitio en producción con eventos reales.

---

## 📋 MÉTRICAS DE ÉXITO

| Métrica | Target | Medición |
|---------|--------|----------|
| **Eventos migrados** | 100+ | Count en DB |
| **Calidad de textos IA** | 80% aprovable sin edición | Revisión manual |
| **Crops automáticos útiles** | 70% usables | QA visual |
| **Clips útiles** | 60% usables | QA de videos |
| **Tiempo de procesamiento** | <5 min por evento | Logs |
| **Lighthouse Score** | >90 | Lighthouse CI |

---

**FIN DEL PLAN V2.0**

¿Listo para empezar con la Semana 1? 🚀
