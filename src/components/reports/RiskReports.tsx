import React from 'react';
import { 
  AlertTriangle, Shield, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, ArrowUp, ArrowDown
} from 'lucide-react';

interface RiskReportsProps {
  searchQuery: string;
  dateRange: string;
}

const RiskReports: React.FC<RiskReportsProps> = ({ searchQuery, dateRange }) => {
  // Mock data for demonstration
  const riskStats = {
    totalRisks: 24,
    highPriority: 5,
    mediumPriority: 12,
    lowPriority: 7,
    mitigated: 15,
    newRisks: 3
  };

  const riskCategories = {
    technical: 35,
    operational: 25,
    financial: 20,
    security: 20
  };

  const activeRisks = [
    {
      id: 1,
      title: 'Security Vulnerability',
      category: 'Security',
      priority: 'High',
      impact: 'Critical',
      status: 'Active',
      trend: 'increasing'
    },
    {
      id: 2,
      title: 'Budget Overrun',
      category: 'Financial',
      priority: 'Medium',
      impact: 'Moderate',
      status: 'Mitigated',
      trend: 'decreasing'
    },
    {
      id: 3,
      title: 'Resource Shortage',
      category: 'Operational',
      priority: 'High',
      impact: 'Significant',
      status: 'Active',
      trend: 'stable'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500 bg-red-100';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100';
      case 'low':
        return 'text-green-500 bg-green-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      {/* Risk Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Risks</p>
              <h3 className="text-2xl font-bold">{riskStats.totalRisks}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertTriangle className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">12%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High Priority Risks</p>
              <h3 className="text-2xl font-bold">{riskStats.highPriority}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-red-500 mr-1" size={16} />
            <span className="text-red-500">2</span>
            <span className="text-gray-500 ml-1">new this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mitigated Risks</p>
              <h3 className="text-2xl font-bold">{riskStats.mitigated}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">5</span>
            <span className="text-gray-500 ml-1">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Risks</p>
              <h3 className="text-2xl font-bold">{riskStats.newRisks}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">2</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Risk Categories</h3>
          <div className="space-y-4">
            {Object.entries(riskCategories).map(([category, percentage]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{category}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      category === 'technical' ? 'bg-blue-500' :
                      category === 'operational' ? 'bg-yellow-500' :
                      category === 'financial' ? 'bg-green-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Risks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Active Risks</h3>
          <div className="space-y-4">
            {activeRisks.map((risk) => (
              <div key={risk.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{risk.title}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(risk.priority)}`}>
                      {risk.priority}
                    </span>
                    <span className="text-sm text-gray-500">{risk.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center justify-end ${
                    risk.trend === 'increasing' ? 'text-red-500' :
                    risk.trend === 'decreasing' ? 'text-green-500' :
                    'text-yellow-500'
                  }`}>
                    {risk.trend === 'increasing' ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : risk.trend === 'decreasing' ? (
                      <TrendingDown size={16} className="mr-1" />
                    ) : (
                      <AlertCircle size={16} className="mr-1" />
                    )}
                    <span className="capitalize">{risk.trend}</span>
                  </div>
                  <span className={`text-sm ${
                    risk.status === 'Active' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {risk.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskReports;