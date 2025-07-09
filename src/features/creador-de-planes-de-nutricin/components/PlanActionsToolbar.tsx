import React from 'react';
import { Button } from '../../../components/Button';

interface PlanActionsToolbarProps {
  onSave: () => void;
  isSaving: boolean;
  hasChanges: boolean;
  onShowSummary: () => void;
}

export const PlanActionsToolbar: React.FC<PlanActionsToolbarProps> = ({
  onSave,
  isSaving,
  hasChanges,
  onShowSummary,
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 p-4 bg-backgroundSecondary border-t border-border">
      <Button
        onClick={onShowSummary}
        className="bg-secondary hover:bg-secondaryHover text-text font-bold py-2 px-4 rounded"
      >
        Ver Resumen
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving || !hasChanges}
        className={`bg-primary hover:bg-primaryHover text-text font-bold py-2 px-4 rounded ${
          !hasChanges && 'opacity-50 cursor-not-allowed'
        }`}
      >
        {isSaving ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Guardando...
          </div>
        ) : (
          'Guardar Plan'
        )}
      </Button>
    </div>
  );
};