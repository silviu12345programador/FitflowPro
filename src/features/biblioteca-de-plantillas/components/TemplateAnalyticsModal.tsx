
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { X } from 'lucide-react';

// Mock data - in a real scenario, this would come from the API
const analyticsData = {
  adherenceRate: 85,
  avgProgress: 72,
  popularity: [
    { name: 'Ene', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ],
};

interface TemplateAnalyticsModalProps {
  templateId: string;
  onClose: () => void;
}

const TemplateAnalyticsModal = ({ templateId, onClose }: TemplateAnalyticsModalProps) => {
  // In a real implementation, you would use a hook like:
  // const { data: analyticsData, isLoading, error } = useTemplateAnalytics(templateId);
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading analytics.</div>;

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-lg p-8 w-full max-w-4xl text-text relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-textMuted hover:text-text">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primaryLight">Analíticas de la Plantilla: {templateId}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-4 rounded-lg text-center">
            <h3 className="text-textMuted text-sm font-bold uppercase">Tasa de Adherencia</h3>
            <p className="text-4xl font-bold text-success">{analyticsData.adherenceRate}%</p>
          </div>
          <div className="bg-card p-4 rounded-lg text-center">
            <h3 className="text-textMuted text-sm font-bold uppercase">Progreso Promedio</h3>
            <p className="text-4xl font-bold text-info">{analyticsData.avgProgress}%</p>
          </div>
           <div className="bg-card p-4 rounded-lg text-center">
            <h3 className="text-textMuted text-sm font-bold uppercase">Popularidad</h3>
            <p className="text-4xl font-bold text-accent">Top 10%</p>
          </div>
        </div>

        <div className="h-80">
            <h3 className="text-xl font-bold mb-4 text-center text-textSecondary">Popularidad de la Plantilla (Últimos 6 meses)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={analyticsData.popularity}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                    contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#374151',
                    }}
                />
                <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                <Line type="monotone" dataKey="pv" name="Asignaciones" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" name="Completados" stroke="#10B981" />
                </LineChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default TemplateAnalyticsModal;
