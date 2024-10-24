import React from 'react';
import { 
  Clock, Calendar, Users, ArrowUp,
  ArrowDown, BarChart2, AlertCircle
} from 'lucide-react';

interface TimeReportsProps {
  searchQuery: string;
  dateRange: string;
}

const TimeReports: React.FC<TimeReportsProps> = ({ searchQuery, dateRange }) => {
  // Mock data for demonstration
  const timeStats = {
    totalHours: 1240,
    billableHours: 980,
    nonBillableHours: 260,
    utilization: 79,
    overtime: 45
  };

  const timeEntries = [
    {
      id: 1,
      project: 'Website Redesign',
      hours: 180,
      team: 'Development',
      efficiency: 85,
      trend: 5
    },
    {
      id: 2,
      project: 'Mobile App Development',
      hours: 240,
      team: 'Mobile Team',
      efficiency: 92,
      trend: 8
    },
    {
      id: 3,
      project: 'Database Migration',
      hours: 120,
      team: 'Infrastructure',
      efficiency: 78,
      trend: -3
    }
  ];

  const weeklyDistribution = {
    monday: 42,
    tuesday: 38,
    wednesday: 45,
    thursday: 40,
    friday: 35,
    saturday: 10,
    sunday: 5
  };

  return (
    <div className="p-6">
      {/* Time Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <h3 className="text-2xl font-bold">{timeStats.totalHours}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-500" size={24} />
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
              <p className="text-sm text-gray-500">Billable Hours</p>
              <h3 className="text-2xl font-bold">{timeStats.billableHours}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart2 className="text-green-500" size={24} />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(timeStats.billableHours / timeStats.totalHours) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Utilization Rate</p>
              <h3 className="text-2xl font-bold">{timeStats.utilization}%</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">5%</span>
            <span className="text-gray-500 ml-1">improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overtime Hours</p>
              <h3 className="text-2xl font-bold">{timeStats.overtime}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="text-green-500 mr-1" size={16} />
            <span className="text-green-500">8%</span>
            <span className="text-gray-500 ml-1">reduction</span>
          </div>
        </div>
      </div>

      {/* Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Weekly Time Distribution</h3>
          <div className="space-y-4">
            {Object.entries(weeklyDistribution).map(([day, hours]) => (
              <div key={day}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{day}</span>
                  <span>{hours} hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(hours / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Time Entries */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Project Time Allocation</h3>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{entry.project}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {entry.team} • {entry.hours} hours
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {entry.efficiency}%
                  </div>
                  <div className={`flex items-center justify-end ${
                    entry.trend > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {entry.trend > 0 ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    <span>{Math.abs(entry.trend)}%</span>
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

export default TimeReports;