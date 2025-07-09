import React from 'react';
import Button from '../../../components/Button';

interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodSearchEngineProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  searchResults: Food[];
  isLoading: boolean;
  addFoodToPlan: (food: Food, quantity: number) => void;
}

const FoodSearchEngine: React.FC<FoodSearchEngineProps> = ({
  searchQuery,
  handleSearch,
  searchResults,
  isLoading,
  addFoodToPlan,
}) => {
  return (
    <div className="p-4 bg-backgroundSecondary rounded-lg">
      <input
        type="text"
        placeholder="Buscar alimentos..."
        className="w-full p-2 bg-surface text-text border-border rounded-lg focus:ring-primary focus:border-primary"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="mt-4">
        {isLoading && <p className="text-textMuted">Buscando...</p>}
        {!isLoading && searchResults.length === 0 && searchQuery.length > 2 && (
          <p className="text-textMuted">No se encontraron alimentos</p>
        )}
        <ul className="space-y-2">
          {searchResults.map((food) => (
            <li
              key={food.id}
              className="flex justify-between items-center p-2 bg-surface rounded-lg"
            >
              <div>
                <p className="font-bold text-text">{food.name}</p>
                <p className="text-sm text-textMuted">
                  {food.calories} kcal, {food.protein}g P, {food.carbs}g C,{' '}
                  {food.fat}g F por 100g
                </p>
              </div>
              <Button onClick={() => addFoodToPlan(food, 100)}>Añadir</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodSearchEngine;
