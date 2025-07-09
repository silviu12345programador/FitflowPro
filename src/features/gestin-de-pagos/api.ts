
// Mock API para el historial de transacciones

// Definición del tipo de transacción para la API
export type Transaction = {
  id: string;
  clientName: string;
  date: string; // Formato ISO 8601
  amount: number;
  status: 'Completado' | 'Fallido' | 'Reembolsado';
};

// Definición del tipo de pago vencido
export type OverduePayment = {
  id: string;
  clientName: string;
  amount: number;
  dueDate: string;
};

// Simulación de la base de datos de transacciones
const db: Transaction[] = [
  { id: 'TRX001', clientName: 'Ana Pérez', date: '2024-07-15T10:30:00Z', amount: 75.0, status: 'Completado' },
  { id: 'TRX002', clientName: 'Luis Jiménez', date: '2024-07-14T11:00:00Z', amount: 50.0, status: 'Fallido' },
  { id: 'TRX003', clientName: 'Sofía Castro', date: '2024-07-14T14:20:00Z', amount: 120.0, status: 'Completado' },
  { id: 'TRX004', clientName: 'Carlos Morales', date: '2024-07-13T09:00:00Z', amount: 95.0, status: 'Reembolsado' },
  { id: 'TRX005', clientName: 'Marta Gómez', date: '2024-07-12T16:45:00Z', amount: 60.0, status: 'Completado' },
  { id: 'TRX006', clientName: 'Javier Torres', date: '2024-07-11T08:15:00Z', amount: 80.0, status: 'Completado' },
  { id: 'TRX007', clientName: 'Laura Reyes', date: '2024-07-10T18:00:00Z', amount: 45.0, status: 'Fallido' },
  { id: 'TRX008', clientName: 'Daniel Soto', date: '2024-06-20T12:00:00Z', amount: 150.0, status: 'Completado' },
  { id: 'TRX009', clientName: 'Elena Navarro', date: '2024-06-18T15:30:00Z', amount: 70.0, status: 'Reembolsado' },
  { id: 'TRX010', clientName: 'Pablo Marín', date: '2024-06-05T13:45:00Z', amount: 200.0, status: 'Completado' },
];

// Simulación de la base de datos de pagos vencidos
const overdueDb: OverduePayment[] = [
  { id: '1', clientName: 'Juan Pérez', amount: 75.0, dueDate: '2025-07-01' },
  { id: '2', clientName: 'Ana Gómez', amount: 50.0, dueDate: '2025-06-28' },
  { id: '3', clientName: 'Luis Rodríguez', amount: 100.0, dueDate: '2025-07-05' },
];

// Tipos para los parámetros de consulta
export type GetTransactionsParams = {
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
};

/**
 * Simula una llamada a un endpoint de API para obtener transacciones.
 * Acepta filtros y paginación.
 */
export const getTransactions = (params: GetTransactionsParams = {}): Promise<{ data: Transaction[], total: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let result = [...db];

      // Filtrado por estado
      if (params.status) {
        result = result.filter(t => t.status === params.status);
      }

      // Filtrado por rango de fechas
      if (params.startDate) {
        result = result.filter(t => new Date(t.date) >= new Date(params.startDate!));
      }
      if (params.endDate) {
        result = result.filter(t => new Date(t.date) <= new Date(params.endDate!));
      }

      const total = result.length;

      // Paginación
      const page = params.page || 1;
      const limit = params.limit || 5;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedData = result.slice(startIndex, endIndex);

      resolve({ data: paginatedData, total });
    }, 500); // Simular retardo de red
  });
};

/**
 * Simula una llamada a un endpoint de API para obtener pagos vencidos.
 */
export const getOverduePayments = (): Promise<OverduePayment[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(overdueDb);
    }, 300);
  });
};

/**
 * Simula una llamada a la API para reintentar un cobro.
 */
export const retryPayment = (transactionId: string): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`API: Reintentando cobro para ${transactionId}`);
      resolve({ success: true });
    }, 500);
  });
};

/**
 * Simula una llamada a la API para enviar un recordatorio de pago.
 */
export const sendReminder = (transactionId: string): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`API: Enviando recordatorio para ${transactionId}`);
      resolve({ success: true });
    }, 500);
  });
};
