import React from 'react';

interface DayNotesSectionProps {
  warmup: string;
  generalNotes: string;
  cooldown: string;
  onNotesChange: (notes: {
    warmup?: string;
    generalNotes?: string;
    cooldown?: string;
  }) => void;
}

export const DayNotesSection: React.FC<DayNotesSectionProps> = ({
  warmup,
  generalNotes,
  cooldown,
  onNotesChange,
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-700 rounded-lg space-y-2">
      <h3 className="text-lg font-semibold text-text">Notas del Día</h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="warmup"
            className="block text-sm font-medium text-textSecondary"
          >
            Calentamiento
          </label>
          <textarea
            id="warmup"
            rows={3}
            className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm p-2 focus:ring-focus focus:border-focus"
            value={warmup}
            onChange={(e) => onNotesChange({ warmup: e.target.value })}
            placeholder="Ej: 5-10 min de cardio ligero, estiramientos dinámicos..."
          />
        </div>
        <div>
          <label
            htmlFor="generalNotes"
            className="block text-sm font-medium text-textSecondary"
          >
            Notas Generales
          </label>
          <textarea
            id="generalNotes"
            rows={4}
            className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm p-2 focus:ring-focus focus:border-focus"
            value={generalNotes}
            onChange={(e) => onNotesChange({ generalNotes: e.target.value })}
            placeholder="Ej: Enfocarse en la técnica, mantener el core apretado..."
          />
        </div>
        <div>
          <label
            htmlFor="cooldown"
            className="block text-sm font-medium text-textSecondary"
          >
            Enfriamiento
          </label>
          <textarea
            id="cooldown"
            rows={3}
            className="mt-1 block w-full bg-surface border border-border rounded-md shadow-sm p-2 focus:ring-focus focus:border-focus"
            value={cooldown}
            onChange={(e) => onNotesChange({ cooldown: e.target.value })}
            placeholder="Ej: 5-10 min de estiramientos estáticos, foam roller..."
          />
        </div>
      </div>
    </div>
  );
};