import { useState, useRef, useEffect } from 'react';
import { enrichDescription } from '../../utils/enrich';
import { refineDescription } from '../../utils/refine';
import { WavEvent } from '../../types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useAdminAIChat = (
  events: WavEvent[], 
  updateEvent: (index: number, field: string, value: any) => void
) => {
  const [selectedAiEventIndex, setSelectedAiEventIndex] = useState<number | null>(null);
  const [aiDraft, setAiDraft] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [aiFormState, setAiFormState] = useState<Partial<WavEvent>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll chat
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleAiSelectEvent = (index: number) => {
    setSelectedAiEventIndex(index);
    // Initialize form state with current event data
    setAiFormState({ ...events[index] });
    // Set initial draft for context
    setAiDraft(events[index].description || "");
    
    setChatHistory([
      { role: 'assistant', content: `Hola. Estoy listo para optimizar el contenido de "${events[index].title}". ¿Qué necesitas mejorar?` }
    ]);
  };

  const handleSendMessage = async (overrideText?: string) => {
    const prompt = overrideText || chatInput;
    if (!prompt.trim() || selectedAiEventIndex === null) return;

    if (!overrideText) {
      setChatInput("");
    }
    
    setIsRefining(true);

    // Add User Message
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: prompt }];
    setChatHistory(newHistory);

    try {
      // Call AI Refiner
      const aiResult = await refineDescription(
        newHistory, 
        aiDraft, // Send current draft for context
        events[selectedAiEventIndex]
      );
      
      // Update draft state
      if (aiResult.draft) setAiDraft(aiResult.draft);
      
      // Prepare updated state with ALL new fields
      const updatedFormState = {
        ...aiFormState,
        // Core fields
        description: aiResult.draft || aiFormState.description,
        summary: aiResult.summary || aiFormState.summary,
        title: aiResult.title || aiFormState.title,
        slug: aiResult.slug || aiFormState.slug,
        
        // Content Editorial
        tone: aiResult.tone || aiFormState.tone,
        audience: aiResult.audience || aiFormState.audience,
        highlights: aiResult.highlights || aiFormState.highlights,
        
        // SEO & Metadata
        seo_title: aiResult.seo_title || aiFormState.seo_title,
        seo_description: aiResult.seo_description || aiFormState.seo_description,
        keywords: aiResult.keywords || aiFormState.keywords,
        hashtags: aiResult.hashtags || aiFormState.hashtags,
        tags: aiResult.tags || aiFormState.tags,
        
        // Social Media - Instagram
        instagram_hook: aiResult.instagram_hook || aiFormState.instagram_hook,
        instagram_body: aiResult.instagram_body || aiFormState.instagram_body,
        instagram_closing: aiResult.instagram_closing || aiFormState.instagram_closing,
        instagram_hashtags: aiResult.instagram_hashtags || aiFormState.instagram_hashtags,
        alt_instagram: aiResult.alt_instagram || aiFormState.alt_instagram,
        
        // Social Media - LinkedIn
        linkedin_post: aiResult.linkedin_post || aiFormState.linkedin_post,
        linkedin_article: aiResult.linkedin_article || aiFormState.linkedin_article,
        
        // A/B Testing
        alt_title_1: aiResult.alt_title_1 || aiFormState.alt_title_1,
        alt_title_2: aiResult.alt_title_2 || aiFormState.alt_title_2,
        alt_summary_1: aiResult.alt_summary_1 || aiFormState.alt_summary_1,
        alt_summary_2: aiResult.alt_summary_2 || aiFormState.alt_summary_2,
        
        // Performance
        kpis: aiResult.kpis || aiFormState.kpis,
      };

      // Update form state
      setAiFormState(updatedFormState);

      // AUTO-APPLY: Apply AI changes to the actual event immediately
      if (selectedAiEventIndex !== null) {
        console.log('[AI Auto-Apply] Applying changes to event index:', selectedAiEventIndex);
        
        // Handle special field mappings
        if (aiResult.draft) {
          updateEvent(selectedAiEventIndex, 'description', aiResult.draft);
        }

        // Apply all other fields
        Object.entries(aiResult).forEach(([field, value]) => {
          // Skip metadata fields and already-handled draft field
          if (field !== 'chat_response' && field !== 'draft' && value !== undefined && value !== null && value !== '') {
            // Arrays should be stored as arrays (the backend expects them as arrays)
            // The form inputs will handle the conversion to/from strings
            updateEvent(selectedAiEventIndex, field, value);
          }
        });
        
        console.log('[AI Auto-Apply] All changes applied successfully');
      }

      // Add AI Response (Chat bubble)
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: aiResult.chat_response || "He actualizado los campos con nuevas sugerencias. Revisa el formulario." 
      }]);

    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Lo siento, hubo un error al procesar tu solicitud." }]);
    } finally {
      setIsRefining(false);
    }
  };

  return {
    selectedAiEventIndex,
    setSelectedAiEventIndex,
    aiDraft,
    setAiDraft,
    aiFormState,
    setAiFormState,
    chatHistory,
    chatInput,
    setChatInput,
    isRefining,
    chatEndRef,
    handleAiSelectEvent,
    handleSendMessage
  };
};
