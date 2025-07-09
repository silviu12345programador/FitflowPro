import React, { useState } from 'react';
import { TagInput } from '../../creador-de-planes-de-entrenamiento/components/TagInput';

// Asumiendo una definición para el tipo Template, ajustar según la implementación real
interface Template {
  id: string;
  name: string;
  tags: string[];
  description?: string;
}

interface EditTemplateMetadataModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTemplate: Template) => void;
}

export const EditTemplateMetadataModal: React.FC<EditTemplateMetadataModalProps> = ({
  template,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(template.name);
  const [tags, setTags] = useState(template.tags);
  const [description, setDescription] = useState(template.description || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('El nombre de la plantilla no puede estar vacío.');
      return;
    }
    onSave({
      ...template,
      name,
      tags,
      description,
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-backgroundSecondary rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
        <h2 className="text-2xl font-bold text-text mb-4">Editar Plantilla</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="template-name" className="block text-sm font-medium text-textSecondary mb-1">
              Nombre de la Plantilla
            </label>
            <input
              id="template-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="w-full bg-surface border border-border text-text rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
            />
            {error && <p className="text-error text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Etiquetas
            </label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          <div>
            <label htmlFor="template-description" className="block text-sm font-medium text-textSecondary mb-1">
              Descripción (Opcional)
            </label>
            <textarea
              id="template-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-surface border border-border text-text rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="Añade una descripción más detallada aquí..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-muted text-text rounded-md hover:bg-borderLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-text font-semibold rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
