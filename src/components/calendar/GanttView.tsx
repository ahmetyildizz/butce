import React from 'react';
import { GanttTask } from '../../types/calendar';

interface GanttViewProps {
  currentDate: Date;
}

const GanttView: React.FC<GanttViewProps> = ({ currentDate }) => {
  // Mock data for demonstration
  const tasks: GanttTask[] = [
    {
      id: 1,
      taskId: 1,
      dependencies: [],
      progress: 60,
      startDate: '2024-03-15',
      endDate: '2024-03-25',
      milestone: false
    },
    // Add more mock tasks
  ];

  const getDaysArray = () => {
    const days = [];
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const days = getDaysArray();

  return (
    <div className="p-6 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Timeline Header */}
        <div className="flex">
          <div className="w-64 flex-shrink-0 border-r border-gray-200 p-2">
            Task Name
          </div>
          <div className="flex-1 flex">
            {days.map((day, index) => (
              <div
                key={index}
                className={`w-8 flex-shrink-0 text-center text-xs ${
                  day.getDay() === 0 || day.getDay() === 6 ? 'bg-gray-50' : ''
                }`}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Grid */}
        <div className="mt-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex">
              <div className="w-64 flex-shrink-0 border-r border-gray-200 p-2">
                Task {task.taskId}
              </div>
              <div className="flex-1 flex relative">
                {/* Task Bar */}
                <div
                  className="absolute h-6 bg-blue-500 rounded"
                  style={{
                    left: `${(new Date(task.startDate).getDate() - 1) * 32}px`,
                    width: `${
                      (new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) /
                      (24 * 60 * 60 * 1000) * 32
                    }px`,
                    top: '4px'
                  }}
                >
                  <div
                    className="h-full bg-blue-600 rounded-l"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                {/* Grid Lines */}
                {days.map((_, index) => (
                  <div
                    key={index}
                    className="w-8 flex-shrink-0 border-r border-gray-100 h-8"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttView;