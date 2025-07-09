
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { X, Printer } from 'lucide-react';

// Mock data structure for the plan, replace with your actual data structure
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

interface Day {
  name: string;
  exercises: Exercise[];
}

interface Plan {
  name: string;
  days: Day[];
}

interface PlanPreviewModalProps {
  plan: Plan;
  onClose: () => void;
}

const PlanPreviewModal = ({ plan, onClose }: PlanPreviewModalProps) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${plan.name} - Plan de Entrenamiento`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-text">Vista Previa del Plan</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-textInverse hover:bg-primaryHover"
            >
              <Printer size={16} />
              Descargar PDF / Imprimir
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-backgroundSecondary"
            >
              <X size={20} className="text-textMuted" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div ref={componentRef} className="p-8 bg-backgroundSecondary">
            <article className="prose prose-invert max-w-none">
              {/* Header with logo and title */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Replace with your logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 5c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/><path d="M12 15s2-4 4-4 4 4 4 4"/><path d="M10 15s2-4 4-4 4 4 4 4"/></svg>
                  <h1 className="text-4xl font-bold text-text">{plan.name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-textSecondary">FitFlow Pro</p>
                  <p className="text-textMuted">Generado el: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Plan content */}
              {plan.days.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-8 break-after-page">
                  <h2 className="text-2xl font-semibold border-b-2 border-primary pb-2 mb-4 text-primaryLight">{day.name}</h2>
                  <div className="space-y-6">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="p-4 border rounded-md border-border bg-card">
                        <h3 className="text-xl font-bold text-accent">{exercise.name}</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="font-bold text-textSecondary">Series</p>
                            <p className="text-text">{exercise.sets}</p>
                          </div>
                          <div>
                            <p className="font-bold text-textSecondary">Repeticiones</p>
                            <p className="text-text">{exercise.reps}</p>
                          </div>
                        </div>
                        {exercise.notes && (
                          <div className="mt-4">
                            <p className="font-bold text-textSecondary">Notas</p>
                            <p className="text-text italic">{exercise.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlanPreviewModal;
