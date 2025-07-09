import React, { useState } from 'react';
import { useBibliotecadePlantillas, Template } from './hooks/useBibliotecadePlantillas';
import { TemplateFilterPanel } from './components/TemplateFilterPanel';
import { TemplateCardGrid } from './components/TemplateCardGrid';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import DuplicateTemplateModal from './components/DuplicateTemplateModal';
import AssignTemplateModal from './components/AssignTemplateModal';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import { EditTemplateMetadataModal } from './components/EditTemplateMetadataModal';
import TemplateAnalyticsModal from './components/TemplateAnalyticsModal';
import { duplicateTemplateApi, updateTemplateMetadata } from './api';

// Tipos de datos de ejemplo para la plantilla
interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutTemplate {
  id:string;
  type: 'workout';
  name: string;
  description: string;
  estimatedDuration: string;
  exercises: Exercise[];
}

interface NutritionTemplate {
  id: string;
  type: 'nutrition';
  name: string;
  description: string;
  totalCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

type TemplateData = WorkoutTemplate | NutritionTemplate;


const BibliotecadePlantillasPage: React.FC = () => {
  const {
    templates,
    allTags,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedTags,
    setSelectedTags,
    handleClearFilters,
    addTemplate,
    deleteTemplates,
    updateTemplate,
    isAnalyticsModalOpen,
    selectedTemplateIdForAnalytics,
    openAnalyticsModal,
    closeAnalyticsModal,
  } = useBibliotecadePlantillas();

  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [templateToDuplicate, setTemplateToDuplicate] = useState<Template | null>(null);
  const [templateToAssign, setTemplateToAssign] = useState<Template | null>(null);
  const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateIds((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleDeselectAll = () => {
    setSelectedTemplateIds([]);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${selectedTemplateIds.length} plantillas?`)) {
      deleteTemplates(selectedTemplateIds);
      setSelectedTemplateIds([]);
    }
  };

  const handlePreview = async (template: Template) => {
    const detailedTemplate: TemplateData = {
      id: template.id,
      type: 'workout',
      name: template.name,
      description: template.description,
      estimatedDuration: '60 mins',
      exercises: [
        { id: 'ex1', name: 'Press de Banca', sets: 4, reps: '8-12', rest: '60s' },
        { id: 'ex2', name: 'Sentadillas', sets: 4, reps: '10-15', rest: '90s' },
        { id: 'ex3', name: 'Peso Muerto', sets: 3, reps: '6-8', rest: '120s' },
      ],
    };
    setSelectedTemplate(detailedTemplate);
    setIsPreviewing(true);
  };

  const handleClosePreview = () => {
    setIsPreviewing(false);
    setSelectedTemplate(null);
  };

  const handleOpenDuplicateModal = (template: Template) => {
    setTemplateToDuplicate(template);
    setIsDuplicating(true);
  };

  const handleCloseDuplicateModal = () => {
    setIsDuplicating(false);
    setTemplateToDuplicate(null);
  };

  const handleConfirmDuplicate = async (newName: string) => {
    if (!templateToDuplicate) return;

    try {
      const newTemplate = await duplicateTemplateApi(templateToDuplicate.id, newName);
      addTemplate(newTemplate);
    } catch (error) {
      console.error("Error al duplicar la plantilla:", error);
    } finally {
      handleCloseDuplicateModal();
    }
  };

  const handleOpenAssignModal = (template: Template) => {
    setTemplateToAssign(template);
    setIsAssigning(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssigning(false);
    setTemplateToAssign(null);
  };

  const handleConfirmAssign = (clientIds: string[], startDate: string) => {
    if (!templateToAssign) return;
    console.log(
      `Asignando plantilla "${templateToAssign.name}" a ${clientIds.length} cliente(s) para el ${startDate}.`
    );
    handleCloseAssignModal();
  };

  const handleOpenEditModal = (template: Template) => {
    setTemplateToEdit(template);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setTemplateToEdit(null);
  };

  const handleConfirmEdit = async (updatedTemplate: Template) => {
    try {
      const savedTemplate = await updateTemplateMetadata(updatedTemplate.id, {
        name: updatedTemplate.name,
        tags: updatedTemplate.tags,
        description: updatedTemplate.description,
      });
      updateTemplate(savedTemplate);
    } catch (error) {
      console.error("Error al actualizar la plantilla:", error);
    } finally {
      handleCloseEditModal();
    }
  };

  const handleAssignFromPreview = (templateId: string) => {
    console.log(`Asignando plantilla ${templateId}`);
    handleClosePreview();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text">
            Biblioteca de Plantillas
          </h1>
          <p className="text-lg text-textMuted mt-2">
            Encuentra, gestiona y reutiliza tus planes de entrenamiento y nutrición.
          </p>
        </div>
        <button className="mt-4 sm:mt-0 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition-colors duration-300 shadow-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Crear Plantilla</span>
        </button>
      </header>

      <TemplateFilterPanel
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedType={selectedType}
        onSelectedTypeChange={setSelectedType}
        selectedTags={selectedTags}
        onSelectedTagsChange={setSelectedTags}
        allTags={allTags}
        onClearFilters={handleClearFilters}
      />

      <TemplateCardGrid 
        templates={templates}
        selectedTemplateIds={selectedTemplateIds}
        onSelectTemplate={handleSelectTemplate}
        onPreview={handlePreview}
        onDuplicate={handleOpenDuplicateModal}
        onAssign={handleOpenAssignModal}
        onEdit={handleOpenEditModal}
        onAnalytics={openAnalyticsModal}
      />

      <BulkActionsToolbar
        selectedCount={selectedTemplateIds.length}
        onDeleteSelected={handleDeleteSelected}
        onDeselectAll={handleDeselectAll}
      />

      {isPreviewing && selectedTemplate && (
        <TemplatePreviewModal
          templateData={selectedTemplate}
          onClose={handleClosePreview}
          onAssign={() => handleAssignFromPreview(selectedTemplate.id)}
          onEdit={() => handleOpenEditModal(selectedTemplate as unknown as Template)}
        />
      )}

      {isDuplicating && templateToDuplicate && (
        <DuplicateTemplateModal
          templateId={templateToDuplicate.id}
          templateName={templateToDuplicate.name}
          onClose={handleCloseDuplicateModal}
          onConfirm={handleConfirmDuplicate}
        />
      )}

      {isAssigning && templateToAssign && (
        <AssignTemplateModal
          templateId={templateToAssign.id}
          templateName={templateToAssign.name}
          onClose={handleCloseAssignModal}
          onAssign={handleConfirmAssign}
        />
      )}

      {isEditing && templateToEdit && (
        <EditTemplateMetadataModal
          template={templateToEdit}
          isOpen={isEditing}
          onClose={handleCloseEditModal}
          onSave={handleConfirmEdit}
        />
      )}

      {isAnalyticsModalOpen && selectedTemplateIdForAnalytics && (
        <TemplateAnalyticsModal
            templateId={selectedTemplateIdForAnalytics}
            onClose={closeAnalyticsModal}
        />
      )}
    </div>
  );
};

export default BibliotecadePlantillasPage;
