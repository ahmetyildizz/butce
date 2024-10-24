import React from 'react';
import { Users, Package, Wrench, Archive } from 'lucide-react';

interface ResourceAllocationProps {
  searchQuery: string;
}

const ResourceAllocation: React.FC<ResourceAllocationProps> = ({ searchQuery }) => {
  // Mock data for demonstration
  const resources = [
    {
      id: 1,
      name: 'Development Team A',
      type: 'human',
      allocation: 85,
      projects: ['Website Redesign', 'Mobile App'],
      capacity: 100,
      available: 15
    },
    {
      id: 2,
      name: 'Server Infrastructure',
      type: 'equipment',
      allocation: 60,
      projects: ['Cloud Migration', 'Database Upgrade'],
      capacity: 100,
      available: 40
    },
    {
      id: 3,
      name: 'Design Software Licenses',
      type: 'material',
      allocation: 95,
      projects: ['UI/UX Redesign', 'Brand Update'],
      capacity: 10,
      available: 1
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'human':
        return <Users className="text-blue-500" size={24} />;
      case 'equipment':
        return <Wrench className="text-green-500" size={24} />;
      case 'material':
        return <Package className="text-purple-500" size={24} />;
      default:
        return <Archive className="text-gray-500" size={24} />;
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="grid gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {getResourceIcon(resource.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{resource.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  Available: {resource.available}%
                </div>
                <div className="text-xs text-gray-500">
                  Capacity: {resource.capacity}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Current Allocation</span>
                <span className="text-sm text-gray-500">{resource.allocation}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    resource.allocation > 90 ? 'bg-red-500' :
                    resource.allocation > 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${resource.allocation}%` }}
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Assigned Projects</h4>
              <div className="flex flex-wrap gap-2">
                {resource.projects.map((project, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceAllocation;