import React, { useState, useMemo } from 'react';
import ClientSearchBar from '../../gestin-de-clientes-crm/components/ClientSearchBar';

// As per instructions, we simulate the client data and API call.
// In a real scenario, this would come from a hook using `gestin-de-clientes-crm/api.ts`.
const MOCK_CLIENTS = [
  { id: '1', name: 'Juan Pérez', active: true },
  { id: '2', name: 'Ana García', active: true },
  { id: '3', name: 'Carlos Sánchez', active: false }, // Inactive client
  { id: '4', name: 'Laura Martínez', active: true },
  { id: '5', name: 'Pedro Rodríguez', active: true },
  { id: '6', name: 'Sofía Gómez', active: true },
];

interface AssignTemplateModalProps {
  templateId: string;
  templateName: string;
  onClose: () => void;
  // In a real app, this would likely take the client IDs and a start date
  onAssign: (clientIds: string[], startDate: string) => void;
}

const AssignTemplateModal: React.FC<AssignTemplateModalProps> = ({
  templateName,
  onClose,
  onAssign,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  // In a real app, you'd use a hook like `useActiveClients()`
  const activeClients = MOCK_CLIENTS.filter(c => c.active);

  const filteredClients = useMemo(() => {
    return activeClients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeClients]);

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleAssign = () => {
    if (selectedClients.length === 0) {
      // Maybe show an alert
      console.warn("No clients selected");
      return;
    }
    // Here you would call the API to assign the template
    onAssign(selectedClients, startDate);
    // Show success notification and close
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-surface rounded-lg shadow-lg p-6 w-full max-w-2xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text">Asignar Plantilla: <span className="text-accent">{templateName}</span></h2>
            <button onClick={onClose} className="text-textMuted hover:text-text">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-grow">
                <label htmlFor="startDate" className="block text-sm font-medium text-textSecondary mb-2">
                    Fecha de Inicio del Plan
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-backgroundSecondary border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-focus"
                />
            </div>
            <div className="flex-grow">
                <label className="block text-sm font-medium text-textSecondary mb-2">
                    Buscar Cliente
                </label>
                <ClientSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
        </div>

        <div className="bg-backgroundSecondary rounded-lg p-4 h-64 overflow-y-auto border border-border mb-6">
          {filteredClients.length > 0 ? (
            <ul>
              {filteredClients.map(client => (
                <li
                  key={client.id}
                  onClick={() => handleSelectClient(client.id)}
                  className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-card"
                >
                  <span className="text-textSecondary">{client.name}</span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={selectedClients.includes(client.id)}
                    className="form-checkbox h-5 w-5 text-primary bg-surface border-border rounded focus:ring-primary"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-textMuted">No se encontraron clientes activos.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-text bg-muted hover:bg-opacity-80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedClients.length === 0}
            className="px-6 py-2 rounded-md text-white bg-primary hover:bg-primaryHover transition-colors disabled:bg-disabled disabled:cursor-not-allowed"
          >
            Asignar ({selectedClients.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTemplateModal;
