export type CalendarViewMode = 'month' | 'gantt' | 'sprint' | 'meetings';

export interface Meeting {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location: string;
  type: 'standup' | 'review' | 'planning' | 'other';
}

export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  goals: string[];
  status: 'planned' | 'active' | 'completed';
  tasks: number[]; // Task IDs
}

export interface GanttTask {
  id: number;
  taskId: number;
  dependencies: number[];
  progress: number;
  startDate: string;
  endDate: string;
  milestone: boolean;
}