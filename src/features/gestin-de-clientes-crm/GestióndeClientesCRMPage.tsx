import React from 'react';

const GestióndeClientesCRMPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes (CRM)</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Listado de todos los clientes del entrenador. Permite buscar, filtrar, 
          y añadir nuevos clientes. Muestra información básica como nombre, 
          estado (activo/inactivo) y progreso general.
        </p>
      </div>
    </div>
  );
};

export default GestióndeClientesCRMPage;