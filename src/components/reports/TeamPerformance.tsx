import React from 'react';
import { 
  Users, Award, TrendingUp, CheckCircle2,
  Clock, Target, ArrowUp, ArrowDown
} from 'lucide-react';

interface TeamPerformanceProps {
  searchQuery: string;
  dateRange: string;
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ searchQuery, dateRange }) => {
  // Mock data for demonstration
  const performanceStats = {
    totalMembers: 24,
    averageEfficiency: 85,
    tasksCompleted: 145,
    onTimeDelivery: 92
  };

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Developer',
      performance: {
        efficiency: 88,
        tasksCompleted: 45,
        onTimeDelivery: 95,
        collaboration: 90
      },
      trend: 'up'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      performance: {
        efficiency: 92,
        tasksCompleted: 38,
        onTimeDelivery: 97,
        collaboration: 85
      },
      trend: 'up'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Project Manager',
      performance: {
        efficiency: 85,
        tasksCompleted: 32,
        onTimeDelivery: 88,
        collaboration: 95
      },
      trend: 'down'
    }
  ];

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-blue-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6">
      {/* Performance Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <h3 className="text-2xl font-bold">{performanceStats.totalMembers}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">2</span>
            <span className="text-gray-500 ml-1">new this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Efficiency</p>
              <h3 className="text-2xl font-bold">{performanceStats.averageEfficiency}%</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <h3 className="text-2xl font-bold">{performanceStats.tasksCompleted}</h3>
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
              <p className="text-sm text-gray-500">On-Time Delivery</p>
              <h3 className="text-2xl font-bold">{performanceStats.onTimeDelivery}%</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">3%</span>
            <span className="text-gray-500 ml-1">improvement</span>
          </div>
        </div>
      </div>

      {/* Team Performance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Individual Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  On-Time Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collaboration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${getPerformanceColor(member.performance.efficiency)}`}>
                      {member.performance.efficiency}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{member.performance.tasksCompleted}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${getPerformanceColor(member.performance.onTimeDelivery)}`}>
                      {member.performance.onTimeDelivery}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${getPerformanceColor(member.performance.collaboration)}`}>
                      {member.performance.collaboration}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${
                      member.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {member.trend === 'up' ? (
                        <ArrowUp size={16} className="mr-1" />
                      ) : (
                        <ArrowDown size={16} className="mr-1" />
                      )}
                      <span className="capitalize">{member.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;