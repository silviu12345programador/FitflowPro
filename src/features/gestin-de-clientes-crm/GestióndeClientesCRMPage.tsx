import React, { useState } from 'react';
import { useGestióndeClientesCRM } from './hooks/useGestióndeClientes(CRM)';
import ClientListTable from './components/ClientListTable';
import ClientSearchBar from './components/ClientSearchBar';
import ClientStatusFilter from './components/ClientStatusFilter';
import AddClientModal from './components/AddClientModal';
import PaginationControls from './components/PaginationControls';

const SkeletonLoader = () => (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="w-full text-left border-collapse">
        <div className="bg-surface">
          <div className="flex p-4 text-left text-sm font-semibold text-textMuted uppercase tracking-wider">
            <div className="w-1/3 h-4 bg-backgroundSecondary rounded animate-pulse"></div>
            <div className="w-1/4 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
            <div className="w-1/4 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
            <div className="w-1/6 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
          </div>
        </div>
        <div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="hover:bg-backgroundSecondary transition-colors duration-200">
              <div className="flex p-4 border-b border-border items-center">
                <div className="flex items-center w-1/3">
                    <div className="w-10 h-10 rounded-full bg-backgroundSecondary animate-pulse"></div>
                    <div className="ml-4 w-3/4 h-4 bg-backgroundSecondary rounded animate-pulse"></div>
                </div>
                <div className="w-1/4 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
                <div className="w-1/4 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
                <div className="w-1/6 h-4 bg-backgroundSecondary rounded animate-pulse ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

const GestióndeClientesCRMPage: React.FC = () => {
  const { 
    clients, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addClient,
    pagination
  } = useGestióndeClientesCRM();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainContent = () => {
    if (loading) return <SkeletonLoader />;
    if (error) return <p className="text-error text-center py-10">{error}</p>;
    if (clients.length === 0) {
      return (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <h3 className="text-xl font-semibold text-textSecondary">No se encontraron clientes</h3>
          <p className="text-textMuted mt-2">
            {searchTerm || statusFilter !== 'todos' ? 'Ajusta los filtros o la búsqueda.' : 'Aún no tienes clientes registrados.'}
          </p>
        </div>
      );
    }
    return (
      <>
        <ClientListTable clients={clients} />
        <PaginationControls 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setCurrentPage}
          totalItems={pagination.totalClients}
          pageSize={pagination.pageSize}
        />
      </>
    );
  };

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex-1">
              <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
              <p className="text-textMuted mt-1">Busca, visualiza y gestiona tus clientes.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-lg shadow whitespace-nowrap"
          >
            Añadir Cliente
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <ClientSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ClientStatusFilter activeFilter={statusFilter} onFilterChange={setStatusFilter} />
        </div>
        
        <div className="bg-transparent rounded-lg">
          {mainContent()}
        </div>
      </div>
      <AddClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClient={addClient}
      />
    </>
  );
};

export default GestióndeClientesCRMPage;