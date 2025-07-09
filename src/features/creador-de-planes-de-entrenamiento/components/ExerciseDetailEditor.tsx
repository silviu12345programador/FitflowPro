
import React, { useState } from 'react';
import { Exercise } from '../hooks/useCreadordePlanesdeEntrenamiento';
import { AlternativeExercisePicker } from './AlternativeExercisePicker';
import { PlusCircle, X, BarChart, AlertTriangle, Copy } from 'lucide-react';
import ProgressiveOverloadModal from './ProgressiveOverloadModal';

type ProgressionRule = {
  type: 'weight' | 'reps';
  value: number;
  frequency: 'weekly' | 'biweekly';
};

interface ExerciseDetailEditorProps {
  exercise: Exercise;
  onUpdate: (updatedExercise: Exercise) => void;
  onDelete: (exerciseId: string) => void;
  dayIndex: number;
  exerciseIndex: number;
  isLastDay: boolean;
  copyExerciseToNextDay: (dayIndex: number, exerciseIndex: number) => void;
}

const MIN_REST_SECONDS = 30;
const MAX_REST_SECONDS = 300;

const ExerciseDetailEditor: React.FC<ExerciseDetailEditorProps> = ({ 
  exercise, 
  onUpdate, 
  onDelete,
  dayIndex,
  exerciseIndex,
  isLastDay,
  copyExerciseToNextDay
 }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isProgressiveOverloadModalOpen, setIsProgressiveOverloadModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...exercise,
      [name]: name === 'series' || name === 'peso' || name === 'descanso' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSelectAlternative = (alternativeId: string) => {
    const updatedAlternatives = [...(exercise.alternativeExercises || []), alternativeId];
    onUpdate({ ...exercise, alternativeExercises: updatedAlternatives });
    setIsPickerOpen(false);
  };

  const handleRemoveAlternative = (alternativeId: string) => {
    const updatedAlternatives = (exercise.alternativeExercises || []).filter(id => id !== alternativeId);
    onUpdate({ ...exercise, alternativeExercises: updatedAlternatives });
  };

  const handleSaveProgressionRule = (rule: ProgressionRule) => {
    onUpdate({ ...exercise, progressionRule: rule });
  };

  const isRestTimeAtypical = exercise.descanso > 0 && (exercise.descanso < MIN_REST_SECONDS || exercise.descanso > MAX_REST_SECONDS);

  const restInputClasses = `w-full p-1 bg-surface border rounded text-text ${
    isRestTimeAtypical
      ? 'border-warning focus:ring-warning'
      : 'border-border'
  }`;

  const getRestWarningMessage = () => {
    if (exercise.descanso > 0 && exercise.descanso < MIN_REST_SECONDS) {
      return 'Descanso inusualmente corto.';
    }
    if (exercise.descanso > MAX_REST_SECONDS) {
      return 'Descanso inusualmente largo.';
    }
    return '';
  };

  // Mock exercise list for picker - in a real app this would come from a shared hook or context
  const allExercises = [
    { id: 'ex1', name: 'Push Up' },
    { id: 'ex2', name: 'Pull Up' },
    { id: 'ex3', name: 'Squat' },
    { id: 'ex4', name: 'Bench Press' },
    { id: 'ex5', name: 'Deadlift' },
    { id: 'ex6', name: 'Dumbbell Press' },
    { id: 'ex7', name: 'Incline Bench Press' },
  ];

  const getExerciseNameById = (id: string) => {
    return allExercises.find(ex => ex.id === id)?.name || 'Ejercicio Desconocido';
  }

  return (
    <div className="p-3 bg-backgroundSecondary rounded-lg mt-2 border border-border">
      <div className="grid grid-cols-7 gap-2 items-center">
        <div className="col-span-2 flex items-center">
          <p className="text-text font-semibold">{exercise.name}</p>
          {exercise.progressionRule && (
            <BarChart size={16} className="ml-2 text-primary" />
          )}
        </div>
        <div>
          <label htmlFor={`series-${exercise.id}`} className="sr-only">Series</label>
          <input
            id={`series-${exercise.id}`}
            name="series"
            type="number"
            value={exercise.series}
            onChange={handleChange}
            placeholder="Series"
            className="w-full p-1 bg-surface border border-border rounded text-text"
          />
        </div>
        <div>
          <label htmlFor={`reps-${exercise.id}`} className="sr-only">Reps</label>
          <input
            id={`reps-${exercise.id}`}
            name="reps"
            type="text"
            value={exercise.reps}
            onChange={handleChange}
            placeholder="Reps"
            className="w-full p-1 bg-surface border border-border rounded text-text"
          />
        </div>
        <div>
          <label htmlFor={`peso-${exercise.id}`} className="sr-only">Peso (kg)</label>
          <input
            id={`peso-${exercise.id}`}
            name="peso"
            type="number"
            value={exercise.peso}
            onChange={handleChange}
            placeholder="Peso (kg)"
            className="w-full p-1 bg-surface border border-border rounded text-text"
          />
        </div>
        <div className="relative flex items-center">
          <label htmlFor={`descanso-${exercise.id}`} className="sr-only">Descanso (s)</label>
          <input
            id={`descanso-${exercise.id}`}
            name="descanso"
            type="number"
            value={exercise.descanso}
            onChange={handleChange}
            placeholder="Descanso (s)"
            className={restInputClasses}
          />
          {isRestTimeAtypical && (
            <div className="group absolute right-2 flex items-center">
              <AlertTriangle size={16} className="text-warning" />
              <div className="absolute left-full ml-2 w-max px-2 py-1 bg-surface text-text text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {getRestWarningMessage()}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor={`notas-${exercise.id}`} className="sr-only">Notas</label>
          <input
            id={`notas-${exercise.id}`}
            name="notas"
            type="text"
            value={exercise.notas}
            onChange={handleChange}
            placeholder="Notas (ej. 'bajar lento')"
            className="w-full p-1 bg-surface border border-border rounded text-text"
          />
        </div>
      </div>
      <div className="col-span-7 mt-3 flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center space-x-4">
            <div className="relative inline-block">
              <button 
                onClick={() => setIsPickerOpen(true)} 
                className="flex items-center text-sm text-primary hover:text-primaryHover"
              >
                <PlusCircle size={16} className="mr-1" />
                Añadir Alternativa
              </button>
              {isPickerOpen && (
                <AlternativeExercisePicker
                  onClose={() => setIsPickerOpen(false)}
                  onSelectExercise={handleSelectAlternative}
                />
              )}
            </div>
            <button 
              onClick={() => setIsProgressiveOverloadModalOpen(true)} 
              className="flex items-center text-sm text-primary hover:text-primaryHover"
            >
              <BarChart size={16} className="mr-1" />
              Progresión
            </button>
            <button
              onClick={() => copyExerciseToNextDay(dayIndex, exerciseIndex)}
              disabled={isLastDay}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={isLastDay ? "No hay día siguiente" : "Copiar al día siguiente"}
            >
              <Copy size={16} className="mr-1" />
              Copiar al día siguiente
            </button>
          </div>
          {exercise.alternativeExercises && exercise.alternativeExercises.length > 0 && (
            <div className="mt-2">
              <h4 className="text-xs text-textMuted font-semibold mb-1">Ejercicios Alternativos:</h4>
              <ul className="flex flex-wrap gap-2">
                {exercise.alternativeExercises.map(altId => (
                  <li key={altId} className="flex items-center bg-surface text-textSecondary text-xs px-2 py-1 rounded-full">
                    <span>{getExerciseNameById(altId)}</span>
                    <button onClick={() => handleRemoveAlternative(altId)} className="ml-2 text-textMuted hover:text-error">
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={() => onDelete(exercise.id)} className="text-error hover:text-errorDark text-xs font-medium">
          Eliminar Ejercicio
        </button>
      </div>
      <ProgressiveOverloadModal
        isOpen={isProgressiveOverloadModalOpen}
        onClose={() => setIsProgressiveOverloadModalOpen(false)}
        onSave={handleSaveProgressionRule}
        exerciseName={exercise.name}
      />
    </div>
  );
};

export default ExerciseDetailEditor;
