import React from 'react';
import { Template } from '../hooks/useBibliotecadePlantillas';
import UsageStatsIndicator from './UsageStatsIndicator';
import { BarChart2, FilePenLine } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onAssign: (template: Template) => void;
  onAnalytics: (templateId: string) => void;
  onEdit: (template: Template) => void;
  activeUsageCount?: number;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
  onDuplicate,
  onAssign,
  onAnalytics,
  onEdit,
  activeUsageCount = 0,
}) => {
  const { id, name, type, description, tags } = template;

  const handleSelect = () => {
    onSelect(id);
  };

  return (
    <div
      className={`relative bg-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border ${
        isSelected ? 'border-primary' : 'border-border'
      }`}
      onClick={handleSelect}
    >
      <div className="absolute top-2 right-2 flex gap-2">
        <UsageStatsIndicator count={activeUsageCount} />
        <button
            onClick={(e) => {
                e.stopPropagation();
                onAnalytics(id);
            }}
            className="p-2 bg-accent rounded-full text-white hover:bg-accentHover transition-colors"
            title="Ver analíticas"
            >
            <BarChart2 size={16} />
        </button>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onEdit(template);
            }}
            className="p-2 bg-info rounded-full text-white hover:bg-infoDark transition-colors"
            title="Editar"
            >
            <FilePenLine size={16} />
        </button>
      </div>
      <div className="p-6 flex-grow pt-12">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              type === 'Entrenamiento'
                ? 'bg-primary/20 text-primaryLight'
                : 'bg-secondary/20 text-secondaryLight'
            }`}
          >
            {type}
          </span>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            className="form-checkbox h-5 w-5 text-primary bg-surface border-border rounded focus:ring-primary"
            onClick={(e) => e.stopPropagation()} // Prevent card click from firing twice
          />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">{name}</h3>
        <p className="text-textMuted text-sm mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded bg-surface text-textSecondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 bg-surface mt-auto grid grid-cols-3 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}
          className="text-sm bg-secondary text-white font-semibold py-2 px-2 rounded-md hover:bg-secondaryHover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-secondary"
        >
          Previsualizar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAssign(template);
          }}
          className="text-sm bg-primary text-white font-semibold py-2 px-2 rounded-md hover:bg-primaryHover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
        >
          Asignar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(template);
          }}
          className="text-sm bg-muted text-white font-semibold py-2 px-2 rounded-md hover:bg-opacity-80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-focus"
        >
          Duplicar
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
