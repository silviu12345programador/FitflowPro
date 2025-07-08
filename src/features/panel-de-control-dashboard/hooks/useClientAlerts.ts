import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export type AlertType = 'missed_checkin' | 'no_login' | 'no_workout';
export type Criticality = 'high' | 'medium' | 'low';

export interface ClientAlert {
  id: number;
  name: string;
  profilePictureUrl: string;
  alertType: AlertType;
  alertReason: string;
  criticality: Criticality;
  timestamp: string;
}

export const useClientAlerts = () => {
  const [alerts, setAlerts] = useState<ClientAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedAlerts = await dashboardApi.getClientAlerts();
      setAlerts(fetchedAlerts);
    } catch (err) {
      setError('Error al cargar las alertas de clientes');
      setAlerts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const dismissAlert = (alertId: number) => {
    // In a real app, this would likely call an API to mark the alert as dismissed.
    // For this simulation, we'll just remove it from the local state.
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  return { alerts, isLoading, error, dismissAlert };
};
