
import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    // Usamos la variable de entorno para la API Key
    // En Vercel, configura esta variable como 'API_KEY' en la sección Environment Variables
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.warn("API Key no encontrada en variables de entorno.");
        return;
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        // Configuramos filtros de seguridad permisivos para evitar bloqueos de contenido turístico
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ],
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
    yield "Error de configuración: Falta la API Key. Por favor contacta al administrador.";
    return;
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    for await (const chunk of result) {
       if (chunk.text) {
         yield chunk.text;
       }
    }
  } catch (error: any) {
    console.error("Error sending message to Gemini:", error);
    
    // Mensaje de error detallado para diagnosticar en producción
    let debugMessage = "¡Ups! Una ola interfirió en mi señal. ";
    
    if (error.toString().includes("403")) {
        debugMessage += "\n(Error 403: Acceso denegado. Revisa las restricciones de dominio de tu API Key en Google Cloud Console).";
    } else if (error.toString().includes("429")) {
        debugMessage += "\n(Error 429: Cuota de uso excedida).";
    } else if (error.message) {
        debugMessage += `\n(Detalle técnico: ${error.message})`;
    }

    yield debugMessage;
    
    // Reiniciamos la sesión por si hubo un error de contexto o expiración
    chatSession = null;
  }
};
