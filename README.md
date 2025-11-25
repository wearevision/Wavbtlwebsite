WAV BTL es una web experiencial diseñada para presentar portafolio, activaciones y eventos inmersivos de WAV a través de una interfaz viva, reactiva y sensorial.
El proyecto combina:
	•	un mosaico trapezoidal infinito,
	•	un modal cinematográfico,
	•	un CMS liviano con Supabase,
	•	animaciones fluidas con motion/react,
	•	y un código optimizado para rendimiento móvil.

La versión v1.0 representa la primera versión estable del sitio, con arquitectura mejorada, rendimiento optimizado y comportamiento consistente entre dispositivos, manteniendo el diseño y experiencia original intactos.

⸻

Tecnologías Utilizadas

Frontend
	•	React + TypeScript (Vite)
	•	motion/react (Framer Motion)
	•	TailwindCSS
	•	Custom hooks y lógica de interacción

Backend / CMS
	•	Supabase (Base de datos + Storage)
	•	Figma Make como capa UI del CMS
	•	Fallback automático a datos estáticos en caso de falla

Infraestructura
	•	Cloudflare DNS + SSL
	•	Figma Sites hosting

⸻

Estructura del Proyecto:
src/
│
├─ components/
│   ├─ wav/
│   │   ├─ Wall.tsx
│   │   ├─ Modal.tsx
│   │   ├─ Controls.tsx
│   │   ├─ TextRotator.tsx
│   │   ├─ LogoLoader.tsx
│   │   └─ AdminPanel.tsx
│   └─ ui/
│
├─ data/
│   └─ events.ts        # fallback estático
│
├─ utils/
│   └─ api.ts           # fetch desde Supabase + fallback
│
├─ index.css
├─ App.tsx
└─ main.tsx

CMS / Data Flow

El sistema de contenido funciona así:
	1.	Supabase entrega los eventos
title, brand, image/gif, description, logo.
	2.	Si falla el fetch, el sistema usa los eventos estáticos.
	3.	Los eventos pasan por una normalización simple antes de llegar a la UI.
	4.	Se renderizan en el muro trapezoidal.
	5.	Al hacer click, se abre el Modal cinematográfico, mostrando:
	•	imagen/video
	•	marca
	•	detalle
	•	assets opcionales

Este CMS es liviano, resistente y fácil de mantener.

⸻

Mejoras de Estabilidad Incluidas en v1.0

1. Fuente única de verdad para modo móvil
	•	Eliminado cálculo duplicado de isMobile.
	•	Modal ahora recibe el estado desde App.tsx.

2. Throttle de giroscopio (20ms)
	•	Reduce carga en dispositivos móviles.
	•	Mantiene fluidez visual.

3. Accesibilidad básica
	•	Modal ahora cierra con tecla ESC.
	•	Mejora experiencia de teclado.

4. Lazy loading de imágenes
	•	Imágenes del muro cargan solo cuando se ven.
	•	Menor tiempo de carga.
	•	Mejor SEO.

5. CMS robusto
	•	Fallback automático en caso de error de Supabase.
	•	Web nunca se rompe por datos faltantes.

6. Limpieza de código
	•	Eliminación de lógica duplicada.
	•	Orden y estructura mejorada.

⸻

Cómo Ejecutar el Proyecto Localmente
npm install
npm run dev

Abrir en el navegador:
http://localhost:5173

⸻

Variables de Entorno

Crear un archivo .env:
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_PASSWORD=...

🧪 Testing Manual (Checklist)
	•	Probar muro en desktop
	•	Probar muro en celular
	•	Revisar movimiento por mouse
	•	Revisar movimiento por giroscopio
	•	Probar abrir/cerrar modal
	•	Presionar ESC para cerrar
	•	Verificar carga progresiva de imágenes
	•	Desconectar Supabase → confirmar uso de fallback

⸻

Roadmap

v1.1 – Optimización técnica
	•	Validación estricta de datos del CMS
	•	Accesibilidad avanzada (focus trap)
	•	Contraseña de Admin → ENV
	•	Limpieza avanzada y hooks modulares

v2 – Experiencia + IA
	•	Muro emocional adaptativo
	•	Recomendador de eventos
	•	Modal cinematográfico con IA
	•	Modos vibracionales (calma, energía, asombro)
	•	SEO IA-extremo por evento

⸻

Estado Actual

WAV BTL v1.0 está completo, estable, optimizado, accesible y listo para producción.
Cualquier cambio futuro puede partir desde una base sólida y profesional.
