import { useState, useEffect } from 'react';
import { getEvents, saveEvents, uploadFile, createEvent, clearAllEvents } from '../../utils/api';
import { WavEvent, WavMedia } from '../../types';
import { supabase } from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';
import { processFileForUpload } from '../../utils/imageOptimizer';
import { generateSlug } from '../../utils/slug';
import { optimizeAllEvents } from '../../utils/optimize';

export const useAdminEvents = () => {
  const [events, setEvents] = useState<WavEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  // New state for tracking granular save status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const getAdminToken = async () => {
      // 1. Try to get session token (Primary)
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
          return data.session.access_token;
      }

      // 2. Fallback to Environment Variables (Legacy/Dev)
      // @ts-ignore
      const env = import.meta.env || {};
      // @ts-ignore
      const procEnv = typeof process !== 'undefined' ? process.env : {};
      return env.VITE_EDGE_ADMIN_TOKEN || procEnv.EDGE_ADMIN_TOKEN || "";
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      const normalizedData = data.map(e => ({
        ...e,
        id: e.id || crypto.randomUUID(),
        gallery: e.gallery || (e.image ? [{ 
            id: 'legacy-cover', 
            type: 'image', 
            url: e.image, 
            path: e.imagePath 
        } as WavMedia] : [])
      }));
      setEvents(normalizedData);
    } catch (e) {
      console.error(e);
      alert("Error cargando datos");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('saving');
    try {
      const token = await getAdminToken();
      await saveEvents(events, token);
      setSaveStatus('success');
      setLastSavedAt(new Date().toLocaleString());
      alert("Cambios guardados correctamente");
    } catch (e) {
      setSaveStatus('error');
      alert("Error al guardar cambios");
      console.error(e);
    } finally {
      setSaving(false);
      // Reset success status after 3 seconds for better UX
      setTimeout(() => {
         setSaveStatus(prev => prev === 'success' ? 'idle' : prev);
      }, 3000);
    }
  };

  /**
   * Save a single event to Supabase by index
   */
  const saveEvent = async (index: number) => {
    if (index < 0 || index >= events.length) {
      throw new Error('Invalid event index');
    }

    const event = events[index];
    const token = await getAdminToken();
    
    // Save only this event
    await saveEvents([event], token);
    
    setLastSavedAt(new Date().toLocaleString());
  };

  const handleFileChange = async (index: number, field: 'cover' | 'logo' | 'gallery' | 'image', file: File) => {
    const uploadId = `${index}-${field}-${Date.now()}`;
    setUploading(uploadId);
    
    try {
      const currentEvent = events[index];
      
      // Determine slug (use existing or generate new one for filename consistency)
      const slug = currentEvent.slug || generateSlug(currentEvent.brand, currentEvent.title, currentEvent.id);

      // Determine upload type and index
      let type: 'logo' | 'main' | 'gallery_image' | 'gallery_video' = 'main';
      let itemIndex = 1;

      if (field === 'logo') {
          type = 'logo';
      } else if (field === 'image' || field === 'cover') {
          type = 'main';
      } else if (field === 'gallery') {
          const isVideo = file.type.startsWith('video/');
          type = isVideo ? 'gallery_video' : 'gallery_image';
          // Count existing items of same type to determine index
          const existingCount = (currentEvent.gallery || []).filter(m => 
              isVideo ? m.type === 'video' : m.type === 'image'
          ).length;
          itemIndex = existingCount + 1;
      }

      // 1. Process File (Rename, Resize, Compress)
      const processedFile = await processFileForUpload(file, slug, type, itemIndex);
      
      // 2. Upload to Server
      const token = await getAdminToken();
      const result = await uploadFile(processedFile, token);
      
      const newEvents = [...events];
      
      // Use URL.createObjectURL for immediate preview
      // IMPORTANT: The actual persistence relies on `result.path` being saved to the DB
      // The backend generates signed URLs from `imagePath` / `logoPath` / `gallery[].path`
      const objectUrl = URL.createObjectURL(processedFile);
      
      if (field === 'gallery') {
          const isVideo = processedFile.type.startsWith('video/');
          const newMedia: WavMedia = {
              id: crypto.randomUUID(),
              type: isVideo ? 'video' : 'image',
              url: objectUrl, // Temporary preview
              path: result.path // Permanent reference
          };
          newEvents[index].gallery = [...(newEvents[index].gallery || []), newMedia];
          if (!isVideo && (!newEvents[index].image || newEvents[index].gallery?.length === 1)) {
              newEvents[index].image = objectUrl;
              newEvents[index].imagePath = result.path;
          }
      } else if (field === 'logo') {
        newEvents[index].logo = objectUrl;
        newEvents[index].logoPath = result.path;
      } else if (field === 'image' || field === 'cover') {
        newEvents[index].image = objectUrl;
        newEvents[index].imagePath = result.path;
      }
      setEvents(newEvents);
    } catch (e) {
      console.error(e);
      alert("Error subiendo archivo");
    } finally {
      setUploading(null);
    }
  };

  const removeGalleryItem = (eventIndex: number, mediaId: string) => {
      if (!confirm("¿Eliminar este archivo?")) return;
      const newEvents = [...events];
      const gallery = newEvents[eventIndex].gallery || [];
      newEvents[eventIndex].gallery = gallery.filter(m => m.id !== mediaId);
      if (newEvents[eventIndex].gallery?.length && newEvents[eventIndex].gallery[0].type === 'image') {
          const first = newEvents[eventIndex].gallery[0];
          newEvents[eventIndex].image = first.url;
          newEvents[eventIndex].imagePath = first.path;
      }
      setEvents(newEvents);
  };

  const updateEvent = (index: number, field: string, value: any) => {
    console.log(`[updateEvent] Updating field "${field}" at index ${index}`);
    
    setEvents(prevEvents => {
      if (!prevEvents[index]) {
        console.error(`[updateEvent] ERROR: No event found at index ${index}!`);
        return prevEvents;
      }
      
      const newEvents = [...prevEvents];
      newEvents[index] = { ...newEvents[index], [field]: value };
      console.log(`[updateEvent] Field "${field}" updated successfully`);
      return newEvents;
    });
  };

  const addEvent = async () => {
    const newEventDraft: any = {
      id: crypto.randomUUID(),
      brand: "Nueva Marca",
      title: "Nuevo Evento",
      description: "Descripción del evento...",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
      gallery: []
    };

    // Optimistic update (show immediately)
    setEvents([newEventDraft, ...events]);
    setSaveStatus('saving');

    try {
      const token = await getAdminToken();
      const createdEvent = await createEvent(newEventDraft, token);
      
      // Update with server response (ensures consistency)
      setEvents(prev => prev.map(e => e.id === newEventDraft.id ? createdEvent : e));
      
      setSaveStatus('success');
      setLastSavedAt(new Date().toLocaleString());
      
      setTimeout(() => {
         setSaveStatus(prev => prev === 'success' ? 'idle' : prev);
      }, 3000);
    } catch (e) {
      console.error("Error creating event on server:", e);
      setSaveStatus('error');
      alert("El evento se creó localmente pero falló al guardarse en el servidor. Intenta guardar cambios.");
    }
  };

  const removeEvent = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      const newEvents = [...events];
      newEvents.splice(index, 1);
      setEvents(newEvents);
    }
  };

   async function handleApprove(eventId: string, updates: Partial<WavEvent>) {
    setSaveStatus('saving');
    try {
      const token = await getAdminToken();

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/update-event-description`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            eventId,
            newDescription: updates.description, // map specifically for backward compat if needed
            ...updates // spread all other fields
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // UPDATE LOCAL STATE IMMEDIATELY
      setEvents(prevEvents => prevEvents.map(ev => {
        if (ev.id === eventId) {
            return { 
                ...ev, 
                ...updates
            };
        }
        return ev;
      }));

      setSaveStatus('success');
      setLastSavedAt(new Date().toLocaleString());
      alert("Contenidos actualizados en CMS.");
      
      setTimeout(() => {
         setSaveStatus(prev => prev === 'success' ? 'idle' : prev);
      }, 3000);

    } catch (error) {
      console.error("NETWORK ERROR:", error);
      setSaveStatus('error');
      alert("Error al guardar: " + error);
    }
  }

  const handleClearAllEvents = async () => {
    if (!confirm(
      "⚠️ PELIGRO: BORRAR TODOS LOS EVENTOS\n\n" +
      "Esta acción eliminará PERMANENTEMENTE todos los eventos de la base de datos.\n\n" +
      "NO SE PUEDE DESHACER.\n\n" +
      "¿Estás ABSOLUTAMENTE SEGURO de que deseas continuar?"
    )) {
      return;
    }

    // Double confirmation
    if (!confirm("ÚLTIMA CONFIRMACIÓN: ¿Borrar TODOS los eventos?")) {
      return;
    }

    setSaving(true);
    setSaveStatus('saving');
    try {
      const token = await getAdminToken();
      
      console.log("[handleClearAllEvents] Clearing ALL events from database...");
      
      await clearAllEvents(token);
      
      setSaveStatus('success');
      setLastSavedAt(new Date().toLocaleString());
      
      alert("✅ Todos los eventos han sido borrados.\n\nLa base de datos está vacía.");
      
      // Reload data to show empty state
      await loadData();
      
      // Reset success status after 3 seconds
      setTimeout(() => {
         setSaveStatus(prev => prev === 'success' ? 'idle' : prev);
      }, 3000);

    } catch (error) {
      console.error("CLEAR ALL ERROR:", error);
      setSaveStatus('error');
      alert("Error al borrar eventos: " + error);
    } finally {
      setSaving(false);
    }
  };

  const handleCleanupEvents = async () => {
    if (!confirm(
      "¿Normalizar todos los eventos en la base de datos?\n\n" +
      "Esto actualizará automáticamente:\n" +
      "✅ Generará IDs faltantes (UUID)\n" +
      "✅ Regenerará slugs con formato brand-title\n" +
      "✅ Normalizará campos de imagen\n" +
      "✅ Convertirá gallery a arrays\n" +
      "✅ Normalizará campo logo (PNG/SVG)\n" +
      "✅ Eliminará campos no permitidos\n\n" +
      "⚠️ Todos los slugs se regenerarán con el nuevo formato.\n\n" +
      "¿Continuar?"
    )) {
      return;
    }

    setSaving(true);
    setSaveStatus('saving');
    try {
      const token = await getAdminToken();
      
      console.log("[handleCleanupEvents] Calling /cleanup-events endpoint...");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/cleanup-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("CLEANUP ERROR:", errorText);
        setSaveStatus('error');
        alert("Error al normalizar eventos: " + errorText);
        return;
      }

      const result = await response.json();
      console.log("[handleCleanupEvents] Cleanup result:", result);
      
      setSaveStatus('success');
      setLastSavedAt(new Date().toLocaleString());
      
      alert(`✅ Normalización completada con éxito!\n\n${result.cleanedCount} eventos fueron normalizados.\n\nRecargando datos...`);
      
      // Reload data to show normalized events
      await loadData();
      
      // Reset success status after 3 seconds
      setTimeout(() => {
         setSaveStatus(prev => prev === 'success' ? 'idle' : prev);
      }, 3000);

    } catch (error) {
      console.error("CLEANUP NETWORK ERROR:", error);
      setSaveStatus('error');
      alert("Error de red al normalizar eventos.");
    } finally {
      setSaving(false);
    }
  };

  const handleOptimizeAll = async () => {
    const confirmed = confirm(
      'Esta acción generará contenido con IA para todos los eventos que tengan campos vacíos o incompletos.\n\n' +
      'Esto puede tardar varios minutos dependiendo de la cantidad de eventos.\n\n' +
      '¿Deseas continuar?'
    );

    if (!confirmed) return;

    setSaving(true);
    setSaveStatus('saving');

    try {
      // Get admin token (same logic as handleSave)
      const token = await getAdminToken();
      
      if (!token) {
        throw new Error('No se pudo obtener el token de autenticación. Por favor, inicia sesión nuevamente.');
      }

      const result = await optimizeAllEvents(token);
      
      if (result.success) {
        await loadData(); // Reload events to show optimized data
        setSaveStatus('success');
        alert(
          `Optimización completada:\n\n` +
          `Total de eventos: ${result.total}\n` +
          `Optimizados: ${result.optimized}\n` +
          `Ya completos (omitidos): ${result.skipped}\n` +
          `Errores: ${result.errors}\n\n` +
          `Revisa los eventos para verificar el contenido generado.`
        );
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error("OPTIMIZE ALL ERROR:", error);
      setSaveStatus('error');
      
      let errorMessage = 'Error desconocido';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 
          'No se pudo conectar al servidor.\n\n' +
          'Posibles causas:\n' +
          '1. El servidor Supabase Edge Functions no está activo\n' +
          '2. Problema de red o CORS\n' +
          '3. El endpoint no existe o cambió\n\n' +
          'Soluciones:\n' +
          '- Abre /test-health.html para diagnosticar\n' +
          '- Verifica que el servidor esté desplegado en Supabase\n' +
          '- Revisa la consola del navegador para más detalles';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(`Error al optimizar eventos:\n\n${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  return {
    events,
    loading,
    saving,
    uploading,
    saveStatus, // Export the new status
    lastSavedAt,
    loadData,
    handleSave,
    saveEvent, // Export single-event save
    handleFileChange,
    removeGalleryItem,
    updateEvent,
    addEvent,
    removeEvent,
    handleApprove,
    handleCleanupEvents,
    handleClearAllEvents,
    handleOptimizeAll,
    optimizeSingleEvent: async (eventId: string) => {
        const token = await getAdminToken();
        const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-c4bb2206/optimize-event`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ eventId })
            }
        );
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    }
  };
};