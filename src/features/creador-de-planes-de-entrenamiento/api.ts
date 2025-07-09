export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  thumbnailUrl?: string;
}

export interface NewExercise {
  name: string;
  description: string;
  muscle_group: string;
  video_url: string | null;
}

// Creador de Planes de Entrenamiento API functions
export const workoutBuilderApi = {
  getExercises: async (): Promise<Exercise[]> => {
    // For now, returning mock data as the API endpoint is not real
    return Promise.resolve([
      { id: 'ex1', name: 'Press de Banca', muscleGroup: 'Pecho' },
      { id: 'ex2', name: 'Sentadillas', muscleGroup: 'Piernas' },
      { id: 'ex3', name: 'Peso Muerto', muscleGroup: 'Espalda' },
      { id: 'ex4', name: 'Press Militar', muscleGroup: 'Hombros' },
      { id: 'ex5', name: 'Curl de Biceps', muscleGroup: 'Brazos' },
      { id: 'ex6', name: 'Extensiones de Triceps', muscleGroup: 'Brazos' },
    ]);
  },
  
  getWorkoutPlans: async () => {
    // TODO: Implement API call
    return [];
  },
  
  createWorkoutPlan: async (planData: any) => {
    // TODO: Implement API call
    return {};
  },
  
  updateWorkoutPlan: async (id: string, planData: any) => {
    // TODO: Implement API call
    return {};
  },
  
  deleteWorkoutPlan: async (id: string) => {
    // TODO: Implement API call
    return {};
  },

  assignPlanToClients: async (planData: any, clientIds: string[]) => {
    // TODO: Implement API call
    console.log('Assigning plan to clients:', { planData, clientIds });
    return Promise.resolve({ success: true });
  }
};

export const createExercise = async (exerciseData: NewExercise): Promise<any> => {
  // This is a mock implementation.
  // In a real application, you would make a POST request to your API endpoint.
  console.log('Creating new exercise:', exerciseData);
  // Simulate an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const newExercise = {
        id: `ex${Math.floor(Math.random() * 1000)}`,
        ...exerciseData,
        muscleGroup: exerciseData.muscle_group, // Adjusting property name for consistency
      };
      resolve(newExercise);
    }, 500);
  });
};