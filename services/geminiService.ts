
import { GoogleGenAI } from "@google/genai";
import { resumeData } from "../data/resumeData";

export class CareerAgentService {
  private getAI() {
    // Ensuring the API key is retrieved from the environment as required
    const apiKey = (process.env.API_KEY as string);
    if (!apiKey) {
      console.warn("API Key is missing in CareerAgentService");
    }
    return new GoogleGenAI({ apiKey });
  }

  async askAgent(question: string): Promise<string> {
    const ai = this.getAI();
    const systemInstruction = `
      You are "Swapnil's Career Agent", an AI assistant representing Swapnil Yelkar, a Senior UI Architect and Technical Lead.
      CONTEXT: ${JSON.stringify(resumeData)}

      GOALS:
      1. Answer professional questions about Swapnil's experience, skills (Angular, React, Nx, Micro-frontends, Node.js, Python, Java), and projects.
      2. Keep responses structured, professional, and highlight his architectural mindset.
      3. Use "Swapnil" or "He" to refer to the candidate.
      4. If asked something outside his professional scope, stay polite and refocus on his tech background.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      return response.text || "I couldn't generate a response. Please try asking about my Micro-frontend experience!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "The connection to Swapnil's Career Agent was interrupted. Please check your network.";
    }
  }

  async *askAgentStream(question: string) {
    const ai = this.getAI();
    const systemInstruction = `
      You are "Swapnil's Career Agent". 
      Context: ${JSON.stringify(resumeData)}
      Objective: Professional, architect-level responses. Highlight his 14 years of experience and impact at Roche and BMC Software.
      Skills Knowledge: Swapnil is proficient in Frontend (React, Angular), UI Architecture (Micro-frontends, Module Federation, Nx), and Backend (Node.js, Python, Java).
    `;

    try {
      const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      for await (const chunk of response) {
        yield chunk.text || "";
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      yield "Communication link unstable. Please retry.";
    }
  }
}

export const agentService = new CareerAgentService();
