/**
 * OpenAI Status Indicator
 * Muestra el estado de la configuración de OpenAI API
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

type Status = 'checking' | 'configured' | 'not-configured' | 'error';

export const OpenAIStatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<Status>('checking');
  const [message, setMessage] = useState('Verificando configuración...');

  useEffect(() => {
    checkOpenAIStatus();
  }, []);

  const checkOpenAIStatus = async () => {
    try {
      // Hacer una llamada simple al endpoint con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/health`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          signal: controller.signal
        }
      ).catch((error) => {
        // Si es timeout o network error
        if (error.name === 'AbortError') {
          throw new Error('TIMEOUT');
        }
        throw new Error('NETWORK_ERROR');
      });

      clearTimeout(timeoutId);

      // Si retorna 200, el servidor está funcionando
      if (res.ok) {
        const data = await res.json();
        
        // Verificar si OpenAI está configurado según la respuesta
        if (data.openai === true) {
          setStatus('configured');
          setMessage('OpenAI API configurada correctamente');
        } else if (data.openai === false) {
          setStatus('not-configured');
          setMessage('OpenAI API key no configurada');
        } else {
          setStatus('error');
          setMessage('No se pudo verificar OpenAI');
        }
        return;
      }

      // Si no es OK, error
      setStatus('error');
      setMessage('Error al verificar servidor');

    } catch (error: any) {
      console.error('[OpenAI Status] Error:', error);
      
      if (error.message === 'TIMEOUT') {
        setStatus('error');
        setMessage('Timeout al conectar con servidor');
      } else if (error.message === 'NETWORK_ERROR') {
        setStatus('error');
        setMessage('No se pudo conectar con el servidor');
      } else {
        setStatus('error');
        setMessage('Error al verificar configuración');
      }
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'checking':
        return <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />;
      case 'configured':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'not-configured':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getColor = () => {
    switch (status) {
      case 'checking':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'configured':
        return 'border-green-500/30 bg-green-500/5';
      case 'not-configured':
        return 'border-red-500/30 bg-red-500/5';
      case 'error':
        return 'border-orange-500/30 bg-orange-500/5';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md border ${getColor()} text-sm`}>
      {getIcon()}
      <span className="text-neutral-300">{message}</span>
      
      {(status === 'not-configured' || status === 'error') && (
        <a
          href="/OPENAI_SETUP.md"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs"
          title="Ver guía de configuración"
        >
          Ayuda
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
};