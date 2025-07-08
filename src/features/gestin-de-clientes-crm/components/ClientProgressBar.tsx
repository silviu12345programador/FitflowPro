import React from 'react';

interface ClientProgressBarProps {
  progress: number;
}

const ClientProgressBar: React.FC<ClientProgressBarProps> = ({ progress }) => {
  const getProgressColor = () => {
    if (progress < 30) return 'bg-error';
    if (progress < 70) return 'bg-warning';
    return 'bg-success';
  };

  const colorClass = getProgressColor();

  return (
    <div className="flex items-center" title={`${progress}%`}>
      <div className="w-full bg-surface rounded-full h-2.5">
        <div
          className={`${colorClass} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-textSecondary ml-3">{progress}%</span>
    </div>
  );
};

export default ClientProgressBar;
