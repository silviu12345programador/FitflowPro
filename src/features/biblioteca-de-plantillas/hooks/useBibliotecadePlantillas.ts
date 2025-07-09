
import { useState, useMemo, useCallback } from 'react';
import { getTemplateAnalytics } from '../api';

// Placeholder for template data structure
export interface Template {
  id: string;
  name: string;
  type: 'Entrenamiento' | 'Nutrición';
  tags: string[];
  description: string;
  createdAt?: string; // Optional as new templates might not have it
}

// Placeholder for analytics data structure
export interface TemplateAnalytics {
    templateId: string;
    adherenceRate: number;
    avgProgress: number;
    popularity: { name: string; uv: number; pv: number; amt: number; }[];
    totalAssignments: number;
    completionRate: number;
}

// Placeholder data
const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: 'Full Body Básico', type: 'Entrenamiento', tags: ['fuerza', 'principiante', 'gimnasio'], description: 'Rutina de cuerpo completo para iniciación.', createdAt: '2023-10-26' },
  { id: '2', name: 'Plan Nutricional Pérdida de Peso', type: 'Nutrición', tags: ['déficit', 'saludable'], description: 'Dieta hipocalórica para perder grasa.', createdAt: '2023-10-25' },
  { id: '3', name: 'Entrenamiento de Hipertrofia PPL', type: 'Entrenamiento', tags: ['hipertrofia', 'avanzado', 'ppl'], description: 'Rutina Push/Pull/Legs para ganancia muscular.', createdAt: '2023-10-24' },
  { id: '4', name: 'Dieta Vegana Alta en Proteína', type: 'Nutrición', tags: ['vegano', 'proteína'], description: 'Plan de comidas vegano para deportistas.', createdAt: '2023-10-22' },
  { id: '5', name: 'Rutina de Cardio HIIT', type: 'Entrenamiento', tags: ['cardio', 'hiit', 'quema grasa'], description: 'Entrenamiento interválico de alta intensidad.', createdAt: '2023-10-20' },
  { id: '6', name: 'Plan de Volumen Limpio', type: 'Nutrición', tags: ['volumen', 'superávit'], description: 'Dieta hipercalórica para ganar masa muscular magra.', createdAt: '2023-10-18' },
];


export const useBibliotecadePlantillas = () => {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'Todos' | 'Entrenamiento' | 'Nutrición'>('Todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [isAnalyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [selectedTemplateIdForAnalytics, setSelectedTemplateIdForAnalytics] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<TemplateAnalytics | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    templates.forEach(template => {
      template.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const searchTermMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = selectedType === 'Todos' || template.type === selectedType;
      const tagsMatch = selectedTags.length === 0 || selectedTags.every(tag => template.tags.includes(tag));
      return searchTermMatch && typeMatch && tagsMatch;
    }).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }, [templates, searchTerm, selectedType, selectedTags]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('Todos');
    setSelectedTags([]);
  };

  const addTemplate = (newTemplate: Template) => {
    setTemplates(prevTemplates => [
        {...newTemplate, createdAt: new Date().toISOString()}, 
        ...prevTemplates
    ]);
  };

  const deleteTemplates = (templateIds: string[]) => {
    // Aquí iría la llamada a la API para borrar las plantillas
    // await deleteTemplatesApi(templateIds);
    setTemplates(prevTemplates =>
      prevTemplates.filter(template => !templateIds.includes(template.id))
    );
  };

  const updateTemplate = (updatedTemplate: Template) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === updatedTemplate.id ? { ...template, ...updatedTemplate } : template
      )
    );
  };

  const openAnalyticsModal = useCallback(async (templateId: string) => {
    setSelectedTemplateIdForAnalytics(templateId);
    setAnalyticsModalOpen(true);
    setIsLoadingAnalytics(true);
    try {
      const data = await getTemplateAnalytics(templateId);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to fetch template analytics", error);
      // Optionally, set some error state to show in the UI
    } finally {
      setIsLoadingAnalytics(false);
    }
  }, []);

  const closeAnalyticsModal = useCallback(() => {
    setAnalyticsModalOpen(false);
    setSelectedTemplateIdForAnalytics(null);
    setAnalyticsData(null);
  }, []);


  return {
    templates: filteredTemplates,
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
    analyticsData,
    isLoadingAnalytics,
    openAnalyticsModal,
    closeAnalyticsModal,
  };
};

