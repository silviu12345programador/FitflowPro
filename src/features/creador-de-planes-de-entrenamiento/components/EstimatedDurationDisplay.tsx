// src/features/creador-de-planes-de-entrenamiento/components/EstimatedDurationDisplay.tsx
import React from 'react';
import { Clock } from 'lucide-react';

interface EstimatedDurationDisplayProps {
  duration: number; // Duration in minutes
}

const EstimatedDurationDisplay: React.FC<EstimatedDurationDisplayProps> = ({ duration }) => {
  return (
    <div className="flex items-center text-sm font-semibold text-gray-500">
      <Clock className="mr-2 h-4 w-4" />
      <span>~ {Math.round(duration)} min</span>
    </div>
  );
};

export default EstimatedDurationDisplay;
