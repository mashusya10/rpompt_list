import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function improvePrompt(simplePrompt: string, lang: string = 'ko') {
  if (!simplePrompt.trim()) return "";

  const systemInstruction = `
    You are an expert Prompt Engineer. Your task is to transform a simple, basic prompt into a high-performance, detailed, and structured "Mega Prompt".
    
    The output should follow this structure:
    1. Role: Define a clear persona.
    2. Task & Context: Explain exactly what needs to be done.
    3. Constraints & Style: Detail the tone, length, and technical requirements.
    4. Output Format: Specify how the answer should look (e.g., Markdown, Table, JSON).
    
    Current Language: ${lang === 'ko' ? 'Korean' : lang === 'ru' ? 'Russian' : 'English'}.
    The response MUST be written in ${lang === 'ko' ? 'Korean' : lang === 'ru' ? 'Russian' : 'English'}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Improve the following prompt: "${simplePrompt}"`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Failed to generate improved prompt.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Could not connect to Gemini API. Please check your key.";
  }
}
