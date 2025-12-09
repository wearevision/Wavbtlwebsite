import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { FAQSection } from './FAQSection';
import { TrapezoidButton } from './TrapezoidButton';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={clsx(
              "fixed top-0 right-0 h-full w-full max-w-2xl",
              "bg-black/80 backdrop-blur-xl border-l border-white/10",
              "z-[151] overflow-y-auto custom-scrollbar",
              "shadow-2xl"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Acerca de We Are Vision"
          >
            <div className="relative p-8 md:p-12 pb-24">
              
              {/* Close Button */}
              <div className="sticky top-0 right-0 flex justify-end z-10 mb-8">
                <TrapezoidButton onClick={onClose} variant="outline" size="md" ariaLabel="Cerrar">
                  <X size={24} />
                </TrapezoidButton>
              </div>

              {/* Header */}
              <header className="mb-12">
                <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold uppercase tracking-tighter mb-4 text-white">
                  We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00A8] to-[#0044FF]">Vision</span>
                </h2>
                <p className="text-xl text-[#A1A1AA] font-light leading-relaxed">
                  Agencia de Marketing Experiencial & Producción Técnica
                </p>
              </header>

              {/* Content Sections (Previously Hidden) */}
              <div className="space-y-16">
                
                {/* Manifesto */}
                <article>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white/90 mb-6 border-b border-white/10 pb-2">
                    Manifiesto
                  </h3>
                  <div className="prose prose-invert prose-lg text-[#A1A1AA]">
                    <p className="mb-4">
                      We Are Vision es una agencia con base en Chile y alcance en toda Latinoamérica. 
                      Nos especializamos en traducir conceptos abstractos de marca en realidades tangibles y sensoriales.
                    </p>
                    <p>
                      No solo hacemos eventos; creamos ecosistemas donde la audiencia interactúa con la narrativa de la marca a través de instalaciones inmersivas, 
                      tecnología creativa (mapping, sensores, automatización) y diseño escenográfico de alto impacto.
                    </p>
                  </div>
                </article>

                {/* Capabilities */}
                <article>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white/90 mb-6 border-b border-white/10 pb-2">
                    Capacidades
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <li className="bg-white/5 p-4 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                      <strong className="block text-[#FF00A8] uppercase text-sm mb-2">Estrategia BTL</strong>
                      <span className="text-sm text-neutral-400">Concepto creativo, User Journey, Diseño de experiencia.</span>
                    </li>
                    <li className="bg-white/5 p-4 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                      <strong className="block text-[#9B00FF] uppercase text-sm mb-2">Producción Técnica</strong>
                      <span className="text-sm text-neutral-400">Audio, video, iluminación, rigging, estructuras.</span>
                    </li>
                    <li className="bg-white/5 p-4 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                      <strong className="block text-[#0044FF] uppercase text-sm mb-2">Tecnología Creativa</strong>
                      <span className="text-sm text-neutral-400">Instalaciones interactivas, AR/VR, Mapping, Software a medida.</span>
                    </li>
                    <li className="bg-white/5 p-4 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
                      <strong className="block text-white uppercase text-sm mb-2">Arquitectura Efímera</strong>
                      <span className="text-sm text-neutral-400">Diseño y construcción de stands, escenografías y espacios.</span>
                    </li>
                  </ul>
                </article>

                {/* FAQ Section (Reused) */}
                <div className="-mx-6 px-6 bg-white/5 py-8 rounded-xl border border-white/5">
                   <FAQSection />
                </div>

                {/* Semantic Keywords (Visible but styled subtly) */}
                <article className="opacity-40 text-xs text-neutral-500 mt-12">
                   <p>
                    Agencia BTL Chile • Productora de Eventos Santiago • Activaciones de Marca • Marketing Inmersivo •
                    Experiencias Sensoriales • Tecnología para Eventos • Diseño de Stands • Instalaciones Artísticas Corporativas
                   </p>
                </article>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
