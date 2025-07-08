import React from 'react';

export type StatusFilter = 'todos' | 'activo' | 'inactivo';

interface ClientStatusFilterProps {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

const filters: { label: string; value: StatusFilter }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Activos', value: 'activo' },
  { label: 'Inactivos', value: 'inactivo' },
];

const ClientStatusFilter: React.FC<ClientStatusFilterProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-2 bg-surface p-1 rounded-lg">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive
                ? 'bg-primary text-white shadow'
                : 'bg-transparent text-textMuted hover:bg-backgroundSecondary'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ClientStatusFilter;
