export type TeamRole = 'Project Manager' | 'Team Member' | 'Client' | 'Stakeholder';

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: TeamRole;
  avatar?: string;
  department: string;
  joinDate: string;
  skills: string[];
  activeProjects: number[];
  performance: {
    tasksCompleted: number;
    onTimeDelivery: number;
    projectContributions: number;
  };
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'email';
}