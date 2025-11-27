import { useState, useRef, useEffect } from 'react';
import { enrichDescription } from '../../utils/enrich';
import { refineDescription } from '../../utils/refine';
import { WavEvent } from '../../types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const useAdminAIChat = (events: WavEvent[]) => {
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
      { role: 'assistant', text: `Hola. Estoy listo para optimizar el contenido de "${events[index].title}". ¿Qué necesitas mejorar?` }
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
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', text: prompt }];
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
      
      // Merge AI result into form state
      setAiFormState(prev => ({
        ...prev,
        description: aiResult.draft || prev.description,
        summary: aiResult.summary || prev.summary,
        title: aiResult.title || prev.title,
        slug: aiResult.slug || prev.slug,
        highlights: aiResult.highlights || prev.highlights,
        keywords: aiResult.keywords || prev.keywords,
        hashtags: aiResult.hashtags || prev.hashtags,
        instagram_hook: aiResult.instagram_hook || prev.instagram_hook,
        instagram_body: aiResult.instagram_body || prev.instagram_body,
        instagram_closing: aiResult.instagram_closing || prev.instagram_closing,
        instagram_hashtags: aiResult.instagram_hashtags || prev.instagram_hashtags,
        linkedin_post: aiResult.linkedin_post || prev.linkedin_post,
        linkedin_article: aiResult.linkedin_article || prev.linkedin_article,
        alt_title_1: aiResult.alt_title_1 || prev.alt_title_1,
        alt_title_2: aiResult.alt_title_2 || prev.alt_title_2,
        alt_instagram: aiResult.alt_instagram || prev.alt_instagram,
      }));

      // Add AI Response (Chat bubble)
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        text: aiResult.chat_response || "He actualizado los campos con nuevas sugerencias. Revisa el formulario." 
      }]);

    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'assistant', text: "Lo siento, hubo un error al procesar tu solicitud." }]);
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
