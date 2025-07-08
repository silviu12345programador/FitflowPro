# FitFlow Pro

## Descripción
Plataforma todo en uno que centraliza la gestión de clientes (CRM), la creación de planes de entrenamiento y nutrición personalizados, el seguimiento del progreso y la automatización de pagos recurrentes para entrenadores personales.

## Páginas
1. **Panel de Control (Dashboard)** (/dashboard)
   - Vista principal para el entrenador después de iniciar sesión. Muestra un resumen de clientes activos, próximos pagos, tareas pendientes y estadísticas clave del progreso de los clientes.
2. **Gestión de Clientes (CRM)** (/clients)
   - Listado de todos los clientes del entrenador. Permite buscar, filtrar, y añadir nuevos clientes. Muestra información básica como nombre, estado (activo/inactivo) y progreso general.
3. **Perfil del Cliente** (/clients/:id)
   - Página de detalle para un cliente específico. Centraliza su información, plan de entrenamiento, plan de nutrición, seguimiento de progreso (gráficos), historial de pagos y notas.
4. **Creador de Planes de Entrenamiento** (/workouts/builder)
   - Herramienta interactiva para crear y personalizar planes de entrenamiento. Incluye una biblioteca de ejercicios y permite organizar rutinas por días, series y repeticiones.
5. **Creador de Planes de Nutrición** (/nutrition/builder)
   - Herramienta para diseñar planes de alimentación personalizados. Permite añadir comidas, buscar en una base de datos de alimentos y calcular macronutrientes.
6. **Gestión de Pagos** (/billing)
   - Sección para que el entrenador gestione la facturación. Muestra el historial de pagos, facturas, estado de las suscripciones y configura los planes de pago recurrentes.
7. **Biblioteca de Plantillas** (/library)
   - Repositorio personal para guardar planes de entrenamiento y nutrición como plantillas reutilizables, agilizando la asignación a nuevos clientes.
8. **Configuración de Cuenta** (/settings)
   - Página donde el entrenador puede gestionar su perfil público, cambiar contraseña, configurar notificaciones y conectar integraciones de pago.

## Componentes Globales
- **Button**: Componente reutilizable para botones
- **Table**: Componente reutilizable para tablas
- **Sidebar**: Navegación principal

## Arquitectura
- Basada en features
- Cada feature en su propia carpeta
- Componentes globales mínimos