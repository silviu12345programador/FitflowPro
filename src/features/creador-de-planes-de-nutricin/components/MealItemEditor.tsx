import { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

// --- Type Definitions ---

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface UnitOfMeasure {
  name: string; // e.g., 'g', 'oz', 'taza'
  grams: number; // Conversion factor to grams
}

export interface FoodItem {
  id: string;
  name: string;
  baseMacros: Macros; // Macros per 100g
  availableUnits: UnitOfMeasure[];
  selectedUnit: UnitOfMeasure;
  quantity: number;
}

interface MealItemEditorProps {
  item: FoodItem;
  onUpdate: (id: string, updatedData: Partial<Pick<FoodItem, 'quantity' | 'selectedUnit'>>) => void;
  onRemove: (id: string) => void;
}

// --- Component ---

export const MealItemEditor = ({ item, onUpdate, onRemove }: MealItemEditorProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [selectedUnit, setSelectedUnit] = useState(item.selectedUnit);

  // Update internal state if the parent's item prop changes
  useEffect(() => {
    setQuantity(item.quantity);
    setSelectedUnit(item.selectedUnit);
  }, [item.quantity, item.selectedUnit]);

  const handleQuantityChange = (newQuantity: number) => {
    const parsedQuantity = Math.max(0, newQuantity); // Ensure quantity is not negative
    setQuantity(parsedQuantity);
    onUpdate(item.id, { quantity: parsedQuantity, selectedUnit });
  };

  const handleUnitChange = (unitName: string) => {
    const newUnit = item.availableUnits.find(u => u.name === unitName);
    if (newUnit) {
      setSelectedUnit(newUnit);
      onUpdate(item.id, { quantity, selectedUnit: newUnit });
    }
  };

  const calculatedMacros = useMemo((): Macros => {
    const totalGrams = quantity * selectedUnit.grams;
    const factor = totalGrams / 100; // Base macros are per 100g
    return {
      calories: Math.round(item.baseMacros.calories * factor),
      protein: Math.round(item.baseMacros.protein * factor),
      carbs: Math.round(item.baseMacros.carbs * factor),
      fat: Math.round(item.baseMacros.fat * factor),
    };
  }, [quantity, selectedUnit, item.baseMacros]);

  return (
    <div className="flex items-center justify-between p-2 bg-surface rounded-lg my-1 shadow-md">
      {/* Food Name */}
      <div className="flex-1 min-w-0">
        <p className="text-text font-semibold truncate">{item.name}</p>
        <div className="flex items-center space-x-3 text-xs text-textMuted">
          <span>C: {calculatedMacros.calories}kcal</span>
          <span>P: {calculatedMacros.protein}g</span>
          <span>C: {calculatedMacros.carbs}g</span>
          <span>G: {calculatedMacros.fat}g</span>
        </div>
      </div>

      {/* Quantity & Unit Controls */}
      <div className="flex items-center gap-2 mx-4">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1.5 bg-backgroundSecondary rounded-full text-textMuted hover:bg-primary hover:text-text transition-colors"
          aria-label="Decrease quantity"
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || 0)}
          className="w-20 bg-backgroundSecondary text-text text-center rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Food quantity"
        />
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1.5 bg-backgroundSecondary rounded-full text-textMuted hover:bg-primary hover:text-text transition-colors"
          aria-label="Increase quantity"
        >
          <FaPlus />
        </button>
        
        {item.availableUnits.length > 1 ? (
          <select
            value={selectedUnit.name}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="bg-backgroundSecondary text-text rounded-md p-1 border-none focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select unit"
          >
            {item.availableUnits.map(unit => (
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            ))}
          </select>
        ) : (
          <span className="w-16 text-center text-textMuted">{selectedUnit.name}</span>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-error hover:text-errorDark transition-colors"
        aria-label="Remove food item"
      >
        <FaTrash size={16} />
      </button>
    </div>
  );
};

export default MealItemEditor;