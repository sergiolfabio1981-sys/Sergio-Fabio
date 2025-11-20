import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getClient = () => {
  let apiKey: string | undefined;
  
  try {
    // Attempt to read process.env.API_KEY safely
    apiKey = process.env.API_KEY;
  } catch (error) {
    // Ignore ReferenceError if process is not defined
  }

  // Use provided API Key if process.env is missing
  if (!apiKey) {
    apiKey = "AIzaSyCuNIDFrtz5UnWpUuimM6sWVJNLL-yVM-Q";
  }

  if (!apiKey) {
    console.error("API_KEY is missing");
    throw new Error("API_KEY is missing");
  }
  
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = () => {
  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Eres "Cami", la asistente virtual amigable y profesional de la agencia de viajes "ABRAS Travel", especializada en destinos de playa, especialmente Brasil.
        Tu objetivo es ayudar a los usuarios y RECOLECTAR la siguiente información para generar un lead de venta:
        1. Nombre completo.
        2. ¿A dónde desea viajar? (Destino).
        3. ¿En qué fechas?
        4. ¿Cuántas personas viajan?
        5. ¿Desde dónde viajan (origen)?
        6. ¿Ya conocen el lugar o es primera vez?
        7. Número de teléfono de contacto.
        
        Mantén un tono relajado, veraniego y servicial.
        No pidas todos los datos de golpe, ve conversando naturalmente.
        Si te preguntan sobre precios específicos, dales un rango general y anímalos a dejar sus datos para una cotización exacta.
        Al final, cuando tengas los datos, haz un resumen y confirma con el usuario.`,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat", error);
  }
};

export const sendMessageToGemini = async function* (message: string) {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    yield "Lo siento, el servicio de chat no está disponible en este momento (Falta API Key).";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
       yield chunk.text;
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "Lo siento, tuve un pequeño problema de conexión. ¿Podrías repetirme eso?";
    // Re-initialize just in case connection was lost
    chatSession = null;
  }
};