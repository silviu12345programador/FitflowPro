
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ExerciseLibraryPanel } from './ExerciseLibraryPanel'; 

interface AlternativeExercisePickerProps {
  onClose: () => void;
  onSelectExercise: (exerciseId: string) => void;
  // Assuming Exercise type is defined elsewhere and imported
  // currentExercise: Exercise; 
}

export const AlternativeExercisePicker: React.FC<AlternativeExercisePickerProps> = ({ onClose, onSelectExercise }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // This would come from a global state or be passed as a prop
  const exercises = [
    { id: 'ex1', name: 'Push Up' },
    { id: 'ex2', name: 'Pull Up' },
    { id: 'ex3', name: 'Squat' },
    { id: 'ex4', name: 'Bench Press' },
    { id: 'ex5', name: 'Deadlift' },
  ];

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (exerciseId: string) => {
    onSelectExercise(exerciseId);
    onClose(); 
  };

  return (
    <div className="absolute z-10 w-80 bg-surface shadow-lg rounded-md border border-border right-0 mt-2">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text">Añadir Alternativa</h3>
          <button onClick={onClose} className="text-textMuted hover:text-text">
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar ejercicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="max-h-60 overflow-y-auto">
          {/* Using a simplified list for now. This should be replaced by ExerciseLibraryPanel */}
          {filteredExercises.length > 0 ? (
            <ul>
              {filteredExercises.map(ex => (
                <li 
                  key={ex.id} 
                  onClick={() => handleSelect(ex.id)}
                  className="p-2 hover:bg-backgroundSecondary rounded-md cursor-pointer text-textSecondary"
                >
                  {ex.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-textMuted text-center">No se encontraron ejercicios.</p>
          )}
        </div>
      </div>
    </div>
  );
};
