import React from 'react';
import { useParams } from 'react-router-dom';
import { usePerfildelCliente } from './hooks/usePerfildelCliente';
import { ProgressMetricsChart } from './components/ProgressMetricsChart';
import ClientPaymentsHistory from './components/ClientPaymentsHistory';

const PerfildelClientePage: React.FC = () => {
  // Assuming you are using react-router and have a client ID in the URL
  const { id: clientId } = useParams<{ id: string }>();
  
  // Using a mock ID if none is provided by the router
  const finalClientId = clientId || 'mock-client-123';

  const { progressData, payments, isLoading, error } = usePerfildelCliente(finalClientId);

  return (
    <div className="p-6 bg-background text-text">
      <h1 className="text-3xl font-bold mb-6">Perfil del Cliente</h1>
      
      {/* Placeholder for other client info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Información General</h2>
          <p className="text-textSecondary">ID del Cliente: {finalClientId}</p>
          {/* More client details would go here */}
        </div>

        <div className="lg:col-span-3">
          {isLoading && <p className="text-center text-textMuted">Cargando datos...</p>}
          {error && <p className="text-center text-error">{error}</p>}
          
          {!isLoading && !error && (
            <div className="space-y-6">
              {progressData.length > 0 ? (
                <ProgressMetricsChart data={progressData} />
              ) : (
                <div className="bg-card p-6 rounded-lg shadow-md text-center">
                  <p className="text-textMuted">No hay datos de progreso disponibles para este cliente.</p>
                </div>
              )}
              
              <ClientPaymentsHistory payments={payments} loading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfildelClientePage;
