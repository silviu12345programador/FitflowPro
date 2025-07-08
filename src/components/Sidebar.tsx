import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { 
  BarChart3, 
  Users, 
  User, 
  Dumbbell, 
  Apple, 
  CreditCard, 
  BookOpen, 
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Panel de Control', icon: BarChart3 },
    { path: '/clients', label: 'Gestión de Clientes', icon: Users },
    { path: '/clients/profile', label: 'Perfil del Cliente', icon: User },
    { path: '/workouts/builder', label: 'Creador de Entrenamientos', icon: Dumbbell },
    { path: '/nutrition/builder', label: 'Creador de Nutrición', icon: Apple },
    { path: '/billing', label: 'Gestión de Pagos', icon: CreditCard },
    { path: '/library', label: 'Biblioteca de Plantillas', icon: BookOpen },
    { path: '/settings', label: 'Configuración', icon: Settings },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">FitFlow Pro</h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;