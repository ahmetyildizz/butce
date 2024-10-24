import React from 'react';
import { Task } from '../../types/task';
import { Meeting } from '../../types/calendar';
import { Calendar, Clock, Users, Tag } from 'lucide-react';

interface MonthViewProps {
  currentDate: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate }) => {
  // Mock data for demonstration
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Design System Implementation',
      description: 'Create a comprehensive design system',
      projectId: 1,
      assignedTo: ['John Doe'],
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-03-20',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15',
      tags: ['design']
    }
  ];

  const meetings: Meeting[] = [
    {
      id: 1,
      title: 'Daily Standup',
      description: 'Team sync and progress update',
      startTime: '2024-03-20T09:00:00',
      endTime: '2024-03-20T09:30:00',
      attendees: ['John Doe', 'Jane Smith'],
      location: 'Virtual Room 1',
      type: 'standup'
    }
  ];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth();

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const dayTasks = tasks.filter(task => task.dueDate === dateStr);
    const dayMeetings = meetings.filter(meeting => 
      meeting.startTime.split('T')[0] === dateStr
    );

    return [...dayTasks, ...dayMeetings];
  };

  const renderCalendar = () => {
    const days = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || dayCount > daysInMonth) {
          week.push(<td key={`empty-${i}-${j}`} className="border p-2"></td>);
        } else {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCount);
          const events = getEventsForDate(date);
          const isToday = new Date().toDateString() === date.toDateString();

          week.push(
            <td key={dayCount} className={`border p-2 h-32 ${isToday ? 'bg-blue-50' : ''}`}>
              <div className="flex justify-between items-start">
                <span className={`inline-block w-6 h-6 text-center rounded-full
                  ${isToday ? 'bg-blue-500 text-white' : ''}`}>
                  {dayCount}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {events.map((event: any) => (
                  <div
                    key={`${event.id}-${event.title}`}
                    className={`p-1 rounded text-xs cursor-pointer
                      ${event.priority ? 
                        event.priority === 'High' ? 'bg-red-100 text-red-800' :
                        event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                      }`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    {event.startTime && (
                      <div className="flex items-center mt-0.5">
                        <Clock size={10} className="mr-1" />
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </td>
          );
          dayCount++;
        }
      }
      days.push(<tr key={i}>{week}</tr>);
      if (dayCount > daysInMonth) break;
    }
    return days;
  };

  return (
    <div className="p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day} className="border p-2 bg-gray-50">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default MonthView;