import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  BarChart2, 
  Timer,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react';
import MonthView from '../components/calendar/MonthView';
import GanttView from '../components/calendar/GanttView';
import SprintView from '../components/calendar/SprintView';
import MeetingView from '../components/calendar/MeetingView';
import { CalendarViewMode } from '../types/calendar';

const Calendar = () => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past'>('all');

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Calendar</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Month View"
            >
              <CalendarIcon size={20} />
            </button>
            <button
              onClick={() => setViewMode('gantt')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'gantt' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Gantt Chart"
            >
              <BarChart2 size={20} />
            </button>
            <button
              onClick={() => setViewMode('sprint')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'sprint' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Sprint View"
            >
              <Timer size={20} />
            </button>
            <button
              onClick={() => setViewMode('meetings')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'meetings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Meetings"
            >
              <Users size={20} />
            </button>
          </div>
          <button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
              hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>
              {viewMode === 'meetings' ? 'New Meeting' :
               viewMode === 'sprint' ? 'New Sprint' :
               'New Event'}
            </span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past Events</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg
              hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Export Calendar</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString('default', { 
              month: 'long', 
              year: 'numeric'
            })}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 
              rounded-lg transition-colors"
          >
            Today
          </button>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm
              focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={currentDate.getMonth()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setMonth(parseInt(e.target.value));
              setCurrentDate(newDate);
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(2024, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm
              focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={currentDate.getFullYear()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setFullYear(parseInt(e.target.value));
              setCurrentDate(newDate);
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={2020 + i}>
                {2020 + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {viewMode === 'month' && (
          <MonthView 
            currentDate={currentDate}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
          />
        )}
        {viewMode === 'gantt' && (
          <GanttView 
            currentDate={currentDate}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
          />
        )}
        {viewMode === 'sprint' && (
          <SprintView 
            currentDate={currentDate}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
          />
        )}
        {viewMode === 'meetings' && (
          <MeetingView 
            currentDate={currentDate}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
          />
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          <div className="text-3xl font-bold text-blue-500">8</div>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Active Sprints</h3>
          <div className="text-3xl font-bold text-green-500">2</div>
          <p className="text-sm text-gray-500">In progress</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Team Meetings</h3>
          <div className="text-3xl font-bold text-purple-500">5</div>
          <p className="text-sm text-gray-500">This week</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;