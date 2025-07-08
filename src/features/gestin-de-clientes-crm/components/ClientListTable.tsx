import React from 'react';
import ClientProgressBar from './ClientProgressBar'; // Import the new component

// Mocking Table component for now as it doesn't exist.
const Table = ({ columns, data, tableClassName, headerClassName, cellClassName, rowClassName }: any) => (
  <table className={tableClassName}>
    <thead className={headerClassName}>
      <tr>
        {columns.map((col: any) => (
          <th key={col.Header} className="p-4 text-left text-sm font-semibold text-textMuted uppercase tracking-wider">
            {col.Header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row: any, rowIndex: number) => (
        <tr key={rowIndex} className={rowClassName}>
          {columns.map((col: any) => (
            <td key={col.accessor} className={cellClassName}>
              {row[col.accessor]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);


interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'activo' | 'inactivo';
  progress: number;
}

interface ClientListTableProps {
  clients: Client[];
}

const ClientListTable: React.FC<ClientListTableProps> = ({ clients }) => {
  const columns = [
    { Header: 'Cliente', accessor: 'cliente' },
    { Header: 'Estado', accessor: 'status' },
    { Header: 'Progreso General', accessor: 'progress' },
    { Header: 'Acciones', accessor: 'actions' },
  ];

  const data = clients.map((client) => ({
    cliente: (
      <div className="flex items-center">
        <img src={client.avatarUrl} alt={client.name} className="w-10 h-10 rounded-full mr-4" />
        <a href={`/clients/${client.id}`} className="font-medium text-primary hover:underline">
          {client.name}
        </a>
      </div>
    ),
    status: (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          client.status === 'activo' ? 'bg-success/20 text-success-dark' : 'bg-muted/20 text-textMuted'
        }`}
      >
        {client.status}
      </span>
    ),
    progress: (
      <ClientProgressBar progress={client.progress} />
    ),
    actions: (
      <button className="text-primary hover:text-primaryHover font-medium">
        Ver Perfil
      </button>
    ),
  }));

  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <Table
        columns={columns}
        data={data}
        tableClassName="w-full text-left border-collapse"
        headerClassName="bg-surface"
        cellClassName="p-4 border-b border-border"
        rowClassName="hover:bg-backgroundSecondary transition-colors duration-200"
      />
    </div>
  );
};

export default ClientListTable;
