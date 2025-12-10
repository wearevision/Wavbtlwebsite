/**
 * Sync Supabase Events to Local File
 * 
 * This utility fetches the generated TypeScript code for /data/events.ts
 * from the server endpoint.
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function generateLocalEventsFile(accessToken?: string): Promise<string> {
  try {
    const token = accessToken || publicAnonKey;
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/generate-local-file`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate file: ${response.status} ${response.statusText}`);
    }

    const fileContent = await response.text();
    return fileContent;
  } catch (error) {
    console.error('Error generating local events file:', error);
    throw error;
  }
}

export async function downloadEventsAsFile() {
  const content = await generateLocalEventsFile();
  
  // Create blob and download
  const blob = new Blob([content], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'events.ts';
  a.click();
  URL.revokeObjectURL(url);
}
