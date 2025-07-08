import React from 'react';

// Define the type for the nutrition plan prop
interface NutritionPlan {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionPlanSummaryProps {
  activeNutritionPlan: NutritionPlan | null;
}

const NutritionPlanSummary: React.FC<NutritionPlanSummaryProps> = ({ activeNutritionPlan }) => {
  if (!activeNutritionPlan) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Plan de Nutrición Activo</h3>
        <p>No hay un plan de nutrición activo asignado.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Asignar Plan
        </button>
      </div>
    );
  }

  const { name, calories, protein, carbs, fats } = activeNutritionPlan;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Plan de Nutrición: {name}</h3>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
          Ver/Cambiar Plan
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-600">Calorías</p>
          <p className="text-2xl font-bold text-blue-600">{calories} kcal</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-600">Proteínas</p>
          <p className="text-2xl font-bold text-green-600">{protein} g</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-600">Carbohidratos</p>
          <p className="text-2xl font-bold text-orange-600">{carbs} g</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-600">Grasas</p>
          <p className="text-2xl font-bold text-red-600">{fats} g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanSummary;
