import React, { useState } from 'react';
import { 
  Users, UserPlus, Shield, MessageSquare, BarChart2,
  Search, Filter, Download, Mail, MessageCircle
} from 'lucide-react';
import TeamList from '../components/team/TeamList';
import AddTeamMember from '../components/team/AddTeamMember';
import RoleManagement from '../components/team/RoleManagement';
import TeamCommunication from '../components/team/TeamCommunication';
import PerformanceMetrics from '../components/team/PerformanceMetrics';
import { TeamMember, TeamRole } from '../types/team';

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Project Manager',
    department: 'Engineering',
    joinDate: '2024-01-15',
    skills: ['React', 'TypeScript', 'Project Management'],
    activeProjects: [1, 2],
    performance: {
      tasksCompleted: 45,
      onTimeDelivery: 92,
      projectContributions: 87
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Team Member',
    department: 'Design',
    joinDate: '2024-02-01',
    skills: ['UI/UX', 'Figma', 'User Research'],
    activeProjects: [1],
    performance: {
      tasksCompleted: 38,
      onTimeDelivery: 95,
      projectContributions: 82
    }
  }
];

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'roles' | 'communication' | 'performance'>('members');
  const [showAddMember, setShowAddMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<TeamRole | 'all'>('all');

  const handleAddMember = (newMember: Omit<TeamMember, 'id'>) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now(),
      performance: {
        tasksCompleted: 0,
        onTimeDelivery: 100,
        projectContributions: 0
      }
    };
    setTeamMembers([...teamMembers, member]);
    setShowAddMember(false);
  };

  const handleUpdateRole = (memberId: number, newRole: TeamRole) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Team Management</h1>
        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
            hover:bg-blue-600 transition-colors"
        >
          <UserPlus size={20} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as TeamRole | 'all')}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2
              focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Project Manager">Project Managers</option>
            <option value="Team Member">Team Members</option>
            <option value="Client">Clients</option>
            <option value="Stakeholder">Stakeholders</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg
              hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Export Team Data</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8" aria-label="Team Management">
          <button
            onClick={() => setActiveTab('members')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'members'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Users size={20} className="inline-block mr-2" />
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'roles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <Shield size={20} className="inline-block mr-2" />
            Roles & Permissions
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'communication'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <MessageSquare size={20} className="inline-block mr-2" />
            Communication
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'performance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <BarChart2 size={20} className="inline-block mr-2" />
            Performance
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'members' && (
          <TeamList 
            members={filteredMembers}
            onUpdateRole={handleUpdateRole}
          />
        )}
        {activeTab === 'roles' && (
          <RoleManagement 
            members={filteredMembers}
            onUpdateRole={handleUpdateRole}
          />
        )}
        {activeTab === 'communication' && (
          <TeamCommunication 
            members={filteredMembers}
          />
        )}
        {activeTab === 'performance' && (
          <PerformanceMetrics 
            members={filteredMembers}
          />
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <AddTeamMember
          onSubmit={handleAddMember}
          onClose={() => setShowAddMember(false)}
        />
      )}
    </div>
  );
};

export default TeamManagement;