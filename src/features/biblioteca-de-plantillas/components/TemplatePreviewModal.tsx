import React from 'react';

// Tipos de datos de ejemplo para la plantilla
interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutTemplate {
  id: string;
  type: 'workout';
  name: string;
  description: string;
  estimatedDuration: string;
  exercises: Exercise[];
}

interface NutritionTemplate {
  id: string;
  type: 'nutrition';
  name: string;
  description: string;
  totalCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

type TemplateData = WorkoutTemplate | NutritionTemplate;

interface TemplatePreviewModalProps {
  templateData: TemplateData | null;
  onClose: () => void;
  onAssign: (templateId: string) => void;
  onEdit: (templateId: string) => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  templateData,
  onClose,
  onAssign,
  onEdit,
}) => {
  if (!templateData) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    if (templateData.type === 'workout') {
      return (
        <div>
          <h4 className="text-lg font-semibold text-textSecondary mb-2">Ejercicios</h4>
          <ul className="space-y-3">
            {templateData.exercises.map((ex) => (
              <li key={ex.id} className="p-3 bg-backgroundSecondary rounded-lg">
                <p className="font-bold text-text">{ex.name}</p>
                <p className="text-sm text-textMuted">
                  {ex.sets} series x {ex.reps} reps - {ex.rest} de descanso
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // Aquí se podría añadir el renderizado para plantillas de nutrición
    return null;
  };

  const renderSummary = () => {
    if (templateData.type === 'workout') {
      return (
        <p className="text-sm text-accent">
          Duración estimada: {templateData.estimatedDuration}
        </p>
      );
    }
    // Aquí se podría añadir el resumen para plantillas de nutrición
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-overlay flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-2xl m-4 max-h-[90vh] flex flex-col">
        {/* Encabezado */}
        <header className="p-6 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-text">{templateData.name}</h3>
              <p className="text-textMuted mt-1">{templateData.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-textMuted hover:text-text transition-colors"
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            {renderSummary()}
          </div>
        </header>

        {/* Cuerpo del Modal */}
        <div className="p-6 overflow-y-auto flex-grow">
          {renderContent()}
        </div>

        {/* Pie de página */}
        <footer className="p-6 border-t border-border flex justify-end items-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-textMuted bg-card hover:bg-backgroundSecondary transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => onEdit(templateData.id)}
            className="px-4 py-2 rounded-md text-text bg-secondary hover:bg-secondaryHover transition-colors"
          >
            Editar Plantilla
          </button>
          <button
            onClick={() => onAssign(templateData.id)}
            className="px-4 py-2 rounded-md text-textInverse bg-primary hover:bg-primaryHover transition-colors"
          >
            Asignar a Cliente
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
