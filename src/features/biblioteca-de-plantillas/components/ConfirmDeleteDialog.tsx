import React from 'react';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateName: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  templateName,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-surface p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-text">Confirmar Eliminación</h2>
        <p className="mt-4 text-textSecondary">
          ¿Estás seguro de que quieres eliminar la plantilla{' '}
          <span className="font-semibold text-accent">{templateName}</span>?
        </p>
        <p className="mt-2 text-sm text-textMuted">
          Esta acción no se puede deshacer.
        </p>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-muted px-4 py-2 font-semibold text-text transition-colors hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md bg-error px-4 py-2 font-semibold text-white transition-colors hover:bg-errorDark"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
