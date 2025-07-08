import React from 'react';

const GestióndePagosPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Pagos</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Sección para que el entrenador gestione la facturación. Muestra el historial 
          de pagos, facturas, estado de las suscripciones y configura los planes de 
          pago recurrentes.
        </p>
      </div>
    </div>
  );
};

export default GestióndePagosPage;