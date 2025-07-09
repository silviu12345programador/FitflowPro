import React, { useState, useEffect } from 'react';
import { clientsApi } from '../../gestin-de-clientes-crm/api';
import ClientSearchBar from '../../gestin-de-clientes-crm/components/ClientSearchBar';
import { workoutBuilderApi } from '../api';

interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'activo' | 'inactivo';
  progress: number;
  currentPlan?: string; // Sugerencia: Mostrar plan actual
}

interface AssignPlanToClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  planData: any; // Debería tener una interfaz definida
  onSuccess: () => void;
}

const AssignPlanToClientModal: React.FC<AssignPlanToClientModalProps> = ({ isOpen, onClose, planData, onSuccess }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        // @ts-ignore
        const { data } = await clientsApi.getClients({ limit: 1000 }); // Fetch all clients
        const clientsWithPlans = data.map((c: Client) => ({
            ...c,
            currentPlan: Math.random() > 0.5 ? 'Plan Hipertrofia Vol. 3' : undefined
        }));
        setClients(clientsWithPlans);
        setFilteredClients(clientsWithPlans);
      };
      fetchClients();
    }
  }, [isOpen]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleAssign = async () => {
    if (selectedClients.length === 0) {
        // Idealmente, mostrar una notificación
        console.warn("No clients selected");
        return;
    }
    setIsAssigning(true);
    try {
      await workoutBuilderApi.assignPlanToClients(
        { ...planData, startDate },
        selectedClients
      );
      onSuccess(); // Llama a la función de éxito para mostrar notificación
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Failed to assign plan", error);
      // Idealmente, mostrar una notificación de error
    } finally {
        setIsAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
      <div className="bg-backgroundSecondary rounded-lg shadow-lg w-full max-w-2xl h-[80vh] flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Asignar Plan de Entrenamiento</h2>
          <button onClick={onClose} className="text-textMuted hover:text-text">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-4">
            <ClientSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="flex-grow overflow-y-auto pr-2">
          <ul className="space-y-3">
            {filteredClients.map(client => (
              <li key={client.id} className="bg-surface p-3 rounded-lg flex items-center justify-between transition-all hover:bg-card">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`client-${client.id}`}
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleSelectClient(client.id)}
                    className="h-5 w-5 rounded bg-background border-border text-primary focus:ring-primary"
                  />
                  <img src={client.avatarUrl} alt={client.name} className="w-10 h-10 rounded-full mx-4" />
                  <div>
                    <p className="font-semibold text-textSecondary">{client.name}</p>
                    {client.currentPlan ? (
                        <p className="text-sm text-warning"><span className="font-bold">Plan actual:</span> {client.currentPlan}</p>
                    ) : (
                        <p className="text-sm text-textMuted">Sin plan asignado</p>
                    )}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${client.status === 'activo' ? 'bg-success/20 text-success' : 'bg-muted/20 text-textMuted'}`}>
                  {client.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
            <div className="mb-4">
                <label htmlFor="start-date" className="block text-sm font-medium text-textMuted mb-2">Fecha de Inicio del Plan</label>
                <input 
                    type="date" 
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-textSecondary focus:ring-focus focus:border-focus"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button onClick={onClose} className="px-6 py-2 rounded-lg bg-muted/50 text-textSecondary hover:bg-muted/80 transition-colors">
                    Cancelar
                </button>
                <button 
                    onClick={handleAssign} 
                    disabled={selectedClients.length === 0 || isAssigning}
                    className="px-6 py-2 rounded-lg bg-primary text-textInverse font-semibold hover:bg-primaryHover transition-colors disabled:bg-disabled disabled:cursor-not-allowed"
                >
                    {isAssigning ? 'Asignando...' : `Asignar a ${selectedClients.length} Cliente(s)`}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AssignPlanToClientModal;
