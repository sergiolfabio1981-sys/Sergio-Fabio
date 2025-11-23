import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    // Usamos la API Key proporcionada directamente para asegurar la conexión
    const apiKey = "AIzaSyCuNIDFrtz5UnWpUuimM6sWVJNLL-yVM-Q";
    
    const ai = new GoogleGenAI({ apiKey });
    
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
    yield "Lo siento, estoy teniendo dificultades para conectar con la central. Por favor, intenta de nuevo en unos segundos o contáctanos por WhatsApp.";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
       if (chunk.text) {
         yield chunk.text;
       }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "¡Ups! Una ola interfirió en mi señal. ¿Podrías repetirme eso, por favor?";
    // Reiniciamos la sesión por si hubo un error de contexto o expiración
    chatSession = null;
  }
};