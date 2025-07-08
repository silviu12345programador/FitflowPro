import React from 'react';

const CreadordePlanesdeNutriciónPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Creador de Planes de Nutrición</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Herramienta para diseñar planes de alimentación personalizados. 
          Permite añadir comidas, buscar en una base de datos de alimentos 
          y calcular macronutrientes.
        </p>
      </div>
    </div>
  );
};

export default CreadordePlanesdeNutriciónPage;