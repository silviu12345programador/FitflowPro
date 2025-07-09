import React, { useState, useMemo, useEffect } from 'react';
import { WorkoutDay, Exercise } from '../hooks/useCreadordePlanesdeEntrenamiento';
import Button from '../../../components/Button';
import ExerciseDetailEditor from './ExerciseDetailEditor';
import EstimatedDurationDisplay from './EstimatedDurationDisplay';
import BulkEditToolbar from './BulkEditToolbar';
import { DayNotesSection } from './DayNotesSection';
import { Dumbbell, ChevronDown } from 'lucide-react';
import ColorPickerDropdown from './ColorPickerDropdown';
import { workoutDayEvents } from './workoutDayEvents';

interface WorkoutDayContainerProps {
  day: WorkoutDay;
  dayIndex: number;
  isLastDay: boolean;
  onDelete: (id: string) => void;
  onCloneDay: (id: string) => void;
  onUpdateName: (id: string, newName: string) => void;
  onAddExercise: (dayId: string) => void;
  onUpdateExercise: (dayId: string, exercise: Exercise) => void;
  onDeleteExercise: (dayId: string, exerciseId: string) => void;
  copyExerciseToNextDay: (dayIndex: number, exerciseIndex: number) => void;
  updateDayNotes: (
    dayId: string,
    notes: { warmup?: string; generalNotes?: string; cooldown?: string }
  ) => void;
  selectedExerciseIds: string[];
  toggleExerciseSelection: (exerciseId: string) => void;
  deselectAllExercises: () => void;
  deleteSelectedExercises: (dayId: string) => void;
  bulkUpdateSelectedExercises: (dayId: string, updates: { sets?: string; reps?: string; rest?: string }) => void;
}

const WorkoutDayContainer: React.FC<WorkoutDayContainerProps> = ({
  day,
  dayIndex,
  isLastDay,
  onDelete,
  onCloneDay,
  onUpdateName,
  onAddExercise,
  onUpdateExercise,
  onDeleteExercise,
  copyExerciseToNextDay,
  updateDayNotes,
  selectedExerciseIds,
  toggleExerciseSelection,
  deselectAllExercises,
  deleteSelectedExercises,
  bulkUpdateSelectedExercises,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(day.name);
  const [dayColor, setDayColor] = useState(day.color || 'transparent');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const expand = () => setIsCollapsed(false);
    const collapse = () => setIsCollapsed(true);

    workoutDayEvents.subscribe('expandAll', expand);
    workoutDayEvents.subscribe('collapseAll', collapse);

    return () => {
      workoutDayEvents.unsubscribe('expandAll', expand);
      workoutDayEvents.unsubscribe('collapseAll', collapse);
    };
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    onUpdateName(day.id, name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    }
  };

  const handleColorChange = (color: string) => {
    setDayColor(color);
  };

  const parseReps = (reps: string | number): number => {
    if (typeof reps === 'number') return reps;
    if (typeof reps === 'string') {
      if (reps.includes('-')) {
        const [min, max] = reps.split('-').map(Number);
        return (min + max) / 2;
      }
      return Number(reps) || 0;
    }
    return 0;
  };

  const estimatedDuration = useMemo(() => {
    const calculateDayDuration = (day: WorkoutDay): number => {
        if (!day || !day.exercises || day.exercises.length === 0) {
            return 0;
        }
        const TIME_PER_REP_SECONDS = 3;
        const REST_BETWEEN_EXERCISES_SECONDS = 90;
        
        const totalDurationSeconds = day.exercises.reduce((total, exercise) => {
            const avgReps = parseReps(exercise.reps);
            const timeForReps = avgReps * TIME_PER_REP_SECONDS;
            const timeForSets = exercise.series * timeForReps;
            const timeForRest = (exercise.series > 0 ? exercise.series - 1 : 0) * exercise.descanso;
            const exerciseDuration = timeForSets + timeForRest;
            return total + exerciseDuration + REST_BETWEEN_EXERCISES_SECONDS;
        }, 0);

        const finalDuration = totalDurationSeconds > 0 ? totalDurationSeconds - REST_BETWEEN_EXERCISES_SECONDS : 0;
        return finalDuration / 60;
    };
    return calculateDayDuration(day);
  }, [day.exercises]);

  const totalVolume = useMemo(() => {
    return day.exercises.reduce((total, exercise) => {
      if (!exercise.peso || exercise.peso <= 0) {
        return total;
      }
      const avgReps = parseReps(exercise.reps);
      const exerciseVolume = exercise.series * avgReps * exercise.peso;
      return total + exerciseVolume;
    }, 0);
  }, [day.exercises]);

  const exercisesInThisDay = day.exercises.map(ex => ex.id);
  const selectedInThisDay = selectedExerciseIds.filter(id => exercisesInThisDay.includes(id));


  return (
    <div
      className="bg-card rounded-lg shadow p-4 mb-4 border-l-4"
      style={{ borderColor: dayColor }}
    >
      <div 
        className="flex justify-between items-center bg-surface p-2 rounded-t-lg cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <ChevronDown 
            className={`text-text transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} 
          />
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-lg font-bold bg-transparent border-b-2 border-primary text-text"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h2
              className="text-lg font-bold text-text"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {day.name}
            </h2>
          )}
          <EstimatedDurationDisplay duration={estimatedDuration} />
          <div className="flex items-center text-sm font-semibold text-textMuted">
            <Dumbbell className="mr-2 h-4 w-4" />
            <span>Volumen Total: {totalVolume.toLocaleString()} kg</span>
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <ColorPickerDropdown
            selectedColor={dayColor}
            onColorChange={handleColorChange}
          />
          <Button onClick={() => onCloneDay(day.id)} className="text-gray-400 hover:text-white transition-colors">
            Clonar Día
          </Button>
          <Button onClick={() => onDelete(day.id)} className="bg-error hover:bg-errorDark">
            Eliminar Día
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-2">
          <div className="grid grid-cols-12 gap-2 items-center text-textMuted text-sm font-bold mb-2">
              <div className="col-span-1"></div>
              <div className="col-span-3">Ejercicio</div>
              <div>Series</div>
              <div>Reps</div>
              <div>Peso (kg)</div>
              <div>Descanso (s)</div>
              <div className="col-span-2">Notas</div>
              <div className="col-span-2"></div>
          </div>
          {day.exercises.map((exercise, exerciseIndex) => (
            <div key={exercise.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1 flex justify-center">
                  <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary bg-surface border-border rounded focus:ring-primary"
                      checked={selectedExerciseIds.includes(exercise.id)}
                      onChange={() => toggleExerciseSelection(exercise.id)}
                  />
              </div>
              <div className="col-span-11">
                  <ExerciseDetailEditor
                      exercise={exercise}
                      onUpdate={(updatedExercise) => onUpdateExercise(day.id, updatedExercise)}
                      onDelete={(exerciseId) => onDeleteExercise(day.id, exerciseId)}
                      dayIndex={dayIndex}
                      exerciseIndex={exerciseIndex}
                      isLastDay={isLastDay}
                      copyExerciseToNextDay={copyExerciseToNextDay}
                  />
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Button onClick={() => onAddExercise(day.id)} className="bg-secondary hover:bg-secondaryHover">
              Añadir Ejercicio
            </Button>
          </div>
          <DayNotesSection
            warmup={day.warmup}
            generalNotes={day.generalNotes}
            cooldown={day.cooldown}
            onNotesChange={(notes) => updateDayNotes(day.id, notes)}
          />
        </div>
      )}
      {!isCollapsed && selectedInThisDay.length > 0 && (
        <BulkEditToolbar
            selectedCount={selectedInThisDay.length}
            onApply={(updates) => bulkUpdateSelectedExercises(day.id, updates)}
            onDelete={() => deleteSelectedExercises(day.id)}
            onDeselectAll={deselectAllExercises}
        />
      )}
    </div>
  );
};

export default WorkoutDayContainer;
