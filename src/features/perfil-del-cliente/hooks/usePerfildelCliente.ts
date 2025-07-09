import { useState, useEffect } from 'react';
import { getProgressHistory } from '../api';
import { getPaymentsByClientId } from '../../gestin-de-pagos/api';
import { ProgressData } from '../components/ProgressMetricsChart';

interface Payment {
  id: string;
  date: string;
  concept: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Vencido';
}

export const usePerfildelCliente = (clientId: string) => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [progress, paymentHistory] = await Promise.all([
          getProgressHistory(clientId),
          getPaymentsByClientId(clientId),
        ]);
        
        setProgressData(progress);
        setPayments(paymentHistory);
        setError(null);
      } catch (err) {
        setError('Failed to fetch client data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (clientId) {
      fetchData();
    }
  }, [clientId]);

  return { progressData, payments, isLoading, error };
};
