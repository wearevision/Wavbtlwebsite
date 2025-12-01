import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, XCircle, Loader2, Copy, Check } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  statusCode?: number;
  message?: string;
  url?: string;
  preview?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

interface OpenGraphTesterProps {
  eventSlug?: string;
  eventId?: string;
}

/**
 * OpenGraphTester
 * 
 * Componente de prueba para validar el sistema Open Graph
 * Prueba los endpoints y muestra los resultados en tiempo real
 */
export const OpenGraphTester: React.FC<OpenGraphTesterProps> = ({ 
  eventSlug = 'coca-cola-xtreme-tour-2013-activacion-exitosa-en-chile',
  eventId = 'evt-coke-001'
}) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

  const tests = [
    {
      name: 'OG Preview Endpoint',
      endpoint: `/og-preview?evento=${eventSlug}`,
      description: 'Valida que el HTML pre-renderizado se genera correctamente'
    },
    {
      name: 'Event Slug Resolution',
      endpoint: `/events`,
      description: 'Confirma que el evento existe en la base de datos'
    },
    {
      name: 'Shortlink System',
      endpoint: `/s/test123`,
      description: 'Prueba la redirección de códigos cortos (si existe)'
    }
  ];

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    for (const test of tests) {
      const testUrl = `${baseUrl}${test.endpoint}`;
      
      setResults(prev => [
        ...prev,
        {
          endpoint: test.name,
          status: 'pending',
          url: testUrl
        }
      ]);

      try {
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'LinkedInBot/1.0' // Simula crawler de LinkedIn
          }
        });

        const isSuccess = response.ok;
        let preview: any = {};

        // Si es el endpoint OG Preview, intenta parsear meta tags
        if (test.endpoint.includes('og-preview') && isSuccess) {
          const html = await response.text();
          
          // Extraer meta tags básicos con regex
          const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
          const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
          const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
          
          preview = {
            title: titleMatch?.[1],
            description: descMatch?.[1],
            image: imageMatch?.[1]
          };
        }

        setResults(prev => 
          prev.map(r => 
            r.endpoint === test.name
              ? {
                  ...r,
                  status: isSuccess ? 'success' : 'error',
                  statusCode: response.status,
                  message: isSuccess 
                    ? `✅ ${response.status} OK` 
                    : `❌ ${response.status} ${response.statusText}`,
                  preview: Object.keys(preview).length > 0 ? preview : undefined
                }
              : r
          )
        );
      } catch (error: any) {
        setResults(prev =>
          prev.map(r =>
            r.endpoint === test.name
              ? {
                  ...r,
                  status: 'error',
                  message: `❌ Error: ${error.message}`
                }
              : r
          )
        );
      }
    }

    setIsRunning(false);
  };

  const handleCopy = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
        return;
      }
    } catch (err) {
      // Fall through to fallback
    }
    
    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      alert(`No se pudo copiar. URL: ${url}`);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            🔗 Open Graph System Tester
          </h1>
          <p className="text-neutral-400 text-sm">
            Validación del sistema de compartición social para We Are Vision BTL
          </p>
        </div>

        {/* Test Configuration */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Configuración de Prueba</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">Event Slug</label>
              <code className="block bg-black border border-neutral-700 rounded px-3 py-2 text-xs text-green-400 font-mono">
                {eventSlug}
              </code>
            </div>
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">Event ID</label>
              <code className="block bg-black border border-neutral-700 rounded px-3 py-2 text-xs text-blue-400 font-mono">
                {eventId}
              </code>
            </div>
          </div>
        </div>

        {/* Run Tests Button */}
        <button
          onClick={runTests}
          disabled={isRunning}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-neutral-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-3"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Ejecutando pruebas...</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-5 h-5" />
              <span>Ejecutar Pruebas del Sistema</span>
            </>
          )}
        </button>

        {/* Test Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Resultados</h2>
            
            {results.map((result, idx) => (
              <div
                key={idx}
                className={clsx(
                  'border rounded-lg p-4 transition-all',
                  result.status === 'pending' && 'bg-neutral-900 border-neutral-700',
                  result.status === 'success' && 'bg-green-950/30 border-green-500/30',
                  result.status === 'error' && 'bg-red-950/30 border-red-500/30'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {result.status === 'pending' && (
                      <Loader2 className="w-5 h-5 text-blue-400 animate-spin shrink-0" />
                    )}
                    {result.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    )}
                    {result.status === 'error' && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <div>
                      <h3 className="text-white font-bold">{result.endpoint}</h3>
                      {result.message && (
                        <p className="text-xs text-neutral-400 mt-1">{result.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {result.statusCode && (
                    <span className={clsx(
                      'px-2 py-1 rounded text-xs font-mono font-bold',
                      result.statusCode >= 200 && result.statusCode < 300 && 'bg-green-500/20 text-green-400',
                      result.statusCode >= 400 && 'bg-red-500/20 text-red-400'
                    )}>
                      {result.statusCode}
                    </span>
                  )}
                </div>

                {/* URL */}
                {result.url && (
                  <div className="mt-3 bg-black/50 border border-neutral-700 rounded p-2 flex items-center gap-2">
                    <code className="flex-1 text-xs text-neutral-400 font-mono truncate">
                      {result.url}
                    </code>
                    <button
                      onClick={() => handleCopy(result.url!)}
                      className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded transition-all shrink-0"
                      title="Copiar URL"
                    >
                      {copiedUrl === result.url ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                )}

                {/* Preview Meta Tags */}
                {result.preview && (
                  <div className="mt-4 space-y-2 bg-black/30 border border-neutral-700 rounded p-3">
                    <p className="text-xs font-bold text-pink-400 mb-2">
                      📌 Open Graph Meta Tags Detectados:
                    </p>
                    
                    {result.preview.title && (
                      <div>
                        <span className="text-xs text-neutral-500">og:title</span>
                        <p className="text-sm text-white font-semibold">{result.preview.title}</p>
                      </div>
                    )}
                    
                    {result.preview.description && (
                      <div>
                        <span className="text-xs text-neutral-500">og:description</span>
                        <p className="text-xs text-neutral-300 line-clamp-2">{result.preview.description}</p>
                      </div>
                    )}
                    
                    {result.preview.image && (
                      <div>
                        <span className="text-xs text-neutral-500 block mb-1">og:image</span>
                        <img 
                          src={result.preview.image} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded border border-neutral-700"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23171717" width="100" height="100"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" fill="%23525252" font-size="12"%3EError%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <code className="text-[10px] text-neutral-500 font-mono block mt-1 truncate">
                          {result.preview.image}
                        </code>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {results.length === 0 && !isRunning && (
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-white font-bold mb-2">📋 Instrucciones</h3>
            <ul className="text-sm text-blue-300 space-y-2 list-disc list-inside">
              <li>Click en "Ejecutar Pruebas" para validar los endpoints</li>
              <li>El sistema simulará un crawler de LinkedIn</li>
              <li>Verás los meta tags OG extraídos del HTML</li>
              <li>Puedes copiar las URLs para probar en LinkedIn Post Inspector</li>
            </ul>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h3 className="text-white font-bold mb-3">🔗 Enlaces Rápidos</h3>
          <div className="space-y-2">
            <a
              href="https://www.linkedin.com/post-inspector/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LinkedIn Post Inspector</span>
            </a>
            <a
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Facebook Sharing Debugger</span>
            </a>
            <a
              href={`${baseUrl}/og-preview?evento=${eventSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver HTML Pre-renderizado (Abrir en nueva pestaña)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for clsx
function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
