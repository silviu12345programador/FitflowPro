
import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data structure, assuming this comes from a hook or API
export interface ProgressData {
  date: string; // "YYYY-MM-DD"
  metric: 'peso' | '% grasa corporal' | 'masa muscular';
  value: number;
}

interface ProgressMetricsChartProps {
  data: ProgressData[];
}

const metricColors = {
  'peso': '#3B82F6', // primary
  '% grasa corporal': '#10B981', // secondary
  'masa muscular': '#F59E0B', // accent
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card text-textSecondary rounded-lg shadow-md border border-border">
        <p className="label">{`Fecha: ${label}`}</p>
        <p className="intro" style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const ProgressMetricsChart = ({ data }: ProgressMetricsChartProps) => {
  const availableMetrics = useMemo(() => [...new Set(data.map(d => d.metric))], [data]);
  const [selectedMetric, setSelectedMetric] = useState<'peso' | '% grasa corporal' | 'masa muscular'>(availableMetrics[0] || 'peso');
  const [dateRange, setDateRange] = useState('all'); // '30d', '3m', 'all'

  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate = new Date(0); // The beginning of time

    if (dateRange === '30d') {
      startDate = new Date(new Date().setDate(now.getDate() - 30));
    } else if (dateRange === '3m') {
      startDate = new Date(new Date().setMonth(now.getMonth() - 3));
    }
    
    return data
      .filter(d => d.metric === selectedMetric && new Date(d.date) >= startDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, selectedMetric, dateRange]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text">Seguimiento de Progreso</h3>
        <div className="flex items-center gap-4">
           <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-surface text-textSecondary p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-focus"
          >
            <option value="30d">Últimos 30 días</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="all">Todo</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="bg-surface text-textSecondary p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-focus"
          >
            {availableMetrics.map(metric => (
              <option key={metric} value={metric}>{metric.charAt(0).toUpperCase() + metric.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={filteredData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="date" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
            stroke={metricColors[selectedMetric]} 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
