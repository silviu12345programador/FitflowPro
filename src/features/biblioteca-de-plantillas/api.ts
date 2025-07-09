// En un futuro, este archivo contendrá las llamadas a la API real.

import { Template } from "./hooks/useBibliotecadePlantillas";

// Tipos de datos de ejemplo para la plantilla
interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    rest: string;
  }
  
  interface WorkoutTemplate {
    id: string;
    type: 'workout';
    name: string;
    description: string;
    estimatedDuration: string;
    exercises: Exercise[];
  }
  
  interface NutritionTemplate {
    id: string;
    type: 'nutrition';
    name: string;
    description: string;
    totalCalories: number;
    macronutrients: {
      protein: number;
      carbs: number;
      fat: number;
    };
  }
  
type TemplateData = WorkoutTemplate | NutritionTemplate;
  

/**
 * Simula una llamada a la API para obtener los detalles de una plantilla.
 * @param templateId El ID de la plantilla a obtener.
 * @returns Una promesa que se resuelve con los datos de la plantilla.
 */
export const getTemplateDetails = async (templateId: string): Promise<TemplateData> => {
  console.log(`Fetching details for template ${templateId}...`);

  // Simular un retardo de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Datos de ejemplo. En una aplicación real, esto vendría de un backend.
  const mockWorkoutTemplate: WorkoutTemplate = {
    id: 'workout-1',
    type: 'workout',
    name: 'Rutina de Fuerza - Pecho y Tríceps',
    description: 'Una rutina enfocada en ganar fuerza y volumen en el tren superior.',
    estimatedDuration: '75 minutos',
    exercises: [
      { id: 'ex1', name: 'Press de Banca Plano', sets: 4, reps: '6-8', rest: '90s' },
      { id: 'ex2', name: 'Press Inclinado con Mancuernas', sets: 3, reps: '8-10', rest: '60s' },
      { id: 'ex3', name: 'Fondos en paralelas', sets: 3, reps: 'Al fallo', rest: '90s' },
      { id: 'ex4', name: 'Press Francés', sets: 3, reps: '10-12', rest: '60s' },
      { id: 'ex5', name: 'Extensiones de Tríceps en Polea', sets: 4, reps: '12-15', rest: '45s' },
    ],
  };

  const mockNutritionTemplate: NutritionTemplate = {
    id: 'nutrition-1',
    type: 'nutrition',
    name: 'Plan de Volumen Limpio',
    description: 'Dieta hipercalórica para ganancia muscular minimizando la grasa.',
    totalCalories: 3200,
    macronutrients: {
      protein: 200,
      carbs: 400,
      fat: 89,
    },
  };

  // Devolver la plantilla correspondiente según el ID (lógica de ejemplo)
  if (templateId.startsWith('workout')) {
    return mockWorkoutTemplate;
  } else if (templateId.startsWith('nutrition')) {
    return mockNutritionTemplate;
  }

  // Devolver una por defecto si no se encuentra
  return { ...mockWorkoutTemplate, id: templateId };
};

/**
 * Simula una llamada a la API para duplicar una plantilla.
 * @param templateId El ID de la plantilla a duplicar.
 * @param newName El nuevo nombre para la plantilla duplicada.
 * @returns Una promesa que se resuelve con la nueva plantilla creada.
 */
export const duplicateTemplateApi = async (templateId: string, newName: string): Promise<Template> => {
  console.log(`Duplicating template ${templateId} with new name: ${newName}`);
  
  // Simular un retardo de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Lógica de ejemplo para crear la nueva plantilla
  const newTemplate: Template = {
    id: `template-${Date.now()}`, // ID único
    name: newName,
    type: Math.random() > 0.5 ? 'Entrenamiento' : 'Nutrición', // Tipo aleatorio para el ejemplo
    description: `Copia de la plantilla ${templateId}`,
    tags: ['Copia'],
  };

  console.log("New template created:", newTemplate);
  return newTemplate;
};

/**
 * Simula una llamada a la API para actualizar los metadatos de una plantilla.
 * @param templateId El ID de la plantilla a actualizar.
 * @param metadata Los nuevos metadatos para la plantilla.
 * @returns Una promesa que se resuelve con la plantilla actualizada.
 */
export const updateTemplateMetadata = async (templateId: string, metadata: { name: string; tags: string[]; description?: string }): Promise<Template> => {
  console.log(`Updating metadata for template ${templateId}...`, metadata);

  // Simular un retardo de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // En una aplicación real, se haría una petición PUT/PATCH a la API.
  // Aquí, simplemente devolvemos los datos actualizados como si la API hubiera respondido correctamente.
  const updatedTemplate: Template = {
    id: templateId,
    name: metadata.name,
    type: Math.random() > 0.5 ? 'Entrenamiento' : 'Nutrición', // Se mantiene el tipo original
    description: metadata.description || `Descripción para ${metadata.name}`,
    tags: metadata.tags,
  };

  console.log("Template updated successfully:", updatedTemplate);
  return updatedTemplate;
};

/**
 * Simula una llamada a la API para obtener las analíticas de una plantilla.
 * @param templateId El ID de la plantilla para obtener analíticas.
 * @returns Una promesa que se resuelve con los datos de analíticas.
 */
export const getTemplateAnalytics = async (templateId: string) => {
  console.log(`Fetching analytics for template ${templateId}...`);

  // Simular un retardo de red
  await new Promise(resolve => setTimeout(resolve, 800));

  // Datos de ejemplo. En una aplicación real, esto vendría de un backend.
  const analyticsData = {
    templateId,
    adherenceRate: Math.floor(Math.random() * (95 - 60 + 1)) + 60, // Random entre 60 y 95
    avgProgress: Math.floor(Math.random() * (80 - 50 + 1)) + 50, // Random entre 50 y 80
    popularity: [
      { name: 'Ene', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    ],
    totalAssignments: Math.floor(Math.random() * 200),
    completionRate: Math.floor(Math.random() * (90 - 70 + 1)) + 70,
  };

  console.log("Analytics data fetched:", analyticsData);
  return analyticsData;
};

export const saveWorkoutTemplate = async (templateData: any) => {
    console.log("Saving workout template:", templateData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Template saved successfully" };
};
