import React, { useState } from 'react';
import { 
  Send, Mail, MessageCircle,
  Search
} from 'lucide-react';
import { TeamMember, Message } from '../../types/team';

interface TeamCommunicationProps {
  members: TeamMember[];
}

const TeamCommunication: React.FC<TeamCommunicationProps> = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [messageType, setMessageType] = useState<'message' | 'email'>('message');
  const [messageContent, setMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const initialMessages: Message[] = [
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      content: 'Hi, can you review the latest design updates?',
      timestamp: '2024-03-15T10:30:00',
      read: true,
      type: 'message'
    },
    {
      id: 2,
      senderId: 2,
      receiverId: 1,
      content: "Sure, I'll take a look and provide feedback shortly.",
      timestamp: '2024-03-15T10:35:00',
      read: true,
      type: 'message'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = () => {
    if (!selectedMember || !messageContent.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 1, // Current user ID
      receiverId: selectedMember.id,
      content: messageContent,
      timestamp: new Date().toISOString(),
      read: false,
      type: messageType
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageContent('');
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
      {/* Team Members List */}
      <div className="lg:col-span-1 border-r">
        <div className="p-4 border-b">
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
        </div>
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          {filteredMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50
                ${selectedMember?.id === member.id ? 'bg-blue-50' : ''}`}
            >
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
              <div className="flex-1 text-left">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat/Email Area */}
      <div className="lg:col-span-3 flex flex-col">
        {selectedMember ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500">{selectedMember.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMessageType('message')}
                  className={`p-2 rounded-lg ${
                    messageType === 'message'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <MessageCircle size={20} />
                </button>
                <button
                  onClick={() => setMessageType('email')}
                  className={`p-2 rounded-lg ${
                    messageType === 'email'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Mail size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(msg => 
                  (msg.senderId === selectedMember.id || msg.receiverId === selectedMember.id) &&
                  msg.type === messageType
                )
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === selectedMember.id ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === selectedMember.id
                          ? 'bg-gray-100'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.senderId === selectedMember.id
                            ? 'text-gray-500'
                            : 'text-blue-100'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={`Type a ${messageType}...`}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2
                    focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a team member to start a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCommunication;