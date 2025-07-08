import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button'; 

const QuickActionsToolbar: React.FC = () => {
  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate('/clients/new');
  };

  const handleCreateWorkout = () => {
    navigate('/workouts/builder');
  };

  const handleSendGlobalMessage = () => {
    // In a real app, this would open a modal.
    alert('Funcionalidad para enviar mensaje global no implementada aún.');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Button onClick={handleAddClient} className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Añadir Cliente
      </Button>
      <Button onClick={handleCreateWorkout} className="flex items-center gap-2" variant="secondary">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Crear Plan
      </Button>
      <Button onClick={handleSendGlobalMessage} className="flex items-center gap-2" variant="accent">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Enviar Mensaje Global
      </Button>
    </div>
  );
};

export default QuickActionsToolbar;
