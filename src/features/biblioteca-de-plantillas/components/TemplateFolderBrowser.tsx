import React from 'react';
import { Folder, Plus } from 'lucide-react';

// Define a type for a single folder
type FolderItem = {
  id: string;
  name: string;
};

// Static data for folders
const folders: FolderItem[] = [
  { id: '1', name: 'Fuerza para principiantes' },
  { id: '2', name: 'Pérdida de peso' },
  { id: '3', name: 'Clientes VIP' },
  { id: '4', name: 'Rehabilitación' },
];

// Props for the component
type TemplateFolderBrowserProps = {
  onSelectFolder: (folderId: string | null) => void;
  currentFolderId: string | null;
};

const TemplateFolderBrowser: React.FC<TemplateFolderBrowserProps> = ({ onSelectFolder, currentFolderId }) => {
  return (
    <aside className="bg-surface text-text p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-textSecondary">Carpetas</h2>
      
      <div className="flex-grow overflow-y-auto">
        <ul>
          {/* "All Templates" option */}
          <li
            onClick={() => onSelectFolder(null)}
            className={`flex items-center p-2 rounded-md cursor-pointer mb-2 transition-colors duration-200 ${
              currentFolderId === null
                ? 'bg-primary text-white'
                : 'hover:bg-backgroundSecondary'
            }`}
          >
            <Folder size={20} className="mr-3" />
            <span>Todas las Plantillas</span>
          </li>

          {/* Folder list */}
          {folders.map((folder) => (
            <li
              key={folder.id}
              onClick={() => onSelectFolder(folder.id)}
              className={`flex items-center p-2 rounded-md cursor-pointer mb-2 transition-colors duration-200 ${
                currentFolderId === folder.id
                  ? 'bg-primary text-white'
                  : 'hover:bg-backgroundSecondary'
              }`}
            >
              <Folder size={20} className="mr-3" />
              <span>{folder.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 mt-4">
        <Plus size={20} className="mr-2" />
        Crear Carpeta
      </button>
    </aside>
  );
};

export default TemplateFolderBrowser;
