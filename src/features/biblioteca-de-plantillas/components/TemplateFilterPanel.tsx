import React from 'react';
import { TagInput } from '../../creador-de-planes-de-entrenamiento/components/TagInput';

type TemplateType = 'Todos' | 'Entrenamiento' | 'Nutrición';

interface TemplateFilterPanelProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedType: TemplateType;
  onSelectedTypeChange: (type: TemplateType) => void;
  selectedTags: string[];
  onSelectedTagsChange: (tags: string[]) => void;
  allTags: string[];
  onClearFilters: () => void;
}

export const TemplateFilterPanel: React.FC<TemplateFilterPanelProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedType,
  onSelectedTypeChange,
  selectedTags,
  onSelectedTagsChange,
  allTags,
  onClearFilters,
}) => {
  const templateTypes: TemplateType[] = ['Todos', 'Entrenamiento', 'Nutrición'];

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg mb-8 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search by name */}
        <div className="md:col-span-1">
          <label htmlFor="search-template" className="block text-sm font-medium text-textSecondary mb-2">
            Buscar por nombre
          </label>
          <input
            id="search-template"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Ej: Rutina de fuerza"
            className="w-full bg-backgroundSecondary border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter by type */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-textSecondary mb-2">
            Filtrar por tipo
          </label>
          <div className="flex items-center space-x-2 bg-backgroundSecondary rounded-md p-1 border border-border">
            {templateTypes.map((type) => (
              <button
                key={type}
                onClick={() => onSelectedTypeChange(type)}
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
                  selectedType === type
                    ? 'bg-primary text-white shadow'
                    : 'bg-transparent text-textMuted hover:bg-primaryHover/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by tags */}
        <div className="md:col-span-1">
           <label className="block text-sm font-medium text-textSecondary mb-2">
            Filtrar por etiquetas
          </label>
          <TagInput
            tags={selectedTags}
            setTags={onSelectedTagsChange}
            availableTags={allTags}
            placeholder="Añadir etiquetas para filtrar..."
          />
        </div>
      </div>

      {/* Clear filters button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-textMuted hover:text-primary transition-colors duration-200"
        >
          Limpiar todos los filtros
        </button>
      </div>
    </div>
  );
};