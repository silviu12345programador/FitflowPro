import React from 'react';

const ConfiguracióndeCuentaPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración de Cuenta</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Página donde el entrenador puede gestionar su perfil público, cambiar contraseña, 
          configurar notificaciones y conectar integraciones de pago.
        </p>
      </div>
    </div>
  );
};

export default ConfiguracióndeCuentaPage;