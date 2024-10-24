import React from 'react';
import { 
  CheckCircle2, Clock, AlertCircle, 
  ArrowUp, ArrowDown 
} from 'lucide-react';

interface ProjectReportsProps {
  searchQuery: string;
  dateRange: string;
}

const ProjectReports: React.FC<ProjectReportsProps> = ({ searchQuery, dateRange }) => {
  // Mock data for demonstration
  const projectStats = {
    totalProjects: 12,
    completedProjects: 5,
    inProgress: 6,
    delayed: 1,
    overallProgress: 68,
    tasksCompleted: 145,
    totalTasks: 200
  };

  const recentMilestones = [
    {
      id: 1,
      name: 'Frontend Development',
      progress: 75,
      status: 'In Progress',
      dueDate: '2024-04-15'
    },
    {
      id: 2,
      name: 'Database Migration',
      progress: 90,
      status: 'Completed',
      dueDate: '2024-03-30'
    },
    {
      id: 3,
      name: 'User Testing',
      progress: 30,
      status: 'In Progress',
      dueDate: '2024-04-30'
    }
  ];

  return (
    <div className="p-6">
      {/* Project Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold">{projectStats.totalProjects}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle2 className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">8%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <h3 className="text-2xl font-bold">{projectStats.overallProgress}%</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${projectStats.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <h3 className="text-2xl font-bold">
                {projectStats.tasksCompleted}/{projectStats.totalTasks}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle2 className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">12%</span>
            <span className="text-gray-500 ml-1">completion rate</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delayed Projects</p>
              <h3 className="text-2xl font-bold">{projectStats.delayed}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">2%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Milestones */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Milestones</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {recentMilestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.name}</h4>
                  <div className="flex items-center mt-2">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{milestone.progress}%</span>
                    <span className={`
                      ${milestone.status === 'Completed' ? 'text-green-500' :
                        milestone.status === 'In Progress' ? 'text-blue-500' :
                        'text-yellow-500'}
                    `}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        milestone.status === 'Completed' ? 'bg-green-500' :
                        milestone.status === 'In Progress' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReports;