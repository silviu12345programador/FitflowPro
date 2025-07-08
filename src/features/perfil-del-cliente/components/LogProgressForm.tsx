import React, { useState } from 'react';
import Button from '../../../components/Button';

interface LogProgressFormProps {
  onLogProgress: (data: { date: string; metric: string; value: number }) => Promise<void>;
  clientId: string;
}

const LogProgressForm: React.FC<LogProgressFormProps> = ({ onLogProgress }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [metric, setMetric] = useState('peso');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setError('El valor debe ser un número.');
      return;
    }

    try {
      await onLogProgress({ date, metric, value: numericValue });
      setSuccess('Medición registrada con éxito.');
      setDate(new Date().toISOString().split('T')[0]);
      setMetric('peso');
      setValue('');
    } catch (err) {
      setError('Error al registrar la medición.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-end">
      <div className="flex-1">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="metric" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Métrica</label>
        <select
          id="metric"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        >
          <option value="peso">Peso (kg)</option>
          <option value="grasa_corporal">Grasa Corporal (%)</option>
          <option value="medida_cintura">Cintura (cm)</option>
          <option value="medida_cadera">Cadera (cm)</option>
          <option value="medida_pecho">Pecho (cm)</option>
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Valor</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
          placeholder="Escribe un valor..."
        />
      </div>
      <div className="flex-shrink-0">
        <Button type="submit" className="w-full md:w-auto" style={{ backgroundColor: '#F59E0B' }}>
          Registrar
        </Button>
      </div>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      {success && <p className="text-success text-sm mt-2">{success}</p>}
    </form>
  );
};

export default LogProgressForm;
