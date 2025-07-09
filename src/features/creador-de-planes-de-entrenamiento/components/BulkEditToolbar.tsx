import React from 'react';

interface BulkEditToolbarProps {
  selectedCount: number;
  onApply: (updates: { sets?: string; reps?: string; rest?: string }) => void;
  onDelete: () => void;
  onDeselectAll: () => void;
}

const BulkEditToolbar: React.FC<BulkEditToolbarProps> = ({
  selectedCount,
  onApply,
  onDelete,
  onDeselectAll,
}) => {
  const [sets, setSets] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [rest, setRest] = React.useState('');

  const handleApply = () => {
    onApply({
      sets: sets || undefined,
      reps: reps || undefined,
      rest: rest || undefined,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-backgroundSecondary p-4 shadow-lg flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <span className="text-text font-bold">{selectedCount} ejercicio(s) seleccionado(s)</span>
        <input
          type="text"
          placeholder="Series"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="bg-surface text-text placeholder-textMuted rounded px-2 py-1 w-24"
        />
        <input
          type="text"
          placeholder="Repeticiones"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="bg-surface text-text placeholder-textMuted rounded px-2 py-1 w-24"
        />
        <input
          type="text"
          placeholder="Descanso (s)"
          value={rest}
          onChange={(e) => setRest(e.target.value)}
          className="bg-surface text-text placeholder-textMuted rounded px-2 py-1 w-24"
        />
        <button
          onClick={handleApply}
          className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded"
        >
          Aplicar Cambios
        </button>
        <button
          onClick={onDelete}
          className="bg-error hover:bg-errorDark text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
      <button
        onClick={onDeselectAll}
        className="text-textMuted hover:text-text"
      >
        Deseleccionar todo
      </button>
    </div>
  );
};

export default BulkEditToolbar;
