
import React from 'react';
import TransactionHistory from './components/TransactionHistory';
import { useGestióndePagos } from './hooks/useGestióndePagos';
import FinancialSummaryDashboard from './components/FinancialSummaryDashboard';
import SubscriptionPlanManager from './components/SubscriptionPlanManager';
import { OverduePaymentsPanel } from './components/OverduePaymentsPanel';

const GestióndePagosPage: React.FC = () => {
  const {
    transactions,
    loading,
    filters,
    setFilters,
  } = useGestióndePagos();

  return (
    <div className="p-6 bg-background text-text">
      <h1 className="text-3xl font-bold mb-6">Gestión de Pagos</h1>
      
      <OverduePaymentsPanel />

      {/* Resumen Financiero y Planes (componentes existentes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <FinancialSummaryDashboard />
        </div>
        <div>
          <SubscriptionPlanManager />
        </div>
      </div>

      {/* Historial de Transacciones */}
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <TransactionHistory
          transactions={transactions}
          loading={loading}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  );
};

export default GestióndePagosPage;
