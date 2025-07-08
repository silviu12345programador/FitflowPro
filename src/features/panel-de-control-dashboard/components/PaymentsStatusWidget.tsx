import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaymentsStatus } from '../hooks/usePaymentsStatus';

const PaymentsStatusWidget: React.FC = () => {
  const navigate = useNavigate();
  const { upcomingPayments, overduePayments, isLoading, error } = usePaymentsStatus();

  const handleUpcomingClick = () => {
    navigate('/billing?status=upcoming');
  };

  const handleOverdueClick = () => {
    navigate('/billing?status=overdue');
  };

  const handleSendReminders = () => {
    // TODO: Implement reminder logic
    alert('Enviando recordatorios a todos los clientes con pagos vencidos...');
  };

  return (
    <div className="bg-surface text-text shadow-lg rounded-lg p-6 space-y-4 col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold text-textSecondary">Estado de Pagos</h2>
      {isLoading && <p className="text-textMuted">Cargando estado de pagos...</p>}
      {error && <p className="text-error">{error}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Payments */}
          <div
            onClick={handleUpcomingClick}
            className="bg-infoDark/20 p-4 rounded-lg cursor-pointer hover:bg-infoDark/30 transition"
          >
            <h3 className="font-bold text-infoLight">Próximos Pagos (7 días)</h3>
            <p className="text-3xl font-bold text-infoLight">
              ${upcomingPayments?.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-textMuted">
              {upcomingPayments?.clientCount} clientes
            </p>
          </div>

          {/* Overdue Payments */}
          <div
            onClick={handleOverdueClick}
            className="bg-errorDark/20 p-4 rounded-lg cursor-pointer hover:bg-errorDark/30 transition"
          >
            <h3 className="font-bold text-errorLight">Pagos Vencidos</h3>
            <p className="text-3xl font-bold text-errorLight">
              ${overduePayments?.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-textMuted">
              {overduePayments?.clientCount} clientes
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when clicking the button
                handleSendReminders();
              }}
              className="mt-2 bg-warning text-textInverse py-1 px-3 rounded-md text-sm hover:bg-warningDark transition"
            >
              Enviar Recordatorio a Todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsStatusWidget;
