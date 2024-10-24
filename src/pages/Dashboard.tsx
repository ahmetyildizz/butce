import React from 'react';
import { 
  Activity, Users, Clock, AlertTriangle, Calendar as CalendarIcon,
  CheckCircle, XCircle, AlertCircle, ChevronRight, MoreVertical
} from 'lucide-react';

// Mock data for demonstration
const projectStats = {
  activeProjects: 12,
  teamMembers: 24,
  hoursLogged: 164,
  criticalTasks: 5
};

const recentUpdates = [
  { id: 1, user: 'John Doe', action: 'completed task', item: 'Database Migration', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'commented on', item: 'UI Design Review', time: '3 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'created task', item: 'API Integration', time: '5 hours ago' },
];

const criticalTasks = [
  { id: 1, task: 'Security Audit', deadline: '2024-03-20', priority: 'High', status: 'In Progress' },
  { id: 2, task: 'Client Presentation', deadline: '2024-03-18', priority: 'Critical', status: 'Pending' },
  { id: 3, task: 'Database Backup', deadline: '2024-03-19', priority: 'High', status: 'In Review' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', date: '2024-03-17 10:00', type: 'meeting' },
  { id: 2, title: 'Project Deadline', date: '2024-03-18 18:00', type: 'deadline' },
  { id: 3, title: 'Client Review', date: '2024-03-19 14:00', type: 'review' },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      
      {/* Project Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Active Projects" 
          value={projectStats.activeProjects} 
          icon={<Activity size={24} />} 
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Team Members" 
          value={projectStats.teamMembers} 
          icon={<Users size={24} />} 
          color="bg-green-500" 
        />
        <DashboardCard 
          title="Hours Logged" 
          value={projectStats.hoursLogged} 
          icon={<Clock size={24} />} 
          color="bg-purple-500" 
        />
        <DashboardCard 
          title="Critical Tasks" 
          value={projectStats.criticalTasks} 
          icon={<AlertTriangle size={24} />} 
          color="bg-red-500" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Updates</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {update.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{update.user}</span>
                    {' '}{update.action}{' '}
                    <span className="font-medium">{update.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm">View Calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex flex-col items-center justify-center">
                  <CalendarIcon size={16} className="text-blue-500" />
                  <span className="text-xs font-medium mt-1">
                    {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Critical Tasks */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Critical Tasks</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm">View All Tasks</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Task</th>
                  <th className="text-left py-3 px-4">Deadline</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {criticalTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{task.task}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center">
                        <CalendarIcon size={14} className="mr-2 text-gray-500" />
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-600">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} rounded-lg shadow p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default Dashboard;