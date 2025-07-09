import React from 'react';
import { Template } from '../hooks/useBibliotecadePlantillas';
import { TemplateCard } from './TemplateCard';

interface TemplateCardGridProps {
  templates: Template[];
  selectedTemplateIds: string[];
  onSelectTemplate: (templateId: string) => void;
  onPreview: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onAssign: (template: Template) => void;
  onEdit: (template: Template) => void;
  onAnalytics: (templateId: string) => void;
}

export const TemplateCardGrid: React.FC<TemplateCardGridProps> = ({
  templates,
  selectedTemplateIds,
  onSelectTemplate,
  onPreview,
  onDuplicate,
  onAssign,
  onEdit,
  onAnalytics,
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-text">No se encontraron plantillas</h2>
        <p className="text-textMuted mt-2">Intenta ajustar los filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplateIds.includes(template.id)}
          onSelect={onSelectTemplate}
          onPreview={onPreview}
          onDuplicate={onDuplicate}
          onAssign={onAssign}
          onAnalytics={onAnalytics}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
