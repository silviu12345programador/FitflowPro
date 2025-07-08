
import { useState, useEffect } from 'react';
import { dashboardApi } from '../api';

export const usePaneldeControlDashboard = () => {
  const [activeClients, setActiveClients] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveClients = async () => {
      try {
        setIsLoading(true);
        const clients = await dashboardApi.getActiveClients();
        setActiveClients(clients.length);
        setError(null);
      } catch (err) {
        setError('Failed to fetch active clients');
        setActiveClients(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveClients();
  }, []);

  return { activeClients, isLoading, error };
};
