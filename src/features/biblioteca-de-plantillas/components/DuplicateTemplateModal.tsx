import React, { useState } from 'react';

interface DuplicateTemplateModalProps {
  templateName: string;
  onClose: () => void;
  onConfirm: (newTemplateName: string) => void;
}

const DuplicateTemplateModal: React.FC<DuplicateTemplateModalProps> = ({
  templateName,
  onClose,
  onConfirm,
}) => {
  const [newTemplateName, setNewTemplateName] = useState(`${templateName} - Copia`);

  const handleConfirm = () => {
    onConfirm(newTemplateName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-surface rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-text mb-4">Duplicar Plantilla</h2>
        <p className="text-textSecondary mb-4">
          Se creará una copia de la plantilla <span className="font-semibold text-accent">{templateName}</span>.
        </p>
        <div className="mb-4">
          <label htmlFor="templateName" className="block text-sm font-medium text-textSecondary mb-2">
            Nuevo nombre de la plantilla
          </label>
          <input
            type="text"
            id="templateName"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            className="w-full px-3 py-2 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-text bg-muted hover:bg-opacity-80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primaryHover transition-colors"
          >
            Confirmar y Duplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateTemplateModal;
