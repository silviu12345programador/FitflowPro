
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaneldeControlDashboard } from '../hooks/usePaneldeControlDashboard';

const ActiveClientsSummaryCard: React.FC = () => {
  const navigate = useNavigate();
  const { activeClients, isLoading, error } = usePaneldeControlDashboard();

  const handleClick = () => {
    navigate('/clients');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-surface text-text shadow-lg rounded-lg p-6 flex items-center justify-between transition hover:shadow-xl cursor-pointer hover:bg-card"
    >
      <div>
        <p className="text-textMuted">Clientes Activos</p>
        {isLoading && <p className="text-2xl font-bold text-primary">Cargando...</p>}
        {error && <p className="text-2xl font-bold text-error">{error}</p>}
        {activeClients !== null && !isLoading && !error && (
          <p className="text-4xl font-bold text-primary">{activeClients}</p>
        )}
      </div>
      <div className="text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.121-1.278-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.121-1.278.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>
  );
};

export default ActiveClientsSummaryCard;
