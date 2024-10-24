import React from 'react';
import { Meeting } from '../../types/calendar';
import { Clock, Users, MapPin, Video } from 'lucide-react';

interface MeetingViewProps {
  currentDate: Date;
}

const MeetingView: React.FC<MeetingViewProps> = ({ currentDate }) => {
  // Mock data for demonstration
  const meetings: Meeting[] = [
    {
      id: 1,
      title: 'Daily Standup',
      description: 'Team sync and progress update',
      startTime: '2024-03-15T09:00:00',
      endTime: '2024-03-15T09:30:00',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      location: 'Virtual Meeting Room 1',
      type: 'standup'
    },
    // Add more mock meetings
  ];

  const getMeetingTypeStyles = (type: Meeting['type']) => {
    switch (type) {
      case 'standup':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{meeting.title}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2
                  ${getMeetingTypeStyles(meeting.type)}`}>
                  {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Video size={20} />
              </button>
            </div>

            <p className="text-gray-600 mt-2">{meeting.description}</p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-2" />
                {new Date(meeting.startTime).toLocaleTimeString([], { 
                  hour: '2-digit',
                  minute: '2-digit'
                })} - {new Date(meeting.endTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-2" />
                {meeting.location}
              </div>

              <div className="flex items-start text-sm text-gray-500">
                <Users size={16} className="mr-2 mt-1" />
                <div>
                  <div className="font-medium">Attendees:</div>
                  <div className="mt-1">
                    {meeting.attendees.map((attendee, index) => (
                      <div key={index}>{attendee}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline View */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-24 gap-0">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="h-12 border-r border-gray-200 text-xs text-gray-500 p-1"
              >
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingView;