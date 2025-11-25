import { events as staticEvents } from '../data/events';
import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206`;

export const getEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    // Normalize data for frontend components that expect 'image' property
    const normalizedData = data.map((e: any) => ({
      ...e,
      image: e.imageUrl || e.image,
      logo: e.logoUrl || e.logo
    }));

    return normalizedData.length > 0 ? normalizedData : staticEvents;
  } catch (e) {
    console.warn("Using static events due to backend error:", e);
    return staticEvents;
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
