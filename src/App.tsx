import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Wall } from './components/wav/Wall';
import { TextRotator } from './components/wav/TextRotator';
import { Controls } from './components/wav/Controls';
import { Modal } from './components/wav/Modal';
import { AdminPanel } from './components/wav/AdminPanel';
import { LogoLoader } from './components/wav/LogoLoader';
import { SchemaJSONLD } from './components/wav/SchemaJSONLD';
import { clsx } from 'clsx';
import { events as staticEvents } from './data/events';
import { getEvents } from './utils/api';
import { WavEvent, ColorMode } from './types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// SVG Filter for Duotone
const DuotoneFilter = () => (
  <svg className="hidden">
    <filter id="duotone-filter">
      <feColorMatrix
        type="matrix"
        values=".33 .33 .33 0 0
                .33 .33 .33 0 0
                .33 .33 .33 0 0
                0   0   0   1 0"
      />
      <feComponentTransfer colorInterpolationFilters="sRGB">
        <feFuncR type="table" tableValues="0.05 0.64" /> {/* Dark to Light (approx) */}
        <feFuncG type="table" tableValues="0.05 0.64" />
        <feFuncB type="table" tableValues="0.05 0.64" />
      </feComponentTransfer>
    </filter>
  </svg>
);

// Interface for iOS specific requestPermission
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

// Helper to generate URL-safe slugs
const createSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Helper to ensure unique slugs across the dataset
const ensureUniqueSlugs = (events: WavEvent[]): WavEvent[] => {
  const slugMap = new Map<string, number>();
  return events.map(e => {
    const baseSlug = createSlug(e.title);
    let finalSlug = baseSlug;
    if (slugMap.has(baseSlug)) {
      const count = slugMap.get(baseSlug)! + 1;
      slugMap.set(baseSlug, count);
      finalSlug = `${baseSlug}-${count}`;
    } else {
      slugMap.set(baseSlug, 1);
    }
    return { ...e, slug: finalSlug };
  });
};

export default function App() {
  const [mode, setMode] = useState<ColorMode>('monochrome');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  
  // Data & Admin State
  // Initialize events with unique slugs
  const [events, setEvents] = useState<WavEvent[]>(() => ensureUniqueSlugs(staticEvents));
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Load dynamic events and add slugs
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    getEvents().then(fetchedEvents => {
      setEvents(ensureUniqueSlugs(fetchedEvents));
    });
  };
  
  // Deep Linking: Back/Forward Navigation Support
  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true);
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('evento');
      
      if (slug) {
        const index = events.findIndex(e => e.slug === slug);
        if (index !== -1) {
          setSelectedId(`tile-${index}`);
        } else {
          // Invalid slug found during navigation
          setSelectedId(null);
        }
      } else {
        // No slug found during navigation
        setSelectedId(null);
      }
      // Reset navigating flag after a tick to allow state to settle
      setTimeout(() => setIsNavigating(false), 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [events]); // Dependency on events ensures we look up correctly after data loads

  // Deep Linking: Initial Load Auto-Open
  // Handles the Race Condition: Waits for events to be loaded before checking URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('evento');
    
    // Only auto-open if we have a slug, events are loaded, and nothing is selected yet
    if (slug && events.length > 0 && !selectedId) {
      const index = events.findIndex(e => e.slug === slug);
      if (index !== -1) {
        setSelectedId(`tile-${index}`);
      } else {
        // Invalid slug on initial load - Silent cleanup handled by Sync effect
        // Logic: selectedId stays null, Sync effect sees mismatch (URL has slug, State is null) -> Pushes '/'
      }
    }
  }, [events]); // When events load, re-check URL. Removed selectedId to prevent zombie loop on close.

  // Mouse position for global 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastOrientationUpdate = useRef(0);

  // 1. Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      // Simple check for mobile width or touch capability
      const mobile = window.innerWidth <= 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Input Handling (Mouse vs Gyroscope)
  useEffect(() => {
    if (!isMobile) {
      // Desktop: Mouse position
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } else {
      // Mobile: Gyroscope / Device Orientation
      const handleOrientation = (e: DeviceOrientationEvent) => {
        // Fallback if sensors are not available or permission denied
        if (e.gamma === null || e.beta === null) return;
        
        // Throttle to ~60fps (16ms) or ~30fps (33ms) to save battery/CPU
        // Using 20ms throttle
        const now = Date.now();
        if (now - lastOrientationUpdate.current < 20) return;
        lastOrientationUpdate.current = now;
        
        // Gamma (Left/Right Tilt): -90 to 90
        // Requirement: Map -45 to 45 -> -1 to 1 (For Z rotation in Wall)
        const gamma = e.gamma; 
        const x = Math.max(-1, Math.min(1, gamma / 45));
        
        // Beta (Front/Back Tilt): -180 to 180
        // Requirement: Map 0 to 60 -> 0 to 0.5 (For Y shift 0 to 25px in Wall)
        // Wall Y-shift logic: [-1, 1] -> [-50, 50]. So 0.5 -> 25.
        const beta = e.beta;
        // Clamp beta between 0 and 60, then normalize to 0-0.5 range
        const y = Math.max(0, Math.min(0.5, beta / 120)); 
        
        mouseX.set(x);
        mouseY.set(y);
      };

      // Check if we need to request permission (iOS 13+)
      const requestAccess = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          // iOS 13+
          setShowPermissionButton(true);
        } else {
          // Non-iOS or older iOS
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      };

      if (permissionGranted) {
        window.addEventListener('deviceorientation', handleOrientation);
      } else {
        requestAccess();
      }
      
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile, mouseX, mouseY, permissionGranted]);

  const handleRequestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setShowPermissionButton(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Apply mode class to body
  useEffect(() => {
    document.body.className = `mode-${mode}`;
    // Reset specific styles if needed, handled by CSS
  }, [mode]);

  const selectedEvent = useMemo(() => {
    if (!selectedId) return null;
    const index = parseInt(selectedId.split('-')[1], 10);
    if (isNaN(index)) return null;
    return events[index % events.length];
  }, [selectedId, events]);

  // Deep Linking: URL Sync
  useEffect(() => {
    // Skip sync if the change was triggered by Back/Forward navigation
    if (isNavigating) return;

    if (selectedEvent) {
      const slug = selectedEvent.slug || createSlug(selectedEvent.title);
      const newUrl = `?evento=${slug}`;
      // Only push if URL is different to avoid duplicate history entries
      if (window.location.search !== newUrl) {
        window.history.pushState({}, "", newUrl);
      }
    } else {
      // If modal is closed but URL still has param, clear it
      if (window.location.search.includes('?evento=')) {
        window.history.pushState({}, "", "/");
      }
    }
  }, [selectedEvent, isNavigating]);

  if (showAdmin) {
    return <AdminPanel onBack={() => {
      setShowAdmin(false);
      fetchEvents(); // Reload data when returning from admin
    }} />;
  }

  return (
    <HelmetProvider>
      <div className="relative w-full h-screen overflow-hidden bg-[var(--wav-neutral-black)] text-white">
        <Helmet>
          <title>{selectedEvent ? `${selectedEvent.title} | WAV BTL` : "WAV BTL | Agencia de Activaciones y Marketing Experiencial"}</title>
          <meta name="description" content={selectedEvent ? selectedEvent.description : "WAV BTL: Agencia líder en marketing experiencial y activaciones en Chile/LATAM. Creamos experiencias inmersivas, tecnología creativa y eventos de alto impacto."} />
          <link rel="canonical" href={selectedEvent ? window.location.href : "https://btl.wearevision.cl"} />
          {selectedEvent && (
            <>
              <meta property="og:title" content={`${selectedEvent.title} | WAV BTL`} />
              <meta property="og:description" content={selectedEvent.description} />
              <meta property="og:image" content={selectedEvent.image} />
              <meta name="twitter:card" content="summary_large_image" />
            </>
          )}
        </Helmet>
        
        {/* Semantic SEO Header (Visually Hidden) */}
        <h1 className="sr-only">
          WAV BTL | Agencia de Marketing Experiencial, Activaciones de Marca, Instalaciones Tecnológicas y Producción de Eventos en Chile y LATAM.
        </h1>

        <section
          className="sr-only"
          aria-hidden="true"
        >
          {/* Dynamic Event List for SEO Indexing */}
          <div>
             <h2>Portafolio de Experiencias y Activaciones Recientes</h2>
             <ul>
               {events.map((e, i) => (
                 <li key={`seo-event-${i}`}>
                   <h3>{e.title} - {e.brand}</h3>
                   <p>{e.description}</p>
                 </li>
               ))}
             </ul>
          </div>

          <div>
            <p>
              WAV BTL es una agencia de marketing experiencial y activaciones de marca que diseña, produce e implementa experiencias inmersivas para marcas que necesitan ir más allá de la comunicación tradicional. Nuestro enfoque combina estrategia, creatividad y tecnología para transformar espacios físicos en escenarios vivos donde las personas pueden sentir, jugar, explorar y recordar. Desde lanzamientos de productos hasta festivales corporativos, trabajamos como partner creativo y técnico para construir momentos que conectan a las audiencias con las marcas de manera profunda y memorable.
            </p>
            <p>
              Nuestra especialidad está en el mundo BTL: activaciones de marca en retail, calles, ferias, festivales y entornos corporativos. Desarrollamos experiencias sensoriales que integran luz, sonido, imagen y narrativa, utilizando recursos como mapping, pantallas LED, estructuras físicas, motion graphics y contenido interactivo. Entendemos las necesidades de marketing, trade y comunicaciones, pero también las restricciones de operación, montaje y seguridad, lo que nos permite diseñar proyectos viables, eficientes y de alto impacto.
            </p>
            <p>
              WAV BTL diseña y produce experiencias inmersivas, instalaciones tecnológicas y espacios efímeros que pueden vivir en una noche, un fin de semana o una gira completa. Trabajamos con escenografía y stands a medida, arquitectura efímera, intervenciones en puntos de venta, áreas experienciales en eventos masivos y formatos híbridos que combinan lo físico y lo digital. Nuestro foco está en crear mundos coherentes: desde la idea creativa hasta la ejecución técnica y el control de detalle en terreno.
            </p>
            <p>
              Acompañamos a marcas y agencias en toda la cadena de valor: concepto creativo, diseño de experiencia, storytelling sensorial, planificación técnica, producción general, coordinación de proveedores, implementación en terreno y post-producción de registros. Nos movemos en proyectos de alto estándar donde se exige prolijidad técnica, diseño cuidado y una experiencia clara para los asistentes. Nuestro trabajo cruza disciplinas como diseño de espacios, tecnología creativa, contenido audiovisual, iluminación escénica y sonido envolvente.
            </p>
            <p>
              Desde Chile y para Latinoamérica, WAV BTL funciona como un hub de experiencias para marcas que buscan algo más que un evento: buscan un sistema de experiencias que construya relato, reputación y vínculo emocional con sus audiencias. Nos especializamos en eventos corporativos, lanzamientos, activaciones urbanas, experiencias para retail, conferencias, ferias y encuentros internos, siempre con una capa tecnológica y sensorial que diferencia cada proyecto.
            </p>
          </div>

          <div>
            <ul>
              <li>Activaciones BTL</li>
              <li>Marketing Experiencial</li>
              <li>Instalaciones Inmersivas</li>
              <li>Diseño y Producción de Eventos</li>
              <li>Escenografía y Stands</li>
              <li>Implementaciones Tecnológicas</li>
              <li>Experiencias Sensoriales</li>
              <li>Brand Engagement</li>
            </ul>
          </div>

          <div>
            <p>
              WAV BTL es una agencia líder en marketing experiencial y activaciones de marca en Chile y LATAM, especializada en experiencias inmersivas para eventos corporativos, lanzamientos y acciones urbanas. Diseñamos e implementamos activaciones tecnológicas, instalaciones interactivas, espacios sensoriales y escenografías a medida para marcas que necesitan destacar en ferias, festivales, convenciones y entornos retail. Nuestro enfoque une estrategia, creatividad, diseño espacial y tecnología creativa para construir experiencias memorables, medibles y alineadas con los objetivos de negocio de cada cliente.
            </p>
          </div>

          <div>
            <p>
              activaciones de marca, agencia BTL, marketing experiencial, agencia de marketing experiencial, producción de eventos, productora de eventos, experiencias sensoriales, experiencias inmersivas, instalaciones tecnológicas, instalaciones interactivas, diseño de stands, diseño de escenografía, arquitectura efímera, brand experience, eventos corporativos, eventos internos, lanzamientos de producto, eventos de marca, experiencias figitales, intervenciones urbanas, producción técnica, implementación en terreno, experiencias con mapping, pantallas LED, contenido inmersivo, tecnología creativa, experiencias en retail, activaciones en punto de venta, experiencias para ferias, experiencias para congresos, experiencias para festivales, experiencias de marca en Chile, experiencias de marca en Latinoamérica, agencia de activaciones tecnológicas.
            </p>
          </div>
        </section>

        <DuotoneFilter />
        
        <SchemaJSONLD events={events} />

        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <LogoLoader onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>
        
        {/* Main Wall Container */}
        <div className={clsx(
          "w-full h-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[transform,filter,opacity]",
          selectedId ? "blur-[4px] grayscale opacity-40 scale-95" : ""
        )}>
          <Wall 
            mouseX={mouseX} 
            mouseY={mouseY} 
            onSelect={setSelectedId} 
            mode={mode}
            isMobile={isMobile}
            events={events}
            isLoading={isLoading}
          />
          {!isLoading && <TextRotator />}
        </div>

        {/* iOS Permission Button Overlay */}
        <AnimatePresence>
          {showPermissionButton && !permissionGranted && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
               <button 
                 onClick={handleRequestPermission}
                 className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-transform"
               >
                 Activar Experiencia
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Overlay */}
        <AnimatePresence mode="wait">
          {selectedId && selectedEvent && (
            <Modal 
              key={selectedId}
              event={selectedEvent} 
              onClose={() => setSelectedId(null)} 
              mode={mode}
              isMobile={isMobile}
            />
          )}
        </AnimatePresence>

        {/* Controls */}
        <Controls 
          currentMode={mode} 
          setMode={setMode} 
          isModalOpen={!!selectedId} 
          onCloseModal={() => setSelectedId(null)}
        />

        {/* Admin Trigger Button */}
        <button 
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-4 left-4 w-6 h-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer z-50 hover:bg-white/20 transition-colors opacity-50 hover:opacity-100"
          aria-label="Admin Access"
        />
      </div>
    </HelmetProvider>
  );
}
