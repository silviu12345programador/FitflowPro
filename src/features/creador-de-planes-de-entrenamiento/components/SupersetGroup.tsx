
import React from 'react';
import { Exercise } from '../hooks/useCreadordePlanesdeEntrenamiento';
import { ExerciseDetailEditor } from './ExerciseDetailEditor';

// Define the types for the component's props
interface SupersetGroupProps {
  exercises: Exercise[];
  groupName: string;
  restTimeAfterSet: string;
  restTimeBetweenExercises: string;
  onRestTimeAfterSetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRestTimeBetweenExercisesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGroupNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateExercise: (updatedExercise: Exercise) => void;
  onDeleteExercise: (exerciseId: string) => void;
  onUngroup: () => void;
  onReorderExercise: (dragIndex: number, hoverIndex: number) => void;
}

const getSetTypeName = (count: number) => {
  switch (count) {
    case 2:
      return 'Superserie';
    case 3:
      return 'Triserie';
    case 4:
      return 'Giant Set';
    default:
      return `Grupo de ${count}`;
  }
};

/**
 * SupersetGroup component visually wraps a set of exercises,
 * allowing for group-level configurations like rest time.
 */
export const SupersetGroup: React.FC<SupersetGroupProps> = ({
  exercises,
  groupName,
  restTimeAfterSet,
  restTimeBetweenExercises,
  onRestTimeAfterSetChange,
  onRestTimeBetweenExercisesChange,
  onGroupNameChange,
  onUpdateExercise,
  onDeleteExercise,
  onUngroup,
  onReorderExercise,
}) => {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    onReorderExercise(dragIndex, index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="border-l-4 border-dashed border-border pl-4 py-2 my-2 bg-surface/50 rounded-r-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-sm">{getSetTypeName(exercises.length)}</span>
          <input
            type="text"
            value={groupName}
            onChange={onGroupNameChange}
            placeholder="Nombre del Grupo"
            className="bg-transparent text-text font-bold text-lg focus:outline-none"
          />
        </div>
        <button
          onClick={onUngroup}
          className="bg-error/50 text-textSecondary hover:bg-error text-white font-bold py-1 px-2 rounded text-xs"
        >
          Desagrupar
        </button>
      </div>
      <div className="pl-2 space-y-2">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="cursor-move"
          >
            <ExerciseDetailEditor
              exercise={exercise}
              onUpdate={onUpdateExercise}
              onDelete={() => onDeleteExercise(exercise.id)}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-textMuted text-sm">Descanso entre ejercicios:</label>
          <input
            type="text"
            value={restTimeBetweenExercises}
            onChange={onRestTimeBetweenExercisesChange}
            placeholder="Ej: 15s"
            className="ml-2 bg-surface text-text p-1 rounded w-24 border border-border"
          />
        </div>
        <div>
          <label className="text-textMuted text-sm">Descanso después del set:</label>
          <input
            type="text"
            value={restTimeAfterSet}
            onChange={onRestTimeAfterSetChange}
            placeholder="Ej: 90s"
            className="ml-2 bg-surface text-text p-1 rounded w-24 border border-border"
          />
        </div>
      </div>
    </div>
  );
};
