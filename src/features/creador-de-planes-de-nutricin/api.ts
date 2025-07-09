interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
  
  export const searchFoods = async (query: string): Promise<Food[]> => {
    console.log(`Searching for: ${query}`);
    // Mock API call
    const mockFoods: Food[] = [
        { id: '1', name: 'Pollo', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { id: '2', name: 'Arroz', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        { id: '3', name: 'Brócoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
        { id: '4', name: 'Salmón', calories: 208, protein: 20, carbs: 0, fat: 13 },
        { id: '5', name: 'Lentejas', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    ];
  
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFoods.filter(food => food.name.toLowerCase().includes(query.toLowerCase())));
      }, 500);
    });
  };
  
  export const addCustomFood = async (food: Omit<Food, 'id'>): Promise<Food> => {
    console.log('Adding custom food:', food);
    // Mock API call
    const newFood: Food = {
      id: new Date().getTime().toString(),
      ...food,
    };
  
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(newFood);
      }, 500);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const saveNutritionPlan = async (plan: any): Promise<any> => {
    console.log('Saving nutrition plan:', plan);
    // Mock API call
    // In a real app, this would be a POST or PUT request to your backend
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Plan saved successfully');
        resolve({ status: 'success', planId: 'plan-123' });
      }, 1500); // Simulate network delay
    });
  };
