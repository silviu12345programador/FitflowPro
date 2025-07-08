import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';
import { useClientProgressChart, TimePeriod } from '../hooks/useClientProgressChart';

import { TooltipProps } from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-backgroundSecondary border border-border rounded-lg shadow-lg">
        <p className="label text-text font-bold">{`${label}`}</p>
        <p className="intro text-primary">{`Adherencia : ${payload[0].value.toFixed(2)}%`}</p>
        <p className="intro text-secondary">{`Nuevos Registros : ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const ClientProgressChart: React.FC = () => {
  const { data, isLoading, error, period, changePeriod } = useClientProgressChart();

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changePeriod(event.target.value as TimePeriod);
  };

  return (
    <div className="bg-surface shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-textSecondary">Progreso General de Clientes</h2>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="bg-backgroundSecondary text-text rounded-md px-3 py-1 border border-border focus:outline-none focus:ring-2 focus:ring-focus"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Último mes</option>
          <option value="90d">Últimos 3 meses</option>
        </select>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-textMuted">Cargando datos del gráfico...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-error">{error}</p>
          </div>
        )}
        {!isLoading && !error && data.length > 0 && (
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecords" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <YAxis yAxisId="left" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#E2E8F0' }} />
              <Area
                type="monotone"
                dataKey="adherence"
                name="Adherencia Promedio (%)"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorAdherence)"
                yAxisId="left"
              />
              <Area
                type="monotone"
                dataKey="newProgressRecords"
                name="Nuevos Registros de Progreso"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRecords)"
                yAxisId="right"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
         {!isLoading && !error && data.length === 0 && (
            <div className="flex items-center justify-center h-full">
                <p className="text-textMuted">No hay datos disponibles para el período seleccionado.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ClientProgressChart;
