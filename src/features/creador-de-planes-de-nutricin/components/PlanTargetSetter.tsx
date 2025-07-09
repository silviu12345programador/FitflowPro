
import React, { useState, useEffect } from 'react';
import { Button } from 'src/components/Button';

interface PlanTargetSetterProps {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onTargetsChange: (targets: { calories: number; protein: number; carbs: number; fat: number; }) => void;
}

export const PlanTargetSetter: React.FC<PlanTargetSetterProps> = ({ targets, onTargetsChange }) => {
  const [mode, setMode] = useState<'percentage' | 'grams'>('grams');
  const [calories, setCalories] = useState(targets.calories);
  const [protein, setProtein] = useState(targets.protein);
  const [carbs, setCarbs] = useState(targets.carbs);
  const [fat, setFat] = useState(targets.fat);

  useEffect(() => {
    onTargetsChange({ calories, protein, carbs, fat });
  }, [calories, protein, carbs, fat]);

  const handleModeChange = (newMode: 'percentage' | 'grams') => {
    if (mode === newMode) return;

    if (newMode === 'percentage') {
      // Convert grams to percentage
      const totalGrams = protein + carbs + fat;
      if (totalGrams > 0) {
        setProtein(Math.round((protein / totalGrams) * 100));
        setCarbs(Math.round((carbs / totalGrams) * 100));
        setFat(Math.round((fat / totalGrams) * 100));
      }
    } else {
      // Convert percentage to grams
      if (calories > 0) {
        setProtein(Math.round(((protein / 100) * calories) / 4));
        setCarbs(Math.round(((carbs / 100) * calories) / 4));
        setFat(Math.round(((fat / 100) * calories) / 9));
      }
    }
    setMode(newMode);
  };

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCalories = parseInt(e.target.value, 10);
    setCalories(isNaN(newCalories) ? 0 : newCalories);
  };

  const handleMacroChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {.
    const value = parseInt(e.target.value, 10);
    setter(isNaN(value) ? 0 : value);
  };
  
  const totalPercentage = protein + carbs + fat;

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold text-text">Definir Objetivos del Plan</h3>
      
      <div className="input-group flex items-center justify-between">
        <label htmlFor="calories" className="text-textSecondary">Calorías Totales</label>
        <input
          type="number"
          id="calories"
          value={calories}
          onChange={handleCaloriesChange}
          className="w-24 bg-surface text-text p-1 rounded"
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => handleModeChange('grams')} variant={mode === 'grams' ? 'primary' : 'secondary'}>Gramos</Button>
        <Button onClick={() => handleModeChange('percentage')} variant={mode === 'percentage' ? 'primary' : 'secondary'}>Porcentaje</Button>
</div>

      <div className="space-y-2">
        <div className="input-group flex items-center justify-between">
          <label htmlFor="protein" className="text-textSecondary">Proteína ({mode === 'grams' ? 'g' : '%'})</label>
          <input
            type="number"
            id="protein"
            value={protein}
            onChange={handleMacroChange(setProtein)}
            className="w-24 bg-surface text-text p-1 rounded"
          />
        </div>
        <div className="input-group flex items-center justify-between">
          <label htmlFor="carbs" className="text-textSecondary">Carbohidratos ({mode === 'grams' ? 'g' : '%'})</label>
          <input
            type="number"
            id="carbs"
            value={carbs}
            onChange={handleMacroChange(setCarbs)}
            className="w-24 bg-surface text-text p-1 rounded"
          />
        </div>
        <div className="input-group flex items-center justify-between">
          <label htmlFor="fat" className="text-textSecondary">Grasa ({mode === 'grams' ? 'g' : '%'})</label>
          <input
            type="number"
            id="fat"
            value={fat}
            onChange={handleMacroChange(setFat)}
            className="w-24 bg-surface text-text p-1 rounded"
          />
        </div>
      </div>
      
      {mode === 'percentage' && (
        <div className={`text-sm text-right ${totalPercentage !== 100 ? 'text-error' : 'text-success'}`}>
          Total: {totalPercentage}%
        </div>
      )}
    </div>
  );
};
