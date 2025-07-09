import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { workoutBuilderApi, Exercise } from '../api';
import { useDraggable } from '@dnd-kit/core';
import { CreateCustomExerciseModal } from './CreateCustomExerciseModal';
import { useCreadordePlanesdeEntrenamiento } from '../hooks/useCreadordePlanesdeEntrenamiento';

interface DraggableExerciseProps {
  exercise: Exercise;
  isAdded: boolean;
}

const DraggableExercise: React.FC<DraggableExerciseProps> = ({ exercise, isAdded }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `exercise-${exercise.id}`,
    data: { exercise },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const addedClasses = isAdded ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-card';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-md hover:bg-surface cursor-grab ${addedClasses}`}
      title={isAdded ? 'Ya añadido al plan' : ''}
    >
      <p className="font-semibold">{exercise.name}</p>
      <p className="text-sm text-textMuted">{exercise.muscleGroup}</p>
    </div>
  );
};

interface ExerciseLibraryPanelProps {
  addedExerciseIds: (string | number)[];
}

type ViewType = 'all' | 'recent';

const ExerciseLibraryPanel: React.FC<ExerciseLibraryPanelProps> = ({ addedExerciseIds }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('all');
  
  const { recentlyUsed } = useCreadordePlanesdeEntrenamiento();

  const fetchExercises = useCallback(async () => {
    const data = await workoutBuilderApi.getExercises();
    setExercises(data);
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleExerciseCreated = () => {
    fetchExercises();
  };

  const muscleGroups = useMemo(() => {
    const allGroups = exercises.map(ex => ex.muscleGroup);
    return [...new Set(allGroups)];
  }, [exercises]);

  const filteredExercises = useMemo(() => {
    let sourceExercises = exercises;

    if (activeView === 'recent') {
      const recentSet = new Set(recentlyUsed.map(String));
      sourceExercises = exercises
        .filter(ex => recentSet.has(String(ex.id)))
        .sort((a, b) => recentlyUsed.indexOf(String(a.id)) - recentlyUsed.indexOf(String(b.id)));
    }

    return sourceExercises
      .filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(ex =>
        muscleGroup ? ex.muscleGroup === muscleGroup : true
      );
  }, [exercises, searchTerm, muscleGroup, activeView, recentlyUsed]);

  const addedIdsSet = useMemo(() => new Set(addedExerciseIds), [addedExerciseIds]);

  const getTabClassName = (viewType: ViewType) => {
    const baseClasses = "cursor-pointer py-2 px-4 text-center font-medium transition-colors duration-200 ease-in-out";
    const activeClasses = "border-b-2 border-blue-500 text-blue-600";
    const inactiveClasses = "border-b-2 border-transparent hover:border-blue-500 hover:text-blue-600";
    return `${baseClasses} ${activeView === viewType ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-96 bg-backgroundSecondary text-text p-4 overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Biblioteca de Ejercicios</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-md text-sm"
          >
            Crear Ejercicio
          </button>
        </div>

        <div className="mb-4 border-b border-border">
          <nav className="flex space-x-2">
            <button onClick={() => setActiveView('all')} className={getTabClassName('all')}>
              Todos
            </button>
            <button onClick={() => setActiveView('recent')} className={getTabClassName('recent')}>
              Recientes
            </button>
          </nav>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>

        {activeView === 'all' && (
          <div className="mb-4">
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="w-full p-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <option value="">Todos los grupos musculares</option>
              {muscleGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(exercise => (
              <DraggableExercise 
                key={exercise.id} 
                exercise={exercise} 
                isAdded={addedIdsSet.has(exercise.id)}
              />
            ))
          ) : (
            <p className="text-center text-textMuted mt-8">
              {activeView === 'recent' 
                ? "No hay ejercicios usados recientemente." 
                : "No se encontraron ejercicios."}
            </p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CreateCustomExerciseModal
          onClose={() => setIsModalOpen(false)}
          onExerciseCreated={handleExerciseCreated}
        />
      )}
    </>
  );
};

export default ExerciseLibraryPanel;
