import { GoogleGenAI, ChatSession, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let aiInstance: GoogleGenAI | null = null;
let chatSession: ChatSession | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!aiInstance) {
    // Strictly following instruction: API key from process.env.API_KEY
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      throw new Error("API Key configuration error. Please ensure process.env.API_KEY is set.");
    }
    
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getAIInstance();
    const model = 'gemini-2.5-flash';
    
    chatSession = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for consistent adherence to banking protocols
      }
    });
  } catch (error) {
    console.error("Failed to initialize chat session:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new Error("Chat session could not be established.");
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
