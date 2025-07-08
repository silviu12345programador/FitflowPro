import React from 'react';

interface Client {
  avatarUrl: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'Activo' | 'Inactivo';
  goals: string[];
}

interface ClientHeaderCardProps {
  client: Client;
}

const ClientHeaderCard: React.FC<ClientHeaderCardProps> = ({ client }) => {
  const statusClasses = client.status === 'Activo' 
    ? 'bg-success text-white' 
    : 'bg-muted text-textSecondary';

  return (
    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
      <img src={client.avatarUrl} alt={`${client.fullName}'s avatar`} className="w-24 h-24 rounded-full object-cover border-4 border-primary" />
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-primary">{client.fullName}</h1>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClasses}`}>
            {client.status}
          </span>
        </div>
        <div className="mt-2 text-textSecondary">
          <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors duration-300">
            {client.email}
          </a>
          <span className="mx-2">|</span>
          <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors duration-300">
            {client.phone}
          </a>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-text">Objetivos Principales:</h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-textMuted">
            {client.goals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientHeaderCard;
