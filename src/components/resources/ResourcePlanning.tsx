import React from 'react';
import { Calendar, Users, Wrench, Package } from 'lucide-react';

interface ResourcePlanningProps {
  searchQuery: string;
}

const ResourcePlanning: React.FC<ResourcePlanningProps> = ({ searchQuery }) => {
  // Mock data for demonstration
  const planningData = [
    {
      id: 1,
      project: 'Website Redesign',
      startDate: '2024-03-20',
      endDate: '2024-04-15',
      resources: [
        { name: 'Development Team A', type: 'human', hours: 120 },
        { name: 'Design Software Licenses', type: 'material', quantity: 5 }
      ]
    },
    {
      id: 2,
      project: 'Mobile App Development',
      startDate: '2024-04-01',
      endDate: '2024-05-30',
      resources: [
        { name: 'Development Team B', type: 'human', hours: 160 },
        { name: 'Testing Devices', type: 'equipment', quantity: 10 }
      ]
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'human':
        return <Users className="text-blue-500" size={16} />;
      case 'equipment':
        return <Wrench className="text-green-500" size={16} />;
      case 'material':
        return <Package className="text-purple-500" size={16} />;
      default:
        return null;
    }
  };

  const filteredPlanning = planningData.filter(plan =>
    plan.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="space-y-6">
        {filteredPlanning.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{plan.project}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                Edit Plan
              </button>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-4">Resource Requirements</h4>
              <div className="space-y-4">
                {plan.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-gray-500">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {resource.hours ? `${resource.hours} hours` : `${resource.quantity} units`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {resource.hours ? 'Time Allocated' : 'Quantity Required'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Resource Utilization</h4>
                  <p className="text-sm text-gray-500 mt-1">Overall resource allocation for the project</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">75%</div>
                  <div className="text-sm text-gray-500">Planned Utilization</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePlanning;