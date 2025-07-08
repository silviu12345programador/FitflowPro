import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export type TimePeriod = '7d' | '30d' | '90d';

export interface ProgressData {
  date: string;
  adherence: number;
  newProgressRecords: number;
}

export const useClientProgressChart = () => {
  const [period, setPeriod] = useState<TimePeriod>('30d');
  const [data, setData] = useState<ProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (currentPeriod: TimePeriod) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await dashboardApi.getClientProgress(currentPeriod);
      setData(result);
    } catch (err: unknown) {
      console.error(err);
      setError('Error al cargar los datos de progreso');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  const changePeriod = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
  };

  return { data, isLoading, error, period, changePeriod };
};
