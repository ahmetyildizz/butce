import React from 'react';
import { Sprint } from '../../types/calendar';
import { Calendar, Timer, CheckCircle } from 'lucide-react';

interface SprintViewProps {
  currentDate: Date;
  searchQuery?: string;
  filterStatus?: string;
}

const SprintView: React.FC<SprintViewProps> = ({ currentDate }) => {
  // Mock data for demonstration
  const sprints: Sprint[] = [
    {
      id: 1,
      name: 'Sprint 1',
      startDate: '2024-03-15',
      endDate: '2024-03-29',
      goals: [
        'Complete user authentication',
        'Implement dashboard analytics',
        'Setup CI/CD pipeline'
      ],
      status: 'active',
      tasks: [1, 2, 3]
    },
    // Add more mock sprints
  ];

  const getSprintStatus = (status: Sprint['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {sprints.map((sprint) => (
          <div key={sprint.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{sprint.name}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSprintStatus(sprint.status)}`}>
                    {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Timer size={20} />
              </button>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Sprint Goals</h4>
              <ul className="space-y-2">
                {sprint.goals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={16} className="mr-2 mt-1 text-green-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Progress</h4>
                <span className="text-sm text-gray-500">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SprintView;