import { useState, useEffect, useCallback } from 'react';
import { clientsApi } from '../api';
import { StatusFilter } from '../components/ClientStatusFilter';

interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'activo' | 'inactivo';
  progress: number;
}

// Custom hook for debouncing
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

export const useGestióndeClientesCRM = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const pageSize = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await clientsApi.getClients({
        searchTerm: debouncedSearchTerm, 
        statusFilter,
        page: currentPage,
        limit: pageSize,
      });
      setClients(response.data);
      setTotalClients(response.total);
      setTotalPages(Math.ceil(response.total / pageSize));
    } catch (err) {
      setError('Error al cargar los clientes. Por favor, inténtelo de nuevo más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, statusFilter, currentPage, pageSize]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  const addClient = async (clientData: { name: string; email: string; objective: string }) => {
    try {
      await clientsApi.createClient(clientData);
      await fetchClients(); 
    } catch (error) {
      console.error("Failed to add client:", error);
      setError("No se pudo añadir el cliente. Inténtelo de nuevo.");
      throw error;
    }
  };

  return { 
    clients, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    addClient,
    pagination: {
      currentPage,
      totalPages,
      totalClients,
      pageSize,
      setCurrentPage,
    }
  };
};
