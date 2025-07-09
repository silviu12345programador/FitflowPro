import React from 'react';
import Button from '../../../components/Button'; // Assuming a generic Button component exists

interface BulkActionsToolbarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onDeselectAll: () => void;
}

export const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
  selectedCount,
  onDeleteSelected,
  onDeselectAll,
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card p-4 rounded-lg shadow-lg flex items-center gap-4 border border-border">
      <span className="text-textSecondary font-semibold">
        {selectedCount} {selectedCount === 1 ? 'plantilla seleccionada' : 'plantillas seleccionadas'}
      </span>
      <Button onClick={onDeleteSelected} className="bg-error hover:bg-errorDark text-white">
        Eliminar Seleccionadas
      </Button>
      <Button onClick={onDeselectAll} className="bg-secondary hover:bg-secondaryHover text-white">
        Deseleccionar todo
      </Button>
    </div>
  );
};

export default BulkActionsToolbar;
