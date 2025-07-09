
import React, { useState } from 'react';
import { createExercise } from '../api';

interface Props {
  onClose: () => void;
  onExerciseCreated: () => void;
}

export const CreateCustomExerciseModal: React.FC<Props> = ({ onClose, onExerciseCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !muscleGroup.trim()) {
      setError('El nombre y el grupo muscular son campos requeridos.');
      return;
    }

    if (!validateUrl(videoUrl)) {
      setError('La URL del video no es válida.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createExercise({
        name,
        description,
        muscle_group: muscleGroup,
        video_url: videoUrl || null,
      });
      onExerciseCreated();
      onClose();
    } catch (err) {
      setError('Error al crear el ejercicio. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-text mb-6">Crear Ejercicio Personalizado</h2>
        {error && <p className="bg-errorLight text-errorDark p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-textSecondary text-sm font-bold mb-2">
              Nombre del Ejercicio
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-backgroundSecondary text-text p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="muscleGroup" className="block text-textSecondary text-sm font-bold mb-2">
              Grupo Muscular
            </label>
            <input
              id="muscleGroup"
              type="text"
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="w-full bg-backgroundSecondary text-text p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-textSecondary text-sm font-bold mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-backgroundSecondary text-text p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="videoUrl" className="block text-textSecondary text-sm font-bold mb-2">
              URL del Video (Opcional)
            </label>
            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-backgroundSecondary text-text p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://ejemplo.com/video.mp4"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-muted hover:bg-opacity-80 text-text font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Ejercicio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
