import React from 'react';

const PerfildelClientePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil del Cliente</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Página de detalle para un cliente específico. Centraliza su información, 
          plan de entrenamiento, plan de nutrición, seguimiento de progreso (gráficos), 
          historial de pagos y notas.
        </p>
      </div>
    </div>
  );
};

export default PerfildelClientePage;