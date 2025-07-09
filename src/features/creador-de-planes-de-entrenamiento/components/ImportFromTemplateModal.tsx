
import React, { useState, useEffect } from 'react';
import { libraryApi } from '../../../biblioteca-de-plantillas/api';
import Button from '../../../../components/Button';
import TagInput from './TagInput';

// Define a mock template structure based on the hook's data structures
export interface ExerciseTemplate {
  id: string;
  name: string;
  series: number;
  reps: string;
  peso: number;
  descanso: number;
  notas: string;
}

export interface WorkoutDayTemplate {
  id: string;
  name: string;
  exercises: ExerciseTemplate[];
}

export interface PlanTemplate {
  id: string;
  name: string;
  description: string;
  objective: string;
  days: WorkoutDayTemplate[];
  tags: string[];
}

// Mock templates for demonstration
const mockTemplates: PlanTemplate[] = [
  {
    id: 'template-1',
    name: 'Rutina de Hipertrofia - 5 Días',
    description: 'Una rutina intensa para maximizar el crecimiento muscular.',
    objective: 'Hipertrofia',
    days: [
      {
        id: 'day-1',
        name: 'Día 1: Pecho y Tríceps',
        exercises: [
          { id: 'ex-1', name: 'Press de Banca', series: 4, reps: '8-10', peso: 80, descanso: 90, notas: 'Foco en la contracción.' },
          { id: 'ex-2', name: 'Fondos en paralelas', series: 3, reps: 'Al fallo', peso: 0, descanso: 60, notas: '' },
        ],
      },
    ],
    tags: ['Hipertrofia', '5 días', 'Avanzado'],
  },
  {
    id: 'template-2',
    name: 'Fuerza Total - Powerlifting',
    description: 'Enfocado en los tres grandes levantamientos.',
    objective: 'Fuerza',
    days: [],
    tags: ['Fuerza', 'Powerlifting', '3 días'],
  },
  {
    id: 'template-3',
    name: 'Acondicionamiento para Principiantes',
    description: 'Plan de 3 días para empezar en el gimnasio.',
    objective: 'Acondicionamiento',
    days: [],
    tags: ['Principiante', '3 días', 'Full Body'],
  },
];

interface ImportFromTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (template: PlanTemplate) => void;
}

const ImportFromTemplateModal: React.FC<ImportFromTemplateModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [templates, setTemplates] = useState<PlanTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PlanTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTemplates(mockTemplates);
        setLoading(false);
      }, 500);
    }
  }, [isOpen]);

  const handleImport = () => {
    if (selectedTemplate) {
      onImport(selectedTemplate);
      onClose();
    }
  };

  const filteredTemplates = templates.filter((template) => {
    const nameMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const tagsMatch = filterTags.every(tag => template.tags.includes(tag));
    return nameMatch && tagsMatch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-lg p-6 w-full max-w-2xl text-text">
        <h2 className="text-2xl font-bold mb-4">Importar desde Plantilla</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-backgroundSecondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-focus"
          />
          <TagInput tags={filterTags} setTags={setFilterTags} placeholder="Filtrar por etiquetas..." />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <p>Cargando plantillas...</p>
          ) : (
            <ul className="space-y-2">
              {filteredTemplates.map((template) => (
                <li
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'bg-primary text-white'
                      : 'bg-backgroundSecondary hover:bg-card'
                  }`}
                >
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-textMuted">{template.description}</p>
                  <div className="mt-2">
                    {template.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedTemplate}
            variant="secondary"
          >
            Importar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportFromTemplateModal;
