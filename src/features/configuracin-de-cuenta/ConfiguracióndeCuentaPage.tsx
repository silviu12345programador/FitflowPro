import React from 'react';

const ConfiguracióndeCuentaPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Configuración de Cuenta</h1>

      {/* Perfil Público */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Perfil Público</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Nombre</label>
            <input type="text" id="name" defaultValue="Carlos Vega" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input type="email" id="email" defaultValue="carlos.vega@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-600 mb-2">Biografía Corta</label>
            <textarea id="bio" rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" defaultValue="Entrenador personal certificado con 5 años de experiencia ayudando a clientes a alcanzar sus metas de fitness."></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      {/* Cambiar Contraseña */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Seguridad</h2>
        <form>
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-600 mb-2">Contraseña Actual</label>
            <input type="password" id="current_password" className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div className="mt-4">
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-600 mb-2">Nueva Contraseña</label>
            <input type="password" id="new_password" className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div className="mt-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-600 mb-2">Confirmar Nueva Contraseña</label>
            <input type="password" id="confirm_password" className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
              Actualizar Contraseña
            </button>
          </div>
        </form>
      </div>

      {/* Notificaciones */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-4">Notificaciones</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Notificarme cuando un cliente complete un entrenamiento</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Recordatorios de pagos pendientes</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Novedades y actualizaciones de FitFlow Pro</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Basic CSS for the toggle switch, can be moved to a CSS file
const styles = `
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2563eb;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2563eb;
}
input:checked + .slider:before {
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
`;

// Inject styles into the head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ConfiguracióndeCuentaPage;
