import React from 'react';
import { 
  BarChart2, TrendingUp, CheckCircle2, Clock,
  Award, Target, ArrowUp, ArrowDown
} from 'lucide-react';
import { TeamMember } from '../../types/team';

interface PerformanceMetricsProps {
  members: TeamMember[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ members }) => {
  const getPerformanceColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-blue-500';
    if (value >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const calculateTeamAverages = () => {
    const total = members.reduce(
      (acc, member) => ({
        tasksCompleted: acc.tasksCompleted + member.performance.tasksCompleted,
        onTimeDelivery: acc.onTimeDelivery + member.performance.onTimeDelivery,
        projectContributions: acc.projectContributions + member.performance.projectContributions
      }),
      { tasksCompleted: 0, onTimeDelivery: 0, projectContributions: 0 }
    );

    return {
      tasksCompleted: Math.round(total.tasksCompleted / members.length),
      onTimeDelivery: Math.round(total.onTimeDelivery / members.length),
      projectContributions: Math.round(total.projectContributions / members.length)
    };
  };

  const teamAverages = calculateTeamAverages();

  return (
    <div className="p-6 space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <h3 className="text-2xl font-bold">{teamAverages.tasksCompleted}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle2 className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">12%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On-Time Delivery</p>
              <h3 className="text-2xl font-bold">{teamAverages.onTimeDelivery}%</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="text-green-500" size={24} />
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
              <p className="text-sm text-gray-500">Project Contributions</p>
              <h3 className="text-2xl font-bold">{teamAverages.projectContributions}%</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="text-red-500 mr-1" size={16} />
            <span className="text-red-500">3%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Individual Performance */}
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
                  Tasks Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  On-Time Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Contributions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => {
                const overallRating = Math.round(
                  (member.performance.tasksCompleted +
                    member.performance.onTimeDelivery +
                    member.performance.projectContributions) / 3
                );

                return (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <span className="text-xl font-medium text-gray-600">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CheckCircle2 
                          className={getPerformanceColor(member.performance.tasksCompleted)} 
                          size={16} 
                        />
                        <span className="ml-2">{member.performance.tasksCompleted}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Clock 
                          className={getPerformanceColor(member.performance.onTimeDelivery)} 
                          size={16} 
                        />
                        <span className="ml-2">{member.performance.onTimeDelivery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Target 
                          className={getPerformanceColor(member.performance.projectContributions)} 
                          size={16} 
                        />
                        <span className="ml-2">{member.performance.projectContributions}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Award 
                          className={getPerformanceColor(overallRating)} 
                          size={16} 
                        />
                        <span className="ml-2">{overallRating}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;