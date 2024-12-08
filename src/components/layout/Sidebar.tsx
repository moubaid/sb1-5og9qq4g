import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  MapPin,
  Settings,
  Bell,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Fleet', to: '/fleet', icon: Car },
  { name: 'Drivers', to: '/drivers', icon: Users },
  { name: 'Schedule', to: '/schedule', icon: Calendar },
  { name: 'Tracking', to: '/tracking', icon: MapPin },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-800">Fleet Manager</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </button>
        </div>
      </div>
    </div>
  );
}