import { events as staticEvents } from '../data/events';
import { projectId, publicAnonKey } from './supabase/info';
import { WavEvent } from '../types';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

// Fallback data for robustness
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80";

const optimizeUrl = (url: string): string => {
  if (!url) return FALLBACK_IMAGE;
  if (url.includes('images.unsplash.com')) {
    // Ensure WebP format and appropriate size if not already set
    if (!url.includes('fm=')) url += '&fm=webp';
    if (!url.includes('w=')) url += '&w=1080';
    if (!url.includes('q=')) url += '&q=80';
  }
  return url;
};

const validateEvent = (data: any): WavEvent => {
  return {
    brand: typeof data.brand === 'string' ? data.brand : 'Brand',
    title: typeof data.title === 'string' ? data.title : 'Untitled Event',
    description: typeof data.description === 'string' ? data.description : 'No description available.',
    image: optimizeUrl(data.imageUrl || data.image),
    logo: data.logoUrl || data.logo,
    id: data.id,
    ...data
  };
};

export const getEvents = async (): Promise<WavEvent[]> => {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      return staticEvents.map(validateEvent);
    }
    
    // Validate and normalize each event
    const normalizedData = data.map(validateEvent);

    return normalizedData;
  } catch (e) {
    console.warn("Using static events due to backend error:", e);
    return staticEvents.map(validateEvent);
  }
};

export const saveEvents = async (events: any[]) => {
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(events)
    });
    if (!response.ok) throw new Error('Failed to save');
    return response.json();
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: formData
  });
  if (!response.ok) throw new Error('Failed to upload');
  return response.json(); // Returns { path: "..." }
};
