import React, { useState } from 'react';
import { 
  Plus, Calendar, Clock, CheckCircle2, AlertCircle,
  ListTodo, Filter, Search, ChevronDown
} from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskCalendar from '../components/tasks/TaskCalendar';
import { Task, TaskStatus } from '../types/task';

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for the project',
    projectId: 1,
    assignedTo: ['John Doe', 'Jane Smith'],
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-03-25',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    tags: ['design', 'frontend']
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Integrate backend APIs with frontend components',
    projectId: 1,
    assignedTo: ['Mike Johnson'],
    priority: 'Medium',
    status: 'Not Started',
    dueDate: '2024-03-28',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    tags: ['backend', 'api']
  },
  // Add more mock tasks as needed
];

type ViewMode = 'list' | 'calendar';
type TaskFilter = 'all' | 'pending' | 'completed';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
    setShowNewTaskForm(false);
  };

  const handleUpdateTaskStatus = (taskId: number, status: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'pending' ? task.status !== 'Completed' :
      task.status === 'Completed';
    const matchesPriority = 
      selectedPriority === 'all' ? true :
      task.priority.toLowerCase() === selectedPriority.toLowerCase();
    
    return matchesSearch && matchesFilter && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ListTodo size={20} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg ${
                viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
            </button>
          </div>
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
              hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === 'all' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === 'pending' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === 'completed' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64
                focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <ChevronDown 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="bg-white rounded-lg shadow">
        {viewMode === 'list' ? (
          <TaskList 
            tasks={filteredTasks}
            onUpdateStatus={handleUpdateTaskStatus}
          />
        ) : (
          <TaskCalendar tasks={filteredTasks} />
        )}
      </div>

      {/* New Task Form Modal */}
      {showNewTaskForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onClose={() => setShowNewTaskForm(false)}
        />
      )}
    </div>
  );
};

export default Tasks;