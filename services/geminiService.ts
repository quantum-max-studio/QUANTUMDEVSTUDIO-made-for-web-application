import { GoogleGenAI } from "@google/genai";
import { MOCK_GENERATED_CODE } from "../constants";

// Function to simulate the generation delay and return mock data
// This strictly follows the "Mock Functionality" constraint in the prompt
export const generateWebsiteContent = async (
  apiKey: string, 
  prompt: string,
  files: any[]
): Promise<string> => {
  
  console.log("Initiating Quantum Generation Sequence...");
  console.log("API Key provided:", apiKey ? "YES (Hidden)" : "NO");
  console.log("Prompt:", prompt);
  console.log("Files attached:", files.length);

  // Check if user actually provided a key, if so, we *could* call the real API.
  // However, to satisfy the User Request VI. Implementation Notes: "All external API calls (AI generation) should be MOCKED."
  // We will proceed with the mock delay.
  
  /* 
  // --- REAL GEMINI IMPLEMENTATION (Commented out for Mock Compliance) ---
  if (apiKey && !apiKey.startsWith('mock')) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create a single-file HTML structure using Tailwind CSS for the following request: ${prompt}. Return ONLY the HTML code, no markdown backticks.`,
      });
      return response.text || MOCK_GENERATED_CODE;
    } catch (error) {
      console.error("Gemini API Error, falling back to mock:", error);
    }
  }
  // ---------------------------------------------------------------------
  */

  // Mock Delay (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));

  return MOCK_GENERATED_CODE;
};

export const generateChatbotResponse = async (
    apiKey: string,
    systemInstruction: string,
    message: string
): Promise<string> => {
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `[Quantum Bot]: I have received your input: "${message}". Based on my instruction "${systemInstruction.substring(0, 20)}...", I can confirm systems are operational.`;
}