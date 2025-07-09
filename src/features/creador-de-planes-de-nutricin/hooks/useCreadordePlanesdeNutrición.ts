import { useState, useCallback, useMemo } from 'react';
import { searchFoods, saveNutritionPlan } from '../api';
import debounce from 'lodash.debounce';
import { toast } from 'react-hot-toast';

// Ajustada para coincidir con MealItemEditor
interface FoodItem {
  id: string;
  name:string;
  baseMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  quantity: number;
  unit: string;
  availableUnits: string[];
  // Añadimos calories para el cálculo total, aunque no esté en el editor
  calories: number; 
}

interface NutritionPlan {
  id?: string; // Optional ID for existing plans
  name: string;
  foods: FoodItem[];
  goals: NutritionGoals;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const useCreadordePlanesdeNutricion = (
  initialPlan: NutritionPlan
) => {
  const [plan, setPlan] = useState<NutritionPlan>(initialPlan);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Debería tener un tipo más específico
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const addFoodToPlan = (food: any, quantity: number) => {
    // Lógica para adaptar el 'food' del search result al 'FoodItem' del plan
    const newFoodItem: FoodItem = {
      id: food.id,
      name: food.name,
      baseMacros: {
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      },
      quantity: quantity,
      unit: 'g', // Unidad por defecto
      availableUnits: ['g', 'oz', 'taza'], // Unidades de ejemplo
      calories: food.calories,
    };

    setPlan((prevPlan) => {
      const existingFood = prevPlan.foods.find((f) => f.id === newFoodItem.id);
      if (existingFood) {
        return {
          ...prevPlan,
          foods: prevPlan.foods.map((f) =>
            f.id === newFoodItem.id ? { ...f, quantity: f.quantity + quantity } : f
          ),
        };
      }
      return {
        ...prevPlan,
        foods: [...prevPlan.foods, newFoodItem],
      };
    });
    setHasChanges(true);
  };

  const removeFoodFromPlan = (foodId: string) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      foods: prevPlan.foods.filter((f) => f.id !== foodId),
    }));
    setHasChanges(true);
  };

  const updateFoodInPlan = (updatedFood: FoodItem) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      foods: prevPlan.foods.map((f) =>
        f.id === updatedFood.id ? updatedFood : f
      ),
    }));
    setHasChanges(true);
  };

  const handleTargetsChange = (newTargets: NutritionGoals) => {
    setPlan(prevPlan => ({ ...prevPlan, goals: newTargets }));
    setHasChanges(true);
  };

  const totals = useMemo(() => {
    // Lógica de cálculo de totales ajustada para usar baseMacros y factores de conversión si es necesario
    return plan.foods.reduce(
      (acc, food) => {
        // Simplificado: asume que la cantidad está en gramos y los macros son por 100g
        const quantityFactor = food.quantity / 100;
        acc.calories += food.calories * quantityFactor;
        acc.protein += food.baseMacros.protein * quantityFactor;
        acc.carbs += food.baseMacros.carbs * quantityFactor;
        acc.fat += food.baseMacros.fat * quantityFactor;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [plan]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length > 2) {
          setIsLoading(true);
          const results = await searchFoods(query);
          setSearchResults(results);
          setIsLoading(false);
        } else {
          setSearchResults([]);
        }
      }, 300),
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const handleSavePlan = async () => {
    setIsSaving(true);
    setHasChanges(false);
    toast.loading('Guardando el plan...');

    try {
      const result = await saveNutritionPlan(plan);
      toast.dismiss();
      toast.success('¡Plan guardado con éxito!');
      // Optionally update plan with ID from backend
      if (result.planId) {
        setPlan(prev => ({ ...prev, id: result.planId }));
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Error al guardar el plan. Por favor, inténtalo de nuevo.');
      setHasChanges(true); // Re-enable save button since save failed
    } finally {
      setIsSaving(false);
    }
  };

  return {
    plan,
    totals,
    goals: plan.goals,
    addFoodToPlan,
    removeFoodFromPlan,
    updateFoodInPlan,
    handleTargetsChange,
    searchQuery,
    searchResults,
    isLoading,
    handleSearch,
    isSaving,
    hasChanges,
    handleSavePlan,
  };
};

