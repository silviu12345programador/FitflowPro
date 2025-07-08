import { useState, useEffect } from 'react';
import { dashboardApi } from '../api';

interface PaymentsSummary {
  totalAmount: number;
  clientCount: number;
}

export const usePaymentsStatus = () => {
  const [upcomingPayments, setUpcomingPayments] = useState<PaymentsSummary | null>(null);
  const [overduePayments, setOverduePayments] = useState<PaymentsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentsStatus = async () => {
      try {
        setIsLoading(true);
        const [upcoming, overdue] = await Promise.all([
          dashboardApi.getUpcomingPayments(),
          dashboardApi.getOverduePayments(),
        ]);
        setUpcomingPayments(upcoming);
        setOverduePayments(overdue);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payments status');
        setUpcomingPayments(null);
        setOverduePayments(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentsStatus();
  }, []);

  return { upcomingPayments, overduePayments, isLoading, error };
};
