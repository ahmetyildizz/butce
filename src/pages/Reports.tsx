import React, { useState } from 'react';
import { 
  BarChart2, DollarSign, Clock, AlertTriangle, 
  Users, Search, Download, Filter 
} from 'lucide-react';
import ProjectReports from '../components/reports/ProjectReports';
import BudgetReports from '../components/reports/BudgetReports';
import TimeReports from '../components/reports/TimeReports';
import RiskReports from '../components/reports/RiskReports';
import TeamPerformance from '../components/reports/TeamPerformance';

type ReportType = 'project' | 'budget' | 'time' | 'risk' | 'team';

const Reports = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('project');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('last-30');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Reports</h1>
        <button
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
            hover:bg-blue-600 transition-colors"
        >
          <Download size={20} />
          <span>Export Reports</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search in reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="last-7">Last 7 Days</option>
            <option value="last-30">Last 30 Days</option>
            <option value="last-90">Last 90 Days</option>
            <option value="year-to-date">Year to Date</option>
          </select>
        </div>
      </div>

      {/* Report Type Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveReport('project')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeReport === 'project'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <BarChart2 size={20} className="inline-block mr-2" />
            Project Reports
          </button>
          <button
            onClick={() => setActiveReport('budget')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeReport === 'budget'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <DollarSign size={20} className="inline-block mr-2" />
            Budget Reports
          </button>
          <button
            onClick={() => setActiveReport('time')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeReport === 'time'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Clock size={20} className="inline-block mr-2" />
            Time Reports
          </button>
          <button
            onClick={() => setActiveReport('risk')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeReport === 'risk'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <AlertTriangle size={20} className="inline-block mr-2" />
            Risk Analysis
          </button>
          <button
            onClick={() => setActiveReport('team')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeReport === 'team'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Users size={20} className="inline-block mr-2" />
            Team Performance
          </button>
        </nav>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow">
        {activeReport === 'project' && (
          <ProjectReports searchQuery={searchQuery} dateRange={dateRange} />
        )}
        {activeReport === 'budget' && (
          <BudgetReports searchQuery={searchQuery} dateRange={dateRange} />
        )}
        {activeReport === 'time' && (
          <TimeReports searchQuery={searchQuery} dateRange={dateRange} />
        )}
        {activeReport === 'risk' && (
          <RiskReports searchQuery={searchQuery} dateRange={dateRange} />
        )}
        {activeReport === 'team' && (
          <TeamPerformance searchQuery={searchQuery} dateRange={dateRange} />
        )}
      </div>
    </div>
  );
};

export default Reports;