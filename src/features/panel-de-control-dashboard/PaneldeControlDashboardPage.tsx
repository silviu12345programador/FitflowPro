import React from 'react';

const PaneldeControlDashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Control (Dashboard)</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Vista principal para el entrenador después de iniciar sesión. 
          Muestra un resumen de clientes activos, próximos pagos, tareas pendientes 
          y estadísticas clave del progreso de los clientes.
        </p>
      </div>
    </div>
  );
};

export default PaneldeControlDashboardPage;