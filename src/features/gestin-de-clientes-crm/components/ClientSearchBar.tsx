import React from 'react';

interface ClientSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ClientSearchBar: React.FC<ClientSearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full md:w-1/3">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-textMuted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar cliente por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-textSecondary focus:ring-focus focus:border-focus"
      />
      {searchTerm && (
        <button 
          onClick={() => onSearchChange('')} 
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg className="w-5 h-5 text-textMuted hover:text-textSecondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ClientSearchBar;
