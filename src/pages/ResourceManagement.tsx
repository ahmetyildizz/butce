import React, { useState } from 'react';
import { 
  Users, Package, FileText, Plus, Search,
  BarChart2, Calendar, Download, Filter
} from 'lucide-react';
import ResourceAllocation from '../components/resources/ResourceAllocation';
import ResourcePlanning from '../components/resources/ResourcePlanning';
import ResourceReports from '../components/resources/ResourceReports';
import AddResource from '../components/resources/AddResource';

type ViewMode = 'allocation' | 'planning' | 'reports' | 'add';

const ResourceManagement = () => {
  const [activeView, setActiveView] = useState<ViewMode>('allocation');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Resource Management</h1>
        <button
          onClick={() => setActiveView('add')}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
            hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Resource</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Resources</option>
            <option value="human">Human Resources</option>
            <option value="equipment">Equipment</option>
            <option value="material">Materials</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg
              hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8" aria-label="Resource Management">
          <button
            onClick={() => setActiveView('allocation')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeView === 'allocation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Package size={20} className="inline-block mr-2" />
            Resource Allocation
          </button>
          <button
            onClick={() => setActiveView('planning')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeView === 'planning'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Calendar size={20} className="inline-block mr-2" />
            Resource Planning
          </button>
          <button
            onClick={() => setActiveView('reports')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeView === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <BarChart2 size={20} className="inline-block mr-2" />
            Resource Reports
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeView === 'allocation' && (
          <ResourceAllocation searchQuery={searchQuery} />
        )}
        {activeView === 'planning' && (
          <ResourcePlanning searchQuery={searchQuery} />
        )}
        {activeView === 'reports' && (
          <ResourceReports searchQuery={searchQuery} />
        )}
        {activeView === 'add' && (
          <AddResource onClose={() => setActiveView('allocation')} />
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;