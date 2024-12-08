import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1">
          <div className="max-w-lg w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}