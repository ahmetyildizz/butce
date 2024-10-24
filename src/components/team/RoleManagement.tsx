import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { TeamMember, TeamRole } from '../../types/team';

interface RoleManagementProps {
  members: TeamMember[];
  onUpdateRole: (memberId: number, newRole: TeamRole) => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ members, onUpdateRole }) => {
  const rolePermissions = {
    'Project Manager': [
      'Create and manage projects',
      'Assign team members',
      'Set project timelines',
      'View all reports',
      'Manage team roles',
      'Access financial data'
    ],
    'Team Member': [
      'View assigned projects',
      'Update task status',
      'Communicate with team',
      'View team calendar',
      'Submit time logs'
    ],
    'Client': [
      'View project progress',
      'Comment on deliverables',
      'Access shared documents',
      'Communicate with team'
    ],
    'Stakeholder': [
      'View project overview',
      'Access high-level reports',
      'View milestone status'
    ]
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Permissions */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Role Permissions</h3>
          <div className="space-y-4">
            {(Object.keys(rolePermissions) as TeamRole[]).map((role) => (
              <div key={role} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className={`
                    ${role === 'Project Manager' ? 'text-purple-500' :
                      role === 'Team Member' ? 'text-blue-500' :
                      role === 'Client' ? 'text-green-500' :
                      'text-yellow-500'}`} 
                    size={20} 
                  />
                  <h4 className="font-medium">{role}</h4>
                </div>
                <ul className="space-y-2">
                  {rolePermissions[role].map((permission, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Roles */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Team Member Roles</h3>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
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
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                  <select
                    value={member.role}
                    onChange={(e) => onUpdateRole(member.id, e.target.value as TeamRole)}
                    className="border border-gray-300 rounded-lg px-3 py-2
                      focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Project Manager">Project Manager</option>
                    <option value="Team Member">Team Member</option>
                    <option value="Client">Client</option>
                    <option value="Stakeholder">Stakeholder</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Change Warning */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="text-yellow-500" size={20} />
          <p className="text-sm text-yellow-700">
            Changes to team member roles will take effect immediately. Make sure to review
            permissions carefully before making changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;