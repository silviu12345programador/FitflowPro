
import React from 'react';

const FinancialSummaryDashboard: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold text-text mb-4">Resumen Financiero</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-textMuted">Ingresos este mes</p>
          <p className="text-2xl font-semibold text-success">$4,500.00</p>
        </div>
        <div>
          <p className="text-textMuted">Pagos pendientes</p>
          <p className="text-2xl font-semibold text-warning">$350.00</p>
        </div>
        <div>
          <p className="text-textMuted">Clientes activos</p>
          <p className="text-2xl font-semibold text-info">42</p>
        </div>
        <div>
          <p className="text-textMuted">Tasa de cancelación</p>
          <p className="text-2xl font-semibold text-error">5.2%</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummaryDashboard;
