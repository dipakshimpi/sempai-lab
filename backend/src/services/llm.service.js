import { Groq } from "groq-sdk";

export const generateResponse = async (text) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant. Keep your answers extremely short (under 10 words) to save API credits." 
        },
        { role: "user", content: text }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error("❌ LLM Error:", error.message);
    throw error;
  }
};