import React from 'react';
import { Users } from 'lucide-react';

interface UsageStatsIndicatorProps {
  count: number;
}

const UsageStatsIndicator: React.FC<UsageStatsIndicatorProps> = ({ count }) => {
  if (count === 0) {
    return null;
  }

  return (
    <div
      className="absolute top-2 right-2 flex items-center gap-1.5 bg-background/50 backdrop-blur-sm text-textMuted text-xs font-medium px-2 py-1 rounded-full border border-borderLight/50"
      title={`Asignado a ${count} cliente${count !== 1 ? 's' : ''} activo${count !== 1 ? 's' : ''}`}
    >
      <Users className="w-3 h-3" />
      <span>{count}</span>
    </div>
  );
};

export default UsageStatsIndicator;