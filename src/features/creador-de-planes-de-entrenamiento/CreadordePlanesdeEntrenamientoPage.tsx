import React, { useState } from 'react';
import PlanMetadataHeader from './components/PlanMetadataHeader';
import { useCreadordePlanesdeEntrenamiento } from './hooks/useCreadordePlanesdeEntrenamiento';
import WorkoutDayContainer from './components/WorkoutDayContainer';
import Button from '../../components/Button';
import { SaveAsTemplateModal } from './components/SaveAsTemplateModal';
import { saveWorkoutTemplate } from '../biblioteca-de-plantillas/api';
import AssignPlanToClientModal from './components/AssignPlanToClientModal';
import PlanPreviewModal from './components/PlanPreviewModal';
import ImportFromTemplateModal from './components/ImportFromTemplateModal';

// Define the Plan type to match what the modal expects
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

interface Day {
  name: string;
  exercises: Exercise[];
}

interface Plan {
  name: string;
  days: Day[];
}


const CreadordePlanesdeEntrenamientoPage: React.FC = () => {
  const {
    workoutDays,
    addDay,
    deleteDay,
    cloneDay,
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
    copyExerciseToNextDay,
  } = useCreadordePlanesdeEntrenamiento();

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [planForPreview, setPlanForPreview] = useState<Plan | null>(null);

  const handleSaveTemplate = async (templateName: string, description?: string) => {
    setIsSaving(true);
    const fullPlan = getFullPlan();
    const templateData = {
      name: templateName,
      description: description,
      plan: fullPlan,
    };

    try {
      const result = await saveWorkoutTemplate(templateData);
      if (result.success) {
        alert('Plantilla guardada con éxito');
        setIsTemplateModalOpen(false);
      } else {
        alert('Error al guardar la plantilla: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Ocurrió un error inesperado al guardar la plantilla.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssignSuccess = () => {
    alert('Plan asignado con éxito!');
  };

  const handleOpenPreview = () => {
    const fullPlan = getFullPlan();
    const formattedPlan: Plan = {
        name: "Mi Plan de Entrenamiento", 
        days: fullPlan.days.map(d => ({
            name: d.name,
            exercises: d.exercises.map(e => ({
                name: e.name,
                sets: e.series,
                reps: e.reps,
                notes: e.notas,
            }))
        }))
    };
    setPlanForPreview(formattedPlan);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="p-6 bg-background text-text">
      <h1 className="text-3xl font-bold mb-6">Creador de Planes de Entrenamiento</h1>
      <div className="bg-card rounded-lg shadow p-6">
        <PlanMetadataHeader workoutDays={workoutDays} onOpenImportModal={() => setIsImportModalOpen(true)} />
        <div className="mt-6">
          {workoutDays.map((day, dayIndex) => (
            <WorkoutDayContainer
              key={day.id}
              day={day}
              dayIndex={dayIndex}
              isLastDay={dayIndex === workoutDays.length - 1}
              onDelete={deleteDay}
              onCloneDay={cloneDay}
              onUpdateName={updateDayName}
              onAddExercise={addExerciseToDay}
              onUpdateExercise={updateExerciseInDay}
              onDeleteExercise={deleteExerciseFromDay}
              copyExerciseToNextDay={copyExerciseToNextDay}
              selectedExerciseIds={selectedExerciseIds}
              toggleExerciseSelection={toggleExerciseSelection}
              deselectAllExercises={deselectAllExercises}
              deleteSelectedExercises={deleteSelectedExercises}
              bulkUpdateSelectedExercises={bulkUpdateSelectedExercises}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button onClick={addDay} className="bg-primary hover:bg-primaryHover">
            Añadir Día
          </Button>
          <div className="flex space-x-4">
            <Button onClick={handleOpenPreview} variant="outline">
              Vista Previa
            </Button>
            <Button onClick={() => setIsTemplateModalOpen(true)} variant="secondary">
              Guardar como Plantilla
            </Button>
            <Button onClick={() => setIsAssignModalOpen(true)} variant="primary">
              Asignar a Cliente
            </Button>
          </div>
        </div>
      </div>
      <SaveAsTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSave={handleSaveTemplate}
        isSaving={isSaving}
      />
      <AssignPlanToClientModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        planData={getFullPlan()}
        onSuccess={handleAssignSuccess}
      />
      {isPreviewModalOpen && planForPreview && (
        <PlanPreviewModal
          plan={planForPreview}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
      <ImportFromTemplateModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={importPlanFromTemplate}
      />
    </div>
  );
};

export default CreadordePlanesdeEntrenamientoPage;
