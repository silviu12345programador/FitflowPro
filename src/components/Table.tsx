import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Array<Record<string, any>>;
  onRowClick?: (row: any) => void;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({ 
  columns, 
  data, 
  onRowClick, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="w-full p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={`${
                onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;