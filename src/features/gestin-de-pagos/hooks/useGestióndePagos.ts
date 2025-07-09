
import { useState, useEffect, useCallback } from 'react';
import { 
  getTransactions, 
  getOverduePayments,
  retryPayment,
  sendReminder,
  Transaction, 
  OverduePayment,
  GetTransactionsParams 
} from '../api';

// Estado del hook
type UseGestionDePagosState = {
  transactions: Transaction[];
  overduePayments: OverduePayment[];
  loading: boolean;
  error: Error | null;
  totalTransactions: number;
  filters: GetTransactionsParams;
};

// Valor inicial para el estado
const initialState: UseGestionDePagosState = {
  transactions: [],
  overduePayments: [],
  loading: false,
  error: null,
  totalTransactions: 0,
  filters: {
    page: 1,
    limit: 5,
    status: '',
    startDate: '',
    endDate: '',
  },
};

/**
 * Hook para gestionar la lógica de la página de Gestión de Pagos.
 * Maneja la carga de transacciones, pagos vencidos y acciones relacionadas.
 */
export const useGestióndePagos = () => {
  const [state, setState] = useState<UseGestionDePagosState>(initialState);

  // Función para cargar las transacciones
  const fetchTransactions = useCallback(async (params: GetTransactionsParams) => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const { data, total } = await getTransactions(params);
      setState(prevState => ({
        ...prevState,
        transactions: data,
        totalTransactions: total,
        loading: false,
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      }));
    }
  }, []);

  // Función para cargar los pagos vencidos
  const fetchOverduePayments = useCallback(async () => {
    try {
      const data = await getOverduePayments();
      setState(prevState => ({ ...prevState, overduePayments: data }));
    } catch (err) {
      // En este caso, no actualizamos el estado de error global para no afectar
      // a la UI principal si solo falla la carga de pagos vencidos.
      console.error("Failed to fetch overdue payments:", err);
    }
  }, []);

  // Carga inicial de datos
  useEffect(() => {
    fetchTransactions(state.filters);
    fetchOverduePayments();
  }, [fetchTransactions, fetchOverduePayments, state.filters]);

  // Función para actualizar los filtros
  const setFilters = (newFilters: Partial<GetTransactionsParams>) => {
    const updatedFilters = { ...state.filters, ...newFilters, page: 1 }; // Reset page on filter change
    setState(prevState => ({ ...prevState, filters: updatedFilters }));
  };

  // Función para cambiar de página
  const setPage = (page: number) => {
    setState(prevState => ({
      ...prevState,
      filters: { ...prevState.filters, page },
    }));
  };

  // Acciones para pagos vencidos
  const handleRetryPayment = async (transactionId: string) => {
    try {
      await retryPayment(transactionId);
      // Opcional: Refrescar la lista de pagos vencidos o mostrar una notificación
      fetchOverduePayments();
    } catch (error) {
      console.error(`Failed to retry payment for ${transactionId}:`, error);
    }
  };

  const handleSendReminder = async (transactionId: string) => {
    try {
      await sendReminder(transactionId);
      // Opcional: Mostrar una notificación de éxito
    } catch (error) {
      console.error(`Failed to send reminder for ${transactionId}:`, error);
    }
  };

  return {
    ...state,
    setFilters,
    setPage,
    handleRetryPayment,
    handleSendReminder,
  };
};
