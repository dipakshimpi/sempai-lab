import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_llm_response(user_text: str):
    """Generates ultra-short responses for fast TTS playback."""
    try:
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system", 
                    "content": (
                        "You are a helpful voice assistant. "
                        "Keep your responses extremely short, concise, and conversational. "
                        "Respond in 1 or 2 sentences maximum. "
                        "Do not use bullet points or lists. "
                        "Speak directly to the user."
                    )
                },
                {"role": "user", "content": user_text}
            ],
            model="llama-3.1-8b-instant",
            # Reduced tokens means the model stops sooner and runs faster
            max_tokens=100, 
            temperature=0.5
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"❌ LLM Error: {e}")
        return "I'm sorry, I couldn't process that."