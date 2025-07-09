import React from 'react';

interface MacroSummaryProps {
  current: number;
  goal: number;
  label: string;
}

const MacroSummaryCard: React.FC<MacroSummaryProps> = ({
  current,
  goal,
  label,
}) => {
  const percentage = goal > 0 ? (current / goal) * 100 : 0;
  const percentageClamped = Math.min(percentage, 100);

  const getProgressBarColor = () => {
    if (percentage > 110) return 'bg-error';
    if (percentage > 90) return 'bg-success';
    if (percentage > 75) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h4 className="text-textMuted font-bold text-sm">{label}</h4>
        <p className="text-text text-2xl font-bold">
          {Math.round(current)}
          <span className="text-textMuted text-lg"> / {goal}</span>
        </p>
      </div>
      <div className="w-full bg-backgroundSecondary rounded-full h-2.5 mt-2">
        <div
          className={`h-2.5 rounded-full ${getProgressBarColor()}`}
          style={{ width: `${percentageClamped}%` }}
        ></div>
      </div>
    </div>
  );
};

interface MacroSummaryHeaderProps {
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const MacroSummaryHeader: React.FC<MacroSummaryHeaderProps> = ({
  totals,
  goals,
}) => {
  return (
    <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm p-4 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MacroSummaryCard
        current={totals.calories}
        goal={goals.calories}
        label="Calorías"
      />
      <MacroSummaryCard
        current={totals.protein}
        goal={goals.protein}
        label="Proteínas (g)"
      />
      <MacroSummaryCard
        current={totals.carbs}
        goal={goals.carbs}
        label="Carbohidratos (g)"
      />
      <MacroSummaryCard
        current={totals.fat}
        goal={goals.fat}
        label="Grasas (g)"
      />
    </div>
  );
};

export default MacroSummaryHeader;