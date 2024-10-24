import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import TeamManagement from './pages/TeamManagement';
import ResourceManagement from './pages/ResourceManagement';
import Reports from './pages/Reports';
import BudgetManagement from './pages/BudgetManagement';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/resources" element={<ResourceManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budget" element={<BudgetManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={
              <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800">Page Under Construction</h1>
                <p className="text-gray-600 mt-2">This page is currently in development.</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;