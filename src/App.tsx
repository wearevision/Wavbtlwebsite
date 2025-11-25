import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Wall } from './components/wav/Wall';
import { TextRotator } from './components/wav/TextRotator';
import { Controls } from './components/wav/Controls';
import { Modal } from './components/wav/Modal';
import { AdminPanel } from './components/wav/AdminPanel';
import { LogoLoader } from './components/wav/LogoLoader';
import { clsx } from 'clsx';
import { events as staticEvents } from './data/events';
import { getEvents } from './utils/api';

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

export type ColorMode = 'monochrome' | 'neon' | 'duotone' | 'glass';

// Interface for iOS specific requestPermission
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export default function App() {
  const [mode, setMode] = useState<ColorMode>('monochrome');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionButton, setShowPermissionButton] = useState(false);
  
  // Data & Admin State
  const [events, setEvents] = useState(staticEvents);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load dynamic events
    getEvents().then(setEvents);
  }, []);
  
  // Mouse position for global 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  if (showAdmin) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--wav-neutral-black)] text-white">
      <DuotoneFilter />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LogoLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* Main Wall Container */}
      <div className={clsx(
        "w-full h-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        selectedId ? "blur-[20px] scale-95 opacity-50" : ""
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
      <AnimatePresence>
        {selectedId && selectedEvent && (
          <Modal 
            event={selectedEvent} 
            onClose={() => setSelectedId(null)} 
            mode={mode}
          />
        )}
      </AnimatePresence>

      {/* Controls */}
      <Controls currentMode={mode} setMode={setMode} />

      {/* Admin Trigger Button */}
      <button 
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 left-4 w-6 h-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer z-50 hover:bg-white/20 transition-colors opacity-50 hover:opacity-100"
        aria-label="Admin Access"
      />
    </div>
  );
}
