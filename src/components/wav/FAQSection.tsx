/**
 * FAQSection - Preguntas Frecuentes
 * v2.1.2 - Build Refresh
 */

import React from 'react';

export const FAQSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-6" aria-label="Preguntas Frecuentes">
      <h2 className="text-2xl font-bold mb-8 font-['Outfit'] uppercase tracking-wider text-white">
        Preguntas Frecuentes (FAQ)
      </h2>
      <div className="space-y-4">
        <details className="group border-b border-white/20 pb-4 cursor-pointer">
          <summary className="text-lg font-medium list-none flex justify-between items-center hover:text-[#FF00A8] transition-colors">
            ¿Qué servicios de producción técnica ofrecen en LATAM?
            <span className="transform group-open:rotate-180 transition-transform duration-300 text-xs ml-2">▼</span>
          </summary>
          <p className="mt-4 text-[#A1A1AA] leading-relaxed text-sm">
            Diseño de stands, mapping 3D, automatización de eventos y experiencias inmersivas en Chile, Perú y Colombia.
          </p>
        </details>

        <details className="group border-b border-white/20 pb-4 cursor-pointer">
          <summary className="text-lg font-medium list-none flex justify-between items-center hover:text-[#9B00FF] transition-colors">
            ¿Desarrollan experiencias BTL con realidad aumentada?
            <span className="transform group-open:rotate-180 transition-transform duration-300 text-xs ml-2">▼</span>
          </summary>
          <p className="mt-4 text-[#A1A1AA] leading-relaxed text-sm">
            Sí, integramos AR/VR, sensores kinéticos y gamificación en tiempo real para activaciones de marca.
          </p>
        </details>

        <details className="group border-b border-white/20 pb-4 cursor-pointer">
          <summary className="text-lg font-medium list-none flex justify-between items-center hover:text-[#0044FF] transition-colors">
            ¿Cómo cotizar un proyecto de marketing experiencial?
            <span className="transform group-open:rotate-180 transition-transform duration-300 text-xs ml-2">▼</span>
          </summary>
          <p className="mt-4 text-[#A1A1AA] leading-relaxed text-sm">
            Contáctanos vía formulario para una evaluación técnica y propuesta creativa personalizada.
          </p>
        </details>
      </div>
    </section>
  );
};