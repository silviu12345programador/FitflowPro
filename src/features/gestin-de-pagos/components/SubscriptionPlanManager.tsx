
import React from 'react';

const SubscriptionPlanManager: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold text-text mb-4">Gestionar Planes</h2>
      <div className="space-y-4">
        <div className="bg-surface p-4 rounded-md">
          <p className="font-semibold text-textSecondary">Plan Básico</p>
          <p className="text-lg text-primary">$50.00/mes</p>
        </div>
        <div className="bg-surface p-4 rounded-md">
          <p className="font-semibold text-textSecondary">Plan Premium</p>
          <p className="text-lg text-primary">$95.00/mes</p>
        </div>
        <button className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded">
          Añadir Nuevo Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlanManager;
