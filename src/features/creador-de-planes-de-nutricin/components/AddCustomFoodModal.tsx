import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';

interface AddCustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: any) => Promise<void>;
}

export const AddCustomFoodModal: React.FC<AddCustomFoodModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [foodData, setFoodData] = useState({
    name: '',
    unit: 'g',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const { name, calories, protein, carbs, fats } = foodData;
    const isValid =
      name.trim() !== '' &&
      calories.trim() !== '' &&
      protein.trim() !== '' &&
      carbs.trim() !== '' &&
      fats.trim() !== '';
    setIsFormValid(isValid);
  }, [foodData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFoodData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSaving) return;

    setIsSaving(true);
    try {
      await onSave({
        ...foodData,
        calories: parseFloat(foodData.calories),
        protein: parseFloat(foodData.protein),
        carbs: parseFloat(foodData.carbs),
        fats: parseFloat(foodData.fats),
      });
      handleClose();
    } catch (error) {
      console.error('Failed to save custom food:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setFoodData({
      name: '',
      unit: 'g',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-text mb-4">Añadir Alimento Personalizado</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Alimento"
              value={foodData.name}
              onChange={handleChange}
              className="bg-surface border border-border rounded p-2 text-text"
              required
            />
            <select
              name="unit"
              value={foodData.unit}
              onChange={handleChange}
              className="bg-surface border border-border rounded p-2 text-text"
            >
              <option value="g">Gramos (g)</option>
              <option value="ml">Mililitros (ml)</option>
              <option value="unit">Unidad</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="calories"
                placeholder="Calorías"
                value={foodData.calories}
                onChange={handleChange}
                className="bg-surface border border-border rounded p-2 text-text"
                required
              />
              <input
                type="number"
                name="protein"
                placeholder="Proteínas (g)"
                value={foodData.protein}
                onChange={handleChange}
                className="bg-surface border border-border rounded p-2 text-text"
                required
              />
              <input
                type="number"
                name="carbs"
                placeholder="Carbohidratos (g)"
                value={foodData.carbs}
                onChange={handleChange}
                className="bg-surface border border-border rounded p-2 text-text"
                required
              />
              <input
                type="number"
                name="fats"
                placeholder="Grasas (g)"
                value={foodData.fats}
                onChange={handleChange}
                className="bg-surface border border-border rounded p-2 text-text"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={handleClose} variant="secondary" disabled={isSaving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isFormValid || isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Alimento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};