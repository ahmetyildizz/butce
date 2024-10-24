import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Calendar,
  Users,
  Package,
  BarChart2,
  Wallet,
  FolderOpen,
  AlertTriangle,
  MessageSquare,
  Bell,
  Bot,
  Settings,
  Archive
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: Briefcase, label: 'Projects' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/team', icon: Users, label: 'Team Management' },
    { path: '/resources', icon: Package, label: 'Resource Management' },
    { path: '/reports', icon: BarChart2, label: 'Reports' },
    { path: '/budget', icon: Wallet, label: 'Budget Management' },
    { path: '/documents', icon: FolderOpen, label: 'Document Management' },
    { path: '/risks', icon: AlertTriangle, label: 'Risk Management' },
    { path: '/chat', icon: MessageSquare, label: 'Team Chat' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
    { path: '/archive', icon: Archive, label: 'Archives' },
    { path: '/settings', icon: Settings, label: 'Settings' },
 
  ];

  return (
    <div 
      className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className={`font-semibold transition-opacity duration-200 
          ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          Project Manager
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <item.icon className="flex-shrink-0" size={20} />
                <span 
                  className={`ml-3 transition-opacity duration-200
                    ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Users size={18} />
          </div>
          <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-400">admin@company.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;