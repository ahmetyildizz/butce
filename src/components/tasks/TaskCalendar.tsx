import React from 'react';
import { Task } from '../../types/task';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);
  
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    let dayCount = 1;

    for (let week = 0; week < weeks; week++) {
      const weekDays = [];
      
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDayOfWeek) || dayCount > daysInMonth) {
          weekDays.push(<td key={`empty-${day}`} className="border p-2"></td>);
        } else {
          const currentDate = new Date(today.getFullYear(), today.getMonth(), dayCount);
          const dayTasks = getTasksForDate(currentDate);
          const isToday = currentDate.toDateString() === today.toDateString();

          weekDays.push(
            <td key={dayCount} className={`border p-2 h-32 align-top
              ${isToday ? 'bg-blue-50' : ''}`}>
              <div className="flex justify-between items-start">
                <span className={`inline-block w-6 h-6 text-center rounded-full
                  ${isToday ? 'bg-blue-500 text-white' : ''}`}>
                  {dayCount}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-1 rounded text-xs mb-1 cursor-pointer
                      ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}
                  >
                    <div className="font-medium truncate">{task.title}</div>
                    <div className="flex items-center text-xs mt-0.5">
                      <Clock size={10} className="mr-1" />
                      {new Date(task.dueDate).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </td>
          );
          dayCount++;
        }
      }
      days.push(<tr key={week}>{weekDays}</tr>);
    }
    return days;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon size={24} className="text-gray-500" />
          <h2 className="text-xl font-semibold">
            {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="border p-2 bg-gray-50">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendarDays()}</tbody>
      </table>
    </div>
  );
};

export default TaskCalendar;