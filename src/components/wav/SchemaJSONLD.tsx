import React, { useEffect } from 'react';
import { WavEvent } from '../../types';

interface SchemaJSONLDProps {
  events: WavEvent[];
}

export const SchemaJSONLD: React.FC<SchemaJSONLDProps> = ({ events }) => {
  useEffect(() => {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WAV BTL",
      "url": "https://btl.wearevision.cl",
      "logo": "https://btl.wearevision.cl/favicon.png",
      "description": "Agencia de Marketing Experiencial, Activaciones de Marca, Instalaciones Tecnológicas y Producción de Eventos en Chile y LATAM.",
      "sameAs": [
        "https://www.instagram.com/wearevisioncl",
        "https://www.linkedin.com/company/wearevision"
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Marketing Experiencial y Activaciones de Marca",
      "provider": {
        "@type": "Organization",
        "name": "WAV BTL"
      },
      "areaServed": ["Chile", "Latinoamérica"],
      "description": "Servicios de activaciones BTL, producción de eventos, experiencias inmersivas, instalaciones tecnológicas, diseño de stands y escenografía."
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WAV BTL",
      "url": "https://btl.wearevision.cl",
      "description": "Portafolio experiencial de activaciones y eventos BTL en Chile y Latinoamérica."
    };

    const workSchemas = events.map(event => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": event.title,
      "image": event.image,
      "description": event.description,
      "creator": {
        "@type": "Organization",
        "name": "WAV BTL"
      }
    }));

    const fullSchema = [
      orgSchema,
      serviceSchema,
      websiteSchema,
      ...workSchemas
    ];

    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(fullSchema);
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts or events change
      try {
        document.head.removeChild(script);
      } catch (e) {
        // Ignore error if script was already removed
      }
    };
  }, [events]);

  return null;
};
