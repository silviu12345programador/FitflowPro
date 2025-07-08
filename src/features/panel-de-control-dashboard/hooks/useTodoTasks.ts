import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export interface Task {
  id: number;
  description: string;
  type: 'auto' | 'manual';
  status: 'pendiente' | 'completado';
  clientId?: number;
  clientName?: string; // Assuming API can provide this
}

export const useTodoTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await dashboardApi.getTasks();
      // Mock client names for demonstration
      const tasksWithClientNames = fetchedTasks.map(task => ({
        ...task,
        clientName: task.clientId ? `Cliente ${task.clientId}` : undefined,
      }));
      setTasks(tasksWithClientNames);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (description: string) => {
    try {
      const newTask = await dashboardApi.createTask({ description });
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      setError('Error al crear la tarea');
    }
  };

  const toggleTaskStatus = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'pendiente' ? 'completado' : 'pendiente';

    try {
      await dashboardApi.updateTask(taskId, { status: newStatus });
      setTasks(prevTasks =>
        prevTasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      setError('Error al actualizar la tarea');
    }
  };

  return { tasks, isLoading, error, addTask, toggleTaskStatus };
};
