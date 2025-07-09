
import React from 'react';
import Table from '../../../components/Table';
import Button from '../../../components/Button';

interface Payment {
  id: string;
  date: string;
  concept: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Vencido';
}

interface ClientPaymentsHistoryProps {
  payments: Payment[];
  loading?: boolean;
}

const getStatusBadge = (status: Payment['status']) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
  switch (status) {
    case 'Pagado':
      return <span className={`bg-success/20 text-success-dark ${baseClasses}`}>Pagado</span>;
    case 'Pendiente':
      return <span className={`bg-warning/20 text-warning-dark ${baseClasses}`}>Pendiente</span>;
    case 'Vencido':
      return <span className={`bg-error/20 text-error-dark ${baseClasses}`}>Vencido</span>;
    default:
      return null;
  }
};

type DisplayPayment = {
  id: string;
  date: string;
  concept: string;
  amount: string;
  status: React.ReactNode;
}

const ClientPaymentsHistory: React.FC<ClientPaymentsHistoryProps> = ({ payments, loading }) => {
  const columns = [
    { key: 'date', label: 'Fecha' },
    { key: 'concept', label: 'Concepto/ID' },
    { key: 'amount', label: 'Monto' },
    { key: 'status', label: 'Estado' },
  ] as const;

  const data: DisplayPayment[] = payments.map(payment => ({
    ...payment,
    amount: `${payment.amount.toFixed(2)}`,
    status: getStatusBadge(payment.status),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Historial de Pagos</h3>
        <Button>Registrar Pago</Button>
      </div>
      {loading ? (
        <div className="text-center py-4">Cargando...</div>
      ) : payments.length === 0 ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No hay historial de pagos para este cliente.
        </div>
      ) : (
        <Table<DisplayPayment> columns={columns} data={data} />
      )}
    </div>
  );
};

export default ClientPaymentsHistory;
