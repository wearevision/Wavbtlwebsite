import React, { useState, useEffect } from 'react';
import { getEvents, saveEvents, uploadFile } from '../../utils/api';
import { Loader2, Plus, Trash2, Upload, Save, ArrowLeft } from 'lucide-react';

interface EventData {
  brand: string;
  title: string;
  description: string;
  image: string; // Full URL (or signed URL)
  imagePath?: string; // Storage path
  logoUrl?: string; // Full URL
  logoPath?: string; // Storage path
  [key: string]: any;
}

export const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); // ID of item being uploaded

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (e) {
      console.error(e);
      alert("Error cargando datos");
    }
    setLoading(false);
  };

  // Simple Auth Gate
  if (!isAuthenticated) {
    return (
      <div className="bg-black flex flex-col gap-[24px] items-center justify-center relative h-screen w-full font-sans">
         {/* Heading Group */}
         <div className="flex flex-col gap-[8px] items-center">
            <h1 className="font-bold text-[24px] tracking-[1.2px] text-white">WAV CMS</h1>
            <p className="text-[14px] text-neutral-500">Acceso Restringido</p>
         </div>

         {/* Input Group */}
         <div className="flex gap-[8px] items-start w-[320px] h-[40px]">
            <div className="relative grow h-full bg-neutral-900 rounded-[6.8px] border border-neutral-800 overflow-hidden flex items-center px-[12px]">
              <input 
                type="password"
                className="bg-transparent border-none outline-none text-[14px] text-white placeholder-neutral-500 w-full h-full"
                placeholder="Contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (passwordInput === "Wav2025**" ? setIsAuthenticated(true) : alert("Contraseña incorrecta"))}
              />
            </div>
            <button 
              onClick={() => passwordInput === "Wav2025**" ? setIsAuthenticated(true) : alert("Contraseña incorrecta")}
              className="bg-white h-full rounded-[6.8px] px-[16px] text-[14px] font-medium text-black hover:bg-gray-200 transition-colors"
            >
              Entrar
            </button>
         </div>

         {/* Back Link */}
         <button onClick={onBack} className="text-[14px] text-neutral-500 underline hover:text-neutral-300 transition-colors">
           Volver al sitio
         </button>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveEvents(events);
      alert("Cambios guardados correctamente");
    } catch (e) {
      alert("Error al guardar cambios");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = async (index: number, field: 'image' | 'logo', file: File) => {
    setUploading(`${index}-${field}`);
    try {
      const result = await uploadFile(file);
      const newEvents = [...events];
      
      if (field === 'image') {
        newEvents[index].imagePath = result.path;
        newEvents[index].image = URL.createObjectURL(file);
      } else {
        newEvents[index].logoPath = result.path;
        newEvents[index].logoUrl = URL.createObjectURL(file);
      }
      
      setEvents(newEvents);
      alert("Archivo subido. Recuerda guardar.");
    } catch (e) {
      alert("Error subiendo archivo");
    } finally {
      setUploading(null);
    }
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([{
      brand: "Nueva Marca",
      title: "Nuevo Evento",
      description: "Descripción del evento...",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
    }, ...events]);
  };

  const removeEvent = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      const newEvents = [...events];
      newEvents.splice(index, 1);
      setEvents(newEvents);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="h-screen bg-neutral-950 text-white p-8 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between sticky top-0 bg-neutral-950/80 backdrop-blur-md py-4 z-10 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <button className="flex items-center text-neutral-400 hover:text-white transition-colors" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </button>
            <h1 className="text-3xl font-bold">CMS - Gestión de Contenidos</h1>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={addEvent}
               className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 border border-neutral-800 bg-transparent hover:bg-neutral-800 text-white"
             >
              <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
            </button>
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors h-9 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Guardar Cambios
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {events.map((event, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Image Column */}
                  <div className="md:col-span-3 space-y-4">
                    <div className="aspect-[3/4] relative rounded-md overflow-hidden bg-neutral-800 group">
                      <img src={event.image} alt="Preview" className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                          <Upload className="h-5 w-5" />
                          <input 
                            type="file" 
                            accept="image/*,video/mp4,image/gif" 
                            className="hidden" 
                            onChange={(e) => e.target.files?.[0] && handleFileChange(i, 'image', e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="text-xs text-center text-neutral-500">
                      {uploading === `${i}-image` ? "Subiendo..." : "Imagen Principal (GIF/JPG)"}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="md:col-span-9 space-y-4">
                     <div className="flex justify-between items-start">
                       <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-neutral-400">Marca</label>
                           <input 
                             value={event.brand} 
                             onChange={(e) => updateEvent(i, 'brand', e.target.value)}
                             className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-medium text-neutral-400">Logo URL (Opcional)</label>
                            <div className="flex gap-2">
                              <input 
                                value={event.logoUrl || ''} 
                                disabled
                                placeholder="Sube un logo ->"
                                className="flex h-9 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-neutral-400 disabled:cursor-not-allowed"
                              />
                               <label className="cursor-pointer p-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 flex items-center justify-center shrink-0">
                                <Upload className="h-4 w-4" />
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => e.target.files?.[0] && handleFileChange(i, 'logo', e.target.files[0])}
                                />
                              </label>
                            </div>
                         </div>
                       </div>
                       <button 
                         className="inline-flex items-center justify-center rounded-md h-9 w-9 text-red-500 hover:text-red-400 hover:bg-red-950/50 ml-2" 
                         onClick={() => removeEvent(i)}
                       >
                         <Trash2 className="h-5 w-5" />
                       </button>
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs font-medium text-neutral-400">Título</label>
                       <input 
                         value={event.title} 
                         onChange={(e) => updateEvent(i, 'title', e.target.value)}
                         className="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-lg font-bold text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                       />
                     </div>

                     <div className="space-y-2">
                       <label className="text-xs font-medium text-neutral-400">Descripción</label>
                       <textarea 
                         value={event.description} 
                         onChange={(e) => updateEvent(i, 'description', e.target.value)}
                         className="flex min-h-[100px] w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                       />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
