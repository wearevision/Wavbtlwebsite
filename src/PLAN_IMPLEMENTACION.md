# 📅 WAV BTL — PLAN DE IMPLEMENTACIÓN (Opción C: Híbrido)

**Timeline:** 10 días laborables (2 semanas)  
**Objetivo:** Fixes críticos + Fundación sólida + Modal refactorizado  
**Metodología:** Incremental (sin breaking changes hasta el final)

---

## 🎯 OVERVIEW DEL PLAN

```
FASE 0: Stabilización            → Días 1-2   (FIX CRÍTICO)
FASE 1: Design System Foundation → Días 3-7   (INFRAESTRUCTURA)
FASE 2: Modal Refactor           → Días 8-10  (FEATURE PRINCIPAL)
```

**Resultado esperado al día 10:**
- ✅ Modal completamente funcional (sin overlaps)
- ✅ Sistema de diseño base implementado
- ✅ SEO mejorado para IA crawlers
- ✅ Código más mantenible y escalable
- ⏸️ Admin Panel y Mosaic sin cambios (estables)

---

## 📆 DÍA POR DÍA

### **DÍA 1: Fundaciones + Fix Z-Index**

#### **Objetivo:** Crear constantes y arreglar jerarquía z-index

#### **Tasks:**

**1.1 Crear estructura de carpetas (15 min)**
```bash
mkdir -p lib/constants
mkdir -p components/design-system/foundations
```

**1.2 Crear `/lib/constants/tokens.ts` (1 hora)**
- Copiar estructura de ARQUITECTURA_PROPUESTA.md
- Exportar TOKENS object
- Validar que compila

**1.3 Crear `/lib/constants/zIndex.ts` (30 min)**
- Definir Z_INDEX según Guidelines.md
- Exportar constantes

**1.4 Crear `/lib/constants/safeAreas.ts` (30 min)**
- Definir SAFE_AREAS top/bottom/horizontal
- Helpers para responsive

**1.5 Crear `/lib/constants/animations.ts` (45 min)**
- Migrar motion variants existentes
- Estandarizar con TOKENS.motion

**1.6 Actualizar `Controls.tsx` (30 min)**
```tsx
// ANTES
className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]"

// DESPUÉS
import { Z_INDEX } from '@/lib/constants/zIndex';
className={clsx("fixed bottom-8 left-1/2 -translate-x-1/2", Z_INDEX.CONTROLS)}
```

**1.7 Testing manual (30 min)**
- Verificar que Controls no tape modal
- Verificar z-index en mobile/desktop

**Entregables:**
- ✅ 4 archivos de constantes creados
- ✅ Controls.tsx actualizado
- ✅ Z-index correcto

**Tiempo total:** ~4 horas

---

### **DÍA 2: Fix Modal Layout + SEO Básico**

#### **Objetivo:** Arreglar overlaps del modal y mejorar SEO

#### **Tasks:**

**2.1 Actualizar `Modal.tsx` - Safe Areas (1.5 horas)**

```tsx
// Importar constantes
import { SAFE_AREAS } from '@/lib/constants/safeAreas';
import { Z_INDEX } from '@/lib/constants/zIndex';
import { MOTION_VARIANTS } from '@/lib/constants/animations';

// Aplicar en layout
<motion.div className={clsx(
  "fixed inset-0",
  Z_INDEX.MODAL_CONTENT  // z-50
)}>
  {/* Visual Column */}
  <div className={clsx(
    SAFE_AREAS.top.mobile,
    'md:' + SAFE_AREAS.top.desktop,
    SAFE_AREAS.horizontal.mobile,
    'md:' + SAFE_AREAS.horizontal.desktop
  )}>
    {/* Category Badge aquí con margen suficiente */}
  </div>
  
  {/* Content Column */}
  <div className={clsx(
    SAFE_AREAS.top.mobile,
    'md:' + SAFE_AREAS.top.desktop,
    SAFE_AREAS.bottom.mobile,
    'md:' + SAFE_AREAS.bottom.desktop
  )}>
    <AnimatedText /> {/* Ya no se corta */}
  </div>
</motion.div>
```

**2.2 Fix Modal Backdrop z-index (15 min)**
```tsx
<motion.div 
  className={clsx("absolute inset-0", Z_INDEX.MODAL_BACKDROP)}
  onClick={onClose}
/>
```

**2.3 Testing Modal (45 min)**
- Mobile: Título no choca con botón
- Mobile: Texto no se corta abajo
- Desktop: Badge visible dentro del clip-path
- Desktop: Scroll funciona correctamente

**2.4 Crear SEO Components (2 horas)**

**2.4.1 `/components/features/seo/BreadcrumbSchema.tsx`**
```tsx
import React from 'react';

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

**2.4.2 `/components/features/seo/ArticleSchema.tsx`**
```tsx
import React from 'react';
import { WavEvent } from '@/types';

interface ArticleSchemaProps {
  event: WavEvent;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({ event }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": event.title,
    "author": {
      "@type": "Organization",
      "name": "We Are Vision"
    },
    "publisher": {
      "@type": "Organization",
      "name": "We Are Vision",
      "logo": {
        "@type": "ImageObject",
        "url": "https://btl.wearevision.cl/logo.png"
      }
    },
    "datePublished": event.year ? `${event.year}-01-01` : new Date().toISOString(),
    "image": [event.image],
    "articleBody": event.description,
    "keywords": event.keywords?.join(', ') || "BTL, activación de marca, marketing experiencial"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

**2.5 Actualizar `App.tsx` - Meta Tags (30 min)**
```tsx
<Helmet>
  {/* Nuevos meta tags para IA */}
  <meta name="robots" content="max-snippet:-1, max-image-preview:large" />
  
  {/* Canonical tag dinámico */}
  <link rel="canonical" href={
    selectedEvent 
      ? `https://btl.wearevision.cl/?evento=${selectedEvent.slug}` 
      : "https://btl.wearevision.cl"
  } />
  
  {/* Article meta (si hay evento seleccionado) */}
  {selectedEvent && (
    <>
      <meta property="article:author" content="We Are Vision" />
      <meta property="article:section" content="Marketing Experiencial" />
      <meta property="article:tag" content={selectedEvent.category || "BTL"} />
    </>
  )}
</Helmet>

{/* Breadcrumb Schema */}
{selectedEvent && (
  <BreadcrumbSchema items={[
    { name: "Inicio", url: "https://btl.wearevision.cl" },
    { name: selectedEvent.category || "Eventos", url: "https://btl.wearevision.cl" },
    { name: selectedEvent.title, url: window.location.href }
  ]} />
)}

{/* Article Schema para evento seleccionado */}
{selectedEvent && <ArticleSchema event={selectedEvent} />}
```

**2.6 Testing SEO (30 min)**
- Validar con Google Rich Results Test
- Verificar Breadcrumbs en search console preview

**Entregables:**
- ✅ Modal sin overlaps
- ✅ SEO schemas implementados
- ✅ Meta tags mejorados

**Tiempo total:** ~5 horas

---

### **DÍA 3-4: Primitivos Typography + Button**

#### **Objetivo:** Crear componentes atómicos base

#### **Tasks:**

**3.1 Setup estructura (30 min)**
```bash
mkdir -p components/design-system/primitives/Typography
mkdir -p components/design-system/primitives/Button
mkdir -p components/design-system/primitives/Container
```

**3.2 Crear `Typography/Heading.tsx` (2 horas)**
- Copiar código de ARQUITECTURA_PROPUESTA.md
- Props: level, size, color, weight, align, tracking, balance
- Testing con diferentes combinaciones

**3.3 Crear `Typography/Body.tsx` (1.5 horas)**
```tsx
interface BodyProps {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'white' | 'gray' | 'muted';
  weight?: 'normal' | 'medium' | 'bold';
  lineHeight?: 'normal' | 'relaxed' | 'loose';
  className?: string;
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({
  size = 'base',
  color = 'white',
  weight = 'normal',
  lineHeight = 'relaxed',
  className,
  children,
}) => {
  // Implementation
};
```

**3.4 Crear `Typography/Label.tsx` (1 hora)**
```tsx
interface LabelProps {
  size?: 'xs' | 'sm' | 'base';
  uppercase?: boolean;
  tracking?: 'normal' | 'wide' | 'wider' | 'widest';
  color?: 'white' | 'gray' | 'muted';
  className?: string;
  children: React.ReactNode;
}
```

**3.5 Crear `Button/Button.tsx` (2.5 horas)**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  // ... props
}) => {
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-neutral-200',
    ghost: 'bg-transparent text-white hover:bg-white/10',
    outline: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
    icon: 'bg-transparent text-white hover:bg-white/10 p-2',
  };
  
  // Implementation con Motion
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(/* styles */)}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </motion.button>
  );
};
```

**3.6 Crear `Container/Box.tsx` (1 hora)**
```tsx
interface BoxProps {
  as?: React.ElementType;
  padding?: keyof typeof TOKENS.spacing;
  margin?: keyof typeof TOKENS.spacing;
  bg?: 'black' | 'white' | 'transparent';
  rounded?: keyof typeof TOKENS.radius;
  className?: string;
  children: React.ReactNode;
}
```

**3.7 Testing de primitivos (1.5 horas)**
- Crear página de prueba `/test-primitives`
- Verificar todas las variantes
- Screenshot testing (opcional)

**Entregables:**
- ✅ Heading, Body, Label components
- ✅ Button component con variants
- ✅ Box container
- ✅ Tests visuales

**Tiempo total:** ~10 horas (2 días)

---

### **DÍA 5-6: Primitivos TrapezoidShape + Compositions**

#### **Objetivo:** Geometría reutilizable + componentes moleculares

#### **Tasks:**

**5.1 Crear `TrapezoidShape/TrapezoidMask.tsx` (3 horas)**
```tsx
interface TrapezoidMaskProps {
  angle?: number; // Default 17 (de TOKENS)
  inverted?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const TrapezoidMask: React.FC<TrapezoidMaskProps> = ({
  angle = TOKENS.geometry.trapezoidAngle,
  inverted = false,
  children,
  className,
}) => {
  const clipPath = inverted 
    ? TOKENS.geometry.clipPath.trapezoidInverted 
    : TOKENS.geometry.clipPath.trapezoid;
  
  return (
    <div
      className={clsx('overflow-hidden', className)}
      style={{ clipPath }}
    >
      {children}
    </div>
  );
};
```

**5.2 Refactor `TrapezoidBadge.tsx` (1 hora)**
- Migrar componente existente a usar TrapezoidMask
- Usar Typography primitives (Label)
- Props: size, variant, label

**5.3 Crear `compositions/MediaViewer/MediaViewer.tsx` (3 horas)**
```tsx
import { MediaGallery } from '@/components/wav/MediaGallery';

interface MediaViewerProps {
  gallery: WavMedia[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({
  gallery,
  currentIndex,
  onIndexChange,
  className,
}) => {
  return (
    <TrapezoidMask className={className}>
      <MediaGallery
        gallery={gallery}
        currentIndex={currentIndex}
        onIndexChange={onIndexChange}
      />
      
      {/* Navigation dots */}
      {gallery.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={clsx(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-8" 
                  : "bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </TrapezoidMask>
  );
};
```

**5.4 Crear `compositions/ContentCard/ContentCard.tsx` (2 horas)**
```tsx
interface ContentCardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  padding?: keyof typeof TOKENS.spacing;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  header,
  children,
  footer,
  padding = 'lg',
  className,
}) => {
  // Implementation
};
```

**5.5 Crear `compositions/GlassPanel/GlassPanel.tsx` (1 hora)**
```tsx
interface GlassPanelProps {
  blur?: keyof typeof TOKENS.blur;
  opacity?: number;
  border?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**5.6 Testing compositions (1 hora)**
- Verificar MediaViewer con diferentes galleries
- Verificar TrapezoidMask con imágenes/videos

**Entregables:**
- ✅ TrapezoidMask reutilizable
- ✅ TrapezoidBadge refactorizado
- ✅ MediaViewer composition
- ✅ ContentCard y GlassPanel

**Tiempo total:** ~11 horas (2 días)

---

### **DÍA 7: Index Files + Documentation**

#### **Objetivo:** Crear public APIs y documentar uso

#### **Tasks:**

**7.1 Crear index files (2 horas)**

**`/components/design-system/primitives/index.ts`**
```tsx
export { Heading } from './Typography/Heading';
export { Body } from './Typography/Body';
export { Label } from './Typography/Label';
export { Button } from './Button/Button';
export { TrapezoidMask } from './TrapezoidShape/TrapezoidMask';
export { TrapezoidBadge } from './TrapezoidShape/TrapezoidBadge';
export { Box } from './Container/Box';

// Type exports
export type { HeadingProps } from './Typography/Heading';
export type { BodyProps } from './Typography/Body';
export type { ButtonProps } from './Button/Button';
```

**`/components/design-system/compositions/index.ts`**
```tsx
export { MediaViewer } from './MediaViewer/MediaViewer';
export { ContentCard } from './ContentCard/ContentCard';
export { GlassPanel } from './GlassPanel/GlassPanel';
```

**`/lib/constants/index.ts`**
```tsx
export { TOKENS } from './tokens';
export { Z_INDEX, Z_INDEX_NUMERIC } from './zIndex';
export { SAFE_AREAS } from './safeAreas';
export { MOTION_VARIANTS } from './animations';
```

**7.2 Crear README (2 horas)**

**`/components/design-system/README.md`**
```markdown
# WAV BTL Design System

## Primitives

### Typography

#### Heading
\`\`\`tsx
import { Heading } from '@/components/design-system/primitives';

<Heading level="h1" size="4xl" color="white" tracking="tight">
  Título del Evento
</Heading>
\`\`\`

Props:
- level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
- size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
- color?: 'white' | 'gray' | 'brandPink' | 'brandPurple'
- ...

### Button

\`\`\`tsx
import { Button } from '@/components/design-system/primitives';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
\`\`\`

## Compositions

### MediaViewer
...
```

**7.3 Testing de imports (1 hour)**
- Verificar que todos los exports funcionan
- Verificar tree-shaking (imports individuales no arrastran todo)

**7.4 Crear Migration Guide (1 hour)**

**`/MIGRATION_GUIDE.md`**
```markdown
# Migration Guide: Old Components → New Design System

## Typography

### Before:
\`\`\`tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
  Title
</h1>
\`\`\`

### After:
\`\`\`tsx
<Heading level="h1" size="4xl" color="white" tracking="tight">
  Title
</Heading>
\`\`\`

## Benefits:
- ✅ Responsive by default (fluid typography)
- ✅ Type-safe props
- ✅ Consistent with design tokens
- ✅ Less code
```

**Entregables:**
- ✅ Index files para imports limpios
- ✅ README con ejemplos
- ✅ Migration guide
- ✅ Documentación completa

**Tiempo total:** ~6 horas

---

### **DÍA 8-9: Modal Refactor**

#### **Objetivo:** Refactorizar Modal usando nuevos primitivos

#### **Tasks:**

**8.1 Crear estructura feature (30 min)**
```bash
mkdir -p components/features/event-modal/components/layouts
mkdir -p components/features/event-modal/components/sections
mkdir -p components/features/event-modal/hooks
```

**8.2 Crear Layouts (4 horas)**

**`DesktopSplitLayout.tsx`**
```tsx
import { SAFE_AREAS } from '@/lib/constants';
import { MOTION_VARIANTS } from '@/lib/constants';

export const DesktopSplitLayout: React.FC<{
  visualContent: React.ReactNode;
  textContent: React.ReactNode;
}> = ({ visualContent, textContent }) => {
  return (
    <div className="hidden lg:flex w-full max-w-7xl h-[85vh]">
      {/* LEFT: Visuals (Sticky) */}
      <motion.div
        className={clsx(
          'w-7/12 h-full sticky top-0',
          SAFE_AREAS.horizontal.desktop
        )}
        variants={MOTION_VARIANTS.fade}
      >
        {visualContent}
      </motion.div>
      
      {/* RIGHT: Content (Scrollable) */}
      <motion.div
        className={clsx(
          'w-5/12 h-full overflow-y-auto',
          SAFE_AREAS.top.desktop,
          SAFE_AREAS.bottom.desktop,
          'pl-0 pr-10'
        )}
        variants={MOTION_VARIANTS.slideUp}
      >
        {textContent}
      </motion.div>
    </div>
  );
};
```

**`MobileStackLayout.tsx`**
```tsx
export const MobileStackLayout: React.FC<{
  visualContent: React.ReactNode;
  textContent: React.ReactNode;
}> = ({ visualContent, textContent }) => {
  return (
    <div className="lg:hidden flex flex-col w-full max-h-[90vh] overflow-y-auto">
      {/* TOP: Visuals */}
      <motion.div
        className={clsx(
          'w-full h-[45vh]',
          SAFE_AREAS.horizontal.mobile
        )}
        variants={MOTION_VARIANTS.slideUp}
      >
        {visualContent}
      </motion.div>
      
      {/* BOTTOM: Content */}
      <motion.div
        className={clsx(
          'w-full',
          SAFE_AREAS.top.mobile,
          SAFE_AREAS.bottom.mobile,
          SAFE_AREAS.horizontal.mobile
        )}
        variants={MOTION_VARIANTS.slideUp}
      >
        {textContent}
      </motion.div>
    </div>
  );
};
```

**8.3 Crear Sections (5 horas)**

**`EventHeader.tsx`**
```tsx
import { Heading, Label } from '@/components/design-system/primitives';
import { TrapezoidBadge } from '@/components/design-system/primitives';

export const EventHeader: React.FC<{
  brand: string;
  category?: string;
  logo?: string;
}> = ({ brand, category, logo }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Category Badge */}
      {category && (
        <TrapezoidBadge
          label={category}
          size="sm"
          variant="white"
        />
      )}
      
      {/* Brand Logo */}
      {logo ? (
        <img 
          src={logo} 
          alt={`${brand} Logo`} 
          className="h-10 w-auto object-contain"
        />
      ) : (
        <Label size="sm" uppercase tracking="widest" color="gray">
          {brand}
        </Label>
      )}
    </div>
  );
};
```

**`EventBody.tsx`**
```tsx
import { Heading, Body } from '@/components/design-system/primitives';

export const EventBody: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-6">
      <Heading 
        level="h1" 
        size="4xl" 
        color="white" 
        tracking="tight" 
        balance
      >
        {title}
      </Heading>
      
      <Body 
        size="lg" 
        color="gray" 
        lineHeight="relaxed"
        className="max-w-[65ch]"
      >
        {description}
      </Body>
    </div>
  );
};
```

**`EventVisuals.tsx`**
```tsx
import { MediaViewer } from '@/components/design-system/compositions';

export const EventVisuals: React.FC<{
  gallery: WavMedia[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}> = ({ gallery, currentIndex, onIndexChange }) => {
  return (
    <MediaViewer
      gallery={gallery}
      currentIndex={currentIndex}
      onIndexChange={onIndexChange}
      className="w-full h-full"
    />
  );
};
```

**8.4 Crear EventModal.tsx (3 horas)**
```tsx
import { DesktopSplitLayout, MobileStackLayout } from './layouts';
import { EventHeader, EventBody, EventVisuals } from './sections';

export const EventModal: React.FC<{
  event: WavEvent;
  onClose: () => void;
  isMobile: boolean;
}> = ({ event, onClose, isMobile }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  const safeGallery: WavMedia[] = event?.gallery?.length
    ? event.gallery
    : [{ id: 'fallback', type: 'image', url: event.image }];
  
  const visualContent = (
    <EventVisuals
      gallery={safeGallery}
      currentIndex={galleryIndex}
      onIndexChange={setGalleryIndex}
    />
  );
  
  const textContent = (
    <>
      <EventHeader
        brand={event.brand}
        category={event.category}
        logo={event.logo}
      />
      <EventBody
        title={event.title}
        description={event.description}
      />
    </>
  );
  
  const Layout = isMobile ? MobileStackLayout : DesktopSplitLayout;
  
  return (
    <motion.div
      className={clsx("fixed inset-0 flex items-center justify-center", Z_INDEX.MODAL_CONTENT)}
      variants={MOTION_VARIANTS.fade}
    >
      {/* Backdrop */}
      <motion.div
        className={clsx("absolute inset-0 bg-black/65 backdrop-blur-xl", Z_INDEX.MODAL_BACKDROP)}
        onClick={onClose}
      />
      
      {/* Content */}
      <Layout
        visualContent={visualContent}
        textContent={textContent}
      />
    </motion.div>
  );
};
```

**8.5 Crear index.ts (15 min)**
```tsx
export { EventModal } from './components/EventModal';
export type { EventModalProps } from './components/EventModal';
```

**Entregables:**
- ✅ EventModal completamente refactorizado
- ✅ Layouts responsivos separados
- ✅ Sections modulares
- ✅ Usando todos los nuevos primitivos

**Tiempo total:** ~12 horas (2 días)

---

### **DÍA 10: Testing + Integración + Cleanup**

#### **Objetivo:** Testear, integrar y limpiar código

#### **Tasks:**

**10.1 Feature Flag en App.tsx (30 min)**
```tsx
// Agregar flag para probar nuevo modal
const USE_NEW_MODAL = process.env.REACT_APP_USE_NEW_MODAL === 'true';

// En el render
{selectedId && selectedEvent && (
  USE_NEW_MODAL ? (
    <EventModal 
      event={selectedEvent} 
      onClose={() => setSelectedId(null)} 
      isMobile={isMobile}
    />
  ) : (
    <Modal 
      event={selectedEvent} 
      onClose={() => setSelectedId(null)} 
      isMobile={isMobile}
    />
  )
)}
```

**10.2 Testing Manual Completo (3 horas)**

**Checklist:**
- [ ] Desktop >1024px
  - [ ] Modal abre correctamente
  - [ ] Layout asymmetric 7/12 - 5/12
  - [ ] Visual column sticky
  - [ ] Content column scrollable
  - [ ] Title no choca con header
  - [ ] Description no se corta abajo
  - [ ] Badge visible dentro de clip-path
  - [ ] Close button funciona

- [ ] Mobile <768px
  - [ ] Modal abre correctamente
  - [ ] Layout vertical stack
  - [ ] Visual 45vh height
  - [ ] Content scrollable
  - [ ] Safe areas funcionan
  - [ ] Texto no se tapa con botones

- [ ] Tablet 768-1024px
  - [ ] Layout híbrido funciona

- [ ] Interacciones
  - [ ] Gallery navigation
  - [ ] Keyboard (Esc to close)
  - [ ] Focus trap
  - [ ] Backdrop click to close

**10.3 Testing SEO (1 hora)**
- [ ] Google Rich Results Test
- [ ] Breadcrumbs schema valida
- [ ] Article schema valida
- [ ] Canonical tags correctos
- [ ] Meta tags para IA presentes

**10.4 Performance Testing (1 hora)**
```bash
# Lighthouse audit
npm run build
npx serve build
# Abrir Chrome DevTools > Lighthouse > Run

# Targets:
# Performance: >90
# Accessibility: >95
# Best Practices: >95
# SEO: >95
```

**10.5 Code Review & Cleanup (1.5 horas)**
- [ ] Remover console.logs
- [ ] Agregar comentarios donde necesario
- [ ] Verificar imports (no unused)
- [ ] Verificar TypeScript errors (0)
- [ ] Prettier + ESLint

**10.6 Documentación Final (1 hora)**

**Actualizar `/CHANGELOG.md`**
```markdown
# Changelog

## [2.0.0] - 2025-11-29

### Added
- ✅ Design System foundations (tokens, zIndex, safeAreas, animations)
- ✅ Primitive components (Heading, Body, Label, Button, TrapezoidMask, Box)
- ✅ Composition components (MediaViewer, ContentCard, GlassPanel)
- ✅ Refactored EventModal with proper layouts
- ✅ SEO improvements (BreadcrumbSchema, ArticleSchema, AI meta tags)

### Fixed
- 🐛 Modal content overlap with floating buttons
- 🐛 Z-index hierarchy inconsistencies
- 🐛 Category badge position in trapezoidal clip
- 🐛 Text cutting off at bottom of modal

### Changed
- 🔄 Modal architecture (split into Desktop/Mobile layouts)
- 🔄 Controls z-index (z-60 → z-55)

### Technical
- 📦 Bundle size reduced by ~15% (lazy loading)
- ⚡ Lighthouse score improved (75 → 88)
- 🎨 Typography now uses fluid clamp()
- 🧪 Type safety improved (strict TypeScript)
```

**10.7 Deploy (opcional - si hay staging) (30 min)**
```bash
# Set feature flag
export REACT_APP_USE_NEW_MODAL=true

# Build
npm run build

# Deploy to staging
# (método depende de hosting)
```

**Entregables:**
- ✅ Testing completo
- ✅ Performance optimizado
- ✅ Documentación actualizada
- ✅ Código limpio y listo para producción

**Tiempo total:** ~8 horas

---

## 📈 RESULTADOS ESPERADOS

### **Métricas Antes vs Después:**

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Modal UX** | 6/10 (overlaps) | 9/10 | +50% |
| **Code Reusability** | 30% | 75% | +150% |
| **Type Safety** | 70% | 95% | +36% |
| **Lighthouse SEO** | 85 | 95+ | +12% |
| **Bundle Size** | ~800KB | ~680KB | -15% |
| **Development Speed** | Baseline | +30% faster | N/A |

### **Beneficios Cualitativos:**

✅ **Desarrolladores:**
- Menos código boilerplate
- Componentes reutilizables
- Type-safe props
- Documentación clara

✅ **Diseñadores:**
- Design tokens consistentes
- Fácil de ajustar estilos globales
- Componentes con variantes predefinidas

✅ **Usuarios:**
- Modal sin bugs visuales
- Experiencia más fluida
- Mejor performance

✅ **SEO/IA:**
- Google SGE puede indexar mejor
- Rich results en búsquedas
- Mejor posicionamiento orgánico

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Breaking changes en producción | Media | Feature flag para rollback |
| Overengineering del design system | Alta | Hacer solo lo necesario (no Storybook por ahora) |
| Timebox excedido | Media | Priorizar Fase 0 y Fase 1, postergar Fase 2 |
| Bugs no detectados | Baja | Testing manual exhaustivo + checklist |

---

## 🚀 DEPLOYMENT STRATEGY

### **Paso 1: Staging (Día 10)**
```bash
# Set NEW_MODAL flag to true
REACT_APP_USE_NEW_MODAL=true npm run build

# Deploy to staging URL
# Test con 2-3 usuarios reales
```

### **Paso 2: Production Gradual (Día 11-12)**
```bash
# Opción A: Big Bang (si tests pasan 100%)
REACT_APP_USE_NEW_MODAL=true npm run build
# Deploy

# Opción B: A/B Testing (recomendado)
# 50% users → new modal
# 50% users → old modal
# Monitorear errores por 48 horas
```

### **Paso 3: Full Rollout (Día 13)**
```bash
# Si todo OK, remover feature flag
# Eliminar Modal.tsx viejo
# Deploy final
```

---

## 📞 CONTACTO Y SOPORTE

**Durante implementación:**
- Consultas técnicas: Claude AI (este chat)
- Decisiones de diseño: Revisar Guidelines.md
- Bugs bloqueantes: Usar feature flag para rollback

**Post-implementación:**
- Documentación: Ver `/components/design-system/README.md`
- Migration guide: Ver `/MIGRATION_GUIDE.md`
- Arquitectura: Ver `/ARQUITECTURA_PROPUESTA.md`

---

## ✅ FINAL CHECKLIST

Antes de dar por terminado el plan:

- [ ] Todas las tasks de Día 1-10 completadas
- [ ] Testing manual 100% passed
- [ ] Performance targets alcanzados
- [ ] Documentación actualizada
- [ ] Code review realizado
- [ ] Feature flag implementado
- [ ] Rollback plan listo
- [ ] Stakeholders informados

---

**FIN DEL PLAN DE IMPLEMENTACIÓN**

**¿Listo para empezar con el Día 1?** 🚀
