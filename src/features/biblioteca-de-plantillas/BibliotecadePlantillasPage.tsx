import React from 'react';

const BibliotecadePlantillasPage: React.FC = () => {
  // Datos de ejemplo para las plantillas
  const templates = [
    {
      id: 1,
      title: 'Plan de Entrenamiento para Principiantes',
      description: 'Un plan de 4 semanas para empezar en el gimnasio, enfocado en la técnica y la progresión.',
      type: 'Entrenamiento',
      duration: '4 semanas',
      author: 'Entrenador A',
    },
    {
      id: 2,
      title: 'Plan de Nutrición para Ganar Masa Muscular',
      description: 'Dieta alta en proteínas y carbohidratos para maximizar el crecimiento muscular.',
      type: 'Nutrición',
      calories: '3000 kcal',
      author: 'Nutricionista B',
    },
    {
      id: 3,
      title: 'Plan de Entrenamiento de Alta Intensidad (HIIT)',
      description: 'Rutina de 30 minutos con ejercicios cardiovasculares para quemar grasa eficientemente.',
      type: 'Entrenamiento',
      duration: '6 semanas',
      author: 'Entrenador C',
    },
    {
      id: 4,
      title: 'Plan de Nutrición Vegano y Equilibrado',
      description: 'Dieta completa y balanceada sin productos de origen animal, rica en nutrientes.',
      type: 'Nutrición',
      calories: '2200 kcal',
      author: 'Nutricionista D',
    },
    {
      id: 5,
      title: 'Plan de Fuerza 5x5',
      description: 'Programa clásico de levantamiento de pesas para aumentar la fuerza en los básicos.',
      type: 'Entrenamiento',
      duration: '8 semanas',
      author: 'Entrenador E',
    },
    {
      id: 6,
      title: 'Plan de Nutrición para Definición',
      description: 'Dieta hipocalórica para reducir el porcentaje de grasa corporal manteniendo el músculo.',
      type: 'Nutrición',
      calories: '1800 kcal',
      author: 'Nutricionista F',
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Biblioteca de Plantillas</h1>
          <p className="text-lg text-gray-600 mt-2">
            Crea, gestiona y reutiliza tus planes de entrenamiento y nutrición.
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Crear Nueva Plantilla
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-10 bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Buscar plantillas por nombre, tipo o autor..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Filtrar por Tipo</option>
            <option>Entrenamiento</option>
            <option>Nutrición</option>
          </select>
          <button className="text-gray-600 hover:text-indigo-600">
            Ordenar por: Recientes
          </button>
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  template.type === 'Entrenamiento'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {template.type}
                </span>
                <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h2>
              <p className="text-gray-600 text-sm flex-grow mb-4">{template.description}</p>
              
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{template.type === 'Entrenamiento' ? `Duración: ${template.duration}` : `Calorías: ${template.calories}`}</span>
                  <span>Autor: {template.author}</span>
                </div>
                <button className="w-full mt-4 bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                  Usar esta Plantilla
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibliotecadePlantillasPage;
