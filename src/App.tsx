import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// Import page components
import PaneldeControlDashboardPage from './features/panel-de-control-dashboard/PaneldeControlDashboardPage';
import GestióndeClientesCRMPage from './features/gestin-de-clientes-crm/GestióndeClientesCRMPage';
import PerfildelClientePage from './features/perfil-del-cliente/PerfildelClientePage';
import CreadordePlanesdeEntrenamientoPage from './features/creador-de-planes-de-entrenamiento/CreadordePlanesdeEntrenamientoPage';
import CreadordePlanesdeNutriciónPage from './features/creador-de-planes-de-nutricin/CreadordePlanesdeNutriciónPage';
import GestióndePagosPage from './features/gestin-de-pagos/GestióndePagosPage';
import BibliotecadePlantillasPage from './features/biblioteca-de-plantillas/BibliotecadePlantillasPage';
import ConfiguracióndeCuentaPage from './features/configuracin-de-cuenta/ConfiguracióndeCuentaPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PaneldeControlDashboardPage />} />
            <Route path="/clients" element={<GestióndeClientesCRMPage />} />
            <Route path="/clients/:id" element={<PerfildelClientePage />} />
            <Route path="/clients/profile" element={<PerfildelClientePage />} />
            <Route path="/workouts/builder" element={<CreadordePlanesdeEntrenamientoPage />} />
            <Route path="/nutrition/builder" element={<CreadordePlanesdeNutriciónPage />} />
            <Route path="/billing" element={<GestióndePagosPage />} />
            <Route path="/library" element={<BibliotecadePlantillasPage />} />
            <Route path="/settings" element={<ConfiguracióndeCuentaPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;