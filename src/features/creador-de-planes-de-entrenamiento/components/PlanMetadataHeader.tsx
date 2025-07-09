import React, { useMemo } from 'react';
import { useCreadordePlanesdeEntrenamiento, WorkoutDay } from '../hooks/useCreadordePlanesdeEntrenamiento';
import Button from '../../../components/Button';
import { BarChartBig, ChevronsDown, ChevronsUp } from 'lucide-react';
import { workoutDayEvents } from './workoutDayEvents';

interface PlanMetadataHeaderProps {
  onOpenImportModal: () => void;
  workoutDays: WorkoutDay[];
}

const PlanMetadataHeader: React.FC<PlanMetadataHeaderProps> = ({ onOpenImportModal, workoutDays }) => {
  const {
    planName,
    setPlanName,
    planDescription,
    setPlanDescription,
    planObjective,
    setPlanObjective,
  } = useCreadordePlanesdeEntrenamiento();

  const objectives = ['Hipertrofia', 'Fuerza', 'Resistencia'];

  const totalWeeklyVolume = useMemo(() => {
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

    return workoutDays.reduce((totalVolume, day) => {
      const dayVolume = day.exercises.reduce((total, exercise) => {
        if (!exercise.peso || exercise.peso <= 0) {
          return total;
        }
        const avgReps = parseReps(exercise.reps);
        const exerciseVolume = exercise.series * avgReps * exercise.peso;
        return total + exerciseVolume;
      }, 0);
      return totalVolume + dayVolume;
    }, 0);
  }, [workoutDays]);

  const handleExpandAll = () => {
    workoutDayEvents.publish('expandAll');
  };

  const handleCollapseAll = () => {
    workoutDayEvents.publish('collapseAll');
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface border-b border-border">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Detalles del Plan</h2>
          {totalWeeklyVolume > 0 && (
            <div className="flex items-center text-sm font-semibold text-textMuted mt-2">
              <BarChartBig className="mr-2 h-4 w-4 text-accent" />
              <span>Volumen Semanal Total: {totalWeeklyVolume.toLocaleString()} kg</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCollapseAll} variant="secondary" className="flex items-center gap-1">
            <ChevronsUp className="h-4 w-4" /> Colapsar Todos
          </Button>
          <Button onClick={handleExpandAll} variant="secondary" className="flex items-center gap-1">
            <ChevronsDown className="h-4 w-4" /> Expandir Todos
          </Button>
          <Button onClick={onOpenImportModal} variant="secondary">
            Importar desde Plantilla
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="planName" className="text-sm font-medium text-textSecondary">
          Nombre del Plan
        </label>
        <input
          id="planName"
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="Ej: Rutina de Pecho y Tríceps"
          className="p-2 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="planDescription" className="text-sm font-medium text-textSecondary">
          Descripción
        </label>
        <textarea
          id="planDescription"
          value={planDescription}
          onChange={(e) => setPlanDescription(e.target.value)}
          placeholder="Describe el enfoque principal, la duración, etc."
          className="p-2 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="planObjective" className="text-sm font-medium text-textSecondary">
          Objetivo Principal
        </label>
        <select
          id="planObjective"
          value={planObjective}
          onChange={(e) => setPlanObjective(e.target.value)}
          className="p-2 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus"
        >
          <option value="" disabled>Selecciona un objetivo</option>
          {objectives.map((obj) => (
            <option key={obj} value={obj}>
              {obj}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlanMetadataHeader;
