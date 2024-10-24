import React from 'react';
import { BarChart2, TrendingUp, PieChart, Download } from 'lucide-react';

interface ResourceReportsProps {
  searchQuery: string;
}

const ResourceReports: React.FC<ResourceReportsProps> = ({ searchQuery }) => {
  // Mock data for demonstration
  const reports = [
    {
      id: 1,
      title: 'Resource Utilization',
      type: 'chart',
      data: {
        labels: ['Development', 'Design', 'Testing', 'Infrastructure'],
        values: [85, 65, 75, 45]
      }
    },
    {
      id: 2,
      title: 'Resource Costs',
      type: 'trend',
      data: {
        current: 45000,
        previous: 42000,
        change: 7.14
      }
    },
    {
      id: 3,
      title: 'Resource Distribution',
      type: 'pie',
      data: {
        human: 45,
        equipment: 30,
        material: 25
      }
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resource Utilization */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold">Resource Utilization</h3>
              <p className="text-sm text-gray-500 mt-1">Current allocation by department</p>
            </div>
            <BarChart2 className="text-blue-500" size={24} />
          </div>
          
          <div className="space-y-4">
            {reports[0].data.labels.map((label, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span className="font-medium">{reports[0].data.values[index]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${reports[0].data.values[index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Costs */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold">Resource Costs</h3>
              <p className="text-sm text-gray-500 mt-1">Monthly resource expenses</p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold">${reports[1].data.current.toLocaleString()}</div>
            <div className="flex items-center justify-center mt-2">
              <span className={`text-sm ${reports[1].data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {reports[1].data.change >= 0 ? '+' : ''}{reports[1].data.change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <button className="w-full mt-6 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center">
            <Download size={16} className="mr-2" />
            Download Full Report
          </button>
        </div>

        {/* Resource Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold">Resource Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">By resource type</p>
            </div>
            <PieChart className="text-purple-500" size={24} />
          </div>

          <div className="space-y-4">
            {Object.entries(reports[2].data).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      key === 'human' ? 'bg-blue-500' :
                      key === 'equipment' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceReports;