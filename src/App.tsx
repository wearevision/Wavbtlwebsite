import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { X } from 'lucide-react';
import { Wall } from './components/wav/Wall';
import { TextRotator } from './components/wav/TextRotator';
import { Controls } from './components/wav/Controls';
// Lazy load heavy components
const Modal = React.lazy(() => import('./components/wav/Modal').then(m => ({ default: m.Modal })));
const AdminPanelMinimal = React.lazy(() => import('./components/wav/AdminPanelMinimal').then(m => ({ default: m.AdminPanelMinimal })));
const OpenGraphTester = React.lazy(() => import('./components/wav/OpenGraphTester').then(m => ({ default: m.OpenGraphTester })));

import { LogoLoader } from './components/wav/LogoLoader';
import { SchemaJSONLD } from './components/wav/SchemaJSONLD';
import { clsx } from 'clsx';
import { events as staticEvents } from './data/events';
import { getEvents, getCategories } from './utils/api';
import { WavEvent } from './types';
import { EventCategory } from './utils/contentRules';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Initialize isMobile with correct value to prevent flash/reflow
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  
  // Data & Admin State
  // Initialize with empty array - data will load from Supabase
  const [events, setEvents] = useState<WavEvent[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Check for test-og parameter
  const showOGTester = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('test-og') === 'true';
  }, []);

  useEffect(() => {
    // Load dynamic events and categories
    fetchEvents();
    fetchCategories();
  }, []);

  // Admin Panel Keyboard Shortcut (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(ensureUniqueSlugs(fetchedEvents));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  // Deep Linking: Back/Forward Navigation Support
  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true);
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('evento');
      
      if (slug) {
        const event = events.find(e => e.slug === slug);
        if (event) {
          setSelectedId(event.id || null); // Use UUID
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
      const event = events.find(e => e.slug === slug);
      if (event) {
        setSelectedId(event.id || null);
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

  // Removed: mode class application (only monochrome mode now)

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return events;
    return events.filter(event => event.category === selectedCategory);
  }, [events, selectedCategory]);

  // Close modal when category changes
  useEffect(() => {
    if (selectedId && selectedCategory !== null) {
      setSelectedId(null);
    }
  }, [selectedCategory]);

  const selectedEvent = useMemo(() => {
    if (!selectedId) return null;
    return events.find(e => e.id === selectedId) || null;
  }, [selectedId, events]);

  // Navigation helpers for modal
  const handleNextEvent = () => {
    if (!selectedEvent || filteredEvents.length === 0) return;
    const currentIndex = filteredEvents.findIndex(e => e.id === selectedId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredEvents.length;
    setSelectedId(filteredEvents[nextIndex].id || null);
  };

  const handlePrevEvent = () => {
    if (!selectedEvent || filteredEvents.length === 0) return;
    const currentIndex = filteredEvents.findIndex(e => e.id === selectedId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredEvents.length) % filteredEvents.length;
    setSelectedId(filteredEvents[prevIndex].id || null);
  };

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
      // Use replaceState to avoid history pollution when closing
      if (window.location.search.includes('?evento=')) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, [selectedEvent, isNavigating]);

  if (showAdmin) {
    return (
      <React.Suspense fallback={<LogoLoader />}>
        <AdminPanelMinimal 
          onBack={() => {
            setShowAdmin(false);
            fetchEvents(); // Reload data when returning from admin
            fetchCategories(); // Reload categories as well
          }} 
          categories={categories}
        />
      </React.Suspense>
    );
  }

  return (
    <HelmetProvider>
      <div className="relative w-full h-screen overflow-hidden bg-[var(--wav-neutral-black)] text-white">
        <Helmet>
          {/* ============================================================ */}
          {/* PHASE 3: CRITICAL NETWORK PRECONNECTS (Lighthouse Priority) */}
          {/* ============================================================ */}
          
          {/* Google Fonts - Critical path optimization */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* PHASE 3: Preload critical font weights (Outfit 900 for titles) */}
          <link 
            rel="preload" 
            as="style" 
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@900&display=swap"
          />
          <link 
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
            media="print"
            onLoad={(e) => { (e.target as HTMLLinkElement).media = 'all'; }}
          />
          
          {/* Supabase Storage - PHASE 7: Network optimization */}
          <link rel="preconnect" href="https://ykkmplrnqcwpgfdjshxn.supabase.co" />
          
          {/* Unsplash CDN - if still used in production */}
          <link rel="preconnect" href="https://images.unsplash.com" />
          
          {/* DNS prefetch for API endpoints */}
          <link rel="dns-prefetch" href="https://ykkmplrnqcwpgfdjshxn.supabase.co" />
          
          {/* Standard Metadata */}
          <title>{selectedEvent ? `${selectedEvent.title} | We Are Vision` : "We Are Vision (WAV) | Agencia de Marketing Experiencial & BTL"}</title>
          <meta name="description" content={selectedEvent ? selectedEvent.description : "WAV BTL es una agencia de marketing experiencial líder en Chile y LATAM. Creamos activaciones de marca, eventos corporativos, instalaciones tecnológicas y experiencias inmersivas."} />
          <link rel="canonical" href={selectedEvent ? window.location.href : "https://btl.wearevision.cl"} />
          <meta name="theme-color" content="#000000" />

          {/* Open Graph / Facebook / WhatsApp */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="We Are Vision (WAV)" />
          <meta property="og:title" content={selectedEvent ? `${selectedEvent.title} | We Are Vision` : "We Are Vision (WAV) | Agencia de Marketing Experiencial & BTL"} />
          <meta property="og:description" content={selectedEvent ? selectedEvent.description : "WAV BTL es una agencia de marketing experiencial líder en Chile y LATAM. Creamos activaciones de marca, eventos corporativos, instalaciones tecnológicas y experiencias inmersivas."} />
          <meta property="og:image" content={selectedEvent ? selectedEvent.image : (staticEvents[0]?.image || "https://btl.wearevision.cl/og-cover.jpg")} />
          <meta property="og:url" content={selectedEvent ? window.location.href : "https://btl.wearevision.cl"} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="es_CL" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={selectedEvent ? `${selectedEvent.title} | We Are Vision` : "We Are Vision (WAV) | Agencia de Marketing Experiencial & BTL"} />
          <meta name="twitter:description" content={selectedEvent ? selectedEvent.description : "WAV BTL es una agencia de marketing experiencial líder en Chile y LATAM. Creamos activaciones de marca, eventos corporativos, instalaciones tecnológicas y experiencias inmersivas."} />
          <meta name="twitter:image" content={selectedEvent ? selectedEvent.image : (staticEvents[0]?.image || "https://btl.wearevision.cl/og-cover.jpg")} />
        </Helmet>
        
        {/* Semantic SEO Header (Visually Hidden) */}
        <h1 className="sr-only">
          We Are Vision (WAV BTL) | Agencia de Marketing Experiencial, Activaciones de Marca, Instalaciones Tecnológicas y Producción de Eventos en Chile y LATAM.
        </h1>

        <section
          className="sr-only"
          aria-hidden="true"
        >
          {/* AI Context Layer: Narrative description for LLMs and Screen Readers */}
          <article>
            <h2>Contexto de la Experiencia Digital</h2>
            <p>
              Estás visitando el portafolio inmersivo de <strong>We Are Vision (WAV)</strong>. 
              La interfaz visual es un "Muro Infinito" (Infinite Wall) en 3D que navega espacialmente a través de nuestros proyectos de BTL y marketing experiencial. 
              Cada panel del mosaico representa un caso de éxito real, diseñado para comunicar nuestra capacidad de fusionar arte, tecnología y estrategia de marca.
            </p>
          </article>

          <article>
            <h2>Manifiesto de Agencia</h2>
            <p>
              We Are Vision es una agencia de <strong>Marketing Experiencial y Producción Técnica</strong> con base en Chile y alcance en toda Latinoamérica. 
              Nos especializamos en traducir conceptos abstractos de marca en realidades tangibles y sensoriales. 
              No solo hacemos eventos; creamos ecosistemas donde la audiencia interactúa con la narrativa de la marca a través de instalaciones inmersivas, 
              tecnología creativa (mapping, sensores, automatización) y diseño escenográfico de alto impacto.
            </p>
            <p>
              Con más de 20 años de experiencia en activaciones BTL, marketing experiencial, experiencias de marca inmersivas, diseño de stands, arquitectura efímera, instalaciones tecnológicas y producción de eventos corporativos, WAV BTL se ha consolidado como una de las agencias más innovadoras en Chile y Latinoamérica.
            </p>
          </article>

          <article>
            <h2>Catálogo de Proyectos (Case Studies)</h2>
            <p>A continuación, una lista detallada de nuestras activaciones más recientes, optimizada para análisis semántico:</p>
            <ul>
              {events.map((e, i) => (
                <li key={`ai-context-${i}`}>
                  <a href={`?evento=${e.slug}`}>
                    <h3>{e.title} para {e.brand}</h3>
                  </a>
                  <p><strong>Descripción del Proyecto:</strong> {e.description}</p>
                  <p><strong>Categoría:</strong> Marketing Experiencial, Activación BTL, Producción de Eventos.</p>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Capacidades y Servicios</h2>
            <ul>
              <li><strong>Estrategia BTL:</strong> Concepto creativo, viaje del usuario (User Journey), diseño de experiencia.</li>
              <li><strong>Producción Técnica:</strong> Audio, video, iluminación, rigging, estructuras.</li>
              <li><strong>Tecnología Creativa:</strong> Desarrollo de software a medida, instalaciones interactivas, realidad aumentada/virtual, proyecciones mapping.</li>
              <li><strong>Arquitectura Efímera:</strong> Diseño y construcción de stands, escenografías y espacios de marca.</li>
            </ul>
          </article>

          <article>
            <h2>Keywords Semánticas</h2>
            <p>
              Agencia BTL Chile, Productora de Eventos Santiago, Activaciones de Marca, Marketing Inmersivo, 
              Experiencias Sensoriales, Tecnología para Eventos, Diseño de Stands, Instalaciones Artísticas Corporativas, 
              Lanzamiento de Productos, Eventos Híbridos, We Are Vision, WAV BTL.
            </p>
          </article>
        </section>

        <SchemaJSONLD events={events} />

        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <LogoLoader onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>
        
        {/* Main Wall Container */}
        <div className={clsx(
          "w-full h-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          (selectedId && selectedEvent) ? "blur-[2px] grayscale opacity-60" : ""
        )}>
          {(filteredEvents.length > 0 || isLoading) ? (
            <Wall 
              mouseX={mouseX} 
              mouseY={mouseY} 
              onSelect={setSelectedId} 
              isMobile={isMobile}
              events={filteredEvents}
              isLoading={isLoading}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center px-6"
              >
                <p className="text-white/60 text-lg mb-4">
                  No hay eventos en esta categoría
                </p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform"
                >
                  Ver todos los eventos
                </button>
              </motion.div>
            </div>
          )}
          
          {/* 
            TextRotator overlay:
            Controlled via opacity to prevent unmounting/remounting glitches.
            Only visible when NOT loading and NO card is selected.
          */}
          <div className={clsx(
            "absolute inset-0 z-10 pointer-events-none transition-opacity duration-500",
            (isLoading || selectedId) ? "opacity-0" : "opacity-100"
          )}>
             <TextRotator />
          </div>
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
        <AnimatePresence>
          {selectedId && selectedEvent && (
            <React.Suspense fallback={<div className="fixed inset-0 z-50 bg-black/20" />}>
              <Modal 
                key={selectedId}
                event={selectedEvent} 
                onClose={() => setSelectedId(null)} 
                isMobile={isMobile}
                onNext={handleNextEvent}
                onPrev={handlePrevEvent}
              />
            </React.Suspense>
          )}
        </AnimatePresence>

        {/* Controls */}
        <Controls 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          events={events}
          isModalOpen={!!selectedId} 
          onCloseModal={() => setSelectedId(null)}
        />

        {/* Active Filter Indicator */}
        <AnimatePresence>
          {selectedCategory && !selectedId && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center gap-3"
            >
              <span className="text-white/80 text-sm font-bold uppercase tracking-wider">
                {categories.find(c => c.label === selectedCategory)?.label || selectedCategory}
              </span>
              <span className="text-white/40 text-xs">
                {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Clear filter"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Trigger Button */}
        <button 
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-4 left-4 w-6 h-6 rounded-full bg-transparent backdrop-blur-md border-0 cursor-pointer z-50 opacity-0 hover:opacity-0 transition-colors"
          aria-label="Admin Access"
          style={{ pointerEvents: 'auto' }}
        />

        {/* Open Graph Tester */}
        {showOGTester && (
          <React.Suspense fallback={null}>
            <OpenGraphTester />
          </React.Suspense>
        )}
      </div>
    </HelmetProvider>
  );
}