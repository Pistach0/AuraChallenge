import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type Difficulty = "Fácil" | "Medio" | "Difícil";

export interface Challenge {
  title: string;
  clientProfile: string;
  environment: string;
  specificConstraints: string;
  technicalParameters: {
    clientType: string;
    maxArea: number;
    inhabitants: number;
    minRooms: number;
    typology: string;
    plotWidth: number;
    plotLength: number;
  };
  urbanRequirements: {
    distanceToBoundaries: string;
    maxFloors: number;
    maxOccupation: number;
  };
}

export async function generateChallenge(difficulty: Difficulty): Promise<Challenge> {
  const prompt = `Genera un desafío de diseño arquitectónico para una vivienda con nivel de dificultad: ${difficulty}.
  
  Reglas según dificultad:
  - Fácil: Programas sencillos en terrenos amplios.
  - Medio: Contextos urbanos estándar con restricciones moderadas.
  - Difícil: Terrenos complejos (pendientes, medianeras estrechas) y programas densos con normativas estrictas.
  
  Los requisitos urbanísticos (distancia a lindes, número de plantas máximas, ocupación máxima) deben adaptarse dinámicamente según la tipología (individual, pareada o en medianera).
  Por ejemplo, en medianera la distancia a lindes laterales suele ser 0m.
  
  Devuelve el resultado estrictamente en el formato JSON solicitado.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Un título creativo para el proyecto" },
          clientProfile: { type: Type.STRING, description: "Descripción detallada del perfil del cliente y su estilo de vida" },
          environment: { type: Type.STRING, description: "Descripción del entorno (urbano, rural, topografía, clima)" },
          specificConstraints: { type: Type.STRING, description: "Restricciones específicas o deseos especiales del cliente" },
          technicalParameters: {
            type: Type.OBJECT,
            properties: {
              clientType: { type: Type.STRING, description: "Resumen del tipo de cliente (ej. Familia joven de 4)" },
              maxArea: { type: Type.NUMBER, description: "Superficie máxima construida en m2" },
              inhabitants: { type: Type.NUMBER, description: "Número de habitantes" },
              minRooms: { type: Type.NUMBER, description: "Número de habitaciones mínimas requeridas" },
              typology: { type: Type.STRING, description: "Tipología: Individual, Pareada o En medianera" },
              plotWidth: { type: Type.NUMBER, description: "Ancho del terreno en metros" },
              plotLength: { type: Type.NUMBER, description: "Largo del terreno en metros" }
            },
            required: ["clientType", "maxArea", "inhabitants", "minRooms", "typology", "plotWidth", "plotLength"]
          },
          urbanRequirements: {
            type: Type.OBJECT,
            properties: {
              distanceToBoundaries: { type: Type.STRING, description: "Distancia a lindes (frontal, posterior, laterales)" },
              maxFloors: { type: Type.NUMBER, description: "Número máximo de plantas permitidas" },
              maxOccupation: { type: Type.NUMBER, description: "Porcentaje de ocupación máxima del terreno (ej. 40 para 40%)" }
            },
            required: ["distanceToBoundaries", "maxFloors", "maxOccupation"]
          }
        },
        required: ["title", "clientProfile", "environment", "specificConstraints", "technicalParameters", "urbanRequirements"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(text) as Challenge;
}
