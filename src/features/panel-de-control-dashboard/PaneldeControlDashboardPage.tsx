import React from 'react';
import ActiveClientsSummaryCard from './components/ActiveClientsSummaryCard';
import ClientProgressChart from './components/ClientProgressChart';
import PaymentsStatusWidget from './components/PaymentsStatusWidget';
import TodoTasksList from './components/TodoTasksList';
import ClientAlertsPanel from './components/ClientAlertsPanel';
import QuickActionsToolbar from './components/QuickActionsToolbar';

const PaneldeControlDashboardPage: React.FC = () => {
  return (
    <div className="p-6 bg-background text-text">
      <h1 className="text-3xl font-bold mb-6 text-text">Panel de Control</h1>
      <QuickActionsToolbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActiveClientsSummaryCard />
          <PaymentsStatusWidget />
        </div>
        <div className="lg:row-span-2 flex flex-col gap-6">
          <ClientAlertsPanel />
          <TodoTasksList />
        </div>
        <div className="lg:col-span-2 bg-surface rounded-lg shadow p-6">
          <ClientProgressChart />
        </div>
      </div>
    </div>
  );
};

export default PaneldeControlDashboardPage;
