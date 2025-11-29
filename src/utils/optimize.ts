/**
 * Utility functions for optimizing all events
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

export interface OptimizationResult {
  eventId: string;
  brand: string;
  title: string;
  fieldsUpdated: string[];
  category?: string;
  error?: string;
}

export interface OptimizationResponse {
  success: boolean;
  total: number;
  optimized: number;
  skipped: number;
  errors: number;
  results: OptimizationResult[];
  message: string;
  error?: string;
}

/**
 * Optimize all events in the database
 * @param token - Admin authentication token (from session or environment)
 */
export async function optimizeAllEvents(token: string): Promise<OptimizationResponse> {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  const url = `${API_BASE}/optimize-all-events`;
  console.log('[optimizeAllEvents] Calling:', url);
  console.log('[optimizeAllEvents] Token length:', token.length);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('[optimizeAllEvents] Response status:', response.status);
    console.log('[optimizeAllEvents] Response ok:', response.ok);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(`Failed to optimize events: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('[optimizeAllEvents] Success:', data);
    return data;
  } catch (error) {
    console.error('[optimizeAllEvents] Network or fetch error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet y que el servidor esté activo.');
    }
    throw error;
  }
}
