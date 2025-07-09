import React from 'react';
import Button from '../../../components/Button';
import { useGestióndePagos } from '../hooks/useGestióndePagos';

export const OverduePaymentsPanel: React.FC = () => {
  const { overduePayments, handleRetryPayment, handleSendReminder } = useGestióndePagos();

  if (overduePayments.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
      <h3 className="text-lg font-semibold text-red-800 mb-4">Pagos Vencidos</h3>
      <ul className="space-y-3">
        {overduePayments.map((payment) => (
          <li
            key={payment.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white rounded-md shadow-sm"
          >
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold text-gray-800">{payment.clientName}</p>
              <p className="text-sm text-gray-600">
                Monto: ${payment.amount.toFixed(2)} - Vencimiento: {payment.dueDate}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handleRetryPayment(payment.id)}>Reintentar Cobro</Button>
              <Button onClick={() => handleSendReminder(payment.id)} variant="secondary">Enviar Recordatorio</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
