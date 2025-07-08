// Panel de Control (Dashboard) API functions
export const dashboardApi = {
  // Boilerplate API functions
  getDashboardData: async () => {
    // TODO: Implement API call
    return {};
  },
  
  getActiveClients: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a successful response
    return [
      { id: 1, name: 'John Doe', status: 'active' },
      { id: 2, name: 'Jane Smith', status: 'active' },
      { id: 3, name: 'Peter Jones', status: 'inactive' },
      { id: 4, name: 'Mary Williams', status: 'active' },
    ].filter(client => client.status === 'active');
  },
  
  getUpcomingPayments: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a successful response
    return {
      totalAmount: 1250.00,
      clientCount: 5,
    };
  },

  getOverduePayments: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a successful response
    return {
      totalAmount: 780.50,
      clientCount: 3,
    };
  },
  
  getStatistics: async () => {
    // TODO: Implement API call
    return {};
  },

  getTasks: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, description: 'Revisar check-in de Ana Pérez', type: 'auto', status: 'pendiente', clientId: 5 },
      { id: 2, description: 'Actualizar plan de nutrición de Carlos Gómez', type: 'auto', status: 'pendiente', clientId: 6 },
      { id: 3, description: 'Enviar recordatorio de pago a Laura Torres', type: 'manual', status: 'pendiente', clientId: 7 },
      { id: 4, description: 'Preparar rutina para nuevo cliente', type: 'manual', status: 'completado' },
      { id: 5, description: 'Llamar a prospecto para cerrar venta', type: 'manual', status: 'pendiente' },
    ].filter(task => task.status === 'pendiente');
  },

  createTask: async (task: { description: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Creating task:', task);
    return { id: Date.now(), ...task, type: 'manual', status: 'pendiente' };
  },

  updateTask: async (taskId: number, updates: { status: 'pendiente' | 'completado' }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Updating task ${taskId} with`, updates);
    return { id: taskId, ...updates };
  },

  getClientAlerts: async () => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulate business logic for identifying clients at risk
    const alerts = [
      {
        id: 8,
        name: 'Laura Palmer',
        profilePictureUrl: `https://i.pravatar.cc/150?u=laura.palmer`,
        alertType: 'missed_checkin',
        alertReason: 'Check-in semanal no completado',
        criticality: 'high',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 9,
        name: 'Dale Cooper',
        profilePictureUrl: `https://i.pravatar.cc/150?u=dale.cooper`,
        alertType: 'no_login',
        alertReason: 'No ha iniciado sesión en 8 días',
        criticality: 'medium',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 10,
        name: 'Audrey Horne',
        profilePictureUrl: `https://i.pravatar.cc/150?u=audrey.horne`,
        alertType: 'no_workout',
        alertReason: 'Sin registrar entrenos hace 5 días',
        criticality: 'medium',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 11,
        name: 'Leland Palmer',
        profilePictureUrl: `https://i.pravatar.cc/150?u=leland.palmer`,
        alertType: 'no_workout',
        alertReason: 'Adherencia a la rutina por debajo del 50%',
        criticality: 'low',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    // Sort by criticality: high > medium > low
    const criticalityOrder = { high: 0, medium: 1, low: 2 };
    return alerts.sort((a, b) => criticalityOrder[a.criticality] - criticalityOrder[b.criticality]);
  },

  getClientProgress: async (period: '7d' | '30d' | '90d') => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generateData = (days: number) => {
      return Array.from({ length: days }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return {
          date: date.toISOString().split('T')[0],
          adherence: 60 + Math.random() * 25,
          newProgressRecords: Math.floor(Math.random() * 10),
        };
      });
    };

    switch (period) {
      case '7d':
        return generateData(7);
      case '30d':
        return generateData(30);
      case '90d':
        return generateData(90);
      default:
        return [];
    }
  },
};