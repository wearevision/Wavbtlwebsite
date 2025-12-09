import React, { useEffect } from 'react';
import { WavEvent } from '../../types';

interface SchemaJSONLDProps {
  events: WavEvent[];
}

export const SchemaJSONLD: React.FC<SchemaJSONLDProps> = ({ events }) => {
  useEffect(() => {
    const services = [
       "Activaciones BTL",
       "Experiencias inmersivas",
       "Arquitectura efímera",
       "Diseño de stands y escenografía",
       "Producción de eventos corporativos",
       "Instalaciones tecnológicas",
       "Brand experience",
       "Lanzamiento de productos y marcas",
       "Guerrilla marketing"
    ];

    // 1. Organization (The Agency) with Merged Services & Portfolio
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "We Are Vision",
      "alternateName": ["WAV", "WAV BTL"],
      "url": "https://btl.wearevision.cl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ykkmplrnqcwpgfdjshxn.supabase.co/storage/v1/object/public/assets/logo-wav-square.png",
        "width": 512,
        "height": 512
      },
      "description": "Agencia de Marketing Experiencial, Activaciones de Marca, Instalaciones Tecnológicas y Producción de Eventos en Chile y LATAM.",
      "foundingDate": "2003",
      "email": "federico@wearevision.cl",
      "dateModified": new Date().toISOString(),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "CL"
      },
      "sameAs": [
        "https://www.instagram.com/wearevisioncl",
        "https://www.linkedin.com/company/wearevision"
      ],
      
      // 2. hasOfferCatalog containing structured list of services
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios BTL y Experiencias",
        "itemListElement": services.map(service => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": service
            }
        }))
      },

      // 3. Portfolio entries (CreativeWork)
      "workExample": events.map(event => ({
         "@type": "CreativeWork",
         "name": event.title,
         "headline": event.title,
         "alternativeHeadline": event.brand,
         "image": event.image,
         "identifier": event.slug || event.id,
         "url": `https://btl.wearevision.cl/?evento=${event.slug || ''}`,
         "about": event.technical_summary || event.description,
         "keywords": [
             "activación BTL",
             "experiencia inmersiva",
             "instalación tecnológica",
             "producción de eventos",
             "arquitectura efímera",
             "stand",
             "brand experience"
         ],
         "provider": {
            "@type": "Organization",
            "name": "We Are Vision"
         },
         "creator": {
            "@type": "Organization",
            "name": "We Are Vision"
          }
      }))
    };

    // 4. WebSite (The BTL Portfolio context)
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WAV BTL Portfolio",
      "url": "https://btl.wearevision.cl",
      "description": "Portafolio experiencial de activaciones y eventos BTL en Chile y Latinoamérica de We Are Vision.",
      "hasPart": events.map(event => ({
          "@type": "CreativeWork",
          "name": event.title,
          "url": `https://btl.wearevision.cl/?evento=${event.slug || ''}`,
          "description": event.technical_summary || event.description
      }))
    };

    const fullSchema = [orgSchema, websiteSchema];

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(fullSchema);
    document.head.appendChild(script);

    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {
        // Ignore error if script was already removed
      }
    };
  }, [events]);

  return null;
};