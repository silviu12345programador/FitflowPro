import React from 'react';
import { Link } from 'react-router-dom';
import { useClientAlerts, AlertType } from '../hooks/useClientAlerts';

const AlertIcon: React.FC<{ type: AlertType }> = ({ type }) => {
  const commonClasses = "w-6 h-6";
  switch (type) {
    case 'missed_checkin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} text-warning`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'no_login':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} text-info`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      );
    case 'no_workout':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
};

const ClientAlertsPanel: React.FC = () => {
  const { alerts, isLoading, error, dismissAlert } = useClientAlerts();

  const getCriticalityClasses = (criticality: string) => {
    switch (criticality) {
      case 'high':
        return 'bg-errorDark/20 border-l-4 border-error';
      case 'medium':
        return 'bg-warningDark/20 border-l-4 border-warning';
      case 'low':
        return 'bg-infoDark/20 border-l-4 border-info';
      default:
        return 'bg-surface border-l-4 border-gray-500';
    }
  };

  return (
    <div className="bg-surface text-text shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-textSecondary mb-4">Alertas de Clientes en Riesgo</h2>
      
      {isLoading && <p className="text-textMuted">Cargando alertas...</p>}
      {error && <p className="text-error">{error}</p>}

      {!isLoading && !error && alerts.length === 0 && (
        <div className="text-center py-4">
          <p className="text-lg text-success">¡Todo en orden!</p>
          <p className="text-textMuted">Ningún cliente requiere atención especial.</p>
        </div>
      )}

      {!isLoading && !error && alerts.length > 0 && (
        <ul className="space-y-3">
          {alerts.slice(0, 5).map(alert => (
            <li key={alert.id} className={`flex items-center gap-4 p-3 rounded-md transition-all hover:shadow-md ${getCriticalityClasses(alert.criticality)}`}>
              <Link to={`/clients/${alert.id}`} className="flex items-center gap-4 flex-grow">
                <AlertIcon type={alert.alertType} />
                <img src={alert.profilePictureUrl} alt={alert.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-grow">
                  <p className="font-bold text-textSecondary">{alert.name}</p>
                  <p className="text-sm text-textMuted">{alert.alertReason}</p>
                </div>
              </Link>
              <button 
                onClick={() => dismissAlert(alert.id)}
                className="text-textMuted hover:text-text transition"
                aria-label={`Descartar alerta de ${alert.name}`}
                title="Descartar alerta"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAlertsPanel;
