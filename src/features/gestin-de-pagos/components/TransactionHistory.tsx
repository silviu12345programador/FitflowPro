import React from 'react';
import Table from '../../../components/Table';
import { Transaction } from '../api';
import { GetTransactionsParams } from '../api';

// Mapeo de estado a clases de Tailwind CSS
const statusColorMap = {
  Completado: 'bg-successLight text-successDark',
  Fallido: 'bg-errorLight text-errorDark',
  Reembolsado: 'bg-warningLight text-warningDark',
};

type TransactionHistoryProps = {
  transactions: Transaction[];
  loading: boolean;
  filters: GetTransactionsParams;
  onFiltersChange: (filters: Partial<GetTransactionsParams>) => void;
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  loading,
  filters,
  onFiltersChange,
}) => {
  // Columnas para el componente Table
  const columns = [
    { header: 'Cliente', accessor: 'clientName' },
    { header: 'Fecha', accessor: 'date' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Estado', accessor: 'status' },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFiltersChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-text mb-4">Historial de Transacciones</h2>

      {/* Filtros */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-surface rounded-lg">
        {/* Filtro por estado */}
        <div className="flex-1">
          <label htmlFor="status-filter" className="block text-sm font-medium text-textSecondary mb-1">
            Filtrar por estado
          </label>
          <select
            id="status-filter"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full bg-backgroundSecondary border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Todos</option>
            <option value="Completado">Completado</option>
            <option value="Fallido">Fallido</option>
            <option value="Reembolsado">Reembolsado</option>
          </select>
        </div>

        {/* Filtro por fecha de inicio */}
        <div className="flex-1">
          <label htmlFor="start-date-filter" className="block text-sm font-medium text-textSecondary mb-1">
            Fecha de inicio
          </label>
          <input
            type="date"
            id="start-date-filter"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full bg-backgroundSecondary border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Filtro por fecha de fin */}
        <div className="flex-1">
          <label htmlFor="end-date-filter" className="block text-sm font-medium text-textSecondary mb-1">
            Fecha de fin
          </label>
          <input
            type="date"
            id="end-date-filter"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full bg-backgroundSecondary border border-border rounded-md shadow-sm py-2 px-3 text-text focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Tabla de Transacciones */}
      {loading ? (
        <p className="text-text text-center">Cargando...</p>
      ) : (
        <Table
          columns={columns}
          data={transactions}
          renderCell={(item, column) => {
            const value = item[column.accessor as keyof Transaction];
            if (column.accessor === 'status') {
              const status = value as Transaction['status'];
              return (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColorMap[status]}`}>
                  {status}
                </span>
              );
            }
            if (column.accessor === 'amount') {
              return `$${(value as number).toFixed(2)}`;
            }
            if (column.accessor === 'date') {
                return new Date(value as string).toLocaleDateString();
            }
            return value;
          }}
        />
      )}
    </div>
  );
};

export default TransactionHistory;