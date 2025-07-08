import { ProgressData } from "./components/ProgressMetricsChart";

// Mock function to simulate fetching progress data for a client
export const getProgressHistory = async (clientId: string): Promise<ProgressData[]> => {
  console.log(`Fetching progress for client: ${clientId}`);
  
  // Generating more realistic mock data
  const generateMetricData = (metric: 'peso' | '% grasa corporal' | 'masa muscular', initialValue: number, fluctuation: number, months: number) => {
    const data: ProgressData[] = [];
    let currentValue = initialValue;
    for (let i = months * 4; i >= 0; i--) { // Weekly data for the last few months
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      
      // Introduce some noise and a general trend
      const randomFactor = (Math.random() - 0.4) * fluctuation;
      const trend = -i * (fluctuation / (months * 10)); // Gentle downward trend for weight/fat, upward for muscle
      
      if (metric === 'masa muscular') {
        currentValue += randomFactor - trend;
      } else {
        currentValue += randomFactor + trend;
      }

      data.push({
        date: date.toISOString().split('T')[0], // "YYYY-MM-DD"
        metric,
        value: parseFloat(currentValue.toFixed(2)),
      });
    }
    return data;
  }

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    ...generateMetricData('peso', 85, 0.5, 6), // 6 months of weight data
    ...generateMetricData('% grasa corporal', 22, 0.3, 6),
    ...generateMetricData('masa muscular', 65, 0.2, 6),
  ];
};

export const getNutritionPlan = async (clientId: string) => {
    console.log(`Fetching nutrition plan for client: ${clientId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      calories: 2500,
      protein: 180,
      carbs: 300,
      fats: 70,
      meals: [
        { name: 'Desayuno', description: 'Avena con frutas y nueces' },
        { name: 'Almuerzo', description: 'Pollo a la plancha con arroz y brócoli' },
        { name: 'Cena', description: 'Salmón al horno con ensalada' },
      ],
    };
  };
  
  export const getPrivateNotes = async (clientId: string) => {
    console.log(`Fetching private notes for client: ${clientId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      notes: `El cliente ${clientId} tiene una lesión en la rodilla izquierda. Evitar sentadillas profundas. Se siente motivado esta semana.`,
    };
  };
  
  export const savePrivateNotes = async (clientId: string, notes: string) => {
    console.log(`Saving private notes for client: ${clientId}`, notes);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };
  
  export const logProgress = async (clientId: string, progress: Omit<ProgressData, 'date'>) => {
    console.log(`Logging progress for client: ${clientId}`, progress);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, newEntry: { ...progress, date: new Date().toISOString().split('T')[0] } };
  };
