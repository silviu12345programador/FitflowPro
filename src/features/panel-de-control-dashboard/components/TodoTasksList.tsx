import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTodoTasks } from '../hooks/useTodoTasks';

const TodoTasksList: React.FC = () => {
  const { tasks, isLoading, error, addTask, toggleTaskStatus } = useTodoTasks();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="bg-surface text-text shadow-lg rounded-lg p-6 h-full">
      <h2 className="text-xl font-bold text-textSecondary mb-4">Tareas Pendientes</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Añadir nueva tarea..."
          className="flex-grow bg-backgroundSecondary text-text rounded-md px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-focus"
        />
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primaryHover transition"
        >
          Añadir
        </button>
      </form>

      {isLoading && <p className="text-textMuted">Cargando tareas...</p>}
      {error && <p className="text-error">{error}</p>}
      
      <ul className="space-y-3">
        {tasks.filter(task => task.status === 'pendiente').slice(0, 5).map(task => (
          <li key={task.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-backgroundSecondary">
            <input
              type="checkbox"
              checked={task.status === 'completado'}
              onChange={() => toggleTaskStatus(task.id)}
              className="appearance-none h-5 w-5 border-2 border-primary rounded-sm bg-backgroundSecondary checked:bg-primary checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary"
            />
            <span className={`flex-grow ${task.status === 'completado' ? 'line-through text-textMuted' : ''}`}>
              {task.description}
              {task.clientId && (
                <Link to={`/clients/${task.clientId}`} className="ml-2 text-info hover:underline text-sm">
                  ({task.clientName || `Cliente ${task.clientId}`})
                </Link>
              )}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              task.type === 'auto' ? 'bg-secondaryLight/20 text-secondary' : 'bg-accentLight/20 text-accent'
            }`}>
              {task.type}
            </span>
          </li>
        ))}
      </ul>
      
      {tasks.filter(task => task.status === 'pendiente').length === 0 && !isLoading && (
        <p className="text-textMuted mt-4">¡No hay tareas pendientes!</p>
      )}
    </div>
  );
};

export default TodoTasksList;
