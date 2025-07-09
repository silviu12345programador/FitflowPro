import React from 'react';

type ProgressionRule = {
  type: 'weight' | 'reps';
  value: number;
  frequency: 'weekly' | 'biweekly';
};

interface ProgressiveOverloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: ProgressionRule) => void;
  exerciseName: string;
}

const ProgressiveOverloadModal: React.FC<ProgressiveOverloadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  exerciseName,
}) => {
  const [type, setType] = React.useState<'weight' | 'reps'>('weight');
  const [value, setValue] = React.useState(2.5);
  const [frequency, setFrequency] = React.useState<'weekly' | 'biweekly'>('weekly');

  const handleSave = () => {
    onSave({ type, value, frequency });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay z-50 flex justify-center items-center">
      <div className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-text">
          Progressive Overload for {exerciseName}
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="progression-type" className="block text-sm font-medium text-textSecondary">
              Progression Type
            </label>
            <select
              id="progression-type"
              value={type}
              onChange={(e) => setType(e.target.value as 'weight' | 'reps')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-surface text-text"
            >
              <option value="weight">Weight (kg)</option>
              <option value="reps">Repetitions</option>
            </select>
          </div>
          <div>
            <label htmlFor="increment-value" className="block text-sm font-medium text-textSecondary">
              Increment Value
            </label>
            <input
              type="number"
              id="increment-value"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-surface text-text"
              step={type === 'weight' ? '0.5' : '1'}
            />
          </div>
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-textSecondary">
              Frequency
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'weekly' | 'biweekly')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-surface text-text"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-surface text-text rounded-md hover:bg-backgroundSecondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-textInverse rounded-md hover:bg-primaryHover"
          >
            Save Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveOverloadModal;