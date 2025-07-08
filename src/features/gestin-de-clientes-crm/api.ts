// Gestión de Clientes (CRM) API functions

// This would be a real API call, but for now, we'll add more mock clients
// to demonstrate pagination.
const moreMockClients = Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 6}`,
    name: `Cliente Ficticio ${i + 1}`,
    avatarUrl: `https://randomuser.me/api/portraits/men/${i + 6}.jpg`,
    status: i % 3 === 0 ? 'inactivo' : 'activo',
    progress: Math.floor(Math.random() * 100),
}));

const mockClients = [
  { id: '1', name: 'Juan Pérez', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'activo', progress: 75 },
  { id: '2', name: 'Ana Gómez', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'activo', progress: 50 },
  { id: '3', name: 'Carlos Sánchez', avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'inactivo', progress: 25 },
  { id: '4', name: 'Laura Fernández', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'activo', progress: 90 },
  { id: '5', name: 'Pedro Martínez', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'inactivo', progress: 10 },
  ...moreMockClients
];


import { StatusFilter } from "./components/ClientStatusFilter";

interface GetClientsParams {
    searchTerm?: string;
    statusFilter?: StatusFilter;
    page?: number;
    limit?: number;
}

export const clientsApi = {
  // Boilerplate API functions
  getClients: async (params: GetClientsParams = {}) => {
    const { searchTerm = '', statusFilter = 'todos', page = 1, limit = 10 } = params;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredClients = [...mockClients];

        if (searchTerm) {
          filteredClients = filteredClients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (statusFilter !== 'todos') {
          filteredClients = filteredClients.filter(client => client.status === statusFilter);
        }
        
        const total = filteredClients.length;
        const paginatedData = filteredClients.slice((page - 1) * limit, page * limit);

        resolve({ data: paginatedData, total });
      }, 300); 
    });
  },
  
  getClient: async (id: string) => {
    // TODO: Implement API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const client = mockClients.find(c => c.id === id);
            resolve(client || {});
        }, 500);
    });
  },
  
  createClient: async (clientData: { name: string; email: string; }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newClient = {
                id: (mockClients.length + 1).toString(),
                name: clientData.name,
                email: clientData.email,
                avatarUrl: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg`,
                status: 'activo' as 'activo' | 'inactivo',
                progress: 0,
            };
            mockClients.unshift(newClient); // Add to the beginning of the list
            resolve(newClient);
        }, 500);
    });
  },
  
  updateClient: async (id: string, clientData: any) => {
    // TODO: Implement API call
    return {};
  },
  
  deleteClient: async (id: string) => {
    // TODO: Implement API call
    return {};
  }
};