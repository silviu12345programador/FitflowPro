import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import FoodSearchEngine from './components/FoodSearchEngine';
import MacroSummaryHeader from './components/MacroSummaryHeader';
import { useCreadordePlanesdeNutricion } from './hooks/useCreadordePlanesdeNutrición';
import { AddCustomFoodModal } from './components/AddCustomFoodModal';
import { Button } from '../../components/Button';
import { addCustomFood } from './api';
import MealItemEditor from './components/MealItemEditor';
import { PlanTargetSetter } from './components/PlanTargetSetter';
import { PlanActionsToolbar } from './components/PlanActionsToolbar';
import PlanSummaryView from './components/PlanSummaryView';

const CreadordePlanesdeNutriciónPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const initialPlan = {
    name: 'Nuevo Plan de Nutrición',
    foods: [],
    goals: {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 60,
    },
  };

  const {
    plan,
    totals,
    goals,
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
  } = useCreadordePlanesdeNutricion(initialPlan);

  const handleSaveCustomFood = async (foodData: any) => {
    try {
      const newFood = await addCustomFood(foodData);
      // Optionally, refresh the search or add the food directly to the plan
      console.log('Custom food added:', newFood);
    } catch (error) {
      console.error('Failed to save custom food:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-text">
      <Toaster position="bottom-center" />
      <MacroSummaryHeader totals={totals} goals={goals} />
      <div className="p-6 flex-grow overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Creador de Planes de Nutrición</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Plan Actual</h2>
            <div className="space-y-2">
              {plan.foods.map((food) => (
                <MealItemEditor
                  key={food.id}
                  item={food}
                  onUpdate={updateFoodInPlan}
                  onDelete={removeFoodFromPlan}
                />
              ))}
              {plan.foods.length === 0 && (
                <p className="text-textMuted">Aún no has añadido ningún alimento al plan.</p>
              )}
            </div>
          </div>
          <div>
            <PlanTargetSetter targets={goals} onTargetsChange={handleTargetsChange} />
            <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Búsqueda de Alimentos</h2>
                    <Button onClick={() => setIsModalOpen(true)}>
                        Añadir Personalizado
                    </Button>
                </div>
                <FoodSearchEngine
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                isLoading={isLoading}
                addFoodToPlan={addFoodToPlan}
                />
            </div>
          </div>
        </div>
      </div>
      <PlanActionsToolbar 
        onSave={handleSavePlan}
        isSaving={isSaving}
        hasChanges={hasChanges}
        onShowSummary={() => setIsSummaryOpen(true)}
      />
      <AddCustomFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomFood}
      />
      {isSummaryOpen && <PlanSummaryView onClose={() => setIsSummaryOpen(false)} />}
    </div>
  );
};

export default CreadordePlanesdeNutriciónPage;
