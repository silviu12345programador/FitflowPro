
import React, { useState } from 'react';
import Button from '../../../components/Button';
import { TagInput } from './TagInput';

interface SaveAsTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (templateName: string, description: string, tags: string[]) => void;
  isSaving: boolean;
}

export const SaveAsTemplateModal: React.FC<SaveAsTemplateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = () => {
    if (templateName.trim()) {
      onSave(templateName.trim(), description.trim(), tags);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-textInverse">Guardar como Plantilla</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
              Nombre de la Plantilla
            </label>
            <input
              type="text"
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ej: Plan de Fuerza para Principiantes"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción (Opcional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Añada una breve descripción para identificar esta plantilla fácilmente."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Etiquetas
            </label>
            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={onClose} variant="secondary" disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!templateName.trim() || isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
