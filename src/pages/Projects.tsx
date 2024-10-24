import React, { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectSearch from '../components/projects/ProjectSearch';
import { Project, ProjectStatus } from '../types/project';

const Projects = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'archived'>('all');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      code: 'WR-2024',
      description: 'Complete overhaul of company website',
      status: 'In Progress',
      favorite: true,
      archived: false,
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      progress: 45,
      team: ['John Doe', 'Jane Smith'],
    },
    // Add more mock projects as needed
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = (
      (activeTab === 'all' && !project.archived) ||
      (activeTab === 'favorites' && project.favorite && !project.archived) ||
      (activeTab === 'archived' && project.archived)
    );
    return matchesSearch && matchesTab;
  });

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setShowNewProjectForm(false);
  };

  const handleToggleFavorite = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, favorite: !project.favorite }
        : project
    ));
  };

  const handleArchiveProject = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, archived: !project.archived }
        : project
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <button
          onClick={() => setShowNewProjectForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg 
            flex items-center space-x-2 transition-colors"
        >
          <span>New Project</span>
        </button>
      </div>

      <ProjectSearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'favorites', label: 'Favorites' },
              { key: 'archived', label: 'Archived' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <ProjectList
          projects={filteredProjects}
          onToggleFavorite={handleToggleFavorite}
          onArchiveProject={handleArchiveProject}
        />
      </div>

      {showNewProjectForm && (
        <ProjectForm
          onSubmit={handleAddProject}
          onClose={() => setShowNewProjectForm(false)}
        />
      )}
    </div>
  );
};

export default Projects;