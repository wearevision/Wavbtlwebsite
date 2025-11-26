
// Define minimal types locally to avoid import path issues in Edge Functions
interface WavEvent {
  title: string;
  brand: string;
  description: string;
  [key: string]: any;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

export async function generateRefinement(
  messages: any[],
  currentDraft: string,
  event: WavEvent
) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  // Construct the System Prompt
  const systemPrompt = `
You are the Senior Creative Copywriter and Strategist for WAV BTL, a high-end experiential marketing agency.
Your task is to refine event descriptions based on user feedback.

**Tone & Style:**
- Professional, Corporate, High-Impact.
- Use specific BTL (Below The Line) terminology: "Brand Experience", "Engagement", "Inmersive Activation", "Touchpoints", "KPIs", "ROI", "Audiovisual Synthesis", "Ephemeral Architecture".
- Focus on the *experience*, the *technology*, and the *strategic value* for the brand.
- NEVER mention that you are an AI. Speak as a senior creative director.

**Context:**
- Event Title: ${event.title}
- Brand: ${event.brand}
- Original Description Context: ${event.description}

**Instructions:**
1. Analyze the User's Request in the context of the Conversation History.
2. Modify the "Current Draft" to satisfy the request.
3. Ensure the new draft is factual based on the provided info (do not hallucinate wild details unless asked to "be creative").
4. Return the result in JSON format with two fields:
   - "draft": The complete, rewritten text.
   - "response": A short, professional conversational reply to the user (e.g., "Certainly, I've shortened the text while keeping the core tech details.").
`;

  // Construct the messages payload
  const apiMessages = [
    { role: "system", content: systemPrompt },
    { role: "assistant", content: `Current Draft:\n${currentDraft}` },
    ...messages.map(m => ({ role: m.role, content: m.text || m.content }))
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // Fast and capable
      messages: apiMessages,
      response_format: { type: "json_object" }, // Force JSON output
      temperature: 0.7
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("OpenAI Error:", err);
    throw new Error(`OpenAI API Error: ${res.status}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse AI response:", content);
    return { 
      draft: currentDraft, 
      response: "I processed your request but encountered a formatting error. Please try again." 
    };
  }
}
