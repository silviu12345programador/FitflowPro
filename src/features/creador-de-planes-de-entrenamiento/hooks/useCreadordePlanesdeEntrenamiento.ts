import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlanTemplate } from '../components/ImportFromTemplateModal';

// --- Tipos y Constantes ---
const RECENTLY_USED_KEY = 'fitflow_recentlyUsedExercises';
const MAX_RECENT_EXERCISES = 30;

export interface Exercise {
  id: string;
  name: string;
  series: number;
  reps: string;
  peso: number;
  descanso: number; // en segundos
  notas: string;
}

export interface WorkoutDay {
  id:string;
  name: string;
  exercises: Exercise[];
  warmup: string;
  generalNotes: string;
  cooldown: string;
}

// --- Lógica de Cálculo de Duración ---
const TIME_PER_REP_SECONDS = 3;
const REST_BETWEEN_EXERCISES_SECONDS = 90; // Descanso adicional entre diferentes ejercicios

const parseReps = (reps: string): number => {
  if (reps.includes('-')) {
    const [min, max] = reps.split('-').map(Number);
    return (min + max) / 2;
  }
  return Number(reps) || 0;
};

export const calculateDayDuration = (day: WorkoutDay): number => {
  if (!day || !day.exercises || day.exercises.length === 0) {
    return 0;
  }

  const totalDurationSeconds = day.exercises.reduce((total, exercise) => {
    const avgReps = parseReps(exercise.reps);
    const timeForReps = avgReps * TIME_PER_REP_SECONDS;
    const timeForSets = exercise.series * timeForReps;
    const timeForRest = (exercise.series - 1) * exercise.descanso;
    
    const exerciseDuration = timeForSets + timeForRest;

    // Añadir descanso entre ejercicios, excepto para el último
    return total + exerciseDuration + REST_BETWEEN_EXERCISES_SECONDS;
  }, 0);

  // Restar el descanso extra añadido al último ejercicio
  const finalDuration = totalDurationSeconds - REST_BETWEEN_EXERCISES_SECONDS;

  return finalDuration / 60; // Convertir a minutos
};
// --- Fin de la Lógica de Cálculo ---


export const useCreadordePlanesdeEntrenamiento = () => {
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [planObjective, setPlanObjective] = useState('');
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem(RECENTLY_USED_KEY);
      if (storedRecent) {
        setRecentlyUsed(JSON.parse(storedRecent));
      }
    } catch (error) {
      console.error("Error loading recently used exercises from localStorage", error);
    }
  }, []);

  const addExerciseToRecent = useCallback((exerciseId: string) => {
    setRecentlyUsed(prevRecent => {
      const updatedRecent = [exerciseId, ...prevRecent.filter(id => id !== exerciseId)];
      const limitedRecent = updatedRecent.slice(0, MAX_RECENT_EXERCISES);
      try {
        localStorage.setItem(RECENTLY_USED_KEY, JSON.stringify(limitedRecent));
      } catch (error) {
        console.error("Error saving recently used exercises to localStorage", error);
      }
      return limitedRecent;
    });
  }, []);


  const toggleExerciseSelection = (exerciseId: string) => {
    setSelectedExerciseIds((prevSelected) =>
      prevSelected.includes(exerciseId)
        ? prevSelected.filter((id) => id !== exerciseId)
        : [...prevSelected, exerciseId]
    );
  };

  const deselectAllExercises = () => {
    setSelectedExerciseIds([]);
  };

  const addDay = () => {
    const newDay: WorkoutDay = {
      id: uuidv4(),
      name: `Día ${workoutDays.length + 1}`,
      exercises: [],
      warmup: '',
      generalNotes: '',
      cooldown: '',
    };
    setWorkoutDays([...workoutDays, newDay]);
  };

  const deleteDay = (dayId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este día?')) {
      setWorkoutDays(workoutDays.filter((day) => day.id !== dayId));
    }
  };

  const updateDayName = (dayId: string, newName: string) => {
    setWorkoutDays(
      workoutDays.map((day) =>
        day.id === dayId ? { ...day, name: newName } : day
      )
    );
  };

  const addExerciseToDay = (dayId: string, exercise: Omit<Exercise, 'id' | 'series' | 'reps' | 'peso' | 'descanso' | 'notas'> & { id: string | number }) => {
    const newExercise: Exercise = {
      id: uuidv4(),
      name: exercise.name,
      series: 3,
      reps: '10-12',
      peso: 10,
      descanso: 60,
      notas: '',
    };
    setWorkoutDays(
      workoutDays.map((day) =>
        day.id === dayId
          ? { ...day, exercises: [...day.exercises, newExercise] }
          : day
      )
    );
    // Add to recent list
    addExerciseToRecent(String(exercise.id));
  };

  const updateExerciseInDay = (dayId: string, updatedExercise: Exercise) => {
    setWorkoutDays(
      workoutDays.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map((ex) =>
                ex.id === updatedExercise.id ? updatedExercise : ex
              ),
            }
          : day
      )
    );
  };

  const deleteExerciseFromDay = (dayId: string, exerciseId: string) => {
    setWorkoutDays(
      workoutDays.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
            }
          : day
      )
    );
  };

  const deleteSelectedExercises = (dayId: string) => {
    setWorkoutDays(
      workoutDays.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.filter(
              (ex) => !selectedExerciseIds.includes(ex.id)
            ),
          };
        }
        return day;
      })
    );
    deselectAllExercises();
  };

  const bulkUpdateSelectedExercises = (
    dayId: string,
    updates: { sets?: string; reps?: string; rest?: string }
  ) => {
    setWorkoutDays(
      workoutDays.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map((ex) => {
              if (selectedExerciseIds.includes(ex.id)) {
                return {
                  ...ex,
                  series: updates.sets ? parseInt(updates.sets, 10) : ex.series,
                  reps: updates.reps || ex.reps,
                  descanso: updates.rest ? parseInt(updates.rest, 10) : ex.descanso,
                };
              }
              return ex;
            }),
          };
        }
        return day;
      })
    );
  };

  const copyExerciseToNextDay = (dayIndex: number, exerciseIndex: number) => {
    const dayToCloneFrom = workoutDays[dayIndex];
    const nextDay = workoutDays[dayIndex + 1];

    if (!dayToCloneFrom || !nextDay) {
      console.warn("No next day to copy to.");
      return;
    }

    const exerciseToClone = dayToCloneFrom.exercises[exerciseIndex];
    if (!exerciseToClone) {
      console.warn("Exercise to clone not found.");
      return;
    }

    const newExercise: Exercise = {
      ...structuredClone(exerciseToClone),
      id: uuidv4(),
    };

    setWorkoutDays(
      workoutDays.map((day, index) => {
        if (index === dayIndex + 1) {
          return {
            ...day,
            exercises: [...day.exercises, newExercise],
          };
        }
        return day;
      })
    );
    // Aquí se podría añadir una notificación de éxito.
  };

  const cloneDay = (dayId: string) => {
    const dayToClone = workoutDays.find((day) => day.id === dayId);
    if (!dayToClone) return;

    const clonedDay: WorkoutDay = {
      ...structuredClone(dayToClone),
      id: uuidv4(),
      name: `Copia de ${dayToClone.name}`,
      exercises: dayToClone.exercises.map((exercise) => ({
        ...structuredClone(exercise),
        id: uuidv4(),
      })),
    };

    const originalDayIndex = workoutDays.findIndex((day) => day.id === dayId);
    const updatedWorkoutDays = [...workoutDays];
    updatedWorkoutDays.splice(originalDayIndex + 1, 0, clonedDay);

    setWorkoutDays(updatedWorkoutDays);
  };

  const updateDayNotes = (
    dayId: string,
    notes: { warmup?: string; generalNotes?: string; cooldown?: string }
  ) => {
    setWorkoutDays(
      workoutDays.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            warmup: notes.warmup ?? day.warmup,
            generalNotes: notes.generalNotes ?? day.generalNotes,
            cooldown: notes.cooldown ?? day.cooldown,
          };
        }
        return day;
      })
    );
  };

  const getFullPlan = () => {
    return {
      name: planName,
      description: planDescription,
      objective: planObjective,
      days: workoutDays,
    };
  };

  const importPlanFromTemplate = (template: PlanTemplate) => {
    if (
      workoutDays.length > 0 &&
      !window.confirm(
        'El plan actual no está vacío. ¿Quieres sobreescribirlo con la plantilla seleccionada?'
      )
    ) {
      return;
    }

    setPlanName(template.name);
    setPlanDescription(template.description);
    setPlanObjective(template.objective);
    setWorkoutDays(template.days.map(day => ({
      ...day,
      id: uuidv4(), // Ensure unique IDs for the new plan
      exercises: day.exercises.map(ex => ({ ...ex, id: uuidv4() }))
    })));
  };

  return {
    planName,
    setPlanName,
    planDescription,
    setPlanDescription,
    planObjective,
    setPlanObjective,
    workoutDays,
    addDay,
    deleteDay,
    updateDayName,
    addExerciseToDay,
    updateExerciseInDay,
    deleteExerciseFromDay,
    getFullPlan,
    importPlanFromTemplate,
    selectedExerciseIds,
    toggleExerciseSelection,
    deselectAllExercises,
    deleteSelectedExercises,
    bulkUpdateSelectedExercises,
    cloneDay,
    updateDayNotes,
    recentlyUsed,
    addExerciseToRecent,
    copyExerciseToNextDay,
  };
};
