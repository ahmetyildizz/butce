import React from 'react';
import { Search } from 'lucide-react';

interface ProjectSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProjectSearch: React.FC<ProjectSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          text-sm"
        placeholder="Search projects by name or code..."
      />
    </div>
  );
};

export default ProjectSearch;